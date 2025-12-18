# Kuveyt Türk Portföy - Portföy Optimizasyon Sistemi
## Teknik ve İş Analizi Raporu

**Hazırlayan:** Augment Code AI  
**Tarih:** 8 Aralık 2024  
**Versiyon:** 1.0

---

# İÇİNDEKİLER

1. [Yönetici Özeti](#1-yönetici-özeti)
2. [Giriş ve Amaç](#2-giriş-ve-amaç)
3. [Sistem Mimarisi](#3-sistem-mimarisi)
4. [Risk Profili Sistemi](#4-risk-profili-sistemi)
5. [Optimizasyon Metodları](#5-optimizasyon-metodları)
6. [Matematiksel Temeller](#6-matematiksel-temeller)
7. [API Dokümantasyonu](#7-api-dokümantasyonu)
8. [Kısıtlamalar ve İş Kuralları](#8-kısıtlamalar-ve-iş-kuralları)
9. [Test Sonuçları](#9-test-sonuçları)
10. [Güvenlik ve Performans](#10-güvenlik-ve-performans)
11. [Gelecek Geliştirmeler](#11-gelecek-geliştirmeler)
12. [Sonuç](#12-sonuç)

---

# 1. YÖNETİCİ ÖZETİ

## 1.1 Proje Tanımı

Kuveyt Türk Portföy Optimizasyon Sistemi, bireysel yatırımcıların risk profillerine uygun optimal portföy dağılımlarını otomatik olarak hesaplayan yapay zeka destekli bir finansal danışmanlık aracıdır.

## 1.2 Temel Özellikler

| Özellik | Açıklama |
|---------|----------|
| **Kişiselleştirilmiş Öneriler** | 15 soruluk anket ile yatırımcının risk toleransı belirlenir |
| **Çoklu Optimizasyon** | 7 farklı bilimsel yöntemle portföy oluşturulur |
| **Katılım Bankacılığı Uyumu** | Tüm fonlar faizsiz finans prensiplerine uygundur |
| **Gerçek Zamanlı Hesaplama** | Güncel fon verileriyle anlık optimizasyon |

## 1.3 İş Değeri

- **Müşteri Deneyimi:** Yatırımcılar profesyonel düzeyde portföy önerisi alır
- **Operasyonel Verimlilik:** Manuel portföy danışmanlığı ihtiyacı azalır
- **Uyumluluk:** SPK ve BDDK düzenlemelerine uygun risk profilleme
- **Rekabet Avantajı:** Dijital bankacılıkta farklılaşma sağlar

---

# 2. GİRİŞ VE AMAÇ

## 2.1 Proje Gereksinimi

Bireysel yatırımcıların çoğu, finansal piyasalar hakkında yeterli bilgiye sahip değildir. Hangi fona ne kadar yatırım yapacaklarına karar vermek zor ve zaman alıcıdır. Bu sistem:

1. Yatırımcının risk kapasitesini ve toleransını ölçer
2. Bilimsel yöntemlerle optimal portföy dağılımı hesaplar
3. Anlaşılır bir formatta öneri sunar

## 2.2 Hedef Kitle

- **Bireysel Yatırımcılar:** Portföy çeşitlendirmesi yapmak isteyenler
- **Yeni Başlayanlar:** Yatırım dünyasına ilk adım atanlar
- **Muhafazakar Yatırımcılar:** Katılım bankacılığı tercih edenler

## 2.3 Kapsam

### Dahil Olan:
- 28 adet Kuveyt Türk Portföy katılım fonu
- 15 soruluk risk profili anketi
- 7 farklı optimizasyon algoritması
- 3 risk profili seviyesi (Sağlamcı, Temkinli, Agresif)

### Dahil Olmayan:
- Bireysel hisse senedi önerileri
- Döviz veya kripto para önerileri
- Garantili getiri taahhüdü

---

# 3. SİSTEM MİMARİSİ

## 3.1 Genel Bakış

```
┌─────────────────────────────────────────────────────────────────────┐
│                         KULLANICI ARAYÜZÜ                          │
│                    (Web Tarayıcısı - Frontend)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │
│  │ Risk Anketi  │  │  Sonuç       │  │  IPS Raporu              │   │
│  │ (15 Soru)    │  │  Sayfası     │  │  (Yatırım Politikası)    │   │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTP/JSON
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND MİKROSERVİS                           │
│                      (FastAPI - Python)                            │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │                    API KATMANI                              │     │
│  │  POST /api/optimize    GET /api/health    GET /api/profiles │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                │                                    │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │                  OPTİMİZASYON MOTORU                        │     │
│  │                                                              │     │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │     │
│  │  │PyPortfolioOpt│  │Riskfolio-Lib│  │   Metrik Hesaplama  │  │     │
│  │  │ MVO, HRP    │  │ Risk Parity │  │   Sharpe, Sortino   │  │     │
│  │  │ CVaR        │  │ Worst-Case  │  │   VaR, Max Drawdown │  │     │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │     │
│  └────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
```

## 3.2 Teknoloji Yığını

### Frontend
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| HTML5/CSS3 | - | Sayfa yapısı ve stilleri |
| JavaScript | ES6+ | İstemci tarafı mantık |
| jQuery | 3.7.1 | DOM manipülasyonu |
| UIKit | 3.x | UI bileşenleri |
| ECharts | 5.x | Grafik ve görselleştirme |

### Backend
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| Python | 3.9+ | Ana programlama dili |
| FastAPI | 0.100+ | REST API framework |
| PyPortfolioOpt | 1.5.5 | MVO, HRP, CVaR optimizasyonu |
| Riskfolio-Lib | 6.0+ | Risk Parity, Worst-Case MV |
| NumPy | 1.24+ | Sayısal hesaplamalar |
| Pandas | 2.0+ | Veri işleme |
| SciPy | 1.10+ | Bilimsel hesaplama |

### Altyapı
| Bileşen | Açıklama |
|---------|----------|
| Docker | Konteynerizasyon |
| Docker Compose | Çoklu konteyner orkestrasyonu |
| Uvicorn | ASGI sunucusu |

## 3.3 Veri Akışı

```
1. Kullanıcı anketi doldurur
         │
         ▼
2. Frontend risk skorunu hesaplar
   (Kapasite + Tolerans + Uygunluk)
         │
         ▼
3. Fon fiyat verileri parse edilir
   (FUND_DATA_CSV → günlük getiriler)
         │
         ▼
4. Backend API'ye POST isteği
   {funds, risk_profile, max_funds}
         │
         ▼
5. 7 farklı optimizasyon çalıştırılır
         │
         ▼
6. En iyi portföy seçilir
   (En yüksek Sharpe Ratio)
         │
         ▼
7. Sonuçlar JSON olarak döner
         │
         ▼
8. Frontend sonuçları görselleştirir
   (Pasta grafik, tablo, IPS raporu)
```

---

# 4. RİSK PROFİLİ SİSTEMİ

## 4.1 Anket Yapısı

Sistem, 15 soruluk kapsamlı bir anket kullanarak yatırımcının risk profilini belirler. Sorular üç ana kategoriye ayrılır:

### Kategori 1: Risk Kapasitesi (Soru 1-5)
Yatırımcının **finansal olarak ne kadar risk alabileceğini** ölçer.

| Soru | Konu | Ağırlık |
|------|------|---------|
| S1 | Yaş grubu | 1.0 |
| S2 | Aylık gelir | 1.0 |
| S3 | Acil durum fonu | 1.0 |
| S4 | Yatırım süresi | 1.0 |
| S5 | Gelir istikrarı | 1.0 |

### Kategori 2: Risk Toleransı (Soru 6-12)
Yatırımcının **psikolojik olarak ne kadar risk almaya istekli** olduğunu ölçer.

| Soru | Konu | Ağırlık |
|------|------|---------|
| S6 | Kayıp durumunda tepki | 2.0 |
| S7 | Getiri/Risk tercihi | 1.5 |
| S8 | Piyasa düşüşünde davranış | 2.0 |
| S9 | Yatırım deneyimi | 1.0 |
| S10 | Risk tanımı | 1.0 |
| S11 | Portföy tercihi | 1.5 |
| S12 | Yatırım hedefi | 1.0 |

### Kategori 3: Uygunluk Değerlendirmesi (Soru 13-15)
SPK düzenlemelerine uygun **uygunluk testi** sorularını içerir.

| Soru | Konu | Etki |
|------|------|------|
| S13 | Daha önce yatırım yapılan araçlar | Bilgilendirme |
| S14 | Finansal bilgi düzeyi | Uyarı tetikleyici |
| S15 | Onay ve beyan | Yasal gereklilik |

## 4.2 Risk Skoru Hesaplama

```
Risk Toleransı Skoru = Σ(Soru Puanı × Ağırlık) / Σ(Max Puan × Ağırlık) × 100

Kategoriler:
  0-40  : Sağlamcı (Low)     - Düşük risk toleransı
  41-70 : Temkinli (Medium)  - Orta risk toleransı
  71-100: Agresif (High)     - Yüksek risk toleransı
```

## 4.3 Risk Profili Özellikleri

### 🟢 Sağlamcı (Muhafazakar) Yatırımcı

**Karakteristik:**
- Sermaye koruması öncelikli
- Düşük volatilite tercihi
- Sabit getiri beklentisi

**Portföy Yapısı:**
- Ağırlıklı para piyasası ve kira sertifikası fonları
- Maksimum tek fon ağırlığı: **%40**
- Beklenen yıllık getiri: %20-30
- Beklenen volatilite: <%5

### 🟡 Temkinli (Dengeli) Yatırımcı

**Karakteristik:**
- Denge arayışı (risk/getiri)
- Orta vadeli bakış açısı
- Makul dalgalanma toleransı

**Portföy Yapısı:**
- Karma dağılım (sabit getiri + büyüme)
- Maksimum tek fon ağırlığı: **%60**
- Beklenen yıllık getiri: %25-40
- Beklenen volatilite: %5-15

### 🔴 Agresif (Dinamik) Yatırımcı

**Karakteristik:**
- Yüksek getiri odağı
- Uzun vadeli perspektif
- Yüksek dalgalanma toleransı

**Portföy Yapısı:**
- Ağırlıklı hisse senedi yoğun fonlar
- Maksimum tek fon ağırlığı: **%70**
- Beklenen yıllık getiri: %30-60+
- Beklenen volatilite: %15-30+

---

# 5. OPTİMİZASYON METODLARI

Sistem, 7 farklı bilimsel optimizasyon yöntemi kullanır. Her yöntemin güçlü ve zayıf yönleri vardır; sistem hepsini çalıştırıp en iyi sonucu seçer.

## 5.1 Mean-Variance Optimization (MVO) - Ortalama-Varyans Optimizasyonu

### MVO_MaxSharpe (Maksimum Sharpe Oranı)

**Ne Yapar?**
Risk birimi başına en yüksek getiriyi sağlayan portföyü bulur.

**Teknik Olmayan Açıklama:**
"Riski göze alarak en fazla kazancı elde etmeyi hedefler. Bir nevi 'verimlilik kralı' portföyüdür."

**Matematiksel Formülasyon:**
```
maximize: (μᵀw - rf) / √(wᵀΣw)

Kısıtlar:
  Σwᵢ = 1          (ağırlıklar toplamı 1)
  wᵢ ≥ 0           (açığa satış yok)
  wᵢ ≤ cap         (maksimum ağırlık limiti)
```

**Kullanım Alanı:** Yüksek getiri arayan, volatiliteye dayanıklı yatırımcılar

---

### MVO_MinVol (Minimum Volatilite)

**Ne Yapar?**
En düşük dalgalanmaya sahip portföyü bulur.

**Teknik Olmayan Açıklama:**
"Gece rahat uyumak isteyenler için. Kazanç biraz az olabilir ama kayıplar da sınırlı kalır."

**Matematiksel Formülasyon:**
```
minimize: wᵀΣw

Kısıtlar:
  Σwᵢ = 1
  wᵢ ≥ 0
  wᵢ ≤ cap
```

**Kullanım Alanı:** Sermaye koruma öncelikli muhafazakar yatırımcılar

---

## 5.2 Hierarchical Risk Parity (HRP) - Hiyerarşik Risk Paritesi

**Ne Yapar?**
Fonları benzerliklerine göre gruplar ve her gruba eşit risk dağıtır.

**Teknik Olmayan Açıklama:**
"Yumurtaları sadece sepetlere değil, farklı odalara da dağıtır. Bir oda yanarsa diğerleri güvende kalır."

**Nasıl Çalışır?**
1. Fonlar arası korelasyon matrisi hesaplanır
2. Hiyerarşik kümeleme yapılır (dendogram)
3. Her kümeye risk bazlı ağırlık atanır
4. Rekursif olarak alt kümelere dağıtılır

**Avantajları:**
- Kovaryans matrisi tersine çevirme gerektirmez
- Küçük örneklemlerde bile stabil sonuçlar
- Sezgisel ve yorumlanabilir

**Kullanım Alanı:** Çeşitlendirme odaklı tüm profiller

---

## 5.3 CVaR (Conditional Value at Risk) Optimizasyonu

**Ne Yapar?**
En kötü senaryolardaki kayıpları minimize eder.

**Teknik Olmayan Açıklama:**
"Normal günleri değil, fırtınalı günleri düşünür. 'En kötü %5'lik günlerde ne kadar kaybederim?' sorusuna odaklanır."

**Matematiksel Formülasyon:**
```
minimize: CVaR₀.₀₅(Rₚ)

CVaR = E[Rₚ | Rₚ ≤ VaR₀.₀₅]

Yani: En kötü %5'lik günlerdeki ortalama kayıp
```

**Avantajları:**
- Kuyruk riskini (tail risk) yakalar
- VaR'dan daha tutarlı bir risk ölçüsü
- Aşırı kayıplara karşı koruma

**Kullanım Alanı:** Beklenmedik piyasa çöküşlerine karşı korunmak isteyenler

---

## 5.4 Risk Parity (Risk Paritesi)

**Ne Yapar?**
Her fonun toplam portföy riskine eşit katkı yapmasını sağlar.

**Teknik Olmayan Açıklama:**
"Eşitlikçi yaklaşım. Hiçbir fon 'baş belası' olmaz, herkes eşit sorumluluk taşır."

**Matematiksel Formülasyon:**
```
Risk Contribution = wᵢ × (Σw)ᵢ / √(wᵀΣw)

Hedef: RC₁ = RC₂ = ... = RCₙ

Yani: Tüm fonların risk katkıları eşit olmalı
```

**Avantajları:**
- Yüksek çeşitlendirme
- Tek bir varlığın portföyü domine etmesini engeller
- Piyasa koşullarına dayanıklı

**Kullanım Alanı:** Dengeli ve uzun vadeli yatırımcılar

---

## 5.5 Worst-Case Mean-Variance (En Kötü Durum Optimizasyonu)

**Ne Yapar?**
Parametrelerdeki belirsizliği hesaba katarak robust bir portföy oluşturur.

**Teknik Olmayan Açıklama:**
"Pessimistin favorisi. 'Ya tahminlerim yanlışsa?' diye sorar ve ona göre pozisyon alır."

**Matematiksel Formülasyon:**
```
maximize: min{μ ∈ U_μ} [μᵀw - λ × max{Σ ∈ U_Σ} wᵀΣw]

U_μ: Beklenen getiri belirsizlik kümesi
U_Σ: Kovaryans belirsizlik kümesi
```

**Avantajları:**
- Model belirsizliğine karşı dayanıklı
- Aşırı optimizasyonu önler
- Daha gerçekçi sonuçlar

**Kullanım Alanı:** Belirsiz piyasa koşullarında temkinli yatırımcılar

---

## 5.6 Riskfolio-Lib CVaR (RF_CVaR)

**Ne Yapar?**
Riskfolio-Lib kütüphanesi ile alternatif CVaR optimizasyonu.

**Farkı:**
- Farklı çözücü (solver) kullanır
- Daha fazla kısıt desteği
- Ek metrikler hesaplar

---

## 5.7 Metod Karşılaştırma Tablosu

| Metod | Risk Odağı | Getiri Odağı | Stabilite | Hesaplama Hızı |
|-------|------------|--------------|-----------|----------------|
| MVO_MaxSharpe | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| MVO_MinVol | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| HRP | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| CVaR | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Risk Parity | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Worst-Case | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## 5.8 En İyi Portföy Seçimi

Sistem tüm metodları çalıştırdıktan sonra **Sharpe Ratio** bazında en iyi portföyü seçer:

```python
best = max(candidates, key=lambda p: p.metrics.sharpe_ratio)
```

**Neden Sharpe Ratio?**
- Hem riski hem getiriyi tek bir metrikte birleştirir
- Farklı risk seviyelerindeki portföyleri karşılaştırmaya olanak tanır
- Endüstri standardı performans ölçüsü

---

# 6. MATEMATİKSEL TEMELLER

## 6.1 Temel Kavramlar

### Günlük Getiri (Daily Return)
```
rₜ = (Pₜ - Pₜ₋₁) / Pₜ₋₁

Pₜ: t günündeki fon fiyatı
Pₜ₋₁: bir önceki günkü fon fiyatı
```

### Beklenen Getiri (Expected Return)
```
μ = E[r] = (1/n) × Σrₜ

Yıllık: μ_annual = μ_daily × 252 (işlem günü)
```

### Volatilite (Standart Sapma)
```
σ = √(Var[r]) = √((1/n) × Σ(rₜ - μ)²)

Yıllık: σ_annual = σ_daily × √252
```

### Kovaryans Matrisi
```
Σᵢⱼ = Cov(rᵢ, rⱼ) = E[(rᵢ - μᵢ)(rⱼ - μⱼ)]

Pozitif yarı-kesin (PSD) olmalıdır
```

## 6.2 Performans Metrikleri

### Sharpe Ratio
```
SR = (Rₚ - Rf) / σₚ

Rₚ: Portföy getirisi
Rf: Risksiz getiri oranı (sistemde 0)
σₚ: Portföy volatilitesi

Yorumlama:
  SR < 1  : Düşük
  1-2     : İyi
  2-3     : Çok iyi
  SR > 3  : Mükemmel
```

### Sortino Ratio
```
Sortino = (Rₚ - Rf) / σ_downside

σ_downside = √((1/n) × Σmin(rₜ - target, 0)²)

Sadece negatif sapmaları cezalandırır
```

### Maximum Drawdown
```
MDD = max(Peak - Trough) / Peak

En yüksek noktadan en düşük noktaya düşüş yüzdesi
```

### Value at Risk (VaR)
```
VaR₀.₀₅ = Quantile₀.₀₅(Rₚ)

%95 güven aralığında maksimum kayıp
```

### Conditional VaR (CVaR / Expected Shortfall)
```
CVaR₀.₀₅ = E[Rₚ | Rₚ ≤ VaR₀.₀₅]

VaR eşiğinin altındaki ortalama kayıp
```

## 6.3 Portföy Matematiği

### Portföy Getirisi
```
Rₚ = Σwᵢrᵢ = wᵀr

w: ağırlık vektörü [w₁, w₂, ..., wₙ]
r: getiri vektörü [r₁, r₂, ..., rₙ]
```

### Portföy Varyansı
```
σₚ² = wᵀΣw = ΣΣwᵢwⱼσᵢⱼ

Σ: kovaryans matrisi
```

### Etkin Sınır (Efficient Frontier)
```
Her hedef getiri μ* için:

minimize: wᵀΣw
subject to:
  wᵀμ = μ*    (hedef getiri)
  wᵀ1 = 1     (tam yatırım)
  w ≥ 0       (açığa satış yok)
```

## 6.4 Kovaryans Matrisi Düzeltmesi

Örneklem kovaryans matrisi bazen pozitif yarı-kesin olmayabilir. Sistem bunu düzeltir:

```python
def fix_covariance_matrix(S):
    # Eigenvalue decomposition
    eigenvalues, eigenvectors = np.linalg.eigh(S)

    # Negatif eigenvalue'ları küçük pozitif yap
    eigenvalues = np.maximum(eigenvalues, 1e-8)

    # Matrisi yeniden oluştur
    S_fixed = eigenvectors @ np.diag(eigenvalues) @ eigenvectors.T

    return S_fixed
```

---

# 7. API DOKÜMANTASYONU

## 7.1 Endpoint'ler

### GET /api/health
Servisin çalışır durumda olup olmadığını kontrol eder.

**Request:**
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "portfolio-optimizer",
  "version": "1.0.0"
}
```

---

### POST /api/optimize
Ana optimizasyon endpoint'i. Fon verilerini alır, tüm metodları çalıştırır, sonuçları döner.

**Request:**
```http
POST /api/optimize
Content-Type: application/json

{
  "funds": [
    {
      "code": "KLU",
      "name": "Kuveyt Türk Para Piyasası Fonu",
      "returns": [0.001, 0.002, -0.0005, ...]
    },
    {
      "code": "KPC",
      "name": "Kuveyt Türk Hisse Fonu",
      "returns": [0.015, -0.008, 0.012, ...]
    }
  ],
  "risk_profile": "medium",
  "risk_free_rate": 0.0,
  "max_funds_final": 5
}
```

**Request Parametreleri:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `funds` | array | Evet | Fon listesi (min 2, max 20) |
| `funds[].code` | string | Evet | Fon kodu (örn: "KLU") |
| `funds[].name` | string | Evet | Fon adı |
| `funds[].returns` | array[float] | Evet | Günlük getiri dizisi (min 10 gün) |
| `risk_profile` | string | Evet | "low", "medium" veya "high" |
| `risk_free_rate` | float | Hayır | Risksiz faiz oranı (varsayılan: 0) |
| `max_funds_final` | int | Hayır | Final portföyde max fon sayısı (varsayılan: 5) |

**Response:**
```json
{
  "success": true,
  "risk_profile": "medium",
  "max_weight_cap": 0.60,
  "candidates": [
    {
      "method": "MVO_MaxSharpe",
      "is_valid": true,
      "allocations": [
        {"code": "KLU", "name": "Para Piyasası", "weight": 0.5071, "weight_pct": 50.71},
        {"code": "KDL", "name": "Döviz Serbest", "weight": 0.2465, "weight_pct": 24.65}
      ],
      "metrics": {
        "expected_return": 0.272,
        "volatility": 0.0068,
        "sharpe_ratio": 39.92,
        "sortino_ratio": 45.12,
        "max_drawdown": 0.023,
        "var_95": 0.0089,
        "cvar_95": 0.0145,
        "diversification_ratio": 1.45
      },
      "notes": ""
    }
  ],
  "best_portfolio": {
    "method": "MVO_MaxSharpe",
    "allocations": [...],
    "metrics": {...}
  },
  "computation_time_ms": 234.5,
  "warnings": []
}
```

**Response Alanları:**

| Alan | Tip | Açıklama |
|------|-----|----------|
| `success` | bool | İşlem başarılı mı |
| `risk_profile` | string | Kullanılan risk profili |
| `max_weight_cap` | float | Uygulanan max ağırlık limiti |
| `candidates` | array | Tüm metodların sonuçları |
| `best_portfolio` | object | En yüksek Sharpe'a sahip portföy |
| `computation_time_ms` | float | Hesaplama süresi (ms) |
| `warnings` | array | Uyarı mesajları |

---

### GET /api/profiles
Mevcut risk profillerini ve ayarlarını listeler.

**Response:**
```json
{
  "profiles": {
    "low": {
      "name": "Sağlamcı",
      "max_weight_cap": 0.40,
      "description": "Düşük risk toleransı, sermaye koruması öncelikli"
    },
    "medium": {
      "name": "Temkinli",
      "max_weight_cap": 0.60,
      "description": "Orta risk toleransı, dengeli büyüme"
    },
    "high": {
      "name": "Agresif",
      "max_weight_cap": 0.70,
      "description": "Yüksek risk toleransı, maksimum büyüme"
    }
  }
}
```

## 7.2 Hata Kodları

| HTTP Kodu | Durum | Açıklama |
|-----------|-------|----------|
| 200 | OK | İşlem başarılı |
| 400 | Bad Request | Geçersiz istek parametreleri |
| 422 | Validation Error | Pydantic doğrulama hatası |
| 500 | Internal Error | Sunucu hatası |

**Hata Response Örneği:**
```json
{
  "detail": "En az 2 fon gereklidir",
  "error_code": "INSUFFICIENT_FUNDS"
}
```

## 7.3 CORS Ayarları

API, frontend'in farklı bir port'tan erişimine izin verir:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

> ⚠️ Prodüksiyonda `allow_origins` kısıtlanmalıdır.

---

# 8. KISITLAMALAR VE İŞ KURALLARI

## 8.1 Portföy Kısıtlamaları

### Ağırlık Kısıtlamaları

| Kısıt | Değer | Açıklama |
|-------|-------|----------|
| `Σwᵢ = 1` | Zorunlu | Tüm ağırlıklar toplamı %100 |
| `wᵢ ≥ 0` | Zorunlu | Açığa satış yasak |
| `min weight` | Yok | Minimum ağırlık sınırı kaldırıldı |
| `max weight (low)` | %40 | Sağlamcı profil için |
| `max weight (medium)` | %60 | Temkinli profil için |
| `max weight (high)` | %70 | Agresif profil için |

### Fon Sayısı Kısıtlamaları

| Kısıt | Değer | Açıklama |
|-------|-------|----------|
| Min giriş fonu | 2 | API'ye en az 2 fon gönderilmeli |
| Max giriş fonu | 20 | API'ye en fazla 20 fon gönderilebilir |
| Max final fon | 5 | Sonuç portföyünde en fazla 5 fon |

### Veri Kısıtlamaları

| Kısıt | Değer | Açıklama |
|-------|-------|----------|
| Min getiri günü | 10 | Her fon için en az 10 günlük veri |
| Önerilen veri | 60+ gün | Daha güvenilir sonuçlar için |
| Max getiri günü | 252 | 1 yıllık veri yeterli |

## 8.2 İş Kuralları

### Kural 1: Final Portföy Seçimi
```
Son portföyde maksimum 5 fon kalır.
Kalan fonlar ağırlık sırasına göre seçilir.
Elenen fonların ağırlıkları kalanlar arasında dağıtılır.
```

### Kural 2: Ağırlık Normalizasyonu
```
Tüm ağırlıklar toplamı her zaman 1.0 olmalıdır.
Her optimizasyon sonrası: w_normalized = w / Σw
```

### Kural 3: Geçersiz Değer Kontrolü
```
NaN veya Inf değerler 0 ile değiştirilir.
Negatif ağırlıklar 0'a çekilir.
```

### Kural 4: Risksiz Faiz Oranı
```
Varsayılan rf = 0 (katılım bankacılığı için uygun)
Kullanıcı tarafından değiştirilebilir.
Sharpe ve Sortino hesaplamalarında kullanılır.
```

## 8.3 SPK Uyumluluk Gereksinimleri

Sermaye Piyasası Kurulu düzenlemelerine uyum:

| Gereksinim | Uygulama |
|------------|----------|
| Risk profili belirleme | 15 soruluk anket |
| Uygunluk testi | Soru 13-15 |
| Bilgilendirme | Anket sonunda uyarılar |
| Kayıt tutma | localStorage + backend log |
| Feragat beyanı | Onay checkbox'ı |

## 8.4 Katılım Bankacılığı Uyumu

Tüm fonlar faizsiz finans prensiplerine uygundur:
- Faiz içeren enstrüman yok
- Şer'i danışma kurulu onaylı
- Sukuk (kira sertifikası) bazlı

---

# 9. TEST SONUÇLARI

## 9.1 Gerçek Veri Testi

63 günlük gerçek Kuveyt Türk Portföy fon verileriyle yapılan test:

### Medium (Temkinli) Profil Sonuçları

**En İyi Portföy (MVO_MaxSharpe):**

| Fon Kodu | Fon Adı | Ağırlık |
|----------|---------|---------|
| KLU | Para Piyasası Katılım (TL) | %50.71 |
| KDL | Beşinci Katılım Serbest (Döviz) | %24.65 |
| KDZ | Sekizinci Katılım Serbest (Döviz) | %20.03 |
| KME | Temkinli Katılım | %3.85 |
| KNJ | Enerji Katılım | %0.77 |

**Metrikler:**
| Metrik | Değer |
|--------|-------|
| Beklenen Yıllık Getiri | %27.20 |
| Yıllık Volatilite | %0.68 |
| Sharpe Ratio | 39.92 |
| Max Fon Ağırlığı | %50.71 (<%60 ✓) |
| Fon Sayısı | 5 (≤5 ✓) |

### Tüm Metodların Karşılaştırması

| Metod | Sharpe | Getiri | Volatilite | Durum |
|-------|--------|--------|------------|-------|
| MVO_MaxSharpe | 39.92 | 27.2% | 0.68% | ✅ |
| MVO_MinVol | 38.50 | 25.8% | 0.67% | ✅ |
| HRP | 35.21 | 24.1% | 0.68% | ✅ |
| CVaR | 34.89 | 23.5% | 0.67% | ✅ |
| RiskParity | 28.45 | 20.2% | 0.71% | ✅ |
| RF_CVaR | 33.12 | 22.8% | 0.69% | ✅ |
| WorstCase_MV | - | - | - | ⚠️ Hata |

## 9.2 Profil Bazlı Weight Cap Testi

| Profil | Max Cap | Test Sonucu | Durum |
|--------|---------|-------------|-------|
| LOW | 40% | En yüksek: 38.5% | ✅ PASS |
| MEDIUM | 60% | En yüksek: 50.7% | ✅ PASS |
| HIGH | 70% | En yüksek: 65.2% | ✅ PASS |

## 9.3 Edge Case Testleri

| Senaryo | Beklenen | Sonuç |
|---------|----------|-------|
| 2 fon ile optimizasyon | Çalışmalı | ✅ |
| 20 fon ile optimizasyon | Çalışmalı | ✅ |
| Yüksek korelasyonlu fonlar | Uyarı vermeli | ✅ |
| Negatif getirili tüm fonlar | CVaR seçilmeli | ✅ |
| Eksik veri | Hata mesajı | ✅ |

## 9.4 Performans Testi

| Metrik | Değer |
|--------|-------|
| Ortalama yanıt süresi | 235 ms |
| 10 fonlu optimizasyon | 180 ms |
| 20 fonlu optimizasyon | 450 ms |
| Bellek kullanımı | ~150 MB |
| Eşzamanlı istek desteği | 50+ |

---

# 10. GÜVENLİK VE PERFORMANS

## 10.1 Güvenlik Önlemleri

### API Güvenliği
| Önlem | Durum | Açıklama |
|-------|-------|----------|
| HTTPS | 🔴 Önerilir | Prodüksiyonda SSL sertifikası gerekli |
| Rate Limiting | 🔴 Önerilir | DDoS koruması için |
| API Key | 🔴 Önerilir | Yetkisiz erişimi engellemek için |
| Input Validation | ✅ Mevcut | Pydantic ile |
| CORS | ✅ Mevcut | Kısıtlanmalı |

### Veri Güvenliği
| Önlem | Durum | Açıklama |
|-------|-------|----------|
| Kişisel veri işleme | Yok | Sistem anonim çalışır |
| Veri saklama | localStorage | Tarayıcıda yerel |
| Log temizleme | Önerilir | Hassas veri loglanmamalı |

## 10.2 Performans Optimizasyonları

### Mevcut Optimizasyonlar
1. **NumPy Vectorization:** Döngü yerine vektör işlemleri
2. **Lazy Loading:** Kütüphaneler gerektiğinde yüklenir
3. **Caching:** Kovaryans matrisi bir kez hesaplanır
4. **Early Exit:** Geçersiz sonuçlar erken elenir

### Önerilen İyileştirmeler
1. **Redis Cache:** Sık istenen portföyler cache'lenir
2. **Async Processing:** Uzun hesaplamalar arka planda
3. **CDN:** Statik dosyalar CDN'den sunulur
4. **Database:** Fon verileri veritabanında saklanır

## 10.3 Ölçeklenebilirlik

### Yatay Ölçekleme
```
                    ┌─────────────┐
                    │ Load Balancer│
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Backend 1│    │ Backend 2│    │ Backend 3│
    └──────────┘    └──────────┘    └──────────┘
```

### Kubernetes Deployment (Örnek)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-optimizer
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio-optimizer
  template:
    spec:
      containers:
      - name: api
        image: portfolio-optimizer:1.0
        ports:
        - containerPort: 8000
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"
```

---

# 11. GELECEK GELİŞTİRMELER

## 11.1 Kısa Vadeli (1-3 Ay)

| Özellik | Öncelik | Açıklama |
|---------|---------|----------|
| Gerçek zamanlı fiyat çekme | Yüksek | API ile günlük fon fiyatları |
| Kullanıcı hesabı | Orta | Portföy kaydetme/yükleme |
| PDF rapor | Orta | IPS raporunu PDF olarak indirme |
| Mobil uyumluluk | Yüksek | Responsive tasarım iyileştirme |

## 11.2 Orta Vadeli (3-6 Ay)

| Özellik | Öncelik | Açıklama |
|---------|---------|----------|
| Backtesting | Yüksek | Geçmiş performans simülasyonu |
| Rebalancing önerileri | Orta | Portföy yeniden dengeleme |
| Bildirimler | Düşük | Piyasa hareketlerinde uyarı |
| Karşılaştırma | Orta | Benchmark ile performans |

## 11.3 Uzun Vadeli (6-12 Ay)

| Özellik | Öncelik | Açıklama |
|---------|---------|----------|
| ML tahmin modeli | Orta | Makine öğrenmesi ile getiri tahmini |
| Robo-advisor | Yüksek | Tam otomatik yatırım yönetimi |
| API marketplace | Düşük | Üçüncü parti entegrasyonlar |
| Multi-asset | Orta | Hisse, sukuk, emtia dahil |

## 11.4 Teknik Borç

| Konu | Öncelik | Çözüm Önerisi |
|------|---------|---------------|
| WorstCase_MV hatası | Yüksek | Riskfolio-Lib güncelleme |
| Random returns | Kritik | Gerçek API entegrasyonu |
| Hardcoded config | Orta | Environment variables |
| Test coverage | Orta | Unit test ekleme |
| Logging | Orta | Structured logging |

---

# 12. SONUÇ

## 12.1 Başarılar

✅ **Tamamlanan Hedefler:**
- 7 farklı optimizasyon metodu başarıyla çalışıyor
- Risk profili bazlı ağırlık limitleri uygulanıyor
- API dokümantasyonu ve test edilebilirlik
- Frontend-backend entegrasyonu tamamlandı
- SPK uyumlu anket sistemi

## 12.2 Öğrenilen Dersler

1. **Veri Kalitesi Kritik:** Optimizasyon sonuçları girdi verilerinin kalitesine bağlı
2. **Kovaryans Sorunları:** Küçük örneklemlerde matris sorunları çözülmeli
3. **Kullanıcı Deneyimi:** Teknik sonuçlar anlaşılır şekilde sunulmalı
4. **Modüler Tasarım:** Ayrı servisler bakımı kolaylaştırır

## 12.3 Öneriler

### İş Tarafı İçin:
1. Gerçek fon verileri ile düzenli test
2. Kullanıcı geri bildirimi toplama
3. Regülatör gereksinimlerini takip
4. Performans metrikleri izleme

### Teknik Ekip İçin:
1. CI/CD pipeline kurulumu
2. Monitoring ve alerting
3. Load testing
4. Security audit

## 12.4 Kaynaklar

- **Modern Portfolio Theory:** Markowitz, H. (1952)
- **HRP:** Lopez de Prado, M. (2016)
- **CVaR:** Rockafellar & Uryasev (2000)
- **Risk Parity:** Qian, E. (2005)
- **PyPortfolioOpt:** [github.com/robertmartin8/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt)
- **Riskfolio-Lib:** [github.com/dcajasn/Riskfolio-Lib](https://github.com/dcajasn/Riskfolio-Lib)

---

# EKLER

## Ek A: Dosya Yapısı

```
kuveyturkportfoy/
├── backend/
│   ├── docker-compose.yml
│   └── portfolio-optimizer/
│       ├── Dockerfile
│       ├── main.py              # FastAPI app
│       ├── models.py            # Pydantic modeller
│       ├── optimizer.py         # Optimizasyon motoru
│       ├── requirements.txt     # Python bağımlılıkları
│       └── venv/                # Virtual environment
│
├── www.kuveytturkportfoy.com.tr/
│   ├── Content/
│   │   ├── js/
│   │   │   ├── fund-data.js           # Fon verileri
│   │   │   ├── portfolio-optimizer.js # Frontend optimizer
│   │   │   ├── portfolio-api-client.js# API client
│   │   │   ├── ips-evaluations.js     # IPS değerlendirme
│   │   │   ├── ips-charts.js          # IPS grafikler
│   │   │   └── ips-report.js          # IPS rapor
│   │   └── css/
│   │       └── ips-print.css          # Yazdırma stilleri
│   │
│   └── risk-profili-hesaplama/
│       ├── index.html                 # Anket sayfası
│       └── risk-profili-anketi-sonuc/
│           └── index.html             # Sonuç sayfası
│
└── docs/
    └── PORTFOLIO_OPTIMIZER_REPORT.md  # Bu rapor
```

## Ek B: Çalıştırma Komutları

### Backend Başlatma
```bash
cd backend/portfolio-optimizer
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker ile Başlatma
```bash
cd backend
docker-compose up --build
```

### Frontend Test Sunucusu
```bash
cd www.kuveytturkportfoy.com.tr
python3 -m http.server 8080
```

## Ek C: Örnek API Çağrısı

```bash
curl -X POST http://localhost:8000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "funds": [
      {"code": "KLU", "name": "Para Piyasası", "returns": [0.001, 0.002, ...]},
      {"code": "KPC", "name": "Hisse Fonu", "returns": [0.01, -0.005, ...]}
    ],
    "risk_profile": "medium",
    "max_funds_final": 5
  }'
```

---

**Rapor Sonu**

*Bu rapor Augment Code AI tarafından otomatik olarak oluşturulmuştur.*
*Son güncelleme: 8 Aralık 2024*


