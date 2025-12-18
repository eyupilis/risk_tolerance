# Kuveyt Türk Portföy (KTP) Akıllı IPS ve Robo-Danışmanlık Platformu: Raporlama ve Dokümantasyon Mimarisi

**Doküman Kodu:** 00_OVERVIEW_STRUCTURE
**Tarih:** 18 Aralık 2024
**Statü:** Taslak / Onay Bekliyor
**Hazırlayan:** Dokümantasyon Mimarisi ve Teknik Yazarlık Ekibi

---

## 1. Amaç ve Kapsam

Bu doküman serisi, Kuveyt Türk Portföy (KTP) bünyesinde geliştirilen "Akıllı Yatırım Politikası Bildirimi (IPS) ve Algoritmik Portföy Dağılım Platformu"nun teknik, finansal ve regülasyonel temellerini açıklamak amacıyla oluşturulmuştur.

### Projenin Hedefi
Projenin temel amacı, müşterilerin risk toleranslarını davranışsal finans ilkelerine uygun olarak ölçmek, bu ölçümleri matematiksel portföy optimizasyon modelleri ile işlemek ve sonuç olarak kişiye özel, regülasyon uyumlu ve gerekçelendirilmiş bir Yatırım Politikası Bildirimi (IPS) üretmektir.

Platform, yatırım danışmanlığı sürecini standardize etmeyi, operasyonel yükü azaltmayı ve yatırımcı korumasını (investor protection) sistematik hale getirmeyi hedefler.

### Kapsam Dışı Kalanlar
Bu rapor serisi ve açıklanan sistem:
*   Bireysel yatırım tavsiyesi (investment advice) niteliği taşımaz; genel bir çerçeve ve metodoloji sunar.
*   Geçmiş performans verilerine dayanarak gelecekteki getiriler için herhangi bir garanti vermez.
*   Nihai yatırım kararının sorumluluğu yatırımcıya aittir; sistem karar destek (decision support) mekanizması olarak çalışır.
*   Vergi danışmanlığı ve yasal uyumun teyidi (hukuk departmanı onayı) bu teknik raporun kapsamı dışındadır.

---

## 2. Ürün Bileşenleri

Sistem, birbirleriyle entegre çalışan dört ana modülden oluşmaktadır:

### 2.1 Risk Tolerans Anketi
Yatırımcının sadece risk alma isteğini (willingness) değil, aynı zamanda finansal risk kapasitesini (capacity) ve ürün bilgisini ölçmeye yönelik, davranışsal finans literatürüne dayalı soru setidir.

### 2.2 Portföy Dağılım Motoru
Farklı piyasa koşullarına ve risk profillerine adapte olabilen, 7 farklı matematiksel optimizasyon algoritmasını (örn: Mean-Variance, Risk Parity) barındıran hesaplama çekirdeğidir.

### 2.3 IPS (Investment Policy Statement) Üretimi
Anket sonuçlarını ve algoritmik çıktıları birleştirerek, yatırımcının hedeflerini, kısıtlarını ve stratejisini doğal dil ile açıklayan, dinamik doküman üretim modülüdür.

### 2.4 AI Ajanları
Süreç boyunca veri kalitesini ve tutarlılığı denetleyen otonom yapılar:
*   **Tutarsızlık Ajanı:** Yatırımcının verdiği cevaplar arasındaki çelişkileri (örn: düşük gelir - yüksek risk iştahı) tespit eder.
*   **Uyum Ajanı:** Üretilen IPS metninin belirlenen kurallara ve şablonlara uygunluğunu denetler.

---

## 3. Regülasyon ve Uyum Çerçevesi

Bu proje ve dokümantasyon serisi, Türkiye sermaye piyasası mevzuatına ve uluslararası en iyi uygulamalara uyum sağlamayı hedeflemektedir.

### SPK ve Türkiye Pratikleri Bağlamı
Sistem mimarisi, Sermaye Piyasası Kurulu'nun (SPK) "Yatırım Hizmetleri ve Faaliyetleri ile Yan Hizmetlere İlişkin Esaslar Hakkında Tebliği" (III-39.1) hükümleri gözetilerek tasarlanmıştır. Özellikle "Uygunluk Testi" (Suitability Test) ve "Yerindelik Testi" (Appropriateness Test) süreçlerinin dijitalleştirilmesi ve standardizasyonu amaçlanmıştır. [KAYNAK_GEREKLI: SPK III-39.1 Tebliği ilgili maddeleri]

### Uyum Hedefi ve Kanıt Yaklaşımı
Rapor serisi, "sistem mevzuata tam uyumludur" iddiasında bulunmak yerine; her bir tasarım kararının, algoritmanın ve kuralın hangi mevzuat maddesini veya sektörel standardı karşılamayı **hedeflediğini** gerekçelendirmeyi amaçlar. Bu yaklaşım, denetim (audit) süreçlerinde izlenebilirlik (traceability) sağlar.

---

## 4. Kanıt ve İzlenebilirlik Yaklaşımı

Dokümantasyonun temel metodolojisi "neden-sonuç" ve "sorun-çözüm" ilişkisini kurmaktır.

*   **Her Anket Sorusu İçin:** Sorunun davranışsal veya finansal gerekçesi $\to$ neyi ölçtüğü (kapasite/isteklilik) $\to$ skorlamaya ve profile etkisi $\to$ dayandığı literatür/regülasyon referansı.
*   **Her Algoritma İçin:** Çözdüğü finansal problem $\to$ matematiksel/istatistiksel mantık $\to$ hangi piyasa koşulunda tercih edildiği $\to$ başarı metrikleri $\to$ literatür referansı.
*   **Her Kural İçin:** Kural metni $\to$ varlık nedeni (örn: çeşitlendirme zorunluluğu) $\to$ portföye etkisi $\to$ tanımlı istisnalar.

---

## 5. Rapor Dosya Haritası

Teknik ve finansal detaylar, okunabilirliği artırmak ve modülerliği sağlamak amacıyla aşağıdaki dosya yapısına bölünmüştür:

*   **00_overview_and_structure.md (Bu Dosya):** Projenin genel vizyonu, kapsamı, bileşenleri ve dokümantasyon stratejisini açıklar. Yol haritası niteliğindedir.
*   **01_risk_tolerance_question_rationales.md:** Risk anketindeki her bir sorunun (Demografik, Finansal, Davranışsal) sisteme dahil edilme nedenlerini, literatür ve regülasyon atıflarıyla detaylandırır.
*   **02_scoring_model_and_thresholds.md:** Risk skorunun (0-100) nasıl hesaplandığını, kapasite ve isteklilik ağırlıklarını, risk profili eşik değerlerini (Thresholds) ve sınıflandırma mantığını açıklar.
*   **03_portfolio_algorithms_overview.md:** Kullanılan 7 portföy optimizasyon algoritmasının (MVO, HRP, Robust vb.) teknik detaylarını, matematiksel modellerini ve kullanım senaryolarını içerir.
*   **04_data_pipeline_and_libraries.md:** Veri akış şemasını, kullanılan finansal kütüphaneleri (PyPortfolioOpt, Riskfolio-Lib), veri kaynaklarını ve işleme yöntemlerini tarif eder.
*   **05_constraints_rules_and_fund_universe.md:** Yatırım evrenini (fon havuzu), portföy oluşturulurken uygulanan katı kuralları (Hard Constraints - örn: %5 minimum ağırlık) ve kısıtları listeler.
*   **06_ips_generation_and_ai_agents.md:** IPS raporunun dinamik oluşturulma sürecini, yapay zeka ajanlarının (Kural Tabanlı/LLM) rolünü, tutarsızlık tespiti ve metin üretim mantığını açıklar.
*   **07_validation_metrics_and_monitoring.md:** Sistemin başarısını ölçmek için kullanılan performans metriklerini (Sharpe, Drawdown, Turn-over) ve izleme mekanizmalarını tanımlar.
*   **08_risks_limitations_and_future_work.md:** Mevcut sistemin sınırlarını, model risklerini, varsayımlarını ve gelecekte yapılması planlanan iyileştirmeleri şeffaflıkla sunar.
*   **09_appendix_sources_and_definitions.md:** Rapor serisinde kullanılan tüm akademik makaleler, kitaplar, regülasyonlar ve teknik terimlerin sözlüğünü içeren referans dosyasıdır.

---

## 6. Tanımlar ve Terimler

*   **Risk Toleransı (Risk Tolerance):** Bir yatırımcının finansal hedeflerine ulaşmak için katlanmaya istekli ve muktedir olduğu belirsizlik miktarı.
*   **Risk Kapasitesi (Risk Capacity):** Yatırımcının finansal durumu, yaşı ve likidite ihtiyaçlarına göre objektif olarak alabileceği risk miktarı. [KAYNAK_GEREKLI: CFA Institute Definition]
*   **Risk Algısı (Risk Perception):** Yatırımcının riskli bir durumla karşılaştığında hissettiği subjektif değerlendirme; genellikle davranışsal önyargılardan etkilenir.
*   **Yerindelik (Appropriateness):** Sunulan ürünün veya hizmetin, müşterinin bilgi ve tecrübesine uygun olup olmadığının değerlendirilmesi.
*   **Uygunluk (Suitability):** Ürünün müşteri için sadece anlaşılabilir olması değil, aynı zamanda müşterinin mali durumuna, risk toleransına ve hedeflerine uygun olması durumu.
*   **IPS (Yatırım Politikası Bildirimi):** Yatırım hedeflerini, stratejileri ve kısıtları belgeleyen, yatırımcı ile yönetici arasındaki anlaşma dokümanı.
*   **Algoritma vs. Kural Tabanı:** Algoritma, veri üzerinde matematiksel işlemler yaparak (optimize ederek) sonuç üretirken; kural tabanı, önceden tanımlanmış "Eğer-O Zaman" (If-Then) mantığıyla karar verir.

---

## 7. Sonraki Adım

Projenin temel yapı taşlarını anlamak için serinin bir sonraki dosyası olan **01_risk_tolerance_question_rationales.md** dokümanına geçiniz. Bu dosyada, risk anketinin her bir maddesinin sistemdeki yeri ve gerekçesi incelenecektir.
