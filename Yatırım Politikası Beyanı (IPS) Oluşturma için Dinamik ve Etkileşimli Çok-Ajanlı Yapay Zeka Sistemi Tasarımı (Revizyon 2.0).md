# Yatırım Politikası Beyanı (IPS) Oluşturma için Dinamik ve Etkileşimli Çok-Ajanlı Yapay Zeka Sistemi Tasarımı (Revizyon 2.0)

## 1. Giriş ve Revizyon Gerekçesi

Bu rapor, Kuveyt Türk'ün Yatırım Politikası Beyanı (IPS) oluşturma sürecini otomatikleştiren çok-ajanlı yapay zeka sistemi tasarımının, kullanıcının **dinamik sorgulama** ve **tutarsızlık giderme** gereksinimlerini karşılayacak şekilde revize edilmiş halini sunmaktadır.

İlk tasarım, uzmanlık alanlarını ayrıştırarak IPS belgesinin oluşturulmasına odaklanmıştı. Ancak kullanıcının geri bildirimi, sistemin sadece statik anket sonuçlarını işlemekle kalmayıp, anket cevapları arasındaki **çelişkileri tespit etme**, bu çelişkileri gidermek için **dinamik olarak ek sorular sorma** ve bu bağlamları (örneğin, karmaşık ürünler hakkındaki bilgi eksikliği) IPS'e yansıtma yeteneğine sahip olması gerektiğini vurgulamıştır. Bu revizyon, bu etkileşimli ve muhakemeye dayalı yapıyı mimariye entegre etmektedir.

## 2. Revize Edilmiş Çok-Ajanlı Sistem Mimarisi

Revize edilen mimaride, dinamik sorgulama ve tutarsızlık giderme işlevlerini üstlenecek yeni bir ajan eklenmiş ve mevcut ajanların görev akışı bu yeni etkileşimli süreci destekleyecek şekilde güncellenmiştir.

### 2.1. Uzman Ajanların Tanımlanması (Güncellenmiş)

| Ajan Adı | Uzmanlık Alanı | Sorumluluk Alanı |
| :--- | :--- | :--- |
| **Denetleyici Ajan (Orchestrator)** | Süreç Yönetimi ve Akış Kontrolü | Tüm ajanların görev akışını yönetir. **Yeni Görev:** Dinamik sorgulama döngüsünü başlatır ve yönetir. |
| **Giriş Veri Analisti** | Veri İşleme ve Risk Profili Çıkarımı | Anket sonuçlarını işler, risk skorunu hesaplar ve yatırımcıyı risk grubuna atar. **Yeni Görev:** Ham veriyi ve hesaplanan skorları **Tutarsızlık Tespit Ajanı**'na iletir. |
| **Tutarsızlık Tespit Ajanı (Conflict Resolver)** | Psikometrik Analiz ve Muhakeme | **Yeni Ajan:** Anket cevapları arasındaki mantıksal ve psikometrik çelişkileri (Örn: "Dengeli" olduğunu iddia edip "Agresif" cevaplar verme) tespit eder. Gerekirse, çelişkiyi gidermek için **ek bir soru** formüle eder ve Denetleyici Ajan'a iletir. |
| **Portföy Stratejisti** | Finansal Modelleme ve Algoritma Yorumlama | Risk grubuna göre portföy dağılımını gerekçelendirir. **Yeni Görev:** Dinamik sorgulama ile elde edilen ek bağlamı (Örn: Yatırımcının risk algısındaki değişim) gerekçelendirmeye dahil eder. |
| **Hukuk ve Mevzuat Uzmanı** | Hukuki Uygunluk ve Risk Açıklamaları | Yasal uyarıları hazırlar. **Yeni Görev:** Anketten çıkan özel bağlamları (Örn: Karmaşık ürünler hakkında bilgi eksikliği) dikkate alarak uyumluluk kontrolü yapar ve IPS'e özel uyarı metinleri ekler. |
| **IPS Editörü** | Teknik Yazım ve Belge Formatlama | Tüm çıktıları birleştirerek nihai IPS belgesini oluşturur. |

### 2.2. Dinamik ve Etkileşimli İletişim Akışı

Yeni mimari, statik bir akış yerine, anketin tamamlanmasından sonra devreye giren bir **Dinamik Sorgulama Döngüsü** içerir.

1.  **Başlangıç:** Yatırımcı, 15 soruluk **Temel Risk Toleransı Anketi**'ni tamamlar.
2.  **Adım 1: İlk Analiz:** **Denetleyici Ajan**, ham cevapları **Giriş Veri Analisti**'ne iletir. Analist, ilk risk skorunu ve risk grubunu (Örn: Temkinli) hesaplar.
3.  **Adım 2: Tutarsızlık Tespiti (Dinamik Kısım Başlangıcı):**
    *   Analist, ilk skorları ve cevapları **Tutarsızlık Tespit Ajanı**'na iletir.
    *   Ajan, cevapları CFA Enstitüsü kılavuzları gibi literatür bilgisiyle karşılaştırır (Örn: "Risk alma istekliliği" sorusu ile "Davranışsal Senaryo" sorusu arasındaki çelişki).
    *   **Karar Noktası:**
        *   **A) Tutarsızlık Yok:** Ajan, Denetleyici Ajan'a "Onay" sinyali gönderir.
        *   **B) Ciddi Tutarsızlık Var:** Ajan, çelişkiyi gidermek veya bağlamı netleştirmek için **tek bir ek soru** formüle eder (Örn: "Bir önceki soruda 'dengeli' yanıtını verdiniz, ancak piyasa düşüş senaryosunda 'agresif' bir tepki gösterdiniz. Bu iki yaklaşım arasındaki farkı nasıl açıklarsınız?").
4.  **Adım 3: Dinamik Sorgulama (Gerekliyse):**
    *   Denetleyici Ajan, ek soruyu Kuveyt Türk çalışanına (veya doğrudan yatırımcıya) iletir.
    *   Yeni cevap alınır ve **Tutarsızlık Tespit Ajanı**'na geri gönderilir. Ajan, bu yeni bilgiyi kullanarak ilk risk skorunu ve risk grubunu **günceller** ve **nihai Yatırımcı Profil Özeti**'ni oluşturur.
5.  **Adım 4: Portföy ve Hukuk Entegrasyonu (Statik Kısım):**
    *   Nihai Profil Özeti ve varsa ek bağlam bilgileri (Örn: "Yatırımcı, karmaşık ürünler hakkında bilgi eksikliğini teyit etti.") **Portföy Stratejisti** ve **Hukuk ve Mevzuat Uzmanı**'na iletilir.
    *   **Portföy Stratejisti**, güncellenmiş risk grubuna göre portföy dağılımını gerekçelendirir ve dinamik sorgulama sonucunu gerekçeye dahil eder.
    *   **Hukuk ve Mevzuat Uzmanı**, özellikle bilgi eksikliği gibi bağlamları dikkate alarak **özel uyarı metinleri** hazırlar (Örn: "Yatırımcının türev ürünler konusundaki bilgi eksikliği nedeniyle, portföyde bu tür ürünlerin payı sıfır tutulmuştur ve bu durum IPS'e özel bir kısıtlama olarak eklenmiştir.").
6.  **Adım 5: IPS Oluşturma:** **IPS Editörü**, tüm çıktıları birleştirerek nihai IPS belgesini oluşturur.

## 3. Teknik Gereksinimler ve Dinamik Prompt Stratejileri

### 3.1. Dinamik Prompt Tasarımı: Tutarsızlık Tespit Ajanı

Bu ajanın başarısı, sadece cevapları değil, cevaplar arasındaki **ilişkileri** ve **literatürdeki bağlamları** analiz edebilmesine bağlıdır.

#### Tutarsızlık Tespit Ajanı için Sistem Promptu

> **Rol:** Sen, CFA Enstitüsü'nün psikometrik analiz kılavuzlarına hakim, kıdemli bir Risk Analistisin. Görevin, bir yatırımcının risk toleransı anketi cevaplarını analiz ederek, cevaplar arasındaki mantıksal veya davranışsal çelişkileri tespit etmektir.
>
> **Giriş Verisi:** Yatırımcının tüm anket cevapları ve Giriş Veri Analisti tarafından hesaplanan ilk risk skoru/grubu.
>
> **Çıktı Formatı:**
> 1.  **`Tutarsızlık_Durumu`:** (`VAR` / `YOK`)
> 2.  **`Tespit_Edilen_Çelişki`:** (Eğer varsa, çelişkinin detaylı açıklaması ve hangi sorular arasında olduğu. Örn: "Soru 5'teki yüksek risk iştahı ile Soru 10'daki düşük kayıp toleransı arasında ciddi bir çelişki mevcuttur.")
> 3.  **`Ek_Soru_Gerekçesi`:** (Ek soru sorma kararının gerekçesi.)
> 4.  **`Önerilen_Ek_Soru`:** (Eğer gerekliyse, çelişkiyi gidermeye yönelik tek, net ve bağlamsal bir soru.)
>
> **Kural:** Eğer ciddi bir tutarsızlık tespit edersen, bu tutarsızlığı gidermek için **sadece bir tane** ek soru formüle etmelisin. Bu soru, yatırımcının risk algısını netleştirmeye odaklanmalıdır.

### 3.2. Bağlam Yakalama ve Uyumluluk Kontrolü

Kullanıcının bahsettiği gibi, bazı soruların cevabı (Örn: "Hangi varlıklara yatırım deneyiminiz var?" sorusuna "hiçbiri" cevabı) doğrudan risk puanını etkilemese bile, **uyumluluk kontrolü** ve **bağlam işareti** olarak IPS'e yansıtılmalıdır. Bu görev, **Hukuk ve Mevzuat Uzmanı**'nın sorumluluğundadır.

#### Hukuk ve Mevzuat Uzmanı için Dinamik Prompt Stratejisi

Bu ajana, sadece risk grubu değil, aynı zamanda **Giriş Veri Analisti** ve **Tutarsızlık Tespit Ajanı**'ndan gelen tüm bağlamsal notlar (Contextual Notes) iletilmelidir.

*   **Örnek Bağlam Notu:** "Yatırımcı, kripto/türev ürünler hakkında bilgi sahibi olmadığını belirtmiştir (Soru 12). Bu, karmaşık ürünler için bir uyumluluk kısıtlaması olarak ele alınmalıdır."
*   **Ajanın Tepkisi:** Ajan, bu notu alarak IPS'in **Yatırım Kısıtlamaları** bölümüne otomatik olarak şu maddeyi ekler: "Yatırımcının beyan ettiği bilgi düzeyi göz önüne alınarak, portföyde türev araçlar, kaldıraçlı işlemler ve yüksek riskli yapılandırılmış ürünler **kullanılmayacaktır**."

## 4. Investment Policy Statement (IPS) İçerik Gereksinimleri (Güncellenmiş)

Dinamik sorgulama ve bağlam yakalama süreci, IPS belgesinin kalitesini ve kişiselleştirme düzeyini artırır.

| Bölüm No. | Bölüm Adı | Dinamik Entegrasyon |
| :--- | :--- | :--- |
| **I.** | **Yatırımcı Profili ve Amaçları** | **Tutarsızlık Giderme Notu:** Dinamik sorgulama sonucunda risk profilinde yapılan değişiklikler (Örn: "Başlangıçta Temkinli olarak belirlenen profil, ek sorgulama ile Agresif olarak güncellenmiştir.") bu bölümde açıkça belirtilir. |
| **II.** | **Yatırım Kısıtlamaları ve Kriterleri** | **Bağlamsal Kısıtlamalar:** Hukuk ve Mevzuat Uzmanı tarafından eklenen, yatırımcının bilgi eksikliği veya özel tercihlerinden kaynaklanan (Örn: Karmaşık ürün yasağı) tüm uyumluluk kısıtlamaları buraya eklenir. |
| **III.** | **Portföy Stratejisi ve Gerekçesi** | **Gerekçelendirme Derinliği:** Portföy Stratejisti, sadece risk grubunu değil, aynı zamanda dinamik sorgulama ile netleşen **davranışsal eğilimleri** de gerekçelendirmeye dahil eder. |
| **VI.** | **Yasal Uyarılar ve Beyanlar** | **Kişiselleştirilmiş Risk Açıklamaları:** Hukuk ve Mevzuat Uzmanı, yatırımcının risk algısındaki çelişkiler giderilmiş olsa bile, bu çelişkilerin varlığını ve nihai kararın nasıl alındığını şeffaflık ilkesi gereği bu bölümde özetleyebilir. |

## 5. Sonuç

Bu revize edilmiş çok-ajanlı sistem, sadece bir doküman oluşturma aracı olmanın ötesine geçerek, bir **sanal finansal danışman** gibi davranma yeteneği kazanmaktadır. Ajanlar arasındaki bu dinamik etkileşim, anket verilerindeki yüzeysel geçerliliğin ötesine geçilmesini, çelişkilerin giderilmesini ve sonuç olarak yatırımcıya sunulan IPS belgesinin hem hukuki açıdan daha sağlam hem de kişisel bağlam açısından çok daha zengin olmasını sağlayacaktır. Bu yapı, Kuveyt Türk'ün zengin yatırımcı kitlesine sunacağı hizmetin kalitesini ve güvenilirliğini önemli ölçüde artıracaktır.
