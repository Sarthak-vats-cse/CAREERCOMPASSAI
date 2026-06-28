from app.services.career_match_service import (
    career_match,
    skill_gap_analysis
)

from app.services.roadmap_service import (
    get_roadmap
)

import json


def load_certifications():

    with open(
        "data/datasets/certifications.json",
        "r"
    ) as file:

        return json.load(file)


def load_career_info():

    with open(
        "data/datasets/career_info.json",
        "r"
    ) as file:

        return json.load(file)


def build_results(

    skills,
    projects,
    certifications,
    cgpa=8,
    interests=None

):

    if interests is None:
        interests = []

    matches = career_match(

        skills,

        cgpa,

        len(projects),

        len(certifications),

        interests

    )

    best_career = matches[0]["role"]

    skill_gap = skill_gap_analysis(

        skills,

        best_career

    )

    roadmap = get_roadmap(

        best_career

    )

    certifications_data = load_certifications()

    career_info = load_career_info()

    info = career_info[best_career]

    # ==========================
    # Readiness Score
    # ==========================

    skills_score = min(
        (len(skills) / 10) * 100,
        100
    )

    projects_score = min(
        (len(projects) / 5) * 100,
        100
    )

    certifications_score = min(
        (len(certifications) / 3) * 100,
        100
    )

    academic_score = min(
        (cgpa / 10) * 100,
        100
    )

    readiness_score = round(

        skills_score * 0.40 +

        projects_score * 0.25 +

        certifications_score * 0.15 +

        academic_score * 0.20

    )

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

        "top_career_matches": [

            {

                "career": match["role"],

                "match_percentage": match["match_percentage"]

            }

            for match in matches[:3]

        ],

        "missing_skills": skill_gap["missing_skills"],

        "recommended_learning_path": roadmap["roadmap"],

        "recommended_certifications":

            certifications_data.get(

                best_career,

                []

            ),

        "career_insight": {

            "salary": info["salary"],

            "industry_demand": info["industry_demand"],

            "description": info["description"],

            "entry_barrier": info["entry_barrier"],

            "work_style": info["work_style"],

            "recommended_for": info["recommended_for"]

        }

    }