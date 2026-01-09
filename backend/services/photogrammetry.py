"""
Photogrammetrie-Service für 3D-Modell-Generierung aus 8 Fotos
Verwendet COLMAP für Structure-from-Motion und Mesh-Reconstruction
"""

import os
import subprocess
import json
from pathlib import Path
from typing import List, Dict, Optional
import numpy as np
from PIL import Image
import cv2

class PhotogrammetryProcessor:
    """
    Verarbeitet 8 Fotos und erstellt ein 3D-Modell
    """
    
    def __init__(self, work_dir: str = "./photogrammetry_work"):
        self.work_dir = Path(work_dir)
        self.work_dir.mkdir(exist_ok=True)
        
        # COLMAP Pfade (müssen installiert sein)
        self.colmap_path = os.getenv("COLMAP_PATH", "colmap")
        
    def validate_images(self, image_paths: List[str]) -> Dict:
        """
        Validiert die 8 Eingabebilder
        """
        if len(image_paths) != 8:
            return {
                "valid": False,
                "error": f"Genau 8 Bilder erforderlich, {len(image_paths)} erhalten"
            }
        
        valid_paths = []
        for img_path in image_paths:
            if not os.path.exists(img_path):
                return {"valid": False, "error": f"Bild nicht gefunden: {img_path}"}
            
            # Prüfe Bildformat
            try:
                img = Image.open(img_path)
                if img.size[0] < 800 or img.size[1] < 600:
                    return {
                        "valid": False,
                        "error": f"Bild zu klein: {img_path} (min. 800x600)"
                    }
                valid_paths.append(img_path)
            except Exception as e:
                return {"valid": False, "error": f"Ungültiges Bild: {img_path} - {str(e)}"}
        
        return {"valid": True, "paths": valid_paths}
    
    def preprocess_images(self, image_paths: List[str]) -> List[str]:
        """
        Vorverarbeitung der Bilder: Größenanpassung, Schärfung, Kontrast
        """
        processed_dir = self.work_dir / "images"
        processed_dir.mkdir(exist_ok=True)
        
        processed_paths = []
        for i, img_path in enumerate(image_paths):
            img = cv2.imread(img_path)
            
            # Resize auf optimale Größe für Photogrammetrie
            height, width = img.shape[:2]
            max_dim = 2048
            if max(height, width) > max_dim:
                scale = max_dim / max(height, width)
                new_width = int(width * scale)
                new_height = int(height * scale)
                img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_LANCZOS4)
            
            # Schärfung für bessere Feature-Detection
            kernel = np.array([[-1, -1, -1],
                              [-1,  9, -1],
                              [-1, -1, -1]])
            img = cv2.filter2D(img, -1, kernel * 0.5) + img * 0.5
            
            # Kontrast-Verbesserung
            lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
            l, a, b = cv2.split(lab)
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            l = clahe.apply(l)
            img = cv2.merge([l, a, b])
            img = cv2.cvtColor(img, cv2.COLOR_LAB2BGR)
            
            # Speichere verarbeitetes Bild
            output_path = processed_dir / f"image_{i+1:02d}.jpg"
            cv2.imwrite(str(output_path), img, [cv2.IMWRITE_JPEG_QUALITY, 95])
            processed_paths.append(str(output_path))
        
        return processed_paths
    
    def run_colmap_reconstruction(self, image_paths: List[str]) -> Dict:
        """
        Führt COLMAP Structure-from-Motion durch
        """
        database_path = self.work_dir / "database.db"
        sparse_dir = self.work_dir / "sparse"
        sparse_dir.mkdir(exist_ok=True)
        
        try:
            # 1. Feature Extraction
            print("Extracting features...")
            subprocess.run([
                self.colmap_path, "feature_extractor",
                "--database_path", str(database_path),
                "--image_path", str(self.work_dir / "images"),
                "--ImageReader.camera_model", "PINHOLE",
                "--ImageReader.single_camera", "1",
                "--SiftExtraction.use_gpu", "1" if self._check_gpu() else "0"
            ], check=True, capture_output=True)
            
            # 2. Feature Matching
            print("Matching features...")
            subprocess.run([
                self.colmap_path, "exhaustive_matcher",
                "--database_path", str(database_path),
                "--SiftMatching.use_gpu", "1" if self._check_gpu() else "0"
            ], check=True, capture_output=True)
            
            # 3. Bundle Adjustment (Sparse Reconstruction)
            print("Running bundle adjustment...")
            subprocess.run([
                self.colmap_path, "mapper",
                "--database_path", str(database_path),
                "--image_path", str(self.work_dir / "images"),
                "--output_path", str(sparse_dir),
                "--Mapper.num_threads", "4",
                "--Mapper.init_min_tri_angle", "4",
                "--Mapper.multiple_models", "0"
            ], check=True, capture_output=True)
            
            # Prüfe ob Reconstruction erfolgreich
            model_dir = sparse_dir / "0"
            if not model_dir.exists():
                return {
                    "success": False,
                    "error": "COLMAP Reconstruction fehlgeschlagen - nicht genug Matches"
                }
            
            return {
                "success": True,
                "sparse_model": str(model_dir),
                "database": str(database_path)
            }
            
        except subprocess.CalledProcessError as e:
            return {
                "success": False,
                "error": f"COLMAP Fehler: {e.stderr.decode() if e.stderr else str(e)}"
            }
    
    def create_dense_mesh(self, sparse_model: str) -> Dict:
        """
        Erstellt dichtes Mesh aus Sparse Reconstruction
        """
        dense_dir = self.work_dir / "dense"
        dense_dir.mkdir(exist_ok=True)
        
        try:
            # 1. Image Undistortion
            print("Undistorting images...")
            subprocess.run([
                self.colmap_path, "image_undistorter",
                "--image_path", str(self.work_dir / "images"),
                "--input_path", sparse_model,
                "--output_path", str(dense_dir),
                "--output_type", "COLMAP"
            ], check=True, capture_output=True)
            
            # 2. Dense Reconstruction (PatchMatch)
            print("Running dense reconstruction...")
            subprocess.run([
                self.colmap_path, "patch_match_stereo",
                "--workspace_path", str(dense_dir),
                "--workspace_format", "COLMAP",
                "--PatchMatchStereo.geom_consistency", "1"
            ], check=True, capture_output=True)
            
            # 3. Stereo Fusion
            print("Fusing stereo...")
            subprocess.run([
                self.colmap_path, "stereo_fusion",
                "--workspace_path", str(dense_dir),
                "--workspace_format", "COLMAP",
                "--input_type", "geometric",
                "--output_path", str(dense_dir / "fused.ply")
            ], check=True, capture_output=True)
            
            if not (dense_dir / "fused.ply").exists():
                return {
                    "success": False,
                    "error": "Dense Reconstruction fehlgeschlagen"
                }
            
            return {
                "success": True,
                "mesh_path": str(dense_dir / "fused.ply")
            }
            
        except subprocess.CalledProcessError as e:
            return {
                "success": False,
                "error": f"Dense Reconstruction Fehler: {str(e)}"
            }
    
    def convert_to_glb(self, mesh_path: str, output_path: str) -> Dict:
        """
        Konvertiert PLY Mesh zu GLB für Web-Viewer
        """
        try:
            # Verwende Blender oder MeshLab für Konvertierung
            # Alternative: Python mit trimesh
            import trimesh
            
            # Lade Mesh
            mesh = trimesh.load(mesh_path)
            
            # Optimierung: Decimation für kleinere Dateigröße
            if hasattr(mesh, 'simplify'):
                mesh = mesh.simplify_quadric_decimation(face_count=50000)
            
            # Export als GLB
            mesh.export(output_path, file_type='glb')
            
            return {
                "success": True,
                "glb_path": output_path,
                "vertices": len(mesh.vertices),
                "faces": len(mesh.faces)
            }
            
        except ImportError:
            # Fallback: Verwende subprocess mit Blender
            try:
                blender_script = f"""
import bpy
import sys

# Lösche Standard-Objekte
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# Importiere PLY
bpy.ops.import_mesh.ply(filepath='{mesh_path}')

# Exportiere als GLB
bpy.ops.export_scene.gltf(
    filepath='{output_path}',
    export_format='GLB',
    use_selection=False
)
"""
                subprocess.run([
                    "blender", "--background", "--python-expr", blender_script
                ], check=True)
                
                return {"success": True, "glb_path": output_path}
            except:
                return {
                    "success": False,
                    "error": "GLB Konvertierung fehlgeschlagen - trimesh oder Blender erforderlich"
                }
    
    def process_8_images(self, image_paths: List[str], output_glb: str) -> Dict:
        """
        Hauptfunktion: Verarbeitet 8 Bilder zu 3D-Modell
        """
        # 1. Validierung
        validation = self.validate_images(image_paths)
        if not validation["valid"]:
            return validation
        
        # 2. Vorverarbeitung
        processed_images = self.preprocess_images(validation["paths"])
        
        # 3. COLMAP Reconstruction
        reconstruction = self.run_colmap_reconstruction(processed_images)
        if not reconstruction["success"]:
            return reconstruction
        
        # 4. Dense Mesh
        dense_result = self.create_dense_mesh(reconstruction["sparse_model"])
        if not dense_result["success"]:
            return dense_result
        
        # 5. GLB Export
        glb_result = self.convert_to_glb(dense_result["mesh_path"], output_glb)
        
        return glb_result
    
    def _check_gpu(self) -> bool:
        """Prüft ob GPU verfügbar ist"""
        try:
            import torch
            return torch.cuda.is_available()
        except:
            return False


# Alternative: NeRF-basierter Ansatz für bessere Qualität mit 8 Bildern
class NeRFProcessor:
    """
    Neural Radiance Fields für 3D-Rekonstruktion aus 8 Fotos
    Bessere Qualität als klassische Photogrammetrie bei wenigen Bildern
    """
    
    def __init__(self, work_dir: str = "./nerf_work"):
        self.work_dir = Path(work_dir)
        self.work_dir.mkdir(exist_ok=True)
    
    def process_with_nerf(self, image_paths: List[str], output_glb: str) -> Dict:
        """
        Verwendet Instant-NGP oder ähnliche NeRF-Implementierung
        """
        # TODO: Integration mit Instant-NGP oder Nerfstudio
        # Für jetzt: Fallback zu Photogrammetrie
        processor = PhotogrammetryProcessor(str(self.work_dir))
        return processor.process_8_images(image_paths, output_glb)
