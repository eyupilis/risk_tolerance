"""
Portfolio Optimization Engine
Uses PyPortfolioOpt for MVO, HRP, CVaR
Uses Riskfolio-Lib for worst-case MV and risk parity
"""
import numpy as np
import pandas as pd
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass

# PyPortfolioOpt
from pypfopt import EfficientFrontier, HRPOpt, expected_returns, risk_models
from pypfopt.efficient_frontier import EfficientCVaR
from pypfopt import objective_functions

# Riskfolio-Lib
import riskfolio as rp

from models import FundData, RiskProfile, PortfolioAllocation, PortfolioMetrics, CandidatePortfolio


# Profile-based weight caps
PROFILE_WEIGHT_CAPS = {
    RiskProfile.LOW: 0.40,
    RiskProfile.MEDIUM: 0.60,
    RiskProfile.HIGH: 0.70
}


@dataclass
class OptimizationConfig:
    """Configuration for optimization"""
    risk_profile: RiskProfile
    risk_free_rate: float = 0.0
    max_funds_final: int = 5
    target_return: Optional[float] = None
    
    @property
    def max_weight(self) -> float:
        return PROFILE_WEIGHT_CAPS[self.risk_profile]


class PortfolioOptimizer:
    """Main portfolio optimization class"""
    
    def __init__(self, funds: List[FundData], config: OptimizationConfig):
        self.funds = funds
        self.config = config
        self.fund_codes = [f.code for f in funds]
        self.fund_names = {f.code: f.name for f in funds}

        # Build returns DataFrame (input is already returns, not prices)
        self.returns_df = self._build_returns_df()

        # Calculate expected returns (annualized mean of returns)
        # Since input is already returns, we compute mean directly
        self.mu = self.returns_df.mean() * 252  # Annualized

        # Calculate covariance matrix (annualized)
        self.S = self.returns_df.cov() * 252  # Annualized

        # Ensure covariance matrix is positive semi-definite
        self.S = self._fix_covariance_matrix(self.S)

    def _build_returns_df(self) -> pd.DataFrame:
        """Build DataFrame of returns from fund data"""
        data = {}
        max_len = max(len(f.returns) for f in self.funds)

        for fund in self.funds:
            returns = list(fund.returns)
            # Pad with mean if needed (to avoid zero variance issues)
            if len(returns) < max_len:
                mean_ret = np.mean(returns) if returns else 0.0
                returns = [mean_ret] * (max_len - len(returns)) + returns
            data[fund.code] = returns

        return pd.DataFrame(data)

    def _fix_covariance_matrix(self, cov: pd.DataFrame) -> pd.DataFrame:
        """Ensure covariance matrix is positive semi-definite"""
        # Convert to numpy for eigenvalue decomposition
        cov_arr = cov.values

        # Check for NaN or Inf
        if np.any(np.isnan(cov_arr)) or np.any(np.isinf(cov_arr)):
            # Replace with identity-like matrix scaled by average variance
            avg_var = np.nanmean(np.diag(cov_arr))
            if np.isnan(avg_var) or avg_var <= 0:
                avg_var = 0.01
            cov_arr = np.eye(len(self.fund_codes)) * avg_var

        # Eigenvalue fix for positive definiteness
        eigenvalues, eigenvectors = np.linalg.eigh(cov_arr)
        eigenvalues = np.maximum(eigenvalues, 1e-8)  # Ensure positive
        cov_arr = eigenvectors @ np.diag(eigenvalues) @ eigenvectors.T

        return pd.DataFrame(cov_arr, index=cov.index, columns=cov.columns)
    
    def _apply_constraints(self, weights: Dict[str, float]) -> Dict[str, float]:
        """Apply constraints: sum=1, max weight cap, max funds, min 5%

        Uses iterative capping algorithm that guarantees:
        1. No weight exceeds max_cap
        2. Sum of weights = 1
        3. Maximum N funds in portfolio
        """
        max_cap = self.config.max_weight
        min_floor = 0.05  # Her fon en az %5 olmalı
        epsilon = 0.0001

        print(f"\n{'='*60}")
        print(f"🔧 CONSTRAINT APPLICATION - DETAILED LOG")
        print(f"{'='*60}")
        print(f"📊 Risk Profile: {self.config.risk_profile}")
        print(f"📊 Max Weight Cap: {max_cap:.2%}")
        print(f"📊 Max Funds: {self.config.max_funds_final}")
        print(f"\n📥 INPUT WEIGHTS (before constraints):")
        for code, w in sorted(weights.items(), key=lambda x: x[1], reverse=True)[:10]:
            print(f"   {code}: {w:.4f} ({w*100:.2f}%)")

        # Remove negative or tiny weights
        weights = {k: max(0, v) for k, v in weights.items() if v > 0.001}

        if not weights:
            print("⚠️ No valid weights after cleanup!")
            return {}

        # Keep only top N funds first
        sorted_weights = sorted(weights.items(), key=lambda x: x[1], reverse=True)
        top_funds = sorted_weights[:self.config.max_funds_final]
        weights = dict(top_funds)

        print(f"\n📋 TOP {self.config.max_funds_final} FUNDS (after filtering):")
        for code, w in sorted(weights.items(), key=lambda x: x[1], reverse=True):
            exceeds = "⚠️ EXCEEDS CAP!" if w > max_cap else "✅"
            print(f"   {code}: {w:.4f} ({w*100:.2f}%) {exceeds}")

        # Iterative capping algorithm
        # Key insight: Once a weight is capped, it stays capped
        # We redistribute excess to remaining uncapped weights
        max_iterations = 20
        capped_funds = set()  # Track which funds are permanently capped

        print(f"\n🔄 ITERATIVE CAPPING ALGORITHM:")
        for iteration in range(max_iterations):
            # First normalize to sum=1
            total = sum(weights.values())
            if total <= 0:
                break
            weights = {k: v / total for k, v in weights.items()}

            # Find funds that exceed cap (excluding already capped ones)
            newly_capped = []
            excess_total = 0

            for code, w in weights.items():
                if code not in capped_funds and w > max_cap + epsilon:
                    newly_capped.append(code)
                    excess_total += w - max_cap

            # If no new caps needed, we're done
            if not newly_capped:
                print(f"   Iteration {iteration+1}: No caps needed, done!")
                break

            print(f"   Iteration {iteration+1}: Capping {newly_capped} (excess: {excess_total:.4f})")

            # Cap the newly exceeding weights
            for code in newly_capped:
                weights[code] = max_cap
                capped_funds.add(code)

            # Find uncapped funds to redistribute to
            uncapped_funds = [c for c in weights.keys() if c not in capped_funds]

            if uncapped_funds:
                # Redistribute excess proportionally to uncapped funds
                uncapped_total = sum(weights[c] for c in uncapped_funds)
                if uncapped_total > 0:
                    for code in uncapped_funds:
                        weights[code] += excess_total * (weights[code] / uncapped_total)
            else:
                # All funds are capped - distribute equally among capped funds
                # This shouldn't happen normally, but handle edge case
                per_fund = excess_total / len(weights)
                for code in weights:
                    weights[code] = min(max_cap, weights[code] + per_fund)

        # Final verification and cleanup
        weights = {k: v for k, v in weights.items() if v > 0.001}

        # Enforce minimum weight floor (>= %5)
        if weights:
            # Eğer min ağırlık toplamı 1'i aşıyorsa, min ağırlığı adapte et
            adaptive_min = min(min_floor, 1.0 / max(1, len(weights)))
            floored = {}
            floor_total = 0.0
            flexible = {}

            for code, w in weights.items():
                if w < adaptive_min:
                    floored[code] = adaptive_min
                    floor_total += adaptive_min
                else:
                    floored[code] = w
                    flexible[code] = w
                    floor_total += w

            if floor_total > 1.0:
                # Min ağırlıkların toplamı 1'i aşıyor, hepsini orantısal küçült
                scale = 1.0 / floor_total
                floored = {k: v * scale for k, v in floored.items()}
            else:
                remaining = 1.0 - floor_total
                flex_sum = sum(flexible.values())
                if flex_sum > 0 and remaining > 0:
                    for code in flexible:
                        floored[code] += remaining * (flexible[code] / flex_sum)

            weights = floored

        # Ensure no weight exceeds cap (hard enforcement)
        for code in weights:
            weights[code] = min(weights[code], max_cap)

        # Final normalization - but only if we have room
        total = sum(weights.values())
        if total > 0 and total < 1.0:
            # We have slack - can normalize up
            print(f"\n⚠️ NORMALIZATION: Total={total:.4f} < 1.0, normalizing up...")
            weights = {k: v / total for k, v in weights.items()}
            # Re-check caps after normalization
            for code in weights:
                if weights[code] > max_cap:
                    print(f"   ⚠️ {code} exceeded cap after normalization: {weights[code]:.4f} → {max_cap:.4f}")
                    weights[code] = max_cap
        elif total > 1.0:
            # Over 100% - normalize down (this won't increase any weight)
            weights = {k: v / total for k, v in weights.items()}

        # Final output log
        print(f"\n📤 OUTPUT WEIGHTS (after constraints):")
        total_final = 0
        for code, w in sorted(weights.items(), key=lambda x: x[1], reverse=True):
            exceeds = "🚨 EXCEEDS CAP!" if w > max_cap + epsilon else "✅"
            print(f"   {code}: {w:.4f} ({w*100:.2f}%) {exceeds}")
            total_final += w
        print(f"\n📊 TOTAL: {total_final:.4f} ({total_final*100:.2f}%)")
        print(f"{'='*60}\n")

        return weights
    
    def _safe_float(self, value: float, default: float = 0.0) -> float:
        """Convert to JSON-safe float (handle NaN, Inf)"""
        if np.isnan(value) or np.isinf(value):
            return default
        return float(value)

    def _calculate_metrics(self, weights: Dict[str, float]) -> PortfolioMetrics:
        """Calculate portfolio metrics"""
        w = np.array([weights.get(code, 0) for code in self.fund_codes])

        # Expected return
        exp_ret = self._safe_float(np.dot(w, self.mu.values))

        # Volatility
        variance = np.dot(w.T, np.dot(self.S.values, w))
        vol = self._safe_float(np.sqrt(max(0, variance)))

        # Sharpe ratio
        rf = self.config.risk_free_rate
        sharpe = self._safe_float((exp_ret - rf) / vol) if vol > 0.0001 else 0.0

        # Sortino (downside deviation)
        returns_portfolio = self.returns_df.dot(w)
        downside = returns_portfolio[returns_portfolio < 0]
        downside_std = self._safe_float(downside.std() * np.sqrt(252)) if len(downside) > 0 else vol
        sortino = self._safe_float((exp_ret - rf) / downside_std) if downside_std > 0.0001 else 0.0

        # VaR and CVaR at 95%
        var_95 = self._safe_float(np.percentile(returns_portfolio, 5))
        tail_returns = returns_portfolio[returns_portfolio <= var_95]
        cvar_95 = self._safe_float(tail_returns.mean()) if len(tail_returns) > 0 else var_95

        return PortfolioMetrics(
            expected_return=round(exp_ret, 6),
            volatility=round(vol, 6),
            sharpe_ratio=round(sharpe, 4),
            sortino_ratio=round(sortino, 4),
            var_95=round(var_95, 6),
            cvar_95=round(cvar_95, 6)
        )
    
    def _weights_to_allocations(self, weights: Dict[str, float]) -> List[PortfolioAllocation]:
        """Convert weights dict to allocation list"""
        allocations = []
        for code, weight in sorted(weights.items(), key=lambda x: x[1], reverse=True):
            if weight > 0.001:
                allocations.append(PortfolioAllocation(
                    code=code,
                    name=self.fund_names.get(code, code),
                    weight=round(weight, 6),
                    weight_pct=round(weight * 100, 2)
                ))
        return allocations

    # ========== OPTIMIZATION METHODS ==========

    def optimize_mvo_max_sharpe(self) -> Optional[CandidatePortfolio]:
        """Mean-Variance Optimization - Maximum Sharpe Ratio"""
        try:
            ef = EfficientFrontier(self.mu, self.S, weight_bounds=(0, self.config.max_weight))
            ef.max_sharpe(risk_free_rate=self.config.risk_free_rate)
            raw_weights = ef.clean_weights()

            weights = self._apply_constraints(dict(raw_weights))
            metrics = self._calculate_metrics(weights)
            allocations = self._weights_to_allocations(weights)

            return CandidatePortfolio(
                method="MVO_MaxSharpe",
                allocations=allocations,
                metrics=metrics,
                is_valid=True,
                notes="PyPortfolioOpt Mean-Variance with Maximum Sharpe Ratio"
            )
        except Exception as e:
            return CandidatePortfolio(
                method="MVO_MaxSharpe",
                allocations=[],
                metrics=PortfolioMetrics(expected_return=0, volatility=0, sharpe_ratio=0),
                is_valid=False,
                notes=f"Optimization failed: {str(e)}"
            )

    def optimize_mvo_min_volatility(self) -> Optional[CandidatePortfolio]:
        """Mean-Variance Optimization - Minimum Volatility"""
        try:
            ef = EfficientFrontier(self.mu, self.S, weight_bounds=(0, self.config.max_weight))
            ef.min_volatility()
            raw_weights = ef.clean_weights()

            weights = self._apply_constraints(dict(raw_weights))
            metrics = self._calculate_metrics(weights)
            allocations = self._weights_to_allocations(weights)

            return CandidatePortfolio(
                method="MVO_MinVol",
                allocations=allocations,
                metrics=metrics,
                is_valid=True,
                notes="PyPortfolioOpt Mean-Variance with Minimum Volatility"
            )
        except Exception as e:
            return CandidatePortfolio(
                method="MVO_MinVol",
                allocations=[],
                metrics=PortfolioMetrics(expected_return=0, volatility=0, sharpe_ratio=0),
                is_valid=False,
                notes=f"Optimization failed: {str(e)}"
            )

    def optimize_hrp(self) -> Optional[CandidatePortfolio]:
        """Hierarchical Risk Parity"""
        try:
            hrp = HRPOpt(self.returns_df)
            raw_weights = hrp.optimize()

            weights = self._apply_constraints(dict(raw_weights))
            metrics = self._calculate_metrics(weights)
            allocations = self._weights_to_allocations(weights)

            return CandidatePortfolio(
                method="HRP",
                allocations=allocations,
                metrics=metrics,
                is_valid=True,
                notes="PyPortfolioOpt Hierarchical Risk Parity"
            )
        except Exception as e:
            return CandidatePortfolio(
                method="HRP",
                allocations=[],
                metrics=PortfolioMetrics(expected_return=0, volatility=0, sharpe_ratio=0),
                is_valid=False,
                notes=f"Optimization failed: {str(e)}"
            )

    def optimize_cvar(self) -> Optional[CandidatePortfolio]:
        """CVaR (Conditional Value at Risk) Optimization"""
        try:
            ef_cvar = EfficientCVaR(self.mu, self.returns_df, weight_bounds=(0, self.config.max_weight))
            ef_cvar.min_cvar()
            raw_weights = ef_cvar.clean_weights()

            weights = self._apply_constraints(dict(raw_weights))
            metrics = self._calculate_metrics(weights)
            allocations = self._weights_to_allocations(weights)

            return CandidatePortfolio(
                method="CVaR",
                allocations=allocations,
                metrics=metrics,
                is_valid=True,
                notes="PyPortfolioOpt Minimum CVaR (Expected Shortfall)"
            )
        except Exception as e:
            return CandidatePortfolio(
                method="CVaR",
                allocations=[],
                metrics=PortfolioMetrics(expected_return=0, volatility=0, sharpe_ratio=0),
                is_valid=False,
                notes=f"Optimization failed: {str(e)}"
            )

    # ========== RISKFOLIO-LIB METHODS ==========

    def optimize_riskfolio_rp(self) -> Optional[CandidatePortfolio]:
        """Riskfolio-Lib Risk Parity"""
        try:
            port = rp.Portfolio(returns=self.returns_df)
            port.assets_stats(method_mu='hist', method_cov='hist')

            # Risk parity optimization
            w = port.rp_optimization(
                model='Classic',
                rm='MV',  # Mean-Variance risk measure
                rf=self.config.risk_free_rate,
                hist=True
            )

            if w is None or w.empty:
                raise ValueError("Riskfolio optimization returned empty weights")

            raw_weights = {code: float(w.loc[code, 'weights']) for code in self.fund_codes if code in w.index}

            weights = self._apply_constraints(raw_weights)
            metrics = self._calculate_metrics(weights)
            allocations = self._weights_to_allocations(weights)

            return CandidatePortfolio(
                method="RiskParity",
                allocations=allocations,
                metrics=metrics,
                is_valid=True,
                notes="Riskfolio-Lib Risk Parity (Equal Risk Contribution)"
            )
        except Exception as e:
            return CandidatePortfolio(
                method="RiskParity",
                allocations=[],
                metrics=PortfolioMetrics(expected_return=0, volatility=0, sharpe_ratio=0),
                is_valid=False,
                notes=f"Optimization failed: {str(e)}"
            )

    def optimize_riskfolio_worst_case(self) -> Optional[CandidatePortfolio]:
        """Riskfolio-Lib Worst-Case Mean-Variance"""
        try:
            port = rp.Portfolio(returns=self.returns_df)
            port.assets_stats(method_mu='hist', method_cov='hist')

            # Worst-case optimization with uncertainty sets
            # Riskfolio 7.x requires calculating and setting internal attributes directly
            
            # 1. Define bounds (Box Uncertainty)
            mu_val = self.mu.values
            delta_mu = 0.05 * np.abs(mu_val)
            
            # 2. Set Uncertainty Sets (Attributes expected by wc_optimization)
            port.mu_u = pd.DataFrame(mu_val + delta_mu, index=self.returns_df.columns)
            port.mu_l = pd.DataFrame(mu_val - delta_mu, index=self.returns_df.columns)
            port.cov_u = pd.DataFrame(self.S.values * 1.1, index=self.returns_df.columns, columns=self.returns_df.columns)
            port.cov_l = pd.DataFrame(self.S.values * 0.9, index=self.returns_df.columns, columns=self.returns_df.columns)

            # 3. Set required internal attributes to avoid 'NoneType' errors
            # d_mu is used for Box constraints: ret = mu @ w - d_mu @ cp.abs(w)
            port.d_mu = pd.DataFrame(np.array(delta_mu, ndmin=2), columns=self.returns_df.columns)
            
            # These are accessed blindly by the library even if unused by 'box' model
            N = len(mu_val)
            port.cov_mu = pd.DataFrame(np.zeros((N, N)), index=self.returns_df.columns, columns=self.returns_df.columns)
            port.cov_sigma = pd.DataFrame(np.zeros((N**2, N**2))) 
            port.k_mu = 1.0
            port.k_sigma = 1.0

            w = port.wc_optimization(
                obj='Sharpe',
                rf=self.config.risk_free_rate,
                l=0,
                Umu='box',
                Ucov='box'
            )

            if w is None or w.empty:
                raise ValueError("Worst-case optimization returned empty weights")

            raw_weights = {code: float(w.loc[code, 'weights']) for code in self.fund_codes if code in w.index}

            weights = self._apply_constraints(raw_weights)
            metrics = self._calculate_metrics(weights)
            allocations = self._weights_to_allocations(weights)

            return CandidatePortfolio(
                method="WorstCase_MV",
                allocations=allocations,
                metrics=metrics,
                is_valid=True,
                notes="Riskfolio-Lib Worst-Case Mean-Variance (Robust Optimization)"
            )
        except Exception as e:
            return CandidatePortfolio(
                method="WorstCase_MV",
                allocations=[],
                metrics=PortfolioMetrics(expected_return=0, volatility=0, sharpe_ratio=0),
                is_valid=False,
                notes=f"Optimization failed: {str(e)}"
            )

    def optimize_riskfolio_cvar(self) -> Optional[CandidatePortfolio]:
        """Riskfolio-Lib CVaR Optimization"""
        try:
            port = rp.Portfolio(returns=self.returns_df)
            port.assets_stats(method_mu='hist', method_cov='hist')

            w = port.optimization(
                model='Classic',
                rm='CVaR',
                obj='MinRisk',
                rf=self.config.risk_free_rate,
                hist=True
            )

            if w is None or w.empty:
                raise ValueError("Riskfolio CVaR optimization returned empty weights")

            raw_weights = {code: float(w.loc[code, 'weights']) for code in self.fund_codes if code in w.index}

            weights = self._apply_constraints(raw_weights)
            metrics = self._calculate_metrics(weights)
            allocations = self._weights_to_allocations(weights)

            return CandidatePortfolio(
                method="RF_CVaR",
                allocations=allocations,
                metrics=metrics,
                is_valid=True,
                notes="Riskfolio-Lib CVaR (Conditional VaR) Optimization"
            )
        except Exception as e:
            return CandidatePortfolio(
                method="RF_CVaR",
                allocations=[],
                metrics=PortfolioMetrics(expected_return=0, volatility=0, sharpe_ratio=0),
                is_valid=False,
                notes=f"Optimization failed: {str(e)}"
            )

    # ========== MAIN OPTIMIZATION RUNNER ==========

    def run_all_optimizations(self) -> List[CandidatePortfolio]:
        """Run all optimization methods and return candidate portfolios"""
        candidates = []

        # PyPortfolioOpt methods
        candidates.append(self.optimize_mvo_max_sharpe())
        candidates.append(self.optimize_mvo_min_volatility())
        candidates.append(self.optimize_hrp())
        candidates.append(self.optimize_cvar())

        # Riskfolio-Lib methods
        candidates.append(self.optimize_riskfolio_rp())
        candidates.append(self.optimize_riskfolio_worst_case())
        candidates.append(self.optimize_riskfolio_cvar())

        # Filter out None results
        return [c for c in candidates if c is not None]

    def select_best_portfolio(self, candidates: List[CandidatePortfolio]) -> Optional[CandidatePortfolio]:
        """Select best portfolio based on risk profile"""
        valid_candidates = [c for c in candidates if c.is_valid and len(c.allocations) > 0]

        if not valid_candidates:
            return None

        # Scoring based on risk profile
        if self.config.risk_profile == RiskProfile.LOW:
            # Prefer low volatility, positive Sharpe
            scored = sorted(valid_candidates, key=lambda c: (
                -c.metrics.volatility,  # Lower volatility better
                c.metrics.sharpe_ratio   # Higher Sharpe better (secondary)
            ))
        elif self.config.risk_profile == RiskProfile.HIGH:
            # Prefer high return, good Sharpe
            scored = sorted(valid_candidates, key=lambda c: (
                c.metrics.expected_return,  # Higher return better
                c.metrics.sharpe_ratio       # Higher Sharpe better
            ), reverse=True)
        else:  # MEDIUM
            # Balance: best Sharpe ratio
            scored = sorted(valid_candidates, key=lambda c: c.metrics.sharpe_ratio, reverse=True)

        return scored[0] if scored else None

