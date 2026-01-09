/**
 * CC24 Virtual Showroom - Backend API Server
 * Fullstack Node.js + Express Backend
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Queue = require('bull');

const app = express();
const PORT = process.env.PORT || 8000;

// ============================================================================
// CONFIGURATION
// ============================================================================

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const PROCESSED_DIR = process.env.PROCESSED_DIR || './processed';
const ML_WORKER_URL = process.env.ML_WORKER_URL || 'http://localhost:8001';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Create directories
(async () => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.mkdir(PROCESSED_DIR, { recursive: true });
})();

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/processed', express.static(PROCESSED_DIR));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const vehicleDir = path.join(UPLOAD_DIR, req.body.vehicleId || 'temp');
    fs.mkdir(vehicleDir, { recursive: true }).then(() => cb(null, vehicleDir));
  },
  filename: (req, file, cb) => {
    const angle = req.body.angle || '0';
    const ext = path.extname(file.originalname);
    cb(null, `angle_${angle}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP allowed.'));
    }
  }
});

// ============================================================================
// JOB QUEUE (Bull/Redis)
// ============================================================================

let imageQueue;
try {
  imageQueue = new Queue('image-processing', REDIS_URL);
  
  imageQueue.process(async (job) => {
    const { imageId, imagePath, vehicleId, model } = job.data;
    console.log(`Processing image: ${imageId}`);
    
    try {
      // Call ML Worker for background removal
      const response = await fetch(`${ML_WORKER_URL}/remove-background`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePath, model: model || 'u2net' })
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (error) {
      // Fallback: just copy file if ML worker not available
      console.log('ML Worker not available, using fallback');
      const outputPath = path.join(PROCESSED_DIR, vehicleId, path.basename(imagePath));
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.copyFile(imagePath, outputPath);
      return { processedPath: outputPath };
    }
  });
  
  console.log('✅ Job queue connected to Redis');
} catch (error) {
  console.log('⚠️ Redis not available, running without queue');
}

// ============================================================================
// IN-MEMORY DATABASE (für Demo - in Production: PostgreSQL/MongoDB)
// ============================================================================

const db = {
  vehicles: new Map(),
  images: new Map(),
  showrooms: new Map()
};

// ============================================================================
// API ROUTES
// ============================================================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      queue: imageQueue ? 'connected' : 'unavailable',
      mlWorker: ML_WORKER_URL
    }
  });
});

// ============================================================================
// UPLOAD ROUTES
// ============================================================================

// Single image upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { vehicleId, angle } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageId = uuidv4();
    const imageData = {
      id: imageId,
      vehicleId,
      angle: parseInt(angle) || 0,
      originalPath: file.path,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date().toISOString(),
      status: 'uploaded',
      processedPath: null
    };
    
    db.images.set(imageId, imageData);
    
    // Add to vehicle's image list
    if (!db.vehicles.has(vehicleId)) {
      db.vehicles.set(vehicleId, {
        id: vehicleId,
        images: [],
        createdAt: new Date().toISOString(),
        status: 'uploading'
      });
    }
    db.vehicles.get(vehicleId).images.push(imageId);
    
    // Queue for processing if Redis available
    if (imageQueue) {
      await imageQueue.add({
        imageId,
        imagePath: file.path,
        vehicleId,
        model: 'u2net'
      }, { priority: 1 });
    }
    
    res.json({
      success: true,
      imageId,
      vehicleId,
      angle,
      path: `/uploads/${vehicleId}/${file.filename}`
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Batch upload
app.post('/api/upload/batch', upload.array('files', 36), async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const files = req.files;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageId = uuidv4();
      const angle = i * (360 / files.length);
      
      const imageData = {
        id: imageId,
        vehicleId,
        angle,
        originalPath: file.path,
        filename: file.filename,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'uploaded'
      };
      
      db.images.set(imageId, imageData);
      results.push({ imageId, angle, filename: file.filename });
      
      if (imageQueue) {
        await imageQueue.add({
          imageId,
          imagePath: file.path,
          vehicleId,
          model: 'u2net'
        });
      }
    }
    
    res.json({
      success: true,
      vehicleId,
      count: files.length,
      images: results
    });
    
  } catch (error) {
    console.error('Batch upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// PROCESSING ROUTES
// ============================================================================

// Remove background
app.post('/api/process/remove-background', async (req, res) => {
  try {
    const { imageId, model = 'u2net' } = req.body;
    const image = db.images.get(imageId);
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Try ML Worker
    try {
      const response = await fetch(`${ML_WORKER_URL}/remove-background`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagePath: image.originalPath,
          model
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        image.processedPath = result.outputPath;
        image.status = 'processed';
        
        return res.json({
          success: true,
          imageId,
          processedPath: result.outputPath
        });
      }
    } catch (mlError) {
      console.log('ML Worker unavailable, using Sharp fallback');
    }
    
    // Fallback: Use Sharp for basic processing
    const outputDir = path.join(PROCESSED_DIR, image.vehicleId);
    await fs.mkdir(outputDir, { recursive: true });
    
    const outputFilename = `processed_${path.basename(image.filename, path.extname(image.filename))}.png`;
    const outputPath = path.join(outputDir, outputFilename);
    
    await sharp(image.originalPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 90 })
      .toFile(outputPath);
    
    image.processedPath = outputPath;
    image.status = 'processed';
    
    res.json({
      success: true,
      imageId,
      processedPath: `/processed/${image.vehicleId}/${outputFilename}`
    });
    
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate 360° showroom
app.post('/api/process/generate-360', async (req, res) => {
  try {
    const { vehicleId, background = 'studio_white', frames = 36 } = req.body;
    const vehicle = db.vehicles.get(vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    const images = vehicle.images.map(id => db.images.get(id)).filter(Boolean);
    
    if (images.length < 8) {
      return res.status(400).json({ 
        error: 'Minimum 8 images required',
        current: images.length 
      });
    }
    
    // Create showroom entry
    const showroomId = uuidv4();
    const showroomData = {
      id: showroomId,
      vehicleId,
      background,
      frames,
      images: images.map(img => ({
        angle: img.angle,
        original: `/uploads/${vehicleId}/${img.filename}`,
        processed: img.processedPath ? `/processed/${vehicleId}/${path.basename(img.processedPath)}` : null
      })),
      createdAt: new Date().toISOString(),
      status: 'ready'
    };
    
    db.showrooms.set(showroomId, showroomData);
    vehicle.showroomId = showroomId;
    vehicle.status = 'complete';
    
    res.json({
      success: true,
      showroomId,
      vehicleId,
      viewUrl: `/api/showroom/${vehicleId}`,
      embedCode: `<iframe src="${req.protocol}://${req.get('host')}/embed/${vehicleId}" width="800" height="600"></iframe>`
    });
    
  } catch (error) {
    console.error('Generate 360 error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// SHOWROOM ROUTES
// ============================================================================

// Get showroom data
app.get('/api/showroom/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;
  const vehicle = db.vehicles.get(vehicleId);
  
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  
  const showroom = db.showrooms.get(vehicle.showroomId);
  
  res.json({
    vehicleId,
    showroom: showroom || null,
    images: vehicle.images.map(id => {
      const img = db.images.get(id);
      return {
        id,
        angle: img?.angle,
        url: img?.processedPath 
          ? `/processed/${vehicleId}/${path.basename(img.processedPath)}`
          : `/uploads/${vehicleId}/${img?.filename}`
      };
    })
  });
});

// Export for platforms
app.get('/api/showroom/:vehicleId/export', async (req, res) => {
  const { vehicleId } = req.params;
  const { platform = 'generic' } = req.query;
  const vehicle = db.vehicles.get(vehicleId);
  
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  
  const images = vehicle.images.map(id => db.images.get(id)).filter(Boolean);
  
  // Platform-specific export configurations
  const exportConfigs = {
    mobilede: {
      maxImages: 50,
      maxSize: '1920x1080',
      format: 'jpeg',
      quality: 85
    },
    autoscout24: {
      maxImages: 50,
      maxSize: '1920x1080',
      format: 'jpeg',
      quality: 90
    },
    generic: {
      maxImages: 100,
      maxSize: '2560x1440',
      format: 'png',
      quality: 95
    }
  };
  
  const config = exportConfigs[platform] || exportConfigs.generic;
  
  res.json({
    vehicleId,
    platform,
    config,
    images: images.slice(0, config.maxImages).map(img => ({
      angle: img.angle,
      url: img.processedPath || img.originalPath
    })),
    instructions: `Export für ${platform} mit max. ${config.maxImages} Bildern in ${config.maxSize}`
  });
});

// ============================================================================
// BACKGROUND MANAGEMENT
// ============================================================================

const DEFAULT_BACKGROUNDS = [
  { id: 'studio_white', name: 'Studio Weiß', type: 'gradient', value: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)' },
  { id: 'studio_dark', name: 'Studio Dunkel', type: 'gradient', value: 'linear-gradient(180deg, #2a2a2a 0%, #0a0a0a 100%)' },
  { id: 'showroom_cyan', name: 'CC24 Showroom', type: 'gradient', value: 'radial-gradient(ellipse at 50% 100%, #00D4D420 0%, #0A0F14 70%)' },
  { id: 'showroom_luxury', name: 'Luxus Gold', type: 'gradient', value: 'radial-gradient(ellipse at 50% 100%, #C9A96230 0%, #0f0d0a 70%)' },
];

app.get('/api/backgrounds', (req, res) => {
  res.json({ backgrounds: DEFAULT_BACKGROUNDS });
});

// ============================================================================
// STATS & ADMIN
// ============================================================================

app.get('/api/stats', (req, res) => {
  res.json({
    totalVehicles: db.vehicles.size,
    totalImages: db.images.size,
    totalShowrooms: db.showrooms.size,
    queueStatus: imageQueue ? 'active' : 'inactive'
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚗 CC24 Virtual Showroom - Backend API                  ║
║                                                           ║
║   Server running on: http://localhost:${PORT}              ║
║   API Docs:          http://localhost:${PORT}/api/health   ║
║                                                           ║
║   Status:                                                 ║
║   - Upload Dir:  ${UPLOAD_DIR.padEnd(35)}  ║
║   - Processed:   ${PROCESSED_DIR.padEnd(35)}  ║
║   - ML Worker:   ${ML_WORKER_URL.padEnd(35)}  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
