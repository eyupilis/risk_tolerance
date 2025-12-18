"""
Strategy Expert Agent
Bölüm 3 (Yatırım Hedefleri) ve Bölüm 5 (Varlık Dağılımı Stratejisi) için profesyonel içerik üretir.
IPS'e uygun varlık sınıfı bazında strateji ve Q13-Q14-Q15 politikaları.
"""
from __future__ import annotations

from typing import List, Optional

from ..gemini_client import GeminiClient
from ..schemas import RiskScore, SurveyAnswer

STRATEGY_SYSTEM_PROMPT = """Sen bir CFA sertifikalı portföy yöneticisisin. Türkiye'deki katılım bankacılığı 
müşterileri için Yatırım Politikası Beyanı (IPS) hazırlıyorsun.

Görevin: Yatırımcının risk profili ve tercihlerine göre "Yatırım Hedefleri" ve 
"Varlık Dağılımı Stratejisi" bölümlerini profesyonel bir dille yazmak.

KURALLAR:
1. IPS standartlarına uygun yaz (CFA Institute formatı)
2. Varlık SINIFI bazında strateji belirle (spesifik fon ismi YAZMA)
3. Q13 (Ürün deneyimi), Q14 (Riskli ürün ilgisi), Q15 (ESG/Etik tercih) cevaplarını dikkate al
4. Katılım finans ilkelerine uygun varlık sınıfları kullan:
   - Sukuk/Kira Sertifikası (faiz yerine kira getirisi)
   - Katılım Hisse Fonları (şeriat uyumlu)
   - Altın/Kıymetli Madenler
   - Para Piyasası (katılım hesabı bazlı)
5. Yüzdelik aralıklar ver (örn: %20-30), kesin rakam değil
6. Her stratejiyi risk profiliyle gerekçelendir

VARLIK SINIFLARI:
- sukuk_kira_sertifikasi: Düşük-orta risk, sabit getiri
- hisse_katilim: Orta-yüksek risk, büyüme potansiyeli  
- altin_kiymetli_maden: Orta risk, enflasyon koruması
- para_piyasasi: Çok düşük risk, likidite"""


def _extract_preferences(answers: List[SurveyAnswer]) -> dict:
    """Q13-Q14-Q15 tercihlerini çıkar."""
    prefs = {
        "product_experience": [],
        "risky_interest": [],
        "esg_preference": None,
        "esg_text": None,
    }
    
    for ans in answers:
        qid = ans.question_id.lower()
        
        # Q13 - Ürün deneyimi (çoklu seçim olabilir)
        if qid.startswith("q13"):
            prefs["product_experience"].append(ans.answer_raw)
        
        # Q14 - Riskli ürün ilgisi
        elif qid.startswith("q14"):
            prefs["risky_interest"].append(ans.answer_raw)
        
        # Q15 - ESG/Etik tercih
        elif qid == "q15":
            prefs["esg_preference"] = ans.answer_raw
        elif qid == "q15_text":
            prefs["esg_text"] = ans.answer_raw
    
    return prefs


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


def generate_strategy_content(
    answers: List[SurveyAnswer],
    risk: RiskScore,
    client: GeminiClient,
) -> dict:
    """
    Yatırım hedefleri ve varlık dağılımı stratejisi içeriği üretir.
    
    Returns:
        dict: investment_goals ve asset_strategy bölümlerini içeren dict
    """
    preferences = _extract_preferences(answers)
    demographics = _extract_demographics(answers)
    
    bucket_tr = {
        "temkinli": "Temkinli (Muhafazakâr)",
        "dengeli": "Dengeli (Balanced)", 
        "agresif": "Agresif (Growth-Oriented)",
    }
    
    user_prompt = f"""
Aşağıdaki bilgilere göre Yatırım Hedefleri ve Varlık Dağılımı Stratejisi bölümlerini yaz.

RİSK PROFİLİ:
- Skor: {risk.score:.2f} (0=çok temkinli, 1=çok agresif)
- Kategori: {bucket_tr.get(risk.bucket.value, risk.bucket.value)}

DEMOGRAFİK BİLGİLER:
{demographics}

YATIRIMCI TERCİHLERİ (ÖNEMLİ):
- Ürün Deneyimi (Q13): {preferences['product_experience'] or 'Belirtilmedi'}
- Riskli Ürün İlgisi (Q14): {preferences['risky_interest'] or 'Belirtilmedi'}
- ESG/Etik Tercih (Q15): {preferences['esg_preference'] or 'Belirtilmedi'}
- ESG Detay: {preferences['esg_text'] or 'Yok'}

Lütfen aşağıdaki JSON formatında yanıt ver:
"""

    response_schema = {
        "type": "object",
        "properties": {
            "investment_goals": {
                "type": "object",
                "properties": {
                    "primary_goal": {"type": "string"},
                    "secondary_goals": {"type": "array", "items": {"type": "string"}},
                    "time_horizon_analysis": {"type": "string"},
                    "return_expectations": {"type": "string"},
                    "risk_budget": {"type": "string"},
                },
                "required": ["primary_goal", "time_horizon_analysis", "return_expectations", "risk_budget"],
            },
            "asset_strategy": {
                "type": "object",
                "properties": {
                    "strategy_name": {"type": "string"},
                    "strategy_rationale": {"type": "string"},
                    "allocations": {
                        "type": "object",
                        "properties": {
                            "sukuk_kira_sertifikasi": {"type": "object", "properties": {"range": {"type": "string"}, "rationale": {"type": "string"}}},
                            "hisse_katilim": {"type": "object", "properties": {"range": {"type": "string"}, "rationale": {"type": "string"}}},
                            "altin_kiymetli_maden": {"type": "object", "properties": {"range": {"type": "string"}, "rationale": {"type": "string"}}},
                            "para_piyasasi": {"type": "object", "properties": {"range": {"type": "string"}, "rationale": {"type": "string"}}},
                        },
                    },
                    "rebalancing_policy": {"type": "string"},
                },
                "required": ["strategy_name", "strategy_rationale", "allocations", "rebalancing_policy"],
            },
            "esg_policy": {
                "type": "object",
                "properties": {
                    "is_participatory": {"type": "boolean"},
                    "restrictions": {"type": "array", "items": {"type": "string"}},
                    "rationale": {"type": "string"},
                },
                "required": ["is_participatory", "rationale"],
            },
            "suitability_notes": {
                "type": "object", 
                "properties": {
                    "experience_match": {"type": "string"},
                    "warnings": {"type": "array", "items": {"type": "string"}},
                },
            },
        },
        "required": ["investment_goals", "asset_strategy", "esg_policy"],
    }

    result = client.generate_json(
        model_name=client.settings.model_general,
        system_prompt=STRATEGY_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        response_schema=response_schema,
    )
    
    return result

