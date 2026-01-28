/**
 * IPS (Investment Policy Statement) Integration Module
 * 
 * Bu modül, anket cevaplarını IPS backend API'sine gönderir,
 * tutarsızlık varsa doğrulama sorusu gösterir ve final IPS üretir.
 */

// Konfigürasyon (window.IPS_CONFIG üzerinden override edilebilir)
const DEFAULT_IPS_CONFIG = {
    baseUrl: 'http://127.0.0.1:8001/api',
    timeoutMs: 60000,  // 60 saniye - Gemini API çağrıları için yeterli süre
};

function getConfig() {
    return { ...DEFAULT_IPS_CONFIG, ...(window.IPS_CONFIG || {}) };
}

function fetchWithTimeout(url, options = {}) {
    // NOT: Geliştirme ortamında Gemini çağrıları zaman zaman uzun sürebiliyor.
    // Tarayıcı tarafındaki AbortController zaman aşımı hatalarına neden olduğundan
    // burada istemci tarafı timeout'u geçici olarak devre dışı bırakıyoruz.
    // Backend zaten kendi içinde hataları yönetiyor.
    return fetch(url, options);
}

// Risk skoruna dahil olan sorular ve ağırlıkları
// Kapasite soruları (Q1-Q5) %40, İsteklilik soruları (Q6-Q12) %60
const CAPACITY_WEIGHTS = {
    q1: 0.20,  // Yaş
    q2: 0.25,  // Yatırım vadesi
    q3: 0.25,  // Finansal varlık
    q4: 0.20,  // Gelir düzeyi
    q5: 0.10,  // Acil durum fonu
};

const RISK_SCORE_WEIGHTS = {
    q6: 0.20,  // %20 kayıp senaryosu
    q7: 0.20,  // Genel risk-getiri tercihi
    q8: 0.15,  // Garantili vs riskli getiri
    q9: 0.05,  // Yatırım deneyimi
    q10: 0.15, // Kazanç vs kayıp psikolojisi
    q11: 0.15, // Volatilite toleransı
    q12: 0.10, // Büyük kazanç senaryosu
};

// Her soru için şık puanları (0-100 arası)
// Q1-Q5: Kapasite soruları
const CAPACITY_SCORES = {
    q1: { a: 90, b: 70, c: 40, d: 20 },  // Yaş (genç=yüksek kapasite)
    q2: { a: 20, b: 50, c: 70, d: 90 },   // Vade (uzun=yüksek)
    q3: { a: 20, b: 50, c: 70, d: 90 },   // Varlık (yüksek=yüksek)
    q4: { a: 20, b: 50, c: 70, d: 90 },   // Gelir (yüksek=yüksek)
    q5: { a: 20, b: 50, c: 90 },           // Acil durum fonu (var=yüksek)
};

// Q6-Q12: İsteklilik soruları
const ANSWER_SCORES = {
    q6: { a: 0, b: 60, c: 100 },
    q7: { a: 10, b: 60, c: 100 },
    q8: { a: 0, b: 60, c: 100 },
    q9: { a: 20, b: 60, c: 100 },
    q10: { a: 0, b: 50, c: 100 },
    q11: { a: 0, b: 60, c: 100 },
    q12: { a: 20, b: 60, c: 90 },
};

// Soru metinleri
const QUESTION_TEXTS = {
    q1: "Yaş aralığınız nedir?",
    q2: "Yatırımlarınızın önemli bir kısmına ne zaman ihtiyaç duymayı bekliyorsunuz?",
    q3: "Yaklaşık toplam yatırım yapılabilir finansal varlık büyüklüğünüz nedir?",
    q4: "Yıllık gelir düzeyiniz ve gelirinizin istikrarı nasıldır?",
    q5: "Beklenmedik harcamalar için ayrı bir acil durum fonunuz var mı?",
    q6: "100.000 TL'lik bir yatırımınız %20 düşerse ne yaparsınız?",
    q7: "Aşağıdakilerden hangisi size en çok uyuyor?",
    q8: "Önümüzdeki 5 yıl için aşağıdaki yatırımlardan hangisini seçerdiniz?",
    q9: "Yatırım tecrübenizi ve kendinize güveninizi nasıl tanımlarsınız?",
    q10: "Aşağıdakilerden hangisi size daha yakın?",
    q11: "Portföyünüzün bir yılda %15 dalgalansa kendinizi nasıl hissedersiniz?",
    q12: "Yatırımınız kısa sürede %30 kazanç sağlasa ne yaparsınız?",
    q13: "Hangi yatırım araçlarını biliyor veya daha önce kullandınız?",
    q14: "Daha riskli yatırım alanlarına ilgi duyuyor musunuz?",
    q15: "Etik/dini/ESG tercihleriniz var mı?",
};

// Soru şıkları (doğrulama modalı için)
const QUESTION_OPTIONS = {
    q6: {
        a: { text: "Hemen satıp daha güvenli bir yatırıma geçerim", score: 0 },
        b: { text: "Bekler, piyasanın toparlanmasını umarım", score: 60 },
        c: { text: "Daha fazla alırım, fırsat olarak görürüm", score: 100 }
    },
    q7: {
        a: { text: "Anaparam korunsun, getiri düşük olsa da olur", score: 10 },
        b: { text: "Orta düzey risk alarak makul getiri isterim", score: 60 },
        c: { text: "Yüksek getiri için yüksek risk alabilirim", score: 100 }
    },
    q8: {
        a: { text: "Yıllık %4 garantili getiri, kayıp riski çok düşük", score: 0 },
        b: { text: "Yıllık %8 beklenen getiri, %10 kayıp riski", score: 60 },
        c: { text: "Yıllık %15 beklenen getiri, %25 kayıp riski", score: 100 }
    },
    q9: {
        a: { text: "Çok az deneyimim var, profesyonel yönlendirme isterim", score: 20 },
        b: { text: "Orta düzey deneyimim var, temel kararları alabilirim", score: 60 },
        c: { text: "Deneyimliyim, kendi kararlarımı veririm", score: 100 }
    },
    q10: {
        a: { text: "Küçük bir kayıp bile beni ciddi şekilde rahatsız eder", score: 0 },
        b: { text: "Kayıp ve kazancı dengeli değerlendiririm", score: 50 },
        c: { text: "Potansiyel kazanç için kayıp riskini göze alırım", score: 100 }
    },
    q11: {
        a: { text: "Çok kaygılı olurum, uyuyamam", score: 0 },
        b: { text: "Biraz endişelenirim ama beklerim", score: 60 },
        c: { text: "Normal karşılarım, uzun vadede düzelir", score: 100 }
    },
    q12: {
        a: { text: "Hemen satıp kazancı kalıcı hale getiririm", score: 20 },
        b: { text: "Bir kısmını satıp portföyü dengelerim", score: 60 },
        c: { text: "Tutarım, hatta daha da yükselebileceğini düşünürüm", score: 90 }
    }
};

/**
 * Anket cevaplarını IPS API formatına dönüştür
 */
function formatAnswersForAPI(surveyAnswers) {
    const answers = [];

    for (const [questionId, rawAnswer] of Object.entries(surveyAnswers)) {
        const qNum = questionId.toLowerCase();

        // Sadece soru ID'lerini işle (q1, q2, ... q15)
        // q1_text, investorType, personType, timestamp gibi alanları atla
        if (!qNum.match(/^q\d+$/)) continue;

        // surveyAnswers formatı: q1='a' (string) veya q14=[{value,text}] (array)
        let answerValue;
        let answerText = '';

        if (typeof rawAnswer === 'string') {
            answerValue = rawAnswer; // Harf kodu (a, b, c, d)
            answerText = surveyAnswers[`${qNum}_text`] || '';
        } else if (Array.isArray(rawAnswer)) {
            // Q13, Q14 gibi çoklu seçim soruları
            answerValue = rawAnswer.map(item => item.value).join(',');
            answerText = rawAnswer.map(item => item.text).join(', ');
        } else if (rawAnswer && typeof rawAnswer === 'object') {
            answerValue = rawAnswer.value || '';
            answerText = rawAnswer.text || '';
        } else {
            continue; // Geçersiz değer, atla
        }

        // answer_scale hesapla (0-1 arası)
        let answerScale = null;
        if (RISK_SCORE_WEIGHTS[qNum] && ANSWER_SCORES[qNum]) {
            // İsteklilik soruları (Q6-Q12)
            const rawScore = ANSWER_SCORES[qNum][answerValue] || 50;
            answerScale = rawScore / 100; // 0-100 -> 0-1
        } else if (CAPACITY_WEIGHTS[qNum] && CAPACITY_SCORES[qNum]) {
            // Kapasite soruları (Q1-Q5)
            const rawScore = CAPACITY_SCORES[qNum][answerValue] || 50;
            answerScale = rawScore / 100; // 0-100 -> 0-1
        }

        // Backend 'question1' formatını bekliyor, 'q1' -> 'question1' dönüşümü
        const backendQuestionId = qNum.replace(/^q(\d+)$/, 'question$1');

        answers.push({
            question_id: backendQuestionId,
            answer_value: answerValue, // Harf kodu (a, b, c, d)
            answer_scale: answerScale,
        });
    }

    return answers;
}

/**
 * Risk skorunu manuel hesapla (backend ile karşılaştırma için)
 * Kapasite %40, İsteklilik %60 ağırlıkla hesaplanır
 */
function calculateLocalRiskScore(surveyAnswers) {
    // Kapasite skoru (Q1-Q5)
    let capacitySum = 0;
    let capacityWeight = 0;
    for (const [qNum, weight] of Object.entries(CAPACITY_WEIGHTS)) {
        const answer = surveyAnswers[qNum]; // Direkt string ('a', 'b', 'c', 'd')
        if (answer && typeof answer === 'string' && CAPACITY_SCORES[qNum]) {
            const score = CAPACITY_SCORES[qNum][answer] || 50;
            capacitySum += weight * score;
            capacityWeight += weight;
        }
    }
    const capacityScore = capacityWeight > 0 ? capacitySum / capacityWeight : 50;

    // İsteklilik skoru (Q6-Q12)
    let willingnessSum = 0;
    let willingnessWeight = 0;
    for (const [qNum, weight] of Object.entries(RISK_SCORE_WEIGHTS)) {
        const answer = surveyAnswers[qNum]; // Direkt string ('a', 'b', 'c')
        if (answer && typeof answer === 'string' && ANSWER_SCORES[qNum]) {
            const score = ANSWER_SCORES[qNum][answer] || 50;
            willingnessSum += weight * score;
            willingnessWeight += weight;
        }
    }
    const willingnessScore = willingnessWeight > 0 ? willingnessSum / willingnessWeight : 50;

    // Final skor: Kapasite %40 + İsteklilik %60
    const finalScore = (capacityScore * 0.4) + (willingnessScore * 0.6);

    console.log(`Local Risk Score: Capacity=${capacityScore.toFixed(1)}, Willingness=${willingnessScore.toFixed(1)}, Final=${finalScore.toFixed(1)}`);

    return {
        total: finalScore,
        capacity: capacityScore,
        willingness: willingnessScore
    };
}

/**
 * IPS Analiz API çağrısı
 */
async function analyzeForIPS(surveyAnswers) {
    const answers = formatAnswersForAPI(surveyAnswers);
    const { baseUrl } = getConfig();

    try {
        const startedAt = performance.now();
        const response = await fetchWithTimeout(`${baseUrl}/ips/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || `API hatası (analyze) [${response.status}]`);
        }

        const result = await response.json();
        const elapsed = Math.round(performance.now() - startedAt);
        console.log('IPS Analiz süresi (ms):', elapsed);
        return result;
    } catch (error) {
        console.error('IPS Analiz hatası:', error);
        throw error;
    }
}

/**
 * IPS Doğrulama API çağrısı
 *
 * NOT: Bazı tarayıcı/eklenti kombinasyonlarında fetch + AbortController
 * beklenmedik "AbortError" hatalarına yol açabildiği için, sadece bu
 * endpoint için klasik XMLHttpRequest kullanıyoruz. Böylece istemci
 * tarafı timeout / abort etkilerini en aza indiriyoruz.
 */
async function confirmForIPS(traceId, answerRaw, answerScale) {
    const { baseUrl } = getConfig();
    const payload = JSON.stringify({
        trace_id: traceId,
        answer_raw: answerRaw,
        answer_scale: answerScale,
    });

    return new Promise((resolve, reject) => {
        const startedAt = performance.now();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${baseUrl}/ips/confirm`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // Bilerek timeout tanımlamıyoruz; backend kendi içinde yönetiyor.

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            const elapsed = Math.round(performance.now() - startedAt);
            console.log('IPS Doğrulama (XHR) süresi (ms):', elapsed);

            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const result = xhr.responseText ? JSON.parse(xhr.responseText) : {};
                    resolve(result);
                } catch (e) {
                    console.error('IPS Doğrulama JSON parse hatası:', e);
                    reject(new Error('IPS Doğrulama JSON parse hatası'));
                }
            } else {
                let detail = '';
                try {
                    const errJson = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                    if (errJson && errJson.detail) detail = errJson.detail;
                } catch (e) {
                    // ignore
                }
                const message = detail || `API hatası (confirm) [${xhr.status}]`;
                console.error('IPS Doğrulama hatası (XHR):', message);
                reject(new Error(message));
            }
        };

        xhr.onerror = function () {
            console.error('IPS Doğrulama ağ hatası (XHR)');
            reject(new Error('IPS Doğrulama ağ hatası'));
        };

        xhr.onabort = function () {
            console.error('IPS Doğrulama isteği tarayıcı tarafından iptal edildi (XHR abort)');
            reject(new Error('IPS Doğrulama isteği iptal edildi'));
        };

        try {
            xhr.send(payload);
        } catch (e) {
            console.error('IPS Doğrulama gönderim hatası (XHR):', e);
            reject(e);
        }
    });
}

/**
 * IPS Sonuç getir
 */
async function getIPSResult(traceId) {
    const { baseUrl } = getConfig();
    try {
        const response = await fetchWithTimeout(`${baseUrl}/ips/${traceId}`);

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || `API hatası (get) [${response.status}]`);
        }

        return await response.json();
    } catch (error) {
        console.error('IPS Sonuç hatası:', error);
        throw error;
    }
}

/**
 * Risk bucket'ını Türkçe'ye çevir
 */
function translateRiskBucket(bucket) {
    const translations = {
        'temkinli': 'Temkinli (Muhafazakar)',
        'dengeli': 'Dengeli',
        'agresif': 'Agresif (Dinamik)',
    };
    return translations[bucket] || bucket;
}

/**
 * IPS bölümlerini HTML formatına dönüştür
 */
function formatIPSSectionsHTML(sections) {
    if (!sections) return '';

    return `
        <div class="ips-document">
            <h2>Yatırım Politikası Beyanı (IPS)</h2>
            
            <div class="ips-section">
                <h3>📋 Yatırımcı Profili</h3>
                <p>${sections.profil}</p>
            </div>
            
            <div class="ips-section">
                <h3>🚫 Yatırım Kısıtlamaları</h3>
                <p>${sections.kisitlar}</p>
            </div>
            
            <div class="ips-section">
                <h3>📊 Portföy Stratejisi</h3>
                <p>${sections.strateji}</p>
            </div>
            
            <div class="ips-section">
                <h3>⚠️ Yasal Uyarılar</h3>
                <p>${sections.yasal_uyarilar}</p>
            </div>
            
            ${sections.ek_notlar ? `
            <div class="ips-section">
                <h3>📝 Ek Notlar</h3>
                <p>${sections.ek_notlar}</p>
            </div>
            ` : ''}
        </div>
    `;
}

function removeIfExists(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.remove();
}

/**
 * Tutarsızlık uyarısı ve doğrulama formu göster (şıklı format)
 */
function showConflictModal(conflictData, onConfirm) {
    removeIfExists('ipsConflictModal');

    // Çelişkili sorunun ID'sini al (örn: "q12")
    const conflictQId = conflictData.conflicting_question_id;
    const questionText = QUESTION_TEXTS[conflictQId] || conflictData.follow_up_question;
    const questionOptions = QUESTION_OPTIONS[conflictQId];

    // Şıkları HTML olarak oluştur
    let optionsHTML = '';
    if (questionOptions) {
        for (const [key, option] of Object.entries(questionOptions)) {
            optionsHTML += `
                <label class="conflict-option">
                    <input type="radio" name="conflictAnswer" value="${key}" data-score="${option.score}" data-text="${option.text}">
                    <span class="option-label">${key.toUpperCase()}) ${option.text}</span>
                </label>
            `;
        }
    }

    const modalHTML = `
        <div class="ips-modal-overlay" id="ipsConflictModal">
            <div class="ips-modal">
                <div class="ips-modal-header">
                    <h3>⚠️ Cevabınızı Doğrulayın</h3>
                </div>
                <div class="ips-modal-body">
                    <div class="conflict-intro">
                        <p>Cevaplarınız arasında bir farklılık tespit ettik. Lütfen aşağıdaki soruya vereceğiniz cevabı doğrulayın:</p>
                    </div>

                    <div class="conflict-question">
                        <p class="question-text"><strong>${questionText}</strong></p>
                        <div class="question-options">
                            ${optionsHTML}
                        </div>
                    </div>
                </div>
                <div class="ips-modal-footer">
                    <button class="btn btn-primary" id="confirmBtn" disabled>Onayla</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('ipsConflictModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const optionInputs = modal.querySelectorAll('input[name="conflictAnswer"]');

    // Şık seçildiğinde butonu aktifleştir
    optionInputs.forEach(input => {
        input.addEventListener('change', () => {
            confirmBtn.disabled = false;
        });
    });

    confirmBtn.addEventListener('click', () => {
        const selectedOption = modal.querySelector('input[name="conflictAnswer"]:checked');
        if (!selectedOption) return;

        const answerRaw = selectedOption.dataset.text;
        const answerScale = parseInt(selectedOption.dataset.score) / 100; // 0-100 -> 0-1

        modal.remove();
        onConfirm(answerRaw, answerScale);
    });
}

/**
 * IPS sonuç modalı göster
 */
function showIPSResultModal(result) {
    removeIfExists('ipsResultModal');

    const modalHTML = `
        <div class="ips-modal-overlay" id="ipsResultModal">
            <div class="ips-modal ips-modal-large">
                <div class="ips-modal-header">
                    <h3>✅ Yatırım Politikası Beyanı Oluşturuldu</h3>
                    <button class="close-btn" id="closeIPSModal">&times;</button>
                </div>
                <div class="ips-modal-body">
                    <div class="risk-summary">
                        <div class="risk-score">
                            <span class="score-value">${(result.risk.score * 100).toFixed(0)}</span>
                            <span class="score-label">Risk Skoru</span>
                        </div>
                        <div class="risk-bucket">
                            <span class="bucket-value">${translateRiskBucket(result.risk.bucket)}</span>
                            <span class="bucket-label">Risk Profili</span>
                        </div>
                    </div>
                    
                    ${result.update_note ? `
                    <div class="update-note">
                        <p>ℹ️ ${result.update_note}</p>
                    </div>
                    ` : ''}
                    
                    ${formatIPSSectionsHTML(result.ips_sections)}
                </div>
                <div class="ips-modal-footer">
                    <button class="btn btn-secondary" id="printIPSBtn">🖨️ Yazdır</button>
                    <button class="btn btn-primary" id="closeIPSBtn">Kapat</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('ipsResultModal');

    document.getElementById('closeIPSModal').addEventListener('click', () => modal.remove());
    document.getElementById('closeIPSBtn').addEventListener('click', () => modal.remove());
    document.getElementById('printIPSBtn').addEventListener('click', () => {
        window.print();
    });
}

/**
 * Loading göster
 */
function showLoading(message = 'IPS oluşturuluyor...') {
    removeIfExists('ipsLoading');
    const loadingHTML = `
        <div class="ips-loading-overlay" id="ipsLoading">
            <div class="ips-loading">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
}

/**
 * Loading gizle
 */
function hideLoading() {
    const loading = document.getElementById('ipsLoading');
    if (loading) loading.remove();
}

/**
 * Hata göster
 */
function showError(message) {
    alert('Hata: ' + message);
}

/**
 * Lokal olarak risk sonucunu hesapla (API başarısız olduğunda fallback)
 */
function generateLocalResult(surveyAnswers) {
    console.log('[IPS] Lokal hesaplama başlatılıyor...');

    // Risk skorunu hesapla
    const localScore = calculateLocalRiskScore(surveyAnswers);
    const score = localScore.total;

    // Profil belirleme
    let profile = 'medium';
    let profileName = 'Dengeli';
    if (score <= 35) {
        profile = 'low';
        profileName = 'Temkinli (Muhafazakar)';
    } else if (score >= 65) {
        profile = 'high';
        profileName = 'Agresif (Dinamik)';
    }

    console.log(`[IPS] Lokal skor: ${score.toFixed(1)}, Profil: ${profile}`);

    const riskResult = {
        score: score,
        normalizedScore: score,
        profile: profile,
        profileName: profileName,
        level: profile === 'low' ? 'Düşük' : profile === 'high' ? 'Yüksek' : 'Orta',
        capacityScore: localScore.capacity,
        willingnessScore: localScore.willingness
    };

    // IPS içeriğini lokal olarak oluştur
    let fullIPS = null;
    if (typeof IPSContentGenerator !== 'undefined') {
        try {
            fullIPS = IPSContentGenerator.generateFullIPS(surveyAnswers, riskResult, null);
            console.log('[IPS] Lokal IPS içeriği oluşturuldu:', Object.keys(fullIPS));
        } catch (e) {
            console.error('[IPS] Lokal IPS içeriği oluşturulamadı:', e);
        }
    }

    return {
        risk: {
            score: score / 100, // Backend formatı 0-1 arası
            bucket: profile === 'low' ? 'temkinli' : profile === 'high' ? 'agresif' : 'dengeli'
        },
        riskResult: riskResult,
        fullIPS: fullIPS,
        isLocalFallback: true
    };
}

/**
 * Ana IPS oluşturma fonksiyonu
 * Anket tamamlandığında bu fonksiyon çağrılır
 */
async function generateIPS(surveyAnswers) {
    showLoading('Anket analiz ediliyor...');

    try {
        // 1. Analiz yap
        const analyzeResult = await analyzeForIPS(surveyAnswers);

        // 2. Tutarsızlık varsa doğrulama iste
        if (analyzeResult.status === 'needs_confirmation') {
            hideLoading();

            return new Promise((resolve) => {
                showConflictModal(analyzeResult.conflict, async (answerRaw, answerScale) => {
                    showLoading('Risk profiliniz yeniden hesaplanıyor...');

                    try {
                        // 3. Doğrulama gönder
                        const confirmResult = await confirmForIPS(
                            analyzeResult.trace_id,
                            answerRaw,
                            answerScale
                        );

                        // 4. Güncellenmiş risk skorunu localStorage'a kaydet
                        const existingResult = JSON.parse(localStorage.getItem('riskProfiliSonuc') || '{}');
                        existingResult.risk = confirmResult.risk;
                        existingResult.ips_sections = confirmResult.ips_sections;
                        existingResult.update_note = confirmResult.update_note;
                        existingResult.conflictResolved = true;
                        // Expert AI içeriklerini de kaydet
                        if (confirmResult.expert_content) {
                            existingResult.expert_content = confirmResult.expert_content;
                        }
                        localStorage.setItem('riskProfiliSonuc', JSON.stringify(existingResult));

                        hideLoading();

                        // 5. Sonuç sayfasına yönlendir (detaylı IPS raporu orada gösterilecek)
                        window.location.href = 'risk-profili-anketi-sonuc/';

                        resolve(confirmResult);
                    } catch (error) {
                        hideLoading();
                        showError(error.message);
                        resolve(null);
                    }
                });
            });
        }

        // 3. Tutarsızlık yoksa direkt sonuç sayfasına yönlendir
        hideLoading();

        // Expert AI içeriklerini localStorage'a kaydet
        const existingResult = JSON.parse(localStorage.getItem('riskProfiliSonuc') || '{}');
        existingResult.risk = analyzeResult.risk;
        existingResult.ips_sections = analyzeResult.ips_sections;
        if (analyzeResult.expert_content) {
            existingResult.expert_content = analyzeResult.expert_content;
        }
        localStorage.setItem('riskProfiliSonuc', JSON.stringify(existingResult));

        // Sonuç sayfasına yönlendir (detaylı IPS raporu orada gösterilecek)
        window.location.href = 'risk-profili-anketi-sonuc/';
        return analyzeResult;

    } catch (error) {
        console.warn('[IPS] API hatası, lokal hesaplamaya geçiliyor:', error.message);

        // FALLBACK: API başarısız olursa lokal hesaplama yap
        try {
            const localResult = generateLocalResult(surveyAnswers);

            // localStorage'a kaydet
            const existingResult = JSON.parse(localStorage.getItem('riskProfiliSonuc') || '{}');
            existingResult.risk = localResult.risk;
            existingResult.riskResult = localResult.riskResult;
            existingResult.fullIPS = localResult.fullIPS;
            existingResult.isLocalFallback = true;
            existingResult.surveyAnswers = surveyAnswers; // Cevapları da kaydet
            localStorage.setItem('riskProfiliSonuc', JSON.stringify(existingResult));

            hideLoading();

            console.log('[IPS] Lokal fallback başarılı, sonuç sayfasına yönlendiriliyor...');

            // Sonuç sayfasına yönlendir
            window.location.href = 'risk-profili-anketi-sonuc/';
            return localResult;

        } catch (fallbackError) {
            console.error('[IPS] Lokal fallback da başarısız:', fallbackError);
            hideLoading();
            showError('İşlem tamamlanamadı. Lütfen sayfayı yenileyip tekrar deneyin.');
            return null;
        }
    }
}

// CSS stilleri ekle
const ipsStyles = `
<style id="ips-styles">
.ips-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.ips-modal {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.ips-modal-large {
    max-width: 800px;
}

.ips-modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ips-modal-header h3 {
    margin: 0;
    color: #1a5f4a;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.ips-modal-body {
    padding: 20px;
}

.ips-modal-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary {
    background: #1a5f4a;
    color: white;
}

.btn-secondary {
    background: #f0f0f0;
    color: #333;
}

.conflict-intro {
    margin-bottom: 20px;
    padding: 15px;
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    border-radius: 0 8px 8px 0;
}

.conflict-intro p {
    margin: 0;
    color: #856404;
}

.conflict-question {
    margin-bottom: 20px;
}

.conflict-question .question-text {
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
}

.question-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.conflict-option {
    display: flex;
    align-items: flex-start;
    padding: 15px;
    background: #f9f9f9;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.conflict-option:hover {
    background: #f0f7f5;
    border-color: #1a5f4a;
}

.conflict-option input[type="radio"] {
    margin-right: 12px;
    margin-top: 3px;
    accent-color: #1a5f4a;
}

.conflict-option input[type="radio"]:checked + .option-label {
    color: #1a5f4a;
    font-weight: 600;
}

.option-label {
    flex: 1;
    line-height: 1.4;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.risk-summary {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #1a5f4a, #2d8a6e);
    border-radius: 12px;
    color: white;
}

.risk-score,
.risk-bucket {
    text-align: center;
}

.score-value,
.bucket-value {
    display: block;
    font-size: 32px;
    font-weight: bold;
}

.score-label,
.bucket-label {
    font-size: 12px;
    opacity: 0.8;
}

.update-note {
    padding: 12px;
    background: #fff3cd;
    border-radius: 8px;
    margin-bottom: 20px;
}

.ips-document {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.ips-document h2 {
    margin: 0;
    padding: 15px 20px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.ips-section {
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.ips-section:last-child {
    border-bottom: none;
}

.ips-section h3 {
    margin: 0 0 10px 0;
    color: #1a5f4a;
}

.ips-section p {
    margin: 0;
    line-height: 1.6;
    color: #444;
}

.ips-loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
}

.ips-loading {
    text-align: center;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1a5f4a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@media print {
    .ips-modal-overlay {
        position: static;
        background: none;
    }
    .ips-modal {
        box-shadow: none;
        max-width: none;
        width: 100%;
    }
    .ips-modal-footer,
    .close-btn {
        display: none;
    }
}
</style>
`;

// Sayfa yüklendiğinde stilleri tek sefer ekle
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('ips-styles')) {
        document.head.insertAdjacentHTML('beforeend', ipsStyles);
    }
});

// Global export
window.IPS = {
    generateIPS,
    analyzeForIPS,
    confirmForIPS,
    getIPSResult,
    calculateLocalRiskScore,
    formatAnswersForAPI,
};

