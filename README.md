# CAREERCOMPASSAI
# Career Compass AI

Career Compass AI is an AI-powered career guidance platform that helps students identify the most suitable technology career paths based on their skills, academic profile, and interests.

The platform provides:

- Career Recommendations
- Career Readiness Score
- Skill Gap Analysis
- Personalized Learning Roadmap
- Recommended Certifications
- Career Explorer

---

# Tech Stack

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Python
- FastAPI

---

# Project Structure

```
Frontend/
│
├── css/
├── js/
├── assessment.html
├── explorer.html
├── index.html
└── results.html

Backend/
│
├── app/
├── data/
├── main.py
└── requirements.txt
```

---

# Prerequisites

Install the following before running the project:

- Python 3.10 or above
- Git
- VS Code (Recommended)

---

# Backend Setup

## Step 1

Clone the repository

```bash
git clone https://github.com/Sarthak-vats-cse/CAREERCOMPASSAI.git
```

---

## Step 2

Navigate to the Project Directory

```bash
cd CAREERCOMPASSAI
```

## Step 3

Switch to the Backend Branch

```bash
git checkout backend
```

## Step 4

Create a virtual environment

```bash
python -m venv venv
```

---

## Step 5

Activate it

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

---

## Step 6

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Step 7

Start the FastAPI server

```bash
uvicorn main:app --reload
```

The backend will start at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## Step 1

Switch to the frontend branch

```bash
git checkout frontend
```

---

## Step 2

Open the frontend folder in VS Code.

---

## Step 3

Install the Live Server extension (if not already installed).

---

## Step 4

Right-click on

```
index.html
```

Select

```
Open with Live Server
```

The frontend will open in your browser.

---

# Running the Project

1. Start the FastAPI backend.
2. Open the frontend using Live Server.
3. Complete the assessment.
4. View personalized career recommendations and insights.

---

# Features

- Career Recommendation Engine
- Readiness Score
- Skill Gap Detection
- Learning Roadmap
- Certification Suggestions
- Career Explorer Dashboard
- Responsive UI

---

# Team

Developed for Hackathon Submission.
