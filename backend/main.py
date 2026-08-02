from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to SketchVision!"
    }


@app.get("/health")
def health():
    return {
        "status": "Backend is running"
    }
    
@app.post("/search")
async def search(image: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    unique_name = f"{uuid.uuid4()}.png"

    file_path = os.path.join(
        "uploads",
        unique_name
    )

    with open(file_path, "wb") as file:
        contents = await image.read()
        file.write(contents)

    print("Saved:", file_path)

    return {
        "message": "Image saved successfully",
        "filename": unique_name,
        "path": file_path
    }