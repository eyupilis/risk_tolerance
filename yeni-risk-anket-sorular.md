Tamam, şimdi lafı uzatmadan **uygulanabilir tabloyu** veriyorum.

Aşağıda:

* **15 sorunun tamamı**
* Her soru için **şıklar**
* **Risk skoru puanları (0–100)** *(varsa)*
* **Risk skoru ağırlığı** (0–1 arası, sadece Q6–Q12 toplamı = 1)
* Kapasite/uygunluk sorularında da “risk ağırlığı: 0” diyerek net çizgi çekiyorum.

> **Risk Skoru Hesabı (özet):**
> `Risk_Skoru = Σ (Soru_Ağırlığı × Şık_Puanı)`  (yalnızca Q6–Q12 için; şık puanları 0–100)

---

## Q1 – Yaş Aralığı

**Soru:**
“Yaş aralığınız nedir?”
a) 18–30
b) 31–50
c) 51–65
d) 65 yaş üstü

* **Risk skoru ağırlığı:** 0  *(risk toleransı yerine kapasite için kullan)*
* **Kapasite puanı (0–100, ayrı bir “Capacity Score” istersen):**

  * a) 18–30 → 100
  * b) 31–50 → 80
  * c) 51–65 → 50
  * d) >65 → 20

---

## Q2 – Yatırım Vadesi (Horizon)

**Soru:**
“Yatırımlarınızın önemli bir kısmına ne zaman ihtiyaç duymayı bekliyorsunuz?”
a) 1 yıldan kısa
b) 1–3 yıl
c) 4–10 yıl
d) 10 yıldan uzun

* **Risk skoru ağırlığı:** 0
* **Kapasite puanı:**

  * a) <1 yıl → 0
  * b) 1–3 yıl → 30
  * c) 4–10 yıl → 70
  * d) >10 yıl → 100

---

## Q3 – Toplam Finansal Varlık

**Soru:**
“Yaklaşık toplam yatırım yapılabilir finansal varlık büyüklüğünüz nedir?”
a) 100.000 TL’nin altında
b) 100.000 – 500.000 TL
c) 500.000 – 1.000.000 TL
d) 1.000.000 TL’nin üstünde

* **Risk skoru ağırlığı:** 0
* **Kapasite puanı:**

  * a) <100k → 20
  * b) 100k–500k → 50
  * c) 500k–1M → 75
  * d) >1M → 100

---

## Q4 – Yıllık Gelir ve İstikrar

**Soru:**
“Yıllık gelir düzeyiniz ve gelirinizin istikrarı nasıldır?”
a) 250.000 TL’nin altında, istikrarsız
b) 250.000 TL’nin altında, istikrarlı
c) 250.000 – 500.000 TL, istikrarlı
d) 500.000 TL’nin üstünde, istikrarlı

* **Risk skoru ağırlığı:** 0
* **Kapasite puanı:**

  * a) düşük & istikrarsız → 10
  * b) düşük & istikrarlı → 30
  * c) orta & istikrarlı → 60
  * d) yüksek & istikrarlı → 90

---

## Q5 – Acil Durum Fonunuz

**Soru:**
“Beklenmedik harcamalar için (en az ~6 aylık giderlerinizi karşılayacak) ayrı bir acil durum fonunuz var mı?”
a) Hayır, acil durumda yatırımlarımı bozmak zorunda kalırım.
b) Kısmen var ama tüm ihtiyaçlarımı karşılamayabilir.
c) Evet, yatırımlarımdan ayrı yeterli bir acil durum fonum var.

* **Risk skoru ağırlığı:** 0
* **Kapasite puanı:**

  * a) → 0
  * b) → 50
  * c) → 100

> **Öneri:** Kapasite skoru istersen `Capacity = (Q1+Q2+Q3+Q4+Q5 kapasite puanlarının ortalaması)` gibi tek bir metrikte toplayabilirsin. Bu kapasiteyi de risk skoruna “tavan” koymak için kullanırsın.

---

## Q6 – %20 Kayıp Senaryosu (Loss Aversion / Composure)

**Soru:**
“100.000 TL’lik bir yatırımınız kötü bir yıl sonunda 80.000 TL’ye (%20 düşüş) gerilerse ne yaparsınız?”
a) Daha fazla kaybetmemek için satar, daha güvenli yere geçerim.
b) Hiçbir şey yapmam, uzun vadede toparlayacağını düşünürüm.
c) Fiyatlar düşmüşken ek alım yaparım.

* **Risk skoru ağırlığı:** **0.20**
* **Risk puanı (0–100):**

  * a) Sat → **0**  (çok konservatif)
  * b) Bekle → **60**  (orta-üst tolerans)
  * c) Daha fazla al → **100** (yüksek tolerans)

---

## Q7 – Genel Risk–Getiri Tercihi

**Soru:**
“Aşağıdakilerden hangisi size en çok uyuyor?”
a) Anaparanın korunması önceliğim; düşük ama garantiye yakın getiriyi tercih ederim.
b) Makul getiri için makul risk alırım; ne çok güvenli ne çok agresif.
c) Yüksek getiri için belirgin dalgalanma ve kayıp riskini göze alabilirim.

* **Risk skoru ağırlığı:** **0.20**
* **Risk puanı:**

  * a) Güvenli tarafta → **10**
  * b) Dengeli → **60**
  * c) Fırsatçı/agresif → **100**

---

## Q8 – Seçim: Garantili Küçük Getiri vs. Riskli Getiri

**Soru:**
“Önümüzdeki 5 yıl için aşağıdaki yatırımlardan hangisini seçerdiniz?”
a) Yıllık yaklaşık %4 getiri sağlayan, kayıp riski çok düşük yatırım.
b) Yaklaşık %50 olasılıkla %20 getiri, %50 olasılıkla %0 getiri (anapara kaybı yok).
c) Yaklaşık %30 olasılıkla %50 kazanç, %40 civarı orta seviye getiri, %30 olasılıkla %15 kayıp.

* **Risk skoru ağırlığı:** **0.15**
* **Risk puanı:**

  * a) Garantili küçük getiri → **0**
  * b) Dalgalı ama anapara kaybı yok → **60**
  * c) Yüksek getiri için kaybı da göze alırım → **100**

---

## Q9 – Yatırım Deneyimi ve Özgüven

**Soru:**
“Yatırım tecrübenizi ve kendinize güveninizi nasıl tanımlarsınız?”
a) Yatırım tecrübem çok az; profesyonel yönlendirmeye ihtiyaç duyarım.
b) Hisse, fon vb. temel ürünlerde bir miktar deneyimim var; temel kararları rahat verebilirim.
c) Yıllardır çeşitli piyasalarda yatırım yapıyorum; kendi yatırım kararlarıma oldukça güvenirim.

* **Risk skoru ağırlığı:** **0.05**
* **Risk puanı:**

  * a) Az deneyim / düşük güven → **20**
  * b) Orta → **60**
  * c) Yüksek deneyim & yüksek güven → **100**

*(Overconfidence riskini hafifçe yukarı itiyor ama ağırlık düşük.)*

---

## Q10 – Kazanç vs Kayıp Psikolojisi (Loss Aversion)

**Soru:**
“Aşağıdakilerden hangisi size daha yakın?”
a) Kazançlar hoşuma gider ama küçük kayıplar bile beni ciddi şekilde rahatsız eder.
b) Kazanç ve kayıplar beni benzer düzeyde etkiler.
c) Kısa vadeli kayıplar beni çok rahatsız etmez, uzun vadeli hedefe odaklanırım.

* **Risk skoru ağırlığı:** **0.15**
* **Risk puanı:**

  * a) Kayıplar çok daha ağır → **0** (yüksek loss aversion)
  * b) Dengeli → **50**
  * c) Kayıplara toleranslı, uzun vade odaklı → **100**

---

## Q11 – Volatilite Toleransı

**Soru:**
“Portföyünüzün bir yılda değeri kabaca %15 yukarı aşağı dalgalansa kendinizi nasıl hissedersiniz?”
a) Çok kaygılı olurum; bu kadar dalgalanma beni ciddi rahatsız eder.
b) Biraz tedirgin olsam da uzun vadede büyüme bekliyorsam tolere edebilirim.
c) Bu tür dalgalanmaları piyasaların doğal bir parçası olarak görürüm, çok rahatsız olmam.

* **Risk skoru ağırlığı:** **0.15**
* **Risk puanı:**

  * a) Çok kaygılı → **0**
  * b) Tolere ederim → **60**
  * c) Rahatım → **100**

---

## Q12 – Büyük Kazanç Senaryosu

**Soru:**
“Bir yatırımınız kısa sürede %40 değer kazandı. En olası tepkiniz ne olur?”
a) Kazancı kalıcı hale getirmek için büyük kısmını satarım.
b) Portföyümü plana göre yeniden dengelerim ama panik yapmam, coşmam da.
c) Daha da yükselebileceğini düşünerek elde tutar veya ek alım yaparım.

* **Risk skoru ağırlığı:** **0.10**
* **Risk puanı:**

  * a) Karı kilitle → **20** (daha temkinli)
  * b) Rebalans, plana sadık → **60**
  * c) Ride / artır → **90** (yüksek risk iştahı ama 100 değil; biraz “greed/overconfidence” kokusu)

---

## Q13 – Ürün Bilgisi / Deneyimi (Multi-Select)

**Soru:**
“Aşağıdaki yatırım araçlarından hangilerini biliyor veya daha önce kullandınız? (Birden çok seçebilirsiniz)”

* Hisse senedi

* Tahvil / Kira sertifikası

* Yatırım fonu / ETF

* Yabancı para (FX)

* Türev ürünler (vadeli, opsiyon)

* Kripto varlıklar

* Hiçbiri

* **Risk skoru ağırlığı:** 0

* **Puanlama:**

  * Risk skoruna puan girme. Her seçeneği **boolean / liste** olarak tut.
  * Uygunluk/ürün seçimi için kullan (örn. türev deneyimi yoksa portföye türev koyma).

İstersen “deneyim skoru” gibi ayrı bir şey üretebilirsin (örn. her işaretli ürün = +1, türev/kripto = +2 vs.), ama **risk tolerans skoruna karıştırma**.

---

## Q14 – Riskli Ürünlere İlgi (Multi-Select)

**Soru:**
“Aşağıdaki daha riskli yatırım alanlarına ilgi duyuyor musunuz / girmeyi düşünür müsünüz? (Seçiniz)”

* Yeni halka arz (IPO) hisseleri

* Küçük ölçekli / gelişmekte olan ülke hisseleri

* Yüksek getirili (high-yield) tahviller

* Kripto paralar / dijital varlıklar

* Kaldıraçlı ve karmaşık türev ürünler

* Hiçbiri

* **Risk skoru ağırlığı:** 0

* **Puanlama:**

  * Yine risk skorunda kullanılmıyor; “tercih” datası.
  * İşaretlenen her alan, portföy inşasında “içermek istiyor mu / istemiyor mu?” sinyali.
  * Risk skoru ile çelişirse, RM’nin önüne “flag” at (ör: skor konservatif ama kripto ve kaldıraç işaretli → danışman uyarı yapsın).

---

## Q15 – Etik / Dini / ESG Tercihleri

**Soru:**
“Portföyünüzde bulunmasını istemediğiniz sektörler veya uymanızı istediğiniz etik/dini prensipler var mı? (Örn. sadece katılım esaslı ürünler, ESG odaklı yatırım vb.)

* Evet (lütfen belirtin): …

* Hayır”

* **Risk skoru ağırlığı:** 0

* **Puanlama:**

  * Risk skoruna puan yok.
  * Portföyde **evren kısıtlayıcı** parametre olarak kullan (faizsiz, ESG, sektör dışlama vs.).

---

## Özet – Ağırlıklar ve Skor Formülü

* **Risk skoruna giren sorular:** Q6, Q7, Q8, Q9, Q10, Q11, Q12
* **Ağırlıklar (toplam = 1):**

  * Q6 → 0.20
  * Q7 → 0.20
  * Q8 → 0.15
  * Q9 → 0.05
  * Q10 → 0.15
  * Q11 → 0.15
  * Q12 → 0.10

> **Formül (kodlayacağın hali):**
> `Risk_Skoru = 0.20*Q6 + 0.20*Q7 + 0.15*Q8 + 0.05*Q9 + 0.15*Q10 + 0.15*Q11 + 0.10*Q12`
> (Buradaki Qx’ler, seçilen şıkkın 0–100 risk puanı.)

