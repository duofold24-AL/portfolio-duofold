import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:PostgreSQL%402222@localhost:5000/portfolio")

def migrate():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        with conn.cursor() as cur:
            # Check if column exists
            cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name='skills' AND column_name='icon'")
            if not cur.fetchone():
                print("Adding 'icon' column to 'skills' table...")
                cur.execute("ALTER TABLE skills ADD COLUMN icon TEXT")
                conn.commit()
                print("Migration successful.")
            else:
                print("'icon' column already exists.")
        conn.close()
    except Exception as e:
        print(f"Migration failed: {e}")

if __name__ == "__main__":
    migrate()
