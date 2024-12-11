# Build Instructions for Sisgest

This document provides detailed instructions on how to build and run Sisgest, the school management system, both for development and production environments. Please follow these steps carefully to ensure a smooth setup.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Frontend Build](#frontend-build)
4. [Backend Build](#backend-build)
5. [Running the Project](#running-the-project)
6. [Docker Deployment](#docker-deployment)
7. [Environment Variables](#environment-variables)

---

## Prerequisites

Before building Sisgest, make sure you have the following tools installed on your machine:

- **Node.js** (Latest LTS version)
- **NPM** or **Yarn** (for frontend dependencies)
- **Python 3.8+** (for backend development)
- **Poetry** (for Python dependency management)
- **Docker** (for containerization)
- **MySQL** or **PostgreSQL** (for database)

Verify the installations:

```bash
node --version
npm --version
python --version
poetry --version
docker --version
```

---

## Project Setup

### Clone the Repository

```bash
git clone https://internal-repo-url.git
cd sisgest
```

### Install Dependencies

#### Frontend Dependencies

Navigate to the `frontend` directory and install the dependencies:

```bash
cd frontend
npm install
```

#### Backend Dependencies

Navigate to the `backend` directory and install the dependencies using Poetry:

```bash
cd backend
poetry install
```

---

## Frontend Build

### Development Build

To start the frontend in development mode:

```bash
cd frontend
npm run dev
```

This will launch the frontend on `http://localhost:3000` (or another available port).

### Production Build

To create a production-ready build:

```bash
cd frontend
npm run build
```

This will generate optimized static files in the `frontend/dist` or `frontend/build` directory, depending on the framework used.

---

## Backend Build

### Development Server

To run the backend in development mode with FastAPI:

```bash
cd backend
poetry run uvicorn main:app --reload
```

This will start the backend on `http://localhost:8000`.

### Production Build

To prepare the backend for production, use a production-ready server like **Gunicorn**:

```bash
cd backend
poetry run gunicorn main:app --workers 4 --bind 0.0.0.0:8000
```

---

## Running the Project

### Without Docker

1. **Start the Backend:**
   ```bash
   cd backend
   poetry run uvicorn main:app --reload
   ```
   
2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

Access the application at `http://localhost:3000`.

### With Docker

Follow the steps in the [Docker Deployment](#docker-deployment) section.

---

## Docker Deployment

### Build and Run Containers

1. **Build the Docker Images:**
   ```bash
   docker-compose build
   ```

2. **Run the Containers:**
   ```bash
   docker-compose up
   ```

This will start the frontend, backend, and database containers. The application will be accessible at `http://localhost:3000`.

### Stopping the Containers

```bash
docker-compose down
```

---

## Environment Variables

Create a `.env` file in the `backend` and `frontend` directories with the following variables:

### Backend `.env` Example

```
DATABASE_URL=postgresql://username:password@localhost:5432/sisgest_db
SECRET_KEY=your-secret-key
DEBUG=True
```

### Frontend `.env` Example

```
VITE_API_URL=http://localhost:8000
```

---

### Notes

- Ensure the database is set up and accessible before running the backend.
- For production, set `DEBUG=False` and use secure values for `SECRET_KEY`.

---

Thank you for following the build instructions. If you encounter any issues, please reach out to the development team.

