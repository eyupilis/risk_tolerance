/**
 * Portfolio Optimizer API Client
 * Backend mikroservis ile iletişim kurar
 */
class PortfolioAPIClient {
    constructor(baseUrl = 'http://localhost:8000') {
        this.baseUrl = baseUrl;
        this.timeout = 30000; // 30 saniye timeout
    }

    /**
     * Backend API'nin erişilebilir olup olmadığını kontrol eder
     */
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseUrl}/api/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            return response.ok;
        } catch (error) {
            console.warn('⚠️ Backend API erişilemez:', error.message);
            return false;
        }
    }

    /**
     * Risk profilini string'den enum'a çevirir
     */
    mapRiskProfile(profile) {
        const mapping = {
            'low': 'low',
            'medium': 'medium', 
            'high': 'high',
            'sağlamcı': 'low',
            'temkinli': 'medium',
            'agresif': 'high',
            '1': 'low',
            '2': 'medium',
            '3': 'high'
        };
        return mapping[String(profile).toLowerCase()] || 'medium';
    }

    /**
     * Fon verilerini backend formatına dönüştürür
     * @param {Array} funds - Frontend fon listesi (code, name, returns array)
     * @param {string} riskProfile - Risk profili (low/medium/high)
     * @param {number} maxFunds - Maksimum fon sayısı
     */
    async optimize(funds, riskProfile, maxFunds = 5) {
        const requestBody = {
            funds: funds.map(f => ({
                code: f.code,
                name: f.name,
                returns: f.returns || []
            })),
            risk_profile: this.mapRiskProfile(riskProfile),
            risk_free_rate: 0.0,
            max_funds_final: maxFunds
        };

        console.log('📤 Backend API\'ye istek gönderiliyor:', requestBody);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(`${this.baseUrl}/api/optimize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP ${response.status}`);
            }

            const result = await response.json();
            console.log('📥 Backend API yanıtı:', result);

            return this.transformResponse(result);

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Backend API timeout - 30 saniye içinde yanıt alınamadı');
            }
            throw error;
        }
    }

    /**
     * Backend yanıtını frontend formatına dönüştürür
     */
    transformResponse(backendResponse) {
        if (!backendResponse.success) {
            throw new Error('Backend optimizasyon başarısız');
        }

        const best = backendResponse.best_portfolio;
        const candidates = backendResponse.candidates || [];

        // Allocations'ı frontend formatına çevir
        const funds = (best?.allocations || []).map(alloc => ({
            code: alloc.code,
            name: alloc.name,
            allocation: (alloc.weight * 100).toFixed(2),
            weight: alloc.weight,
            weight_pct: alloc.weight_pct
        }));

        return {
            success: true,
            method: best?.method || 'Unknown',
            riskProfile: backendResponse.risk_profile,
            maxWeightCap: backendResponse.max_weight_cap,
            funds: funds,
            metrics: best?.metrics || {},
            candidates: candidates.map(c => ({
                method: c.method,
                isValid: c.is_valid,
                allocations: c.allocations,
                metrics: c.metrics,
                notes: c.notes
            })),
            computationTimeMs: backendResponse.computation_time_ms,
            warnings: backendResponse.warnings || []
        };
    }
}

// Global instance
window.portfolioAPIClient = new PortfolioAPIClient();

