/**
 * IPS İçerik Üretici - Profesyonel Yatırım Politikası Beyanı
 * 
 * CFA Institute standartları, SPK düzenlemeleri ve Katılım Finans ilkelerine uygun
 * Kapsamlı IPS içerik üretimi
 * 
 * Kuveyt Türk Portföy - Investment Policy Statement (IPS) Modülü v2.0
 */

const IPSContentGenerator = {
    
    /**
     * Tam IPS dokümanı oluştur
     */
    generateFullIPS: function(surveyAnswers, riskResult, portfolioData) {
        const profileName = riskResult.profile || riskResult.profileName || 'medium';
        const profileSummary = this.getEnhancedProfileSummary(profileName);
        
        // DEBUG: Profil özeti verilerini logla
        console.log('[IPS Generator] Profil adı:', profileName);
        console.log('[IPS Generator] Profil özeti:', {
            name: profileSummary.name,
            assetAllocation: profileSummary.assetAllocation,
            tacticalRanges: profileSummary.tacticalRanges,
            eligibleCategories: profileSummary.eligibleCategories,
            restrictedCategories: profileSummary.restrictedCategories
        });
        const inconsistencies = this.detectInconsistencies(surveyAnswers, riskResult);
        const behavioralFindings = this.analyzeBehavioralPatterns(surveyAnswers);
        
        return {
            // Bölüm 1: Kapsam ve Amaç
            scopeAndPurpose: this.generateScopeSection(surveyAnswers, riskResult),
            
            // Bölüm 2: Yönetişim
            governance: this.generateGovernanceSection(),
            
            // Bölüm 3: Yatırım Hedefleri
            investmentObjectives: this.generateObjectivesSection(profileSummary, surveyAnswers),
            
            // Bölüm 4: Risk Profili Analizi
            riskAnalysis: this.generateRiskAnalysisSection(riskResult, surveyAnswers, inconsistencies),
            
            // Bölüm 5: Kısıtlamalar
            constraints: this.generateConstraintsSection(surveyAnswers, profileSummary),
            
            // Bölüm 6: Varlık Tahsisi Politikası
            assetAllocation: this.generateAssetAllocationSection(profileSummary, portfolioData),
            
            // Bölüm 7: Yatırım Evreni ve Ürün Uygunluğu
            investmentUniverse: this.generateInvestmentUniverseSection(profileSummary),
            
            // Bölüm 8: Risk Yönetimi
            riskManagement: this.generateRiskManagementSection(profileSummary),
            
            // Bölüm 9: Katılım Finans İlkeleri
            participationFinance: this.generateParticipationFinanceSection(),
            
            // Bölüm 10: Davranışsal Finans Bulguları
            behavioralFindings: this.generateBehavioralSection(behavioralFindings, inconsistencies),
            
            // Bölüm 11: İzleme ve Raporlama
            monitoringAndReporting: this.generateMonitoringSection(),
            
            // Bölüm 12: Gözden Geçirme ve Onay
            reviewAndApproval: this.generateApprovalSection(),
            
            // Meta bilgiler
            metadata: {
                generatedDate: new Date().toISOString(),
                nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                version: '2.0',
                profileName: profileName,
                riskScore: riskResult.score,
                hasInconsistencies: inconsistencies.length > 0,
                inconsistencyCount: inconsistencies.length
            }
        };
    },

    /**
     * Bölüm 1: Kapsam ve Amaç
     */
    generateScopeSection: function(surveyAnswers, riskResult) {
        const investorType = surveyAnswers.investorType === 'a' ? 'Bireysel Yatırımcı' : 'Kurumsal Yatırımcı';
        const personType = surveyAnswers.personType === 'a' ? 'Gerçek Kişi' : 'Tüzel Kişi';
        
        return {
            title: '1. KAPSAM VE AMAÇ',
            icon: 'clipboard',
            content: {
                purpose: {
                    title: '1.1 Beyanın Amacı',
                    text: `Bu Yatırım Politikası Beyanı (IPS), yatırımcının finansal hedeflerini, risk toleransını, yatırım kısıtlamalarını ve portföy yönetimi ilkelerini belirleyen stratejik bir rehber niteliğindedir. Bu beyan, yatırım kararlarının tutarlı, disiplinli ve yatırımcının uzun vadeli çıkarlarına uygun şekilde alınmasını sağlamak amacıyla hazırlanmıştır.`,
                    importance: [
                        'Piyasa dalgalanmalarında duygusal kararları önler',
                        'Yatırım stratejisi için nesnel bir referans noktası sağlar',
                        'Danışman-yatırımcı ilişkisinde şeffaflık oluşturur',
                        'Performans değerlendirmesi için ölçüt belirler'
                    ]
                },
                investor: {
                    title: '1.2 Yatırımcı Tanımı',
                    type: investorType,
                    personType: personType,
                    assessmentDate: new Date().toLocaleDateString('tr-TR', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }),
                    description: `Bu IPS, yukarıda tanımlanan ${investorType} için hazırlanmış olup, yatırımcının Kuveyt Türk Portföy nezdindeki tüm yatırım hesaplarını kapsar.`
                },
                scope: {
                    title: '1.3 Kapsam',
                    text: 'Bu beyan aşağıdaki varlık ve hesapları kapsar:',
                    items: [
                        'Kuveyt Türk Portföy yatırım fonu hesapları',
                        'Katılım esaslı yatırım araçları',
                        'Bireysel emeklilik fon tercihleri (varsa)',
                        'Diğer katılım bankacılığı yatırım ürünleri'
                    ]
                },
                legalBasis: {
                    title: '1.4 Yasal Dayanak',
                    regulations: [
                        'Sermaye Piyasası Kurulu (SPK) Yatırım Fonları Tebliği',
                        'SPK Yatırım Kuruluşlarının Kuruluş ve Faaliyet Esasları Hakkında Tebliği',
                        'Katılım Finans Standartları (AAOIFI)',
                        'Kuveyt Türk Portföy İç Yönergeleri'
                    ]
                }
            }
        };
    },

    /**
     * Bölüm 2: Yönetişim
     */
    generateGovernanceSection: function() {
        return {
            title: '2. YÖNETİŞİM',
            icon: 'users',
            content: {
                responsibilities: {
                    title: '2.1 Sorumluluklar',
                    parties: [
                        {
                            role: 'Yatırımcı',
                            duties: [
                                'Risk profilini doğru ve güncel tutmak',
                                'Mali durumundaki değişiklikleri bildirmek',
                                'IPS\'i onaylamak ve revizyonları incelemek',
                                'Yatırım kararlarının nihai sorumluluğunu taşımak'
                            ]
                        },
                        {
                            role: 'Kuveyt Türk Portföy',
                            duties: [
                                'IPS\'e uygun fon önerileri sunmak',
                                'Risk profiline uygun portföy optimizasyonu yapmak',
                                'Düzenli performans raporlaması sağlamak',
                                'Katılım finans ilkelerine uygunluğu denetlemek',
                                'Piyasa koşullarındaki önemli değişiklikleri bildirmek'
                            ]
                        },
                        {
                            role: 'Danışma Kurulu',
                            duties: [
                                'Yatırım ürünlerinin katılım ilkelerine uygunluğunu onaylamak',
                                'Şeriat uyumluluk denetimi yapmak',
                                'Etik yatırım politikalarını belirlemek'
                            ]
                        }
                    ]
                },
                reviewProcess: {
                    title: '2.2 Gözden Geçirme Süreci',
                    schedule: {
                        regular: 'Bu IPS yılda en az bir kez gözden geçirilir',
                        triggered: 'Aşağıdaki durumlarda ara değerlendirme yapılır:'
                    },
                    triggers: [
                        'Yatırımcının mali durumunda önemli değişiklik',
                        'Yatırım hedeflerinde değişiklik',
                        'Piyasa koşullarında dramatik değişim',
                        'Düzenleyici gereksinimlerde değişiklik',
                        'Portföy performansında hedeflerden sapma'
                    ]
                },
                amendments: {
                    title: '2.3 Değişiklik Prosedürü',
                    text: 'IPS değişiklikleri için:',
                    process: [
                        'Değişiklik talebi yazılı olarak iletilir',
                        'Risk profili yeniden değerlendirilir',
                        'Yeni IPS taslağı hazırlanır',
                        'Yatırımcı onayı alınır',
                        'Güncellenmiş IPS yürürlüğe girer'
                    ]
                }
            }
        };
    },

    /**
     * Bölüm 3: Yatırım Hedefleri
     */
    generateObjectivesSection: function(profileSummary, surveyAnswers) {
        const timeHorizonText = this.getTimeHorizonFromAnswers(surveyAnswers);
        
        return {
            title: '3. YATIRIM HEDEFLERİ',
            icon: 'crosshairs',
            content: {
                primaryObjective: {
                    title: '3.1 Birincil Hedef',
                    text: this.getPrimaryObjective(profileSummary.name),
                    details: profileSummary.investmentPhilosophy
                },
                returnObjective: {
                    title: '3.2 Getiri Hedefi',
                    target: profileSummary.targetReturn,
                    benchmark: profileSummary.benchmark,
                    realReturn: profileSummary.realReturnTarget,
                    note: 'Belirtilen hedef getiriler, uzun vadeli ortalama beklentileri yansıtmaktadır. Kısa vadeli performans önemli ölçüde farklılık gösterebilir.'
                },
                riskObjective: {
                    title: '3.3 Risk Hedefi',
                    maxVolatility: profileSummary.maxVolatility,
                    maxDrawdown: profileSummary.maxDrawdown,
                    riskLevel: profileSummary.riskLevel,
                    description: profileSummary.riskDescription
                },
                timeHorizon: {
                    title: '3.4 Yatırım Vadesi',
                    horizon: profileSummary.timeHorizon,
                    details: timeHorizonText,
                    implications: this.getTimeHorizonImplications(profileSummary.name)
                },
                incomeRequirements: {
                    title: '3.5 Gelir İhtiyacı',
                    type: this.getIncomeType(surveyAnswers),
                    frequency: this.getIncomeFrequency(surveyAnswers),
                    priority: this.getIncomePriority(profileSummary.name)
                }
            }
        };
    },

    /**
     * Bölüm 4: Risk Profili Analizi
     */
    generateRiskAnalysisSection: function(riskResult, surveyAnswers, inconsistencies) {
        return {
            title: '4. RİSK PROFİLİ ANALİZİ',
            icon: 'graph',
            content: {
                overallProfile: {
                    title: '4.1 Genel Risk Profili',
                    profile: riskResult.profile || 'medium',
                    score: riskResult.score,
                    normalizedScore: riskResult.normalizedScore || (riskResult.score / 100 * 100),
                    level: riskResult.level,
                    classification: this.getRiskClassification(riskResult)
                },
                riskCapacity: {
                    title: '4.2 Risk Kapasitesi (Nesnel)',
                    score: riskResult.capacityScore || this.calculateCapacityScore(surveyAnswers),
                    factors: [
                        {
                            factor: 'Yaş / Yatırım Vadesi',
                            assessment: this.assessAgeFactor(surveyAnswers),
                            impact: this.getAgeImpact(surveyAnswers)
                        },
                        {
                            factor: 'Gelir Düzeyi ve İstikrarı',
                            assessment: this.assessIncomeFactor(surveyAnswers),
                            impact: this.getIncomeImpact(surveyAnswers)
                        },
                        {
                            factor: 'Toplam Finansal Varlık',
                            assessment: this.assessWealthFactor(surveyAnswers),
                            impact: this.getWealthImpact(surveyAnswers)
                        },
                        {
                            factor: 'Acil Durum Fonu',
                            assessment: this.assessEmergencyFund(surveyAnswers),
                            impact: this.getEmergencyImpact(surveyAnswers)
                        },
                        {
                            factor: 'Likidite İhtiyacı',
                            assessment: this.assessLiquidityNeeds(surveyAnswers),
                            impact: this.getLiquidityImpact(surveyAnswers)
                        }
                    ],
                    summary: this.getCapacitySummary(surveyAnswers)
                },
                riskWillingness: {
                    title: '4.3 Risk İstekliliği (Öznel)',
                    score: this.calculateWillingnessScore(surveyAnswers),
                    factors: [
                        {
                            factor: 'Kayıp Karşısında Tepki',
                            response: surveyAnswers.q6_text || this.getAnswerText(surveyAnswers.q6),
                            interpretation: this.interpretLossReaction(surveyAnswers)
                        },
                        {
                            factor: 'Genel Risk-Getiri Tercihi',
                            response: surveyAnswers.q7_text || this.getAnswerText(surveyAnswers.q7),
                            interpretation: this.interpretRiskPreference(surveyAnswers)
                        },
                        {
                            factor: 'Volatilite Toleransı',
                            response: surveyAnswers.q11_text || this.getAnswerText(surveyAnswers.q11),
                            interpretation: this.interpretVolatilityTolerance(surveyAnswers)
                        },
                        {
                            factor: 'Fırsat Değerlendirme',
                            response: surveyAnswers.q12_text || this.getAnswerText(surveyAnswers.q12),
                            interpretation: this.interpretOpportunityBehavior(surveyAnswers)
                        }
                    ],
                    summary: this.getWillingnessSummary(surveyAnswers)
                },
                capacityVsWillingness: {
                    title: '4.4 Kapasite vs İsteklilik Analizi',
                    comparison: this.compareCapacityAndWillingness(surveyAnswers, riskResult),
                    alignment: this.assessAlignment(surveyAnswers, riskResult),
                    recommendation: this.getAlignmentRecommendation(surveyAnswers, riskResult)
                },
                inconsistencyAnalysis: {
                    title: '4.5 Tutarsızlık Analizi',
                    hasInconsistencies: inconsistencies.length > 0,
                    count: inconsistencies.length,
                    findings: inconsistencies,
                    implications: this.getInconsistencyImplications(inconsistencies),
                    resolution: this.getInconsistencyResolution(inconsistencies)
                }
            }
        };
    },

    /**
     * Bölüm 5: Kısıtlamalar
     */
    generateConstraintsSection: function(surveyAnswers, profileSummary) {
        return {
            title: '5. KISITLAMALAR',
            icon: 'lock',
            content: {
                liquidity: {
                    title: '5.1 Likidite Kısıtları',
                    requirement: this.getLiquidityRequirement(surveyAnswers),
                    minimumLiquid: profileSummary.minimumLiquidity,
                    emergencyReserve: this.getEmergencyReserveRecommendation(surveyAnswers),
                    redemptionExpectation: this.getRedemptionExpectation(surveyAnswers)
                },
                timeHorizon: {
                    title: '5.2 Vade Kısıtları',
                    minimum: profileSummary.minimumHorizon,
                    recommended: profileSummary.timeHorizon,
                    implications: this.getHorizonImplications(profileSummary)
                },
                legal: {
                    title: '5.3 Yasal ve Düzenleyici Kısıtlar',
                    spkRegulations: [
                        'SPK uygunluk testi gereksinimleri',
                        'Yatırımcı bilgilendirme yükümlülükleri',
                        'Risk uyarısı zorunlulukları'
                    ],
                    taxConsiderations: [
                        'Stopaj oranları ve vergi avantajları',
                        'BES vergi teşvikleri (varsa)',
                        'Yatırım fonu vergi muafiyetleri'
                    ]
                },
                ethical: {
                    title: '5.4 Etik ve Dini Kısıtlar',
                    isParticipation: surveyAnswers.q15 === 'a' || true, // Kuveyt Türk varsayılan
                    participationCompliance: true,
                    restrictions: this.getEthicalRestrictions(),
                    preferences: this.getEthicalPreferences(surveyAnswers)
                },
                concentration: {
                    title: '5.5 Yoğunlaşma Kısıtları',
                    singleFundMax: profileSummary.maxSingleFund,
                    singleAssetClassMax: profileSummary.maxAssetClass,
                    diversificationRule: 'Hiçbir tek fon, toplam portföyün %' + (profileSummary.maxSingleFund * 100) + '\'ünü aşamaz.'
                }
            }
        };
    },

    /**
     * Bölüm 6: Varlık Tahsisi Politikası
     */
    generateAssetAllocationSection: function(profileSummary, portfolioData) {
        return {
            title: '6. VARLIK TAHSİSİ POLİTİKASI',
            icon: 'thumbnails',
            content: {
                strategicAllocation: {
                    title: '6.1 Stratejik Varlık Dağılımı',
                    description: 'Risk profilinize uygun önerilen uzun vadeli varlık dağılımı:',
                    allocation: profileSummary.assetAllocation,
                    rationale: profileSummary.allocationRationale
                },
                tacticalRanges: {
                    title: '6.2 Taktik Bantlar',
                    description: 'Piyasa koşullarına göre izin verilen sapma aralıkları:',
                    ranges: profileSummary.tacticalRanges,
                    rebalancingTrigger: profileSummary.rebalancingTrigger
                },
                rebalancing: {
                    title: '6.3 Yeniden Dengeleme Politikası',
                    method: profileSummary.rebalancingMethod,
                    frequency: profileSummary.rebalancingFrequency,
                    threshold: profileSummary.rebalancingThreshold,
                    process: [
                        'Aylık portföy değerlendirmesi yapılır',
                        'Hedef dağılımdan sapma kontrol edilir',
                        'Eşik aşıldığında yeniden dengeleme önerilir',
                        'Vergi ve maliyet etkileri değerlendirilir',
                        'Yatırımcı onayı ile işlem gerçekleştirilir'
                    ]
                },
                currentAllocation: portfolioData ? {
                    title: '6.4 Mevcut Portföy Dağılımı',
                    funds: portfolioData.funds || [],
                    method: portfolioData.method || 'Manual',
                    metrics: portfolioData.metrics || {}
                } : null
            }
        };
    },

    /**
     * Bölüm 7: Yatırım Evreni
     */
    generateInvestmentUniverseSection: function(profileSummary) {
        return {
            title: '7. YATIRIM EVRENİ VE ÜRÜN UYGUNLUĞU',
            icon: 'grid',
            content: {
                eligibleProducts: {
                    title: '7.1 Uygun Yatırım Ürünleri',
                    categories: profileSummary.eligibleCategories,
                    riskLevels: profileSummary.eligibleRiskLevels,
                    description: 'Risk profilinize uygun Kuveyt Türk Portföy fonları:'
                },
                restrictedProducts: {
                    title: '7.2 Kısıtlı/Uygun Olmayan Ürünler',
                    categories: profileSummary.restrictedCategories,
                    reasons: profileSummary.restrictionReasons,
                    warning: 'Aşağıdaki ürün kategorileri risk profilinize uygun değildir ve önerilmemektedir:'
                },
                productCategories: {
                    title: '7.3 Fon Kategorileri',
                    categories: [
                        {
                            name: 'Para Piyasası Fonları',
                            riskLevel: '1/7',
                            suitability: profileSummary.name === 'low' ? 'Yüksek Uygunluk' : 'Orta Uygunluk',
                            description: 'Kısa vadeli, düşük volatiliteli, yüksek likidite'
                        },
                        {
                            name: 'Kira Sertifikası Fonları',
                            riskLevel: '2/7',
                            suitability: profileSummary.name !== 'high' ? 'Yüksek Uygunluk' : 'Orta Uygunluk',
                            description: 'Sabit getirili, katılım esaslı, orta vade'
                        },
                        {
                            name: 'Dengeli/Karma Fonlar',
                            riskLevel: '3-4/7',
                            suitability: profileSummary.name === 'medium' ? 'Yüksek Uygunluk' : 'Orta Uygunluk',
                            description: 'Çeşitlendirilmiş, risk-getiri dengesi'
                        },
                        {
                            name: 'Altın/Kıymetli Maden Fonları',
                            riskLevel: '5/7',
                            suitability: 'Tüm Profiller - Çeşitlendirme',
                            description: 'Enflasyon koruması, portföy sigortası'
                        },
                        {
                            name: 'Hisse Senedi Fonları',
                            riskLevel: '5-6/7',
                            suitability: profileSummary.name === 'high' ? 'Yüksek Uygunluk' : profileSummary.name === 'medium' ? 'Sınırlı' : 'Düşük Uygunluk',
                            description: 'Yüksek büyüme potansiyeli, yüksek volatilite'
                        }
                    ]
                },
                selectionCriteria: {
                    title: '7.4 Fon Seçim Kriterleri',
                    criteria: [
                        'Katılım finans ilkelerine uygunluk (zorunlu)',
                        'Risk seviyesinin profil ile uyumu',
                        'Geçmiş performans ve Sharpe oranı',
                        'Toplam gider oranı (TER)',
                        'Fon büyüklüğü ve likidite',
                        'Portföy çeşitlendirmesine katkı'
                    ]
                }
            }
        };
    },

    /**
     * Bölüm 8: Risk Yönetimi
     */
    generateRiskManagementSection: function(profileSummary) {
        return {
            title: '8. RİSK YÖNETİMİ',
            icon: 'warning',
            content: {
                riskMeasures: {
                    title: '8.1 Risk Ölçütleri',
                    metrics: [
                        {
                            name: 'Volatilite (Standart Sapma)',
                            target: profileSummary.maxVolatility,
                            description: 'Portföy getirilerinin yıllık dalgalanma ölçüsü'
                        },
                        {
                            name: 'Maksimum Düşüş (Drawdown)',
                            target: profileSummary.maxDrawdown,
                            description: 'Kabul edilebilir maksimum değer kaybı'
                        },
                        {
                            name: 'Sharpe Oranı',
                            target: profileSummary.targetSharpe,
                            description: 'Risk-ayarlı getiri performansı'
                        },
                        {
                            name: 'VaR (%95)',
                            target: profileSummary.var95,
                            description: '%95 güven düzeyinde günlük risk limiti'
                        }
                    ]
                },
                riskLimits: {
                    title: '8.2 Risk Limitleri',
                    limits: [
                        {
                            type: 'Konsantrasyon Riski',
                            limit: 'Tek fon maksimum %' + (profileSummary.maxSingleFund * 100),
                            action: 'Otomatik uyarı ve yeniden dengeleme önerisi'
                        },
                        {
                            type: 'Volatilite Limiti',
                            limit: 'Yıllık %' + (parseFloat(profileSummary.maxVolatility) || 20),
                            action: 'Portföy gözden geçirme ve risk azaltma'
                        },
                        {
                            type: 'Drawdown Limiti',
                            limit: profileSummary.maxDrawdown,
                            action: 'Acil değerlendirme ve strateji revizyonu'
                        }
                    ]
                },
                riskMonitoring: {
                    title: '8.3 Risk İzleme',
                    frequency: 'Günlük',
                    reports: [
                        'Günlük NAV takibi',
                        'Haftalık volatilite raporu',
                        'Aylık performans ve risk özeti',
                        'Çeyreklik kapsamlı risk analizi'
                    ],
                    alerts: [
                        'Günlük %3+ değer değişimi',
                        'Haftalık %5+ volatilite artışı',
                        'Hedef dağılımdan %5+ sapma'
                    ]
                },
                stressScenarios: {
                    title: '8.4 Stres Senaryoları',
                    scenarios: [
                        {
                            name: 'Piyasa Krizi',
                            assumption: 'Hisse senetleri -%30, tahviller -%10',
                            expectedImpact: this.calculateStressImpact(profileSummary, 'crisis')
                        },
                        {
                            name: 'Faiz Şoku',
                            assumption: 'Faiz oranları +500 baz puan',
                            expectedImpact: this.calculateStressImpact(profileSummary, 'rate_shock')
                        },
                        {
                            name: 'Kur Şoku',
                            assumption: 'TL -%20 değer kaybı',
                            expectedImpact: this.calculateStressImpact(profileSummary, 'currency')
                        }
                    ],
                    contingency: 'Stres senaryolarında portföy değeri hedef bantların dışına çıkarsa, acil gözden geçirme toplantısı yapılır.'
                }
            }
        };
    },

    /**
     * Bölüm 9: Katılım Finans İlkeleri
     */
    generateParticipationFinanceSection: function() {
        return {
            title: '9. KATILIM FİNANS İLKELERİ',
            icon: 'heart',
            content: {
                principles: {
                    title: '9.1 Temel İlkeler',
                    description: 'Kuveyt Türk Portföy, tüm yatırım faaliyetlerinde aşağıdaki katılım finans ilkelerine uyar:',
                    items: [
                        {
                            principle: 'Faiz Yasağı (Riba)',
                            description: 'Faiz içeren tüm enstrümanlar yasaktır. Kira sertifikaları ve katılım esaslı ürünler kullanılır.',
                            compliance: '✅ Tam Uyum'
                        },
                        {
                            principle: 'Belirsizlik Yasağı (Garar)',
                            description: 'Aşırı belirsizlik içeren spekülatif işlemler yapılmaz.',
                            compliance: '✅ Tam Uyum'
                        },
                        {
                            principle: 'Kumar Yasağı (Maysir)',
                            description: 'Şans oyunu niteliğinde yatırımlar yapılmaz.',
                            compliance: '✅ Tam Uyum'
                        },
                        {
                            principle: 'Haram Sektör Yasağı',
                            description: 'İslami ilkelere aykırı sektörlere yatırım yapılmaz.',
                            compliance: '✅ Tam Uyum'
                        }
                    ]
                },
                prohibitedSectors: {
                    title: '9.2 Yatırım Yapılmayan Sektörler',
                    sectors: [
                        { name: 'Alkol Üretimi ve Ticareti', reason: 'Haram madde' },
                        { name: 'Tütün Ürünleri', reason: 'Sağlığa zararlı/tartışmalı' },
                        { name: 'Kumar ve Şans Oyunları', reason: 'Maysir' },
                        { name: 'Domuz Eti ve Türevleri', reason: 'Haram gıda' },
                        { name: 'Konvansiyonel Bankacılık', reason: 'Faiz bazlı' },
                        { name: 'Silah ve Savunma Sanayi', reason: 'Etik kaygılar' },
                        { name: 'Yetişkin Eğlence', reason: 'Ahlaki değerler' }
                    ]
                },
                shariahBoard: {
                    title: '9.3 Danışma Kurulu Denetimi',
                    description: 'Tüm yatırım ürünleri Kuveyt Türk Danışma Kurulu onayından geçer.',
                    process: [
                        'Yeni fon lansmanı öncesi Danışma Kurulu incelemesi',
                        'Periyodik portföy uyumluluk denetimi',
                        'Haram gelir arındırma (purification) mekanizması',
                        'Yıllık uyumluluk sertifikası'
                    ]
                },
                purification: {
                    title: '9.4 Gelir Arındırma',
                    description: 'İstemeden elde edilen haram gelirler tespit edilir ve hayır kurumlarına bağışlanır.',
                    method: 'Periyodik portföy taraması ve oransal arındırma'
                }
            }
        };
    },

    /**
     * Bölüm 10: Davranışsal Finans Bulguları
     */
    generateBehavioralSection: function(behavioralFindings, inconsistencies) {
        return {
            title: '10. DAVRANIŞSAL FİNANS BULGULARI',
            icon: 'user',
            content: {
                overview: {
                    title: '10.1 Genel Değerlendirme',
                    description: 'Anket cevaplarınızdan elde edilen davranışsal finans içgörüleri:',
                    summary: behavioralFindings.summary
                },
                biases: {
                    title: '10.2 Tespit Edilen Davranışsal Önyargılar',
                    findings: behavioralFindings.biases,
                    note: 'Bu önyargıların farkında olmak, daha bilinçli yatırım kararları almanıza yardımcı olur.'
                },
                emotionalProfile: {
                    title: '10.3 Duygusal Profil',
                    lossAversion: behavioralFindings.lossAversion,
                    volatilityTolerance: behavioralFindings.volatilityTolerance,
                    decisionStyle: behavioralFindings.decisionStyle
                },
                inconsistencies: {
                    title: '10.4 Tutarsızlık Bulguları',
                    hasIssues: inconsistencies.length > 0,
                    items: inconsistencies,
                    interpretation: this.interpretInconsistencies(inconsistencies),
                    recommendation: 'Tutarsızlıklar tespit edildiğinde, ek sorularla netleştirme yapılması önerilir.'
                },
                recommendations: {
                    title: '10.5 Davranışsal Öneriler',
                    items: behavioralFindings.recommendations
                }
            }
        };
    },

    /**
     * Bölüm 11: İzleme ve Raporlama
     */
    generateMonitoringSection: function() {
        return {
            title: '11. İZLEME VE RAPORLAMA',
            icon: 'clipboard',
            content: {
                performanceMetrics: {
                    title: '11.1 Performans Ölçütleri',
                    benchmarks: [
                        {
                            name: 'Mutlak Getiri',
                            description: 'Portföyün toplam getirisi',
                            frequency: 'Günlük'
                        },
                        {
                            name: 'Göreli Getiri',
                            description: 'Karşılaştırma ölçütüne göre performans',
                            frequency: 'Aylık'
                        },
                        {
                            name: 'Risk-Ayarlı Getiri',
                            description: 'Sharpe, Sortino oranları',
                            frequency: 'Çeyreklik'
                        }
                    ]
                },
                reportingSchedule: {
                    title: '11.2 Raporlama Takvimi',
                    reports: [
                        {
                            type: 'Günlük NAV Bildirimi',
                            frequency: 'Her iş günü',
                            content: 'Fon fiyatları ve değişim oranları'
                        },
                        {
                            type: 'Aylık Performans Raporu',
                            frequency: 'Ayın ilk 5 iş günü',
                            content: 'Getiri, risk, dağılım analizi'
                        },
                        {
                            type: 'Çeyreklik Kapsamlı Rapor',
                            frequency: 'Çeyrek sonrası 15 gün',
                            content: 'Detaylı analiz, piyasa görünümü, strateji değerlendirmesi'
                        },
                        {
                            type: 'Yıllık IPS Gözden Geçirme',
                            frequency: 'Yılda bir',
                            content: 'Tam IPS değerlendirmesi, hedef revizyonu'
                        }
                    ]
                },
                evaluationCriteria: {
                    title: '11.3 Değerlendirme Kriterleri',
                    timeframes: {
                        shortTerm: '1 yıldan kısa performans değerlendirmesi yapılmaz',
                        mediumTerm: '1-3 yıl arası trend analizi yapılır',
                        longTerm: '3+ yıl için nihai performans değerlendirmesi yapılır'
                    },
                    note: 'Kısa vadeli dalgalanmalar uzun vadeli stratejiyi değiştirmek için yeterli sebep oluşturmaz.'
                }
            }
        };
    },

    /**
     * Bölüm 12: Onay
     */
    generateApprovalSection: function() {
        return {
            title: '12. GÖZDEN GEÇİRME VE ONAY',
            icon: 'check',
            content: {
                legalDisclaimer: {
                    title: '12.1 Yasal Uyarı',
                    text: `Bu Yatırım Politikası Beyanı (IPS) yatırım tavsiyesi niteliğinde değildir. Yatırım kararları, yatırımcının kendi mali durumu, yatırım hedefleri ve risk toleransı değerlendirilerek verilmelidir.

Geçmiş performans, gelecek sonuçların garantisi değildir. Tüm yatırımlar piyasa riskine tabidir ve anapara kaybı mümkündür.

Bu belgede sunulan bilgiler, hazırlandığı tarih itibarıyla doğru kabul edilmekle birlikte, değişen piyasa koşulları ve düzenleyici gereksinimler nedeniyle güncelliğini yitirebilir.`,
                    important: [
                        'Yatırım yapmadan önce izahname ve yatırımcı bilgi formunu okuyunuz',
                        'Fonlarımız anapara koruması sağlamamaktadır',
                        'Tüm yatırımlar katılım finans ilkelerine uygundur'
                    ]
                },
                signatures: {
                    title: '12.2 Onay',
                    parties: [
                        {
                            role: 'Yatırımcı',
                            name: '____________________',
                            signature: '____________________',
                            date: '____________________',
                            statement: 'Bu Yatırım Politikası Beyanı\'nı okuduğumu, anladığımı ve kabul ettiğimi beyan ederim.'
                        },
                        {
                            role: 'Yatırım Danışmanı',
                            name: '____________________',
                            signature: '____________________',
                            date: '____________________',
                            statement: 'Yatırımcının risk profilini değerlendirdiğimi ve bu IPS\'in uygun şekilde hazırlandığını onaylarım.'
                        }
                    ]
                },
                nextReview: {
                    title: '12.3 Sonraki Gözden Geçirme',
                    date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
                    note: 'Bu IPS en geç yukarıdaki tarihte veya önemli değişiklikler olduğunda gözden geçirilecektir.'
                }
            }
        };
    },

    // ==================== YARDIMCI FONKSİYONLAR ====================

    /**
     * Gelişmiş profil özeti al
     */
    getEnhancedProfileSummary: function(profileName) {
        const summaries = {
            low: {
                name: 'low',
                title: 'Sağlamcı (Muhafazakar)',
                riskLevel: '2/7',
                targetReturn: '%8-12 yıllık',
                realReturnTarget: 'Enflasyon + %3-5',
                maxVolatility: '%8-10',
                maxDrawdown: '-%10',
                targetSharpe: '> 0.8',
                var95: '-%1.5 günlük',
                timeHorizon: '1-3 yıl',
                minimumHorizon: '1 yıl',
                benchmark: 'BIST-KYD Tüm Endeksi',
                investmentPhilosophy: 'Sermaye koruma odaklı, düşük volatilite, istikrarlı getiri',
                assetAllocation: {
                    'Para Piyasası Fonları': '40-50%',
                    'Kira Sertifikası Fonları': '30-40%',
                    'Altın/Kıymetli Maden': '10-15%',
                    'Dengeli Fonlar': '0-10%',
                    'Hisse Senedi Fonları': '0-5%'
                },
                tacticalRanges: {
                    'Para Piyasası': { min: 35, target: 45, max: 55 },
                    'Kira Sertifikası': { min: 25, target: 35, max: 45 },
                    'Altın': { min: 5, target: 12, max: 20 },
                    'Hisse': { min: 0, target: 3, max: 8 }
                },
                rebalancingMethod: 'Eşik Bazlı',
                rebalancingFrequency: 'Çeyreklik kontrol',
                rebalancingThreshold: '%5 sapma',
                rebalancingTrigger: 'Herhangi bir varlık sınıfı hedeften %5 saparsa',
                minimumLiquidity: '%50',
                maxSingleFund: 0.40,
                maxAssetClass: 0.50,
                eligibleCategories: ['Para Piyasası', 'Kısa Vadeli', 'Kira Sertifikası', 'Temkinli', 'Altın (sınırlı)'],
                eligibleRiskLevels: [1, 2, 3],
                restrictedCategories: ['Hisse Senedi Yoğun', 'Agresif', 'Sektörel'],
                restrictionReasons: ['Yüksek volatilite', 'Risk profiline uyumsuzluk']
            },
            medium: {
                name: 'medium',
                title: 'Temkinli (Dengeli)',
                riskLevel: '4/7',
                targetReturn: '%12-18 yıllık',
                realReturnTarget: 'Enflasyon + %5-8',
                maxVolatility: '%15-20',
                maxDrawdown: '-%20',
                targetSharpe: '> 0.6',
                var95: '-%2.5 günlük',
                timeHorizon: '3-5 yıl',
                minimumHorizon: '2 yıl',
                benchmark: 'BIST-KYD Dengeli Endeks',
                investmentPhilosophy: 'Risk-getiri dengesi, çeşitlendirilmiş büyüme',
                assetAllocation: {
                    'Para Piyasası Fonları': '15-25%',
                    'Kira Sertifikası Fonları': '20-30%',
                    'Dengeli/Karma Fonlar': '20-30%',
                    'Altın/Kıymetli Maden': '15-20%',
                    'Hisse Senedi Fonları': '15-25%'
                },
                tacticalRanges: {
                    'Para Piyasası': { min: 10, target: 20, max: 30 },
                    'Kira Sertifikası': { min: 15, target: 25, max: 35 },
                    'Dengeli': { min: 15, target: 25, max: 35 },
                    'Altın': { min: 10, target: 17, max: 25 },
                    'Hisse': { min: 10, target: 20, max: 30 }
                },
                rebalancingMethod: 'Takvim + Eşik Bazlı',
                rebalancingFrequency: 'Aylık kontrol, çeyreklik yeniden dengeleme',
                rebalancingThreshold: '%7 sapma',
                rebalancingTrigger: 'Çeyrek sonunda veya %7 sapma olduğunda',
                minimumLiquidity: '%30',
                maxSingleFund: 0.35,
                maxAssetClass: 0.40,
                eligibleCategories: ['Tüm kategoriler - risk seviyesi 1-5'],
                eligibleRiskLevels: [1, 2, 3, 4, 5],
                restrictedCategories: ['Yüksek kaldıraçlı', 'Agresif büyüme'],
                restrictionReasons: ['Sınırlı tahsis', 'Dikkatli pozisyon boyutu']
            },
            high: {
                name: 'high',
                title: 'Agresif (Dinamik)',
                riskLevel: '6/7',
                targetReturn: '%18-25+ yıllık',
                realReturnTarget: 'Enflasyon + %10+',
                maxVolatility: '%25-35',
                maxDrawdown: '-%35',
                targetSharpe: '> 0.5',
                var95: '-%4 günlük',
                timeHorizon: '5+ yıl',
                minimumHorizon: '3 yıl',
                benchmark: 'BIST-100 Getiri Endeksi',
                investmentPhilosophy: 'Maksimum büyüme odaklı, yüksek risk toleransı',
                assetAllocation: {
                    'Hisse Senedi Fonları': '40-55%',
                    'Altın/Kıymetli Maden': '15-25%',
                    'Dengeli/Dinamik Fonlar': '15-25%',
                    'Kira Sertifikası Fonları': '5-15%',
                    'Para Piyasası Fonları': '5-10%'
                },
                tacticalRanges: {
                    'Hisse': { min: 35, target: 47, max: 60 },
                    'Altın': { min: 10, target: 20, max: 30 },
                    'Dengeli': { min: 10, target: 20, max: 30 },
                    'Kira Sertifikası': { min: 0, target: 10, max: 20 },
                    'Para Piyasası': { min: 3, target: 7, max: 15 }
                },
                rebalancingMethod: 'Fırsatçı + Eşik Bazlı',
                rebalancingFrequency: 'Aylık değerlendirme',
                rebalancingThreshold: '%10 sapma',
                rebalancingTrigger: 'Piyasa fırsatlarında veya %10 sapma olduğunda',
                minimumLiquidity: '%15',
                maxSingleFund: 0.40,
                maxAssetClass: 0.60,
                eligibleCategories: ['Tüm kategoriler'],
                eligibleRiskLevels: [1, 2, 3, 4, 5, 6, 7],
                restrictedCategories: [],
                restrictionReasons: []
            }
        };
        
        return summaries[profileName] || summaries.medium;
    },

    /**
     * Tutarsızlık tespit et
     */
    detectInconsistencies: function(surveyAnswers, riskResult) {
        const inconsistencies = [];
        
        // Q7 (risk tercihi) vs diğer agresif cevaplar
        if (surveyAnswers.q7 === 'a' || surveyAnswers.q7_text?.toLowerCase().includes('düşük')) {
            // Düşük risk tercihi ama yüksek risk davranışları
            if (surveyAnswers.q6 === 'd' || surveyAnswers.q12 === 'c') {
                inconsistencies.push({
                    type: 'preference_behavior_mismatch',
                    severity: 'high',
                    title: 'Risk Tercihi - Davranış Uyumsuzluğu',
                    description: 'Düşük risk tercihi belirtilmiş ancak davranışsal senaryolarda yüksek risk toleransı gösterilmiş.',
                    questions: ['q7', 'q6', 'q12'],
                    recommendation: 'Gerçek risk toleransını netleştirmek için ek değerlendirme önerilir.'
                });
            }
        }
        
        // Deneyim düşük ama agresif tercihler
        if (surveyAnswers.q9 === 'a' && (riskResult.profile === 'high' || surveyAnswers.q8 === 'd')) {
            inconsistencies.push({
                type: 'experience_preference_mismatch',
                severity: 'medium',
                title: 'Deneyim - Tercih Uyumsuzluğu',
                description: 'Yatırım deneyimi düşük ancak yüksek riskli ürün tercihi mevcut.',
                questions: ['q9', 'q8'],
                recommendation: 'Karmaşık ürünlerde ek bilgilendirme ve danışman desteği zorunlu tutulmalı.'
            });
        }
        
        // Kısa vade ama agresif tercih
        if (surveyAnswers.q2 === 'a' && riskResult.profile === 'high') {
            inconsistencies.push({
                type: 'horizon_risk_mismatch',
                severity: 'high',
                title: 'Vade - Risk Uyumsuzluğu',
                description: 'Kısa yatırım vadesi ancak yüksek risk profili. Bu kombinasyon yüksek kayıp riski taşır.',
                questions: ['q2'],
                recommendation: 'Ya yatırım vadesi uzatılmalı ya da risk profili düşürülmelidir.'
            });
        }
        
        // Acil durum fonu yok ama yüksek risk
        if (surveyAnswers.q5 === 'a' && riskResult.profile !== 'low') {
            inconsistencies.push({
                type: 'safety_net_missing',
                severity: 'medium',
                title: 'Güvenlik Ağı Eksikliği',
                description: 'Acil durum fonu bulunmuyor ancak orta-yüksek risk tercih edilmiş.',
                questions: ['q5'],
                recommendation: 'Yatırıma başlamadan önce 3-6 aylık acil durum fonu oluşturulması önerilir.'
            });
        }
        
        // Volatilite toleransı düşük ama agresif tercih
        if (surveyAnswers.q11 === 'a' && riskResult.profile === 'high') {
            inconsistencies.push({
                type: 'volatility_tolerance_mismatch',
                severity: 'high',
                title: 'Volatilite Toleransı Uyumsuzluğu',
                description: 'Düşük volatilite toleransı ancak yüksek riskli portföy. Piyasa düşüşlerinde panik satışı riski yüksek.',
                questions: ['q11'],
                recommendation: 'Risk profili düşürülmeli veya kademeli geçiş stratejisi uygulanmalı.'
            });
        }
        
        return inconsistencies;
    },

    /**
     * Davranışsal kalıpları analiz et
     */
    analyzeBehavioralPatterns: function(surveyAnswers) {
        const findings = {
            biases: [],
            lossAversion: 'Orta',
            volatilityTolerance: 'Orta',
            decisionStyle: 'Analitik',
            recommendations: [],
            summary: ''
        };
        
        // Kayıptan kaçınma analizi
        if (surveyAnswers.q6 === 'a' || surveyAnswers.q10 === 'a') {
            findings.lossAversion = 'Yüksek';
            findings.biases.push({
                name: 'Kayıptan Kaçınma (Loss Aversion)',
                description: 'Kayıpların psikolojik etkisi, eşdeğer kazançlardan daha güçlü hissediliyor.',
                impact: 'Erken satış, düşük getiri potansiyeli',
                mitigation: 'Otomatik yatırım planları, uzun vadeli bakış açısı'
            });
        }
        
        // FOMO analizi
        if (surveyAnswers.q12 === 'c') {
            findings.biases.push({
                name: 'Kaçırma Korkusu (FOMO)',
                description: 'Fırsatları kaçırma korkusuyla hızlı karar verme eğilimi.',
                impact: 'Spekülatif yatırımlar, yüksek maliyet',
                mitigation: 'Disiplinli yatırım kuralları, bekleme süresi uygulama'
            });
        }
        
        // Aşırı güven analizi
        if (surveyAnswers.q9 === 'd' && surveyAnswers.q6 === 'd') {
            findings.biases.push({
                name: 'Aşırı Güven (Overconfidence)',
                description: 'Yatırım becerilerine aşırı güven duyma eğilimi.',
                impact: 'Yüksek işlem sıklığı, konsantre pozisyonlar',
                mitigation: 'Performans günlüğü tutma, danışman kontrolü'
            });
        }
        
        // Sürü psikolojisi
        if (surveyAnswers.q11 === 'a' && surveyAnswers.q6 === 'a') {
            findings.biases.push({
                name: 'Sürü Davranışı (Herding)',
                description: 'Piyasa paniği sırasında kalabalığı takip etme eğilimi.',
                impact: 'Düşükten sat, yüksekten al davranışı',
                mitigation: 'Otomatik yeniden dengeleme, uzun vadeli plan'
            });
        }
        
        // Volatilite toleransı
        if (surveyAnswers.q11 === 'a') {
            findings.volatilityTolerance = 'Düşük';
        } else if (surveyAnswers.q11 === 'c') {
            findings.volatilityTolerance = 'Yüksek';
        }
        
        // Karar stili
        if (surveyAnswers.q7 === 'b' && surveyAnswers.q13 === 'b') {
            findings.decisionStyle = 'Disiplinli';
        } else if (surveyAnswers.q6 === 'a' || surveyAnswers.q11 === 'a') {
            findings.decisionStyle = 'Duygusal';
        } else if (surveyAnswers.q12 === 'c') {
            findings.decisionStyle = 'Fırsatçı';
        }
        
        // Öneriler
        if (findings.lossAversion === 'Yüksek') {
            findings.recommendations.push('Düzenli yatırım planı (DCA) ile dalgalanmalardan korunun');
            findings.recommendations.push('Portföy değerini çok sık kontrol etmekten kaçının');
        }
        
        if (findings.biases.some(b => b.name.includes('FOMO'))) {
            findings.recommendations.push('Her yatırım kararı için 24 saat bekleme kuralı uygulayın');
        }
        
        if (findings.volatilityTolerance === 'Düşük') {
            findings.recommendations.push('Para piyasası ve kira sertifikası ağırlıklı portföy tercih edin');
        }
        
        // Özet
        findings.summary = `Davranışsal analiz sonuçlarına göre ${findings.decisionStyle.toLowerCase()} bir karar verme tarzına sahipsiniz. Kayıptan kaçınma eğiliminiz ${findings.lossAversion.toLowerCase()}, volatilite toleransınız ${findings.volatilityTolerance.toLowerCase()} düzeydedir.`;
        
        return findings;
    },

    // Diğer yardımcı fonksiyonlar...
    getTimeHorizonFromAnswers: function(answers) {
        const horizonMap = {
            'a': '1 yıldan kısa - Çok kısa vadeli',
            'b': '1-3 yıl - Kısa vadeli',
            'c': '3-5 yıl - Orta vadeli',
            'd': '5+ yıl - Uzun vadeli'
        };
        return horizonMap[answers.q2] || 'Belirtilmedi';
    },

    getPrimaryObjective: function(profileName) {
        const objectives = {
            low: 'Sermaye koruma ve enflasyonun üzerinde istikrarlı getiri elde etme',
            medium: 'Kontrollü risk altında sermaye büyümesi ve düzenli getiri dengesi',
            high: 'Uzun vadeli maksimum sermaye büyümesi'
        };
        return objectives[profileName] || objectives.medium;
    },

    getTimeHorizonImplications: function(profileName) {
        const implications = {
            low: [
                'Kısa vadeli likidite ihtiyaçları göz önünde bulundurulur',
                'Volatil varlıklara sınırlı maruz kalma',
                'Sermaye koruma öncelikli strateji'
            ],
            medium: [
                'Orta vadeli büyüme hedefleri',
                'Piyasa döngülerini aşma kapasitesi',
                'Dengeli risk-getiri yaklaşımı'
            ],
            high: [
                'Uzun vadeli büyüme potansiyelinden yararlanma',
                'Kısa vadeli dalgalanmaları tolere etme',
                'Bileşik getiri etkisini maksimize etme'
            ]
        };
        return implications[profileName] || implications.medium;
    },

    getIncomeType: function(answers) {
        if (answers.q4 === 'a') return 'Düşük/Düzensiz';
        if (answers.q4 === 'b') return 'Orta/İstikrarlı';
        if (answers.q4 === 'c') return 'Yüksek/İstikrarlı';
        if (answers.q4 === 'd') return 'Çok Yüksek/İstikrarlı';
        return 'Belirtilmedi';
    },

    getIncomeFrequency: function(answers) {
        return 'Periyodik gelir dağıtımı tercih edilmiyor (yeniden yatırım)';
    },

    getIncomePriority: function(profileName) {
        const priorities = {
            low: 'Düzenli gelir dağıtımı tercih edilebilir',
            medium: 'Karma yaklaşım - kısmen gelir, kısmen büyüme',
            high: 'Getiri yeniden yatırıma yönlendirilir'
        };
        return priorities[profileName] || priorities.medium;
    },

    getRiskClassification: function(riskResult) {
        const score = riskResult.score || riskResult.normalizedScore || 50;
        if (score <= 33) return { level: 'Düşük Risk', color: '#28a745' };
        if (score <= 66) return { level: 'Orta Risk', color: '#ffc107' };
        return { level: 'Yüksek Risk', color: '#dc3545' };
    },

    calculateCapacityScore: function(answers) {
        let score = 0;
        // Yaş
        if (answers.q1 === 'a') score += 25;
        else if (answers.q1 === 'b') score += 20;
        else if (answers.q1 === 'c') score += 10;
        else score += 5;
        
        // Gelir
        if (answers.q4 === 'd') score += 25;
        else if (answers.q4 === 'c') score += 20;
        else if (answers.q4 === 'b') score += 10;
        else score += 5;
        
        // Varlık
        if (answers.q3 === 'd') score += 25;
        else if (answers.q3 === 'c') score += 20;
        else if (answers.q3 === 'b') score += 10;
        else score += 5;
        
        // Acil durum fonu
        if (answers.q5 === 'c') score += 25;
        else if (answers.q5 === 'b') score += 15;
        else score += 5;
        
        return score;
    },

    calculateWillingnessScore: function(answers) {
        let score = 0;
        // Q6 - Kayıp tepkisi
        if (answers.q6 === 'd') score += 25;
        else if (answers.q6 === 'c') score += 20;
        else if (answers.q6 === 'b') score += 10;
        else score += 5;
        
        // Q7 - Risk tercihi
        if (answers.q7 === 'c' || answers.q7 === 'high') score += 25;
        else if (answers.q7 === 'b' || answers.q7 === 'medium') score += 15;
        else score += 5;
        
        // Q11 - Volatilite toleransı
        if (answers.q11 === 'c') score += 25;
        else if (answers.q11 === 'b') score += 15;
        else score += 5;
        
        // Q12 - Fırsat değerlendirme
        if (answers.q12 === 'c') score += 25;
        else if (answers.q12 === 'b') score += 15;
        else score += 5;
        
        return score;
    },

    assessAgeFactor: function(answers) {
        const assessments = {
            'a': 'Genç yaş grubu - Uzun yatırım ufku mevcut',
            'b': 'Orta yaş - Kariyer ve birikim dönemi',
            'c': 'Emekliliğe yaklaşma - Sermaye koruma önem kazanıyor',
            'd': 'Emeklilik dönemi - Gelir ve likidite öncelikli'
        };
        return assessments[answers.q1] || 'Değerlendirilemedi';
    },

    getAgeImpact: function(answers) {
        const impacts = {
            'a': 'positive',
            'b': 'neutral',
            'c': 'cautious',
            'd': 'conservative'
        };
        return impacts[answers.q1] || 'neutral';
    },

    assessIncomeFactor: function(answers) {
        const assessments = {
            'a': 'Düşük/düzensiz gelir - Kayıp kapasitesi sınırlı',
            'b': 'Orta düzey istikrarlı gelir',
            'c': 'Yüksek istikrarlı gelir - İyi kayıp telafi kapasitesi',
            'd': 'Çok yüksek gelir - Yüksek kayıp kapasitesi'
        };
        return assessments[answers.q4] || 'Değerlendirilemedi';
    },

    getIncomeImpact: function(answers) {
        const impacts = { 'a': 'conservative', 'b': 'neutral', 'c': 'positive', 'd': 'positive' };
        return impacts[answers.q4] || 'neutral';
    },

    assessWealthFactor: function(answers) {
        const assessments = {
            'a': 'Düşük varlık birikimi - Sermaye koruma kritik',
            'b': 'Orta düzey birikim - Çeşitlendirme mümkün',
            'c': 'Yüksek birikim - Geniş yatırım seçenekleri',
            'd': 'Çok yüksek birikim - Profesyonel yönetim uygun'
        };
        return assessments[answers.q3] || 'Değerlendirilemedi';
    },

    getWealthImpact: function(answers) {
        const impacts = { 'a': 'conservative', 'b': 'neutral', 'c': 'positive', 'd': 'positive' };
        return impacts[answers.q3] || 'neutral';
    },

    assessEmergencyFund: function(answers) {
        const assessments = {
            'a': 'Acil durum fonu yok - Yüksek finansal kırılganlık',
            'b': 'Kısmi acil durum fonu mevcut',
            'c': '6+ aylık acil durum fonu - İyi hazırlık'
        };
        return assessments[answers.q5] || 'Değerlendirilemedi';
    },

    getEmergencyImpact: function(answers) {
        const impacts = { 'a': 'conservative', 'b': 'neutral', 'c': 'positive' };
        return impacts[answers.q5] || 'neutral';
    },

    assessLiquidityNeeds: function(answers) {
        return 'Değerlendirme bazı sorulara bağlı';
    },

    getLiquidityImpact: function(answers) {
        return 'neutral';
    },

    getCapacitySummary: function(answers) {
        const score = this.calculateCapacityScore(answers);
        if (score >= 80) return 'Yüksek risk kapasitesi - Finansal güç ve kayıp telafi imkanı mevcut.';
        if (score >= 50) return 'Orta düzey risk kapasitesi - Dengeli yaklaşım önerilir.';
        return 'Düşük risk kapasitesi - Sermaye koruma öncelikli strateji gerekli.';
    },

    interpretLossReaction: function(answers) {
        const interpretations = {
            'a': 'Hızlı çıkış tercihi - Psikolojik baskı altında hızlı karar eğilimi',
            'b': 'Temkinli yaklaşım - Sınırlı kayıp kabul edilir',
            'c': 'Sabırlı bekleyiş - Kısa vadeli dalgalanmalara dirençli',
            'd': 'Fırsatçı yaklaşım - Düşüşleri alım fırsatı olarak değerlendirme'
        };
        return interpretations[answers.q6] || 'Değerlendirilemedi';
    },

    interpretRiskPreference: function(answers) {
        const key = answers.q7;
        if (key === 'a' || key === 'low') return 'Düşük risk tercih - Sermaye koruma öncelikli';
        if (key === 'b' || key === 'medium') return 'Dengeli tercih - Risk-getiri optimizasyonu';
        if (key === 'c' || key === 'high') return 'Yüksek risk tercih - Büyüme odaklı';
        return 'Değerlendirilemedi';
    },

    interpretVolatilityTolerance: function(answers) {
        const interpretations = {
            'a': 'Düşük volatilite toleransı - Dalgalanmalar rahatsızlık yaratıyor',
            'b': 'Orta volatilite toleransı - Makul dalgalanmalar kabul edilir',
            'c': 'Yüksek volatilite toleransı - Dalgalanmalar yatırımın doğal parçası'
        };
        return interpretations[answers.q11] || 'Değerlendirilemedi';
    },

    interpretOpportunityBehavior: function(answers) {
        const interpretations = {
            'a': 'Muhafazakar - Fırsatları kaçırma pahasına güvenlik',
            'b': 'Kademeli - Küçük adımlarla fırsat değerlendirme',
            'c': 'Fırsatçı - Aktif fırsat arayışı, hızlı karar'
        };
        return interpretations[answers.q12] || 'Değerlendirilemedi';
    },

    getWillingnessSummary: function(answers) {
        const score = this.calculateWillingnessScore(answers);
        if (score >= 80) return 'Yüksek risk istekliliği - Agresif yatırım yaklaşımına açık.';
        if (score >= 50) return 'Orta düzey risk istekliliği - Dengeli strateji tercih ediliyor.';
        return 'Düşük risk istekliliği - Muhafazakar yaklaşım tercih ediliyor.';
    },

    compareCapacityAndWillingness: function(answers, riskResult) {
        const capacity = this.calculateCapacityScore(answers);
        const willingness = this.calculateWillingnessScore(answers);
        
        const diff = Math.abs(capacity - willingness);
        
        if (diff < 15) {
            return {
                status: 'aligned',
                description: 'Risk kapasitesi ve istekliliği uyumlu.',
                recommendation: 'Mevcut risk profili uygun.'
            };
        } else if (capacity > willingness) {
            return {
                status: 'capacity_higher',
                description: 'Risk kapasitesi, istekliliğinden yüksek.',
                recommendation: 'Daha yüksek risk alınabilir ancak psikolojik konfor öncelikli tutulabilir.'
            };
        } else {
            return {
                status: 'willingness_higher',
                description: 'Risk istekliliği, kapasiteden yüksek.',
                recommendation: 'Finansal kapasite göz önünde bulundurularak risk azaltılmalı.'
            };
        }
    },

    assessAlignment: function(answers, riskResult) {
        const comparison = this.compareCapacityAndWillingness(answers, riskResult);
        return comparison.status;
    },

    getAlignmentRecommendation: function(answers, riskResult) {
        const comparison = this.compareCapacityAndWillingness(answers, riskResult);
        return comparison.recommendation;
    },

    getInconsistencyImplications: function(inconsistencies) {
        if (inconsistencies.length === 0) {
            return 'Tutarlı cevaplar verilmiş, ek değerlendirme gerekmiyor.';
        }
        const highSeverity = inconsistencies.filter(i => i.severity === 'high').length;
        if (highSeverity > 0) {
            return `${highSeverity} kritik tutarsızlık tespit edildi. Risk profili belirlenmeden önce netleştirme önerilir.`;
        }
        return 'Orta düzey tutarsızlıklar mevcut. Sonuçlar dikkatle yorumlanmalı.';
    },

    getInconsistencyResolution: function(inconsistencies) {
        if (inconsistencies.length === 0) return [];
        
        return [
            'Tespit edilen tutarsızlıklar için ek sorular sorulabilir',
            'Yatırımcı ile yüz yüze görüşme önerilir',
            'Risk profili, düşük olan taraf (kapasite vs isteklilik) baz alınarak belirlenir',
            'Portföy, tutarsızlık giderilene kadar muhafazakar tutulabilir'
        ];
    },

    interpretInconsistencies: function(inconsistencies) {
        if (inconsistencies.length === 0) {
            return 'Anket cevapları tutarlı. Risk profili güvenilir şekilde belirlenmiştir.';
        }
        
        return `${inconsistencies.length} adet tutarsızlık tespit edilmiştir. Bu durum, yatırımcının risk algısı ile gerçek tercihleri arasında farklılık olabileceğini göstermektedir. Danışman rehberliğinde netleştirme önerilir.`;
    },

    getLiquidityRequirement: function(answers) {
        if (answers.q2 === 'a') return 'Yüksek - %50+ likit varlık';
        if (answers.q2 === 'b') return 'Orta-Yüksek - %30-50 likit varlık';
        if (answers.q2 === 'c') return 'Orta - %20-30 likit varlık';
        return 'Düşük - %10-20 likit varlık';
    },

    getEmergencyReserveRecommendation: function(answers) {
        if (answers.q5 === 'a') return 'Öneri: Yatırıma başlamadan önce 3-6 aylık acil durum fonu oluşturun';
        if (answers.q5 === 'b') return 'Öneri: Acil durum fonunu 6 aya tamamlayın';
        return 'Yeterli acil durum fonu mevcut';
    },

    getRedemptionExpectation: function(answers) {
        const expectations = {
            'a': 'Sık - Yılda birden fazla',
            'b': 'Ara sıra - Yılda bir',
            'c': 'Nadir - Birkaç yılda bir',
            'd': 'Yok - Uzun vadeli tutum'
        };
        return expectations[answers.q2] || 'Belirtilmedi';
    },

    getHorizonImplications: function(profileSummary) {
        return [
            `Minimum önerilen vade: ${profileSummary.minimumHorizon}`,
            `Hedef yatırım süresi: ${profileSummary.timeHorizon}`,
            'Erken çıkış durumunda hedeflere ulaşılamayabilir'
        ];
    },

    getEthicalRestrictions: function() {
        return [
            'Faiz bazlı enstrümanlar (konvansiyonel tahvil, mevduat vb.)',
            'Alkol, tütün, kumar sektörleri',
            'Domuz eti ve türevleri',
            'Konvansiyonel bankacılık ve sigorta',
            'Silah sanayi',
            'Yetişkin eğlence sektörü'
        ];
    },

    getEthicalPreferences: function(answers) {
        if (answers.q15 === 'a') {
            return {
                participationCompliant: true,
                esgPreference: true,
                description: 'Katılım esaslı ve ESG uyumlu yatırımlar tercih ediliyor'
            };
        }
        return {
            participationCompliant: true,
            esgPreference: false,
            description: 'Katılım esaslı yatırımlar (Kuveyt Türk Portföy standart)'
        };
    },

    calculateStressImpact: function(profileSummary, scenario) {
        const impacts = {
            low: { crisis: '-%8 to -%12', rate_shock: '-%3 to -%5', currency: '-%2 to -%5' },
            medium: { crisis: '-%15 to -%20', rate_shock: '-%5 to -%8', currency: '-%5 to -%10' },
            high: { crisis: '-%25 to -%35', rate_shock: '-%8 to -%12', currency: '-%10 to -%15' }
        };
        return impacts[profileSummary.name]?.[scenario] || 'Hesaplanamadı';
    },

    getAnswerText: function(answer) {
        // Basit cevap metni dönüşümü
        const texts = {
            'a': 'Seçenek A',
            'b': 'Seçenek B',
            'c': 'Seçenek C',
            'd': 'Seçenek D',
            'low': 'Düşük',
            'medium': 'Orta',
            'high': 'Yüksek'
        };
        return texts[answer] || answer;
    }
};

// Global'e ekle
if (typeof window !== 'undefined') {
    window.IPSContentGenerator = IPSContentGenerator;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IPSContentGenerator;
}

