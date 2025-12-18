/**
 * IPS Rapor Oluşturucu
 * Tüm IPS bölümlerini birleştiren ana modül
 * 
 * Kuveyt Türk Portföy - Investment Policy Statement (IPS) Modülü v2.0
 * 
 * CFA Institute standartları, SPK düzenlemeleri ve Katılım Finans ilkelerine uygun
 */

const IPSReport = {
    // Rapor verileri
    reportData: null,
    charts: {},
    fullIPS: null, // Yeni: Kapsamlı IPS verisi
    expertContent: null, // AI Expert Agent içerikleri

    /**
     * Raporu başlat
     * @param {Object} surveyAnswers - Anket cevapları
     * @param {Object} riskResult - Risk profili sonucu
     * @param {Object} portfolioData - Portföy verileri (opsiyonel)
     * @param {Object} expertContent - AI Expert Agent içerikleri (opsiyonel)
     */
    init: function (surveyAnswers, riskResult, portfolioData = null, expertContent = null) {
        this.expertContent = expertContent;

        this.reportData = {
            surveyAnswers: surveyAnswers,
            riskResult: riskResult,
            portfolioData: portfolioData,
            expertContent: expertContent,
            generatedDate: new Date().toLocaleDateString('tr-TR', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR', {
                year: 'numeric', month: 'long', day: 'numeric'
            })
        };

        // Yeni: Kapsamlı IPS içeriği oluştur
        if (typeof IPSContentGenerator !== 'undefined') {
            try {
                this.fullIPS = IPSContentGenerator.generateFullIPS(
                    surveyAnswers,
                    riskResult,
                    portfolioData
                );

                // Expert AI içeriklerini fullIPS'e ekle
                if (expertContent) {
                    this.fullIPS.expertContent = expertContent;
                    console.log('[IPS] Expert AI içerikleri eklendi:', Object.keys(expertContent));
                }

                console.log('[IPS] Kapsamlı IPS içeriği oluşturuldu:', this.fullIPS.metadata);
            } catch (e) {
                console.warn('[IPS] İçerik üretimi hatası:', e);
            }
        }

        return this;
    },

    /**
     * Tam raporu render et
     * @param {string} containerId - Render edilecek container ID
     * @param {string} mode - 'full' (kapsamlı) veya 'summary' (özet)
     */
    renderFullReport: function (containerId, mode = 'full') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('IPS Report container not found:', containerId);
            return;
        }

        // Yeni kapsamlı IPS renderer'ı kullan
        if (mode === 'full' && this.fullIPS && typeof IPSReportRenderer !== 'undefined') {
            console.log('📄 Kapsamlı IPS raporu render ediliyor...');
            IPSReportRenderer.renderFullReport(this.fullIPS, containerId);

            // Chart'ları oluştur (DOM hazır olana kadar bekle)
            setTimeout(() => {
                this.renderAllocationPieChart();
            }, 300);

            return this;
        }

        // Fallback: Eski özet rapor HTML'ini oluştur
        container.innerHTML = this.generateReportHTML();

        // Chart'ları oluştur
        this.renderCharts();

        // Event listener'ları ekle
        this.attachEventListeners();

        return this;
    },

    /**
     * Sadece özet rapor render et (mevcut kısa versiyon)
     */
    renderSummaryReport: function (containerId) {
        return this.renderFullReport(containerId, 'summary');
    },

    /**
     * Rapor HTML'i oluştur
     */
    generateReportHTML: function () {
        const profileSummary = IPSEvaluations.getProfileSummary(this.reportData.riskResult.profileName);

        return `
            <div class="ips-report">
                <!-- Rapor Header -->
                ${this.generateHeaderSection(profileSummary)}
                
                <!-- Bölüm 1: Yatırımcı Profili Özeti -->
                ${this.generateProfileSummarySection(profileSummary)}
                
                <!-- Bölüm 2: Risk Analizi Charts -->
                ${this.generateChartsSection()}
                
                <!-- Bölüm 3: Detaylı Anket Cevapları -->
                ${this.generateAnswersSection()}
                
                <!-- Bölüm 4: Yatırım Hedefleri -->
                ${this.generateObjectivesSection(profileSummary)}
                
                <!-- Bölüm 5: Varlık Dağılımı -->
                ${this.generateAssetAllocationSection(profileSummary)}
                
                <!-- Bölüm 6: Fon Önerileri -->
                ${this.generateFundRecommendationsSection()}
                
                <!-- Bölüm 7: Katılım Finans İlkeleri -->
                ${this.generateEthicalSection()}
                
                <!-- Bölüm 8: Onay ve İmza -->
                ${this.generateApprovalSection()}
            </div>
        `;
    },

    /**
     * Rapor başlığı
     */
    generateHeaderSection: function (profileSummary) {
        const score = this.reportData.riskResult.normalizedScore;
        return `
            <div class="ips-header uk-card uk-card-default uk-card-body uk-margin-bottom">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                        <h2 class="uk-margin-remove-bottom">
                            <span uk-icon="icon: file-text; ratio: 1.2" class="uk-text-primary"></span> Yatırım Politikası Beyanı (IPS)
                        </h2>
                        <p class="uk-text-meta uk-margin-remove-top">
                            Risk Profili Değerlendirme Raporu
                        </p>
                    </div>
                    <div class="uk-width-auto">
                        <div class="ips-score-badge" style="background-color: ${profileSummary.color}20; border: 2px solid ${profileSummary.color}; padding: 15px 25px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 32px; font-weight: bold; color: ${profileSummary.color};">
                                ${score.toFixed(1)}%
                            </div>
                            <div style="font-size: 14px; color: ${profileSummary.color}; font-weight: 600;">
                                ${profileSummary.title}
                            </div>
                            <div style="font-size: 12px; color: #666;">
                                Risk Seviyesi: ${profileSummary.riskScore}
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="uk-grid-small uk-child-width-1-3@s" uk-grid>
                    <div>
                        <span class="uk-text-muted"><span uk-icon="icon: calendar; ratio: 0.8"></span> Değerlendirme Tarihi:</span><br>
                        <strong>${this.reportData.generatedDate}</strong>
                    </div>
                    <div>
                        <span class="uk-text-muted"><span uk-icon="icon: refresh; ratio: 0.8"></span> Sonraki Gözden Geçirme:</span><br>
                        <strong>${this.reportData.nextReviewDate}</strong>
                    </div>
                    <div>
                        <span class="uk-text-muted"><span uk-icon="icon: clock; ratio: 0.8"></span> Zaman Ufku:</span><br>
                        <strong>${profileSummary.timeHorizon}</strong>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Profil özeti bölümü
     */
    generateProfileSummarySection: function (profileSummary) {
        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: user; ratio: 1" class="uk-text-primary"></span> Yatırımcı Profili: ${profileSummary.title}
                </h3>
                <p class="uk-text-lead">${profileSummary.description}</p>
                
                <div class="uk-grid-small uk-child-width-1-2@m uk-margin-top" uk-grid>
                    <div>
                        <div class="uk-panel uk-padding-small" style="background: #f8f9fa; border-radius: 8px;">
                            <h4 class="uk-margin-small-bottom"><span uk-icon="icon: trending-up; ratio: 0.9"></span> Hedef Performans</h4>
                            <ul class="uk-list uk-list-bullet">
                                <li><strong>Beklenen Getiri:</strong> ${profileSummary.targetReturn}</li>
                                <li><strong>Maks. Volatilite:</strong> ${profileSummary.maxVolatility}</li>
                                <li><strong>Zaman Ufku:</strong> ${profileSummary.timeHorizon}</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="uk-panel uk-padding-small" style="background: #f8f9fa; border-radius: 8px;">
                            <h4 class="uk-margin-small-bottom"><span uk-icon="icon: settings; ratio: 0.9"></span> Risk Metrikleri</h4>
                            <ul class="uk-list uk-list-bullet">
                                <li><strong>Risk Seviyesi:</strong> ${profileSummary.riskScore}</li>
                                <li><strong>Profil:</strong> ${profileSummary.title}</li>
                                <li><strong>Skor:</strong> ${this.reportData.riskResult.normalizedScore.toFixed(1)}%</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Charts bölümü
     */
    generateChartsSection: function () {
        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: graph; ratio: 1" class="uk-text-primary"></span> Risk Analizi Grafikleri
                </h3>

                <div class="uk-grid-match uk-child-width-1-2@m" uk-grid>
                    <div>
                        <div class="uk-panel" style="height: 300px;">
                            <canvas id="ipsRadarChart"></canvas>
                        </div>
                    </div>
                    <div>
                        <div class="uk-panel" style="height: 300px;">
                            <canvas id="ipsGaugeChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="uk-margin-top">
                    <div style="height: 400px;">
                        <canvas id="ipsScoreBarChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Detaylı anket cevapları bölümü
     */
    generateAnswersSection: function () {
        const answers = this.reportData.surveyAnswers;
        let answersHTML = '';

        // Kategorilere göre grupla
        const categories = {
            'Risk Kapasitesi': ['q2', 'q3', 'q4', 'q5', 'q6'],
            'Risk İstekliliği': ['q7', 'q8', 'q9', 'q10'],
            'Davranışsal Senaryolar': ['q13', 'q14', 'q15']
        };

        for (const [categoryName, questionIds] of Object.entries(categories)) {
            answersHTML += `
                <div class="uk-margin-medium-top">
                    <h4 class="uk-heading-bullet">${categoryName}</h4>
                    <div class="uk-grid-small uk-child-width-1-1" uk-grid>
            `;

            for (const qId of questionIds) {
                if (answers[qId] !== undefined) {
                    const qInfo = IPSEvaluations.questionLabels[qId];
                    const evaluation = IPSEvaluations.getQuestionEvaluation(qId, answers[qId], answers[qId + '_text']);

                    if (qInfo && evaluation) {
                        const scorePercent = this.calculateQuestionScore(qId, answers[qId]);
                        const criticalBadge = qInfo.critical ? '<span class="uk-label uk-label-warning uk-margin-small-left">Kritik</span>' : '';

                        answersHTML += `
                            <div>
                                <div class="ips-answer-card uk-panel uk-padding-small" style="background: #f8f9fa; border-radius: 8px; border-left: 4px solid ${this.getRiskImpactColor(evaluation.riskImpact)};">
                                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                                        <div class="uk-width-expand">
                                            <h5 class="uk-margin-remove">
                                                ${qInfo.icon} ${qInfo.title} ${criticalBadge}
                                            </h5>
                                            <div class="uk-text-meta uk-margin-small-top">
                                                <strong>Cevap:</strong> ${evaluation.answer}
                                            </div>
                                            <p class="uk-margin-small-top uk-text-small">
                                                <span uk-icon="icon: lightbulb; ratio: 0.7"></span> <em>${evaluation.evaluation}</em>
                                            </p>
                                            <p class="uk-margin-remove uk-text-small uk-text-muted">
                                                <span uk-icon="icon: bookmark; ratio: 0.7"></span> ${evaluation.implication}
                                            </p>
                                        </div>
                                        <div class="uk-width-auto uk-text-center">
                                            <div class="ips-mini-score" style="width: 60px; height: 60px; border-radius: 50%; background: ${this.getRiskImpactColor(evaluation.riskImpact)}20; display: flex; align-items: center; justify-content: center; border: 2px solid ${this.getRiskImpactColor(evaluation.riskImpact)};">
                                                <span style="font-weight: bold; color: ${this.getRiskImpactColor(evaluation.riskImpact)};">${scorePercent}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }
            }

            answersHTML += `
                    </div>
                </div>
            `;
        }

        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom">
                <h3 class="uk-card-title">
                    <span class="uk-text-primary">📝</span> Detaylı Anket Değerlendirmesi
                </h3>
                <p class="uk-text-muted">Her sorunun finansal açıdan değerlendirmesi ve portföy stratejisine etkisi.</p>
                ${answersHTML}
            </div>
        `;
    },

    /**
     * Yatırım hedefleri bölümü
     */
    generateObjectivesSection: function (profileSummary) {
        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: crosshairs; ratio: 1" class="uk-text-primary"></span> Yatırım Hedefleri
                </h3>

                <div class="uk-grid-small uk-child-width-1-3@m" uk-grid>
                    <div>
                        <div class="uk-panel uk-padding-small uk-text-center" style="background: linear-gradient(135deg, #00a65120 0%, #00a65110 100%); border-radius: 12px;">
                            <span uk-icon="icon: trending-up; ratio: 2" style="color: #00a651;"></span>
                            <h4 class="uk-margin-small">Getiri Hedefi</h4>
                            <p class="uk-text-lead uk-margin-remove" style="color: #00a651;">${profileSummary.targetReturn}</p>
                            <p class="uk-text-small uk-text-muted">Yıllık beklenen getiri</p>
                        </div>
                    </div>
                    <div>
                        <div class="uk-panel uk-padding-small uk-text-center" style="background: linear-gradient(135deg, #f39c1220 0%, #f39c1210 100%); border-radius: 12px;">
                            <span uk-icon="icon: bolt; ratio: 2" style="color: #f39c12;"></span>
                            <h4 class="uk-margin-small">Volatilite Toleransı</h4>
                            <p class="uk-text-lead uk-margin-remove" style="color: #f39c12;">${profileSummary.maxVolatility}</p>
                            <p class="uk-text-small uk-text-muted">Maksimum dalgalanma</p>
                        </div>
                    </div>
                    <div>
                        <div class="uk-panel uk-padding-small uk-text-center" style="background: linear-gradient(135deg, #3498db20 0%, #3498db10 100%); border-radius: 12px;">
                            <span uk-icon="icon: clock; ratio: 2" style="color: #3498db;"></span>
                            <h4 class="uk-margin-small">Zaman Ufku</h4>
                            <p class="uk-text-lead uk-margin-remove" style="color: #3498db;">${profileSummary.timeHorizon}</p>
                            <p class="uk-text-small uk-text-muted">Yatırım süresi</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Varlık dağılımı bölümü
     */
    generateAssetAllocationSection: function (profileSummary) {
        let allocationRows = '';
        for (const [asset, range] of Object.entries(profileSummary.assetAllocation)) {
            allocationRows += `
                <tr>
                    <td>${asset}</td>
                    <td class="uk-text-center"><strong>${range}</strong></td>
                </tr>
            `;
        }

        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: thumbnails; ratio: 1" class="uk-text-primary"></span> Önerilen Varlık Dağılımı
                </h3>

                <div class="uk-grid-match uk-child-width-1-2@m" uk-grid>
                    <div>
                        <div style="height: 300px;">
                            <canvas id="ipsAllocationChart"></canvas>
                        </div>
                    </div>
                    <div>
                        <table class="uk-table uk-table-striped uk-table-small">
                            <thead>
                                <tr>
                                    <th>Varlık Sınıfı</th>
                                    <th class="uk-text-center">Önerilen Aralık</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${allocationRows}
                            </tbody>
                        </table>
                        <p class="uk-text-small uk-text-muted">
                            * Bu dağılım, risk profilinize göre önerilen aralıkları göstermektedir.
                            Gerçek dağılım, piyasa koşulları ve kişisel tercihlerinize göre ayarlanabilir.
                        </p>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Fon önerileri bölümü
     */
    generateFundRecommendationsSection: function () {
        const result = this.reportData.riskResult;
        const portfolio = result.optimalPortfolio || [];

        let fundsHTML = '';
        for (const fund of portfolio) {
            fundsHTML += `
                <div class="uk-width-1-2@s uk-width-1-3@m">
                    <div class="uk-panel uk-padding-small" style="background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                        <div class="uk-flex uk-flex-middle uk-flex-between">
                            <div>
                                <h5 class="uk-margin-remove">${fund.code || fund.name}</h5>
                                <p class="uk-text-small uk-text-muted uk-margin-remove">${fund.name}</p>
                            </div>
                            <div class="uk-text-right">
                                <span class="uk-badge" style="background: #00a651;">%${(fund.weight * 100).toFixed(1)}</span>
                            </div>
                        </div>
                        <div class="uk-margin-small-top uk-text-small">
                            <span class="uk-text-muted">Risk: </span>
                            <span>${fund.riskLevel || '-'}/7</span>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: credit-card; ratio: 1" class="uk-text-primary"></span> Önerilen Fonlar
                </h3>
                <p class="uk-text-muted">Risk profilinize uygun Kuveyt Türk Portföy fonları.</p>

                <div class="uk-grid-small" uk-grid>
                    ${fundsHTML || '<p class="uk-text-muted">Portföy optimizasyonu yapılıyor...</p>'}
                </div>
            </div>
        `;
    },

    /**
     * Katılım finans ilkeleri bölümü
     */
    generateEthicalSection: function () {
        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom" style="background: linear-gradient(135deg, #00a65108 0%, #ffffff 100%);">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: heart; ratio: 1" class="uk-text-primary"></span> Katılım Finans İlkeleri
                </h3>

                <div class="uk-grid-small uk-child-width-1-2@m" uk-grid>
                    <div>
                        <h4 class="uk-text-success"><span uk-icon="icon: check; ratio: 0.9"></span> Kuveyt Türk Portföy Taahhüdü</h4>
                        <ul class="uk-list uk-list-bullet">
                            <li>Tüm fonlarımız katılım finans ilkelerine uygundur</li>
                            <li>Faiz ve haram gelir içermez</li>
                            <li>Danışma Kurulu onaylı yatırım stratejileri</li>
                            <li>Şeffaf ve etik yatırım politikası</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="uk-text-danger"><span uk-icon="icon: ban; ratio: 0.9"></span> Yatırım Yapılmayan Sektörler</h4>
                        <ul class="uk-list uk-list-bullet">
                            <li>Alkol ve tütün ürünleri</li>
                            <li>Kumar ve şans oyunları</li>
                            <li>Faiz bazlı finansal kurumlar</li>
                            <li>Silah ve savunma sanayi</li>
                            <li>Domuz eti ve türevleri</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Onay ve imza bölümü
     */
    generateApprovalSection: function () {
        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: pencil; ratio: 1" class="uk-text-primary"></span> Onay ve İmza
                </h3>

                <div class="uk-alert-warning" uk-alert>
                    <p><strong><span uk-icon="icon: warning; ratio: 0.8"></span> Yasal Uyarı:</strong> Bu rapor yatırım danışmanlığı kapsamında değildir. Yatırım kararları kişisel mali durumunuza göre değerlendirilmelidir. Geçmiş performans gelecek sonuçların garantisi değildir.</p>
                </div>

                <div class="uk-grid-match uk-child-width-1-2@m uk-margin-medium-top" uk-grid>
                    <div>
                        <div class="uk-panel uk-padding" style="border: 2px dashed #ddd; border-radius: 8px; min-height: 150px;">
                            <h5>Yatırımcı</h5>
                            <p class="uk-text-muted">İmza / Tarih</p>
                            <div style="border-bottom: 1px solid #333; margin-top: 60px;"></div>
                        </div>
                    </div>
                    <div>
                        <div class="uk-panel uk-padding" style="border: 2px dashed #ddd; border-radius: 8px; min-height: 150px;">
                            <h5>Yatırım Danışmanı</h5>
                            <p class="uk-text-muted">İmza / Tarih</p>
                            <div style="border-bottom: 1px solid #333; margin-top: 60px;"></div>
                        </div>
                    </div>
                </div>

                <div class="uk-margin-medium-top uk-text-center">
                    <button class="uk-button uk-button-primary uk-margin-small-right" onclick="IPSReport.printReport()">
                        <span uk-icon="icon: print; ratio: 0.8"></span> Yazdır
                    </button>
                    <button class="uk-button uk-button-secondary" onclick="IPSReport.downloadPDF()">
                        <span uk-icon="icon: download; ratio: 0.8"></span> PDF İndir
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Chart'ları render et
     */
    renderCharts: function () {
        const result = this.reportData.riskResult;
        const answers = this.reportData.surveyAnswers;
        const profileSummary = IPSEvaluations.getProfileSummary(result.profileName);

        // Radar Chart verileri
        const radarScores = [
            this.calculateQuestionScore('q2', answers.q2),  // Yaş
            this.calculateQuestionScore('q4', answers.q4),  // Gelir
            this.calculateQuestionScore('q5', answers.q5),  // Varlık
            this.calculateQuestionScore('q6', answers.q6),  // Deneyim
            this.calculateQuestionScore('q7', answers.q7, answers.q7_text),  // Risk Tol.
            this.calculateQuestionScore('q14', answers.q14, answers.q14_text) // Likidite
        ];

        // Radar Chart
        const radarCtx = document.getElementById('ipsRadarChart');
        if (radarCtx) {
            this.charts.radar = IPSCharts.createRiskRadarChart(radarCtx.getContext('2d'), radarScores);
        }

        // Gauge Chart
        const gaugeCtx = document.getElementById('ipsGaugeChart');
        if (gaugeCtx) {
            this.charts.gauge = IPSCharts.createRiskGaugeChart(
                gaugeCtx.getContext('2d'),
                result.normalizedScore,
                result.profileName
            );
        }

        // Score Bar Chart
        const barCtx = document.getElementById('ipsScoreBarChart');
        if (barCtx) {
            const questionScores = this.getQuestionScoresForChart(answers);
            this.charts.scoreBar = IPSCharts.createScoreBarChart(barCtx.getContext('2d'), questionScores);
        }

        // Allocation Chart
        const allocationCtx = document.getElementById('ipsAllocationChart');
        if (allocationCtx) {
            const allocationData = {};
            for (const [key, value] of Object.entries(profileSummary.assetAllocation)) {
                // "20-30%" formatından ortalama al
                const match = value.match(/([0-9]+)-?([0-9]*)/);
                if (match) {
                    const min = parseInt(match[1]);
                    const max = match[2] ? parseInt(match[2]) : min;
                    allocationData[key] = (min + max) / 2;
                }
            }

            // Ortalama değerler 100'ü aşarsa/düşerse (ör: medium/high profilde 105) normalize et
            const total = Object.values(allocationData).reduce((sum, val) => sum + val, 0);
            if (total > 0 && Math.abs(total - 100) > 0.01) {
                Object.keys(allocationData).forEach(key => {
                    allocationData[key] = (allocationData[key] / total) * 100;
                });
            }

            this.charts.allocation = IPSCharts.createPortfolioDoughnutChart(
                allocationCtx.getContext('2d'),
                allocationData
            );
        }
    },

    /**
     * Soru puanını hesapla
     */
    calculateQuestionScore: function (qId, answer, answerText) {
        const weights = { q2: 8, q3: 4, q4: 5, q5: 5, q6: 10, q7: 12, q8: 6, q9: 10, q10: 15, q13: 10, q14: 7, q15: 10 };
        const weight = weights[qId] || 10;
        const maxScore = weight * 4;

        // Basit puan tahmini (gerçek hesaplama portfolio-optimizer.js'de)
        let value = 2; // Orta değer varsayılan

        if (['a', 'low'].includes(answer)) value = 1;
        else if (['b', 'medium_low'].includes(answer)) value = 2;
        else if (['c', 'medium', 'medium_high'].includes(answer)) value = 3;
        else if (['d', 'high'].includes(answer)) value = 4;
        else if (typeof answer === 'number') value = Math.ceil(answer / 25);

        return Math.round((value * weight / maxScore) * 100);
    },

    /**
     * Chart için soru skorlarını hazırla
     */
    getQuestionScoresForChart: function (answers) {
        const questions = ['q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q13', 'q14', 'q15'];
        return questions.filter(q => answers[q] !== undefined).map(qId => {
            const qInfo = IPSEvaluations.questionLabels[qId];
            return {
                label: qInfo ? qInfo.title : qId,
                percentage: this.calculateQuestionScore(qId, answers[qId], answers[qId + '_text'])
            };
        });
    },

    /**
     * Risk etkisi rengini al
     */
    getRiskImpactColor: function (impact) {
        const colors = {
            conservative: '#27ae60',
            cautious: '#2ecc71',
            neutral: '#f39c12',
            positive: '#3498db',
            aggressive: '#e74c3c'
        };
        return colors[impact] || colors.neutral;
    },

    /**
     * Event listener'ları ekle
     */
    attachEventListeners: function () {
        // Gerekirse ek etkileşimler buraya
    },

    /**
     * Raporu yazdır
     */
    printReport: function () {
        window.print();
    },

    /**
     * PDF olarak indir
     */
    downloadPDF: function () {
        alert('PDF indirme özelliği için tarayıcınızın Yazdır > PDF olarak kaydet seçeneğini kullanabilirsiniz.');
        window.print();
    },

    /**
     * Kapsamlı IPS'teki varlık dağılımı pie chart'ı oluştur
     * Gerçek fon dağılım verilerini kullanır (riskProfiliSonuc.data.fonDagilimData)
     */
    renderAllocationPieChart: function () {
        const container = document.getElementById('allocationChartContainer');
        if (!container) {
            console.warn('[IPS Chart] allocationChartContainer bulunamadı');
            return;
        }

        // Gerçek fon dağılım verilerini localStorage'dan al
        const riskProfiliSonuc = JSON.parse(localStorage.getItem('riskProfiliSonuc') || '{}');
        const fonDagilimData = riskProfiliSonuc?.data?.fonDagilimData || [];

        if (!fonDagilimData || fonDagilimData.length === 0) {
            console.warn('[IPS Chart] Fon dağılım verisi bulunamadı, fallback kullanılıyor');
            // Fallback: IPS'ten stratejik dağılım
            const allocation = this.fullIPS?.assetAllocation?.content?.strategicAllocation?.allocation || {};
            if (Object.keys(allocation).length === 0) {
                container.innerHTML = '<div class="uk-alert uk-alert-warning">Fon dağılım verisi bulunamadı.</div>';
                return;
            }
        }

        // Chart container'ı temizle ve yeniden oluştur
        // allocation_rationale verisini al
        const allocationRationale = this.expertContent?.allocation_rationale || null;

        let rationaleHtml = '';
        if (allocationRationale) {
            rationaleHtml = `
                <div class="ips-allocation-rationale uk-margin-top" style="padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border-left: 4px solid var(--ips-primary, #186149);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 1.1;" style="color: var(--ips-primary, #186149);"></span>
                        <strong style="font-size: 1.1rem; color: var(--ips-primary, #186149);">Neden Bu Dağılım?</strong>
                    </div>
                    
                    <p style="margin: 0 0 16px 0; line-height: 1.7; font-size: 1rem;">${this.escapeHtml(allocationRationale.algorithm_summary || '')}</p>
                    
                    <div class="uk-grid-small uk-child-width-1-2@m uk-margin" uk-grid>
                        <div>
                            <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e9ecef;">
                                <strong style="font-size: 0.85rem; color: #666;">Optimizasyon Yöntemi</strong>
                                <div style="font-size: 1rem; color: var(--ips-primary, #186149); font-weight: 600; margin-top: 4px;">${this.escapeHtml(allocationRationale.optimization_method || '')}</div>
                            </div>
                        </div>
                        <div>
                            <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e9ecef;">
                                <strong style="font-size: 0.85rem; color: #666;">Yeniden Dengeleme</strong>
                                <div style="font-size: 0.9rem; margin-top: 4px;">${this.escapeHtml(allocationRationale.rebalancing_recommendation || '')}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 16px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
                        <strong style="font-size: 0.9rem; color: #186149;">📊 Risk Skoru Etkisi</strong>
                        <p style="margin: 8px 0 0 0; line-height: 1.6; font-size: 0.95rem;">${this.escapeHtml(allocationRationale.risk_score_impact || '')}</p>
                    </div>
                    
                    <div style="margin-top: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
                        <strong style="font-size: 0.9rem; color: #186149;">🤖 AI Analizi</strong>
                        <p style="margin: 8px 0 0 0; line-height: 1.6; font-size: 0.95rem;">${this.escapeHtml(allocationRationale.ai_analysis || '')}</p>
                    </div>
                    
                    ${allocationRationale.diversification_notes && allocationRationale.diversification_notes.length > 0 ? `
                    <div style="margin-top: 12px;">
                        <strong style="font-size: 0.9rem; color: #186149;">Çeşitlendirme Notları</strong>
                        <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.9rem;">
                            ${allocationRationale.diversification_notes.map(note => `<li>${this.escapeHtml(note)}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${allocationRationale.key_factors && allocationRationale.key_factors.length > 0 ? `
                    <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px;">
                        ${allocationRationale.key_factors.map(factor => `
                            <span style="background: var(--ips-primary, #186149); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem;">${this.escapeHtml(factor)}</span>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            `;
        }

        // Fon detay tablosu HTML'i oluştur
        let fundTableHtml = '';
        if (fonDagilimData.length > 0) {
            const colors = ['#186149', '#42B38E', '#7CFFD4', '#EE5C2E', '#F9CA4F', '#FFA84A'];
            fundTableHtml = `
                <div class="ips-fund-details uk-margin-top" style="padding: 16px; background: #fff; border-radius: 12px; border: 1px solid #e9ecef;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: list; ratio: 0.9;" style="color: var(--ips-primary, #186149);"></span>
                        <strong style="font-size: 1rem; color: var(--ips-primary, #186149);">Önerilen Fon Dağılımı</strong>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #e9ecef;">
                                <th style="padding: 10px 8px; text-align: left;">Fon Adı</th>
                                <th style="padding: 10px 8px; text-align: center;">Oran</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${fonDagilimData.map((item, i) => {
                const color = colors[i % colors.length];
                return `
                                    <tr style="border-bottom: 1px solid #e9ecef;">
                                        <td style="padding: 10px 8px;">
                                            <div style="display: flex; align-items: center; gap: 8px;">
                                                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${color};"></span>
                                                <span style="font-weight: 500;">${this.escapeHtml(item.name)}</span>
                                            </div>
                                        </td>
                                        <td style="padding: 10px 8px; text-align: center; font-weight: 600; color: var(--ips-primary, #186149);">%${item.value.toFixed(2)}</td>
                                    </tr>
                                `;
            }).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 12px; padding: 10px; background: #f8f9fa; border-radius: 8px; font-size: 0.85rem; color: #666;">
                        <strong>Not:</strong> Tüm önerilen fonlar Kuveyt Türk Portföy Yönetimi A.Ş. tarafından yönetilen, katılım finans ilkelerine uygun yatırım araçlarıdır.
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="ips-chart-title uk-text-center uk-margin-bottom">Fon Dağılım Önerileri</div>
            <div class="uk-grid-small uk-child-width-1-2@m" uk-grid>
                <div class="uk-flex uk-flex-center">
                    <canvas id="ipsAllocationChart" width="300" height="300"></canvas>
                </div>
                <div class="uk-flex uk-flex-column uk-flex-middle uk-flex-center">
                    <div class="js-fund-index-list" style="width: 100%;"></div>
                </div>
            </div>
            ${rationaleHtml}
            ${fundTableHtml}
        `;

        const canvas = document.getElementById('ipsAllocationChart');
        const indexList = document.querySelector('.js-fund-index-list');

        if (!canvas || !indexList) {
            console.error('[IPS Chart] Canvas veya legend container bulunamadı');
            return;
        }

        // Renkler (sonuç sayfasıyla aynı)
        const colors = ['#186149', '#42B38E', '#7CFFD4', '#EE5C2E', '#F9CA4F', '#FFA84A'];

        // Legend'ı doldur (jQuery varsa kullan, yoksa vanilla JS)
        indexList.innerHTML = '';
        fonDagilimData.forEach((item, index) => {
            const color = colors[index % colors.length];
            const html = `
                <div class="uk-flex uk-flex-middle uk-gap-8 uk-margin-small">
                    <span class="uk-flex uk-border-circle" style="width: 12px; height: 12px; background-color: ${color};"></span>
                    <span class="uk-margin-remove-last-child" style="font-weight: 500;">${item.name}</span>
                    <span class="uk-text-primary uk-margin-auto-left" style="font-weight: bold;">%${item.value.toFixed(2)}</span>
                </div>
            `;
            indexList.insertAdjacentHTML('beforeend', html);
        });

        // Chart'ı oluştur
        if (typeof Chart !== 'undefined') {
            // Mevcut chart'ı temizle (sadece geçerli bir Chart instance ise)
            if (window.ipsAllocationChart && typeof window.ipsAllocationChart.destroy === 'function') {
                window.ipsAllocationChart.destroy();
            }

            const ctx = canvas.getContext('2d');
            const chartData = {
                labels: fonDagilimData.map(item => item.name),
                datasets: [{
                    data: fonDagilimData.map(item => item.value),
                    backgroundColor: fonDagilimData.map((_, index) => colors[index % colors.length]),
                    borderWidth: 0,
                    cutout: '60%',
                }]
            };

            const options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                return context.label + ': %' + context.raw.toFixed(2);
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            };

            window.ipsAllocationChart = new Chart(ctx, {
                type: 'doughnut',
                data: chartData,
                options: options
            });

            console.log('[IPS Chart] Fon dağılım chart\'ı başarıyla oluşturuldu');
        } else {
            console.error('[IPS Chart] Chart.js kütüphanesi yüklenmedi');
            container.innerHTML = '<div class="uk-alert uk-alert-danger">Chart.js kütüphanesi yüklenemedi.</div>';
        }
    },

    /**
     * IPS verisini al (dışarıdan erişim için)
     */
    getIPSData: function () {
        return this.fullIPS;
    },

    /**
     * Tutarsızlıkları al
     */
    getInconsistencies: function () {
        return this.fullIPS?.riskAnalysis?.content?.inconsistencyAnalysis?.findings || [];
    },

    /**
     * Davranışsal bulguları al
     */
    getBehavioralFindings: function () {
        return this.fullIPS?.behavioralFindings?.content || null;
    },

    /**
     * IPS özet bilgilerini al
     */
    getSummary: function () {
        if (!this.fullIPS) return null;

        return {
            profile: this.fullIPS.metadata.profileName,
            riskScore: this.fullIPS.metadata.riskScore,
            hasInconsistencies: this.fullIPS.metadata.hasInconsistencies,
            inconsistencyCount: this.fullIPS.metadata.inconsistencyCount,
            generatedDate: this.fullIPS.metadata.generatedDate,
            nextReviewDate: this.fullIPS.metadata.nextReviewDate,
            profileTitle: this.fullIPS.riskAnalysis?.content?.overallProfile?.classification?.level,
            targetReturn: this.fullIPS.investmentObjectives?.content?.returnObjective?.target,
            maxVolatility: this.fullIPS.investmentObjectives?.content?.riskObjective?.maxVolatility,
            timeHorizon: this.fullIPS.investmentObjectives?.content?.timeHorizon?.horizon
        };
    }
};

// Global'e ekle
if (typeof window !== 'undefined') {
    window.IPSReport = IPSReport;
}
