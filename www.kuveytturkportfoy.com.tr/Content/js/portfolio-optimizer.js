/**
 * Portfolio Optimizer - Markowitz Modern Portfolio Theory Implementation
 * for Kuveyt Türk Portföy Risk Profile Survey
 * 
 * This module calculates optimal portfolio allocations based on:
 * - User's risk tolerance (determined from survey)
 * - Historical fund performance data
 * - Sharpe ratio optimization
 * - Diversification principles
 */

class PortfolioOptimizer {
    constructor(fundDataCSV = '') {
        this.funds = [];
        this.rawFundData = fundDataCSV;

        // Sharpe ratio hesaplamaları için risk-free rate; 10Y tahvil varsayımıyla %15
        this.riskFreeRate = 0.15;
        this.riskProfiles = {
            low: {
                name: "Düşük Riskli - Muhafazakar",
                description: "Ana paranızı koruma odaklı, istikrarlı getiri hedefleyen portföy",
                targetReturn: 0.05,  // 5% hedef getiri
                maxVolatility: 0.10, // Maksimum %10 volatilite
                riskScore: "2/7",
                color: "#28a745"
            },
            medium: {
                name: "Orta Riskli - Dengeli",
                description: "Risk ve getiri dengesini gözeten, çeşitlendirilmiş portföy",
                targetReturn: 0.15,  // 15% hedef getiri
                maxVolatility: 0.20, // Maksimum %20 volatilite
                riskScore: "4/7",
                color: "#ffc107"
            },
            high: {
                name: "Yüksek Riskli - Agresif",
                description: "Yüksek getiri potansiyeli hedefleyen, risk toleransı yüksek portföy",
                targetReturn: 0.30,  // 30% hedef getiri
                maxVolatility: 0.35, // Maksimum %35 volatilite
                riskScore: "6/7",
                color: "#dc3545"
            }
        };

        if (fundDataCSV && typeof fundDataCSV === 'string' && fundDataCSV.trim()) {
            this.parseFundData(fundDataCSV);
        } else {
            console.warn('PortfolioOptimizer, geçerli bir fon verisi olmadan başlatıldı. Portföy oluşturma için CSV verisi yükleyin.');
        }
    }

    /**
     * Parse CSV data and calculate fund statistics
     */
    parseFundData(csvText) {
        if (!csvText || typeof csvText !== 'string') {
            console.warn('parseFundData: csvText boş veya geçersiz, fon verisi işlenemedi.');
            this.funds = [];
            return;
        }

        const trimmed = csvText.trim();
        if (!trimmed) {
            console.warn('parseFundData: csvText içeriği boş.');
            this.funds = [];
            return;
        }

        const lines = trimmed.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) {
            console.warn('parseFundData: başlık satırı dışında işlenecek veri bulunamadı.');
            this.funds = [];
            return;
        }

        const headers = lines[0].split(',');

        // Group data by fund code
        const fundMap = {};

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length < 4) {
                continue; // Skip malformed rows
            }

            const fundCode = values[1];
            const fundName = values[2];
            const price = parseFloat(values[3]);
            const date = values[0];

            if (!fundCode || Number.isNaN(price)) {
                continue; // Skip rows without essential data
            }

            if (!fundMap[fundCode]) {
                fundMap[fundCode] = {
                    code: fundCode,
                    name: fundName,
                    prices: [],
                    dates: []
                };
            }

            fundMap[fundCode].prices.push(price);
            fundMap[fundCode].dates.push(date);
        }

        // Calculate statistics for each fund
        this.funds = Object.values(fundMap).map(fund => {
            const stats = this.calculateFundStatistics(fund);
            return {
                ...fund,
                ...stats,
                category: this.categorizeFund(fund.name, stats)
            };
        });
    }

    /**
     * Calculate returns, volatility, and Sharpe ratio for a fund
     */
    calculateFundStatistics(fund) {
        const prices = fund.prices;

        // Check if we have enough data
        if (prices.length < 2) {
            console.warn(`Fund ${fund.code} has insufficient data (${prices.length} days)`);
            return {
                avgReturn: 0.05,
                volatility: 0.10,
                sharpeRatio: 0.5,
                maxDrawdown: 0,
                currentPrice: prices[0] || 1,
                monthlyReturn: 0.01,
                yearlyReturn: 0.05,
                dailyReturns: []
            };
        }

        const returns = [];
        const maxLookback = 252 * 3; // son 3 yıl (işlem günü)
        const lookbackPrices = prices.slice(-Math.min(prices.length, maxLookback + 1));

        // Calculate daily returns (lookback penceresi ile)
        for (let i = 1; i < lookbackPrices.length; i++) {
            const dailyReturn = (lookbackPrices[i] - lookbackPrices[i - 1]) / lookbackPrices[i - 1];
            if (isFinite(dailyReturn)) {
                returns.push(dailyReturn);
            }
        }

        if (returns.length === 0) {
            console.warn(`Fund ${fund.code} has no valid returns`);
            return {
                avgReturn: 0.05,
                volatility: 0.10,
                sharpeRatio: 0.5,
                maxDrawdown: 0,
                currentPrice: prices[prices.length - 1],
                monthlyReturn: 0.01,
                yearlyReturn: 0.05,
                dailyReturns: []
            };
        }

        // Calculate average return (annualized)
        const avgDailyReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        const avgReturn = avgDailyReturn * 252; // 252 trading days

        // Calculate volatility (standard deviation, annualized)
        const variance = returns.reduce((sum, r) => {
            return sum + Math.pow(r - avgDailyReturn, 2);
        }, 0) / returns.length;
        const dailyVolatility = Math.sqrt(variance);
        const volatility = dailyVolatility * Math.sqrt(252);

        // Calculate Sharpe ratio (assuming risk-free rate of 3%)
        const riskFreeRate = this.riskFreeRate || 0;
        const sharpeRatio = volatility > 0 ? (avgReturn - riskFreeRate) / volatility : 0;

        // Calculate maximum drawdown
        let maxDrawdown = 0;
        let peak = prices[0];

        for (let i = 1; i < prices.length; i++) {
            if (prices[i] > peak) {
                peak = prices[i];
            }
            const drawdown = (peak - prices[i]) / peak;
            if (drawdown > maxDrawdown) {
                maxDrawdown = drawdown;
            }
        }

        return {
            avgReturn: isFinite(avgReturn) ? avgReturn : 0.05,
            volatility: isFinite(volatility) ? volatility : 0.10,
            sharpeRatio: isFinite(sharpeRatio) ? sharpeRatio : 0.5,
            maxDrawdown: isFinite(maxDrawdown) ? maxDrawdown : 0,
            currentPrice: prices[prices.length - 1],
            monthlyReturn: this.calculateMonthlyReturn(prices),
            yearlyReturn: this.calculateYearlyReturn(prices),
            dailyReturns: returns
        };
    }

    /**
     * Calculate monthly return (last 30 days or available)
     */
    calculateMonthlyReturn(prices) {
        if (prices.length < 2) return 0;
        const days = Math.min(30, prices.length - 1);
        const startPrice = prices[prices.length - days - 1];
        const endPrice = prices[prices.length - 1];
        return (endPrice - startPrice) / startPrice;
    }

    /**
     * Calculate yearly return (last 252 trading days or available)
     */
    calculateYearlyReturn(prices) {
        if (prices.length < 2) return 0;
        const days = Math.min(252, prices.length - 1);
        const startPrice = prices[prices.length - days - 1];
        const endPrice = prices[prices.length - 1];
        return (endPrice - startPrice) / startPrice;
    }

    /**
     * Categorize fund based on name and statistics
     */
    categorizeFund(name, stats) {
        const upperName = name.toUpperCase();

        // Asset class categories
        if (upperName.includes('ALTIN') || upperName.includes('GOLD')) {
            return {
                type: 'precious-metals',
                typeName: 'Kıymetli Madenler',
                icon: 'fi_8033997.svg',
                riskLevel: stats.volatility > 0.25 ? 6 : 5
            };
        }

        if (upperName.includes('GÜMÜŞ') || upperName.includes('SILVER')) {
            return {
                type: 'precious-metals',
                typeName: 'Kıymetli Madenler',
                icon: 'fi_8033997.svg',
                riskLevel: 6
            };
        }

        if (upperName.includes('HİSSE') || upperName.includes('EQUITY')) {
            return {
                type: 'equity',
                typeName: 'Hisse Senedi',
                icon: 'fi_6421329.svg',
                riskLevel: stats.volatility > 0.30 ? 6 : 5
            };
        }

        if (upperName.includes('TEKNOLOJİ') || upperName.includes('TECHNOLOGY')) {
            return {
                type: 'equity',
                typeName: 'Teknoloji Hisse Senedi',
                icon: 'fi_6421329.svg',
                riskLevel: 6
            };
        }

        if (upperName.includes('ENERJİ') || upperName.includes('ENERGY')) {
            return {
                type: 'equity',
                typeName: 'Enerji',
                icon: 'fi_6421329.svg',
                riskLevel: 6
            };
        }

        if (upperName.includes('PARA PİYASASI') || upperName.includes('MONEY MARKET')) {
            return {
                type: 'money-market',
                typeName: 'Para Piyasası',
                icon: 'fi_7145867.svg',
                riskLevel: 1
            };
        }

        if (upperName.includes('KİRA SERTİFİKALARI') || upperName.includes('SUKUK')) {
            return {
                type: 'fixed-income',
                typeName: 'Kira Sertifikaları',
                icon: 'fi_6195699.svg',
                riskLevel: 2
            };
        }

        if (upperName.includes('KISA VADELİ') || upperName.includes('SHORT TERM')) {
            return {
                type: 'short-term',
                typeName: 'Kısa Vadeli',
                icon: 'fi_7145867.svg',
                riskLevel: 1
            };
        }

        if (upperName.includes('DENGELİ') || upperName.includes('BALANCED')) {
            return {
                type: 'balanced',
                typeName: 'Dengeli',
                icon: 'fi_4091118.svg',
                riskLevel: 3
            };
        }

        if (upperName.includes('AGRESİF') || upperName.includes('AGGRESSIVE')) {
            return {
                type: 'aggressive',
                typeName: 'Agresif',
                icon: 'fi_6421329.svg',
                riskLevel: 6
            };
        }

        if (upperName.includes('DİNAMİK') || upperName.includes('DYNAMIC')) {
            return {
                type: 'dynamic',
                typeName: 'Dinamik',
                icon: 'fi_4091118.svg',
                riskLevel: 5
            };
        }

        if (upperName.includes('TEMKİNLİ') || upperName.includes('CAUTIOUS')) {
            return {
                type: 'conservative',
                typeName: 'Temkinli',
                icon: 'fi_7145867.svg',
                riskLevel: 2
            };
        }

        // Default category
        return {
            type: 'mixed',
            typeName: 'Karma',
            icon: 'fi_4091118.svg',
            riskLevel: 4
        };
    }

    /**
     * Calculate risk profile score from survey answers
     */
    calculateRiskScore(surveyAnswers) {
        console.log('=== RİSK PROFİLİ HESAPLAMA (YENİ ANKET) ===');
        console.log(JSON.stringify(surveyAnswers, null, 2));

        // Kapasite puanları (Q1–Q5)
        const capacityMaps = {
            q1: { a: 100, b: 80, c: 50, d: 20 }, // yaş
            q2: { a: 0, b: 30, c: 70, d: 100 },  // vade
            q3: { a: 20, b: 50, c: 75, d: 100 }, // toplam varlık
            q4: { a: 10, b: 30, c: 60, d: 90 },  // gelir & istikrar
            q5: { a: 0, b: 50, c: 100 }          // acil durum fonu
        };

        // Risk ağırlıkları (Q6–Q12 toplam = 1)
        const riskWeights = {
            q6: 0.20,
            q7: 0.20,
            q8: 0.15,
            q9: 0.05,
            q10: 0.15,
            q11: 0.15,
            q12: 0.10
        };

        // Risk puanları (0–100)
        const riskValueMaps = {
            q6: { a: 0, b: 60, c: 100 },
            q7: { a: 10, b: 60, c: 100 },
            q8: { a: 0, b: 60, c: 100 },
            q9: { a: 20, b: 60, c: 100 },
            q10: { a: 0, b: 50, c: 100 },
            q11: { a: 0, b: 60, c: 100 },
            q12: { a: 20, b: 60, c: 90 }
        };

        // Kapasite skorunu hesapla (ortalama)
        const capacityBreakdown = {};
        let capacitySum = 0;
        let capacityCount = 0;
        Object.keys(capacityMaps).forEach(key => {
            const val = capacityMaps[key][surveyAnswers[key]];
            if (val !== undefined) {
                capacityBreakdown[key] = val;
                capacitySum += val;
                capacityCount += 1;
            }
        });
        const capacityScore = capacityCount > 0 ? capacitySum / capacityCount : 50;

        // Risk skoru (ağırlıklı ortalama)
        let riskScore = 0;
        const breakdown = {};
        Object.keys(riskWeights).forEach(key => {
            const value = riskValueMaps[key][surveyAnswers[key]] ?? 0;
            const weight = riskWeights[key];
            riskScore += weight * value;
            breakdown[key] = { answer: surveyAnswers[key], value, weight };
        });

        const normalizedScore = riskScore; // 0-100 ölçeğinde

        let profileName = 'low';
        let riskLevel = 2;
        if (normalizedScore >= 65) {
            profileName = 'high';
            riskLevel = 6;
        } else if (normalizedScore >= 35) {
            profileName = 'medium';
            riskLevel = 4;
        }

        return {
            profile: profileName,
            score: Math.round(normalizedScore),
            level: riskLevel,
            capacityScore,
            breakdown
        };
    }

    /**
     * Generate optimal portfolio based on risk profile using Markowitz theory
     */
    generateOptimalPortfolio(riskProfileResult) {
        console.log('=== PORTFOLIO GENERATION START ===');
        console.log('Risk Profile Input:', riskProfileResult);

        // Handle both string and object input
        const profileName = typeof riskProfileResult === 'string' ? riskProfileResult : riskProfileResult.profile;
        const profile = this.riskProfiles[profileName];

        if (!profile) {
            console.error('Invalid risk profile:', profileName);
            return null;
        }

        console.log('Selected Profile:', profile.name);
        console.log('Target Return:', (profile.targetReturn * 100).toFixed(2) + '%');
        console.log('Max Volatility:', (profile.maxVolatility * 100).toFixed(2) + '%');

        const targetReturn = profile.targetReturn;
        const maxVolatility = profile.maxVolatility;

        // Filter funds suitable for the risk profile
        // ÖNEMLİ: Hem volatilite HEM DE fon risk seviyesi (1-7) kontrol edilmeli
        const suitableFunds = this.funds.filter(fund => {
            // Exclude funds with insufficient data
            if (fund.prices.length < 5) return false;

            // Fon risk seviyesi kontrolü (1-7 arası)
            const fundRiskLevel = fund.category?.riskLevel || 4;
            
            // Match volatility AND fund risk level with investor risk profile
            if (profileName === 'low') {
                // Düşük riskli yatırımcı: Risk seviyesi 1-3, düşük volatilite
                return fundRiskLevel <= 3 && fund.volatility <= 0.15 && fund.sharpeRatio > 0;
            } else if (profileName === 'medium') {
                // Orta riskli yatırımcı: Risk seviyesi 1-5, orta volatilite
                return fundRiskLevel <= 5 && fund.volatility <= 0.25 && fund.sharpeRatio > 0;
            } else {
                // Yüksek riskli yatırımcı: Tüm risk seviyeleri kabul
                return fund.volatility <= 0.40 && fund.sharpeRatio > -0.5;
            }
        });

        console.log('Suitable funds found:', suitableFunds.length);

        if (suitableFunds.length === 0) {
            console.error('No suitable funds found for profile:', profileName);
            console.log('Available funds:', this.funds.length);
            console.log('Funds summary:', this.funds.map(f => ({
                code: f.code,
                volatility: f.volatility.toFixed(4),
                sharpe: f.sharpeRatio.toFixed(2),
                prices: f.prices.length
            })));

            // Fallback: Relax criteria and try again
            console.warn('Relaxing fund selection criteria...');
            const relaxedFunds = this.funds.filter(fund => {
                if (fund.prices.length < 3) return false;
                return true; // Accept all funds with minimal data
            });

            relaxedFunds.sort((a, b) => b.sharpeRatio - a.sharpeRatio);

            if (relaxedFunds.length === 0) {
                throw new Error('No funds available with sufficient data');
            }

            const fallbackFunds = this.selectDiversifiedFunds(relaxedFunds, profileName);
            const fallbackWeights = this.calculateOptimalWeights(fallbackFunds, targetReturn, maxVolatility);

            const fallbackPortfolio = fallbackFunds.map((fund, index) => ({
                ...fund,
                weight: fallbackWeights[index],
                allocation: fallbackWeights[index] * 100
            }));

            const fallbackStats = this.calculatePortfolioStatistics(fallbackPortfolio);

            console.warn('Using fallback portfolio with relaxed criteria');
            return {
                riskProfile: profile,
                funds: fallbackPortfolio,
                statistics: fallbackStats,
                isFallback: true
            };
        }

        // Sort by Sharpe ratio (risk-adjusted return)
        suitableFunds.sort((a, b) => b.sharpeRatio - a.sharpeRatio);

        // Select top performers for each category
        const portfolioFunds = this.selectDiversifiedFunds(suitableFunds, profileName);

        console.log('Portfolio funds selected:', portfolioFunds.length);

        // Calculate optimal weights using simplified Markowitz approach
        const weights = this.calculateOptimalWeights(portfolioFunds, targetReturn, maxVolatility);

        // Combine funds with weights
        const portfolio = portfolioFunds.map((fund, index) => ({
            ...fund,
            weight: weights[index],
            allocation: weights[index] * 100
        }));

        // Calculate portfolio statistics
        const portfolioStats = this.calculatePortfolioStatistics(portfolio);

        return {
            riskProfile: profile,
            funds: portfolio,
            statistics: portfolioStats
        };
    }

    /**
     * Select diversified funds across different categories
     * Kategori risk seviyeleri:
     * - money-market: 1, short-term: 1, fixed-income: 2, conservative: 2
     * - balanced: 3, mixed: 4
     * - dynamic: 5, equity: 5-6, precious-metals: 5-6, aggressive: 6
     */
    selectDiversifiedFunds(funds, riskProfile) {
        const categoryCounts = {
            'low': {
                // Düşük riskli: Sadece risk seviyesi 1-3 kategoriler
                'money-market': 2,      // Risk 1
                'short-term': 1,        // Risk 1
                'fixed-income': 1,      // Risk 2
                'conservative': 1       // Risk 2 (Temkinli)
            },
            'medium': {
                // Orta riskli: Risk seviyesi 1-5 kategoriler
                'balanced': 1,          // Risk 3
                'fixed-income': 1,      // Risk 2
                'mixed': 1,             // Risk 4
                'money-market': 1,      // Risk 1
                'dynamic': 1            // Risk 5
            },
            'high': {
                // Yüksek riskli: Tüm kategoriler
                'equity': 2,            // Risk 5-6
                'aggressive': 1,        // Risk 6
                'dynamic': 1,           // Risk 5
                'precious-metals': 1    // Risk 5-6
            }
        };

        const targetCounts = categoryCounts[riskProfile];
        const selectedFunds = [];
        const categoryMap = {};

        // Group funds by category
        funds.forEach(fund => {
            const category = fund.category.type;
            if (!categoryMap[category]) {
                categoryMap[category] = [];
            }
            categoryMap[category].push(fund);
        });

        // Select top funds from each category
        Object.keys(targetCounts).forEach(category => {
            const count = targetCounts[category];
            const categoryFunds = categoryMap[category] || [];

            // Take top N funds from this category
            const selected = categoryFunds.slice(0, count);
            selectedFunds.push(...selected);
        });

        // Ensure we have at least 5 funds for diversification
        if (selectedFunds.length < 5) {
            const remaining = funds.filter(f => !selectedFunds.includes(f));
            selectedFunds.push(...remaining.slice(0, 5 - selectedFunds.length));
        }

        // Limit to maximum 5 funds (portföy yönetilebilirliği için)
        return selectedFunds.slice(0, 5);
    }

    /**
     * Calculate optimal weights using simplified Markowitz optimization
     */
    calculateOptimalWeights(funds, targetReturn, maxVolatility) {
        const n = funds.length;

        // Start with equal weights
        let weights = new Array(n).fill(1 / n);

        // Adjust weights based on Sharpe ratio
        const sharpeSum = funds.reduce((sum, f) => sum + Math.max(0, f.sharpeRatio), 0);

        if (sharpeSum > 0) {
            weights = funds.map(fund => Math.max(0, fund.sharpeRatio) / sharpeSum);
        }

        // Apply constraints based on risk profile
        weights = this.applyWeightConstraints(weights, funds, targetReturn, maxVolatility);

        // Normalize weights to sum to 1
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        weights = weights.map(w => w / totalWeight);

        return weights;
    }

    /**
     * Apply weight constraints based on risk profile
     */
    applyWeightConstraints(weights, funds, targetReturn, maxVolatility) {
        const maxSingleWeight = 0.70;
        const minSingleWeight = 0.05; // Her fon en az %5

        // Önce üst sınır uygula, kalanını orantısal dağıt
        const cappedWeights = [];
        let remainingWeight = 1;
        let flexibleTotal = 0;

        weights.forEach(weight => {
            if (weight > maxSingleWeight) {
                cappedWeights.push(maxSingleWeight);
                remainingWeight -= maxSingleWeight;
            } else {
                cappedWeights.push(weight);
                flexibleTotal += weight;
                remainingWeight -= weight;
            }
        });

        if (flexibleTotal > 0 && remainingWeight !== 0) {
            cappedWeights.forEach((w, idx) => {
                if (weights[idx] <= maxSingleWeight) {
                    cappedWeights[idx] = w + (weights[idx] / flexibleTotal) * remainingWeight;
                }
            });
        }

        // Minimum ağırlık zemini uygula ve normalize et
        const floored = cappedWeights.map(w => Math.max(w, minSingleWeight));
        const total = floored.reduce((s, w) => s + w, 0);
        return floored.map(w => w / total);
    }

    /**
     * Calculate portfolio statistics (return, volatility, Sharpe ratio)
     */
    calculatePortfolioStatistics(portfolio) {
        let portfolioReturn = 0;
        let portfolioVolatility = 0;

        // Calculate weighted average return
        portfolio.forEach(fund => {
            portfolioReturn += fund.avgReturn * fund.weight;
        });

        // Volatiliteyi kovaryans matrisi ile hesapla (fon getirileri aynı döneme kırpılarak)
        const returnsList = portfolio.map(fund => fund.dailyReturns || []);
        const covMatrix = this.computeCovarianceMatrix(returnsList);

        if (covMatrix) {
            let variance = 0;
            for (let i = 0; i < portfolio.length; i++) {
                for (let j = 0; j < portfolio.length; j++) {
                    variance += portfolio[i].weight * portfolio[j].weight * covMatrix[i][j];
                }
            }
            // Günlük kovaryansı yıllığa çevir (252 işlem günü varsayımı)
            portfolioVolatility = Math.sqrt(variance * 252);
        } else {
            // Kovaryans hesaplanamazsa korelasyon 0 varsayımıyla devam et
            portfolio.forEach(fund => {
                portfolioVolatility += Math.pow(fund.volatility * fund.weight, 2);
            });
            portfolioVolatility = Math.sqrt(portfolioVolatility);
        }

        // Calculate Sharpe ratio
        const riskFreeRate = this.riskFreeRate || 0;
        const sharpeRatio = portfolioVolatility > 0 ? (portfolioReturn - riskFreeRate) / portfolioVolatility : 0;

        // Calculate maximum drawdown
        const maxDrawdown = Math.max(...portfolio.map(f => f.maxDrawdown * f.weight));

        return {
            expectedReturn: portfolioReturn,
            volatility: portfolioVolatility,
            sharpeRatio: sharpeRatio,
            maxDrawdown: maxDrawdown,
            diversificationScore: portfolio.length >= 5 ? 'Yüksek' : portfolio.length >= 3 ? 'Orta' : 'Düşük'
        };
    }

    /**
     * Fon getirilerinden kovaryans matrisi üret
     */
    computeCovarianceMatrix(returnsList) {
        if (!returnsList || returnsList.length === 0) return null;

        const minLength = Math.min(...returnsList.map(r => r.length));
        if (!isFinite(minLength) || minLength < 2) return null;

        // Ortak döneme kırp
        const trimmed = returnsList.map(r => r.slice(-minLength));
        const means = trimmed.map(r => r.reduce((sum, v) => sum + v, 0) / minLength);

        const covMatrix = [];
        for (let i = 0; i < trimmed.length; i++) {
            covMatrix[i] = [];
            for (let j = 0; j < trimmed.length; j++) {
                let covSum = 0;
                for (let k = 0; k < minLength; k++) {
                    covSum += (trimmed[i][k] - means[i]) * (trimmed[j][k] - means[j]);
                }
                covMatrix[i][j] = covSum / (minLength - 1);
            }
        }

        return covMatrix;
    }

    /**
     * Get fund recommendations with explanations
     */
    getFundRecommendations(portfolio) {
        if (!portfolio || !portfolio.funds || portfolio.funds.length === 0) {
            console.error('Invalid portfolio:', portfolio);
            return [];
        }

        return portfolio.funds.map(fund => ({
            code: fund.code,
            name: fund.name,
            allocation: fund.allocation.toFixed(2) + '%',
            category: fund.category.typeName,
            riskLevel: fund.category.riskLevel,
            monthlyReturn: (fund.monthlyReturn * 100).toFixed(2) + '%',
            yearlyReturn: (fund.yearlyReturn * 100).toFixed(2) + '%',
            sharpeRatio: fund.sharpeRatio.toFixed(2),
            currentPrice: fund.currentPrice.toFixed(6),
            reason: this.generateRecommendationReason(fund, portfolio.riskProfile)
        }));
    }

    /**
     * Generate explanation for why a fund is recommended
     */
    generateRecommendationReason(fund, riskProfile) {
        const reasons = [];

        if (fund.sharpeRatio > 1) {
            reasons.push('Yüksek risk-ayarlı getiri');
        }

        if (fund.volatility < riskProfile.maxVolatility * 0.5) {
            reasons.push('Düşük volatilite');
        }

        if (fund.yearlyReturn > riskProfile.targetReturn) {
            reasons.push('Hedef üstü getiri');
        }

        if (fund.category.type === 'precious-metals') {
            reasons.push('Enflasyon koruması');
        }

        if (fund.category.type === 'money-market' || fund.category.type === 'short-term') {
            reasons.push('Likidite sağlama');
        }

        if (reasons.length === 0) {
            reasons.push('Portföy çeşitlendirmesi');
        }

        return reasons.join(', ');
    }

    /**
     * Async Optimization using Python Backend
     */
    async optimizeWithBackend(riskProfileResult) {
        console.log('=== BACKEND OPTIMIZATION START ===');
        const API_URL = 'http://localhost:8000/api/optimize';

        const profileName = typeof riskProfileResult === 'string' ? riskProfileResult : riskProfileResult.profile;
        const profile = this.riskProfiles[profileName];

        // 1. Prepare Data Payload
        // ÖNEMLİ: Risk profiline uygun fonları filtrele (risk seviyesi kontrolü)
        const suitableFunds = this.funds.filter(fund => {
            if (fund.prices.length < 10) return false;
            
            // Fon risk seviyesi kontrolü (1-7 arası)
            const fundRiskLevel = fund.category?.riskLevel || 4;
            
            if (profileName === 'low') {
                // Düşük riskli yatırımcı: Sadece risk seviyesi 1-3 olan fonlar
                return fundRiskLevel <= 3;
            } else if (profileName === 'medium') {
                // Orta riskli yatırımcı: Risk seviyesi 1-5 olan fonlar
                return fundRiskLevel <= 5;
            } else {
                // Yüksek riskli yatırımcı: Tüm fonlar kabul
                return true;
            }
        });
        
        console.log(`Risk profile: ${profileName}, Suitable funds after risk filter: ${suitableFunds.length}`);

        // Map to backend model (FundData)
        const fundsPayload = suitableFunds.map(fund => ({
            code: fund.code,
            name: fund.name,
            returns: fund.dailyReturns || [],
            current_price: fund.currentPrice,
            total_value: 0,
            risk_level: fund.category?.riskLevel || 4  // Risk seviyesini de gönder
        })).filter(f => f.returns.length > 5); // Ensure meaningful data

        if (fundsPayload.length < 2) {
            throw new Error("Yeterli veri içeren fon bulunamadı (Backend).");
        }

        // Limit payload size if necessary (backend limits to 10 funds in shortlist?)
        // The backend validation says: "Maximum 10 funds allowed in shortlist"
        // So we MUST select top 10 candidates LOCALLY before sending to backend.

        // Sort by local Sharpe ratio to pick top 10
        fundsPayload.sort((a, b) => {
            const sharpeA = this.calculateSharpe(a.returns);
            const sharpeB = this.calculateSharpe(b.returns);
            return sharpeB - sharpeA;
        });

        const shortlist = fundsPayload.slice(0, 10);
        console.log(`Sending top ${shortlist.length} funds to backend.`);

        const payload = {
            funds: shortlist,
            risk_profile: profileName,
            risk_free_rate: 0.0, // Backend handles this
            max_funds_final: 5
        };

        // 2. Call API
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`API Hatası (${response.status}): ${errText}`);
            }

            const data = await response.json();
            console.log('Backend Response:', data);

            if (!data.success || !data.best_portfolio) {
                throw new Error("Backend optimizasyonu başarısız oldu veya portföy üretilemedi.");
            }

            // 3. Map Backend Result to Frontend Structure
            const best = data.best_portfolio;

            // Map allocations back to full fund objects
            const portfolioFunds = best.allocations.map(alloc => {
                const originalFund = this.funds.find(f => f.code === alloc.code);
                if (!originalFund) return null;

                return {
                    ...originalFund,
                    weight: alloc.weight,
                    allocation: alloc.weight_pct
                };
            }).filter(f => f !== null);

            // Create result object matching generateOptimalPortfolio output
            return {
                riskProfile: profile,
                funds: portfolioFunds,
                statistics: {
                    expectedReturn: best.metrics.expected_return,
                    volatility: best.metrics.volatility,
                    sharpeRatio: best.metrics.sharpe_ratio,
                    maxDrawdown: best.metrics.max_drawdown || 0, // Backend might not send this
                    diversificationScore: portfolioFunds.length >= 5 ? 'Yüksek' : 'Orta',
                    computationTime: data.computation_time_ms
                },
                method: best.method,
                backend: true
            };

        } catch (error) {
            console.error('Backend optimization failed:', error);
            throw error; // Let caller handle fallback
        }
    }

    // Helper for local sorting before sending
    calculateSharpe(returns) {
        if (!returns || returns.length < 2) return 0;
        const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
        const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
        const std = Math.sqrt(variance);
        return std > 0 ? (mean * 252) / (std * Math.sqrt(252)) : 0;
    }
}


// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioOptimizer;
}
