# Career Compass AI - Career Matching Logic

## Objective

Recommend careers by comparing a student's skills with the required skills of each career.

---

## Step 1: Extract User Skills

The system receives skills from:

* Resume Upload
* Skill Selection Form
* Profile Builder

Example:

User Skills:

* Python
* SQL
* Pandas
* NumPy

---

## Step 2: Compare Against Career Skills

Example Career:

Data Scientist

Required Skills:

* Python
* SQL
* Statistics
* Machine Learning
* Pandas
* NumPy
* Data Visualization

Matched Skills:

* Python
* SQL
* Pandas
* NumPy

Matched Count = 4

Required Count = 7

---

## Step 3: Calculate Match Percentage

Formula:

Match Percentage =

(Matched Skills ÷ Required Skills) × 100

Example:

(4 ÷ 7) × 100

= 57%

---

## Step 4: Rank Careers

Calculate match percentage for every career.

Example:

Data Scientist → 57%

Backend Developer → 42%

Data Analyst → 35%

Frontend Developer → 10%

Sort descending.

Top careers become recommendations.

---

## Step 5: Identify Missing Skills

Missing Skills =

Required Skills - User Skills

Example:

Missing:

* Statistics
* Machine Learning
* Data Visualization

These become Skill Gap Recommendations.

---

## Output

The system returns:

* Top Career Matches
* Match Percentage
* Missing Skills
* Learning Path
* Recommended Certifications
