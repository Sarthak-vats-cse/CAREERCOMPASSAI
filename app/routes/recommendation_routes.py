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

    # ============================================
    # Career Matching
    # ============================================

    matches = career_match(
        user_skills=data.skills,
        cgpa=data.cgpa,
        projects=data.number_of_projects,
        certifications=data.number_of_certifications,
        interests=data.career_interests
    )

    best_match = matches[0]

    best_career = best_match["role"]

    # ============================================
    # Skill Gap
    # ============================================

    skill_gap = skill_gap_analysis(
        data.skills,
        best_career
    )

    # ============================================
    # Learning Roadmap
    # ============================================

    roadmap = get_roadmap(
        best_career
    )

    # ============================================
    # Readiness
    # ============================================

    readiness = calculate_readiness(
        cgpa=data.cgpa,
        skills=data.skills,
        projects=data.number_of_projects,
        certifications=data.number_of_certifications
    )

    # ============================================
    # Career Information
    # ============================================

    careers, career_info = load_career_data()

    info = career_info.get(best_career, {})

    # ============================================
    # Certifications
    # ============================================

    with open(
        "data/datasets/certifications.json",
        "r"
    ) as file:

        certification_data = json.load(file)

    # ============================================
    # Strengths
    # ============================================

    strengths = []

    if data.cgpa >= 8:
        strengths.append("Strong Academic Performance")

    if len(data.skills) >= 6:
        strengths.append("Good Technical Skillset")

    if data.number_of_projects >= 3:
        strengths.append("Hands-on Project Experience")

    if data.number_of_certifications >= 2:
        strengths.append("Industry Certifications")

    if len(strengths) == 0:
        strengths.append("Willingness to Learn")

    # ============================================
    # Areas to Improve
    # ============================================

    improvements = []

    if data.cgpa < 7:
        improvements.append("Improve Academic Performance")

    if data.number_of_projects < 2:
        improvements.append("Build More Projects")

    if data.number_of_certifications == 0:
        improvements.append("Earn Industry Certifications")

    improvements.extend(skill_gap["missing_skills"][:3])

    # ============================================
    # Recommendation Confidence
    # ============================================

    confidence = round(

        (

            best_match["match_percentage"] * 0.65 +

            readiness["career_readiness_score"] * 0.35

        ),

        2

    )

    confidence = min(confidence, 98)

    # ============================================
    # Final Response
    # ============================================

    return {

        "career_readiness_score":
            readiness["career_readiness_score"],

        "readiness_level":
            readiness["readiness_level"],

        "recommendation_confidence":
            confidence,

        "top_career_matches":

        [

            {

                "career": match["role"],

                "match_percentage": match["match_percentage"]

            }

            for match in matches[:5]

        ],

        "strengths":

            strengths,

        "areas_to_improve":

            improvements,

        "missing_skills":

            skill_gap["missing_skills"],

        "recommended_learning_path":

            roadmap["roadmap"],

        "recommended_certifications":

            certification_data.get(
                best_career,
                []
            ),

        "career_insight":

        {

            "salary":
                info.get("salary", ""),

            "industry_demand":
                info.get("industry_demand", ""),

            "description":
                info.get("description", ""),

            "entry_barrier":
                info.get("entry_barrier", ""),

            "work_style":
                info.get("work_style", ""),

            "recommended_for":
                info.get("recommended_for", "")

        }

    }