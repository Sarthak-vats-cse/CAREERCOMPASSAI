import json


def load_career_data():

    with open(
        "data/datasets/career_roles.json",
        "r"
    ) as file:

        careers = json.load(file)

    with open(
        "data/datasets/career_info.json",
        "r"
    ) as file:

        career_info = json.load(file)

    return careers, career_info


def career_match(
    user_skills,
    cgpa=0,
    projects=0,
    certifications=0,
    interests=None
):

    careers, career_info = load_career_data()

    if interests is None:
        interests = []

    user_skills = [
        skill.lower().strip()
        for skill in user_skills
    ]

    interests = [
        interest.lower().strip()
        for interest in interests
    ]

    matches = []

    for role, details in careers.items():

        required_skills = [

            skill.lower().strip()

            for skill in details["required_skills"]

        ]

        # ===================================
        # Skill Match (55 Marks)
        # ===================================

        matched = len(
            set(user_skills).intersection(
                set(required_skills)
            )
        )

        skill_ratio = matched / len(required_skills)

        skills_score = skill_ratio * 55

        # ===================================
        # CGPA (15 Marks)
        # ===================================

        cgpa_score = (cgpa / 10) * 15

        # ===================================
        # Projects (10 Marks)
        # ===================================

        project_score = min(
            projects * 2,
            10
        )

        # ===================================
        # Certifications (10 Marks)
        # ===================================

        certification_score = min(
            certifications * 2,
            10
        )

        # ===================================
        # Career Interest (10 Marks)
        # ===================================

        interest_score = 0

        if role.lower() in interests:

            interest_score = 10

        total_score = round(

            skills_score +

            cgpa_score +

            project_score +

            certification_score +

            interest_score,

            2

        )

        matches.append({

            "role": role,

            "match_percentage": total_score,

            "matched_skills": matched,

            "required_skills": len(required_skills),

            "salary":
                career_info[role]["salary"],

            "industry_demand":
                career_info[role]["industry_demand"],

            "description":
                career_info[role]["description"]

        })

    matches.sort(

        key=lambda x: x["match_percentage"],

        reverse=True

    )

    return matches


def skill_gap_analysis(
    user_skills,
    target_role=None
):

    careers, career_info = load_career_data()

    user_skills = [

        skill.lower().strip()

        for skill in user_skills

    ]

    if target_role is None:

        best_match = career_match(
            user_skills
        )[0]

        target_role = best_match["role"]

    required_skills = careers[target_role]["required_skills"]

    matched_skills = []

    missing_skills = []

    for skill in required_skills:

        if skill.lower() in user_skills:

            matched_skills.append(skill)

        else:

            missing_skills.append(skill)

    percentage = round(

        (

            len(matched_skills)

            /

            len(required_skills)

        ) * 100,

        2

    )

    return {

        "target_role": target_role,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "match_percentage": percentage

    }