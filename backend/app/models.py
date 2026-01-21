from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


# 🔐 User table (UNCHANGED – SAFE)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)


# ☁ File table (NEW – for Drive features)
class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True, nullable=False)
    owner_email = Column(String, index=True, nullable=False)

    # Google Drive behavior
    is_deleted = Column(Boolean, default=False)
    is_starred = Column(Boolean, default=False)
