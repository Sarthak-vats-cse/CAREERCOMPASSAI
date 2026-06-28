def calculate_readiness(
    cgpa,
    skills,
    projects,
    certifications
):

    # -----------------------------
    # Skills (0-35)
    # -----------------------------

    skill_count = len(skills)

    if skill_count >= 8:
        skills_score = 35
    elif skill_count >= 6:
        skills_score = 30
    elif skill_count >= 4:
        skills_score = 24
    elif skill_count >= 2:
        skills_score = 16
    else:
        skills_score = 8

    # -----------------------------
    # Projects (0-25)
    # -----------------------------

    if projects >= 5:
        projects_score = 25
    elif projects >= 4:
        projects_score = 21
    elif projects >= 3:
        projects_score = 17
    elif projects >= 2:
        projects_score = 12
    elif projects >= 1:
        projects_score = 6
    else:
        projects_score = 0

    # -----------------------------
    # Certifications (0-15)
    # -----------------------------

    if certifications >= 4:
        certifications_score = 15
    elif certifications >= 3:
        certifications_score = 12
    elif certifications >= 2:
        certifications_score = 9
    elif certifications >= 1:
        certifications_score = 5
    else:
        certifications_score = 0

    # -----------------------------
    # CGPA (0-25)
    # -----------------------------

    if cgpa >= 9.5:
        academic_score = 25
    elif cgpa >= 9:
        academic_score = 22
    elif cgpa >= 8:
        academic_score = 18
    elif cgpa >= 7:
        academic_score = 14
    elif cgpa >= 6:
        academic_score = 10
    else:
        academic_score = 5

    # -----------------------------
    # Final Score
    # -----------------------------

    readiness_score = round(

        skills_score +

        projects_score +

        certifications_score +

        academic_score

    )

    # -----------------------------
    # Level
    # -----------------------------

    if readiness_score >= 85:
        level = "Excellent"

    elif readiness_score >= 70:
        level = "Job Ready"

    elif readiness_score >= 55:
        level = "Developing"

    elif readiness_score >= 35:
        level = "Beginner"

    else:
        level = "Needs Improvement"

    return {

        "career_readiness_score": readiness_score,

        "readiness_level": level,

        "skills_score": skills_score,

        "projects_score": projects_score,

        "certifications_score": certifications_score,

        "academic_score": academic_score

    }