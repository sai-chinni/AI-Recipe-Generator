from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("[SUCCESS] Database Connected!")
except Exception as e:
    print("[ERROR] Database Error:")
    print(e)