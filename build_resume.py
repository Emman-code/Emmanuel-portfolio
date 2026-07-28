from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import os

pdf_path = os.path.join("public", "Emmanuel_Joshua_Resume.pdf")
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles matching the exact document
title_style = ParagraphStyle(
    'NameTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=22,
    textColor=colors.HexColor('#000000')
)

contact_style = ParagraphStyle(
    'ContactText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=14,
    alignment=2, # Right
    textColor=colors.HexColor('#000000')
)

section_heading = ParagraphStyle(
    'SectionHead',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    alignment=1, # Center
    textColor=colors.HexColor('#000000'),
    spaceBefore=6,
    spaceAfter=4
)

item_title = ParagraphStyle(
    'ItemTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=12.5,
    textColor=colors.HexColor('#000000')
)

item_subtitle = ParagraphStyle(
    'ItemSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    textColor=colors.HexColor('#000000')
)

body_style = ParagraphStyle(
    'BodyBullet',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12.5,
    textColor=colors.HexColor('#000000'),
    leftIndent=12,
    firstLineIndent=-8,
    spaceAfter=3
)

story = []

# Header Table (Name on Left, Contact on Right)
header_data = [
    [
        Paragraph("<b>EMMANUEL JOSHUA</b>", title_style),
        Paragraph(
            "Email: <font color='#0000EE'><u>emman.cnr@gmail.com</u></font><br/>"
            "Mobile: +91 95973 21862<br/>"
            "LinkedIn: <font color='#0000EE'><u>linkedin.com/in/emmanuel-joshua-ej</u></font><br/>"
            "GitHub: <font color='#0000EE'><u>github.com/Emman-code</u></font>",
            contact_style
        )
    ]
]

header_table = Table(header_data, colWidths=[270, 270])
header_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
]))

story.append(header_table)
story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#000000'), spaceBefore=2, spaceAfter=6))

# EDUCATION
story.append(Paragraph("<b>EDUCATION</b>", section_heading))
edu_data = [
    [
        Paragraph("<b>SNS College of Technology</b>", item_title),
        Paragraph("<b>Coimbatore, India</b>", ParagraphStyle('RightBold', parent=item_title, alignment=2))
    ],
    [
        Paragraph("B. Tech. Artificial Engineering and Machine Learning", item_subtitle),
        Paragraph("<b>September 2024 – Present</b>", ParagraphStyle('RightText', parent=item_subtitle, alignment=2))
    ],
    [
        Paragraph("<b>Baptist Academy</b>", item_title),
        Paragraph("<b>Coimbatore, India</b>", ParagraphStyle('RightBold', parent=item_title, alignment=2))
    ],
    [
        Paragraph("High School – Percentage: 87%", item_subtitle),
        Paragraph("<b>June 2023 – Mar 2024</b>", ParagraphStyle('RightText', parent=item_subtitle, alignment=2))
    ]
]
edu_table = Table(edu_data, colWidths=[360, 180])
edu_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
]))
story.append(edu_table)
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#000000'), spaceBefore=2, spaceAfter=6))

# SKILLS SUMMARY
story.append(Paragraph("<b>SKILLS SUMMARY</b>", section_heading))
skills = [
    ("Languages:", "Python, SQL, C"),
    ("Machine Learning & Data Science:", "Supervised & Unsupervised Learning, Regression, Classification, Time Series Forecasting, Exploratory Data Analysis (EDA), Feature Engineering, Model Evaluation, Train-Test Split, Cross-Validation"),
    ("Deep Learning:", "Neural Networks, LSTM, CNN, TensorFlow, Keras"),
    ("Libraries & Framework:", "Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn"),
    ("Developer & Data Tools:", "Jupyter Notebook, Visual Studio Code, PyCharm, MySQL, SQLite, Excel")
]

for title, desc in skills:
    story.append(Paragraph(f"• <b>{title}</b> {desc}", body_style))

story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#000000'), spaceBefore=2, spaceAfter=6))

# EXPERIENCE
story.append(Paragraph("<b>EXPERIENCE</b>", section_heading))
exp_header = [
    [
        Paragraph("<b>AI ENGINEER INTERN | VACAPAY</b>", item_title),
        Paragraph("<b>DECEMBER 2025 – MARCH 2026</b>", ParagraphStyle('RightBold', parent=item_title, alignment=2))
    ]
]
exp_table = Table(exp_header, colWidths=[360, 180])
exp_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
]))
story.append(exp_table)
story.append(Spacer(1, 2))
story.append(Paragraph("• Developed a deep learning–based cattle identification system using muzzle biometrics.", body_style))
story.append(Paragraph("• Built a YOLO-based detection pipeline and embedding similarity model to identify cattle from images.", body_style))
story.append(Paragraph("• Implemented a Flask REST API with MongoDB integration and deployed the system on the cloud for real-time biometric recognition.", body_style))

story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#000000'), spaceBefore=2, spaceAfter=6))

# PROJECTS
story.append(Paragraph("<b>PROJECTS</b>", section_heading))

# Proj 1
p1_header = [
    [
        Paragraph("<b>CATTLE MUZZLE BIOMETRIC IDENTIFICATION SYSTEM | <font color='#0000EE'><u>LINK</u></font></b>", item_title),
        Paragraph("<b>FEBRUARY 2026</b>", ParagraphStyle('RightBold', parent=item_title, alignment=2))
    ]
]
p1_table = Table(p1_header, colWidths=[380, 160])
p1_table.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 1)]))
story.append(p1_table)
story.append(Spacer(1, 2))
story.append(Paragraph("• Developed an AI-powered cattle identification system using muzzle biometric patterns for livestock recognition.", body_style))
story.append(Paragraph("• Built a <b>YOLOv8-based muzzle detection pipeline</b> to automatically crop muzzle regions from cattle images.", body_style))
story.append(Paragraph("• Implemented a <b>ResNet50-based embedding model</b> with feature extraction and similarity matching for cattle identification and verification.", body_style))
story.append(Paragraph("• Applied image preprocessing techniques including <b>CLAHE enhancement and sharpening</b> to improve feature quality and model performance.", body_style))
story.append(Paragraph("• Developed a <b>Flask REST API</b> with database integration for real-time cattle registration and identification.", body_style))

story.append(Spacer(1, 4))

# Proj 2
p2_header = [
    [
        Paragraph("<b>TANGLISH HATE SPEECH DETECTION SYSTEM | <font color='#0000EE'><u>LINK</u></font></b>", item_title),
        Paragraph("<b>NOVEMBER 2025</b>", ParagraphStyle('RightBold', parent=item_title, alignment=2))
    ]
]
p2_table = Table(p2_header, colWidths=[380, 160])
p2_table.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 1)]))
story.append(p2_table)
story.append(Spacer(1, 2))
story.append(Paragraph("• Developed a multilingual hate speech detection system for <b>Tanglish (Tamil written in English script)</b> social media content.", body_style))
story.append(Paragraph("• Fine-tuned <b>XLM-RoBERTa transformer models</b> to classify hate speech, offensive language, and safe content.", body_style))
story.append(Paragraph("• Built a real-time moderation pipeline capable of analyzing user-generated content and flagging harmful messages.", body_style))
story.append(Paragraph("• Integrated the model into an interactive <b>Gradio application</b> and deployed it using <b>Hugging Face Spaces</b>.", body_style))

story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#000000'), spaceBefore=2, spaceAfter=6))

# CERTIFICATIONS
story.append(Paragraph("<b>CERTIFICATIONS</b>", section_heading))
certs = [
    ("EXECUTIVE POST GRADUATE CERTIFICATION IN DATA SCIENCE AND AI | IIT ROORKEE | <font color='#0000EE'><u>CERTIFICATE</u></font>", "APRIL 2025", "Gained advanced expertise in <b>machine learning, deep learning, and AI-driven analytics</b>, with hands-on project experience."),
    ("DATA SCIENCE COURSE (INTELLIPAAT) | <font color='#0000EE'><u>CERTIFICATE</u></font>", "FEBRUARY 2025", "Hands-on experience in <b>data preprocessing, feature engineering, model training, and evaluation</b> using Python."),
    ("SQL COURSE (INTELLIPAAT) | <font color='#0000EE'><u>CERTIFICATE</u></font>", "JULY 2024", "Mastered working with <b>relational databases</b>, writing optimized SQL queries for data retrieval and analysis.")
]

for c_title, c_date, c_desc in certs:
    c_table_data = [
        [
            Paragraph(f"<b>{c_title}</b>", item_title),
            Paragraph(f"<b>{c_date}</b>", ParagraphStyle('RightBold', parent=item_title, alignment=2))
        ]
    ]
    ctable = Table(c_table_data, colWidths=[380, 160])
    ctable.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 1)]))
    story.append(ctable)
    story.append(Spacer(1, 2))
    story.append(Paragraph(f"• {c_desc}", body_style))
    story.append(Spacer(1, 2))

doc.build(story)
print("PDF generated successfully at public/Emmanuel_Joshua_Resume.pdf")
