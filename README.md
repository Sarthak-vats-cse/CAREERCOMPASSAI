# CAREERCOMPASSAI

# Career Compass AI

Career Compass AI is an AI-powered career guidance platform that helps students identify the most suitable technology career paths based on their skills, academic profile, and interests.

The platform provides:

* Career Recommendations
* Career Readiness Score
* Skill Gap Analysis
* Personalized Learning Roadmap
* Recommended Certifications
* Career Explorer

---

# Tech Stack

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* Python
* FastAPI

---

# Repository Structure

This project is maintained using **two Git branches**.

| Branch       | Contents                           |
| ------------ | ---------------------------------- |
| **frontend** | HTML, CSS, JavaScript files        |
| **backend**  | FastAPI backend, APIs and datasets |

To run the project successfully, both branches are required.

---

# Prerequisites

Install the following before running the project:

* Python 3.10+
* Git
* VS Code (Recommended)
* Live Server Extension (VS Code)

---

# Step 1 - Clone Repository

```bash
git clone https://github.com/Sarthak-vats-cse/CAREERCOMPASSAI.git
```

```bash
cd CAREERCOMPASSAI
```

---

# Step 2 - Create Two Separate Project Folders

Create two folders anywhere on your computer.

Example:

```
CareerCompassAI-Frontend
CareerCompassAI-Backend
```

---

# Step 3 - Setup Backend

Open Terminal

```bash
cd CareerCompassAI-Backend
```

Clone the repository

```bash
git clone https://github.com/Sarthak-vats-cse/CAREERCOMPASSAI.git
```

Move inside the repository

```bash
cd CAREERCOMPASSAI
```

Switch to backend branch

```bash
git checkout backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
uvicorn main:app --reload
```

Backend will run at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

**Keep this terminal running throughout the demo.**

---

# Step 4 - Setup Frontend

Open another terminal

Navigate to your frontend folder

```bash
cd CareerCompassAI-Frontend
```

Clone repository

```bash
git clone https://github.com/Sarthak-vats-cse/CAREERCOMPASSAI.git
```

Move inside repository

```bash
cd CAREERCOMPASSAI
```

Switch to frontend branch

```bash
git checkout frontend
```

Open this folder in VS Code.

Locate

```
index.html
```

Right Click

```
Open with Live Server
```

The application will automatically open in your browser.

---

# Running the Project

For proper functionality:

✅ Keep the FastAPI backend terminal running.

✅ Open the frontend using Live Server.

Both must run simultaneously.

---

# How to Use

1. Open the website.
2. Click **Start Assessment**.
3. Select your technical skills.
4. Enter your CGPA.
5. Enter the number of projects completed.
6. Enter the number of certifications.
7. Select your career interests.
8. Click **Analyze Career**.
9. View:

   * Career Readiness Score
   * Top Career Matches
   * Skill Gap Analysis
   * Personalized Learning Roadmap
   * Recommended Certifications
   * Career Insights

---

# Features

* AI-based Career Recommendation
* Career Readiness Assessment
* Skill Gap Detection
* Personalized Learning Roadmap
* Certification Suggestions
* Career Explorer Dashboard
* Responsive User Interface

---

# Important Note

The frontend communicates with the FastAPI backend using REST APIs.

If the backend server is not running, career recommendations and analysis will not function correctly.

Please ensure the backend server remains running before opening the frontend.


---

# Team

Developed for Hackathon Submission.
