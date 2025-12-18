risk-profili-anketi-sonuc/:886  GET http://localhost:5500/media/gc0pgbwb/banner-web-aylikfondagilim.png?format=webp 404 (File not found)
 ╔════════════════════════════════════════════════════════════════╗
 ║           SONUÇ SAYFASI - PORTFÖY İNİSİYALİZASYONU           ║
 ╚════════════════════════════════════════════════════════════════╝
 
 
 🔍 PROFİL EŞLEŞME KONTROLÜ:
    Backend profili: low
    Anket profili: low
    Ortalama skor: 16.7
    ✅ Profiller eşleşiyor - Backend sonucu kullanılacak
 
 ╔════════════════════════════════════════════════════════════════╗
 ║        🌐 BACKEND OPTİMİZASYON SONUCU KULLANILACAK            ║
 ╚════════════════════════════════════════════════════════════════╝
 
    Metod: WorstCase_MV
    Risk Profili: low
    Fon Sayısı: 5
    Hesaplama Süresi: 105.54 ms
    Fonlar: KDE:25.10%, KTN:20.18%, KLU:18.40%, KSV:18.31%, KME:18.01%
 
 ✅ CSV verisi yüklendi - Uzunluk: 194512
 ✅ CSV satır sayısı: 1786
 
 🔧 PortfolioOptimizer başlatılıyor...
 ✅ PortfolioOptimizer başarıyla başlatıldı
 
 📦 LocalStorage'dan riskProfiliSonuc yüklendi:
 {
  "surveyAnswers": {
    "investorType": "a",
    "personType": "a",
    "q1": "a",
    "q1_text": "18-35 yaş",
    "q2": "a",
    "q2_text": "1 yıldan kısa",
    "q3": "a",
    "q3_text": "500.000 TL'den az",
    "q4": "a",
    "q4_text": "Düşük ve/veya düzensiz gelir",
    "q5": "a",
    "q5_text": "Hayır, acil durum fonum yok",
    "q6": "a",
    "q6_text": "Hemen satıp daha güvenli bir yatırıma geçerim",
    "q7": "a",
    "q7_text": "Anaparam korunsun, getiri düşük olsa da olur",
    "q8": "a",
    "q8_text": "Yıllık %4 garantili getiri, kayıp riski çok düşük",
    "q9": "a",
    "q9_text": "Çok az deneyimim var, profesyonel yönlendirme isterim",
    "q10": "a",
    "q10_text": "Küçük bir kayıp bile beni ciddi şekilde rahatsız eder",
    "q11": "a",
    "q11_text": "Çok kaygılı olurum, uyuyamam",
    "q12": "c",
    "q12_text": "Tutarım, hatta daha da yükselebileceğini düşünürüm",
    "q13": [
      {
        "value": "b",
        "text": "Tahvil / Kira sertifikası"
      },
      {
        "value": "c",
        "text": "Yatırım fonu / ETF"
      }
    ],
    "q14": [
      {
        "value": "b",
        "text": "Küçük/gelişen ülke hisseleri"
      },
      {
        "value": "c",
        "text": "High-yield (yüksek getirili) tahviller"
      }
    ],
    "q15": "a",
    "q15_text": "Evet, katılım esaslı / faizsiz / ESG uyumlu ürünler tercih ederim",
    "timestamp": "2025-12-13T16:36:00.129Z"
  },
  "riskResult": {
    "profile": "low",
    "score": 12,
    "level": 2,
    "capacityScore": 26,
    "breakdown": {
      "q6": {
        "answer": "a",
        "value": 0,
        "weight": 0.2
      },
      "q7": {
        "answer": "a",
        "value": 10,
        "weight": 0.2
      },
      "q8": {
        "answer": "a",
        "value": 0,
        "weight": 0.15
      },
      "q9": {
        "answer": "a",
        "value": 20,
        "weight": 0.05
      },
      "q10": {
        "answer": "a",
        "value": 0,
        "weight": 0.15
      },
      "q11": {
        "answer": "a",
        "value": 0,
        "weight": 0.15
      },
      "q12": {
        "answer": "c",
        "value": 90,
        "weight": 0.1
      }
    }
  },
  "timestamp": "2025-12-13T16:36:00.130Z",
  "risk": {
    "score": 0.375,
    "bucket": "dengeli",
    "rationale": "Ağırlıklı risk skoru 0.38; risk grubu dengeli."
  },
  "ips_sections": {
    "profil": "Dengeli bir yatırımcı profiline sahipsiniz. Orta düzeyde risk alabilirsiniz.",
    "kisitlar": "Risk profilinize göre, yüksek riskli yatırımlar için uygun olmayabilirsiniz. Yasal düzenlemeler gereği, yatırım kararlarınızın sizin sorumluluğunuzda olduğunu ve finansal durumunuzu dikkate almanız gerektiğini hatırlatırız.",
    "strateji": "Portföyünüz hisse senetleri (%40), tahviller (%50) ve nakit (%10) arasında dağıtılmıştır. Hisse senetleri büyüme potansiyeli sunarken, tahviller istikrar ve gelir sağlar. Nakit, likidite ve piyasadaki düşüşlerden yararlanma fırsatları sağlar. Kazanç durumundaki tepkiniz nedeniyle hisse senedi tahsisatı dengeli bir yaklaşımı yansıtacak şekilde ayarlanmıştır.",
    "yasal_uyarilar": "q12 cevabınız doğrulama ile güncellenmiştir ve bu durum risk profilinizi etkileyebilir. Diğer cevaplarınız dengeli bir yatırımcı profiline işaret ederken, kazanç durumundaki tepkiniz daha riskli bir yaklaşım göstermektedir. Bu durum, yatırım kararlarınızda dikkatli olmanız gerektiğini gösterir. Risk profiliniz dengeli olarak belirlenmiştir ve orta düzeyde risk alabilen yatırımcılar için uygundur.",
    "ek_notlar": "Yatırım kararlarınızda dikkatli olmanız ve risk toleransınızı göz önünde bulundurmanız önemlidir."
  },
  "update_note": "Cevabınız doğrulama ile güncellendi ve risk profiliniz yeniden hesaplandı.",
  "conflictResolved": true,
  "expert_content": {
    "investor_profile": {
      "summary": "Sayın yatırımcı, anket sonuçlarınız genel olarak temkinli ve riskten kaçınan bir profil çizmektedir. Kısa vadeli yatırım hedefiniz ve düşük risk toleransınız, İslami finans prensiplerine uygun, güvenli yatırım araçlarına yönelmenizi gerektirmektedir.",
      "demographics_analysis": "Yaşınızın genç olması (18-35 yaş aralığı) uzun vadede daha yüksek getiri potansiyeli olan yatırımlara yönelmek için zamanınız olduğunu gösterse de, mevcut gelir ve varlık durumunuz, kısa vadeli yatırım hedefiniz ve riskten kaçınma eğiliminiz nedeniyle daha muhafazakar bir yaklaşım benimsemek daha uygun olacaktır. Finansal yükümlülüklerinizin olması ve acil durum fonunuzun bulunmaması da risk alımınızı sınırlayan faktörlerdir.",
      "investment_personality": "Siz, yatırımlarınızda öncelikle anaparanızı korumayı ve istikrarlı getiri elde etmeyi hedefleyen, riskten kaçınan bir yatırımcısınız. Yatırım kararlarınızda duygusal tepkilerden kaçınmaya çalışıyor ve profesyonel yönlendirmeye ihtiyaç duyuyorsunuz.",
      "strengths": [
        "Riskten kaçınma eğilimi",
        "Profesyonel yönlendirme isteği",
        "Kazançları realize etme isteği"
      ],
      "attention_points":
 
 
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🌐 BACKEND SONUCU İLE riskProfiliSonuc OLUŞTURULUYOR
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
    ✅ KDE: CSV'den gerçek veriler kullanılıyor
    ✅ KTN: CSV'den gerçek veriler kullanılıyor
    ✅ KLU: CSV'den gerçek veriler kullanılıyor
    ✅ KSV: CSV'den gerçek veriler kullanılıyor
    ✅ KME: CSV'den gerçek veriler kullanılıyor
 
 ✅ Backend sonucu ile riskProfiliSonuc oluşturuldu:
    Metod: WorstCase_MV
    Fonlar: KDE:25.10%, KTN:20.18%, KLU:18.40%, KSV:18.31%, KME:18.01%
 
 🔄 Anket cevapları bulundu. Mevcut riskProfiliSonuc üzerine yeniden hesaplama yapılacak:
 {
  "investorType": "a",
  "personType": "a",
  "q1": "a",
  "q1_text": "18-35 yaş",
  "q2": "a",
  "q2_text": "1 yıldan kısa",
  "q3": "a",
  "q3_text": "500.000 TL'den az",
  "q4": "a",
  "q4_text": "Düşük ve/veya düzensiz gelir",
  "q5": "a",
  "q5_text": "Hayır, acil durum fonum yok",
  "q6": "a",
  "q6_text": "Hemen satıp daha güvenli bir yatırıma geçerim",
  "q7": "a",
  "q7_text": "Anaparam korunsun, getiri düşük olsa da olur",
  "q8": "a",
  "q8_text": "Yıllık %4 garantili getiri, kayıp riski çok düşük",
  "q9": "a",
  "q9_text": "Çok az deneyimim var, profesyonel yönlendirme isterim",
  "q10": "a",
  "q10_text": "Küçük bir kayıp bile beni ciddi şekilde rahatsız eder",
  "q11": "a",
  "q11_text": "Çok kaygılı olurum, uyuyamam",
  "q12": "c",
  "q12_text": "Tutarım, hatta daha da yükselebileceğini düşünürüm",
  "q13": [
    {
      "value": "b",
      "text": "Tahvil / Kira sertifikası"
    },
    {
      "value": "c",
      "text": "Yatırım fonu / ETF"
    }
  ],
  "q14": [
    {
      "value": "b",
      "text": "Küçük/gelişen ülke hisseleri"
    },
    {
      "value": "c",
      "text": "High-yield (yüksek getirili) tahviller"
    }
  ],
  "q15": "a",
  "q15_text": "Evet, katılım esaslı / faizsiz / ESG uyumlu ürünler tercih ederim",
  "timestamp": "2025-12-13T16:36:00.129Z"
}
 
 === RİSK PROFİLİ HESAPLAMA (YENİ ANKET) ===
 {
  "investorType": "a",
  "personType": "a",
  "q1": "a",
  "q1_text": "18-35 yaş",
  "q2": "a",
  "q2_text": "1 yıldan kısa",
  "q3": "a",
  "q3_text": "500.000 TL'den az",
  "q4": "a",
  "q4_text": "Düşük ve/veya düzensiz gelir",
  "q5": "a",
  "q5_text": "Hayır, acil durum fonum yok",
  "q6": "a",
  "q6_text": "Hemen satıp daha güvenli bir yatırıma geçerim",
  "q7": "a",
  "q7_text": "Anaparam korunsun, getiri düşük olsa da olur",
  "q8": "a",
  "q8_text": "Yıllık %4 garantili getiri, kayıp riski çok düşük",
  "q9": "a",
  "q9_text": "Çok az deneyimim var, profesyonel yönlendirme isterim",
  "q10": "a",
  "q10_text": "Küçük bir kayıp bile beni ciddi şekilde rahatsız eder",
  "q11": "a",
  "q11_text": "Çok kaygılı olurum, uyuyamam",
  "q12": "c",
  "q12_text": "Tutarım, hatta daha da yükselebileceğini düşünürüm",
  "q13": [
    {
      "value": "b",
      "text": "Tahvil / Kira sertifikası"
    },
    {
      "value": "c",
      "text": "Yatırım fonu / ETF"
    }
  ],
  "q14": [
    {
      "value": "b",
      "text": "Küçük/gelişen ülke hisseleri"
    },
    {
      "value": "c",
      "text": "High-yield (yüksek getirili) tahviller"
    }
  ],
  "q15": "a",
  "q15_text": "Evet, katılım esaslı / faizsiz / ESG uyumlu ürünler tercih ederim",
  "timestamp": "2025-12-13T16:36:00.129Z"
}
 🆚 Karşılaştırma (API vs. Recalculate):
    Mevcut (API/localStorage): 1  | Yeni (Optimizer): 1
 === PORTFOLIO GENERATION START ===
 Risk Profile Input: {profile: 'low', score: 12, level: 2, capacityScore: 26, breakdown: {…}}
 Selected Profile: Düşük Riskli - Muhafazakar
 Target Return: 5.00%
 Max Volatility: 10.00%
 Suitable funds found: 6
 Portfolio funds selected: 5
 🔁 riskProfiliSonuc güncellendi (Optimizer sonucu yerleştirildi).
 {
  "data": {
    "riskProfili": 1,
    "fundCode": "KLU",
    "fundTitle": "KUVEYT TÜRK PORTFÖY PARA PİYASASI KATILIM (TL) FONU",
    "fundRiskSeviyesi": 2,
    "aylikGetiri": 4.32,
    "yillikGetiri": 9.57,
    "fonDagilimData": [
      {
        "name": "KLU",
        "value": 26.448877735633765
      },
      {
        "name": "KSV",
        "value": 26.872212733011246
      },
      {
        "name": "KTV",
        "value": 27.211988557773985
      },
      {
        "name": "KME",
        "value": 12.231115969455278
      },
      {
        "name": "KTN",
        "value": 7.235805004125738
      }
    ],
    "portfolioStatistics": {
      "expectedReturn": 0.3674011101889875,
      "volatility": 0.014016120022624637,
      "sharpeRatio": 15.510791134640794,
      "maxDrawdown": 0.0007305918581490681,
      "diversificationScore": "Yüksek"
    },
    "allRecommendations": [
      {
        "code": "KLU",
        "name": "KUVEYT TÜRK PORTFÖY PARA PİYASASI KATILIM (TL) FONU",
        "allocation": "26.45%",
        "category": "Para Piyasası",
        "riskLevel": 1,
        "monthlyReturn": "4.32%",
        "yearlyReturn": "9.57%",
        "sharpeRatio": "16.28",
        "currentPrice": "3.627618",
        "reason": "Yüksek risk-ayarlı getiri, Düşük volatilite, Hedef üstü getiri, Likidite sağlama"
      },
      {
        "code": "KSV",
        "name": "KUVEYT TÜRK PORTFÖY KISA VADELİ KATILIM SERBEST (TL) FON",
        "allocation": "26.87%",
        "category": "Kısa Vadeli",
        "riskLevel": 1,
        "monthlyReturn": "4.35%",
        "yearlyReturn": "9.60%",
        "sharpeRatio": "16.54",
        "currentPrice": "4.361677",
        "reason": "Yüksek risk-ayarlı getiri, Düşük volatilite, Hedef üstü getiri, Likidite sağlama"
      },
      {
        "code": "KTV",
        "name": "KUVEYT TÜRK PORTFÖY KISA VADELİ KİRA SERTİFİKALARI KATILIM (TL) FONU",
        "allocation": "27.21%",
        "category": "Kira Sertifikaları",
        "riskLevel": 2,
        "monthlyReturn": "4.46%",
        "yearlyReturn": "9.78%",
        "sharpeRatio": "16.75",
        "currentPrice": "5.832392",
        "reason": "Yüksek risk-ayarlı getiri, Düşük volatilite, Hedef üstü getiri"
      },
      {
        "code": "KME",
        "name": "KUVEYT TÜRK PORTFÖY TEMKİNLİ KATILIM FONU",
        "allocation": "12.23%",
        "category": "Temkinli",
        "riskLevel": 2,
        "monthlyReturn": "3.74%",
        "yearlyReturn": "9.73%",
        "sharpeRatio": "7.53",
        "currentPrice": "1.211365",
        "reason": "Yüksek risk-ayarlı getiri, Düşük volatilite, Hedef üstü getiri"
      },
      {
        "code": "KTN",
        "name": "KUVEYT TÜRK PORTFÖY KİRA SERTİFİKALARI KATILIM (TL) FONU",
        "allocation": "7.24%",
        "category": "Kira Sertifikaları",
        "riskLevel": 2,
        "monthlyReturn": "3.72%",
        "yearlyReturn": "8.92%",
        "sharpeRatio": "4.45",
        "currentPrice": "6.283019",
        "reason": "Yüksek risk-ayarlı getiri, Düşük volatilite, Hedef üstü getiri"
      }
    ],
    "riskScore": 12,
    "riskBreakdown": {
      "q6": {
        "answer": "a",
        "value": 0,
        "weight": 0.2
      },
      "q7": {
        "answer": "a",
        "value": 10,
        "weight": 0.2
      },
      "q8": {
        "answer": "a",
        "value": 0,
        "weight": 0.15
      },
      "q9": {
        "answer": "a",
        "value": 20,
        "weight": 0.05
      },
      "q10": {
        "answer": "a",
        "value": 0,
        "weight": 0.15
      },
      "q11": {
        "answer": "a",
        "value": 0,
        "weight": 0.15
      },
      "q12": {
        "answer": "c",
        "value": 90,
        "weight": 0.1
      }
    }
  }
}
 
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🌐 BACKEND OPTİMİZASYON SONUCU KULLANILIYOR
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
    📊 KDE: CSV'den gerçek veriler kullanılıyor
       Kategori: Dengeli
       Risk Seviyesi: 3/7
       Aylık Getiri: 2.74%
       Yıllık Getiri: 7.65%
    📊 KTN: CSV'den gerçek veriler kullanılıyor
       Kategori: Kira Sertifikaları
       Risk Seviyesi: 2/7
       Aylık Getiri: 3.72%
       Yıllık Getiri: 8.92%
    📊 KLU: CSV'den gerçek veriler kullanılıyor
       Kategori: Para Piyasası
       Risk Seviyesi: 1/7
       Aylık Getiri: 4.32%
       Yıllık Getiri: 9.57%
    📊 KSV: CSV'den gerçek veriler kullanılıyor
       Kategori: Kısa Vadeli
       Risk Seviyesi: 1/7
       Aylık Getiri: 4.35%
       Yıllık Getiri: 9.60%
    📊 KME: CSV'den gerçek veriler kullanılıyor
       Kategori: Temkinli
       Risk Seviyesi: 2/7
       Aylık Getiri: 3.74%
       Yıllık Getiri: 9.73%
 
 ✅ Backend sonucu riskProfiliSonuc formatına dönüştürüldü
    Metod: WorstCase_MV
    Fon Sayısı: 5
    CSV eşleştirmesi: Her fon için gerçek kategori ve risk seviyesi kullanıldı
 
 Processing riskProfiliSonuc data...
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 📊 VERİ İŞLEME - SONUÇ SAYFASI HAZIRLANIYOR
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
 📈 Ana Veriler:
    Risk Profili Numarası: 1 (1=Sağlamcı, 2=Temkinli, 3=Agresif)
    Fon Kodu: KDE
    Fon Başlığı: KUVEYT TÜRK PORTFÖY DENGELİ KATILIM FONU
    Risk Seviyesi: 3/7
    Aylık Getiri: 2.73944722939101
    Yıllık Getiri: 7.645541619660675
 
 📊 Fon Dağılımı:
    - KDE: 25.10%
    - KTN: 20.18%
    - KLU: 18.40%
    - KSV: 18.31%
    - KME: 18.01%
 
 🎨 PROFİL GÖRÜNÜMÜ AYARLANIYOR...
    ✅ SAĞLAMCI profil gösteriliyor (#saglamci)
 
 Updating fund distribution list with data: (5) [{…}, {…}, {…}, {…}, {…}]
 Fund distribution list updated
 Creating doughnut chart...
risk-profili-anketi-sonuc/:1728 Chart created successfully
risk-profili-anketi-sonuc/:1736 Portfolio Statistics: {expectedReturn: 0.345327, volatility: 0.026105, sharpeRatio: 13.2284, diversificationScore: 5}
risk-profili-anketi-sonuc/:1737 Expected Annual Return: 34.53%
risk-profili-anketi-sonuc/:1738 Portfolio Volatility: 2.61%
risk-profili-anketi-sonuc/:1739 Sharpe Ratio: 13.23
risk-profili-anketi-sonuc/:1740 Diversification Score: 5
risk-profili-anketi-sonuc/:1745 Complete Portfolio Recommendations:
risk-profili-anketi-sonuc/:1747 KDE (Dengeli): 25.10 - Backend WorstCase_MV optimizasyonu
risk-profili-anketi-sonuc/:1747 KTN (Kira Sertifikaları): 20.18 - Backend WorstCase_MV optimizasyonu
risk-profili-anketi-sonuc/:1747 KLU (Para Piyasası): 18.40 - Backend WorstCase_MV optimizasyonu
risk-profili-anketi-sonuc/:1747 KSV (Kısa Vadeli): 18.31 - Backend WorstCase_MV optimizasyonu
risk-profili-anketi-sonuc/:1747 KME (Temkinli): 18.01 - Backend WorstCase_MV optimizasyonu
risk-profili-anketi-sonuc/:1908 📋 renderIPSReport() çağrıldı
risk-profili-anketi-sonuc/:1924 📋 renderIPSReport - surveyAnswers: object
risk-profili-anketi-sonuc/:1925 📋 renderIPSReport - expertContent: null
risk-profili-anketi-sonuc/:1971 📋 Kapsamlı IPS Rapor oluşturuluyor (v2.0)...
risk-profili-anketi-sonuc/:1972 Survey Answers: 31 soru
risk-profili-anketi-sonuc/:1973 Risk Profile: low
risk-profili-anketi-sonuc/:1974 Portfolio Funds: 5
ips-content-generator.js?v=20251213a:20 [IPS Generator] Profil adı: low
ips-content-generator.js?v=20251213a:21 [IPS Generator] Profil özeti: {name: 'low', assetAllocation: {…}, tacticalRanges: {…}, eligibleCategories: Array(5), restrictedCategories: Array(3)}
ips-report.js?v=20251213a:55 [IPS] Kapsamlı IPS içeriği oluşturuldu: {generatedDate: '2025-12-13T16:36:28.437Z', nextReviewDate: '2026-12-13T16:36:28.437Z', version: '2.0', profileName: 'low', riskScore: 12, …}
ips-report.js?v=20251213a:78 📄 Kapsamlı IPS raporu render ediliyor...
ips-report-renderer.js?v=20251213a:755 [IPS Renderer] Bölüm 6 - Varlık Tahsisi Verisi:
ips-report-renderer.js?v=20251213a:756   strategicAllocation: {
  "title": "6.1 Stratejik Varlık Dağılımı",
  "description": "Risk profilinize uygun önerilen uzun vadeli varlık dağılımı:",
  "allocation": {
    "Para Piyasası Fonları": "40-50%",
    "Kira Sertifikası Fonları": "30-40%",
    "Altın/Kıymetli Maden": "10-15%",
    "Dengeli Fonlar": "0-10%",
    "Hisse Senedi Fonları": "0-5%"
  }
}
ips-report-renderer.js?v=20251213a:757   tacticalRanges: {
  "title": "6.2 Taktik Bantlar",
  "description": "Piyasa koşullarına göre izin verilen sapma aralıkları:",
  "ranges": {
    "Para Piyasası": {
      "min": 35,
      "target": 45,
      "max": 55
    },
    "Kira Sertifikası": {
      "min": 25,
      "target": 35,
      "max": 45
    },
    "Altın": {
      "min": 5,
      "target": 12,
      "max": 20
    },
    "Hisse": {
      "min": 0,
      "target": 3,
      "max": 8
    }
  },
  "rebalancingTrigger": "Herhangi bir varlık sınıfı hedeften %5 saparsa"
}
ips-report-renderer.js?v=20251213a:763   allocation değeri: {Para Piyasası Fonları: '40-50%', Kira Sertifikası Fonları: '30-40%', Altın/Kıymetli Maden: '10-15%', Dengeli Fonlar: '0-10%', Hisse Senedi Fonları: '0-5%'}
ips-report-renderer.js?v=20251213a:764   allocation tipi: object
ips-report-renderer.js?v=20251213a:765   allocation Array mi?: false
ips-report-renderer.js?v=20251213a:798   allocationTable HTML: 
                        <tr>
                            <td><strong>Para Piyasası Fonları</strong></td>
                            <td>40%</td>
                            <td>45%</td>
            ...
ips-report-renderer.js?v=20251213a:803   tacticalRanges değeri: {Para Piyasası: {…}, Kira Sertifikası: {…}, Altın: {…}, Hisse: {…}}
ips-report-renderer.js?v=20251213a:953 [IPS Renderer] Bölüm 7 - Yatırım Evreni Verisi: {section: {…}, content: {…}, eligibleProducts: {…}, restrictedProducts: {…}, productCategories: {…}}
ips-report-renderer.js?v=20251213a:1084 [IPS Renderer] Bölüm 8 - Risk Yönetimi Verisi: {section: {…}, content: {…}, riskMeasures: {…}, riskLimits: {…}}
risk-profili-anketi-sonuc/:1979 ✅ Kapsamlı IPS Rapor başarıyla oluşturuldu!
risk-profili-anketi-sonuc/:1985 📊 IPS Özeti: {profile: 'low', riskScore: 12, hasInconsistencies: true, inconsistencyCount: 1, generatedDate: '2025-12-13T16:36:28.437Z', …}
risk-profili-anketi-sonuc/:1 Access to fetch at 'https://www.kuveytturkportfoy.com.tr/Content/images/logos/logo-10.svg' from origin 'http://localhost:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
uikit.min9dce.js?v=11032025:1  GET https://www.kuveytturkportfoy.com.tr/Content/images/logos/logo-10.svg net::ERR_FAILED 200 (OK)
(anonymous) @ uikit.min9dce.js?v=11032025:1
(anonymous) @ uikit.min9dce.js?v=11032025:1
getSvg @ uikit.min9dce.js?v=11032025:1
await in getSvg
connected @ uikit.min9dce.js?v=11032025:1
(anonymous) @ uikit.min9dce.js?v=11032025:1
ve @ uikit.min9dce.js?v=11032025:1
_s @ uikit.min9dce.js?v=11032025:1
t.$mount @ uikit.min9dce.js?v=11032025:1
Jn @ uikit.min9dce.js?v=11032025:1
n @ uikit.min9dce.js?v=11032025:1
o @ uikit.min9dce.js?v=11032025:1
Ye @ uikit.min9dce.js?v=11032025:1
Oo @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
_t @ uikit.min9dce.js?v=11032025:1
Ao @ uikit.min9dce.js?v=11032025:1
(anonymous) @ uikit.min9dce.js?v=11032025:1
requestAnimationFrame
Nl @ uikit.min9dce.js?v=11032025:1
(anonymous) @ uikit.min9dce.js?v=11032025:1
(anonymous) @ uikit.min9dce.js?v=11032025:1
(anonymous) @ uikit.min9dce.js?v=11032025:1
risk-profili-anketi-sonuc/:1 Access to manifest at 'https://www.kuveytturkportfoy.com.tr/Content/images/favicon/site.webmanifest/' from origin 'http://localhost:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
www.kuveytturkportfoy.com.tr/Content/images/favicon/site.webmanifest/:1  GET https://www.kuveytturkportfoy.com.tr/Content/images/favicon/site.webmanifest/ net::ERR_FAILED 200 (OK)
risk-profili-anketi-sonuc/:905  GET http://localhost:5500/www.google.com/recaptcha/api536a.js?render=6LcyBfAqAAAAABz8l1keVZ39uttnTccul0zEBvaP net::ERR_ABORTED 404 (File not found)
loadAllScripts @ risk-profili-anketi-sonuc/:905
risk-profili-anketi-sonuc/:934  GET http://localhost:5500/bundles.efilli.com/kuveytturkportfoy.com.tr.prod.js net::ERR_ABORTED 404 (File not found)
loadAllScripts @ risk-profili-anketi-sonuc/:934
risk-profili-anketi-sonuc/:920  GET http://localhost:5500/talktomy.site/embed.js net::ERR_ABORTED 404 (File not found)
loadAllScripts @ risk-profili-anketi-sonuc/:920
risk-profili-anketi-sonuc/:918 Talktomy chat unavailable (network/MIME). Continuing without widget.
talktomyScript.onerror @ risk-profili-anketi-sonuc/:918
script
loadAllScripts @ risk-profili-anketi-sonuc/:911
risk-profili-anketi-sonuc/:992  GET http://localhost:5500/connect.facebook.net/en_US/fbevents.js net::ERR_ABORTED 404 (File not found)
(anonymous) @ risk-profili-anketi-sonuc/:992
loadAllScripts @ risk-profili-anketi-sonuc/:993



Detaylı Yatırım Politikası Beyanı (IPS)
Anket cevaplarınızın finansal değerlendirmesi ve risk analizi


Raporu Kapat
 Yatırım Politikası Beyanı

Düzenle

PDF

Yazdır
Kuveyt Türk Portföy
YATIRIM POLİTİKASI BEYANI
Investment Policy Statement (IPS)

Düşük Risk
Risk Skoru: 12/100
Değerlendirme Tarihi: 13 Aralık 2025

Sonraki Gözden Geçirme: 13 Aralık 2026

CFA Institute IPS standartları ve SPK düzenlemelerine uygun olarak hazırlanmıştır.
İçindekiler
 1. Kapsam ve Amaç
1
 2. Yönetişim
2
 3. Yatırım Hedefleri
3
 4. Risk Profili Analizi
4
 5. Kısıtlamalar
5
 6. Varlık Tahsisi Politikası
6
 7. Yatırım Evreni
7
 8. Risk Yönetimi
8
 9. Katılım Finans İlkeleri
9
 10. Davranışsal Bulgular
10
 11. İzleme ve Raporlama
11
 12. Gözden Geçirme ve Onay
12
1. Kapsam ve Amaç

1.1 Beyanın Amacı
Bu Yatırım Politikası Beyanı (IPS), yatırımcının finansal hedeflerini, risk toleransını, yatırım kısıtlamalarını ve portföy yönetimi ilkelerini belirleyen stratejik bir rehber niteliğindedir. Bu beyan, yatırım kararlarının tutarlı, disiplinli ve yatırımcının uzun vadeli çıkarlarına uygun şekilde alınmasını sağlamak amacıyla hazırlanmıştır.

Bu beyanın önemi:
Piyasa dalgalanmalarında duygusal kararları önler
Yatırım stratejisi için nesnel bir referans noktası sağlar
Danışman-yatırımcı ilişkisinde şeffaflık oluşturur
Performans değerlendirmesi için ölçüt belirler
1.2 Yatırımcı Tanımı
Yatırımcı Tipi
Bireysel Yatırımcı
Kişi Türü
Gerçek Kişi
Değerlendirme Tarihi
13 Aralık 2025
Bu IPS, yukarıda tanımlanan Bireysel Yatırımcı için hazırlanmış olup, yatırımcının Kuveyt Türk Portföy nezdindeki tüm yatırım hesaplarını kapsar.

2. Yönetişim

2.1 Sorumluluklar
Rol	Sorumluluk
Gözden Geçirme Takvimi
Periyodik Gözden Geçirme: Yıllık

Tetikleyici Olaylar:

3. Yatırım Hedefleri

3.2 Getiri Hedefi
Hedef Yıllık Getiri
%8-12 yıllık
Getiri Türü
Nominal

3.3 Risk Hedefi
Maksimum Volatilite: %8-10

Maksimum Kayıp Toleransı: -%10

3.4 Yatırım Vadesi
Hedef Vade
1-3 yıl
Likidite İhtiyacı
-
4. Risk Profili Analizi

Genel Risk Profili
-
Düşük Risk
Risk Bileşenleri
Risk Kapasitesi
-
Risk İstekliliği
-
5. Kısıtlamalar

 Likidite Kısıtlamaları
 Zaman Ufku
 Yasal ve Düzenleyici
6. Varlık Tahsisi Politikası

6.1 Stratejik Varlık Dağılımı
Risk profilinize uygun önerilen uzun vadeli varlık dağılımı:

Varlık Sınıfı	Minimum	Hedef	Maksimum
Para Piyasası Fonları	40%	45%	50%
Kira Sertifikası Fonları	30%	35%	40%
Altın/Kıymetli Maden	10%	13%	15%
Dengeli Fonlar	0%	5%	10%
Hisse Senedi Fonları	0%	3%	5%
6.2 Taktik Bantlar
Piyasa koşullarına göre izin verilen sapma aralıkları:

Varlık Sınıfı	Min	Hedef	Max
Para Piyasası	35%	45%	55%
Kira Sertifikası	25%	35%	45%
Altın	5%	12%	20%
Hisse	0%	3%	8%
6.3 Yeniden Dengeleme Politikası
Yöntem: Eşik Bazlı

Tetikleyici: %5 sapma

Sıklık: Çeyreklik kontrol

Süreç:
Aylık portföy değerlendirmesi yapılır
Hedef dağılımdan sapma kontrol edilir
Eşik aşıldığında yeniden dengeleme önerilir
Vergi ve maliyet etkileri değerlendirilir
Yatırımcı onayı ile işlem gerçekleştirilir
Hedef Varlık Dağılımı
7. Yatırım Evreni

7.1 Uygun Yatırım Ürünleri
Risk profilinize uygun Kuveyt Türk Portföy fonları:

Uygun Risk Seviyeleri: 1, 2, 3/7

Uygun
Para Piyasası
Uygun
Kısa Vadeli
Uygun
Kira Sertifikası
Uygun
Temkinli
Uygun
Altın (sınırlı)
7.2 Kısıtlı/Uygun Olmayan Ürünler
Aşağıdaki ürün kategorileri risk profilinize uygun değildir ve önerilmemektedir:

Kısıtlı
Hisse Senedi Yoğun
Kısıtlı
Agresif
Kısıtlı
Sektörel
Kısıtlama Nedenleri: Yüksek volatilite, Risk profiline uyumsuzluk

7.3 Fon Kategorileri
Kategori	Risk Seviyesi	Uygunluk	Açıklama
Para Piyasası Fonları	1/7	Yüksek Uygunluk	Kısa vadeli, düşük volatiliteli, yüksek likidite
Kira Sertifikası Fonları	2/7	Yüksek Uygunluk	Sabit getirili, katılım esaslı, orta vade
Dengeli/Karma Fonlar	3-4/7	Orta Uygunluk	Çeşitlendirilmiş, risk-getiri dengesi
Altın/Kıymetli Maden Fonları	5/7	Tüm Profiller - Çeşitlendirme	Enflasyon koruması, portföy sigortası
Hisse Senedi Fonları	5-6/7	Düşük Uygunluk	Yüksek büyüme potansiyeli, yüksek volatilite
7.4 Fon Seçim Kriterleri
Katılım finans ilkelerine uygunluk (zorunlu)
Risk seviyesinin profil ile uyumu
Geçmiş performans ve Sharpe oranı
Toplam gider oranı (TER)
Fon büyüklüğü ve likidite
Portföy çeşitlendirmesine katkı
8. Risk Yönetimi

8.1 Risk Ölçütleri
Ölçüt	Hedef	Açıklama
Volatilite (Standart Sapma)	%8-10	Portföy getirilerinin yıllık dalgalanma ölçüsü
Maksimum Düşüş (Drawdown)	-%10	Kabul edilebilir maksimum değer kaybı
Sharpe Oranı	> 0.8	Risk-ayarlı getiri performansı
VaR (%95)	-%1.5 günlük	%95 güven düzeyinde günlük risk limiti
8.2 Risk Limitleri
Limit Türü	Değer	Gerekçe
Konsantrasyon Riski	Tek fon maksimum %40	
Volatilite Limiti	Yıllık %20	
Drawdown Limiti	-%10	
9. Katılım Finans İlkeleri

9.1 Temel İlkeler
Faiz içeren tüm enstrümanlar yasaktır. Kira sertifikaları ve katılım esaslı ürünler kullanılır.

Aşırı belirsizlik içeren spekülatif işlemler yapılmaz.

Şans oyunu niteliğinde yatırımlar yapılmaz.

İslami ilkelere aykırı sektörlere yatırım yapılmaz.

Fon Tarama Kriterleri
10. Davranışsal Finans Bulguları

Tespit Edilen Eğilimler
Belirgin bir davranışsal eğilim tespit edilmemiştir.

 Tespit Edilen Tutarsızlıklar
Düşük risk tercihi belirtilmiş ancak davranışsal senaryolarda yüksek risk toleransı gösterilmiş.

11. İzleme ve Raporlama

11.2 Raporlama Takvimi
Performans Raporu
Aylık
Kapsamlı Değerlendirme
Çeyreklik
IPS Gözden Geçirme
Yıllık
Temel Performans Göstergeleri
Gösterge	Hedef	İzleme Sıklığı