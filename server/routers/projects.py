from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..database import execute_query
from ..models import ProjectIn, ProjectOut
from ..auth import require_admin

router = APIRouter()


@router.get("/projects", response_model=List[ProjectOut])
def get_projects():
    try:
        rows = execute_query(
            "SELECT * FROM projects ORDER BY display_order ASC"
        )
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/projects", response_model=ProjectOut, status_code=201, dependencies=[Depends(require_admin)])
def create_project(body: ProjectIn):
    try:
        rows = execute_query(
            """
            INSERT INTO projects (title, description, developer, tags, gradient, live_url, github_url, image_url, display_order)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *
            """,
            (body.title, body.description, body.developer, body.tags, body.gradient,
             body.live_url, body.github_url, body.image_url, body.display_order),
        )
        return rows[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/projects/{project_id}", response_model=ProjectOut, dependencies=[Depends(require_admin)])
def update_project(project_id: int, body: ProjectIn):
    try:
        rows = execute_query(
            """
            UPDATE projects
            SET title=%s, description=%s, developer=%s, tags=%s, gradient=%s,
                live_url=%s, github_url=%s, image_url=%s, display_order=%s
            WHERE id=%s
            RETURNING *
            """,
            (body.title, body.description, body.developer, body.tags, body.gradient,
             body.live_url, body.github_url, body.image_url, body.display_order, project_id),
        )
        if not rows:
            raise HTTPException(status_code=404, detail="Project not found")
        return rows[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/projects/{project_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_project(project_id: int):
    try:
        count = execute_query(
            "DELETE FROM projects WHERE id=%s",
            (project_id,),
            fetch=False,
        )
        if count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))