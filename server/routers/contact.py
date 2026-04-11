from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..database import execute_query
from ..models import ContactIn, ContactOut, ContactMessage
from ..auth import require_admin

router = APIRouter()


@router.get("/contact", response_model=List[ContactMessage], dependencies=[Depends(require_admin)])
def get_messages():
    try:
        rows = execute_query(
            "SELECT * FROM contact_messages ORDER BY created_at DESC"
        )
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/contact", response_model=ContactOut)
def submit_contact(body: ContactIn):
    try:
        execute_query(
            """
            INSERT INTO contact_messages (name, email, message)
            VALUES (%s, %s, %s)
            """,
            (body.name, body.email, body.message),
            fetch=False,
        )
        return ContactOut(success=True, message="Message received successfully!")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/contact/{message_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_message(message_id: int):
    try:
        count = execute_query(
            "DELETE FROM contact_messages WHERE id=%s",
            (message_id,),
            fetch=False,
        )
        if count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))