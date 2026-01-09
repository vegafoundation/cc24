#!/bin/bash

# CC24 Virtual Showroom - Startup Script
# ======================================

echo "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚗 CC24 Virtual Showroom - Startup                      ║
║   Open Source • Besser als Pixel24/GAD24                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
"

# Check for .env file
if [ ! -f .env ]; then
    echo "📄 Creating .env from .env.example..."
    cp .env.example .env
fi

# Create required directories
mkdir -p uploads processed

# Check Docker availability
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Docker detected - Starting with Docker Compose..."
    docker-compose up -d
    echo "
✅ Services started!

   Frontend:   http://localhost:3000
   Backend:    http://localhost:8000
   ML Worker:  http://localhost:8001
   
   Logs: docker-compose logs -f
   Stop: docker-compose down
"
else
    echo "⚠️  Docker not found - Starting services manually..."
    echo ""
    echo "Please run these commands in separate terminals:"
    echo ""
    echo "1️⃣  Backend:"
    echo "   cd backend && npm install && npm run dev"
    echo ""
    echo "2️⃣  ML Worker (optional, for background removal):"
    echo "   cd ml-worker && pip install -r requirements.txt && python app.py"
    echo ""
    echo "3️⃣  Frontend:"
    echo "   cd frontend && npm install && npm run dev"
    echo ""
fi
