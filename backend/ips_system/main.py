from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import random
import uuid
import math
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS mock configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Answer(BaseModel):
    question_id: str
    answer_value: str
    answer_scale: Optional[float] = None

class AnalyzeRequest(BaseModel):
    answers: List[Answer]

class ConfirmRequest(BaseModel):
    trace_id: str
    answer_raw: str
    answer_scale: float

# Mock Data Generation
def generate_mock_ips_response(risk_score: float, answers: list = None, capacity_score: int = None, willingness_score: int = None):
    # Determine bucket
    if risk_score < 0.4:
        bucket = "temkinli"
        profile_text = "Temkinli (Muhafazakar)"
        risk_level = "Düşük"
    elif risk_score < 0.7:
        bucket = "dengeli"
        profile_text = "Dengeli"
        risk_level = "Orta"
    else:
        bucket = "agresif"
        profile_text = "Agresif (Dinamik)"
        risk_level = "Yüksek"
        
    # Eğer kapasite ve isteklilik skorları verilmediyse, risk skorundan tahmin et (fallback)
    if capacity_score is None:
        capacity_score = int(risk_score * 100 * 0.9) # Hafif düşük tahmin
    if willingness_score is None:
        willingness_score = int(risk_score * 100 * 1.05) # Hafif yüksek tahmin
        
    # Skorları 0-100 arasına sınırla
    capacity_score = max(0, min(100, capacity_score))
    willingness_score = max(0, min(100, willingness_score))
        
    return {
        "status": "completed",
        "risk": {
            "score": risk_score,
            "bucket": bucket,
            "rationale": f"Hesaplanan risk skoru: {risk_score:.2f}"
        },
        "ips_sections": {
            "profil": f"{profile_text} bir yatırımcı profiline sahipsiniz. {risk_level} risk toleransı ile sermaye koruma ve istikrarlı getiri odaklı bir strateji önerilmektedir.",
            "kisitlar": "Kısa vadeli likidite ihtiyaçlarınız, finansal durumunuz ve risk toleransınız göz önüne alınarak yatırım kısıtlamalarınız belirlenmiştir. Yüksek volatiliteli ürünlerden kaçınılması ve likidite ihtiyacına uygun vade yapısı önerilmektedir.",
            "strateji": f"Portföyünüz {profile_text.lower()} bir yaklaşımla çeşitlendirilmiştir. Para piyasası araçları, kira sertifikaları ve dengeli fonlar ağırlıklı bir dağılım ile riskin minimize edilmesi hedeflenmektedir.",
            "yasal_uyarilar": "Bu rapor yatırım tavsiyesi niteliğinde değildir. Yatırım kararları kişisel mali durumunuza göre değerlendirilmelidir. Geçmiş performans gelecek sonuçların garantisi değildir. SPK düzenlemeleri kapsamında hazırlanmıştır.",
            "ek_notlar": "Piyasa koşullarına göre portföyünüzü periyodik olarak gözden geçirmeniz ve yıllık IPS güncellemesi yapmanız önerilmektedir."
        },
        "expert_content": {
            # 1. Yatırımcı Profili - Bölüm 1'de kullanılıyor
            "investor_profile": {
                "summary": f"Anket sonuçlarınıza göre {profile_text.lower()} bir yatırımcı profili sergiliyorsunuz. {risk_level} risk toleransınız ve finansal hedefleriniz doğrultusunda, sermaye koruma ile istikrarlı getiri arasında denge kuran bir strateji sizin için en uygun seçenektir.",
                "demographics_analysis": "Demografik verileriniz ve finansal durumunuz analiz edildiğinde, mevcut yaşam döngüsü aşamanızda likidite ihtiyaçlarınızı karşılayacak, ancak uzun vadeli sermaye birikimini de destekleyecek bir portföy yapısı önerilmektedir. Düzenli gelir akışınız ve mevcut varlık durumunuz risk alma kapasitenizi şekillendirmektedir.",
                "investment_personality": f"Yatırım kararlarınızda {('temkinli ve analitik' if risk_score < 0.4 else 'dengeli ve pragmatik' if risk_score < 0.7 else 'proaktif ve fırsatçı')} bir yaklaşım sergiliyorsunuz. Piyasa dalgalanmalarına karşı {('güvenli limanlara yönelme' if risk_score < 0.4 else 'bekleme ve gözlemleme' if risk_score < 0.7 else 'fırsat olarak değerlendirme')} eğilimindesiniz.",
                "strengths": [
                    "Finansal hedefler konusunda net bir vizyona sahipsiniz",
                    "Risk-getiri ilişkisini anlıyor ve buna göre karar veriyorsunuz",
                    "Uzun vadeli düşünme kapasitesine sahipsiniz",
                    "Yatırım araçları hakkında temel bilgiye sahipsiniz"
                ],
                "attention_points": [
                    "Enflasyon riski ve reel getiri takibi önemlidir",
                    "Likidite yönetimi ve acil durum fonu ayrımı yapılmalıdır",
                    "Duygusal kararlardan kaçınmak için IPS'e sadık kalınmalıdır",
                    "Periyodik portföy değerlendirmesi ihmal edilmemelidir"
                ]
            },
            
            # 2. Yatırım Hedefleri - Bölüm 3'te kullanılıyor
            "investment_goals": {
                "primary_goal": f"Birincil yatırım hedefiniz, {('sermayenizi koruyarak enflasyonun üzerinde reel getiri elde etmektir' if risk_score < 0.4 else 'risk ve getiri arasında denge kurarak uzun vadede varlık artışı sağlamaktır' if risk_score < 0.7 else 'yüksek getiri potansiyeli olan fırsatları değerlendirerek maksimum sermaye büyümesi elde etmektir')}. Bu hedef, risk profiliniz ve finansal durumunuz göz önüne alınarak belirlenmiştir.",
                "secondary_goals": [
                    "Emeklilik dönemine hazırlık için birikim oluşturmak",
                    "Beklenmedik harcamalar için likidite tamponu bulundurmak",
                    "Portföy çeşitlendirmesi ile riskleri minimize etmek"
                ],
                "time_horizon_analysis": f"Yatırım süreniz {('kısa vade (1-3 yıl) olarak değerlendirilmektedir. Bu süre zarfında yüksek volatiliteli varlıklardan kaçınılması, likiditenin ön planda tutulması gerekmektedir.' if risk_score < 0.4 else 'orta vade (3-5 yıl) olarak değerlendirilmektedir. Bu süre, piyasa dalgalanmalarını tolere etmenize ve fırsat maliyetlerinden kaçınmanıza olanak tanır.' if risk_score < 0.7 else 'uzun vade (5+ yıl) olarak değerlendirilmektedir. Uzun vadeli yatırım ufkunuz, kısa vadeli dalgalanmalardan etkilenmeden büyüme odaklı varlıklara yatırım yapmanıza imkan tanır.')}",
                "return_expectations": f"Risk profilinize göre beklenen yıllık getiri hedefi {('TÜFE + %2-4 (reel getiri)' if risk_score < 0.4 else 'TÜFE + %4-6 (reel getiri)' if risk_score < 0.7 else 'TÜFE + %6-10 (reel getiri)')} aralığındadır. Bu hedef, piyasa koşullarına göre değişkenlik gösterebilir ve garanti edilmez.",
                "risk_budget": f"Portföyünüz için belirlenen risk bütçesi, maksimum {('-%5 ile -%10' if risk_score < 0.4 else '-%10 ile -%15' if risk_score < 0.7 else '-%15 ile -%25')} arasında kısa vadeli kayıp toleransı ve yıllık {('<%10' if risk_score < 0.4 else '%10-15' if risk_score < 0.7 else '%15-20')} volatilite kabul etmektedir."
            },
            
            # 3. Risk Analizi - Bölüm 4'te kullanılıyor (renderer formatına uygun)
            "risk_analysis": {
                "capacity_score": f"{capacity_score}",
                "capacity_explanation": f"Finansal durumunuz, gelir istikrarınız ve mevcut varlıklarınız göz önüne alındığında, risk alma kapasiteniz {('sınırlı' if capacity_score < 40 else 'orta düzeyde' if capacity_score < 70 else 'yüksek')} olarak değerlendirilmiştir. {'Kısa vadeli nakit ihtiyaçlarınızın karşılanması önceliklidir.' if capacity_score < 40 else 'Acil durum fonunuz bulunmakta olup, orta vadeli kayıpları absorbe edebilecek kapasiteniz mevcuttur.' if capacity_score < 70 else 'Güçlü finansal temel ve düşük kısa vadeli yükümlülükler, yüksek risk almayı mümkün kılmaktadır.'}",
                "willingness_score": f"{willingness_score}",
                "willingness_explanation": f"Anket cevaplarınız, piyasa dalgalanmalarına karşı {('düşük tolerans' if willingness_score < 40 else 'orta düzey tolerans' if willingness_score < 70 else 'yüksek tolerans')} gösterdiğinizi ortaya koymaktadır. {'Kayıp durumlarında endişe düzeyiniz yüksek olup, istikrarlı getiri beklentiniz bulunmaktadır.' if willingness_score < 40 else 'Makul düzeyde dalgalanmaları kabul edebilir, ancak aşırı kayıplardan kaçınmak istiyorsunuz.' if willingness_score < 70 else 'Yüksek getiri potansiyeli için kısa vadeli kayıpları tolere etmeye hazırsınız.'}",
                "overall_assessment": f"Risk kapasitesi ({capacity_score}/100) ve risk istekliliğiniz ({willingness_score}/100) birlikte değerlendirildiğinde, {profile_text} bir yatırımcı profili ortaya çıkmaktadır. Bu profil, {('sermaye koruma ve istikrar odaklı' if risk_score < 0.4 else 'getiri ve risk arasında denge gözeten' if risk_score < 0.7 else 'büyüme ve maksimum getiri hedefleyen')} bir strateji gerektirmektedir. Portföy önerileriniz bu profile uygun olarak hazırlanmıştır.",
                "inconsistency_found": False,
                "inconsistency_explanation": ""
            },
            
            # 4. Kısıtlamalar - Bölüm 5'te kullanılıyor (renderer formatına uygun)
            "constraints": {
                "liquidity": {
                    "need_level": f"{('Yüksek' if risk_score < 0.4 else 'Orta' if risk_score < 0.7 else 'Düşük')}",
                    "explanation": f"Likidite ihtiyacınız {('yüksek olarak değerlendirilmiştir. Portföyünüzün en az %20-30u kolayca nakde çevrilebilir varlıklardan oluşmalıdır.' if risk_score < 0.4 else 'orta düzeyde değerlendirilmiştir. Portföyünüzün %10-20si likit varlıklardan oluşması önerilmektedir.' if risk_score < 0.7 else 'düşük olarak değerlendirilmiştir. Likit varlık oranı %5-10 seviyesinde tutulabilir.')}",
                    "recommendations": [
                        "Acil durum fonu olarak 3-6 aylık gideri karşılayacak nakit tutun",
                        "Para piyasası fonları likidite için ideal araçlardır",
                        "Büyük harcama planlarını önceden değerlendirin"
                    ]
                },
                "time_horizon": {
                    "category": f"{('Kısa Vade (1-3 yıl)' if risk_score < 0.4 else 'Orta Vade (3-5 yıl)' if risk_score < 0.7 else 'Uzun Vade (5+ yıl)')}",
                    "explanation": "Yatırım süreniz, varlık dağılımı ve risk toleransınızı doğrudan etkileyen kritik bir faktördür.",
                    "implications": [
                        f"{'Kısa vadeli araçlara ağırlık verilmelidir' if risk_score < 0.4 else 'Dengeli bir vade dağılımı uygulanmalıdır' if risk_score < 0.7 else 'Uzun vadeli büyüme varlıkları tercih edilebilir'}",
                        "Piyasa döngülerini göz önünde bulundurun",
                        "Hedef tarihe yaklaştıkça risk azaltılmalıdır"
                    ]
                },
                "tax_considerations": {
                    "summary": "Yatırım fonları vergisel açıdan avantajlı araçlardır. Katılım fonlarında da benzer vergi uygulamaları geçerlidir.",
                    "key_points": [
                        "1 yıldan uzun tutulan fonlarda kazanç vergisi gelir vergisi tarifesine tabi",
                        "Stopaj kesintisi fon türüne göre değişmektedir",
                        "Vergi planlaması için profesyonel danışmanlık önerilir"
                    ]
                },
                "legal_regulatory": {
                    "summary": "Tüm yatırımlarınız SPK ve TCMB düzenlemelerine uygun olarak yapılmaktadır.",
                    "key_points": [
                        "SPK onaylı yatırım araçları kullanılmaktadır",
                        "Katılım finans ilkelerine uygunluk sağlanmaktadır",
                        "Yatırımcı hakları mevzuatla korunmaktadır"
                    ]
                },
                "unique_circumstances": [
                    "Katılım esaslı / faizsiz ürünler tercih edilmektedir",
                    "Faiz içeren yatırım araçları kapsam dışındadır",
                    "ESG kriterleri göz önünde bulundurulmaktadır"
                ]
            },
            
            # 5. Davranışsal Bulgular - Bölüm 10'da kullanılıyor
            "behavioral_insights": {
                "loss_aversion": f"Kayıp durumlarında {'yüksek hassasiyet göstermektesiniz. Portföy düşüşlerinde panik satış riski bulunmaktadır.' if risk_score < 0.4 else 'orta düzeyde hassasiyet göstermektesiniz. Makul kayıpları tolere edebilirsiniz.' if risk_score < 0.7 else 'düşük hassasiyet göstermektesiniz. Kayıpları fırsat olarak değerlendirebilirsiniz.'}",
                "overconfidence": "Yatırım deneyiminiz ve öz değerlendirmeniz dengeli bir güven seviyesi yansıtmaktadır.",
                "herding": "Piyasa trendlerini takip etme eğiliminiz makul seviyededir.",
                "mental_accounting": "Farklı yatırım hedefleri için ayrı bütçe ayırma konusunda farkındalığınız bulunmaktadır.",
                    "recommendations": [
                        "Yatırım kararlarınızı IPS'te belirlenen kurallara göre alın",
                        "Piyasa haberlerine aşırı tepki vermekten kaçının",
                        "Portföy değerlendirmelerini önceden belirlenen tarihlerde yapın",
                        "Duygusal kararlar yerine sistematik yaklaşımı benimseyin"
                    ]
            },
            
            # 6. Fon Dağılımı Gerekçesi - Bölüm 6'da kullanılıyor
            "allocation_rationale": {
                "algorithm_summary": f"Portföy optimizasyonu, Modern Portföy Teorisi (Markowitz) ve katılım finans ilkeleri birleştirilerek gerçekleştirilmiştir. Risk skorunuz ({int(risk_score * 100)}/100) ve yatırımcı profiliniz ({profile_text}) temel alınarak, {('sermaye koruma ağırlıklı' if risk_score < 0.4 else 'dengeli risk-getiri' if risk_score < 0.7 else 'büyüme odaklı')} bir dağılım oluşturulmuştur.",
                "optimization_method": f"{('Minimum Varyans (Düşük Risk)' if risk_score < 0.4 else 'Maksimum Sharpe Oranı (Optimal)' if risk_score < 0.7 else 'Maksimum Getiri (Yüksek Risk)')}",
                "risk_score_impact": f"Risk skorunuz {int(risk_score * 100)} olarak hesaplanmıştır. Bu skor, {('düşük risk toleransına' if risk_score < 0.4 else 'orta düzey risk toleransına' if risk_score < 0.7 else 'yüksek risk toleransına')} karşılık gelmektedir. Portföy dağılımı bu tolerans seviyesine göre {('para piyasası ve kira sertifikası fonlarına ağırlık verilerek' if risk_score < 0.4 else 'karma ve dengeli fonlar arasında dağıtılarak' if risk_score < 0.7 else 'hisse senedi ve büyüme fonlarına yönlendirilerek')} optimize edilmiştir.",
                "ai_analysis": f"Yapay zeka destekli analizimiz, anket cevaplarınızı {len(answers) if answers else 15}+ faktör üzerinden değerlendirmiştir. Risk kapasitesi (%{capacity_score}) ve risk istekliliği (%{willingness_score}) skorlarınız birlikte ele alındığında, önerilen portföy dağılımının finansal hedefleriniz ve risk toleransınız ile uyumlu olduğu görülmektedir.",
                "diversification_notes": [
                    f"Portföyünüz {('3-4' if risk_score < 0.4 else '4-5' if risk_score < 0.7 else '5-6')} farklı fon ile çeşitlendirilmiştir",
                    "Tek bir varlık sınıfına aşırı yoğunlaşmaktan kaçınılmıştır",
                    "Sektörel ve vade yapısı çeşitlendirmesi sağlanmıştır",
                    "Katılım finans ilkelerine uygunluk her fonda doğrulanmıştır"
                ],
                "rebalancing_recommendation": f"Portföy dengelemesi {('3 ayda bir' if risk_score < 0.4 else '6 ayda bir' if risk_score < 0.7 else 'yılda bir')} gözden geçirilmeli ve hedef ağırlıklardan %5'ten fazla sapma olduğunda yeniden dengelenmelidir.",
                "key_factors": [
                    f"Risk Profili: {profile_text}",
                    f"Risk Skoru: {int(risk_score * 100)}/100",
                    f"Volatilite Toleransı: {('+/%10' if risk_score < 0.4 else '+/-%15' if risk_score < 0.7 else '+/-%20')} yıllık",
                    f"Getiri Hedefi: {('TÜFE + %2-4' if risk_score < 0.4 else 'TÜFE + %4-6' if risk_score < 0.7 else 'TÜFE + %6-10')}"
                ]
            }
        }
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "ips-system"}

@app.post("/api/ips/analyze")
def analyze_ips(request: AnalyzeRequest):
    print(f"Received analysis request with {len(request.answers)} answers")
    
    # ====================================================================
    # AKILLI TUTARSIZLIK ALGILAMA (SMART INCONSISTENCY DETECTION)
    # ====================================================================
    # Kapasite Soruları (Q1-Q5): Yaş, vade, varlık, gelir, acil durum fonu
    # İsteklilik Soruları (Q6-Q12): Kayıp senaryosu, risk tercihi, volatilite toleransı
    
    capacity_questions = ['question1', 'question2', 'question3', 'question4', 'question5']
    willingness_questions = ['question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12']
    
    capacity_scores = []
    willingness_scores = []
    
    for ans in request.answers:
        q_id = ans.question_id
        if ans.answer_scale is not None:
            if q_id in capacity_questions:
                capacity_scores.append(ans.answer_scale)
            elif q_id in willingness_questions:
                willingness_scores.append(ans.answer_scale)
    
    # Ortalama skorları hesapla
    capacity_avg = sum(capacity_scores) / len(capacity_scores) if capacity_scores else 0.5
    willingness_avg = sum(willingness_scores) / len(willingness_scores) if willingness_scores else 0.5
    
    # Yüzdelik skora çevir (0-100)
    capacity_score = int(capacity_avg * 100)
    willingness_score = int(willingness_avg * 100)
    
    # Tutarsızlık farkını hesapla
    inconsistency_gap = abs(capacity_score - willingness_score)
    
    print(f"📊 Capacity Score: {capacity_score}, Willingness Score: {willingness_score}, Gap: {inconsistency_gap}")
    
    # Final risk skoru: iki skorun ağırlıklı ortalaması
    # Kapasite %40, İsteklilik %60 (isteklilik daha belirleyici)
    final_score = (capacity_avg * 0.4) + (willingness_avg * 0.6)
    
    # ====================================================================
    # TUTARSIZLIK KONTROLÜ
    # Sadece fark > 30 puan VE spesifik çelişki varsa tetikle
    # ====================================================================
    INCONSISTENCY_THRESHOLD = 30
    
    if inconsistency_gap > INCONSISTENCY_THRESHOLD:
        # Spesifik çelişki senaryolarını kontrol et
        conflict_detected = False
        conflict_description = ""
        
        # Senaryo 1: Düşük kapasite (yaşlı, düşük gelir) ama yüksek risk isteği
        if capacity_score < 40 and willingness_score > 60:
            conflict_detected = True
            conflict_description = "Finansal kapasiteniz düşük görünüyor ancak yüksek riskli yatırım tercih ediyorsunuz. Bu durumu doğrulamak ister misiniz?"
        
        # Senaryo 2: Yüksek kapasite (genç, yüksek gelir) ama düşük risk isteği
        elif capacity_score > 60 and willingness_score < 40:
            conflict_detected = True
            conflict_description = "Finansal kapasiteniz yüksek görünüyor ancak çok düşük riskli yatırımları tercih ediyorsunuz. Bu tercihinizi doğrulamak ister misiniz?"
        
        if conflict_detected:
            print(f"⚠️ Tutarsızlık tespit edildi: {conflict_description}")
            return {
                "status": "needs_confirmation",
                "trace_id": str(uuid.uuid4()),
                "conflict": {
                    "description": conflict_description,
                    "capacity_score": capacity_score,
                    "willingness_score": willingness_score,
                    "gap": inconsistency_gap,
                    "question": "Risk tercihinizi netleştirir misiniz?",
                    "options": [
                        {
                            "label": "Riski minimize etmek istiyorum, güvenli yatırımları tercih ederim",
                            "value": "conservative",
                            "scale": 0.25
                        },
                        {
                            "label": "Dengeli bir yaklaşım benim için uygun",
                            "value": "balanced",
                            "scale": 0.50
                        },
                        {
                            "label": "Yüksek getiri için yüksek riski kabul ediyorum",
                            "value": "aggressive",
                            "scale": 0.80
                        }
                    ]
                },
                "risk": {
                    "score": final_score,
                    "bucket": "pending"
                }
            }
    
    # Tutarsızlık yok veya tutarlı profil → normal sonuç dön
    print(f"✅ Tutarlı profil tespit edildi. Final skor: {final_score:.2f}")
    return generate_mock_ips_response(final_score, request.answers, capacity_score, willingness_score)

@app.post("/api/ips/confirm")
def confirm_ips(request: ConfirmRequest):
    # Kullanıcı confirmation flow'dan geldiyse, seçtiği scale değerini final_score olarak kabul et
    final_score = request.answer_scale
    
    # Basit bir capacity/willingness tahmini yap (çünkü elimizde detay yok)
    # Confirmation ile seçilen skor, kullanıcının gerçek tercihidir.
    capacity_score = int(final_score * 100)
    willingness_score = int(final_score * 100)
    
    # Gerçek yanıtlarla birlikte dön
    return generate_mock_ips_response(final_score, None, capacity_score, willingness_score)

@app.get("/api/ips/{trace_id}")
def get_i_ps_result(trace_id: str):
    return generate_mock_ips_response(0.5)

if __name__ == "__main__":
    import uvicorn
    # process.env.PORT or 8001
    uvicorn.run(app, host="0.0.0.0", port=8001)
