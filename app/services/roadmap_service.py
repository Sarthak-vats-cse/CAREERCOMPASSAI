import json


def get_roadmap(career_name):

    with open(
        "data/datasets/learning_paths.json",
        "r"
    ) as file:

        learning_paths = json.load(file)

    roadmap = learning_paths.get(
        career_name,
        []
    )

    return {
        "career": career_name,
        "roadmap": roadmap
    }