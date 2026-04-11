from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..database import execute_query
from ..models import SkillIn, SkillOut
from ..auth import require_admin

router = APIRouter()


@router.get("/skills", response_model=List[SkillOut])
def get_skills():
    try:
        rows = execute_query(
            "SELECT * FROM skills ORDER BY category, name ASC"
        )
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/skills", response_model=SkillOut, status_code=201, dependencies=[Depends(require_admin)])
def create_skill(body: SkillIn):
    try:
        rows = execute_query(
            """
            INSERT INTO skills (name, category, icon)
            VALUES (%s, %s, %s)
            RETURNING *
            """,
            (body.name, body.category, body.icon),
        )
        return rows[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/skills/{skill_id}", response_model=SkillOut, dependencies=[Depends(require_admin)])
def update_skill(skill_id: int, body: SkillIn):
    try:
        rows = execute_query(
            """
            UPDATE skills
            SET name=%s, category=%s, icon=%s
            WHERE id=%s
            RETURNING *
            """,
            (body.name, body.category, body.icon, skill_id),
        )
        if not rows:
            raise HTTPException(status_code=404, detail="Skill not found")
        return rows[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/skills/{skill_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_skill(skill_id: int):
    try:
        count = execute_query(
            "DELETE FROM skills WHERE id=%s",
            (skill_id,),
            fetch=False,
        )
        if count == 0:
            raise HTTPException(status_code=404, detail="Skill not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))