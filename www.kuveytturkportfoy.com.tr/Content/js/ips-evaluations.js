/**
 * IPS Finansal Değerlendirme Metinleri
 * Her anket sorusu için profesyonel finansal değerlendirmeler
 * 
 * Kuveyt Türk Portföy - Investment Policy Statement (IPS) Modülü
 */

const IPSEvaluations = {
    // Soru etiketleri
    questionLabels: {
        q1: { title: 'Yaş Aralığı', icon: 'calendar', category: 'Risk Kapasitesi' },
        q2: { title: 'Yatırım Vadesi', icon: 'clock', category: 'Risk Kapasitesi' },
        q3: { title: 'Toplam Finansal Varlık', icon: 'star', category: 'Risk Kapasitesi' },
        q4: { title: 'Yıllık Gelir & İstikrar', icon: 'credit-card', category: 'Risk Kapasitesi' },
        q5: { title: 'Acil Durum Fonu', icon: 'lifesaver', category: 'Risk Kapasitesi' },
        q6: { title: '%20 Kayıp Senaryosu', icon: 'warning', category: 'Risk İstekliliği', critical: true },
        q7: { title: 'Genel Risk-Getiri Tercihi', icon: 'crosshairs', category: 'Risk İstekliliği', critical: true },
        q8: { title: 'Garanti vs Riskli Tercih', icon: 'git-branch', category: 'Risk İstekliliği' },
        q9: { title: 'Yatırım Deneyimi & Özgüven', icon: 'album', category: 'Davranışsal Analiz' },
        q10: { title: 'Kazanç vs Kayıp Psikolojisi', icon: 'user', category: 'Davranışsal Analiz' },
        q11: { title: 'Volatilite Toleransı', icon: 'move', category: 'Davranışsal Analiz' },
        q12: { title: 'Büyük Kazanç Senaryosu', icon: 'arrow-up', category: 'Davranışsal Analiz' },
        q13: { title: 'Ürün Bilgisi / Deneyimi', icon: 'file-text', category: 'Uygunluk' },
        q14: { title: 'Riskli Ürünlere İlgi', icon: 'bolt', category: 'Uygunluk' },
        q15: { title: 'Etik / Dini / ESG Tercihleri', icon: 'heart', category: 'Uygunluk' }
    },

    // Soru 2 - Yaş değerlendirmeleri
    q2: {
        a: {
            answer: '18-30 yaş',
            evaluation: 'Genç yaş grubunda olmanız, uzun vadeli yatırım stratejileri için önemli bir avantaj sağlar. Bu yaş aralığında yatırımcılar genellikle daha yüksek risk alabilir çünkü olası kayıpları telafi etmek için yeterli zaman mevcuttur.',
            implication: 'Uzun vadeli büyüme odaklı, göreceli yüksek riskli portföy uygun olabilir.',
            riskImpact: 'positive'
        },
        b: {
            answer: '31-50 yaş',
            evaluation: 'Kariyer ve birikim döneminizdesiniz. Bu yaş aralığı, dengeli bir yatırım stratejisi için idealdir. Hem büyüme potansiyeli hem de sermaye koruma hedeflenebilir.',
            implication: 'Dengeli portföy yapısı, risk ve getiri optimizasyonu önerilir.',
            riskImpact: 'neutral'
        },
        c: {
            answer: '51-65 yaş',
            evaluation: 'Emekliliğe yaklaşan dönemdesiniz. Sermaye koruma öncelikli hale gelmelidir. Ancak enflasyon riski göz önünde bulundurularak tamamen risksiz yatırımlara yönelmek de sakıncalı olabilir.',
            implication: 'Muhafazakar ağırlıklı, kısmen büyüme odaklı portföy önerilir.',
            riskImpact: 'cautious'
        },
        d: {
            answer: '65 yaş üzeri',
            evaluation: 'Emeklilik döneminde sermaye koruma ve düzenli gelir elde etme ön plana çıkar. Likidite ihtiyacı yüksek olabilir. Risk toleransı düşük tutulmalıdır.',
            implication: 'Düşük riskli, gelir odaklı, yüksek likiditeye sahip portföy önerilir.',
            riskImpact: 'conservative'
        }
    },

    // Soru 3 - Eğitim değerlendirmeleri
    q3: {
        a: {
            answer: 'İlköğretim/Ortaöğretim',
            evaluation: 'Finansal okuryazarlık düzeyinizi artırmak için eğitim materyalleri faydalı olabilir. Basit ve anlaşılır yatırım araçları tercih edilmelidir.',
            implication: 'Kolay anlaşılır, düşük karmaşıklıkta fonlar önerilir.',
            riskImpact: 'conservative'
        },
        b: {
            answer: 'Lise',
            evaluation: 'Temel finansal kavramları anlama kapasitesine sahipsiniz. Çeşitlendirilmiş fon ürünleri uygun olabilir.',
            implication: 'Standart yatırım fonları ve dengeli portföyler önerilir.',
            riskImpact: 'neutral'
        },
        c: {
            answer: 'Lisans',
            evaluation: 'Yüksek öğrenim düzeyiniz, karmaşık finansal ürünleri anlama kapasitenizi artırır. Daha sofistike yatırım stratejileri değerlendirilebilir.',
            implication: 'Çeşitlendirilmiş ve dinamik portföy stratejileri uygulanabilir.',
            riskImpact: 'neutral'
        },
        d: {
            answer: 'Lisansüstü',
            evaluation: 'İleri düzey analitik yetenekleriniz, karmaşık yatırım stratejilerini değerlendirmenize olanak tanır. Sofistike portföy yönetimi yaklaşımları uygulanabilir.',
            implication: 'Gelişmiş yatırım stratejileri ve çoklu varlık sınıfları değerlendirilebilir.',
            riskImpact: 'positive'
        }
    },

    // Soru 4 - Gelir değerlendirmeleri
    q4: {
        a: {
            answer: '250.000 TL altı',
            evaluation: 'Mevcut gelir düzeyiniz, büyük kayıpları tolere etme kapasitenizi sınırlandırabilir. Sermaye koruma öncelikli yaklaşım önerilir.',
            implication: 'Düşük riskli, istikrarlı getiri sağlayan fonlar tercih edilmeli.',
            riskImpact: 'conservative'
        },
        b: {
            answer: '250.000 - 500.000 TL',
            evaluation: 'Orta düzey gelir, düzenli tasarruf yapabilme imkanı sağlar. Ancak büyük kayıplar yaşam standardınızı etkileyebilir.',
            implication: 'Dengeli risk-getiri profili, orta vadeli hedefler için uygun.',
            riskImpact: 'neutral'
        },
        c: {
            answer: '500.000 - 1.000.000 TL',
            evaluation: 'Yüksek gelir düzeyiniz, olası kayıpları telafi etme kapasitenizi artırır. Daha yüksek risk alabilecek finansal esnekliğe sahipsiniz.',
            implication: 'Büyüme odaklı stratejiler ve çeşitlendirilmiş portföy yapısı uygun.',
            riskImpact: 'positive'
        },
        d: {
            answer: '1.000.000 TL üzeri',
            evaluation: 'Yüksek gelir düzeyiniz, geniş yatırım seçenekleri ve risk alma kapasitesi sağlar. Profesyonel portföy yönetimi değerlendirilebilir.',
            implication: 'Sofistike yatırım stratejileri ve özel portföy yönetimi hizmetleri uygun.',
            riskImpact: 'positive'
        }
    },

    // Soru 5 - Finansal varlık değerlendirmeleri
    q5: {
        a: {
            answer: '100.000 TL altı',
            evaluation: 'Mevcut varlık düzeyiniz, sermaye koruma odaklı yaklaşımı gerektirir. Küçük kayıplar bile portföyünüzü önemli ölçüde etkileyebilir.',
            implication: 'Düşük volatiliteli, likit ve güvenli yatırımlar önceliklendirilmeli.',
            riskImpact: 'conservative'
        },
        b: {
            answer: '100.000 - 500.000 TL',
            evaluation: 'Orta düzey varlık birikimi, çeşitlendirme imkanı sağlar. Farklı risk seviyelerinde fonlara yatırım yapılabilir.',
            implication: 'Dengeli portföy dağılımı ve orta vadeli hedefler uygun.',
            riskImpact: 'neutral'
        },
        c: {
            answer: '500.000 - 1.000.000 TL',
            evaluation: 'Önemli varlık birikiminiz, geniş çeşitlendirme ve profesyonel yönetim imkanı sunar. Risk toleransı daha yüksek olabilir.',
            implication: 'Çoklu varlık sınıfı stratejileri ve büyüme odaklı fonlar değerlendirilebilir.',
            riskImpact: 'positive'
        },
        d: {
            answer: '1.000.000 TL üzeri',
            evaluation: 'Yüksek varlık düzeyiniz, geniş yatırım evrenine erişim ve risk dağıtımı imkanı sağlar. Özel portföy yönetimi hizmetleri değerlendirilebilir.',
            implication: 'Özel portföy yönetimi ve alternatif yatırım stratejileri uygun.',
            riskImpact: 'positive'
        }
    },

    // Soru 6 - Yatırım deneyimi değerlendirmeleri
    q6: {
        a: {
            answer: 'Anaparadan kayıp yaşamayı asla istemem',
            evaluation: 'Çok düşük risk toleransına sahipsiniz. Sermaye koruma mutlak önceliktir. Bu yaklaşım, düşük getiri beklentisi anlamına gelebilir.',
            implication: 'Para piyasası ve kısa vadeli sabit getirili fonlar ağırlıklı portföy.',
            riskImpact: 'conservative'
        },
        b: {
            answer: 'Düşük miktar kayıp göze alırım',
            evaluation: 'Sınırlı risk toleransınız var. Küçük dalgalanmaları kabul edebilirsiniz ancak büyük kayıplar kabul edilemez.',
            implication: 'Ağırlıklı olarak düşük riskli, kısmen orta riskli fonlar içeren portföy.',
            riskImpact: 'cautious'
        },
        c: {
            answer: 'Orta düzeyde deneyim (3-5 yıl)',
            evaluation: 'Orta düzey yatırım deneyiminiz, piyasa döngülerini anlama kapasitenizi artırır. Dengeli risk yaklaşımı uygundur.',
            implication: 'Çeşitlendirilmiş portföy, farklı risk seviyelerinde fonlar.',
            riskImpact: 'neutral'
        },
        d: {
            answer: 'Yüksek getiri için yüksek risk alabilirim',
            evaluation: 'Yüksek risk toleransına sahipsiniz. Piyasa dalgalanmalarını kabul ederek uzun vadeli yüksek getiri hedefliyorsunuz.',
            implication: 'Hisse senedi ağırlıklı, büyüme odaklı agresif portföy.',
            riskImpact: 'aggressive'
        }
    },

    // Soru 7 - Risk toleransı (KRİTİK)
    q7: {
        low: {
            answer: 'Hemen satıp güvenli yerlere yatırırım',
            evaluation: 'Kayıp karşısında hızlı tepki verme eğiliminiz var. Bu, panik satışlarına yol açabilir ve uzun vadeli getirileri olumsuz etkileyebilir.',
            implication: 'Düşük volatiliteli fonlar ve kademeli yatırım stratejisi önerilir.',
            riskImpact: 'conservative',
            behavioralNote: 'Zarar aversion (kayıptan kaçınma) eğilimi yüksek.'
        },
        medium: {
            answer: 'Hiçbir şey yapmam, beklerim',
            evaluation: 'Disiplinli bir yatırımcı profiliniz var. Kısa vadeli dalgalanmalarda sakin kalabiliyorsunuz. Bu, uzun vadeli yatırım başarısı için önemli bir özelliktir.',
            implication: 'Dengeli portföy yapısı, orta-uzun vadeli yatırım ufku.',
            riskImpact: 'neutral',
            behavioralNote: 'Duygusal karar vermekten kaçınma eğilimi olumlu.'
        },
        high: {
            answer: 'Daha fazla alım yaparım',
            evaluation: 'Contrarian (karşıt) yatırımcı eğiliminiz var. Düşüşleri fırsat olarak değerlendiriyorsunuz. Bu strateji yüksek getiri potansiyeli sunar ancak disiplin gerektirir.',
            implication: 'Aktif yönetilen, değer odaklı ve büyüme fonları uygun.',
            riskImpact: 'aggressive',
            behavioralNote: 'Fırsat odaklı, risk seven yatırımcı profili.'
        }
    },

    // Soru 8 - Varlık tercihi
    q8: {
        low: {
            answer: 'Türk Lirası (TL)',
            evaluation: 'Yerel para birimi tercihiiniz, kur riski almak istemediğinizi gösterir. Ancak enflasyon riski göz önünde bulundurulmalıdır.',
            implication: 'TL bazlı para piyasası ve kira sertifikası fonları ağırlıklı.',
            riskImpact: 'conservative'
        },
        medium_low: {
            answer: 'Döviz (Dolar/Euro)',
            evaluation: 'Döviz tercihiniz, TL değer kaybı riskinden korunma isteğinizi gösterir. Kur dalgalanmaları portföy değerini etkileyebilir.',
            implication: 'Döviz bazlı fonlar ve yabancı para varlıkları içeren portföy.',
            riskImpact: 'neutral'
        },
        medium_high: {
            answer: 'Altın ve Kıymetli Madenler',
            evaluation: 'Güvenli liman tercihiiniz, enflasyon ve ekonomik belirsizliklere karşı koruma arayışınızı gösterir. Altın, portföy çeşitlendirmesi için önemli bir varlık sınıfıdır.',
            implication: 'Altın katılım fonları ve kıymetli maden fonları.',
            riskImpact: 'neutral'
        },
        high: {
            answer: 'Çeşitlendirilmiş (Tümü)',
            evaluation: 'Sofistike yatırımcı yaklaşımınız, modern portföy teorisine uygun çeşitlendirme prensibini benimsediğinizi gösterir.',
            implication: 'Çoklu varlık sınıfı fonları ve optimal portföy dağılımı.',
            riskImpact: 'positive'
        }
    },

    // Soru 9 - Yatırım stili
    q9: {
        low: {
            answer: 'Güvenli Tarafta Kalırım',
            evaluation: 'Muhafazakar yatırım yaklaşımınız, sermaye korumayı ön planda tutar. Düşük volatilite ve istikrarlı getiri tercih ediyorsunuz.',
            implication: 'Düşük riskli fonlar, para piyasası ve kira sertifikaları ağırlıklı.',
            riskImpact: 'conservative'
        },
        medium: {
            answer: 'Dengeli Yaklaşım',
            evaluation: 'Risk ve getiri dengesini gözeten yaklaşımınız, optimal portföy yapısı için uygundur. Makul risk karşılığında makul getiri hedefliyorsunuz.',
            implication: 'Dengeli fonlar, çeşitlendirilmiş varlık dağılımı.',
            riskImpact: 'neutral'
        },
        high: {
            answer: 'Fırsatçı Yaklaşım',
            evaluation: 'Agresif yatırım stratejiniz, yüksek getiri potansiyeli hedefler. Piyasa fırsatlarını değerlendirmek için yüksek risk almayı kabul ediyorsunuz.',
            implication: 'Hisse senedi fonları, sektörel fonlar ve dinamik portföy yönetimi.',
            riskImpact: 'aggressive'
        }
    },

    // Soru 10 - Risk slider
    q10: {
        getEvaluation: function(sliderValue) {
            if (sliderValue <= 25) {
                return {
                    answer: `%${sliderValue} riskli varlık`,
                    evaluation: 'Çok muhafazakar bir risk tercihi belirlediniz. Portföyünüzün büyük çoğunluğu güvenli varlıklardan oluşmalı.',
                    implication: 'Para piyasası ve kısa vadeli kira sertifikaları ağırlıklı portföy.',
                    riskImpact: 'conservative',
                    riskLevel: 'Düşük Risk'
                };
            } else if (sliderValue <= 50) {
                return {
                    answer: `%${sliderValue} riskli varlık`,
                    evaluation: 'Orta-düşük risk tercihiniz, dengeli ama temkinli bir yaklaşımı yansıtır.',
                    implication: 'Ağırlıklı sabit getirili, kısmen değişken gelirli fonlar.',
                    riskImpact: 'cautious',
                    riskLevel: 'Orta-Düşük Risk'
                };
            } else if (sliderValue <= 75) {
                return {
                    answer: `%${sliderValue} riskli varlık`,
                    evaluation: 'Dengeli-yüksek risk tercihiniz, büyüme potansiyelini önceliklendirdiğinizi gösterir.',
                    implication: 'Dengeli fonlar ve hisse senedi fonları karışımı.',
                    riskImpact: 'neutral',
                    riskLevel: 'Orta-Yüksek Risk'
                };
            } else {
                return {
                    answer: `%${sliderValue} riskli varlık`,
                    evaluation: 'Agresif risk tercihiniz, yüksek getiri hedefiyle yüksek volatiliteyi kabul ettiğinizi gösterir.',
                    implication: 'Hisse senedi ağırlıklı, büyüme odaklı portföy.',
                    riskImpact: 'aggressive',
                    riskLevel: 'Yüksek Risk'
                };
            }
        }
    },

    // Soru 13 - Senaryo 1: Piyasa Dalgalanması (KRİTİK)
    q13: {
        low: {
            answer: 'Portföyümü bozarıp güvende kalırım',
            evaluation: 'Piyasa stresi altında hızlı çıkış stratejisi tercih ediyorsunuz. Bu, duygusal karar verme eğilimini gösterebilir ve uzun vadeli getirileri olumsuz etkileyebilir.',
            implication: 'Düşük volatiliteli, likit fonlar tercih edilmeli. Stop-loss stratejileri uygulanmalı.',
            riskImpact: 'conservative',
            behavioralInsight: 'Kayıp aversion yüksek, psikolojik direnç düşük.'
        },
        medium: {
            answer: 'Hiçbir işlem yapmam, planımda sadık kalırım',
            evaluation: 'Disiplinli ve sabırlı bir yatırımcı profiliniz var. Kısa vadeli dalgalanmalardan etkilenmeden uzun vadeli hedeflerinize odaklanabiliyorsunuz.',
            implication: 'Uzun vadeli stratejiler ve düzenli yatırım planları uygun.',
            riskImpact: 'neutral',
            behavioralInsight: 'Duygusal kontrol yüksek, plana bağlılık güçlü.'
        },
        high: {
            answer: 'Düşüşü fırsat olarak daha fazla yatırım yaparım',
            evaluation: 'Contrarian (karşıt) yatırımcı stratejisi benimsiyorsunuz. Düşüşlerde alım yapmak, uzun vadede yüksek getiri potansiyeli sunar ancak psikolojik dayanıklılık gerektirir.',
            implication: 'Değer odaklı fonlar, düşüşlerde alım fırsatları değerlendirilmeli.',
            riskImpact: 'aggressive',
            behavioralInsight: 'Fırsat odaklı, risk toleransı yüksek, deneyimli yatırımcı.'
        }
    },

    // Soru 14 - Senaryo 2: Acil Nakit İhtiyacı
    q14: {
        low: {
            answer: 'Zararına gönerek yatırımlarımı bozarım',
            evaluation: 'Acil durumlar için yatırımlarınızı likit tutma eğiliminiz düşük. Bu, beklenmedik durumlar için finansal kırılganlık oluşturabilir.',
            implication: 'Portföyde acil durum rezervi bulundurulmalı. Likit fonlar oranı artırılmalı.',
            riskImpact: 'conservative',
            liquidityNote: 'Acil durum fonu oluşturulması kritik öneme sahip.'
        },
        medium: {
            answer: 'Likit ve güvenli enstrümanlar bulundurum',
            evaluation: 'Finansal planlamanızda acil durum rezervi düşüncesi mevcut. Bu, sağlıklı bir finansal yaklaşımdır.',
            implication: 'Portföyde likidite dengesini koruyarak yatırım yapılmalı.',
            riskImpact: 'neutral',
            liquidityNote: 'Dengeli likidite yönetimi mevcut.'
        },
        high: {
            answer: 'Kredi alarak yatırımlarımı bozmamayı tercih ederim',
            evaluation: 'Yatırımlarınızı koruma kararlılığınız yüksek. Ancak kredi maliyetleri, yatırım getirilerini aşabilir. Bu strateji dikkatli değerlendirilmeli.',
            implication: 'Uzun vadeli yatırım perspektifi, portföy koruma öncelikli.',
            riskImpact: 'aggressive',
            liquidityNote: 'Yüksek yatırım kararlılığı, finansal esneklik analizi gerekli.'
        }
    },

    // Soru 15 - Senaryo 3: Yatırım Fırsatı (KRİTİK)
    q15: {
        low: {
            answer: 'Kesinlikle reddederim',
            evaluation: 'Spekülatif yatırımlardan kaçınma eğiliminiz yüksek. Bu, sermaye koruma odaklı muhafazakar yaklaşımınızı gösterir.',
            implication: 'Düşük riskli, kanıtlanmış performansa sahip fonlar tercih edilmeli.',
            riskImpact: 'conservative',
            opportunityNote: 'Fırsat maliyeti: Potansiyel yüksek getirileri kaçırma riski.'
        },
        medium: {
            answer: 'Temkinliyim, belki daha küçük tutarla',
            evaluation: 'Ölçülü risk alma eğiliminiz, portföy yönetiminde sağlıklı bir yaklaşımdır. Fırsatları değerlendirirken riski sınırlı tutuyorsunuz.',
            implication: 'Çeşitlendirilmiş portföy, kademeli risk artışı stratejisi.',
            riskImpact: 'neutral',
            opportunityNote: 'Dengeli yaklaşım: Risk/getiri optimizasyonu sağlanıyor.'
        },
        high: {
            answer: 'Risk alarak katılırım, fırsatı kaçırmak istemem',
            evaluation: 'FOMO (Fear of Missing Out) eğilimi veya yüksek risk toleransı. Bu yaklaşım yüksek getiri potansiyeli sunar ancak büyük kayıplara da yol açabilir.',
            implication: 'Agresif fonlar, sektörel ve tematik yatırımlar değerlendirilebilir.',
            riskImpact: 'aggressive',
            opportunityNote: 'Dikkat: Spekülatif yatırımlarda portföy oranı sınırlı tutulmalı.'
        }
    },

    // Risk profili özet değerlendirmeleri
    profileSummaries: {
        low: {
            title: 'Sağlamcı (Muhafazakar)',
            description: 'Yatırımlarınızda sağlamcısınız, düşük riskli ürünlere yatırım yaparsınız. Olabildiğince riskten kaçınır, riskli ürünlere göre daha az ama düzenli getiri sağlamak istersiniz.',
            riskScore: '2/7',
            color: '#28a745',
            targetReturn: '%5-10 yıllık',
            maxVolatility: '%10',
            timeHorizon: 'Kısa-Orta Vade (1-3 yıl)',
            assetAllocation: {
                'Para Piyasası': '40-60%',
                'Kira Sertifikaları': '25-35%',
                'Altın': '10-20%',
                'Hisse Senedi': '0-10%'
            }
        },
        medium: {
            title: 'Temkinli (Dengeli)',
            description: 'Yatırımlarınızda temkinlisiniz, riskli ürünlere makul ölçüde yatırım yaparak portföyünüzü kontrollü olarak büyütmek istiyorsunuz.',
            riskScore: '4/7',
            color: '#ffc107',
            targetReturn: '%10-20 yıllık',
            maxVolatility: '%20',
            timeHorizon: 'Orta Vade (3-5 yıl)',
            assetAllocation: {
                'Para Piyasası': '20-30%',
                'Kira Sertifikaları': '20-30%',
                'Altın': '15-25%',
                'Hisse Senedi': '15-25%',
                'Dengeli Fonlar': '10-20%'
            }
        },
        high: {
            title: 'Agresif (Dinamik)',
            description: 'Yatırımlarınızda yüksek getiri beklentisi ile yüksek riskli ürünlere yatırım yaparsınız. Risk almayı seversiniz.',
            riskScore: '6/7',
            color: '#dc3545',
            targetReturn: '%20+ yıllık',
            maxVolatility: '%35',
            timeHorizon: 'Uzun Vade (5+ yıl)',
            assetAllocation: {
                'Hisse Senedi': '40-60%',
                'Altın': '15-25%',
                'Dengeli/Dinamik': '10-20%',
                'Kira Sertifikaları': '10-15%',
                'Para Piyasası': '5-10%'
            }
        }
    },

    // IPS Bölüm başlıkları
    ipsSections: {
        introduction: {
            title: 'Yatırımcı Profili Özeti',
            icon: 'clipboard',
            description: 'Yatırımcının demografik ve finansal durumu'
        },
        objectives: {
            title: 'Yatırım Hedefleri',
            icon: 'crosshairs',
            description: 'Getiri beklentisi ve yatırım amaçları'
        },
        timeHorizon: {
            title: 'Zaman Ufku',
            icon: 'clock',
            description: 'Yatırım süresi ve vade tercihi'
        },
        riskAttitude: {
            title: 'Risk Tutumu',
            icon: 'warning',
            description: 'Risk toleransı ve kayıp kapasitesi'
        },
        liquidity: {
            title: 'Likidite İhtiyacı',
            icon: 'database',
            description: 'Nakit ihtiyacı ve çekim beklentisi'
        },
        assetClasses: {
            title: 'Varlık Sınıfları',
            icon: 'thumbnails',
            description: 'Önerilen yatırım araçları ve dağılım'
        },
        ethical: {
            title: 'Katılım Finans İlkeleri',
            icon: 'heart',
            description: 'Etik yatırım politikası'
        },
        recommendations: {
            title: 'Fon Önerileri',
            icon: 'credit-card',
            description: 'Risk profiline uygun fon seçenekleri'
        }
    }
};

// Yardımcı fonksiyonlar
IPSEvaluations.getQuestionEvaluation = function(questionId, answer, answerText) {
    const q = this[questionId];
    if (!q) return null;

    // Slider için özel işlem
    if (questionId === 'q10' && q.getEvaluation) {
        return q.getEvaluation(parseInt(answer));
    }

    // Text-based matching için (randomized options)
    if (['q7', 'q8', 'q9', 'q13', 'q14', 'q15'].includes(questionId) && answerText) {
        const text = answerText.toLowerCase();

        // Q7 matching
        if (questionId === 'q7') {
            if (text.includes('satıp') || text.includes('güvenli')) return q.low;
            if (text.includes('hiçbir şey') || text.includes('bekle')) return q.medium;
            if (text.includes('daha fazla alım')) return q.high;
        }

        // Q8 matching
        if (questionId === 'q8') {
            if (text.includes('türk lirası') || text.includes('tl')) return q.low;
            if (text.includes('döviz') || text.includes('dolar')) return q.medium_low;
            if (text.includes('altın') || text.includes('kıymetli')) return q.medium_high;
            if (text.includes('çeşitlendirilmiş') || text.includes('tümü')) return q.high;
        }

        // Q9 matching
        if (questionId === 'q9') {
            if (text.includes('güvenli')) return q.low;
            if (text.includes('dengeli')) return q.medium;
            if (text.includes('fırsatçı') || text.includes('fırsat')) return q.high;
        }

        // Q13 matching
        if (questionId === 'q13') {
            if (text.includes('bozar') || text.includes('güvende')) return q.low;
            if (text.includes('hiçbir işlem') || text.includes('planım')) return q.medium;
            if (text.includes('daha fazla') && text.includes('yatırım')) return q.high;
        }

        // Q14 matching
        if (questionId === 'q14') {
            if (text.includes('zararına') || text.includes('bozar')) return q.low;
            if (text.includes('likit') || text.includes('güvenli')) return q.medium;
            if (text.includes('kredi') && text.includes('bozmam')) return q.high;
        }

        // Q15 matching
        if (questionId === 'q15') {
            if (text.includes('redded') || text.includes('atamam')) return q.low;
            if (text.includes('temkinli') || text.includes('küçük')) return q.medium;
            if (text.includes('risk alarak') || text.includes('kaçırmak')) return q.high;
        }
    }

    // Direct answer lookup (a, b, c, d)
    return q[answer] || null;
};

IPSEvaluations.getProfileSummary = function(profileName) {
    return this.profileSummaries[profileName] || this.profileSummaries.medium;
};

// Global'e ekle
if (typeof window !== 'undefined') {
    window.IPSEvaluations = IPSEvaluations;
}
