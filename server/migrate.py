import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:PostgreSQL%402222@localhost:5000/portfolio")

def migrate():
    # 1. Connect to default 'postgres' db to create 'portfolio' if missing
    base_url = DATABASE_URL.rsplit('/', 1)[0] + '/postgres'
    print(f"Checking if 'portfolio' database exists...")
    conn = psycopg2.connect(base_url)
    conn.autocommit = True
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'portfolio'")
            if not cur.fetchone():
                print("Creating 'portfolio' database...")
                cur.execute("CREATE DATABASE portfolio")
            else:
                print("'portfolio' database already exists.")
    finally:
        conn.close()

    # 2. Connect to 'portfolio' db to run schema
    print(f"Connecting to {DATABASE_URL}...")
    conn = psycopg2.connect(DATABASE_URL)
    try:
        with conn.cursor() as cur:
            # Create projects table if not exists
            cur.execute("""
                CREATE TABLE IF NOT EXISTS projects (
                    id SERIAL PRIMARY KEY,
                    title TEXT NOT NULL,
                    description TEXT,
                    developer TEXT,
                    tags TEXT[],
                    gradient TEXT,
                    live_url TEXT,
                    github_url TEXT,
                    image_url TEXT,
                    display_order INTEGER DEFAULT 0
                );
            """)
            
            # Add columns if they don't exist
            cur.execute("ALTER TABLE projects ADD COLUMN IF NOT EXISTS developer TEXT;")
            cur.execute("ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT;")
            
            # Create skills table if not exists
            cur.execute("""
                CREATE TABLE IF NOT EXISTS skills (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    category TEXT NOT NULL
                );
            """)
            
            # Create contact_messages table if not exists
            cur.execute("""
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            
            conn.commit()
            print("Migration successful!")
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
