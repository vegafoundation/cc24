FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for ML
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy ML worker requirements
COPY requirements.ml.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.ml.txt

# Copy ML worker code
COPY services/ml_worker.py .

# Expose port
EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# Run ML worker
CMD ["uvicorn", "ml_worker:app", "--host", "0.0.0.0", "--port", "8001"]
