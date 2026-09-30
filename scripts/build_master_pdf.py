"""
Career Apex CRM — Master SDLC PDF Generator
Combines all 11 SDLC markdown specifications into a publication-quality Master PDF.
"""
import os
import re
import sys
from pathlib import Path
from markdown_it import MarkdownIt
import pygments
from pygments.lexers import get_lexer_by_name, TextLexer
from pygments.formatters import HtmlFormatter
from playwright.sync_api import sync_playwright

DOCS_DIR = Path(r"e:\tasktracker_reploca\salesCRM\docs\software-development-lifecycle")
OUTPUT_PDF = DOCS_DIR / "CAREER_APEX_CRM_MASTER_SDLC_SPECIFICATION.pdf"
OUTPUT_HTML = DOCS_DIR / "master_sdlc_compilation.html"

FILES_ORDER = [
    ("00_DOCUMENT_INDEX.md", "Executive Master Index"),
    ("01_BRS_BUSINESS_REQUIREMENTS_SPECIFICATION.md", "Business Requirements Specification (BRS)"),
    ("02_URS_USER_ROLES_AND_PERMISSIONS.md", "User Requirements & Role Hierarchy (URS)"),
    ("03_PRD_PRODUCT_REQUIREMENTS_DOCUMENT.md", "Product Requirements Document (PRD)"),
    ("04_SCREEN_BY_SCREEN_FUNCTIONAL_SPECIFICATION.md", "Screen-by-Screen Functional Specification"),
    ("05_HLD_HIGH_LEVEL_DESIGN.md", "High-Level Architectural Design (HLD)"),
    ("06_LLD_LOW_LEVEL_DESIGN.md", "Low-Level Component Design (LLD)"),
    ("07_DATABASE_DESIGN_AND_DATA_DICTIONARY.md", "Database Schema & Data Dictionary"),
    ("08_REST_API_SPECIFICATION.md", "RESTful API Specification"),
    ("09_TECH_STACK_AND_MIGRATION_ROADMAP.md", "Tech Stack & Migration Roadmap"),
    ("10_TEST_PLAN_AND_ACCEPTANCE_TEST_CASES.md", "Test Plan & Acceptance Test Cases (ATP)"),
]

# Custom MarkdownIt renderer hook for mermaid and syntax highlighting
def create_custom_markdown():
    md = MarkdownIt("commonmark").enable("table").enable("strikethrough")
    
    # Custom fence renderer
    def render_fence(*args, **kwargs):
        if len(args) == 5:
            _, tokens, idx, options, env = args
        else:
            tokens, idx, options, env = args

        token = tokens[idx]
        info = token.info.strip() if token.info else ""
        lang = info.split()[0] if info else ""
        content = token.content

        if lang.lower() == "mermaid":
            clean_content = content.rstrip()
            return f'<div class="mermaid-container"><pre class="mermaid">\n{clean_content}\n</pre></div>\n'
        
        try:
            lexer = get_lexer_by_name(lang) if lang else TextLexer()
        except Exception:
            lexer = TextLexer()
        
        formatter = HtmlFormatter(nowrap=True, noclasses=False)
        highlighted = pygments.highlight(content, lexer, formatter)
        return f'<div class="code-block-wrapper"><div class="code-lang-tag">{lang or "text"}</div><pre><code class="highlight">{highlighted}</code></pre></div>\n'

    md.add_render_rule("fence", render_fence)
    return md

def build_cover_page():
    return """
    <div class="cover-page">
        <div class="cover-brand">
            <div class="brand-logo-badge">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>
            <div class="brand-name">CAREER APEX CRM</div>
        </div>
        
        <div class="cover-tagline">ENTERPRISE SOFTWARE ENGINEERING SPECIFICATION</div>
        <h1 class="cover-title">Full Software Development Lifecycle (SDLC) Master Blueprint</h1>
        <div class="cover-subtitle">Complete Business Architecture, User Scoping, System Topology, Database DDL, REST Contracts, 14 Screen Functional Manual & QA Acceptance Test Plan</div>

        <div class="cover-badge-row">
            <span class="badge badge-accent">Version 2.0.0</span>
            <span class="badge badge-teal">Student Job-Seeker Domain</span>
            <span class="badge badge-purple">Placement Fee Ledger</span>
            <span class="badge badge-amber">Production Pre-Flight</span>
        </div>

        <div class="cover-meta-grid">
            <div class="meta-item">
                <div class="meta-label">DOMAIN FOCUS</div>
                <div class="meta-val">Candidate Job Placement & Career Counseling CRM</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">DOCUMENT SCOPE</div>
                <div class="meta-val">BRS, URS, PRD, Screen Guide, HLD, LLD, DB, API, Tech Stack, Test Plan</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">TARGET AUDIENCE</div>
                <div class="meta-val">Engineering Leads, Enterprise Architects, Product Managers, QA Engineers</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">STATUS & DATE</div>
                <div class="meta-val">Certified Master Release — September 2026</div>
            </div>
        </div>

        <div class="cover-footer">
            <div>Confidential & Proprietary — Career Apex Technologies Inc.</div>
            <div>Generated by Antigravity Autonomous Engineering Core</div>
        </div>
    </div>
    <div class="page-break"></div>
    """

def build_toc():
    items_html = ""
    for idx, (filename, title) in enumerate(FILES_ORDER):
        sec_num = f"Section {idx:02d}"
        doc_code = filename.split("_")[0]
        items_html += f"""
        <div class="toc-item">
            <div class="toc-num">{doc_code}</div>
            <div class="toc-title">
                <span class="toc-heading">{title}</span>
                <span class="toc-file">{filename}</span>
            </div>
            <div class="toc-dots"></div>
        </div>
        """
    return f"""
    <div class="toc-page">
        <h2 class="toc-header">Table of Contents & Executive Navigation</h2>
        <p class="toc-desc">This consolidated master document integrates the complete lifecycle specifications for the Career Apex CRM platform. Each section represents a standalone, rigorously audited technical artifact.</p>
        <div class="toc-list">
            {items_html}
        </div>
    </div>
    <div class="page-break"></div>
    """

def get_css():
    pygments_css = HtmlFormatter().get_style_defs('.highlight')
    return f"""
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    @page {{
        size: A4;
        margin: 20mm 15mm 20mm 15mm;
        @bottom-right {{
            content: "Page " counter(page) " of " counter(pages);
            font-family: 'Inter', sans-serif;
            font-size: 8pt;
            color: #64748b;
        }}
    }}

    * {{
        box-sizing: border-box;
    }}

    body {{
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #1e293b;
        background: #ffffff;
        font-size: 9.5pt;
        line-height: 1.6;
        margin: 0;
        padding: 0;
    }}

    .page-break {{
        page-break-before: always;
        break-before: page;
    }}

    /* Cover Page */
    .cover-page {{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 60px 40px;
        background: linear-gradient(145deg, #090d16 0%, #111827 50%, #0f172a 100%);
        color: #ffffff;
        border-radius: 12px;
        page-break-after: always;
        position: relative;
    }}

    .cover-brand {{
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 40px;
    }}

    .brand-logo-badge {{
        width: 52px;
        height: 52px;
        background: linear-gradient(135deg, #4f46e5, #06b6d4);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }}

    .brand-name {{
        font-size: 15pt;
        font-weight: 800;
        letter-spacing: 2px;
        color: #f8fafc;
    }}

    .cover-tagline {{
        font-size: 9pt;
        font-weight: 700;
        letter-spacing: 2.5px;
        color: #38bdf8;
        text-transform: uppercase;
        margin-bottom: 12px;
    }}

    .cover-title {{
        font-size: 26pt;
        font-weight: 800;
        line-height: 1.25;
        color: #ffffff;
        margin: 0 0 20px 0;
        letter-spacing: -0.5px;
    }}

    .cover-subtitle {{
        font-size: 11pt;
        font-weight: 400;
        color: #94a3b8;
        line-height: 1.6;
        max-width: 680px;
        margin-bottom: 35px;
    }}

    .cover-badge-row {{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 50px;
    }}

    .badge {{
        display: inline-block;
        padding: 5px 12px;
        font-size: 8pt;
        font-weight: 600;
        border-radius: 6px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }}

    .badge-accent {{ background: rgba(99, 102, 241, 0.25); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4); }}
    .badge-teal {{ background: rgba(20, 184, 166, 0.25); color: #5eead4; border: 1px solid rgba(20, 184, 166, 0.4); }}
    .badge-purple {{ background: rgba(168, 85, 247, 0.25); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.4); }}
    .badge-amber {{ background: rgba(245, 158, 11, 0.25); color: #fde68a; border: 1px solid rgba(245, 158, 11, 0.4); }}

    .cover-meta-grid {{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 24px;
        border-radius: 10px;
        margin-bottom: 40px;
    }}

    .meta-item {{}}
    .meta-label {{
        font-size: 7.5pt;
        font-weight: 700;
        letter-spacing: 1.5px;
        color: #64748b;
        margin-bottom: 4px;
    }}
    .meta-val {{
        font-size: 9.5pt;
        font-weight: 500;
        color: #e2e8f0;
    }}

    .cover-footer {{
        display: flex;
        justify-content: space-between;
        font-size: 8pt;
        color: #475569;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 20px;
    }}

    /* Table of Contents */
    .toc-page {{
        padding: 30px 10px;
    }}
    .toc-header {{
        font-size: 18pt;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 8px;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 12px;
    }}
    .toc-desc {{
        font-size: 9.5pt;
        color: #64748b;
        margin-bottom: 30px;
    }}
    .toc-list {{
        display: flex;
        flex-direction: column;
        gap: 12px;
    }}
    .toc-item {{
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 10px 14px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
    }}
    .toc-num {{
        font-family: 'JetBrains Mono', monospace;
        font-size: 9pt;
        font-weight: 700;
        background: #e0e7ff;
        color: #3730a3;
        padding: 4px 10px;
        border-radius: 6px;
        min-width: 75px;
        text-align: center;
    }}
    .toc-title {{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }}
    .toc-heading {{
        font-size: 10pt;
        font-weight: 700;
        color: #1e293b;
    }}
    .toc-file {{
        font-family: 'JetBrains Mono', monospace;
        font-size: 8pt;
        color: #64748b;
    }}

    /* Section Styling */
    .section-wrapper {{
        padding-top: 10px;
        margin-bottom: 30px;
    }}

    .section-divider-banner {{
        background: linear-gradient(135deg, #1e293b, #0f172a);
        color: #ffffff;
        padding: 18px 24px;
        border-radius: 8px;
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }}
    .section-banner-title {{
        font-size: 14pt;
        font-weight: 700;
        letter-spacing: -0.2px;
    }}
    .section-banner-code {{
        font-family: 'JetBrains Mono', monospace;
        font-size: 8.5pt;
        background: rgba(255, 255, 255, 0.15);
        padding: 4px 10px;
        border-radius: 4px;
        color: #38bdf8;
    }}

    /* Headings */
    h1 {{
        font-size: 17pt;
        font-weight: 800;
        color: #0f172a;
        margin-top: 25px;
        margin-bottom: 12px;
        border-bottom: 1.5px solid #cbd5e1;
        padding-bottom: 8px;
        page-break-after: avoid;
    }}

    h2 {{
        font-size: 13pt;
        font-weight: 700;
        color: #1e293b;
        margin-top: 20px;
        margin-bottom: 10px;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 6px;
        page-break-after: avoid;
    }}

    h3 {{
        font-size: 11pt;
        font-weight: 700;
        color: #334155;
        margin-top: 16px;
        margin-bottom: 8px;
        page-break-after: avoid;
    }}

    h4, h5, h6 {{
        font-size: 10pt;
        font-weight: 600;
        color: #475569;
        margin-top: 12px;
        margin-bottom: 6px;
        page-break-after: avoid;
    }}

    p {{
        margin-top: 0;
        margin-bottom: 10px;
        text-align: justify;
    }}

    /* Tables */
    table {{
        width: 100%;
        border-collapse: collapse;
        font-size: 8.5pt;
        margin: 16px 0 20px 0;
        page-break-inside: avoid;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        overflow: hidden;
    }}

    th {{
        background: #f1f5f9;
        color: #0f172a;
        font-weight: 700;
        text-align: left;
        padding: 8px 10px;
        border-bottom: 2px solid #cbd5e1;
        border-right: 1px solid #e2e8f0;
    }}

    td {{
        padding: 7px 10px;
        border-bottom: 1px solid #e2e8f0;
        border-right: 1px solid #f1f5f9;
        vertical-align: top;
    }}

    tr:nth-child(even) td {{
        background: #f8fafc;
    }}

    tr:last-child td {{
        border-bottom: none;
    }}

    /* Code Blocks */
    .code-block-wrapper {{
        margin: 14px 0 18px 0;
        border-radius: 8px;
        background: #0f172a;
        border: 1px solid #1e293b;
        overflow: hidden;
        page-break-inside: avoid;
    }}

    .code-lang-tag {{
        background: #1e293b;
        color: #94a3b8;
        font-family: 'JetBrains Mono', monospace;
        font-size: 7pt;
        font-weight: 600;
        padding: 4px 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }}

    pre {{
        margin: 0;
        padding: 12px 14px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 8pt;
        line-height: 1.5;
        overflow-x: auto;
        color: #e2e8f0;
    }}

    code {{
        font-family: 'JetBrains Mono', monospace;
        font-size: 8.5pt;
    }}

    p code, li code, td code {{
        background: #f1f5f9;
        color: #0f172a;
        padding: 2px 5px;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
        font-size: 8pt;
    }}

    /* Mermaid Container */
    .mermaid-container {{
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        margin: 18px 0;
        display: flex;
        justify-content: center;
        page-break-inside: avoid;
    }}
    .mermaid {{
        font-family: 'Inter', sans-serif !important;
        font-size: 9pt;
        background: transparent !important;
    }}

    /* Blockquotes */
    blockquote {{
        border-left: 4px solid #6366f1;
        background: #f8fafc;
        margin: 14px 0;
        padding: 10px 16px;
        color: #334155;
        font-style: italic;
        border-radius: 0 6px 6px 0;
    }}

    /* Lists */
    ul, ol {{
        margin-top: 0;
        margin-bottom: 12px;
        padding-left: 22px;
    }}

    li {{
        margin-bottom: 5px;
    }}

    /* Links */
    a {{
        color: #4f46e5;
        text-decoration: none;
        font-weight: 500;
    }}

    hr {{
        border: none;
        border-top: 1px solid #e2e8f0;
        margin: 24px 0;
    }}

    {pygments_css}
    """

def compile_all_documents():
    print(f"Reading {len(FILES_ORDER)} documents from {DOCS_DIR}...")
    md = create_custom_markdown()
    
    body_content = build_cover_page()
    body_content += build_toc()

    for idx, (filename, title) in enumerate(FILES_ORDER):
        file_path = DOCS_DIR / filename
        if not file_path.exists():
            print(f"Warning: File not found: {file_path}")
            continue

        raw_text = file_path.read_text(encoding="utf-8")
        
        # Render markdown to HTML
        rendered_html = md.render(raw_text)

        doc_code = filename.split("_")[0]
        section_html = f"""
        <div class="section-wrapper" id="section-{doc_code}">
            <div class="section-divider-banner">
                <span class="section-banner-title">{title}</span>
                <span class="section-banner-code">{filename}</span>
            </div>
            {rendered_html}
        </div>
        <div class="page-break"></div>
        """
        body_content += section_html

    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Career Apex CRM — Complete SDLC Master Specification</title>
    <style>
        {get_css()}
    </style>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script>
        window.renderAllMermaid = async function() {{
            try {{
                if (typeof mermaid !== 'undefined') {{
                    mermaid.initialize({{
                        startOnLoad: false,
                        theme: 'default',
                        securityLevel: 'loose'
                    }});
                    const elements = document.querySelectorAll('.mermaid');
                    for (let i = 0; i < elements.length; i++) {{
                        const el = elements[i];
                        try {{
                            const graphDef = el.textContent.trim();
                            const res = await mermaid.render('mermaid-svg-' + i, graphDef);
                            el.innerHTML = res.svg;
                        }} catch (err) {{
                            console.warn('Diagram ' + i + ' render issue:', err);
                        }}
                    }}
                    console.log('All Mermaid SVGs processed.');
                }}
            }} catch (e) {{
                console.error('Error during mermaid processing:', e);
            }}
        }};
    </script>
</head>
<body>
    {body_content}
</body>
</html>
"""
    OUTPUT_HTML.write_text(full_html, encoding="utf-8")
    print(f"Compiled master HTML written to: {OUTPUT_HTML} ({len(full_html)} chars)")
    return OUTPUT_HTML

def generate_pdf(html_path):
    import shutil
    print("Launching Playwright with Microsoft Edge...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge")
        page = browser.new_page()
        
        page.on("console", lambda msg: print(f"  [Browser Console] {msg.text}"))

        print("Loading HTML page and waiting for network idle...")
        file_url = f"file:///{str(html_path.resolve()).replace(os.sep, '/')}"
        page.goto(file_url, wait_until="networkidle", timeout=60000)

        print("Triggering client-side Mermaid SVG generation...")
        try:
            page.evaluate("async () => { if (window.renderAllMermaid) await window.renderAllMermaid(); }")
            page.wait_for_timeout(4000)
            print("Mermaid rendering phase complete.")
        except Exception as e:
            print("Notice on Mermaid execution:", e)

        print("Exporting PDF with header/footer templates...")
        header_template = """
        <div style="font-family: 'Inter', -apple-system, sans-serif; font-size: 7.5pt; width: 100%; display: flex; justify-content: space-between; padding: 0 15mm; color: #94a3b8; border-bottom: 0.5px solid #e2e8f0; padding-bottom: 4px;">
            <span>Career Apex CRM — Complete SDLC Master Specification</span>
            <span style="font-weight: 600; color: #64748b;">Enterprise Release v2.0.0</span>
        </div>
        """

        footer_template = """
        <div style="font-family: 'Inter', -apple-system, sans-serif; font-size: 7.5pt; width: 100%; display: flex; justify-content: space-between; padding: 0 15mm; color: #94a3b8; border-top: 0.5px solid #e2e8f0; padding-top: 4px;">
            <span>Confidential &amp; Proprietary — Career Apex Technologies</span>
            <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
        """

        page.pdf(
            path=str(OUTPUT_PDF),
            format="A4",
            print_background=True,
            display_header_footer=True,
            header_template=header_template,
            footer_template=footer_template,
            margin={
                "top": "22mm",
                "bottom": "22mm",
                "left": "15mm",
                "right": "15mm"
            }
        )
        browser.close()

    file_size_kb = os.path.getsize(OUTPUT_PDF) / 1024
    print(f"Master PDF generated successfully at: {OUTPUT_PDF} ({file_size_kb:.2f} KB)")

    target_docs_pdf = Path(r"e:\tasktracker_reploca\salesCRM\docs\CAREER_APEX_CRM_MASTER_SDLC_SPECIFICATION.pdf")
    target_root_pdf = Path(r"e:\tasktracker_reploca\salesCRM\CAREER_APEX_CRM_MASTER_SDLC_SPECIFICATION.pdf")
    
    shutil.copyfile(OUTPUT_PDF, target_docs_pdf)
    shutil.copyfile(OUTPUT_PDF, target_root_pdf)
    print(f"Copied Master PDF to: {target_docs_pdf}")
    print(f"Copied Master PDF to: {target_root_pdf}")

if __name__ == "__main__":
    html_file = compile_all_documents()
    generate_pdf(html_file)
