---

# Contributing to Sisgest

Welcome to the Sisgest project! This document outlines our guidelines for internal collaboration. Please review it to ensure smooth development and consistency across our codebase.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Issue and Feature Request Guidelines](#issue-and-feature-request-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Coding Standards](#coding-standards)
8. [Testing Practices](#testing-practices)
9. [Commit Message Guidelines](#commit-message-guidelines)
10. [Documentation](#documentation)

---

## Code of Conduct

Our team is committed to maintaining a professional and respectful environment. Treat everyone with respect, keep communication constructive, and report any concerns to the project lead.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS)
- Python (for backend development)
- Docker (optional for containerization)
- NPM/Yarn for package management
- Database access (MySQL/PostgreSQL)

### Clone the Repository

```bash
git clone https://internal-repo-url.git
cd sisgest
```

### Install Dependencies

Navigate to the appropriate directory and install dependencies:

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

---

## Project Structure

```
sisgest/
├── frontend/       # React/Vue.js/Angular application
├── backend/        # Node.js/Express/Django/FastAPI server
├── docs/           # Documentation and design specifications
└── scripts/        # Automation and utility scripts
```

---

## Development Workflow

1. **Create a Branch:**  
   Use the following naming convention:
   ```
   git checkout -b feature/short-description
   ```

2. **Implement Changes:**  
   Make small, logical commits as you progress.

3. **Run Tests:**  
   Verify your changes don’t break existing functionality:
   ```bash
   # Frontend
   npm run test

   # Backend
   pytest
   ```

4. **Push Changes:**  
   ```bash
   git push origin feature/short-description
   ```

5. **Submit a Pull Request:**  
   Ensure your PR description includes:
   - The task or issue reference
   - A summary of changes
   - Relevant context or notes

---

## Issue and Feature Request Guidelines

- **Internal Communication:**  
  Ensure issues and feature requests are communicated clearly within our project management tools.

- **Detailed Descriptions:**  
  Include:
  - Steps to reproduce (for bugs)
  - Proposed solutions or enhancements
  - Relevant diagrams or screenshots

---

## Pull Request Process

1. **Complete Your Feature:** Ensure all tests pass and code standards are followed.
2. **Open a Pull Request:**  
   - Follow the PR template.
   - Ensure your branch is up to date with `main`.
   - Tag relevant reviewers from the team.

---

## Coding Standards

- **Frontend:**  
  Follow our internal JavaScript/TypeScript guidelines.

- **Backend:**  
  Adhere to [PEP8](https://www.python.org/dev/peps/pep-0008/) for Python or our internal Node.js standards.

- **General:**  
  - Use clear and descriptive names for variables and functions.
  - Keep functions focused and concise.
  - Document complex logic.
  - Update documentation for new modules.
  
- **Static Code Analysis:**  
  Use tools like **SonarQube** to ensure code quality and catch potential issues early.

---

## Testing Practices

- **Unit Tests:** Required for all new features.
- **Integration Tests:** Necessary for changes affecting multiple modules.
- **Acceptance Tests:** Verify that user stories and requirements are met.
- **CI/CD Pipeline:** All tests must pass before merging.

---

## Commit Message Guidelines

Format your commit messages as follows:

```
type(scope): short description

body (optional)
```

**Types:**  
- `feat`: New feature  
- `fix`: Bug fix  
- `docs`: Documentation update  
- `style`: Code formatting  
- `refactor`: Code refactoring  
- `test`: Adding or updating tests  
- `chore`: Maintenance tasks  

---

## Documentation

- **Update Documentation:** Ensure changes are reflected in `README.md` or other relevant docs.
- **In-Code Documentation:**  
  - Add concise docstrings for functions and classes using tools like **pydoc** for Python.
  - For JavaScript/TypeScript, use **JSDoc** comments.
- **API Documentation:** Keep API specs up-to-date with request/response examples.

---

Thank you for contributing to Sisgest! Your effort helps us build a robust and efficient school management system.

