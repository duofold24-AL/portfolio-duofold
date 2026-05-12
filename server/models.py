from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime


class ProjectIn(BaseModel):
    title: str
    description: str
    developer: str
    tags: List[str]
    gradient: str
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    image_url: Optional[str] = None
    display_order: int = 0


class ProjectOut(BaseModel):
    id: int
    title: str
    description: str
    developer: str
    tags: List[str]
    gradient: str
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    image_url: Optional[str] = None
    display_order: int


class SkillIn(BaseModel):
    name: str
    category: str
    icon: Optional[str] = None


class SkillOut(BaseModel):
    id: int
    name: str
    category: str
    icon: Optional[str] = None


class ContactIn(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactOut(BaseModel):
    success: bool
    message: str


class ContactMessage(BaseModel):
    id: int
    name: str
    email: str
    message: str
    is_archived: bool = False
    created_at: Optional[datetime] = None