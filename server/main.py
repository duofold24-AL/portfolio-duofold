import os
import secrets
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from dotenv import load_dotenv

from .routers import projects, skills, contact

load_dotenv()

app = FastAPI(
    title="Portfolio API",
    description="Backend API for the AL portfolio — React + FastAPI + PostgreSQL",
    version="1.0.0"
)

# ── CORS ───────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:4173",   # Vite preview
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .auth import require_admin, ADMIN_PASSWORD, ADMIN_TOKEN

class LoginRequest(BaseModel):
    password: str

@app.post("/api/admin/login")
def admin_login(body: LoginRequest):
    if not secrets.compare_digest(body.password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Wrong password")
    return {"token": ADMIN_TOKEN}

# ── Routes ─────────────────────────────────────────────
app.include_router(projects.router, prefix="/api")
app.include_router(skills.router,   prefix="/api")
app.include_router(contact.router,  prefix="/api")


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "portfolio-api"}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("server.main:app", host="0.0.0.0", port=port, reload=True)