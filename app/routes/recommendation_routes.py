import json
from fastapi import APIRouter

from app.models.assessment_model import AssessmentRequest

from app.services.career_match_service import (
    career_match,
    skill_gap_analysis,
    load_career_data
)

from app.services.roadmap_service import (
    get_roadmap
)

from app.services.readiness_service import (
    calculate_readiness
)

router = APIRouter()


@router.post("/recommendation")
def recommendation_route(data: AssessmentRequest):

    # --------------------------------
    # Career Matching
    # --------------------------------

    matches = career_match(
        user_skills=data.skills,
        cgpa=data.cgpa,
        projects=data.number_of_projects,
        certifications=data.number_of_certifications,
        interests=data.career_interests
    )

    best_career = matches[0]["role"]

    # --------------------------------
    # Skill Gap
    # --------------------------------

    skill_gap = skill_gap_analysis(
        data.skills,
        best_career
    )

    # --------------------------------
    # Roadmap
    # --------------------------------

    roadmap = get_roadmap(
        best_career
    )

    # --------------------------------
    # Readiness
    # --------------------------------

    readiness = calculate_readiness(
        cgpa=data.cgpa,
        skills=data.skills,
        projects=data.number_of_projects,
        certifications=data.number_of_certifications
    )

    # --------------------------------
    # Career Info
    # --------------------------------

    careers, career_info = load_career_data()

    # --------------------------------
    # Certifications
    # --------------------------------

    with open(
        "data/datasets/certifications.json",
        "r"
    ) as file:

        certifications = json.load(file)

    # --------------------------------
    # Final Response
    # --------------------------------

    return {

        "career_readiness_score":
            readiness["career_readiness_score"],

        "readiness_level":
            readiness["readiness_level"],

        "top_career_matches": [

            {

                "career": match["role"],

                "match_percentage":
                    match["match_percentage"]

            }

            for match in matches[:3]

        ],

        "missing_skills":
            skill_gap["missing_skills"],

        "recommended_learning_path":
            roadmap["roadmap"],

        "recommended_certifications":
            certifications.get(best_career, []),

        "career_insight":
            career_info.get(best_career, {})

    }