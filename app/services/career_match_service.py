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
        skill.lower()
        for skill in user_skills
    ]

    interests = [
        interest.lower()
        for interest in interests
    ]

    matches = []

    for role, details in careers.items():

        required_skills = [

            skill.lower()

            for skill in details["required_skills"]

        ]

        # =====================================
        # Skills Score (50 Marks)
        # =====================================

        matched = len(

            set(user_skills).intersection(
                set(required_skills)
            )

        )

        skill_ratio = matched / len(required_skills)

        if skill_ratio >= 0.80:
            skills_score = 50

        elif skill_ratio >= 0.65:
            skills_score = 44

        elif skill_ratio >= 0.50:
            skills_score = 38

        elif skill_ratio >= 0.35:
            skills_score = 30

        elif skill_ratio >= 0.20:
            skills_score = 20

        else:
            skills_score = 10

        # =====================================
        # CGPA (15 Marks)
        # =====================================

        cgpa_score = min(

            (cgpa / 10) * 15,

            15

        )

        # =====================================
        # Projects (15 Marks)
        # =====================================

        project_score = min(

            projects * 3,

            15

        )

        # =====================================
        # Certifications (10 Marks)
        # =====================================

        certification_score = min(

            certifications * 5,

            10

        )

        # =====================================
        # Career Interest (20 Marks)
        # =====================================

        interest_score = 0

        if role.lower() in interests:

            interest_score = 20

        # =====================================
        # Total Score
        # =====================================

        total_score = round(

            skills_score +

            cgpa_score +

            project_score +

            certification_score +

            interest_score,

            2

        )

        # =====================================
        # Score Scaling
        # =====================================

        if total_score >= 80:

            total_score = min(98, total_score + 2)

        elif total_score >= 60:

            total_score = min(90, total_score + 10)

        elif total_score >= 40:

            total_score = min(75, total_score + 15)

        elif total_score >= 20:

            total_score = min(55, total_score + 10)

        else:

            total_score = min(35, total_score + 5)

        matches.append({

            "role": role,

            "match_percentage": round(total_score, 2),

            "salary":
                career_info[role]["salary"],

            "industry_demand":
                career_info[role]["industry_demand"],

            "description":
                career_info[role]["description"]

        })

    matches.sort(

        key=lambda x:
            x["match_percentage"],

        reverse=True

    )

    return matches


def skill_gap_analysis(
    user_skills,
    target_role=None
):

    careers, career_info = load_career_data()

    user_skills_lower = [

        skill.lower()

        for skill in user_skills

    ]

    if target_role is None:

        best_match = career_match(
            user_skills
        )[0]

        target_role = best_match["role"]

    required_skills = careers[
        target_role
    ]["required_skills"]

    matched_skills = []

    missing_skills = []

    for skill in required_skills:

        if skill.lower() in user_skills_lower:

            matched_skills.append(skill)

        else:

            missing_skills.append(skill)

    return {

        "target_role":
            target_role,

        "matched_skills":
            matched_skills,

        "missing_skills":
            missing_skills,

        "match_percentage": round(

            (

                len(matched_skills)

                /

                len(required_skills)

            ) * 100,

            2

        )

    }