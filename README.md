
# Contact Identification API

A simple Node.js REST API that identifies and consolidates user contact information based on email and phone number. This project is containerized using Docker, deployed to Kubernetes, and integrated with AWS CI/CD using GitHub Actions.

---

## 🚀 Features

- RESTful `/identify` endpoint
- In-memory contact linking logic
- Dockerized application
- Kubernetes deployment-ready
- AWS CI/CD pipeline (GitHub Actions → ECR → EKS)

---

## 📁 Project Structure

```
.
├── server.js                 # Main Express server
├── Dockerfile               # Docker config for the app
├── k8s_deployment_v1.yaml   # Kubernetes deployment and service definition
└── .github/
    └── workflows/
        └── aws-ci-cd.yml    # GitHub Actions workflow for AWS deployment
```

---

## 🛠️ Setup & Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/vaibhav208/cloud-backend-assignment.git
cd cloud-backend-assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
node server.js
```

- Server runs on: `http://localhost:3000`

---

## 🧪 API Usage

### POST `/identify`

**Request:**
```json
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
```

**Response (example):**
```json
{
  "primaryContactId": 1,
  "emails": ["john@example.com"],
  "phoneNumbers": ["1234567890"],
  "secondaryContactIds": []
}
```

---

## 🐳 Docker

### Build & Run

```bash
docker build -t contact-app .
docker run -p 3000:3000 contact-app
```

---

## ☸️ Kubernetes Deployment

1. Push Docker image to ECR (handled via GitHub Actions)

2. Apply K8s configs:
```bash
kubectl apply -f k8s_deployment_v1.yaml
```

---

## 🚀 CI/CD with GitHub Actions + AWS

This repo includes a GitHub Actions workflow that:
- Builds and tags Docker image
- Pushes it to Amazon ECR
- Deploys it to Amazon EKS using `kubectl`

### Secrets Required
Add the following to your GitHub repo under **Settings → Secrets**:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

---
