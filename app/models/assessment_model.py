from pydantic import BaseModel
from typing import List


class AssessmentRequest(BaseModel):
    skills: List[str]
    cgpa: float
    number_of_projects: int
    number_of_certifications: int
    career_interests: List[str]