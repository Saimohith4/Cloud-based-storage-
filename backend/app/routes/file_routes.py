from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from app.auth import oauth2_scheme
import os
import shutil

router = APIRouter(prefix="/files", tags=["Files"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ================= UPLOAD =================
@router.post("/upload")
def upload_file(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename
    }


# ================= LIST FILES =================
@router.get("/")
def list_files(token: str = Depends(oauth2_scheme)):
    return os.listdir(UPLOAD_DIR)


# ================= DOWNLOAD (FORCE DOWNLOAD) =================
@router.get("/download/{filename}")
def download_file(
    filename: str,
    token: str = Depends(oauth2_scheme)
):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/octet-stream"
    )


# ================= SHARE / PREVIEW (PUBLIC) =================
@router.get("/share/{filename}")
def share_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # 👇 Important: NO filename parameter → browser previews instead of download
    return FileResponse(
        path=file_path,
        media_type="application/octet-stream"
    )


# ================= DELETE =================
@router.delete("/delete/{filename}")
def delete_file(
    filename: str,
    token: str = Depends(oauth2_scheme)
):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    os.remove(file_path)
    return {"message": "File deleted successfully"}
