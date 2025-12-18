"""
Profile & Risk Expert Agent
Bölüm 1 (Yatırımcı Profili) ve Bölüm 2 (Risk Analizi) için profesyonel içerik üretir.
"""
from __future__ import annotations

from typing import List, Optional

from ..gemini_client import GeminiClient
from ..schemas import (
    ConflictCheckResult,
    RiskScore,
    SurveyAnswer,
)

PROFILE_RISK_SYSTEM_PROMPT = """Sen bir CFA sertifikalı yatırım danışmanısın. Türkiye'deki katılım bankacılığı 
müşterileri için Yatırım Politikası Beyanı (IPS) hazırlıyorsun.

Görevin: Verilen anket cevaplarına göre "Yatırımcı Profili" ve "Risk Analizi" 
bölümlerini profesyonel, kişiselleştirilmiş ve anlaşılır bir dille yazmak.

KURALLAR:
1. Teknik jargon kullanma, sade Türkçe yaz
2. "Siz" hitabı kullan (saygılı, profesyonel)
3. Sayısal verileri yorumla, sadece tekrarlama
4. Tutarsızlık varsa nazikçe açıkla, eleştirme
5. Her cümle müşteriye değer katmalı
6. SPK düzenlemelerine uygun ol
7. Katılım finans ilkelerine atıf yap

YATIRIMCI PROFİLİ BÖLÜMÜ İÇİN:
- Demografik özellikleri analiz et (yaş, gelir, deneyim)
- Yatırımcı kişiliğini tanımla
- Güçlü yönleri ve dikkat edilmesi gereken noktaları belirt

RİSK ANALİZİ BÖLÜMÜ İÇİN:
- Risk kapasitesi (finansal olarak ne kadar risk alabilir)
- Risk istekliliği (psikolojik olarak ne kadar risk almak istiyor)
- Tutarsızlık varsa açıkla (disposition effect, loss aversion vb.)
- Genel değerlendirme ve sonuç"""


def _extract_answer_info(answers: List[SurveyAnswer]) -> dict:
    """Anket cevaplarından okunabilir bilgi çıkar."""
    info = {}
    
    # Soru ID -> açıklama eşleştirmesi
    question_labels = {
        "q1": "Yaş grubu",
        "q2": "Yatırım vadesi",
        "q3": "Aylık gelir",
        "q4": "Toplam varlık",
        "q5": "Finansal yükümlülükler",
        "q6": "Yatırım deneyimi",
        "q7": "Kayıp toleransı",
        "q8": "Yatırım süresi tercihi",
        "q9": "Acil durum fonu",
        "q10": "Portföy düşüşü tepkisi",
        "q11": "Risk-getiri tercihi",
        "q12": "Kazanç davranışı",
        "q13": "Ürün tercihi",
        "q14": "Likidite ihtiyacı",
        "q15": "ESG/Etik tercih",
    }
    
    for ans in answers:
        qid = ans.question_id
        label = question_labels.get(qid, qid)
        info[qid] = {
            "label": label,
            "answer": ans.answer_raw,
            "scale": ans.answer_scale,
        }
    
    return info


def generate_profile_risk_content(
    answers: List[SurveyAnswer],
    risk: RiskScore,
    conflict: Optional[ConflictCheckResult],
    client: GeminiClient,
) -> dict:
    """
    Yatırımcı profili ve risk analizi içeriği üretir.
    
    Returns:
        dict: investor_profile ve risk_analysis bölümlerini içeren dict
    """
    answer_info = _extract_answer_info(answers)
    
    # Risk bucket'ı Türkçe'ye çevir
    bucket_tr = {
        "temkinli": "Temkinli (Muhafazakâr)",
        "dengeli": "Dengeli (Balanced)",
        "agresif": "Agresif (Growth-Oriented)",
    }
    
    user_prompt = f"""
Aşağıdaki anket cevaplarına göre Yatırımcı Profili ve Risk Analizi bölümlerini yaz.

ANKET CEVAPLARI:
{answer_info}

RİSK SKORU:
- Skor: {risk.score:.2f} (0-1 arası, 0=çok temkinli, 1=çok agresif)
- Kategori: {bucket_tr.get(risk.bucket.value, risk.bucket.value)}
- Mevcut değerlendirme: {risk.rationale}

TUTARSIZLIK DURUMU:
- Var mı: {"Evet" if conflict and conflict.has_conflict else "Hayır"}
- Açıklama: {conflict.tespit_edilen_celiski if conflict and conflict.tespit_edilen_celiski else "Yok"}

Lütfen aşağıdaki JSON formatında yanıt ver:
"""

    response_schema = {
        "type": "object",
        "properties": {
            "investor_profile": {
                "type": "object",
                "properties": {
                    "summary": {"type": "string", "description": "2-3 cümlelik genel profil özeti"},
                    "demographics_analysis": {"type": "string", "description": "Yaş, gelir, deneyim analizi"},
                    "investment_personality": {"type": "string", "description": "Yatırımcı kişiliği tanımı"},
                    "strengths": {"type": "array", "items": {"type": "string"}, "description": "Güçlü yönler"},
                    "attention_points": {"type": "array", "items": {"type": "string"}, "description": "Dikkat noktaları"},
                },
                "required": ["summary", "demographics_analysis", "investment_personality", "strengths", "attention_points"],
            },
            "risk_analysis": {
                "type": "object", 
                "properties": {
                    "capacity_score": {"type": "string", "description": "Düşük/Orta/Yüksek"},
                    "capacity_explanation": {"type": "string", "description": "Risk kapasitesi açıklaması"},
                    "willingness_score": {"type": "string", "description": "Düşük/Orta/Yüksek"},
                    "willingness_explanation": {"type": "string", "description": "Risk istekliliği açıklaması"},
                    "inconsistency_found": {"type": "boolean"},
                    "inconsistency_explanation": {"type": "string", "description": "Tutarsızlık açıklaması (varsa)"},
                    "overall_assessment": {"type": "string", "description": "Genel değerlendirme ve sonuç"},
                },
                "required": ["capacity_score", "capacity_explanation", "willingness_score", "willingness_explanation", "overall_assessment"],
            },
        },
        "required": ["investor_profile", "risk_analysis"],
    }

    result = client.generate_json(
        model_name=client.settings.model_general,
        system_prompt=PROFILE_RISK_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        response_schema=response_schema,
    )
    
    return result

