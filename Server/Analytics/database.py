# Server/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Update with your actual database URL or load via dotenv using your credentials
DATABASE_URL = "postgresql://postgres:Shrek1918psg@localhost:5432/ledgersense" 

# Create engine
engine = create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency: used in routes/services for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
