# Sisgest: School Management System

## Introduction

**Sisgest** is a comprehensive web application designed to streamline and modernize school management processes. From student enrollment to financial operations, Sisgest aims to centralize data, ensure security, and provide an intuitive interface for users with varying technical expertise. This system addresses the challenges of outdated or fragmented methods, offering efficiency, security, and accessibility.

## Motivation

Many schools face challenges in managing large volumes of information using manual processes or outdated systems. These challenges include:

- Inefficient organization of student data and documentation.
- Lack of transparency in financial operations.
- Inconsistent or inaccessible information for stakeholders (e.g., administrators, secretaries, and financial officers).

Sisgest was conceived to solve these issues, particularly based on the needs of primary users like **Ms. Janaína** and other stakeholders. The system aims to provide:

- **Efficiency:** Automating administrative tasks.
- **Security:** Protecting sensitive data.
- **Accessibility:** Centralized and responsive access to information.

## Key Features

- **Student Management:** Efficient enrollment and documentation.
- **Financial Management:** Transparent control of financial operations.
- **User Roles:** Role-based authentication and access control.
- **Responsive Design:** Accessible via desktop, tablet, and mobile.
- **Audit Logs:** Track user activities and data modifications.

## Non-Functional Requirements

### 1. Usability
- **Description:** Intuitive interface designed for users with minimal technical skills.
- **Acceptance Criteria:** Users can perform core tasks without extensive training.
- **Priority:** High

### 2. Portability
- **Description:** Fully responsive web application accessible on various devices.
- **Acceptance Criteria:** Works seamlessly on modern web browsers and different screen sizes.
- **Priority:** High

### 3. Security
- **Description:** Secure data storage and compliance with **LGPD** (General Data Protection Law).
- **Acceptance Criteria:** Data encryption and protection against unauthorized access.
- **Priority:** High

### 4. Authentication & Access Control
- **Description:** Role-based access control to restrict functionalities based on user profiles.
- **Acceptance Criteria:** Users access only the features permitted for their roles.
- **Priority:** High

### 5. Audit Logging
- **Description:** Logging of user activities for traceability and compliance.
- **Acceptance Criteria:** Logs include user, operation, date, and time, stored securely.
- **Priority:** Medium

## Technology Stack

### Frontend
- **Framework:** React
- **Package Manager:** NPM or Yarn

### Backend
- **Framework:** FastAPI
- **Package Manager:** Poetry

### Database
- **Relational Database:** PostgreSQL

### Deployment
- **Containerization:** Docker & Docker Compose

### Code Quality
- **Static Analysis & Code Quality:** SonarQube
- **Documentation:** Inline code docs (e.g., using `pydoc` for Python functions)

## Project Structure

```plaintext
sisgest/
├── frontend/        # Frontend code (React/Vue)
│   └── src/
│       ├── components/
│       ├── pages/
│       └── assets/
│
├── backend/         # Backend code (FastAPI)
│   └── app/
│       ├── main.py
│       ├── models/
│       └── routes/
│
└── docker-compose.yml  # Docker configuration
```

## Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** (Latest LTS)
- **Python 3.8+**
- **Poetry**
- **Docker**

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://internal-repo-url.git
   cd sisgest
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   poetry install
   ```

### Running the Project

1. **Start Backend:**
   ```bash
   cd backend
   poetry run uvicorn main:app --reload
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

Access the application at `http://localhost:3000`.

### Docker Deployment

1. **Build and Start Containers:**
   ```bash
   docker compose up --build
   ```

## Contributing

Please refer to the `CONTRIBUTING.md` for guidelines on contributing to Sisgest.

---

**Sisgest** © 2024. All rights reserved.
