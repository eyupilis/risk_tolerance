
import sys
import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Add the optimizer directory to path
sys.path.append(os.path.abspath("backend/portfolio-optimizer"))

try:
    from optimizer import PortfolioOptimizer, OptimizationConfig, RiskProfile
    from models import FundData
    print("Imports successful!")
except ImportError as e:
    print(f"Import failed: {e}")
    sys.exit(1)

def generate_dummy_data(n_funds=5, days=100):
    funds = []
    for i in range(n_funds):
        # Generate random returns
        mean = np.random.uniform(0.0001, 0.001)
        std = np.random.uniform(0.01, 0.02)
        returns = np.random.normal(mean, std, days).tolist()
        
        funds.append(FundData(
            code=f"F{i+1}",
            name=f"Fund {i+1}",
            returns=returns,
            current_price=1.0,
            total_value=1000000.0
        ))
    return funds

def test_optimization():
    print("\n--- Starting Optimization Test ---")
    funds = generate_dummy_data()
    
    config = OptimizationConfig(
        risk_profile=RiskProfile.MEDIUM,
        risk_free_rate=0.0,
        max_funds_final=5
    )
    
    try:
        optimizer = PortfolioOptimizer(funds, config)
        print("Optimizer initialized.")
        
        candidates = optimizer.run_all_optimizations()
        print(f"Generated {len(candidates)} candidate portfolios.")
        
        for cand in candidates:
            print(f"\nMethod: {cand.method}")
            print(f"Valid: {cand.is_valid}")
            print(f"Metrics: Sharpe={cand.metrics.sharpe_ratio}, Vol={cand.metrics.volatility}")
            if not cand.is_valid:
                print(f"Notes: {cand.notes}")

        best = optimizer.select_best_portfolio(candidates)
        if best:
            print(f"\n✅ Best Portfolio Selected: {best.method}")
            print(f"Allocations: {len(best.allocations)}")
            for alloc in best.allocations:
                print(f"  {alloc.code}: {alloc.weight_pct}%")
        else:
            print("\n❌ No valid portfolio found.")
            
    except Exception as e:
        print(f"\n❌ Runtime Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_optimization()
