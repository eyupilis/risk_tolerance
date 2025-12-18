"""
Portfolio Optimizer FastAPI Microservice

Endpoints:
- POST /api/optimize - Optimize portfolio with multiple methods
- GET /api/health - Health check
"""
import time
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import (
    OptimizationRequest,
    OptimizationResponse,
    ErrorResponse,
    RiskProfile,
    CandidatePortfolio
)
from optimizer import PortfolioOptimizer, OptimizationConfig, PROFILE_WEIGHT_CAPS


app = FastAPI(
    title="Kuveyt Türk Portföy Optimizer API",
    description="Portfolio optimization microservice using PyPortfolioOpt and Riskfolio-Lib",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure Detailed Logging
import logging
import json
import datetime

# Create logger
logger = logging.getLogger("portfolio_optimizer")
logger.setLevel(logging.DEBUG)

# File handler
fh = logging.FileHandler("optimization.log", mode='w')
fh.setLevel(logging.DEBUG)

# Formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh.setFormatter(formatter)

# Add handler
logger.addHandler(fh)

def log_json(title, data):
    """Helper to log JSON data prettily"""
    try:
        logger.info(f"=== {title} ===\n" + json.dumps(data, default=str, indent=2))
    except:
        logger.info(f"=== {title} ===\n" + str(data))


# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "portfolio-optimizer",
        "version": "1.0.0"
    }


@app.post("/api/optimize", response_model=OptimizationResponse)
async def optimize_portfolio(request: OptimizationRequest):
    """
    Optimize portfolio using multiple methods.
    
    Returns all candidate portfolios from:
    - MVO (Max Sharpe, Min Volatility)
    - HRP (Hierarchical Risk Parity)
    - CVaR (Conditional Value at Risk)
    - Risk Parity (Riskfolio-Lib)
    - Worst-Case MV (Riskfolio-Lib)
    """
    start_time = time.time()
    warnings: List[str] = []
    
    try:
        # Validate input
        if len(request.funds) < 2:
            raise HTTPException(
                status_code=400,
                detail="At least 2 funds required for portfolio optimization"
            )
        
        if len(request.funds) > 10:
            raise HTTPException(
                status_code=400,
                detail="Maximum 10 funds allowed in shortlist"
            )
        
        # Check returns data
        for fund in request.funds:
            if len(fund.returns) < 10:
                warnings.append(f"Fund {fund.code} has only {len(fund.returns)} return observations (recommended: 30+)")
        
        # Log incoming request
        log_json("New Optimization Request", {
            "risk_profile": request.risk_profile,
            "funds_count": len(request.funds),
            "funds_list": [f.code for f in request.funds],
            "config": {
                "max_funds": request.max_funds_final,
                "rf": request.risk_free_rate
            }
        })

        # Calculate returns stats for logging
        fund_stats = []
        for f in request.funds:
            import numpy as np
            returns = np.array(f.returns)
            if len(returns) > 0:
                fund_stats.append({
                    "code": f.code,
                    "mean_ret": float(np.mean(returns)),
                    "std_dev": float(np.std(returns)),
                    "data_points": len(returns)
                })
        log_json("Fund Return Statistics", fund_stats)

        # Create optimization config
        config = OptimizationConfig(
            risk_profile=request.risk_profile,
            risk_free_rate=request.risk_free_rate,
            max_funds_final=request.max_funds_final,
            target_return=request.target_return
        )
        
        # Initialize optimizer
        optimizer = PortfolioOptimizer(request.funds, config)
        
        # Run all optimization methods
        candidates = optimizer.run_all_optimizations()

        # Log candidates overview
        candidate_summary = []
        for c in candidates:
            candidate_summary.append({
                "method": c.method,
                "valid": c.is_valid,
                "sharpe": c.metrics.sharpe_ratio,
                "allocations": {a.code: a.weight_pct for a in c.allocations}
            })
        log_json("Optimization Candidates Generated", candidate_summary)
        
        # Count failed optimizations
        failed = [c for c in candidates if not c.is_valid]
        if failed:
            warnings.append(f"{len(failed)} optimization method(s) failed: {', '.join([c.method for c in failed])}")
        
        # Select best portfolio
        best_portfolio = optimizer.select_best_portfolio(candidates)
        
        if best_portfolio:
            log_json("Selected Best Portfolio", {
                "method": best_portfolio.method,
                "metrics": best_portfolio.metrics.dict(),
                "allocations": best_portfolio.allocations
            })
        else:
            logger.warning("No valid portfolio selected!")

        computation_time = (time.time() - start_time) * 1000
        
        response = OptimizationResponse(
            success=True,
            risk_profile=request.risk_profile,
            max_weight_cap=PROFILE_WEIGHT_CAPS[request.risk_profile],
            candidates=candidates,
            best_portfolio=best_portfolio,
            computation_time_ms=round(computation_time, 2),
            warnings=warnings
        )
        
        log_json("Final Response Sent", response.dict())
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        computation_time = (time.time() - start_time) * 1000
        raise HTTPException(
            status_code=500,
            detail=f"Optimization failed: {str(e)}"
        )


@app.get("/api/profiles")
async def get_risk_profiles():
    """Get available risk profiles and their weight caps"""
    return {
        "profiles": [
            {
                "id": "low",
                "name": "Sağlamcı (Muhafazakar)",
                "max_weight_cap": 0.40,
                "description": "Düşük risk toleransı, sermaye koruma odaklı"
            },
            {
                "id": "medium",
                "name": "Temkinli (Dengeli)",
                "max_weight_cap": 0.60,
                "description": "Orta risk toleransı, dengeli büyüme odaklı"
            },
            {
                "id": "high",
                "name": "Agresif (Dinamik)",
                "max_weight_cap": 0.70,
                "description": "Yüksek risk toleransı, maksimum getiri odaklı"
            }
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

