import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// CC24 VIRTUAL SHOWROOM - COMPLETE FRONTEND
// Besser als Pixel24/GAD24 - Open Source
// ============================================================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Design System
const theme = {
  colors: {
    primary: '#00D4D4',
    primaryDark: '#00A8A8',
    dark: '#0A0F14',
    darker: '#060A0D',
    card: '#1A1F25',
    border: '#2C3239',
    text: '#E8EDF2',
    textMuted: '#9CA8B4',
    success: '#00C853',
    warning: '#FF9500',
    error: '#FF3D57',
    gold: '#C9A962',
  }
};

// ============================================================================
// ICONS (SVG)
// ============================================================================
const Icons = {
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16V4M7 9l5-5 5 5M4 14v6h16v-6"/>
    </svg>
  ),
  Car: () => (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 16l1-4 6-2h14l6 2 3 4v4H4v-4z"/>
      <circle cx="10" cy="18" r="3"/><circle cx="38" cy="18" r="3"/>
      <path d="M12 10l3-4h10l3 4"/>
    </svg>
  ),
  Spin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  Check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12l5 5 11-11"/>
    </svg>
  ),
  Image: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8" cy="8" r="2"/><path d="M21 15l-5-5-6 6-3-3-4 4"/>
    </svg>
  ),
  Wand: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 4l5 5-12 12-5-5z"/><path d="M18 7l-3-3"/>
      <circle cx="19" cy="3" r="1" fill="currentColor"/>
    </svg>
  ),
  Download: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4v12m-5-5l5 5 5-5M4 18h16"/>
    </svg>
  ),
  Settings: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4m0 14v4m11-11h-4M5 12H1m17.07-7.07l-2.83 2.83M7.76 16.24l-2.83 2.83m0-12.14l2.83 2.83m8.48 8.48l2.83 2.83"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
  Loader: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
    </svg>
  ),
  Trash: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M8 6V4h8v2m1 0v14H7V6h10z"/>
    </svg>
  ),
};

// ============================================================================
// VIRTUAL BACKGROUNDS
// ============================================================================
const BACKGROUNDS = [
  { id: 'studio_white', name: 'Studio Weiß', color: '#f5f5f5', gradient: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)' },
  { id: 'studio_dark', name: 'Studio Dunkel', color: '#1a1a1a', gradient: 'linear-gradient(180deg, #2a2a2a 0%, #0a0a0a 100%)' },
  { id: 'showroom_cyan', name: 'CC24 Showroom', color: '#0A0F14', gradient: 'radial-gradient(ellipse at 50% 100%, #00D4D420 0%, #0A0F14 70%)' },
  { id: 'showroom_luxury', name: 'Luxus Gold', color: '#1a1510', gradient: 'radial-gradient(ellipse at 50% 100%, #C9A96230 0%, #0f0d0a 70%)' },
  { id: 'outdoor_sunset', name: 'Sonnenuntergang', color: '#2d1f1a', gradient: 'linear-gradient(180deg, #ff7e5f30 0%, #1a0f0a 100%)' },
  { id: 'outdoor_nature', name: 'Natur Grün', color: '#0f1a0f', gradient: 'linear-gradient(180deg, #00853020 0%, #0a140a 100%)' },
];

// Required photo angles for 8D/360° reconstruction
const REQUIRED_ANGLES = [
  { id: 0, name: 'Front', angle: 0, icon: '🚗' },
  { id: 1, name: 'Front-Rechts', angle: 45, icon: '↗️' },
  { id: 2, name: 'Rechts', angle: 90, icon: '➡️' },
  { id: 3, name: 'Heck-Rechts', angle: 135, icon: '↘️' },
  { id: 4, name: 'Heck', angle: 180, icon: '🔙' },
  { id: 5, name: 'Heck-Links', angle: 225, icon: '↙️' },
  { id: 6, name: 'Links', angle: 270, icon: '⬅️' },
  { id: 7, name: 'Front-Links', angle: 315, icon: '↖️' },
];

// ============================================================================
// UPLOAD COMPONENT
// ============================================================================
const UploadZone = ({ onFilesSelected, uploadedFiles, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(f => 
      f.type.startsWith('image/')
    );
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const completedCount = uploadedFiles.filter(f => f.file).length;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ 
        fontSize: 24, 
        fontWeight: 700, 
        marginBottom: 8,
        color: theme.colors.text 
      }}>
        Fahrzeugfotos hochladen
      </h2>
      <p style={{ color: theme.colors.textMuted, marginBottom: 24 }}>
        Laden Sie mindestens 8 Fotos aus verschiedenen Winkeln hoch für den 360° Showroom
      </p>

      {/* Progress Bar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: theme.colors.textMuted, fontSize: 14 }}>
            {completedCount} von {REQUIRED_ANGLES.length} Fotos
          </span>
          <span style={{ 
            color: completedCount >= 8 ? theme.colors.success : theme.colors.primary,
            fontSize: 14,
            fontWeight: 600 
          }}>
            {Math.round((completedCount / 8) * 100)}%
          </span>
        </div>
        <div style={{
          height: 8,
          background: theme.colors.border,
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${(completedCount / 8) * 100}%`,
            background: completedCount >= 8 
              ? theme.colors.success 
              : `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`,
            borderRadius: 4,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Angle Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 24
      }}>
        {REQUIRED_ANGLES.map((angle, index) => {
          const uploaded = uploadedFiles[index];
          return (
            <div
              key={angle.id}
              onClick={() => !uploaded?.file && fileInputRef.current?.click()}
              style={{
                aspectRatio: '4/3',
                borderRadius: 12,
                border: `2px dashed ${uploaded?.file ? theme.colors.success : theme.colors.border}`,
                background: uploaded?.preview 
                  ? `url(${uploaded.preview}) center/cover`
                  : theme.colors.card,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: uploaded?.file ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              {uploaded?.file ? (
                <>
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: theme.colors.success,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <Icons.Check />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveFile(index); }}
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: theme.colors.error,
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icons.Trash />
                  </button>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 24, marginBottom: 4 }}>{angle.icon}</span>
                  <span style={{ fontSize: 11, color: theme.colors.textMuted }}>{angle.name}</span>
                  <span style={{ fontSize: 10, color: theme.colors.border }}>{angle.angle}°</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: 40,
          borderRadius: 16,
          border: `2px dashed ${isDragging ? theme.colors.primary : theme.colors.border}`,
          background: isDragging ? `${theme.colors.primary}10` : theme.colors.card,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <div style={{ 
          color: isDragging ? theme.colors.primary : theme.colors.textMuted,
          marginBottom: 12 
        }}>
          <Icons.Upload />
        </div>
        <p style={{ color: theme.colors.text, fontSize: 16, marginBottom: 4 }}>
          Fotos hierher ziehen
        </p>
        <p style={{ color: theme.colors.textMuted, fontSize: 14 }}>
          oder klicken zum Auswählen
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// 360° VIEWER COMPONENT
// ============================================================================
const Viewer360 = ({ images, background }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);
  const autoRotateRef = useRef(null);

  const frameCount = images.length || 8;
  const bgStyle = BACKGROUNDS.find(b => b.id === background) || BACKGROUNDS[0];

  // Auto-rotate
  useEffect(() => {
    if (isAutoRotate && images.length > 0) {
      autoRotateRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % frameCount);
      }, 150);
    }
    return () => clearInterval(autoRotateRef.current);
  }, [isAutoRotate, frameCount, images.length]);

  // Mouse/Touch handlers
  const handleStart = (clientX) => {
    setIsDragging(true);
    setIsAutoRotate(false);
    setStartX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    if (Math.abs(diff) > 20) {
      setCurrentFrame(prev => {
        const newFrame = diff > 0 
          ? (prev + 1) % frameCount 
          : (prev - 1 + frameCount) % frameCount;
        return newFrame;
      });
      setStartX(clientX);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: 400,
        borderRadius: 16,
        overflow: 'hidden',
        background: bgStyle.gradient,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
    >
      {/* Floor reflection */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '10%',
        right: '10%',
        height: 100,
        background: `linear-gradient(to top, ${theme.colors.primary}15, transparent)`,
        filter: 'blur(20px)'
      }} />

      {/* Car Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {images.length > 0 ? (
          <img
            src={images[currentFrame]?.processed || images[currentFrame]?.preview}
            alt={`Angle ${currentFrame}`}
            style={{
              maxWidth: '85%',
              maxHeight: '85%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
            }}
            draggable={false}
          />
        ) : (
          <div style={{ color: theme.colors.textMuted, textAlign: 'center' }}>
            <Icons.Car />
            <p style={{ marginTop: 16 }}>Keine Bilder vorhanden</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        padding: '8px 16px',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: 24
      }}>
        <button
          onClick={() => setCurrentFrame(prev => (prev - 1 + frameCount) % frameCount)}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: theme.colors.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icons.ChevronLeft />
        </button>
        
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          style={{
            padding: '6px 16px',
            borderRadius: 16,
            border: 'none',
            background: isAutoRotate ? theme.colors.primary : 'transparent',
            color: theme.colors.text,
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 600
          }}
        >
          {isAutoRotate ? '⏸ Pause' : '▶ Auto'}
        </button>
        
        <button
          onClick={() => setCurrentFrame(prev => (prev + 1) % frameCount)}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: theme.colors.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icons.ChevronRight />
        </button>
      </div>

      {/* Frame indicator */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        padding: '4px 12px',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: 12,
        fontSize: 12,
        color: theme.colors.text
      }}>
        {currentFrame + 1} / {frameCount}
      </div>

      {/* 360° badge */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        background: theme.colors.primary,
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 700,
        color: theme.colors.dark
      }}>
        <Icons.Spin /> 360°
      </div>
    </div>
  );
};

// ============================================================================
// BACKGROUND SELECTOR
// ============================================================================
const BackgroundSelector = ({ selected, onSelect }) => (
  <div style={{ marginTop: 24 }}>
    <h3 style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text, marginBottom: 12 }}>
      Showroom Hintergrund
    </h3>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {BACKGROUNDS.map(bg => (
        <button
          key={bg.id}
          onClick={() => onSelect(bg.id)}
          style={{
            width: 60,
            height: 40,
            borderRadius: 8,
            border: `2px solid ${selected === bg.id ? theme.colors.primary : 'transparent'}`,
            background: bg.gradient,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {selected === bg.id && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,212,212,0.3)'
            }}>
              <Icons.Check />
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// PROCESSING STATUS
// ============================================================================
const ProcessingStatus = ({ status, progress }) => {
  const stages = [
    { id: 'upload', name: 'Upload', icon: '📤' },
    { id: 'analyze', name: 'Analyse', icon: '🔍' },
    { id: 'remove_bg', name: 'Hintergrund', icon: '✂️' },
    { id: 'enhance', name: 'Optimierung', icon: '✨' },
    { id: 'complete', name: 'Fertig', icon: '🎉' },
  ];

  const currentIndex = stages.findIndex(s => s.id === status);

  return (
    <div style={{
      padding: 24,
      background: theme.colors.card,
      borderRadius: 16,
      marginTop: 24
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.colors.text, marginBottom: 16 }}>
        Verarbeitung läuft...
      </h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        {stages.map((stage, index) => (
          <div key={stage.id} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: index <= currentIndex ? theme.colors.primary : theme.colors.border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px',
              fontSize: 18,
              transition: 'all 0.3s ease'
            }}>
              {index < currentIndex ? '✓' : stage.icon}
            </div>
            <span style={{
              fontSize: 11,
              color: index <= currentIndex ? theme.colors.text : theme.colors.textMuted
            }}>
              {stage.name}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        height: 8,
        background: theme.colors.border,
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.success})`,
          borderRadius: 4,
          transition: 'width 0.3s ease'
        }} />
      </div>
      <p style={{ 
        fontSize: 12, 
        color: theme.colors.textMuted, 
        textAlign: 'center',
        marginTop: 8 
      }}>
        {progress}% abgeschlossen
      </p>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const CC24ShowroomApp = () => {
  const [view, setView] = useState('upload'); // upload, processing, showroom
  const [uploadedFiles, setUploadedFiles] = useState(
    REQUIRED_ANGLES.map(() => ({ file: null, preview: null, processed: null }))
  );
  const [selectedBackground, setSelectedBackground] = useState('showroom_cyan');
  const [processingStatus, setProcessingStatus] = useState('upload');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [vehicleId, setVehicleId] = useState(null);

  // Handle file selection
  const handleFilesSelected = (files) => {
    const newUploaded = [...uploadedFiles];
    
    files.forEach((file, index) => {
      // Find first empty slot
      const emptyIndex = newUploaded.findIndex(u => !u.file);
      if (emptyIndex !== -1) {
        const preview = URL.createObjectURL(file);
        newUploaded[emptyIndex] = { file, preview, processed: null };
      }
    });
    
    setUploadedFiles(newUploaded);
  };

  // Remove file
  const handleRemoveFile = (index) => {
    const newUploaded = [...uploadedFiles];
    if (newUploaded[index].preview) {
      URL.revokeObjectURL(newUploaded[index].preview);
    }
    newUploaded[index] = { file: null, preview: null, processed: null };
    setUploadedFiles(newUploaded);
  };

  // Start processing
  const handleStartProcessing = async () => {
    setView('processing');
    const filesToProcess = uploadedFiles.filter(u => u.file);
    
    // Generate vehicle ID
    const vId = `CC24-${Date.now().toString(36).toUpperCase()}`;
    setVehicleId(vId);

    try {
      // Stage 1: Upload
      setProcessingStatus('upload');
      for (let i = 0; i < filesToProcess.length; i++) {
        setProcessingProgress(Math.round((i / filesToProcess.length) * 20));
        
        const formData = new FormData();
        formData.append('file', filesToProcess[i].file);
        formData.append('vehicleId', vId);
        formData.append('angle', REQUIRED_ANGLES[i]?.angle || i * 45);

        try {
          await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            body: formData
          });
        } catch (e) {
          console.log('Upload simulated (backend not running)');
        }
      }

      // Stage 2: Analyze
      setProcessingStatus('analyze');
      setProcessingProgress(30);
      await new Promise(r => setTimeout(r, 1000));

      // Stage 3: Background Removal
      setProcessingStatus('remove_bg');
      for (let i = 0; i < filesToProcess.length; i++) {
        setProcessingProgress(30 + Math.round((i / filesToProcess.length) * 40));
        await new Promise(r => setTimeout(r, 500));
        
        // Simulate processed image (in real app, this comes from backend)
        const newUploaded = [...uploadedFiles];
        const originalIndex = uploadedFiles.findIndex(u => u.file === filesToProcess[i].file);
        if (originalIndex !== -1) {
          newUploaded[originalIndex].processed = newUploaded[originalIndex].preview;
        }
        setUploadedFiles(newUploaded);
      }

      // Stage 4: Enhance
      setProcessingStatus('enhance');
      setProcessingProgress(80);
      await new Promise(r => setTimeout(r, 1000));

      // Stage 5: Complete
      setProcessingStatus('complete');
      setProcessingProgress(100);
      await new Promise(r => setTimeout(r, 500));

      setView('showroom');

    } catch (error) {
      console.error('Processing error:', error);
    }
  };

  // Export showroom
  const handleExport = async (platform) => {
    alert(`Export für ${platform} wird vorbereitet...\nVehicle ID: ${vehicleId}`);
  };

  const readyToProcess = uploadedFiles.filter(u => u.file).length >= 8;

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.darker,
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: theme.colors.text
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 24px',
        background: theme.colors.dark,
        borderBottom: `1px solid ${theme.colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: theme.colors.primary }}>
            <Icons.Car />
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
              CC24 <span style={{ color: theme.colors.primary }}>Virtual Showroom</span>
            </h1>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, margin: 0 }}>
              Open Source • Besser als Pixel24
            </p>
          </div>
        </div>

        {vehicleId && (
          <div style={{
            padding: '6px 12px',
            background: theme.colors.card,
            borderRadius: 8,
            fontSize: 12,
            color: theme.colors.textMuted
          }}>
            ID: <span style={{ color: theme.colors.primary, fontWeight: 600 }}>{vehicleId}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        {view === 'upload' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: 24
          }}>
            {/* Left: Upload Zone */}
            <div style={{
              background: theme.colors.dark,
              borderRadius: 16,
              overflow: 'hidden'
            }}>
              <UploadZone
                onFilesSelected={handleFilesSelected}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
              />
            </div>

            {/* Right: Preview & Settings */}
            <div>
              <div style={{
                background: theme.colors.dark,
                borderRadius: 16,
                padding: 24
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                  Vorschau
                </h3>
                
                <Viewer360 
                  images={uploadedFiles.filter(u => u.preview)}
                  background={selectedBackground}
                />

                <BackgroundSelector
                  selected={selectedBackground}
                  onSelect={setSelectedBackground}
                />

                <button
                  onClick={handleStartProcessing}
                  disabled={!readyToProcess}
                  style={{
                    width: '100%',
                    marginTop: 24,
                    padding: '16px 24px',
                    fontSize: 16,
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 12,
                    background: readyToProcess 
                      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`
                      : theme.colors.border,
                    color: readyToProcess ? theme.colors.dark : theme.colors.textMuted,
                    cursor: readyToProcess ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <Icons.Wand />
                  360° Showroom erstellen
                </button>

                {!readyToProcess && (
                  <p style={{
                    fontSize: 12,
                    color: theme.colors.warning,
                    textAlign: 'center',
                    marginTop: 8
                  }}>
                    Noch {8 - uploadedFiles.filter(u => u.file).length} Fotos benötigt
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'processing' && (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <ProcessingStatus 
              status={processingStatus}
              progress={processingProgress}
            />
          </div>
        )}

        {view === 'showroom' && (
          <div>
            <div style={{
              background: theme.colors.dark,
              borderRadius: 16,
              padding: 24,
              marginBottom: 24
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24
              }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                    Ihr 360° Showroom ist fertig! 🎉
                  </h2>
                  <p style={{ color: theme.colors.textMuted, margin: '4px 0 0' }}>
                    Vehicle ID: {vehicleId}
                  </p>
                </div>
                <button
                  onClick={() => { setView('upload'); setVehicleId(null); }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: `1px solid ${theme.colors.border}`,
                    background: 'transparent',
                    color: theme.colors.text,
                    cursor: 'pointer'
                  }}
                >
                  Neues Fahrzeug
                </button>
              </div>

              <Viewer360
                images={uploadedFiles.filter(u => u.processed || u.preview)}
                background={selectedBackground}
              />

              <BackgroundSelector
                selected={selectedBackground}
                onSelect={setSelectedBackground}
              />
            </div>

            {/* Export Options */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16
            }}>
              {[
                { id: 'mobilede', name: 'Mobile.de', icon: '🚗' },
                { id: 'autoscout24', name: 'AutoScout24', icon: '🔍' },
                { id: 'download', name: 'Download ZIP', icon: '📦' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleExport(opt.id)}
                  style={{
                    padding: 24,
                    borderRadius: 12,
                    border: `1px solid ${theme.colors.border}`,
                    background: theme.colors.dark,
                    color: theme.colors.text,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>
                    {opt.icon}
                  </span>
                  <span style={{ fontWeight: 600 }}>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '16px 24px',
        borderTop: `1px solid ${theme.colors.border}`,
        textAlign: 'center',
        fontSize: 12,
        color: theme.colors.textMuted
      }}>
        CC24 Virtual Showroom • Open Source • 
        <span style={{ color: theme.colors.primary }}> Powered by CarCompany24 GmbH</span>
      </footer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          margin: 0;
          background: ${theme.colors.darker};
        }
      `}</style>
    </div>
  );
};

export default CC24ShowroomApp;
