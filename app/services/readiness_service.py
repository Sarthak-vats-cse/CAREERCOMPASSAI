def calculate_readiness(
    cgpa,
    skills,
    projects,
    certifications
):

    # -----------------------------
    # Skills (40%)
    # -----------------------------

    skills_score = min(
        (len(skills) / 10) * 100,
        100
    )

    # -----------------------------
    # Projects (25%)
    # -----------------------------

    projects_score = min(
        (projects / 5) * 100,
        100
    )

    # -----------------------------
    # Certifications (15%)
    # -----------------------------

    certifications_score = min(
        (certifications / 3) * 100,
        100
    )

    # -----------------------------
    # CGPA (20%)
    # -----------------------------

    academic_score = min(
        (cgpa / 10) * 100,
        100
    )

    # -----------------------------
    # Final Score
    # -----------------------------

    readiness_score = round(

        skills_score * 0.40 +

        projects_score * 0.25 +

        certifications_score * 0.15 +

        academic_score * 0.20

    )

    # -----------------------------
    # Level
    # -----------------------------

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

        "skills_score": round(skills_score,2),

        "projects_score": round(projects_score,2),

        "certifications_score": round(certifications_score,2),

        "academic_score": round(academic_score,2)

    }