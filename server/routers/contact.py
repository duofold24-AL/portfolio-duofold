import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..database import execute_query
from ..models import ContactIn, ContactOut, ContactMessage
from ..auth import require_admin

router = APIRouter()


def send_email_notification(name: str, email: str, message: str):
    sender_email = os.getenv("CONTACT_EMAIL_SENDER", "duofold24@gmail.com")
    sender_password = os.getenv("CONTACT_EMAIL_PASSWORD") # Gmail App Password
    receiver_email = "duofold24@gmail.com"

    if not sender_password:
        return

    msg = MIMEMultipart()
    msg['From'] = f"Portfolio Contact <{sender_email}>"
    msg['To'] = receiver_email
    msg['Subject'] = f"New Message from {name}"

    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send email: {e}")


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
        
        # Send email notification
        send_email_notification(body.name, body.email, body.message)
        
        return ContactOut(success=True, message="Message received successfully!")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/contact/{message_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_message(message_id: int):
    try:
        count = execute_query(
            "UPDATE contact_messages SET is_archived = True WHERE id=%s",
            (message_id,),
            fetch=False,
        )
        if count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/contact/{message_id}/restore", status_code=200, dependencies=[Depends(require_admin)])
def restore_message(message_id: int):
    try:
        count = execute_query(
            "UPDATE contact_messages SET is_archived = False WHERE id=%s",
            (message_id,),
            fetch=False,
        )
        if count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))