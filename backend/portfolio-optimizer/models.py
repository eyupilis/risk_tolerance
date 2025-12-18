"""
Pydantic models for Portfolio Optimizer API
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum


class RiskProfile(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class FundData(BaseModel):
    """Individual fund data with historical returns"""
    code: str = Field(..., description="Fund code (e.g., KZL, KPC)")
    name: str = Field(..., description="Fund name")
    returns: List[float] = Field(..., description="Historical daily/weekly returns")
    current_price: Optional[float] = Field(None, description="Current NAV price")
    total_value: Optional[float] = Field(None, description="Total fund value (AUM)")


class OptimizationRequest(BaseModel):
    """Request model for /api/optimize endpoint"""
    funds: List[FundData] = Field(..., max_length=10, description="Shortlist of funds (max 10)")
    risk_profile: RiskProfile = Field(..., description="Investor risk profile")
    risk_free_rate: float = Field(0.0, ge=0.0, le=0.5, description="Risk-free rate for Sharpe (default 0)")
    target_return: Optional[float] = Field(None, description="Target return for MVO")
    max_funds_final: int = Field(5, ge=1, le=10, description="Maximum funds in final portfolio")
    
    class Config:
        json_schema_extra = {
            "example": {
                "funds": [
                    {"code": "KZL", "name": "Altın Katılım Fonu", "returns": [0.01, 0.02, -0.01, 0.015]},
                    {"code": "KPC", "name": "Hisse Senedi Fonu", "returns": [0.02, -0.01, 0.03, 0.01]}
                ],
                "risk_profile": "medium",
                "risk_free_rate": 0.0,
                "max_funds_final": 5
            }
        }


class PortfolioAllocation(BaseModel):
    """Single fund allocation in a portfolio"""
    code: str
    name: str
    weight: float = Field(..., ge=0.0, le=1.0)
    weight_pct: float = Field(..., description="Weight as percentage")


class PortfolioMetrics(BaseModel):
    """Portfolio performance metrics"""
    expected_return: float
    volatility: float
    sharpe_ratio: float
    sortino_ratio: Optional[float] = None
    max_drawdown: Optional[float] = None
    cvar_95: Optional[float] = None
    var_95: Optional[float] = None


class CandidatePortfolio(BaseModel):
    """Single candidate portfolio from an optimization method"""
    method: str = Field(..., description="Optimization method name")
    allocations: List[PortfolioAllocation]
    metrics: PortfolioMetrics
    is_valid: bool = Field(True, description="Passes all constraints")
    notes: Optional[str] = None


class OptimizationResponse(BaseModel):
    """Response model for /api/optimize endpoint"""
    success: bool
    risk_profile: RiskProfile
    max_weight_cap: float = Field(..., description="Profile-based max weight cap applied")
    candidates: List[CandidatePortfolio] = Field(..., description="All candidate portfolios")
    best_portfolio: Optional[CandidatePortfolio] = Field(None, description="Recommended portfolio")
    computation_time_ms: float
    warnings: List[str] = Field(default_factory=list)
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "risk_profile": "medium",
                "max_weight_cap": 0.60,
                "candidates": [],
                "best_portfolio": None,
                "computation_time_ms": 150.5,
                "warnings": []
            }
        }


class ErrorResponse(BaseModel):
    """Error response model"""
    success: bool = False
    error: str
    detail: Optional[str] = None

