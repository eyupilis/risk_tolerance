# Kuveyt Türk Portföy - Akıllı IPS ve Robo-Danışmanlık Platformu

Bu proje, yatırımcıların risk profillerini belirleyen, davranışsal finans temelli analizler yapan ve yapay zeka destekli "Yatırım Politikası Bildirimi" (IPS) üreten hibrit bir robo-danışmanlık platformudur.

## 📁 Proje Mimarisi

Sistem iki ana katmandan oluşur:

1.  **Frontend (Ön Yüz):**
    *   Konum: `www.kuveytturkportfoy.com.tr/`
    *   Teknoloji: HTML5, CSS3, Vanilla JavaScript.
    *   Özellikler: Dinamik anket yapısı, gerçek zamanlı validasyonlar, interaktif grafikler (Chart.js).

2.  **Backend (Arka Plan Servisleri):**
    *   **IPS Sistemi (Core):**
        *   Konum: `backend/ips_system/`
        *   Teknoloji: Python (FastAPI).
        *   Görevi: Risk skorlama, tutarsızlık tespiti (Inconsistency Agent), IPS metin üretimi.
        *   Port: `8001`

---

## 🚀 Kurulum ve Çalıştırma (Quick Start)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Ön Gereksinimler
*   Python 3.8 veya üzeri
*   Modern bir web tarayıcısı (Chrome, Safari, Edge)

### 1. Backend Servisini Başlatma (IPS System)

Terminali açın ve backend dizinine gidin:

```bash
cd backend/ips_system
```

Sanal ortam (virtual environment) oluşturun ve aktif edin (Opsiyonel ama önerilir):

```bash
# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\Scripts\activate
```

Gerekli kütüphaneleri yükleyin:

```bash
pip install -r requirements.txt
# Veya manuel olarak:
pip install fastapi uvicorn pydantic python-multipart
```

Servisi başlatın:

```bash
python main.py
# Veya:
uvicorn main:app --reload --port 8001
```

✅ **Başarılı:** Terminalde `Uvicorn running on http://0.0.0.0:8001` mesajını görmelisiniz.

---

### 2. Frontend Uygulamasını Açma

Frontend tamamen statik dosyalardan oluştuğu için herhangi bir derleme (build) işlemine gerek yoktur.

**Seçenek A: Doğrudan Tarayıcıda Açma**
Dosya gezgininden şu dosyayı çift tıklayarak tarayıcınızda açın:
`www.kuveytturkportfoy.com.tr/risk-profili-hesaplama/index.html`

**Seçenek B: VS Code Live Server (Önerilen)**
Eğer VS Code kullanıyorsanız, `index.html` dosyasına sağ tıklayıp "Open with Live Server" diyerek açabilirsiniz. Bu sayede CORS sorunları yaşamazsınız.

---

## 🧪 Sistemi Test Etme (Adım Adım)

1.  **Anketi Doldurun:**
    *   Tarayıcıda açılan sayfada "Ankete Başla" butonuna tıklayın.
    *   14 soruluk testi doldurun.
    *   *İpucu:* Tutarsızlık Ajanını test etmek için; Gelir/Varlık sorularına çok düşük, Risk tercihlerine çok yüksek cevaplar verin (veya tam tersi).

2.  **Sonuç Ekranı:**
    *   Anket bitiminde sistem verileri `http://localhost:8001/api/ips/analyze` adresine gönderir.
    *   Yapay zeka analizli sonuç ekranı yüklenir.

3.  **Raporu İnceleyin:**
    *   "Yatırım Politikası Bildirimi (IPS)" sekmesine tıklayın.
    *   "Neden Bu Dağılım?" ve "AI Analizi" kısımlarının sizin cevaplarınıza göre dinamik oluşturulduğunu göreceksiniz.

---

## 🛠 Sorun Giderme (Troubleshooting)

**Sorun:** IPS Raporu veya Sonuçlar Yüklenmiyor.
*   **Sebep:** Backend çalışmıyor olabilir.
*   **Çözüm:** Terminalden `port 8001`'in dinlendiğinden emin olun. `curl http://localhost:8001/api/health` komutu ile test edin.

**Sorun:** "Network Error" veya CORS hatası.
*   **Sebep:** Backend ve Frontend farklı portlarda olduğu için tarayıcı engelleyebilir.
*   **Çözüm:** Backend'de CORS ayarları yapılmıştır (`allow_origins=["*"]`). Tarayıcı konsolunu (F12) kontrol edin, backend kapalı olabilir.

---

## 📚 Dokümantasyon

Sistemin arkasındaki algoritmalar ve finansal modeller hakkında detaylı bilgi için proje kök dizinindeki teknik raporları inceleyebilirsiniz:

*   `IPS_Deep_Dive_Technical_Report.md`: Kapsamlı Teknik Whitepaper.
*   `IPS_Risk_Algorithm_Technical_Report.md`: Özet Teknik Rapor.
