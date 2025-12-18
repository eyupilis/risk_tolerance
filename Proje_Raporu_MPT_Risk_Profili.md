
# Proje Raporu: Yatırımcı Risk Profili Belirleme ve Modern Portföy Teorisi ile Varlık Dağılımı Optimizasyonu

**Proje Sahibi:** Kuveyt Türk Portföy
**Tarih:** 28.11.2025

---

## 1. Projenin Amacı ve Kapsamı

Bu proje, Kuveyt Türk Portföy müşterilerinin ve potansiyel yatırımcılarının risk profillerini doğru bir şekilde belirlemek, bu profile en uygun varlık dağılımı modelini sunmak ve katılım finans ilkeleriyle uyumlu yatırım fonları aracılığıyla kişiselleştirilmiş portföy önerileri oluşturmak amacıyla geliştirilmiştir.

Projenin temel hedefleri şunlardır:
- **Yatırımcı Davranışını Anlamak:** Kapsamlı bir anket aracılığıyla yatırımcıların demografik bilgilerini, finansal durumlarını, risk algılarını ve davranışsal eğilimlerini analiz etmek.
- **Kişiselleştirilmiş Risk Skoru:** Toplanan verilere dayalı olarak her yatırımcı için objektif ve tutarlı bir risk tolerans puanı (1-100 arası) hesaplamak.
- **Modern Portföy Teorisi (MPT) Entegrasyonu:** Yatırımcının risk skoruna karşılık gelen hedef getiri ve risk seviyesini belirleyerek, Harry Markowitz'in Modern Portföy Teorisi'ni temel alan bir optimizasyon modeli ile ideal varlık dağılımını (Etkin Sınır) oluşturmak.
- **Yapay Zeka Destekli Senaryo Analizi:** Google Gemini 2.0 AI modelini kullanarak, yatırımcının profiline özel, gerçekçi finansal senaryolar üreterek davranışsal tepkilerini ölçmek ve risk profilini daha derinlemesine analiz etmek.
- **Ürün Önerisi:** Belirlenen optimal varlık dağılımına en uygun Kuveyt Türk Portföy katılım fonlarını önermek ve yatırımcının bilinçli karar vermesini sağlamak.

---

## 2. Metodoloji: Risk Toleransı Anketinin Yapısı ve Bilimsel Temelleri

Yatırımcı risk profilini belirlemek için oluşturulan anket, Yatırım Politikası Beyanı (Investment Policy Statement - IPS) oluşturmanın ilk ve en kritik adımıdır. Anket, üç temel bölümden oluşur ve her bir soru, belirli bir teorik çerçeveye hizmet edecek şekilde tasarlanmıştır.

### 2.1. Bölüm 1: Demografik ve Finansal Durum (Sorular 1-6)

Bu bölüm, yatırımcının **risk alma kapasitesini (Ability to Take Risk)** ölçmeyi hedefler. Risk kapasitesi, yatırımcının finansal olarak ne kadar risk üstlenebileceğini gösteren objektif bir ölçüttür.

- **Sorular ve Değerlendirme Mantığı:**
    - **Yaş (Soru 2):** Genç yatırımcılar daha uzun bir yatırım ufkuna sahip oldukları için kayıplarını telafi etme potansiyelleri daha yüksektir. Bu nedenle daha yüksek risk alabilirler (Yüksek puan).
    - **Eğitim ve Gelir Düzeyi (Soru 3-4):** Yüksek eğitim ve gelir seviyesi, genellikle daha yüksek finansal okuryazarlık ve kayıpları tolere etme gücü ile ilişkilendirilir (Yüksek puan).
    - **Finansal Varlıklar ve Yatırım Tecrübesi (Soru 5-6):** Toplam varlık büyüklüğü ve piyasa tecrübesi, yatırımcının potansiyel dalgalanmalara karşı ne kadar korunaklı olduğunu gösterir. Tecrübeli ve varlıklı yatırımcılar daha fazla risk kapasitesine sahiptir (Yüksek puan).

### 2.2. Bölüm 2: Risk Tutumu ve Tercihleri (Sorular 7-12)

Bu bölüm, yatırımcının **risk alma istekliliğini (Willingness to Take Risk)**, yani psikolojik ve davranışsal eğilimlerini ölçer. Bu, risk algısının sübjektif yönüdür.

- **Sorular ve Değerlendirme Mantığı:**
    - **Kayıp Tepkisi ve Risk Toleransı (Soru 7-8):** Portföydeki düşüşlere verilen tepkiler, yatırımcının duygusal dayanıklılığını ölçer. Panik yapıp satış yapanlar düşük risk iştahına sahipken (Düşük puan), sakin kalan veya bunu bir fırsat olarak görenler yüksek risk iştahına sahiptir (Yüksek puan). Bu sorular, **Kayıptan Kaçınma (Loss Aversion)** prensibini test eder.
    - **Portföy Dağılımı ve Getiri-Risk Dengesi (Soru 9-10):** Yatırımcının ne kadarını riskli varlıklara ayırmak istediği ve daha yüksek getiri için ne kadar riski kabul etmeye istekli olduğu doğrudan ölçülür.
    - **Finansal Bilgi Düzeyi (Soru 12):** Finansal piyasaları anlama düzeyi, yatırımcının alacağı riskleri ne kadar bilinçli bir şekilde üstlendiğini gösterir.

### 2.3. Bölüm 3: Yapay Zeka Destekli Davranışsal Senaryolar (Sorular 13-15)

Bu bölüm, projenin en yenilikçi kısmıdır. Yatırımcının ilk 12 soruda verdiği cevaplarla oluşturulan demografik ve finansal profile dayalı olarak, **Google Gemini 2.0 AI** modeli tarafından kişiye özel üç adet senaryo üretilir:

1.  **Piyasa Dalgalanması Senaryosu:** Genel bir piyasa düşüşü senaryosu.
2.  **Beklenmedik Nakit İhtiyacı Senaryosu:** Acil bir finansal zorunluluk durumu.
3.  **Yatırım Fırsatı Senaryosu:** Beklenmedik bir yatırım fırsatının ortaya çıkması.

- **Yapay Zeka Entegrasyonunun Amacı:**
    - **Bağlamsal Karar Verme:** Soyut sorular yerine, yatırımcıyı gerçekçi bir finansal karar anının içine sokarak onun gerçek davranışını ortaya çıkarmak.
    - **Davranışsal Finans Testi:** AI tarafından üretilen seçenekler, yatırımcının **Sürü Psikolojisi (Herding)**, **Fırsat Maliyeti (Opportunity Cost)** ve **Panik Satışı (Panic Selling)** gibi davranışsal eğilimlerini test eder.
    - **Skorlama:** Seçenekler (Düşük, Orta, Yüksek Riskli) önceden belirlenmiş risk çarpanları (1, 2, 4) ile ağırlıklandırılarak skora dahil edilir. Bu, skorlamanın tutarlılığını garanti eder.

---

## 3. Teknik Altyapı: Modern Portföy Teorisi (MPT) ile Varlık Dağılımı

Anket sonucunda elde edilen 1-100 arası risk skoru, yatırımcı için en uygun portföyü belirlemede kilit rol oynar. Bu aşamada, Nobel ödüllü Harry Markowitz'in **Modern Portföy Teorisi (MPT)** devreye girer.

### 3.1. MPT'nin Temel İlkeleri

- **Risk ve Getiri İlişkisi:** MPT, daha yüksek getiri elde etmenin ancak daha yüksek risk alarak mümkün olduğunu varsayar.
- **Çeşitlendirmenin Gücü:** Farklı varlık sınıflarını (örn. Hisse Senedi Fonları, Kira Sertifikası Fonları, Altın Fonları) bir araya getirerek portföyün toplam riskini (standart sapmasını) düşürmek mümkündür. Önemli olan, varlıkların arasındaki korelasyonun düşük olmasıdır.
- **Etkin Sınır (Efficient Frontier):** Belirli bir risk seviyesi için maksimum getiriyi sağlayan veya belirli bir getiri seviyesi için minimum riski sunan tüm portföylerin oluşturduğu eğridir. Akılcı bir yatırımcı, her zaman bu eğri üzerinde bir portföy seçmelidir.

### 3.2. Projedeki Uygulama Adımları

1.  **Varlık Sınıflarının Belirlenmesi:** Kuveyt Türk Portföy'ün katılım finans ilkelerine uygun fonları, temel varlık sınıflarını temsil edecek şekilde gruplandırılır (Örn: Hisse Yoğun, Değişken, Kira Sertifikası, Altın vb.).
2.  **Tarihsel Veri Analizi:** Bu fonların geçmiş dönem getirileri, standart sapmaları (riskleri) ve birbirleriyle olan korelasyonları hesaplanır.
3.  **Optimizasyon ve Etkin Sınır Çizimi:** Bir optimizasyon algoritması (örn: Monte Carlo Simülasyonu veya Sharpe Oranı Maksimizasyonu) kullanılarak on binlerce farklı varlık ağırlığı kombinasyonu test edilir. Bu kombinasyonların risk-getiri grafiği çizildiğinde **Etkin Sınır** ortaya çıkar.
4.  **Risk Skorunun Portföy ile Eşleştirilmesi:**
    - Yatırımcının anketten aldığı risk skoru (1-100), Etkin Sınır üzerindeki bir noktaya eşlenir.
    - **Düşük Risk Skoru (örn: 25):** Etkin Sınır'ın sol alt tarafında, düşük risk ve düşük getiri beklentisine sahip, ağırlıklı olarak Kira Sertifikası ve Altın fonlarından oluşan bir portföye yönlendirilir.
    - **Yüksek Risk Skoru (örn: 85):** Etkin Sınır'ın sağ üst tarafında, yüksek risk ve yüksek getiri potansiyeli sunan, ağırlıklı olarak Hisse Senedi fonlarından oluşan bir portföye yönlendirilir.
5.  **Sonuçların Sunulması:** Yatırımcıya, risk profiline uygun model portföyün varlık dağılımı (örn: %60 Hisse, %30 Kira Sertifikası, %10 Altın) ve bu dağılıma karşılık gelen Kuveyt Türk Portföy fonları net bir şekilde sunulur.

---

## 4. Sonuç ve Değerlendirme

Bu proje, yatırımcı davranışlarını anlamak için modern psikometrik teknikleri, kişiselleştirme için yapay zekayı ve rasyonel portföy oluşturma için Nobel ödüllü finans teorisini bir araya getiren bütüncül bir yaklaşımdır. Bu sistem sayesinde Kuveyt Türk Portföy, müşterilerine sadece bir ürün sunmakla kalmayıp, onların finansal hedeflerine ve risk profillerine en uygun, bilimsel temellere dayanan bir yatırım stratejisi sunarak sektörde fark yaratacaktır.
