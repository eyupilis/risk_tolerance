"""
PDF Generator Service - Gotenberg Entegrasyonu
IPS raporunu HTML'den PDF'e dönüştürür
"""

import httpx
from io import BytesIO
from typing import Optional
import os

# Gotenberg URL - Docker'da veya lokalde çalışabilir
GOTENBERG_URL = os.getenv("GOTENBERG_URL", "http://localhost:3002")


async def generate_pdf_from_html(
    html_content: str,
    header_html: Optional[str] = None,
    footer_html: Optional[str] = None,
    margin_top: str = "0",
    margin_bottom: str = "0",
    margin_left: str = "0",
    margin_right: str = "0",
    paper_width: str = "8.27in",  # A4 width
    paper_height: str = "11.69in",  # A4 height
) -> bytes:
    """
    Gotenberg API kullanarak HTML'den PDF oluşturur
    
    Args:
        html_content: Ana HTML içeriği
        header_html: Sayfa başlığı HTML (opsiyonel)
        footer_html: Sayfa altlığı HTML (opsiyonel)
        margin_*: Sayfa kenar boşlukları
        paper_*: Kağıt boyutları
    
    Returns:
        PDF dosyası bytes olarak
    """
    
    # HTML'i tam sayfa olarak hazırla
    full_html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yatırım Politikası Beyanı (IPS)</title>
    <style>
        /* Kuveyt Türk Portföy Kurumsal Renkleri - Frontend ile Senkron */
        :root {{
            --ips-primary: #00a651;
            --ips-primary-dark: #007a3d;
            --ips-primary-light: #e8f5e9;
            --ips-secondary: #003c71;
            --ips-secondary-light: #e3f2fd;
            --ips-accent: #f5a623;
            --ips-accent-light: #fff8e1;
            --ips-danger: #dc3545;
            --ips-danger-light: #ffebee;
            --ips-text: #2c3e50;
            --ips-text-muted: #6c757d;
            --ips-border: #e0e0e0;
            --ips-background: #f8f9fa;
            --ips-white: #ffffff;
            --ips-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            --ips-radius: 8px;
            --ips-radius-lg: 12px;
        }}
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        @page {
            margin: 1in 0.5in;
        }

        @page :first {
            margin: 0;
        }

        body {
            font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: var(--ips-text);
            background: var(--ips-white);
        }
        
        /* Kapak Sayfası - Tam Sayfa A4 */
        .ips-cover-page {{
            background: linear-gradient(135deg, var(--ips-primary) 0%, var(--ips-primary-dark) 100%);
            color: var(--ips-white);
            width: 210mm;
            height: 297mm;
            padding: 80px 60px;
            text-align: center;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            page-break-after: always;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }}
        
        .ips-cover-logo {{
            height: 60px;
            width: auto;
            margin-bottom: 40px;
            display: block;
        }}
        
        .ips-cover-title {{
            font-size: 28pt;
            font-weight: 300;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
            color: white;
        }}
        
        .ips-cover-subtitle {{
            font-size: 14pt;
            font-weight: 500;
            opacity: 0.9;
            margin-bottom: 32px;
        }}
        
        .ips-profile-badge {{
            display: inline-block;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 24px 40px;
            margin: 24px 0;
        }}
        
        .ips-profile-level {{
            font-size: 24pt;
            font-weight: 600;
            margin-bottom: 8px;
        }}
        
        .ips-profile-score {{
            font-size: 12pt;
            opacity: 0.85;
        }}
        
        /* İçindekiler */
        .ips-toc {{
            background: var(--ips-white);
            border-radius: var(--ips-radius-lg);
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid var(--ips-border);
        }}
        
        .ips-toc-title {{
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14pt;
            font-weight: 600;
            color: var(--ips-secondary);
            margin-bottom: 20px;
        }}
        
        .ips-toc-list {{
            list-style: none;
            padding: 0;
            margin: 0;
        }}
        
        .ips-toc-item {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px dotted var(--ips-border);
        }}
        
        .ips-toc-link {{
            color: var(--ips-text);
            text-decoration: none;
        }}
        
        .ips-toc-number {{
            color: var(--ips-text-muted);
            font-size: 10pt;
        }}
        
        /* Başlıklar */
        h1, h2, h3, h4, h5, h6 {{
            font-weight: 600;
            color: var(--ips-secondary);
            margin-top: 0;
        }}
        
        h1 {{ font-size: 22pt; }}
        h2 {{ font-size: 16pt; }}
        h3 {{ font-size: 14pt; }}
        h4 {{ font-size: 12pt; }}
        
        /* Section Cards */
        .ips-section {{
            background: var(--ips-white);
            border-radius: var(--ips-radius-lg);
            box-shadow: var(--ips-shadow);
            margin-bottom: 24px;
            border: 1px solid var(--ips-border);
            overflow: hidden;
            page-break-inside: avoid;
        }}
        
        .ips-section-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px;
            border-bottom: 1px solid var(--ips-border);
            background: var(--ips-background);
        }}
        
        .ips-section-title {{
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14pt;
            font-weight: 600;
            color: var(--ips-secondary);
            margin: 0;
        }}
        
        .ips-section-icon {{
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ips-primary-light);
            color: var(--ips-primary);
            border-radius: 8px;
        }}
        
        .ips-section-body {{
            padding: 24px;
        }}
        
        /* Subsections */
        .ips-subsection {{
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--ips-border);
        }}
        
        .ips-subsection:last-child {{
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }}
        
        .ips-subsection-title {{
            font-size: 12pt;
            font-weight: 600;
            color: var(--ips-primary-dark);
            margin-bottom: 12px;
            padding-left: 12px;
            border-left: 3px solid var(--ips-primary);
        }}
        
        /* Tablolar */
        .ips-table, table {{
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 10pt;
        }}
        
        .ips-table th, .ips-table td, th, td {{
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid var(--ips-border);
        }}
        
        .ips-table th, th {{
            background: var(--ips-background);
            font-weight: 600;
            color: var(--ips-secondary);
        }}
        
        /* Badge'ler */
        .ips-badge {{
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 9pt;
            font-weight: 500;
        }}
        
        .ips-badge--primary {{
            background: var(--ips-primary-light);
            color: var(--ips-primary-dark);
        }}
        
        .ips-badge--secondary {{
            background: var(--ips-secondary-light);
            color: var(--ips-secondary);
        }}
        
        .ips-badge--warning {{
            background: var(--ips-accent-light);
            color: #b77b00;
        }}
        
        .ips-badge--success {{
            background: var(--ips-primary-light);
            color: var(--ips-primary-dark);
        }}
        
        /* Info Panels */
        .ips-info-panel {{
            background: var(--ips-background);
            border-radius: var(--ips-radius);
            padding: 16px 20px;
            border-left: 4px solid var(--ips-primary);
            margin: 12px 0;
        }}
        
        .ips-info-panel--warning {{
            background: var(--ips-accent-light);
            border-left-color: var(--ips-accent);
        }}
        
        .ips-info-panel--secondary {{
            background: var(--ips-secondary-light);
            border-left-color: var(--ips-secondary);
        }}
        
        /* Grid */
        .ips-grid {{
            display: grid;
            gap: 16px;
            margin: 16px 0;
        }}
        
        .ips-grid--2 {{
            grid-template-columns: repeat(2, 1fr);
        }}
        
        .ips-grid--3 {{
            grid-template-columns: repeat(3, 1fr);
        }}
        
        /* Metric Cards */
        .ips-metric {{
            background: var(--ips-background);
            border-radius: var(--ips-radius);
            padding: 16px 20px;
            text-align: center;
        }}
        
        .ips-metric-value {{
            font-size: 20pt;
            font-weight: 600;
            color: var(--ips-primary);
        }}
        
        .ips-metric-label {{
            font-size: 9pt;
            color: var(--ips-text-muted);
            margin-top: 4px;
        }}
        
        /* Lists */
        .ips-list {{
            list-style: none;
            padding: 0;
            margin: 0;
        }}
        
        .ips-list-item {{
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 8px 0;
        }}
        
        .ips-list-item::before {{
            content: '';
            width: 6px;
            height: 6px;
            background: var(--ips-primary);
            border-radius: 50%;
            margin-top: 8px;
            flex-shrink: 0;
        }}
        
        /* Chart Container */
        .ips-chart-container {{
            background: var(--ips-white);
            border-radius: var(--ips-radius);
            padding: 20px;
            border: 1px solid var(--ips-border);
        }}
        
        /* Signature Area */
        .ips-signature-area {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 32px;
            padding-top: 32px;
            border-top: 2px solid var(--ips-border);
        }}
        
        .ips-signature-box {{
            text-align: center;
        }}
        
        .ips-signature-line {{
            width: 100%;
            height: 1px;
            background: var(--ips-text);
            margin: 60px 0 16px;
        }}
        
        .ips-signature-label {{
            font-size: 10pt;
            color: var(--ips-text-muted);
        }}
        
        /* Page Break */
        .page-break {{
            page-break-after: always;
        }}
        
        /* No Print */
        .no-print, .ips-toolbar, .ips-section-actions, button {{
            display: none !important;
        }}
        
        /* AI Content */
        .ips-ai-content {{
            padding: 16px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 8px;
            border-left: 4px solid var(--ips-primary);
            margin: 12px 0;
        }}
        
        /* Risk Gauge */
        .ips-risk-gauge {{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px;
        }}
        
        .ips-risk-gauge-value {{
            font-size: 36pt;
            font-weight: 700;
            color: var(--ips-primary);
        }}
        
        .ips-risk-gauge-label {{
            font-size: 12pt;
            color: var(--ips-text-muted);
        }}
        
        /* Full Report Container */
        .ips-full-report {
            max-width: 100%;
            margin: 0 auto;
            padding: 0;
            background: var(--ips-white);
        }


    </style>
</head>
<body>
    <div class="ips-full-report">
        {html_content}
    </div>
</body>
</html>"""
    
    # Multipart form data hazırla
    files = {
        "files": ("index.html", full_html.encode('utf-8'), "text/html"),
    }
    
    data = {
        "marginTop": margin_top,
        "marginBottom": margin_bottom,
        "marginLeft": margin_left,
        "marginRight": margin_right,
        "paperWidth": paper_width,
        "paperHeight": paper_height,
        "printBackground": "true",
        "preferCssPageSize": "false",
    }
    
    # Header varsa ekle
    if header_html:
        files["header.html"] = ("header.html", header_html.encode('utf-8'), "text/html")
    
    # Footer varsa ekle  
    if footer_html:
        files["footer.html"] = ("footer.html", footer_html.encode('utf-8'), "text/html")
    
    # Gotenberg API'ye istek at
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{GOTENBERG_URL}/forms/chromium/convert/html",
            files=files,
            data=data
        )
        
        if response.status_code != 200:
            raise Exception(f"Gotenberg hatası: {response.status_code} - {response.text}")
        
        return response.content


def generate_pdf_sync(html_content: str) -> bytes:
    """
    Senkron PDF oluşturma (asyncio kullanmadan)
    """
    import asyncio
    return asyncio.run(generate_pdf_from_html(html_content))
