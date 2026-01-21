# ☁️ Cloud-Based Storage Service

A secure, cloud-based file storage web application. 
This project allows users to upload, manage, preview, star, delete, restore, and share files through a modern web interface.

---

## 📌 Project Overview

The **Cloud-Based Storage Service** is a full-stack web application designed to provide centralized, secure, and accessible file storage.  
It enables users to manage files from anywhere with authentication, preview support, and file-sharing capabilities.

This project follows a **Minimum Viable Product (MVP)** approach and implements all core cloud storage features.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- Secure JWT-based authentication
- Protected backend routes

### 📂 File Management
- Upload files
- Download files
- Preview images and PDF files
- Permanent file deletion

### ⭐ Starred Files
- Mark important files as starred
- View starred files separately

### 🗑️ Trash & Restore
- Soft delete functionality
- Trash view for deleted files
- Restore files back to My Drive

### 🔗 File Sharing
- Generate public shareable links
- Read-only access for shared files
- No authentication required for shared links

### 🎨 User Interface
- Clean and responsive layout
- Context menu actions (⋮ menu)
- Preview modal for files

---

## 🧑‍💻 Technology Stack

### Frontend
- **React.js**
- Axios
- JavaScript (ES6)
- CSS-in-JS styling

### Backend
- **FastAPI (Python)**
- RESTful API architecture
- OAuth2 + JWT authentication

### Database
- **SQLite**
- SQLAlchemy ORM

### File Storage
- Server-side local file system

---

---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app

## 🏗️ System Architecture

