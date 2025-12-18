
const GEMINI_API_KEY = "AIzaSyCSSuTftQ0FC2WtAuVVHqS5hTu9spBWJiM";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Risk scenario templates
const scenarioTemplates = [
    "Elinize beklenmedik bir toplu para geçtiğinde nasıl değerlendirmek istersiniz?",
    "Arkadaşınızın yüksek getiri vaat eden iş teklifine tüm birikiminizle girer misiniz?",
    "Emeklilik için birikiminiz planlanandan eksik kalırsa riskli yatırımlarla açığı kapatmaya çalışır mısınız?"
];

// Basitleştirilmiş finansal terimler
const simplifiedTerms = {
    'volatilite': 'dalgalanma',
    'likidite': 'nakde çevirme kolaylığı', 
    'faiz': 'kazanç payı',
    'enflasyon': 'fiyat artışı',
    'portföy': 'yatırım sepeti',
    'risk': 'kaybetme olasılığı',
    'getiri': 'kazanç',
    'yatırım fonu': 'birlikte yatırım',
    'hisse senedi': 'şirket ortaklığı',
    'tahvil': 'borç senedi',
    'emeklilik': 'yaşlılık birikimi',
    'bireysel emeklilik': 'kendi emeklilik planınız',
    'katılım fonu': 'faizsiz yatırım',
    'kripto para': 'dijital para',
    'mevduat': 'bankada para'
};

// Yaş gruplarına göre dil uyarlaması
const ageGroups = {
    child: { // 7-17
        tone: 'oyunlaştırılmış',
        examples: 'harçlık, hediye, okul',
        complexity: 'çok basit'
    },
    young: { // 18-25
        tone: 'samimi',
        examples: 'arkadaş, parti, telefon, eğitim',
        complexity: 'basit'
    },
    adult: { // 26-45
        tone: 'profesyonel',
        examples: 'iş, aile, ev, araba',
        complexity: 'orta'
    },
    middle: { // 46-60
        tone: 'saygılı',
        examples: 'çocuk, sağlık, emeklilik, yatırım',
        complexity: 'standart'
    },
    senior: { // 60+
        tone: 'nazik',
        examples: 'sağlık, torun, miras, huzur',
        complexity: 'çok basit'
    }
};

// Yaş grubunu belirle
function getAgeGroup(age) {
    if (age <= 17) return 'child';
    if (age <= 25) return 'young';
    if (age <= 45) return 'adult';
    if (age <= 60) return 'middle';
    return 'senior';
}

// Finansal terimleri basitleştir
function simplifyText(text) {
    let simplifiedText = text;
    
    Object.keys(simplifiedTerms).forEach(term => {
        const regex = new RegExp(term, 'gi');
        if (regex.test(simplifiedText)) {
            const replacement = simplifiedTerms[term];
            simplifiedText = simplifiedText.replace(regex, replacement);
        }
    });
    
    return simplifiedText;
}

// Yaşa göre örnekler oluştur
function generateAgeExamples(age, template) {
    const ageGroup = getAgeGroup(age);
    const group = ageGroups[ageGroup];
    
    let examples = template;
    
    // Yaş grubuna göre örnekler ekle
    if (ageGroup === 'child' || ageGroup === 'young') {
        examples = examples.replace('toplu para', 'ekstra harçlık')
                       .replace('birikiminiz', 'biriktirdiğiniz para')
                       .replace('emeklilik', 'gelecek için birikim');
    } else if (ageGroup === 'middle' || ageGroup === 'senior') {
        examples = examples.replace('toplu para', 'beklenmedik miras')
                       .replace('birikiminiz', 'emeklilik birikiminiz')
                       .replace('emeklilik', 'rahat emeklilik hayatı');
    }
    
    return examples;
}

/**
 * Generates a personalized scenario question using the Gemini API.
 * @param {object} demographics - The user's demographic information.
 * @param {string} template - The question template to personalize.
 * @returns {Promise<string>} - The personalized question.
 */
async function generatePersonalizedQuestion(demographics, template) {
    const prompt = `
        Aşağıdaki demografik bilgilere sahip bir kullanıcı için bu risk senaryosu soru şablonunu kişiselleştir:

        Demografik Bilgiler:
        - Yaş: ${demographics.age}
        - Cinsiyet: ${demographics.gender}
        - Meslek: ${demographics.profession}
        - Gelir: ${demographics.income}
        - Finansal Deneyim: ${demographics.experience}

        Soru Şablonu: "${template}"

        Kişiselleştirilmiş Soru (2-3 cümlelik bir senaryo ve ardından bir soru olmalı):
    `;

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const personalizedQuestion = data.candidates[0].content.parts[0].text;
        return personalizedQuestion.trim();
    } catch (error) {
        console.error("Error generating personalized question:", error);
        return "Anket sorusu oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
    }
}
