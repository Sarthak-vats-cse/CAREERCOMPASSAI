# Career Compass AI - Career Readiness Scoring Logic

## Objective

Calculate a readiness score between 0 and 100 that represents how prepared a student is for their chosen career path.

---

## Scoring Components

### Skills Score (40%)

Measures how many required skills the student possesses.

Example:

Required Skills = 10

Student Skills = 7

Skills Score = 70

Weight = 40%

Contribution = 28

---

### Projects Score (25%)

Measures practical project experience.

Scoring:

0 Projects = 20

1-2 Projects = 50

3-4 Projects = 80

5+ Projects = 100

Weight = 25%

---

### Certifications Score (15%)

Measures professional learning.

Scoring:

0 Certifications = 0

1 Certification = 50

2 Certifications = 80

3+ Certifications = 100

Weight = 15%

---

### Academic Score (20%)

Based on CGPA.

Formula:

(CGPA ÷ 10) × 100

Weight = 20%

---

## Final Formula

Career Readiness Score =

(Skills Score × 0.40)

*

(Projects Score × 0.25)

*

(Certifications Score × 0.15)

*

(Academic Score × 0.20)

---

## Readiness Levels

90-100 → Excellent

75-89 → Job Ready

60-74 → Developing

40-59 → Beginner

0-39 → Needs Improvement

---

## Output

The system returns:

* Career Readiness Score
* Readiness Level
* Missing Skills
* Recommended Next Steps
