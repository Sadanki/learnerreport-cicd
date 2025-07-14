Here’s a clean and informative `README.md` for your project, describing the setup using Jenkins, Docker, Docker Hub, MongoDB, and Docker Compose:

---

## 📘 Learner Report Backend – CI/CD with Docker, Jenkins, and MongoDB

This project contains the **backend service** for LearnerReportCS. It is built using **Node.js**, **Express**, and **MongoDB**, and is deployed using **Jenkins**, **Docker Hub**, and **Docker Compose**.

---

### 📦 Features

* RESTful API for managing students, admins, faculty, and batch data.
* MongoDB as the backend database.
* Dockerized backend service with CI/CD automation via Jenkins.
* Supports local development using `docker-compose`.

---

### 📁 Folder Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── config.env
├── Jenkinsfile
└── ...
```

---

### 🚀 Quick Start with Docker Compose (Local)

Make sure you have **Docker Desktop** installed.

1. **Create `.env` file** (if not already there):

   ```env
   MONGO_URL=mongodb://mongo:27017/learnerReports
   HASH_KEY=thisIsMyHashKey
   JWT_SECRET_KEY=thisIsMyJwtSecretKey
   ```

2. **Run containers**:

   ```bash
   docker-compose up --build
   ```

3. Visit health check endpoint:

   ```
   http://localhost:3001/
   ```

---

### 🛠️ Jenkins CI/CD Pipeline

Jenkinsfile automates:

1. Build Docker image of the backend.
2. Push image to Docker Hub: [`vignesh342/learnerreport-backend`](https://hub.docker.com/repository/docker/vignesh342/learnerreport-backend).
3. (Optional) Deploy to Kubernetes using Helm (disabled for local EC2 setup).

#### Example Jenkinsfile Stage:

```groovy
pipeline {
  agent any
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-vignesh')
  }
  stages {
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t vignesh342/learnerreport-backend:latest .'
      }
    }
    stage('Push to DockerHub') {
      steps {
        withDockerRegistry([credentialsId: 'dockerhub-vignesh', url: 'https://index.docker.io/v1/']) {
          sh 'docker push vignesh342/learnerreport-backend:latest'
        }
      }
    }
  }
}
```

---

### 🧪 API Testing

Once the backend is running, test registration like this (PowerShell):

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/student/register" -Method Post `
  -Body '{"name":"John Doe","email":"john@example.com","password":"test123"}' `
  -ContentType "application/json"
```

Expected response:

```json
{
  "message": "registered"
}
```

---

### 🔧 Requirements

* Docker
* Node.js (for development)
* Jenkins (for CI/CD)
* MongoDB (Dockerized)
* Docker Hub Account

---
