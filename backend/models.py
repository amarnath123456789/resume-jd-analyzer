from pydantic import BaseModel
from typing import List, Literal


class StrongMatch(BaseModel):
    skill: str
    evidence: str
    confidence: Literal["high", "medium", "low"]


class MissingSkill(BaseModel):
    skill: str
    importance: Literal["critical", "important", "optional"]
    reason: str


class WeakEvidence(BaseModel):
    skill: str
    issue: str
    suggested_fix: str


class ImprovementItem(BaseModel):
    action: str
    linked_skill: str
    estimated_effort: Literal["short", "medium", "long"]
    resume_impact: Literal["high", "medium", "low"]


class AnalysisResponse(BaseModel):
    overall_match_score: int

    strong_matches: List[StrongMatch]
    missing_skills: List[MissingSkill]
    weak_evidence: List[WeakEvidence]
    improvement_plan: List[ImprovementItem]

    final_summary: str
