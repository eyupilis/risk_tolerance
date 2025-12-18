/**
 * IPS Rapor Renderer - Kurumsal Tasarım v3.0
 * 
 * Kuveyt Türk Portföy Kurumsal Kimlik Standartlarına Uygun
 * Emoji yerine UIKit ikonları kullanır
 * Tablet/mobil düzenleme desteği
 */

const IPSReportRenderer = {

    // UIKit ikon mapping (emoji yerine)
    icons: {
        document: 'file-text',
        target: 'crosshairs',
        chart: 'graph',
        shield: 'lock',
        balance: 'thumbnails',
        grid: 'grid',
        warning: 'warning',
        check: 'check',
        info: 'info',
        settings: 'cog',
        calendar: 'calendar',
        user: 'user',
        users: 'users',
        clipboard: 'clipboard',
        list: 'list',
        search: 'search',
        edit: 'pencil',
        print: 'print',
        download: 'download',
        refresh: 'refresh',
        close: 'close',
        menu: 'menu',
        heart: 'heart',
        star: 'star',
        bolt: 'bolt',
        trending: 'arrow-up',
        arrow: 'chevron-right'
    },

    // Section icon mapping
    sectionIcons: {
        'scopeAndPurpose': 'file-text',
        'governance': 'users',
        'investmentObjectives': 'crosshairs',
        'riskAnalysis': 'graph',
        'constraints': 'lock',
        'assetAllocation': 'thumbnails',
        'investmentUniverse': 'grid',
        'riskManagement': 'warning',
        'participationFinance': 'heart',
        'behavioralFindings': 'user',
        'monitoringAndReporting': 'clipboard',
        'reviewAndApproval': 'check'
    },

    // Düzenleme modu
    editMode: false,
    changedFields: {},

    /**
     * Tam IPS raporu render et
     */
    renderFullReport: function (ipsData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('IPS Report container not found:', containerId);
            return;
        }

        // Expert AI içeriklerini sakla (bölüm render fonksiyonlarında kullanılacak)
        this.expertContent = ipsData.expertContent || null;
        if (this.expertContent) {
            console.log('[IPS Renderer] Expert AI içerikleri yüklendi:', Object.keys(this.expertContent));
        }

        const html = `
            <div class="ips-full-report" id="ipsFullReport">
                ${this.renderToolbar(ipsData)}
                ${this.renderCoverPage(ipsData)}
                ${this.renderTableOfContents(ipsData)}
                ${this.renderScopeSection(ipsData.scopeAndPurpose)}
                ${this.renderGovernanceSection(ipsData.governance)}
                ${this.renderObjectivesSection(ipsData.investmentObjectives)}
                ${this.renderRiskAnalysisSection(ipsData.riskAnalysis)}
                ${this.renderConstraintsSection(ipsData.constraints)}
                ${this.renderAssetAllocationSection(ipsData.assetAllocation)}
                ${this.renderInvestmentUniverseSection(ipsData.investmentUniverse)}
                ${this.renderRiskManagementSection(ipsData.riskManagement)}
                ${this.renderParticipationFinanceSection(ipsData.participationFinance)}
                ${this.renderBehavioralSection(ipsData.behavioralFindings)}
                ${this.renderMonitoringSection(ipsData.monitoringAndReporting)}
                ${this.renderApprovalSection(ipsData.reviewAndApproval)}
            </div>
        `;

        container.innerHTML = html;
        this.attachEventListeners();

        // Chart'ları render et
        setTimeout(() => {
            this.renderCharts();
        }, 100);

        return this;
    },

    /**
     * Toolbar render
     */
    renderToolbar: function (ipsData) {
        return `
            <div class="ips-toolbar no-print" id="ipsToolbar">
                <div class="ips-toolbar-title">
                    <span uk-icon="icon: file-text; ratio: 1.2"></span>
                    Yatırım Politikası Beyanı
                </div>
                <div class="ips-toolbar-actions">
                    <button class="ips-btn ips-btn--outline ips-btn--sm" onclick="IPSReportRenderer.toggleEditMode()" id="editModeBtn">
                        <span uk-icon="icon: pencil; ratio: 0.8"></span>
                        <span class="edit-btn-text">Düzenle</span>
                    </button>
                    <button class="ips-btn ips-btn--outline ips-btn--sm" onclick="IPSReportRenderer.exportPDF()">
                        <span uk-icon="icon: download; ratio: 0.8"></span>
                        PDF
                    </button>
                    <button class="ips-btn ips-btn--outline ips-btn--sm" onclick="window.print()">
                        <span uk-icon="icon: print; ratio: 0.8"></span>
                        Yazdır
                    </button>
                    <button class="ips-btn ips-btn--primary ips-btn--sm" onclick="IPSReportRenderer.saveChanges()" id="saveBtn" style="display: none;">
                        <span uk-icon="icon: check; ratio: 0.8"></span>
                        Kaydet
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Kapak sayfası
     */
    renderCoverPage: function (ipsData) {
        const meta = ipsData.metadata || {};
        const profile = ipsData.riskAnalysis?.content?.overallProfile || {};
        const riskLevel = profile.classification?.level || 'Risk Profili';

        return `
            <div class="ips-cover-page" id="ipsCover">
                <img src="/Content/images/logos/logo.svg" 
                     alt="Kuveyt Türk Portföy" 
                     class="ips-cover-logo"
                     onerror="this.style.display='none'">
                
                <h1 class="ips-cover-title">YATIRIM POLİTİKASI BEYANI</h1>
                <p class="ips-cover-subtitle">Investment Policy Statement (IPS)</p>
                
                <div class="ips-profile-badge">
                    <div class="ips-profile-level">${this.escapeHtml(riskLevel)}</div>
                    <div class="ips-profile-score">Risk Skoru: ${meta.riskScore || '-'}/100</div>
                </div>
                
                <div style="margin-top: 40px; opacity: 0.9; font-size: 0.95rem;">
                    <p><strong>Değerlendirme Tarihi:</strong> ${this.formatDate(meta.generatedDate)}</p>
                    <p><strong>Sonraki Gözden Geçirme:</strong> ${this.formatDate(meta.nextReviewDate)}</p>
                </div>
                
                <div style="margin-top: 40px; font-size: 0.85rem; opacity: 0.7;">
                    CFA Institute IPS standartları ve SPK düzenlemelerine uygun olarak hazırlanmıştır.
                </div>
            </div>
        `;
    },

    /**
     * İçindekiler
     */
    renderTableOfContents: function (ipsData) {
        const sections = [
            { num: '1', title: 'Kapsam ve Amaç', id: 'ips-scope', icon: 'file-text' },
            { num: '2', title: 'Yönetişim', id: 'ips-governance', icon: 'users' },
            { num: '3', title: 'Yatırım Hedefleri', id: 'ips-objectives', icon: 'crosshairs' },
            { num: '4', title: 'Risk Profili Analizi', id: 'ips-risk-analysis', icon: 'graph' },
            { num: '5', title: 'Kısıtlamalar', id: 'ips-constraints', icon: 'lock' },
            { num: '6', title: 'Varlık Tahsisi Politikası', id: 'ips-allocation', icon: 'thumbnails' },
            { num: '7', title: 'Yatırım Evreni', id: 'ips-universe', icon: 'grid' },
            { num: '8', title: 'Risk Yönetimi', id: 'ips-risk-management', icon: 'warning' },
            { num: '9', title: 'Katılım Finans İlkeleri', id: 'ips-participation', icon: 'heart' },
            { num: '10', title: 'Davranışsal Bulgular', id: 'ips-behavioral', icon: 'user' },
            { num: '11', title: 'İzleme ve Raporlama', id: 'ips-monitoring', icon: 'clipboard' },
            { num: '12', title: 'Gözden Geçirme ve Onay', id: 'ips-approval', icon: 'check' }
        ];

        const tocItems = sections.map(s => `
            <li class="ips-toc-item">
                <a href="#${s.id}" class="ips-toc-link" uk-scroll>
                    <span uk-icon="icon: ${s.icon}; ratio: 0.8" style="margin-right: 8px; color: var(--ips-primary);"></span>
                    <strong>${s.num}.</strong> ${s.title}
                </a>
                <span class="ips-toc-number">${s.num}</span>
            </li>
        `).join('');

        return `
            <div class="ips-toc" id="ips-toc">
                <h3 class="ips-toc-title">
                    <span uk-icon="icon: list; ratio: 1.2"></span>
                    İçindekiler
                </h3>
                <ul class="ips-toc-list">
                    ${tocItems}
                </ul>
            </div>
        `;
    },

    /**
     * Section wrapper
     */
    renderSection: function (id, title, icon, content, sectionNumber) {
        return `
            <div class="ips-section" id="${id}">
                <div class="ips-section-header">
                    <h3 class="ips-section-title">
                        <span class="ips-section-icon">
                            <span uk-icon="icon: ${icon}; ratio: 1"></span>
                        </span>
                        ${sectionNumber}. ${title}
                    </h3>
                    <div class="ips-section-actions no-print">
                        <button class="ips-btn ips-btn--icon ips-btn--outline" 
                                onclick="IPSReportRenderer.collapseSection('${id}')"
                                title="Bölümü Daralt">
                            <span uk-icon="icon: chevron-up; ratio: 0.8"></span>
                        </button>
                    </div>
                </div>
                <div class="ips-section-body" id="${id}-body">
                    ${content}
                </div>
            </div>
        `;
    },

    /**
     * Bölüm 1: Kapsam ve Amaç
     */
    renderScopeSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI yatırımcı profili içeriği
        const aiProfile = this.expertContent?.investor_profile || null;

        // AI içeriği varsa öne çıkar
        const aiProfileContent = aiProfile ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Yatırımcı Profili Özeti</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Analizi</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">${this.escapeHtml(aiProfile.summary || '')}</p>
                </div>
            </div>

            ${aiProfile.demographics_analysis ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Demografik Analiz</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiProfile.demographics_analysis)}</p>
            </div>
            ` : ''}

            ${aiProfile.investment_personality ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Yatırımcı Kişiliği</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiProfile.investment_personality)}</p>
            </div>
            ` : ''}

            <div class="ips-grid ips-grid--2" style="margin-top: 16px;">
                ${aiProfile.strengths && aiProfile.strengths.length > 0 ? `
                <div class="ips-info-panel" style="background: #e8f5e9; border-left: 4px solid #4caf50;">
                    <strong style="color: #2e7d32;">Güçlü Yönler</strong>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                        ${aiProfile.strengths.map(s => `<li>${this.escapeHtml(s)}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${aiProfile.attention_points && aiProfile.attention_points.length > 0 ? `
                <div class="ips-info-panel" style="background: #fff3e0; border-left: 4px solid #ff9800;">
                    <strong style="color: #e65100;">Dikkat Edilmesi Gerekenler</strong>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                        ${aiProfile.attention_points.map(a => `<li>${this.escapeHtml(a)}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        ` : '';

        const content = `
            ${aiProfileContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.purpose.title}</h4>
                <p class="ips-editable" data-field="scope.purpose.text">${this.escapeHtml(c.purpose.text)}</p>

                <div class="ips-info-panel uk-margin-top">
                    <strong>Bu beyanın önemi:</strong>
                    <ul class="ips-list uk-margin-small-top">
                        ${(c.purpose.importance || []).map(item => `
                            <li class="ips-list-item">${this.escapeHtml(item)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.investor.title}</h4>
                <div class="ips-grid ips-grid--3">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Yatırımcı Tipi</div>
                        <div class="ips-metric-value" style="font-size: 1.1rem;">${this.escapeHtml(c.investor.type)}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Kişi Türü</div>
                        <div class="ips-metric-value" style="font-size: 1.1rem;">${this.escapeHtml(c.investor.personType)}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Değerlendirme Tarihi</div>
                        <div class="ips-metric-value" style="font-size: 1.1rem;">${this.escapeHtml(c.investor.assessmentDate)}</div>
                    </div>
                </div>
                <p class="uk-margin-top">${this.escapeHtml(c.investor.description)}</p>
            </div>
        `;

        return this.renderSection('ips-scope', 'Kapsam ve Amaç', 'file-text', content, '1');
    },

    /**
     * Bölüm 2: Yönetişim
     */
    renderGovernanceSection: function (section) {
        if (!section) return '';
        const c = section.content;

        let rolesHtml = '';
        if (c.responsibilities && c.responsibilities.roles) {
            rolesHtml = c.responsibilities.roles.map(role => `
                <tr>
                    <td><strong>${this.escapeHtml(role.role)}</strong></td>
                    <td>${this.escapeHtml(role.description)}</td>
                </tr>
            `).join('');
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.responsibilities?.title || 'Sorumluluklar'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th style="width: 30%;">Rol</th>
                            <th>Sorumluluk</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rolesHtml}
                    </tbody>
                </table>
            </div>
            
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.reviewSchedule?.title || 'Gözden Geçirme Takvimi'}</h4>
                <div class="ips-info-panel">
                    <p><strong>Periyodik Gözden Geçirme:</strong> ${this.escapeHtml(c.reviewSchedule?.periodic || 'Yıllık')}</p>
                    <p class="uk-margin-small-top"><strong>Tetikleyici Olaylar:</strong></p>
                    <ul class="ips-list uk-margin-small-top">
                        ${(c.reviewSchedule?.triggers || []).map(t => `
                            <li class="ips-list-item">${this.escapeHtml(t)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        return this.renderSection('ips-governance', 'Yönetişim', 'users', content, '2');
    },

    /**
     * Bölüm 3: Yatırım Hedefleri
     */
    renderObjectivesSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI yatırım hedefleri içeriği
        const aiGoals = this.expertContent?.investment_goals || null;

        // AI içeriği varsa öne çıkar
        const aiGoalsContent = aiGoals ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Birincil Yatırım Hedefi</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Analizi</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.6; font-size: 1.05rem;">${this.escapeHtml(aiGoals.primary_goal || '')}</p>
                </div>
                ${aiGoals.secondary_goals && aiGoals.secondary_goals.length > 0 ? `
                    <div style="margin-top: 16px;">
                        <strong>İkincil Hedefler:</strong>
                        <ul style="margin-top: 8px; padding-left: 20px;">
                            ${aiGoals.secondary_goals.map(g => `<li>${this.escapeHtml(g)}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>

            ${aiGoals.time_horizon_analysis ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Zaman Ufku Analizi</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiGoals.time_horizon_analysis)}</p>
            </div>
            ` : ''}

            ${aiGoals.return_expectations ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Getiri Beklentileri</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiGoals.return_expectations)}</p>
            </div>
            ` : ''}

            ${aiGoals.risk_budget ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Risk Bütçesi</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiGoals.risk_budget)}</p>
            </div>
            ` : ''}
        ` : '';

        const content = `
            ${aiGoalsContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.returnObjective?.title || 'Getiri Hedefi'}</h4>
                <div class="ips-grid ips-grid--2">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Hedef Yıllık Getiri</div>
                        <div class="ips-metric-value">${c.returnObjective?.target || '-'}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Getiri Türü</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.returnObjective?.type || 'Nominal')}</div>
                    </div>
                </div>
                <p class="uk-margin-top ips-editable" data-field="objectives.description">
                    ${this.escapeHtml(c.returnObjective?.description || '')}
                </p>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.riskObjective?.title || 'Risk Hedefi'}</h4>
                <div class="ips-info-panel ips-info-panel--secondary">
                    <p><strong>Maksimum Volatilite:</strong> ${c.riskObjective?.maxVolatility || '-'}</p>
                    <p><strong>Maksimum Kayıp Toleransı:</strong> ${c.riskObjective?.maxDrawdown || '-'}</p>
                </div>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.timeHorizon?.title || 'Yatırım Vadesi'}</h4>
                <div class="ips-grid ips-grid--2">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Hedef Vade</div>
                        <div class="ips-metric-value" style="font-size: 1.25rem;">${this.escapeHtml(c.timeHorizon?.horizon || '-')}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Likidite İhtiyacı</div>
                        <div class="ips-metric-value" style="font-size: 1.25rem;">${this.escapeHtml(c.timeHorizon?.liquidity || '-')}</div>
                    </div>
                </div>
            </div>
        `;

        return this.renderSection('ips-objectives', 'Yatırım Hedefleri', 'crosshairs', content, '3');
    },

    /**
     * Bölüm 4: Risk Profili Analizi
     */
    renderRiskAnalysisSection: function (section) {
        if (!section) return '';
        const c = section.content;
        const profile = c.overallProfile || {};

        // Expert AI risk analizi içeriği
        const aiRisk = this.expertContent?.risk_analysis || null;

        // Risk profil kartları - AI içeriği varsa onu kullan
        const riskComponents = [
            {
                label: 'Risk Kapasitesi',
                value: aiRisk?.capacity_score || profile.capacity?.level || '-',
                desc: aiRisk?.capacity_explanation || profile.capacity?.description || ''
            },
            {
                label: 'Risk İstekliliği',
                value: aiRisk?.willingness_score || profile.tolerance?.level || '-',
                desc: aiRisk?.willingness_explanation || profile.tolerance?.description || ''
            }
        ];

        // AI genel değerlendirmesi
        const aiOverallAssessment = aiRisk?.overall_assessment || '';
        const aiInconsistency = aiRisk?.inconsistency_found ? `
            <div class="ips-alert ips-alert--warning" style="margin-top: 16px;">
                <span uk-icon="icon: warning; ratio: 1.2;"></span>
                <div>
                    <strong>Tutarsızlık Tespit Edildi</strong>
                    <p style="margin: 4px 0 0 0;">${this.escapeHtml(aiRisk.inconsistency_explanation || '')}</p>
                </div>
            </div>
        ` : '';

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Genel Risk Profili</h4>
                <div class="ips-risk-gauge">
                    <div class="ips-risk-gauge-value">${profile.classification?.score || '-'}</div>
                    <div class="ips-risk-gauge-label">${this.escapeHtml(profile.classification?.level || 'Risk Profili')}</div>
                    <div class="ips-risk-bar">
                        <div class="ips-risk-bar-fill" style="width: ${profile.classification?.score || 0}%;"></div>
                    </div>
                </div>
                ${aiOverallAssessment ? `
                    <div class="ips-ai-content" style="margin-top: 16px; padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                            <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Değerlendirmesi</strong>
                        </div>
                        <p style="margin: 0; line-height: 1.6;">${this.escapeHtml(aiOverallAssessment)}</p>
                    </div>
                ` : ''}
                ${aiInconsistency}
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Risk Bileşenleri</h4>
                <div class="ips-grid ips-grid--2">
                    ${riskComponents.map(comp => `
                        <div class="ips-info-panel">
                            <div style="font-weight: 600; margin-bottom: 8px;">${comp.label}</div>
                            <div style="font-size: 1.5rem; color: var(--ips-primary); font-weight: 600;">${this.escapeHtml(comp.value)}</div>
                            <div style="font-size: 0.9rem; color: var(--ips-text-muted); margin-top: 8px;">${this.escapeHtml(comp.desc)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${c.surveyAnalysis ? this.renderSurveyAnalysis(c.surveyAnalysis) : ''}
        `;

        return this.renderSection('ips-risk-analysis', 'Risk Profili Analizi', 'graph', content, '4');
    },

    /**
     * Anket analizi render
     */
    renderSurveyAnalysis: function (surveyAnalysis) {
        if (!surveyAnalysis || !surveyAnalysis.answers) return '';

        const answersHtml = Object.entries(surveyAnalysis.answers).map(([key, answer]) => {
            if (!answer || !answer.label) return '';
            return `
                <tr>
                    <td>${this.escapeHtml(answer.label || key)}</td>
                    <td>${this.escapeHtml(answer.answer || '-')}</td>
                    <td>
                        <span class="ips-badge ips-badge--${this.getScoreBadgeClass(answer.score)}">
                            ${answer.score || '-'}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Anket Cevap Analizi</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Cevap</th>
                            <th>Puan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${answersHtml}
                    </tbody>
                </table>
            </div>
        `;
    },

    /**
     * Bölüm 5: Kısıtlamalar
     */
    renderConstraintsSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI kısıtlar içeriği
        const aiConstraints = this.expertContent?.constraints || null;

        // AI içeriği varsa onu kullan
        let aiConstraintsContent = '';
        if (aiConstraints) {
            aiConstraintsContent = `
                ${aiConstraints.liquidity ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: bolt; ratio: 0.9" style="margin-right: 8px;"></span>
                        Likidite Kısıtlamaları
                    </h4>
                    <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                            <strong style="font-size: 0.85rem; color: var(--ips-primary);">Likidite İhtiyacı: ${this.escapeHtml(aiConstraints.liquidity.need_level || '')}</strong>
                        </div>
                        <p style="margin: 0 0 12px 0; line-height: 1.6;">${this.escapeHtml(aiConstraints.liquidity.explanation || '')}</p>
                        ${aiConstraints.liquidity.recommendations && aiConstraints.liquidity.recommendations.length > 0 ? `
                            <ul style="margin: 0; padding-left: 20px;">
                                ${aiConstraints.liquidity.recommendations.map(r => `<li>${this.escapeHtml(r)}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                ${aiConstraints.time_horizon ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: calendar; ratio: 0.9" style="margin-right: 8px;"></span>
                        Zaman Ufku
                    </h4>
                    <div class="ips-info-panel">
                        <p><strong>Kategori:</strong> ${this.escapeHtml(aiConstraints.time_horizon.category || '')}</p>
                        <p style="margin-top: 8px;">${this.escapeHtml(aiConstraints.time_horizon.explanation || '')}</p>
                        ${aiConstraints.time_horizon.implications && aiConstraints.time_horizon.implications.length > 0 ? `
                            <div style="margin-top: 12px;">
                                <strong>Yatırım Etkileri:</strong>
                                <ul style="margin-top: 8px; padding-left: 20px;">
                                    ${aiConstraints.time_horizon.implications.map(i => `<li>${this.escapeHtml(i)}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                ${aiConstraints.tax_considerations ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: file-text; ratio: 0.9" style="margin-right: 8px;"></span>
                        Vergi Değerlendirmeleri
                    </h4>
                    <p>${this.escapeHtml(aiConstraints.tax_considerations.summary || '')}</p>
                    ${aiConstraints.tax_considerations.key_points && aiConstraints.tax_considerations.key_points.length > 0 ? `
                        <ul class="ips-list uk-margin-small-top">
                            ${aiConstraints.tax_considerations.key_points.map(p => `<li class="ips-list-item">${this.escapeHtml(p)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                ` : ''}

                ${aiConstraints.legal_regulatory ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: lock; ratio: 0.9" style="margin-right: 8px;"></span>
                        Yasal ve Düzenleyici
                    </h4>
                    <p>${this.escapeHtml(aiConstraints.legal_regulatory.summary || '')}</p>
                    ${aiConstraints.legal_regulatory.key_points && aiConstraints.legal_regulatory.key_points.length > 0 ? `
                        <ul class="ips-list uk-margin-small-top">
                            ${aiConstraints.legal_regulatory.key_points.map(p => `<li class="ips-list-item">${this.escapeHtml(p)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                ` : ''}

                ${aiConstraints.unique_circumstances && aiConstraints.unique_circumstances.length > 0 ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: star; ratio: 0.9" style="margin-right: 8px;"></span>
                        Özel Durumlar
                    </h4>
                    <ul class="ips-list">
                        ${aiConstraints.unique_circumstances.map(uc => `<li class="ips-list-item">${this.escapeHtml(uc)}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            `;
        }

        // Fallback: Mevcut içerik
        const constraintTypes = [
            { key: 'liquidity', title: 'Likidite Kısıtlamaları', icon: 'bolt' },
            { key: 'timeHorizon', title: 'Zaman Ufku', icon: 'calendar' },
            { key: 'tax', title: 'Vergi Değerlendirmeleri', icon: 'file-text' },
            { key: 'legal', title: 'Yasal ve Düzenleyici', icon: 'lock' },
            { key: 'unique', title: 'Özel Durumlar', icon: 'star' }
        ];

        const fallbackContent = !aiConstraints ? constraintTypes.map(ct => {
            const constraint = c[ct.key];
            if (!constraint) return '';

            return `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: ${ct.icon}; ratio: 0.9" style="margin-right: 8px;"></span>
                        ${ct.title}
                    </h4>
                    <p class="ips-editable" data-field="constraints.${ct.key}">${this.escapeHtml(constraint.description || constraint.text || '')}</p>
                    ${constraint.items ? `
                        <ul class="ips-list uk-margin-small-top">
                            ${constraint.items.map(item => `<li class="ips-list-item">${this.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }).join('') : '';

        const content = aiConstraintsContent || fallbackContent;

        return this.renderSection('ips-constraints', 'Kısıtlamalar', 'lock', content, '5');
    },

    /**
     * Bölüm 6: Varlık Tahsisi
     */
    renderAssetAllocationSection: function (section) {
        if (!section) {
            console.warn('[IPS Renderer] Bölüm 6: section undefined');
            return '';
        }
        const c = section.content;

        // Expert AI strateji içeriği
        const aiStrategy = this.expertContent?.asset_strategy || null;
        const aiEsg = this.expertContent?.esg_policy || null;

        // DEBUG: Gelen veriyi detaylı logla
        console.log('[IPS Renderer] Bölüm 6 - Varlık Tahsisi Verisi:');
        console.log('  strategicAllocation:', JSON.stringify(c?.strategicAllocation, null, 2));
        console.log('  tacticalRanges:', JSON.stringify(c?.tacticalRanges, null, 2));

        // allocation objesi veya ranges dizisi olabilir
        let allocationTable = '';
        const allocation = c?.strategicAllocation?.allocation || c?.strategicAllocation?.ranges;

        console.log('  allocation değeri:', allocation);
        console.log('  allocation tipi:', typeof allocation);
        console.log('  allocation Array mi?:', Array.isArray(allocation));

        if (allocation) {
            // Obje formatı: { 'Para Piyasası': '40-50%', ... }
            if (!Array.isArray(allocation)) {
                allocationTable = Object.entries(allocation).map(([assetClass, range]) => {
                    // "40-50%" formatını parse et
                    const match = range.match(/(\d+)-?(\d+)?%?/);
                    const min = match ? match[1] : '-';
                    const max = match && match[2] ? match[2] : min;
                    const target = match ? Math.round((parseInt(min) + parseInt(max || min)) / 2) : '-';
                    return `
                        <tr>
                            <td><strong>${this.escapeHtml(assetClass)}</strong></td>
                            <td>${min}%</td>
                            <td>${target}%</td>
                            <td>${max}%</td>
                        </tr>
                    `;
                }).join('');
            } else {
                // Dizi formatı: [{ assetClass, min, target, max }, ...]
                allocationTable = allocation.map(range => `
                    <tr>
                        <td><strong>${this.escapeHtml(range.assetClass)}</strong></td>
                        <td>${range.min}%</td>
                        <td>${range.target}%</td>
                        <td>${range.max}%</td>
                    </tr>
                `).join('');
            }
        }

        console.log('  allocationTable HTML:', allocationTable ? allocationTable.substring(0, 200) + '...' : 'BOŞ');

        // Taktik bantlar tablosu
        let tacticalTable = '';
        const tacticalRanges = c?.tacticalRanges?.ranges;
        console.log('  tacticalRanges değeri:', tacticalRanges);

        if (tacticalRanges && typeof tacticalRanges === 'object') {
            tacticalTable = Object.entries(tacticalRanges).map(([asset, range]) => `
                <tr>
                    <td>${this.escapeHtml(asset)}</td>
                    <td>${range.min}%</td>
                    <td><strong>${range.target}%</strong></td>
                    <td>${range.max}%</td>
                </tr>
            `).join('');
        }

        // AI strateji içeriği
        const aiStrategyContent = aiStrategy ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Strateji Özeti</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 1rem; color: var(--ips-primary);">${this.escapeHtml(aiStrategy.strategy_name || 'Varlık Dağılımı Stratejisi')}</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.6;">${this.escapeHtml(aiStrategy.strategy_rationale || '')}</p>
                </div>
            </div>

            ${aiStrategy.allocations ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Varlık Sınıfı Politikaları</h4>
                <div class="ips-grid ips-grid--2" style="gap: 16px;">
                    ${Object.entries(aiStrategy.allocations).map(([key, val]) => `
                        <div class="ips-info-panel">
                            <strong>${this.escapeHtml(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))}</strong>
                            <div style="font-size: 1.2rem; color: var(--ips-primary); margin: 8px 0;">${this.escapeHtml(val.range || '')}</div>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--ips-text-muted);">${this.escapeHtml(val.rationale || '')}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${aiStrategy.rebalancing_policy ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Yeniden Dengeleme Politikası (AI Önerisi)</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiStrategy.rebalancing_policy)}</p>
            </div>
            ` : ''}
        ` : '';

        // AI ESG içeriği
        const aiEsgContent = aiEsg ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">ESG ve Katılım Finans Politikası</h4>
                <div class="ips-info-panel" style="background: ${aiEsg.is_participatory ? '#e8f5e9' : '#fff3e0'}; border-left: 4px solid ${aiEsg.is_participatory ? '#4caf50' : '#ff9800'};">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span uk-icon="icon: ${aiEsg.is_participatory ? 'check' : 'info'}; ratio: 0.9;"></span>
                        <strong>${aiEsg.is_participatory ? 'Katılım Finans Uyumlu' : 'Standart Yatırım'}</strong>
                    </div>
                    <p style="margin: 0 0 12px 0;">${this.escapeHtml(aiEsg.rationale || '')}</p>
                    ${aiEsg.restrictions && aiEsg.restrictions.length > 0 ? `
                        <div style="margin-top: 12px;">
                            <strong>Kısıtlamalar:</strong>
                            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                                ${aiEsg.restrictions.map(r => `<li>${this.escapeHtml(r)}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        ` : '';

        const content = `
            ${aiStrategyContent}
            ${aiEsgContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.strategicAllocation?.title || 'Stratejik Varlık Dağılımı'}</h4>
                ${c.strategicAllocation?.description ? `<p class="uk-margin-bottom">${this.escapeHtml(c.strategicAllocation.description)}</p>` : ''}
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Varlık Sınıfı</th>
                            <th>Minimum</th>
                            <th>Hedef</th>
                            <th>Maksimum</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allocationTable || '<tr><td colspan="4" class="uk-text-center uk-text-muted">Veri bulunamadı</td></tr>'}
                    </tbody>
                </table>
            </div>

            ${tacticalTable ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.tacticalRanges?.title || 'Taktik Bantlar'}</h4>
                <p class="uk-margin-bottom">${this.escapeHtml(c.tacticalRanges?.description || 'Piyasa koşullarına göre izin verilen sapma aralıkları:')}</p>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Varlık Sınıfı</th>
                            <th>Min</th>
                            <th>Hedef</th>
                            <th>Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tacticalTable}
                    </tbody>
                </table>
            </div>
            ` : ''}
            
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.rebalancing?.title || 'Yeniden Dengeleme Politikası'}</h4>
                <div class="ips-info-panel">
                    <p><strong>Yöntem:</strong> ${this.escapeHtml(c.rebalancing?.method || 'Eşik Bazlı')}</p>
                    <p class="uk-margin-small-top"><strong>Tetikleyici:</strong> ${this.escapeHtml(c.rebalancing?.threshold || c.tacticalRanges?.rebalancingTrigger || 'Sapma oranı %5\'i aştığında')}</p>
                    <p class="uk-margin-small-top"><strong>Sıklık:</strong> ${this.escapeHtml(c.rebalancing?.frequency || 'Çeyreklik kontrol')}</p>
                    ${c.rebalancing?.process ? `
                        <div class="uk-margin-top">
                            <strong>Süreç:</strong>
                            <ul class="ips-list uk-margin-small-top">
                                ${c.rebalancing.process.map(step => `<li class="ips-list-item">${this.escapeHtml(step)}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="ips-chart-container uk-margin-top" id="allocationChartContainer">
                <div class="ips-chart-title uk-text-center uk-margin-bottom">Fon Dağılım Önerileri</div>
                <div class="uk-grid-small uk-child-width-1-2@m" uk-grid>
                    <div class="uk-flex uk-flex-center">
                        <canvas id="ipsAllocationChart" width="300" height="300"></canvas>
                    </div>
                    <div class="uk-flex uk-flex-column uk-flex-middle uk-flex-center">
                        <div class="js-fund-index-list" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        `;

        return this.renderSection('ips-allocation', 'Varlık Tahsisi Politikası', 'thumbnails', content, '6');
    },

    /**
     * Bölüm 7: Yatırım Evreni
     */
    renderInvestmentUniverseSection: function (section) {
        if (!section) {
            console.warn('[IPS Renderer] Bölüm 7: section undefined');
            return '';
        }
        const c = section.content;

        // DEBUG: Gelen veriyi logla
        console.log('[IPS Renderer] Bölüm 7 - Yatırım Evreni Verisi:', {
            section: section,
            content: c,
            eligibleProducts: c?.eligibleProducts,
            restrictedProducts: c?.restrictedProducts,
            productCategories: c?.productCategories
        });

        // Uygun ürünler - eligibleProducts veya eligibleInstruments olabilir
        let eligibleHtml = '';
        const eligibleCategories = c?.eligibleProducts?.categories || c?.eligibleInstruments?.list || [];
        const eligibleRiskLevels = c.eligibleProducts?.riskLevels || [];

        if (Array.isArray(eligibleCategories) && eligibleCategories.length > 0) {
            eligibleHtml = eligibleCategories.map(item => `
                <li class="ips-list-item">
                    <span class="ips-badge ips-badge--success" style="margin-right: 8px;">Uygun</span>
                    ${this.escapeHtml(item)}
                </li>
            `).join('');
        }

        // Kısıtlı ürünler - restrictedProducts veya prohibitedInstruments olabilir
        let restrictedHtml = '';
        const restrictedCategories = c.restrictedProducts?.categories || c.prohibitedInstruments?.list || [];
        const restrictionReasons = c.restrictedProducts?.reasons || [];

        if (Array.isArray(restrictedCategories) && restrictedCategories.length > 0) {
            restrictedHtml = restrictedCategories.map(item => `
                <li class="ips-list-item">
                    <span class="ips-badge ips-badge--danger" style="margin-right: 8px;">Kısıtlı</span>
                    ${this.escapeHtml(item)}
                </li>
            `).join('');
        }

        // Fon kategorileri tablosu
        let categoriesTable = '';
        if (c.productCategories?.categories && Array.isArray(c.productCategories.categories)) {
            categoriesTable = c.productCategories.categories.map(cat => `
                <tr>
                    <td><strong>${this.escapeHtml(cat.name)}</strong></td>
                    <td>${this.escapeHtml(cat.riskLevel)}</td>
                    <td>
                        <span class="ips-badge ${cat.suitability?.includes('Yüksek') ? 'ips-badge--success' : cat.suitability?.includes('Düşük') ? 'ips-badge--danger' : 'ips-badge--warning'}">
                            ${this.escapeHtml(cat.suitability)}
                        </span>
                    </td>
                    <td class="uk-text-small">${this.escapeHtml(cat.description)}</td>
                </tr>
            `).join('');
        }

        // Seçim kriterleri
        let criteriaHtml = '';
        if (c.selectionCriteria?.criteria && Array.isArray(c.selectionCriteria.criteria)) {
            criteriaHtml = c.selectionCriteria.criteria.map(crit => `
                <li class="ips-list-item">${this.escapeHtml(crit)}</li>
            `).join('');
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.eligibleProducts?.title || 'Uygun Yatırım Ürünleri'}</h4>
                ${c.eligibleProducts?.description ? `<p class="uk-margin-bottom">${this.escapeHtml(c.eligibleProducts.description)}</p>` : ''}
                ${eligibleRiskLevels.length > 0 ? `<p class="uk-text-small uk-text-muted uk-margin-bottom">Uygun Risk Seviyeleri: ${eligibleRiskLevels.join(', ')}/7</p>` : ''}
                <ul class="ips-list">
                    ${eligibleHtml || '<li class="ips-list-item uk-text-muted">Tüm Kuveyt Türk Portföy katılım fonları</li>'}
                </ul>
            </div>
            
            ${restrictedHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.restrictedProducts?.title || 'Kısıtlı/Uygun Olmayan Ürünler'}</h4>
                ${c.restrictedProducts?.warning ? `<p class="uk-text-warning uk-margin-bottom">${this.escapeHtml(c.restrictedProducts.warning)}</p>` : ''}
                <div class="ips-info-panel ips-info-panel--danger">
                    <ul class="ips-list">
                        ${restrictedHtml}
                    </ul>
                    ${restrictionReasons.length > 0 ? `
                        <p class="uk-margin-top uk-text-small"><strong>Kısıtlama Nedenleri:</strong> ${restrictionReasons.join(', ')}</p>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            ${categoriesTable ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.productCategories?.title || 'Fon Kategorileri'}</h4>
                <div class="uk-overflow-auto">
                    <table class="ips-table">
                        <thead>
                            <tr>
                                <th>Kategori</th>
                                <th>Risk Seviyesi</th>
                                <th>Uygunluk</th>
                                <th>Açıklama</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${categoriesTable}
                        </tbody>
                    </table>
                </div>
            </div>
            ` : ''}
            
            ${criteriaHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.selectionCriteria?.title || 'Fon Seçim Kriterleri'}</h4>
                <ul class="ips-list">
                    ${criteriaHtml}
                </ul>
            </div>
            ` : ''}
        `;

        return this.renderSection('ips-universe', 'Yatırım Evreni', 'grid', content, '7');
    },

    /**
     * Bölüm 8: Risk Yönetimi
     */
    renderRiskManagementSection: function (section) {
        if (!section) {
            console.warn('[IPS Renderer] Bölüm 8: section undefined');
            return '';
        }
        const c = section.content;

        // DEBUG: Gelen veriyi logla
        console.log('[IPS Renderer] Bölüm 8 - Risk Yönetimi Verisi:', {
            section: section,
            content: c,
            riskMeasures: c?.riskMeasures,
            riskLimits: c?.riskLimits
        });

        // Risk ölçütleri - riskMeasures.metrics dizisi veya varsayılan değerler
        const defaultMetrics = [
            { name: 'Volatilite (Standart Sapma)', target: '< %15', description: 'Yıllık portföy volatilitesi hedefi' },
            { name: 'Sharpe Oranı', target: '> 0.5', description: 'Risk-getiri oranı minimum değeri' },
            { name: 'Maksimum Düşüş', target: '< %10', description: 'İzin verilen maksimum değer kaybı' },
            { name: 'Tracking Error', target: '< %5', description: 'Benchmark sapma toleransı' },
            { name: 'Beta', target: '0.8 - 1.2', description: 'Piyasa hassasiyeti aralığı' }
        ];

        const metricsToRender = (c?.riskMeasures?.metrics && Array.isArray(c.riskMeasures.metrics) && c.riskMeasures.metrics.length > 0)
            ? c.riskMeasures.metrics
            : defaultMetrics;

        const metricsHtml = metricsToRender.map(metric => `
            <tr>
                <td><strong>${this.escapeHtml(metric.name)}</strong></td>
                <td><span class="ips-badge ips-badge--primary">${this.escapeHtml(metric.target || '-')}</span></td>
                <td class="uk-text-small">${this.escapeHtml(metric.description || '')}</td>
            </tr>
        `).join('');

        // Risk limitleri - riskLimits veya limits objesi veya varsayılan değerler
        const defaultLimits = [
            { type: 'Tek Fon Konsantrasyonu', limit: 'Maks. %30', rationale: 'Çeşitlendirme için tek fona aşırı yoğunlaşma önlenir' },
            { type: 'Sektör Konsantrasyonu', limit: 'Maks. %40', rationale: 'Sektörel risk çeşitlendirmesi sağlanır' },
            { type: 'Likidite Riski', limit: 'Min. %20 likit', rationale: 'Acil nakit ihtiyaçları için yeterli likidite' },
            { type: 'Kur Riski', limit: 'Maks. %25 döviz', rationale: 'Döviz dalgalanmalarına karşı koruma' },
            { type: 'Vade Riski', limit: 'Ortalama vade < 3 yıl', rationale: 'Faiz oranı hassasiyetini sınırlar' }
        ];

        let limitsHtml = '';
        const limits = c.riskLimits?.limits || c.limits;
        let limitsToRender = [];

        if (limits) {
            if (Array.isArray(limits) && limits.length > 0) {
                limitsToRender = limits;
            } else if (typeof limits === 'object' && Object.keys(limits).length > 0) {
                limitsToRender = Object.entries(limits).map(([key, limit]) => ({
                    type: limit.label || limit.type || key,
                    limit: limit.value || limit.limit || '-',
                    rationale: limit.description || limit.rationale || ''
                }));
            }
        }

        if (limitsToRender.length === 0) {
            limitsToRender = defaultLimits;
        }

        limitsHtml = limitsToRender.map(limit => `
            <tr>
                <td><strong>${this.escapeHtml(limit.type || limit.label || '-')}</strong></td>
                <td><span class="ips-badge ips-badge--secondary">${this.escapeHtml(limit.limit || limit.value || '-')}</span></td>
                <td class="uk-text-small">${this.escapeHtml(limit.rationale || limit.description || '')}</td>
            </tr>
        `).join('');

        // Monitoring/izleme bilgileri
        let monitoringHtml = '';
        if (c.monitoring?.activities && Array.isArray(c.monitoring.activities)) {
            monitoringHtml = c.monitoring.activities.map(act => `
                <li class="ips-list-item">${this.escapeHtml(act)}</li>
            `).join('');
        }

        // Stress test bilgileri
        let stressTestHtml = '';
        if (c.stressTesting?.scenarios && Array.isArray(c.stressTesting.scenarios)) {
            stressTestHtml = c.stressTesting.scenarios.map(scenario => `
                <tr>
                    <td>${this.escapeHtml(scenario.name)}</td>
                    <td>${this.escapeHtml(scenario.impact || '-')}</td>
                    <td class="uk-text-small">${this.escapeHtml(scenario.action || '')}</td>
                </tr>
            `).join('');
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.riskMeasures?.title || 'Risk Ölçütleri'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Ölçüt</th>
                            <th>Hedef</th>
                            <th>Açıklama</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${metricsHtml}
                    </tbody>
                </table>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.riskLimits?.title || 'Risk Limitleri'}</h4>
                ${c.riskLimits?.description ? `<p class="uk-margin-bottom">${this.escapeHtml(c.riskLimits.description)}</p>` : ''}
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Limit Türü</th>
                            <th>Değer</th>
                            <th>Gerekçe</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${limitsHtml}
                    </tbody>
                </table>
            </div>
            
            ${monitoringHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.monitoring?.title || 'Risk İzleme'}</h4>
                <ul class="ips-list">
                    ${monitoringHtml}
                </ul>
            </div>
            ` : ''}
            
            ${stressTestHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.stressTesting?.title || 'Stres Testi Senaryoları'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Senaryo</th>
                            <th>Beklenen Etki</th>
                            <th>Eylem Planı</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${stressTestHtml}
                    </tbody>
                </table>
            </div>
            ` : ''}
        `;

        return this.renderSection('ips-risk-management', 'Risk Yönetimi', 'warning', content, '8');
    },

    /**
     * Bölüm 9: Katılım Finans
     */
    renderParticipationFinanceSection: function (section) {
        if (!section) return '';
        const c = section.content;

        let principlesHtml = '';
        if (c.principles?.items) {
            principlesHtml = c.principles.items.map(p => `
                <div class="ips-info-panel uk-margin-small-bottom">
                    <strong>${this.escapeHtml(p.title)}</strong>
                    <p class="uk-margin-small-top">${this.escapeHtml(p.description)}</p>
                </div>
            `).join('');
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.principles?.title || 'Temel İlkeler'}</h4>
                ${principlesHtml}
            </div>
            
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.screening?.title || 'Fon Tarama Kriterleri'}</h4>
                <div class="ips-info-panel ips-info-panel--secondary">
                    <ul class="ips-list">
                        ${(c.screening?.criteria || []).map(crit => `
                            <li class="ips-list-item">${this.escapeHtml(crit)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        return this.renderSection('ips-participation', 'Katılım Finans İlkeleri', 'heart', content, '9');
    },

    /**
     * Bölüm 10: Davranışsal Bulgular
     */
    renderBehavioralSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI yatırımcı profili ve risk analizi içeriklerini al
        const aiProfile = this.expertContent?.investor_profile || null;
        const aiRisk = this.expertContent?.risk_analysis || null;

        // AI güçlü yönler ve dikkat noktaları
        let aiStrengthsHtml = '';
        if (aiProfile?.strengths && aiProfile.strengths.length > 0) {
            aiStrengthsHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: check; ratio: 0.9" style="margin-right: 8px; color: #4caf50;"></span>
                        Güçlü Yönler
                    </h4>
                    <div class="ips-ai-content" style="padding: 16px; background: #e8f5e9; border-radius: 8px; border-left: 4px solid #4caf50;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                            <strong style="font-size: 0.85rem; color: #2e7d32;">AI Analizi</strong>
                        </div>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${aiProfile.strengths.map(s => `<li style="margin-bottom: 8px;">${this.escapeHtml(s)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }

        let aiAttentionHtml = '';
        if (aiProfile?.attention_points && aiProfile.attention_points.length > 0) {
            aiAttentionHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: warning; ratio: 0.9" style="margin-right: 8px; color: #ff9800;"></span>
                        Dikkat Edilmesi Gerekenler
                    </h4>
                    <div class="ips-ai-content" style="padding: 16px; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                            <strong style="font-size: 0.85rem; color: #e65100;">AI Analizi</strong>
                        </div>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${aiProfile.attention_points.map(a => `<li style="margin-bottom: 8px;">${this.escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }

        // AI tutarsızlık analizi
        let aiInconsistencyHtml = '';
        if (aiRisk?.inconsistency_found && aiRisk?.inconsistency_explanation) {
            aiInconsistencyHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: warning; ratio: 0.9" style="margin-right: 8px; color: var(--ips-accent);"></span>
                        Davranışsal Tutarsızlık Analizi
                    </h4>
                    <div class="ips-alert ips-alert--warning" style="margin-top: 8px;">
                        <span uk-icon="icon: info; ratio: 1.2;"></span>
                        <div>
                            <strong>Tutarsızlık Tespit Edildi</strong>
                            <p style="margin: 4px 0 0 0;">${this.escapeHtml(aiRisk.inconsistency_explanation)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        let biasesHtml = '';
        if (c.identifiedBiases?.items) {
            biasesHtml = c.identifiedBiases.items.map(bias => `
                <div class="ips-info-panel ips-info-panel--warning uk-margin-small-bottom">
                    <strong>${this.escapeHtml(bias.name)}</strong>
                    <p class="uk-margin-small-top">${this.escapeHtml(bias.description)}</p>
                    <p class="uk-margin-small-top"><strong>Öneri:</strong> ${this.escapeHtml(bias.mitigation || '')}</p>
                </div>
            `).join('');
        }

        let inconsistenciesHtml = '';
        if (c.inconsistencies?.items && c.inconsistencies.items.length > 0) {
            inconsistenciesHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: warning; ratio: 0.9" style="margin-right: 8px; color: var(--ips-accent);"></span>
                        Tespit Edilen Tutarsızlıklar
                    </h4>
                    ${c.inconsistencies.items.map(inc => `
                        <div class="ips-info-panel ips-info-panel--warning uk-margin-small-bottom">
                            <p>${this.escapeHtml(inc.description)}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        const content = `
            ${aiStrengthsHtml}
            ${aiAttentionHtml}
            ${aiInconsistencyHtml}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.identifiedBiases?.title || 'Tespit Edilen Eğilimler'}</h4>
                ${biasesHtml || '<p>Belirgin bir davranışsal eğilim tespit edilmemiştir.</p>'}
            </div>
            ${inconsistenciesHtml}
        `;

        return this.renderSection('ips-behavioral', 'Davranışsal Finans Bulguları', 'user', content, '10');
    },

    /**
     * Bölüm 11: İzleme ve Raporlama
     */
    renderMonitoringSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI izleme içeriği
        const aiMonitoring = this.expertContent?.monitoring || null;

        // KPI tablosu: Önce content'ten, yoksa varsayılan değerler
        let kpiHtml = '';
        const kpiItems = c.kpis?.items || [];

        // Varsayılan KPI'lar - eğer content'te yoksa bunları kullan
        const defaultKPIs = [
            { metric: 'Portföy Getirisi', target: 'Benchmark + %1', frequency: 'Aylık' },
            { metric: 'Volatilite (Standart Sapma)', target: '< %15', frequency: 'Aylık' },
            { metric: 'Sharpe Oranı', target: '> 0.5', frequency: 'Çeyreklik' },
            { metric: 'Maksimum Düşüş (Drawdown)', target: '< %10', frequency: 'Aylık' },
            { metric: 'Katılım Uyumluluğu', target: '%100', frequency: 'Sürekli' },
            { metric: 'Varlık Dağılımı Sapması', target: '< %5', frequency: 'Haftalık' }
        ];

        const kpisToRender = kpiItems.length > 0 ? kpiItems : defaultKPIs;
        kpiHtml = kpisToRender.map(kpi => `
            <tr>
                <td><strong>${this.escapeHtml(kpi.metric)}</strong></td>
                <td>${this.escapeHtml(kpi.target || '-')}</td>
                <td>${this.escapeHtml(kpi.frequency || '-')}</td>
            </tr>
        `).join('');

        // AI içeriği varsa onu kullan
        const aiMonitoringContent = aiMonitoring ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Gözden Geçirme Planı</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Önerisi</strong>
                    </div>
                    <div class="ips-grid ips-grid--2" style="gap: 16px;">
                        <div>
                            <strong>Gözden Geçirme Sıklığı:</strong>
                            <p style="margin: 4px 0 0 0; font-size: 1.1rem; color: var(--ips-primary);">${this.escapeHtml(aiMonitoring.review_frequency || '')}</p>
                        </div>
                        <div>
                            <strong>Yeniden Dengeleme Kriteri:</strong>
                            <p style="margin: 4px 0 0 0;">${this.escapeHtml(aiMonitoring.rebalancing_criteria || '')}</p>
                        </div>
                    </div>
                </div>
            </div>

            ${aiMonitoring.review_triggers && aiMonitoring.review_triggers.length > 0 ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Gözden Geçirme Tetikleyicileri</h4>
                <ul class="ips-list">
                    ${aiMonitoring.review_triggers.map(t => `<li class="ips-list-item">${this.escapeHtml(t)}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${aiMonitoring.performance_benchmarks && aiMonitoring.performance_benchmarks.length > 0 ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Performans Karşılaştırma Ölçütleri</h4>
                <ul class="ips-list">
                    ${aiMonitoring.performance_benchmarks.map(b => `<li class="ips-list-item">${this.escapeHtml(b)}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${aiMonitoring.communication_plan ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">İletişim Planı</h4>
                <p>${this.escapeHtml(aiMonitoring.communication_plan)}</p>
            </div>
            ` : ''}
        ` : '';

        const content = `
            ${aiMonitoringContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.reportingSchedule?.title || 'Raporlama Takvimi'}</h4>
                <div class="ips-grid ips-grid--3">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Performans Raporu</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.reportingSchedule?.performance || 'Aylık')}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Kapsamlı Değerlendirme</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.reportingSchedule?.comprehensive || 'Çeyreklik')}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">IPS Gözden Geçirme</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.reportingSchedule?.ipsReview || 'Yıllık')}</div>
                    </div>
                </div>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.kpis?.title || 'Temel Performans Göstergeleri'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Gösterge</th>
                            <th>Hedef</th>
                            <th>İzleme Sıklığı</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${kpiHtml}
                    </tbody>
                </table>
            </div>
        `;

        return this.renderSection('ips-monitoring', 'İzleme ve Raporlama', 'clipboard', content, '11');
    },

    /**
     * Bölüm 12: Onay
     */
    renderApprovalSection: function (section) {
        if (!section) return '';
        const c = section.content;

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.declaration?.title || 'Beyan'}</h4>
                <div class="ips-info-panel">
                    <p>${this.escapeHtml(c.declaration?.text || 'Bu Yatırım Politikası Beyanı\'nı okudum, anladım ve kabul ediyorum.')}</p>
                </div>
            </div>
            
            <div class="ips-signature-area">
                <div class="ips-signature-box">
                    <div class="ips-signature-line"></div>
                    <div class="ips-signature-label">Yatırımcı İmzası</div>
                    <div class="ips-editable ips-input uk-margin-small-top" 
                         data-field="approval.investorName" 
                         style="text-align: center;">
                        İsim Soyisim
                    </div>
                    <div style="margin-top: 8px; color: var(--ips-text-muted);">
                        Tarih: ${this.formatDate(new Date())}
                    </div>
                </div>
                
                <div class="ips-signature-box">
                    <div class="ips-signature-line"></div>
                    <div class="ips-signature-label">Kuveyt Türk Portföy Yetkilisi</div>
                    <div style="margin-top: 12px; color: var(--ips-text-muted);">
                        Kuveyt Türk Portföy Yönetimi A.Ş.
                    </div>
                </div>
            </div>
            
            <div class="uk-margin-large-top uk-text-center no-print">
                <p style="font-size: 0.85rem; color: var(--ips-text-muted);">
                    Bu belge elektronik ortamda oluşturulmuştur.
                    <br>Belge Referans No: IPS-${Date.now().toString(36).toUpperCase()}
                </p>
            </div>
        `;

        return this.renderSection('ips-approval', 'Gözden Geçirme ve Onay', 'check', content, '12');
    },

    // ========== UTILITY FUNCTIONS ==========

    /**
     * HTML escape
     */
    escapeHtml: function (text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Tarih formatlama
     */
    formatDate: function (dateStr) {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Skor badge sınıfı
     */
    getScoreBadgeClass: function (score) {
        if (!score) return 'secondary';
        const numScore = parseInt(score);
        if (numScore >= 70) return 'success';
        if (numScore >= 40) return 'warning';
        return 'danger';
    },

    // ========== INTERACTIVITY ==========

    /**
     * Chart'ları render et - Gerçek fon verilerini kullanır
     */
    renderCharts: function () {
        // Varlık dağılımı chart'ı
        const allocationCanvas = document.getElementById('ipsAllocationChart');
        const container = document.getElementById('allocationChartContainer');

        if (!allocationCanvas || typeof Chart === 'undefined') {
            console.warn('[IPS Renderer] Chart canvas veya Chart.js bulunamadı');
            return;
        }

        // Gerçek fon dağılım verilerini localStorage'dan al
        const riskProfiliSonuc = JSON.parse(localStorage.getItem('riskProfiliSonuc') || '{}');
        const fonDagilimData = riskProfiliSonuc?.data?.fonDagilimData || [];
        const expertContent = riskProfiliSonuc?.expert_content || null;
        const allocationRationale = expertContent?.allocation_rationale || null;

        console.log('[IPS Renderer] Fon dağılım verisi:', fonDagilimData);

        // Varsayılan fallback verileri
        let labels = ['Para Piyasası', 'Kira Sertifikası', 'Dengeli Fonlar', 'Altın', 'Hisse'];
        let data = [40, 30, 15, 10, 5];
        const colors = ['#186149', '#42B38E', '#7CFFD4', '#EE5C2E', '#F9CA4F', '#FFA84A'];

        // Gerçek veriler varsa kullan
        if (fonDagilimData && fonDagilimData.length > 0) {
            labels = fonDagilimData.map(item => item.name);
            data = fonDagilimData.map(item => item.value);
        }

        const ctx = allocationCanvas.getContext('2d');

        // Mevcut chart'ı temizle
        if (window.ipsAllocationChartInstance && typeof window.ipsAllocationChartInstance.destroy === 'function') {
            window.ipsAllocationChartInstance.destroy();
        }

        // Chart oluştur
        window.ipsAllocationChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: data.map((_, i) => colors[i % colors.length]),
                    borderWidth: 2,
                    borderColor: '#fff',
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            font: { size: 12 },
                            generateLabels: function (chart) {
                                const data = chart.data;
                                return data.labels.map((label, i) => ({
                                    text: `${label}: %${data.datasets[0].data[i].toFixed(1)}`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    strokeStyle: '#fff',
                                    lineWidth: 2,
                                    hidden: false,
                                    index: i
                                }));
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.label + ': %' + context.parsed.toFixed(2);
                            }
                        }
                    }
                }
            }
        });

        // Fon tablosu ve AI analizi ekle
        this.renderFundTableAndRationale(container, fonDagilimData, allocationRationale, colors);
    },

    /**
     * Fon tablosu ve AI gerekçe açıklamasını render et
     */
    renderFundTableAndRationale: function (container, fonDagilimData, allocationRationale, colors) {
        if (!container) return;

        // AI Gerekçe HTML
        let rationaleHtml = '';
        if (allocationRationale) {
            rationaleHtml = `
                <div class="ips-allocation-rationale uk-margin-top" style="padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border-left: 4px solid var(--ips-primary, #186149);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 1.1;" style="color: var(--ips-primary, #186149);"></span>
                        <strong style="font-size: 1.1rem; color: var(--ips-primary, #186149);">Neden Bu Dağılım?</strong>
                    </div>
                    
                    <p style="margin: 0 0 16px 0; line-height: 1.7; font-size: 1rem;">${this.escapeHtml(allocationRationale.algorithm_summary || '')}</p>
                    
                    <div style="margin-top: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
                        <strong style="font-size: 0.9rem; color: #186149;">📊 Risk Skoru Etkisi</strong>
                        <p style="margin: 8px 0 0 0; line-height: 1.6; font-size: 0.95rem;">${this.escapeHtml(allocationRationale.risk_score_impact || '')}</p>
                    </div>
                    
                    <div style="margin-top: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
                        <strong style="font-size: 0.9rem; color: #186149;">🤖 AI Analizi</strong>
                        <p style="margin: 8px 0 0 0; line-height: 1.6; font-size: 0.95rem;">${this.escapeHtml(allocationRationale.ai_analysis || '')}</p>
                    </div>
                    
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

        // Fon detay tablosu HTML
        let fundTableHtml = '';
        if (fonDagilimData && fonDagilimData.length > 0) {
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

        // Ekstra içerikleri container'a ekle
        if (rationaleHtml || fundTableHtml) {
            container.insertAdjacentHTML('beforeend', rationaleHtml + fundTableHtml);
        }
    },

    /**
     * Event listener'ları bağla
     */
    attachEventListeners: function () {
        // Editable alanlar için
        document.querySelectorAll('.ips-editable').forEach(el => {
            el.addEventListener('click', () => {
                if (this.editMode) {
                    el.setAttribute('contenteditable', 'true');
                    el.focus();
                }
            });

            el.addEventListener('blur', () => {
                el.setAttribute('contenteditable', 'false');
                const field = el.dataset.field;
                if (field) {
                    this.changedFields[field] = el.textContent;
                }
            });
        });

        // Smooth scroll for TOC links
        document.querySelectorAll('.ips-toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },

    /**
     * Düzenleme modunu aç/kapat
     */
    toggleEditMode: function () {
        this.editMode = !this.editMode;
        const report = document.getElementById('ipsFullReport');
        const editBtn = document.getElementById('editModeBtn');
        const saveBtn = document.getElementById('saveBtn');

        if (this.editMode) {
            report.classList.add('ips-edit-mode');
            editBtn.querySelector('.edit-btn-text').textContent = 'Düzenlemeyi Bitir';
            saveBtn.style.display = 'inline-flex';
        } else {
            report.classList.remove('ips-edit-mode');
            editBtn.querySelector('.edit-btn-text').textContent = 'Düzenle';
            saveBtn.style.display = 'none';

            // Tüm contenteditable'ları kapat
            document.querySelectorAll('[contenteditable="true"]').forEach(el => {
                el.setAttribute('contenteditable', 'false');
            });
        }
    },

    /**
     * Değişiklikleri kaydet
     */
    saveChanges: function () {
        if (Object.keys(this.changedFields).length === 0) {
            alert('Kaydedilecek değişiklik bulunamadı.');
            return;
        }

        // LocalStorage'a kaydet
        try {
            const existingChanges = JSON.parse(localStorage.getItem('ipsCustomizations') || '{}');
            const merged = { ...existingChanges, ...this.changedFields };
            localStorage.setItem('ipsCustomizations', JSON.stringify(merged));

            this.changedFields = {};
            this.toggleEditMode();

            // Başarı bildirimi
            if (typeof UIkit !== 'undefined') {
                UIkit.notification({
                    message: 'Değişiklikler kaydedildi',
                    status: 'success',
                    pos: 'top-right',
                    timeout: 3000
                });
            } else {
                alert('Değişiklikler kaydedildi.');
            }
        } catch (e) {
            console.error('Kaydetme hatası:', e);
            alert('Değişiklikler kaydedilemedi.');
        }
    },

    /**
     * Bölüm daralt/genişlet
     */
    collapseSection: function (sectionId) {
        const body = document.getElementById(`${sectionId}-body`);
        const btn = document.querySelector(`#${sectionId} .ips-section-actions button`);

        if (body.style.display === 'none') {
            body.style.display = 'block';
            btn.innerHTML = '<span uk-icon="icon: chevron-up; ratio: 0.8"></span>';
        } else {
            body.style.display = 'none';
            btn.innerHTML = '<span uk-icon="icon: chevron-down; ratio: 0.8"></span>';
        }
    },

    /**
     * PDF export
     */
    exportPDF: function () {
        // Print dialog açılır, kullanıcı PDF olarak kaydedebilir
        window.print();
    }
};

// Global erişim için
window.IPSReportRenderer = IPSReportRenderer;
