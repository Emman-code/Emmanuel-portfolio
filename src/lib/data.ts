export const PROFILE = {
  name: "Emmanuel Joshua",
  first: "Emmanuel",
  last: "Joshua",
  role: "Data Scientist & ML Engineer",
  tagline: "I turn data into models that solve real, meaningful problems.",
  location: "Coimbatore, Tamil Nadu, India · Open to internships (On-site / Hybrid / Remote)",
  email: "emman.cnr@gmail.com",
  phone: "+91 95973 21862",
  github: "https://github.com/Emman-code",
  linkedin: "https://linkedin.com/in/emmanuel-joshua-ej",
  instagram: "https://www.instagram.com/.yoix.",
  leetcode: "https://leetcode.com/u/Emmanuel_Joshua/",
  whatsapp: "https://wa.me/919597321862",
  resumeNote: "PDF · Updated Feb 2026",
};

/* Social links with brand-accurate icon paths */
export const SOCIALS = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/Emman-code",
    icon: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-1-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/emmanuel-joshua-ej",
    icon: "M4 9h3v11H4zM5.5 4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6M10 20V9h3v1.6A3.7 3.7 0 0 1 16.3 9c2.4 0 3.7 1.6 3.7 4.4V20h-3v-6c0-1.6-.6-2.5-2-2.5S13 12.5 13 14v6z",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/.yoix.",
    icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM17.5 6.5h.01",
  },
  {
    key: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/Emmanuel_Joshua/",
    icon: "M13.5 3 6 11l7.5 8M9 12h9",
  },
];

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" },
];

/* Real, verifiable highlights — no inflated numbers */
export const STATS = [
  { value: 3, suffix: "", label: "AI / Data internships", sub: "Xtrafin · VaCaPay · Intellipaat" },
  { value: 7, suffix: "", label: "Projects built & shipped", sub: "ML, DL & data analysis" },
  { value: 16, suffix: "", label: "Certifications earned", sub: "IIT Roorkee, IBM, AWS & more" },
  { value: 25, suffix: "K", label: "Hackathon prize won (₹)", sub: "1st place · L&T EduTech" },
];

/* Places I've actually worked / contributed */
export const LOGOS = ["Xtrafin", "VaCaPay", "Intellipaat", "Bion Technologies", "Pinke Capital"];

export const TOOLS = [
  "Python", "SQL", "C", "TensorFlow", "Keras", "Scikit-Learn", "Pandas", "NumPy",
  "PyTorch", "YOLOv8", "XLM-RoBERTa", "Hugging Face", "Flask", "MongoDB", "Power BI", "Matplotlib", "Seaborn", "Gradio",
];

export type SkillGroup = {
  key: string;
  label: string;
  blurb: string;
  icon: string;
  items: { name: string; level: number; note: string }[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "ml",
    label: "Machine Learning & Data Science",
    blurb: "Supervised & unsupervised learning end-to-end — from EDA and feature engineering to honest model evaluation.",
    icon: "M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8z",
    items: [
      { name: "Regression & Classification", level: 88, note: "Model selection & tuning" },
      { name: "Time Series Forecasting", level: 85, note: "Trend & seasonality" },
      { name: "EDA & Feature Engineering", level: 90, note: "Cleaning, transforms" },
      { name: "Model Evaluation", level: 87, note: "CV, train-test split" },
    ],
  },
  {
    key: "dl",
    label: "Deep Learning",
    blurb: "Neural networks for vision and language — building detection pipelines and fine-tuning transformers.",
    icon: "M6 18a4 4 0 0 1 .5-7.97 6 6 0 0 1 11.6 1.6A3.5 3.5 0 0 1 17.5 18z",
    items: [
      { name: "Neural Networks", level: 84, note: "CNN, LSTM" },
      { name: "Computer Vision", level: 82, note: "YOLOv8, ResNet50" },
      { name: "NLP & Transformers", level: 80, note: "XLM-RoBERTa fine-tuning" },
      { name: "TensorFlow / Keras", level: 83, note: "Training & inference" },
    ],
  },
  {
    key: "data",
    label: "Data & Databases",
    blurb: "Getting data in shape and telling its story — SQL, dashboards, and clear, actionable reports.",
    icon: "M4 7a8 3 0 1 0 16 0A8 3 0 1 0 4 7M4 7v10a8 3 0 0 0 16 0V7",
    items: [
      { name: "SQL (MySQL / SQLite)", level: 86, note: "Optimized queries" },
      { name: "Pandas & NumPy", level: 90, note: "Wrangling & analysis" },
      { name: "Data Visualization", level: 85, note: "Matplotlib, Seaborn, Power BI" },
      { name: "Data Storytelling", level: 84, note: "Insights → decisions" },
    ],
  },
  {
    key: "eng",
    label: "Engineering & Deployment",
    blurb: "Taking models off the notebook — REST APIs, cloud deployment, and interactive demos people can actually use.",
    icon: "M4 6h16M4 12h10M4 18h7",
    items: [
      { name: "Flask REST APIs", level: 82, note: "Serving models" },
      { name: "MongoDB Integration", level: 78, note: "Storage & retrieval" },
      { name: "Cloud Deployment", level: 76, note: "HF Spaces, cloud" },
      { name: "Gradio / Streamlit", level: 83, note: "Interactive apps" },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  impact: { k: string; v: string }[];
  stack: string[];
  image: string;
  accent: string;
  link?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "muzzle",
    name: "Cattle Muzzle Biometric ID",
    category: "Computer Vision · Deep Learning",
    year: "Feb 2026",
    summary:
      "An AI-powered livestock recognition system that identifies cattle by their unique muzzle patterns. I built a YOLOv8 detection pipeline to auto-crop muzzle regions, a ResNet50 embedding model for similarity matching, and applied CLAHE enhancement to boost feature quality — all served through a Flask REST API with a database for real-time registration and identification.",
    impact: [
      { k: "Detection", v: "YOLOv8" },
      { k: "Embeddings", v: "ResNet50" },
      { k: "Serving", v: "Flask API" },
    ],
    stack: ["YOLOv8", "ResNet50", "Flask", "MongoDB", "OpenCV"],
    image: "/images/proj-1.png",
    accent: "from-bronze-500/25 to-transparent",
  },
  {
    id: "tanglish",
    name: "Tanglish Hate Speech Detection",
    category: "NLP · Transformers",
    year: "Nov 2025",
    summary:
      "A multilingual moderation system for Tanglish (Tamil written in English script) social media content. I fine-tuned XLM-RoBERTa to classify hate speech, offensive language, and safe content, built a real-time pipeline to flag harmful messages, and deployed it as an interactive Gradio app on Hugging Face Spaces.",
    impact: [
      { k: "Model", v: "XLM-RoBERTa" },
      { k: "Classes", v: "3-way" },
      { k: "Deploy", v: "HF Spaces" },
    ],
    stack: ["XLM-RoBERTa", "Hugging Face", "Gradio", "PyTorch"],
    image: "/images/proj-2.png",
    accent: "from-steel-500/25 to-transparent",
  },
  {
    id: "credence",
    name: "Credence — Fake News Detection",
    category: "Hackathon Winner · NLP",
    year: "2025",
    summary:
      "Built in a 24-hour L&T EduTech hackathon (1st place, ₹25,000). Credence verifies content — text, URLs, and images — by cross-checking against NewsAPI, GNews, and Google Fact Check APIs, returning a credibility read within 5–10 seconds to fight misinformation on social media.",
    impact: [
      { k: "Result", v: "1st place" },
      { k: "Prize", v: "₹25K" },
      { k: "Verify time", v: "5–10s" },
    ],
    stack: ["Python", "NewsAPI", "GNews", "Fact Check API"],
    image: "/images/proj-3.png",
    accent: "from-bronze-400/20 to-transparent",
  },
];

export const EXPERIENCE = [
  {
    company: "Xtrafin",
    role: "Artificial Intelligence Intern",
    period: "May 2026 — Jun 2026",
    location: "Coimbatore, TN · On-site",
    blurb:
      "Contributed to an AI-powered Student Academic Intelligence System built into a School ERP platform — exploring how ML can turn raw school data into personalized learning support.",
    wins: [
      "Worked across 12+ core ERP modules with AI-driven analytics",
      "Supported analytics design over 1,000+ student records",
      "Explored ML for performance prediction & learning-gap detection",
    ],
    tags: ["Data Modeling", "ML", "EdTech", "Analytics"],
  },
  {
    company: "VaCaPay",
    role: "Artificial Intelligence Engineer Intern",
    period: "Dec 2025 — Mar 2026",
    location: "Coimbatore, TN · On-site",
    blurb:
      "Developed a deep-learning cattle identification system using muzzle biometrics, taking it from model to a deployed, real-time service.",
    wins: [
      "Built a YOLO-based detection + embedding similarity model",
      "Implemented a Flask REST API with MongoDB integration",
      "Deployed the system to the cloud for real-time recognition",
    ],
    tags: ["YOLO", "PyTorch", "Flask", "MongoDB"],
  },
  {
    company: "Intellipaat",
    role: "Data Scientist Intern",
    period: "Apr 2024 — Jun 2025",
    location: "Remote",
    blurb:
      "Applied statistical models and ML algorithms to complex datasets for business decision-making, collaborating with the team on data-driven solutions.",
    wins: [
      "Built predictive models with Python & SQL for real problems",
      "Used data visualization & storytelling to derive insights",
      "Shipped projects: COVID-19 trend analysis, churn prediction",
    ],
    tags: ["Python", "SQL", "Predictive Modeling", "Data Viz"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "One idea I found particularly exciting was designing an AI-powered academic intelligence system capable of analyzing student performance patterns, identifying strengths, highlighting learning gaps, and helping teachers provide personalized support. Building technology that solves meaningful problems is what motivates me.",
    name: "On the Xtrafin School-ERP internship",
    role: "From my LinkedIn",
    initials: "XT",
  },
  {
    quote:
      "We secured 1st place with a ₹25,000 cash prize at a 24-hour hackathon by L&T EduTech. The problem statements were given on the spot — we chose Fake News Detection and built Credence, a platform that verifies content quickly and effectively.",
    name: "On winning the L&T EduTech hackathon",
    role: "From my LinkedIn",
    initials: "LT",
  },
  {
    quote:
      "The value of a tool like Codex is highest when it's used as a collaborator — helping explore approaches, spot mistakes, or speed up iteration — not as a shortcut around fundamentals. Mastery comes from understanding the fundamentals that power everything.",
    name: "On learning AI the right way",
    role: "From my LinkedIn",
    initials: "EJ",
  },
];

export const CERTS = [
  {
    title: "Executive PG Certification in Data Science & AI",
    issuer: "IIT Roorkee (iHUB DivyaSampark)",
    date: "Apr 2025",
    note: "Advanced ML, deep learning & AI-driven analytics with hands-on projects.",
  },
  {
    title: "Data Science Architect Masters Program",
    issuer: "Intellipaat",
    date: "Jul 2025",
    note: "Data preprocessing, feature engineering, model training & evaluation in Python.",
  },
  {
    title: "AWS — Solutions Architecture Job Simulation",
    issuer: "Forage",
    date: "Sep 2025",
    note: "Cloud architecture fundamentals through a practical job simulation.",
  },
  {
    title: "Enterprise Design Thinking — Team Essentials for AI",
    issuer: "IBM",
    date: "2025",
    note: "Design-thinking framework for building AI products as a team.",
  },
  {
    title: "SQL Course",
    issuer: "Intellipaat",
    date: "Jul 2024",
    note: "Relational databases and optimized SQL queries for data retrieval & analysis.",
  },
];

export const FAQS = [
  {
    q: "What kind of roles are you looking for?",
    a: "I'm open to internships and early-career roles in Data Science, Machine Learning, and AI — on-site, hybrid, or remote. I'm currently a B.Tech AI & ML student at SNS College of Technology and I do my best work on teams building practical, real-world ML products.",
  },
  {
    q: "Are you a researcher or an engineer?",
    a: "I'm an ML practitioner who likes shipping. I care about the math and the fundamentals, but my favourite part is getting a model out of the notebook — building the pipeline, wrapping it in an API, and deploying something people can actually use, like I did with the cattle-biometric and Tanglish moderation projects.",
  },
  {
    q: "What are you strongest in?",
    a: "Python and SQL for the day-to-day; classical ML and time-series for modeling; and increasingly deep learning for vision (YOLOv8, ResNet50) and NLP (fine-tuning transformers like XLM-RoBERTa). I'm comfortable owning the full flow: EDA, feature engineering, training, evaluation, and deployment.",
  },
  {
    q: "How do you approach a new problem?",
    a: "I start with the data and a clear metric that maps to the real goal. I explore first (EDA), ship a simple baseline, and only add complexity when it genuinely helps. I lean on cross-validation and honest evaluation so I trust the numbers before anything ships.",
  },
  {
    q: "Can I see your code and certifications?",
    a: "Absolutely. My GitHub has real project code, and several projects (Tanglish detection, churn prediction) are live on Hugging Face Spaces. I hold 16 certifications including an Executive PG in Data Science & AI from IIT Roorkee, and IBM & AWS credentials — all shareable on request.",
  },
];
