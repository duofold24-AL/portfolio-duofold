import os
import secrets
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from dotenv import load_dotenv
from mangum import Mangum

try:
    from .routers import projects, skills, contact
    from .auth import require_admin, ADMIN_PASSWORD, ADMIN_TOKEN
except ImportError:
    from routers import projects, skills, contact
    from auth import require_admin, ADMIN_PASSWORD, ADMIN_TOKEN

load_dotenv()

app = FastAPI(
    title="Portfolio API",
    description="Backend API for the AL portfolio",
    version="1.0.0"
)

# -- CORS -----------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    password: str

@app.post("/api/admin/login")
def admin_login(body: LoginRequest):
    if not secrets.compare_digest(body.password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Wrong password")
    return {"token": ADMIN_TOKEN}

# -- Routes ---------------------------------------------
app.include_router(projects.router, prefix="/api")
app.include_router(skills.router,   prefix="/api")
app.include_router(contact.router,  prefix="/api")


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "portfolio-api"}

@app.get("/")
def read_root():
    return {"message": "AL Portfolio API is running."}

# This is the entry point for Netlify Functions
handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
