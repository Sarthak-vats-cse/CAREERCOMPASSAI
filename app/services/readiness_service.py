def calculate_readiness(
    cgpa,
    skills,
    projects,
    certifications
):

    # ==========================================
    # Skills Score (40%)
    # ==========================================

    skill_count = len(skills)

    if skill_count >= 10:
        skills_score = 100
    elif skill_count >= 8:
        skills_score = 90
    elif skill_count >= 6:
        skills_score = 75
    elif skill_count >= 4:
        skills_score = 60
    elif skill_count >= 2:
        skills_score = 40
    else:
        skills_score = 20

    # ==========================================
    # Projects Score (25%)
    # ==========================================

    if projects >= 5:
        projects_score = 100
    elif projects >= 4:
        projects_score = 85
    elif projects >= 3:
        projects_score = 70
    elif projects >= 2:
        projects_score = 55
    elif projects >= 1:
        projects_score = 35
    else:
        projects_score = 10

    # ==========================================
    # Certifications Score (15%)
    # ==========================================

    if certifications >= 4:
        certifications_score = 100
    elif certifications >= 3:
        certifications_score = 80
    elif certifications >= 2:
        certifications_score = 60
    elif certifications >= 1:
        certifications_score = 40
    else:
        certifications_score = 10

    # ==========================================
    # Academic Score (20%)
    # ==========================================

    if cgpa >= 9.5:
        academic_score = 100
    elif cgpa >= 9:
        academic_score = 90
    elif cgpa >= 8:
        academic_score = 80
    elif cgpa >= 7:
        academic_score = 70
    elif cgpa >= 6:
        academic_score = 60
    else:
        academic_score = 45

    # ==========================================
    # Final Readiness Score
    # ==========================================

    readiness_score = round(

        skills_score * 0.40 +

        projects_score * 0.25 +

        certifications_score * 0.15 +

        academic_score * 0.20

    )

    # ==========================================
    # Readiness Level
    # ==========================================

    if readiness_score >= 90:
        level = "Excellent"

    elif readiness_score >= 75:
        level = "Job Ready"

    elif readiness_score >= 60:
        level = "Developing"

    elif readiness_score >= 40:
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