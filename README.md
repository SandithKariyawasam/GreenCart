# 🛒 Greencart - Full Stack E-Commerce Dashboard

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

> **🚧 Project Status:** Backend is stable & deployed. **Frontend is currently under active development.**

## 📖 Overview
**Greencart** is a cloud-native e-commerce inventory management system. It demonstrates a complete DevOps lifecycle, moving from local development to a production cloud environment. The application allows users to manage products and categories via a RESTful API, connected to a secure cloud database.

## 🚀 Live Demo
| Service | Status | Link |
| :--- | :--- | :--- |
| **Frontend (Dashboard)** | 🚧 Beta | [Click Here to View on Vercel](https://YOUR-VERCEL-LINK.app) |
| **Backend API** | 🟢 Live | [Click Here for API Base URL](https://YOUR-CHOREO-LINK.choreoapis.dev) |
| **Database** | 🟢 Live | Hosted on **Neon (PostgreSQL)** |

## 🛠️ Tech Stack & Architecture

### **Backend**
* **Framework:** Java Spring Boot (Web, JPA, Data REST)
* **Database:** PostgreSQL (Cloud-hosted on Neon)
* **Security:** CORS Configuration, Environment Variable Management

### **Frontend**
* **Framework:** React.js + Vite
* **Styling:** CSS / Styled Components
* **HTTP Client:** Axios

### **DevOps & Cloud**
* **Containerization:** Docker
* **Orchestration:** Kubernetes (K8s) via Choreo
* **CI/CD:** Jenkins (Automated Pipelines) & GitHub Actions
* **Hosting:** Choreo (Backend) & Vercel (Frontend)

---

## 📸 Screenshots
*(Add your screenshots here later)*
---

## ⚡ Features
* **CRUD Operations:** Create, Read, Update, and Delete products and categories.
* **Cloud Database:** Secure, persistent data storage using PostgreSQL.
* **Image Handling:** Support for product images (MultipartFile handling).
* **Containerized:** Fully Dockerized application for consistent deployment.
* **Automated Deployment:** CI/CD pipeline ensures reliable updates to production.

---

## 🔧 Installation & Setup

### **1. Backend Setup (Spring Boot)**
```bash
# Clone the repository
git clone [https://github.com/YOUR_USERNAME/Greencart.git](https://github.com/YOUR_USERNAME/Greencart.git)

# Navigate to backend
cd Greencart/Greencart-Backend

# Update application.properties
# (Ensure you set your PostgreSQL credentials in src/main/resources/application.properties)

# Run the app
mvn spring-boot:run
