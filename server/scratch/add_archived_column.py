import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:PostgreSQL%402222@localhost:5000/portfolio")

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    with conn.cursor() as cur:
        cur.execute("ALTER TABLE contact_messages ADD COLUMN is_archived BOOLEAN DEFAULT FALSE;")
    print("Column is_archived added.")
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals() and conn:
        conn.close()
