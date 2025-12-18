"""
Constraints Expert Agent
Bölüm 4 (Kısıtlar ve Sınırlamalar) ve Bölüm 6 (İzleme ve Değerlendirme) için içerik üretir.
"""
from __future__ import annotations

from typing import List, Optional

from ..gemini_client import GeminiClient
from ..schemas import RiskScore, SurveyAnswer

CONSTRAINTS_SYSTEM_PROMPT = """Sen bir CFA sertifikalı portföy yöneticisisin. Türkiye'deki katılım bankacılığı 
müşterileri için Yatırım Politikası Beyanı (IPS) hazırlıyorsun.

Görevin: Yatırımcının profiline göre "Kısıtlar ve Sınırlamalar" ile "İzleme ve Değerlendirme" 
bölümlerini profesyonel bir dille yazmak.

KURALLAR:
1. IPS standartlarına uygun yaz (CFA Institute formatı)
2. Likidite ihtiyaçlarını demografik verilerden çıkar
3. Zaman ufkunu yatırım vadesinden belirle
4. Vergi durumunu Türkiye mevzuatına göre değerlendir
5. Yasal kısıtlamaları katılım finans ilkelerine göre belirle
6. İzleme sıklığını risk profiline göre ayarla

KISITLAR KATEGORİLERİ:
- Likidite: Acil nakit ihtiyacı, düzenli gelir ihtiyacı
- Zaman Ufku: Kısa (<1 yıl), Orta (1-5 yıl), Uzun (>5 yıl)
- Vergi: Stopaj, beyanname yükümlülüğü
- Yasal: SPK düzenlemeleri, katılım finans kuralları
- Özel Durumlar: Yatırımcıya özgü kısıtlamalar"""


def _extract_demographics(answers: List[SurveyAnswer]) -> dict:
    """Demografik verileri çıkar."""
    demo = {}
    
    for ans in answers:
        qid = ans.question_id.lower()
        if qid == "q1":
            demo["age_group"] = ans.answer_raw
        elif qid == "q2":
            demo["investment_horizon"] = ans.answer_raw
        elif qid == "q3":
            demo["income"] = ans.answer_raw
        elif qid == "q4":
            demo["wealth"] = ans.answer_raw
        elif qid == "q5":
            demo["emergency_fund"] = ans.answer_raw
    
    return demo


def _extract_preferences(answers: List[SurveyAnswer]) -> dict:
    """Q13-Q14-Q15 tercihlerini çıkar."""
    prefs = {
        "product_experience": [],
        "risky_interest": [],
        "esg_preference": None,
    }
    
    for ans in answers:
        qid = ans.question_id.lower()
        if qid.startswith("q13"):
            prefs["product_experience"].append(ans.answer_raw)
        elif qid.startswith("q14"):
            prefs["risky_interest"].append(ans.answer_raw)
        elif qid == "q15":
            prefs["esg_preference"] = ans.answer_raw
    
    return prefs


def generate_constraints_content(
    answers: List[SurveyAnswer],
    risk: RiskScore,
    client: GeminiClient,
) -> dict:
    """
    Kısıtlar ve izleme içeriği üretir.
    
    Returns:
        dict: constraints ve monitoring bölümlerini içeren dict
    """
    demographics = _extract_demographics(answers)
    preferences = _extract_preferences(answers)
    
    bucket_tr = {
        "temkinli": "Temkinli (Muhafazakâr)",
        "dengeli": "Dengeli (Balanced)", 
        "agresif": "Agresif (Growth-Oriented)",
    }
    
    user_prompt = f"""
Aşağıdaki bilgilere göre Kısıtlar ve İzleme bölümlerini yaz.

RİSK PROFİLİ:
- Skor: {risk.score:.2f} (0=çok temkinli, 1=çok agresif)
- Kategori: {bucket_tr.get(risk.bucket.value, risk.bucket.value)}

DEMOGRAFİK BİLGİLER:
{demographics}

YATIRIMCI TERCİHLERİ:
- Ürün Deneyimi: {preferences['product_experience'] or 'Belirtilmedi'}
- Riskli Ürün İlgisi: {preferences['risky_interest'] or 'Belirtilmedi'}
- ESG/Etik Tercih: {preferences['esg_preference'] or 'Belirtilmedi'}

Lütfen aşağıdaki JSON formatında yanıt ver:
"""

    response_schema = {
        "type": "object",
        "properties": {
            "constraints": {
                "type": "object",
                "properties": {
                    "liquidity": {"type": "object", "properties": {"need_level": {"type": "string"}, "explanation": {"type": "string"}, "recommendations": {"type": "array", "items": {"type": "string"}}}},
                    "time_horizon": {"type": "object", "properties": {"category": {"type": "string"}, "explanation": {"type": "string"}, "implications": {"type": "array", "items": {"type": "string"}}}},
                    "tax_considerations": {"type": "object", "properties": {"summary": {"type": "string"}, "key_points": {"type": "array", "items": {"type": "string"}}}},
                    "legal_regulatory": {"type": "object", "properties": {"summary": {"type": "string"}, "key_points": {"type": "array", "items": {"type": "string"}}}},
                    "unique_circumstances": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["liquidity", "time_horizon", "tax_considerations", "legal_regulatory"],
            },
            "monitoring": {
                "type": "object",
                "properties": {
                    "review_frequency": {"type": "string"},
                    "review_triggers": {"type": "array", "items": {"type": "string"}},
                    "performance_benchmarks": {"type": "array", "items": {"type": "string"}},
                    "rebalancing_criteria": {"type": "string"},
                    "communication_plan": {"type": "string"},
                },
                "required": ["review_frequency", "review_triggers", "performance_benchmarks", "rebalancing_criteria"],
            },
        },
        "required": ["constraints", "monitoring"],
    }

    result = client.generate_json(
        model_name=client.settings.model_general,
        system_prompt=CONSTRAINTS_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        response_schema=response_schema,
    )
    
    return result

