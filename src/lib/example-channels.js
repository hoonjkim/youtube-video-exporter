// `query` is passed to search API — use @handle for channels with known handles,
// or channel name for channels where the handle is unknown/unreliable.
const en = [
  { query: "@3blue1brown", name: "3Blue1Brown", desc: "Visual math explanations", tag: "Math" },
  { query: "@veritasium", name: "Veritasium", desc: "Science and engineering videos", tag: "Science" },
  { query: "@khanacademy", name: "Khan Academy", desc: "Free courses for everyone", tag: "Education" },
  { query: "@mitocw", name: "MIT OpenCourseWare", desc: "MIT university lectures", tag: "Lectures" },
  { query: "@crashcourse", name: "CrashCourse", desc: "Fast-paced learning series", tag: "Education" },
  { query: "@numberphile", name: "Numberphile", desc: "Entertaining number theory", tag: "Math" },
  { query: "@TEDEd", name: "TED-Ed", desc: "Short animated lessons", tag: "Education" },
  { query: "@kurzgesagt", name: "Kurzgesagt", desc: "Science & philosophy animations", tag: "Science" },
  { query: "@CaspianReport", name: "CaspianReport", desc: "Geopolitics analysis", tag: "Geopolitics" },
  { query: "@minutephysics", name: "MinutePhysics", desc: "Physics explained quickly", tag: "Physics" },
];

const ko = [
  { query: "https://www.youtube.com/channel/UCMc4EmuDxnHPc6pgGW-QWvQ", name: "안될과학", desc: "흥미로운 과학 실험과 해설", tag: "과학" },
  { query: "https://www.youtube.com/channel/UCmgRYMK5d65PbjN8qkjAUBA", name: "과학쿠키", desc: "과학을 쉽고 재미있게", tag: "과학" },
  { query: "https://www.youtube.com/channel/UCJ2LU5vdHv-vUqOCQRfL9nw", name: "1분과학", desc: "짧고 간결한 과학 영상", tag: "과학" },
  { query: "https://www.youtube.com/channel/UCj-MI9DaXgAz412O9ybQ9WA", name: "이과형", desc: "재밌는 과학 이야기", tag: "과학" },
  { query: "https://www.youtube.com/channel/UCgheNMc3gGHLsT-RISdCzDQ", name: "세바시", desc: "세상을 바꾸는 시간 15분", tag: "강연" },
  { query: "https://www.youtube.com/channel/UCoj849iMorOYS1utXyZLzXw", name: "MKYU", desc: "자기계발과 동기부여", tag: "교육" },
  { query: "@3blue1brown", name: "3Blue1Brown", desc: "수학을 시각적으로 설명", tag: "수학" },
  { query: "@veritasium", name: "Veritasium", desc: "과학과 공학 영상", tag: "과학" },
  { query: "@kurzgesagt", name: "Kurzgesagt", desc: "과학 애니메이션", tag: "과학" },
  { query: "@TEDEd", name: "TED-Ed", desc: "짧은 애니메이션 강의", tag: "교육" },
];

const ja = [
  { query: "@yobinori", name: "ヨビノリ", desc: "大学レベルの数学・物理を分かりやすく", tag: "数学" },
  { query: "@3blue1brown", name: "3Blue1Brown", desc: "数学を視覚的に解説", tag: "数学" },
  { query: "@TEDEd", name: "TED-Ed", desc: "短いアニメーション授業", tag: "教育" },
  { query: "@kurzgesagt", name: "Kurzgesagt", desc: "科学アニメーション", tag: "科学" },
  { query: "@veritasium", name: "Veritasium", desc: "科学と工学の動画", tag: "科学" },
  { query: "@khanacademy", name: "Khan Academy", desc: "無料の学習コース", tag: "教育" },
  { query: "@numberphile", name: "Numberphile", desc: "数字の面白い世界", tag: "数学" },
  { query: "@crashcourse", name: "CrashCourse", desc: "テンポの速い学習シリーズ", tag: "教育" },
  { query: "@CaspianReport", name: "CaspianReport", desc: "地政学分析", tag: "地政学" },
  { query: "@minutephysics", name: "MinutePhysics", desc: "物理を手短に解説", tag: "物理" },
];

const zh = [
  { query: "@3blue1brown", name: "3Blue1Brown", desc: "数学可视化讲解", tag: "数学" },
  { query: "@kurzgesagt", name: "Kurzgesagt", desc: "科学与哲学动画", tag: "科学" },
  { query: "@veritasium", name: "Veritasium", desc: "科学与工程视频", tag: "科学" },
  { query: "@TEDEd", name: "TED-Ed", desc: "简短动画课程", tag: "教育" },
  { query: "@khanacademy", name: "Khan Academy", desc: "免费在线课程", tag: "教育" },
  { query: "@crashcourse", name: "CrashCourse", desc: "快节奏学习系列", tag: "教育" },
  { query: "@CaspianReport", name: "CaspianReport", desc: "地缘政治分析", tag: "政治" },
  { query: "@numberphile", name: "Numberphile", desc: "有趣的数字理论", tag: "数学" },
  { query: "@mitocw", name: "MIT OpenCourseWare", desc: "麻省理工大学公开课", tag: "讲座" },
  { query: "@minutephysics", name: "MinutePhysics", desc: "一分钟物理", tag: "物理" },
];

const es = [
  { query: "@QuantumFracture", name: "QuantumFracture", desc: "Física explicada con animaciones", tag: "Física" },
  { query: "@Derivando", name: "Derivando", desc: "Matemáticas entretenidas", tag: "Matemáticas" },
  { query: "@CdeCiencia", name: "CdeCiencia", desc: "Ciencia y descubrimientos", tag: "Ciencia" },
  { query: "@3blue1brown", name: "3Blue1Brown", desc: "Visualizaciones matemáticas", tag: "Matemáticas" },
  { query: "@veritasium", name: "Veritasium", desc: "Videos de ciencia e ingeniería", tag: "Ciencia" },
  { query: "@TEDEd", name: "TED-Ed", desc: "Lecciones animadas cortas", tag: "Educación" },
  { query: "@kurzgesagt", name: "Kurzgesagt", desc: "Animaciones de ciencia", tag: "Ciencia" },
  { query: "@khanacademy", name: "Khan Academy", desc: "Cursos gratuitos para todos", tag: "Educación" },
  { query: "@crashcourse", name: "CrashCourse", desc: "Series de aprendizaje rápido", tag: "Educación" },
  { query: "@CaspianReport", name: "CaspianReport", desc: "Análisis geopolítico", tag: "Geopolítica" },
];

export function getExampleChannels(lang) {
  const map = { en, ko, ja, zh, es };
  return map[lang] || en;
}

// Subject search terms per language
const subjects = [
  {
    id: "ai",
    icon: "🤖",
    label: { en: "AI", ko: "인공지능", ja: "AI", zh: "人工智能", es: "IA", fr: "IA", de: "KI", pt: "IA", it: "IA", ru: "ИИ", ar: "ذكاء اصطناعي", hi: "AI", tr: "Yapay Zeka", vi: "AI", th: "AI", id: "AI", nl: "AI", pl: "AI", bn: "AI", tl: "AI" },
    desc: { en: "Machine learning & deep learning", ko: "머신러닝과 딥러닝", ja: "機械学習とディープラーニング", zh: "机器学习与深度学习", es: "Aprendizaje automático y profundo", fr: "Apprentissage automatique et profond", de: "Maschinelles Lernen und Deep Learning", pt: "Aprendizado de máquina e profundo", it: "Apprendimento automatico e profondo", ru: "Машинное и глубокое обучение", ar: "تعلم الآلة والتعلم العميق", hi: "मशीन लर्निंग और डीप लर्निंग", tr: "Makine öğrenimi ve derin öğrenme", vi: "Học máy và học sâu", th: "การเรียนรู้ของเครื่องและการเรียนรู้เชิงลึก", id: "Pembelajaran mesin dan pembelajaran mendalam", nl: "Machine learning en deep learning", pl: "Uczenie maszynowe i głębokie", bn: "মেশিন লার্নিং ও ডিপ লার্নিং", tl: "Machine learning at deep learning" },
    query: { en: "artificial intelligence", ko: "인공지능 강의", ja: "人工知能 講義", zh: "人工智能 教程", es: "inteligencia artificial", fr: "intelligence artificielle", de: "künstliche Intelligenz", pt: "inteligência artificial", it: "intelligenza artificiale", ru: "искусственный интеллект", ar: "ذكاء اصطناعي تعليم", hi: "आर्टिफिशियल इंटेलिजेंस", tr: "yapay zeka eğitim", vi: "trí tuệ nhân tạo", th: "ปัญญาประดิษฐ์", id: "kecerdasan buatan", nl: "kunstmatige intelligentie", pl: "sztuczna inteligencja", bn: "কৃত্রিম বুদ্ধিমত্তা", tl: "artificial intelligence" },
  },
  {
    id: "math",
    icon: "📐",
    label: { en: "Math", ko: "수학", ja: "数学", zh: "数学", es: "Matemáticas", fr: "Maths", de: "Mathematik", pt: "Matemática", it: "Matematica", ru: "Математика", ar: "رياضيات", hi: "गणित", tr: "Matematik", vi: "Toán học", th: "คณิตศาสตร์", id: "Matematika", nl: "Wiskunde", pl: "Matematyka", bn: "গণিত", tl: "Matematika" },
    desc: { en: "Algebra, calculus & beyond", ko: "대수학, 미적분 등", ja: "代数、微積分など", zh: "代数、微积分等", es: "Álgebra, cálculo y más", fr: "Algèbre, calcul et au-delà", de: "Algebra, Analysis und mehr", pt: "Álgebra, cálculo e além", it: "Algebra, analisi e oltre", ru: "Алгебра, анализ и не только", ar: "الجبر والتفاضل والتكامل", hi: "बीजगणित, कलन और आगे", tr: "Cebir, kalkülüs ve ötesi", vi: "Đại số, giải tích và hơn thế", th: "พีชคณิต แคลคูลัส และอื่นๆ", id: "Aljabar, kalkulus, dan lainnya", nl: "Algebra, calculus en meer", pl: "Algebra, rachunek różniczkowy i więcej", bn: "বীজগণিত, ক্যালকুলাস ও আরও", tl: "Algebra, calculus at higit pa" },
    query: { en: "mathematics education", ko: "수학 강의", ja: "数学 授業", zh: "数学 教育", es: "matemáticas educación", fr: "mathématiques cours", de: "Mathematik Bildung", pt: "matemática educação", it: "matematica lezioni", ru: "математика уроки", ar: "رياضيات تعليم", hi: "गणित शिक्षा", tr: "matematik dersleri", vi: "toán học giáo dục", th: "คณิตศาสตร์ การศึกษา", id: "matematika pendidikan", nl: "wiskunde onderwijs", pl: "matematyka edukacja", bn: "গণিত শিক্ষা", tl: "matematika edukasyon" },
  },
  {
    id: "science",
    icon: "🔬",
    label: { en: "Science", ko: "과학", ja: "科学", zh: "科学", es: "Ciencia", fr: "Sciences", de: "Wissenschaft", pt: "Ciência", it: "Scienza", ru: "Наука", ar: "علوم", hi: "विज्ञान", tr: "Bilim", vi: "Khoa học", th: "วิทยาศาสตร์", id: "Sains", nl: "Wetenschap", pl: "Nauka", bn: "বিজ্ঞান", tl: "Agham" },
    desc: { en: "Experiments & discoveries", ko: "실험과 과학 발견", ja: "実験と科学的発見", zh: "实验与科学发现", es: "Experimentos y descubrimientos", fr: "Expériences et découvertes", de: "Experimente und Entdeckungen", pt: "Experimentos e descobertas", it: "Esperimenti e scoperte", ru: "Эксперименты и открытия", ar: "تجارب واكتشافات", hi: "प्रयोग और खोजें", tr: "Deneyler ve keşifler", vi: "Thí nghiệm và khám phá", th: "การทดลองและการค้นพบ", id: "Eksperimen dan penemuan", nl: "Experimenten en ontdekkingen", pl: "Eksperymenty i odkrycia", bn: "পরীক্ষা-নিরীক্ষা ও আবিষ্কার", tl: "Eksperimento at mga natuklasan" },
    query: { en: "science education", ko: "과학 강의", ja: "科学 教育", zh: "科学 教育", es: "ciencia educación", fr: "sciences éducation", de: "Wissenschaft Bildung", pt: "ciência educação", it: "scienza educazione", ru: "наука образование", ar: "علوم تعليم", hi: "विज्ञान शिक्षा", tr: "bilim eğitim", vi: "khoa học giáo dục", th: "วิทยาศาสตร์ การศึกษา", id: "sains pendidikan", nl: "wetenschap onderwijs", pl: "nauka edukacja", bn: "বিজ্ঞান শিক্ষা", tl: "agham edukasyon" },
  },
  {
    id: "physics",
    icon: "⚛️",
    label: { en: "Physics", ko: "물리학", ja: "物理学", zh: "物理", es: "Física", fr: "Physique", de: "Physik", pt: "Física", it: "Fisica", ru: "Физика", ar: "فيزياء", hi: "भौतिकी", tr: "Fizik", vi: "Vật lý", th: "ฟิสิกส์", id: "Fisika", nl: "Natuurkunde", pl: "Fizyka", bn: "পদার্থবিজ্ঞান", tl: "Pisika" },
    desc: { en: "Mechanics, quantum & relativity", ko: "역학, 양자, 상대성이론", ja: "力学、量子、相対性理論", zh: "力学、量子与相对论", es: "Mecánica, cuántica y relatividad", fr: "Mécanique, quantique et relativité", de: "Mechanik, Quanten und Relativität", pt: "Mecânica, quântica e relatividade", it: "Meccanica, quantistica e relatività", ru: "Механика, квантовая физика и относительность", ar: "ميكانيكا وكم ونسبية", hi: "यांत्रिकी, क्वांटम और सापेक्षता", tr: "Mekanik, kuantum ve görelilik", vi: "Cơ học, lượng tử và tương đối", th: "กลศาสตร์ ควอนตัม และสัมพัทธภาพ", id: "Mekanika, kuantum, dan relativitas", nl: "Mechanica, kwantum en relativiteit", pl: "Mechanika, kwanty i względność", bn: "বলবিদ্যা, কোয়ান্টাম ও আপেক্ষিকতা", tl: "Mekaniks, quantum at relativity" },
    query: { en: "physics lectures", ko: "물리학 강의", ja: "物理学 講義", zh: "物理 讲座", es: "física clases", fr: "physique cours", de: "Physik Vorlesung", pt: "física aulas", it: "fisica lezioni", ru: "физика лекции", ar: "فيزياء دروس", hi: "भौतिकी व्याख्यान", tr: "fizik dersleri", vi: "vật lý bài giảng", th: "ฟิสิกส์ บทเรียน", id: "fisika pelajaran", nl: "natuurkunde lessen", pl: "fizyka wykłady", bn: "পদার্থবিজ্ঞান পাঠ", tl: "pisika aralin" },
  },
  {
    id: "chemistry",
    icon: "🧪",
    label: { en: "Chemistry", ko: "화학", ja: "化学", zh: "化学", es: "Química", fr: "Chimie", de: "Chemie", pt: "Química", it: "Chimica", ru: "Химия", ar: "كيمياء", hi: "रसायन", tr: "Kimya", vi: "Hóa học", th: "เคมี", id: "Kimia", nl: "Scheikunde", pl: "Chemia", bn: "রসায়ন", tl: "Kimika" },
    desc: { en: "Reactions, elements & compounds", ko: "반응, 원소, 화합물", ja: "反応、元素、化合物", zh: "反应、元素与化合物", es: "Reacciones, elementos y compuestos", fr: "Réactions, éléments et composés", de: "Reaktionen, Elemente und Verbindungen", pt: "Reações, elementos e compostos", it: "Reazioni, elementi e composti", ru: "Реакции, элементы и соединения", ar: "تفاعلات وعناصر ومركبات", hi: "अभिक्रियाएँ, तत्व और यौगिक", tr: "Tepkimeler, elementler ve bileşikler", vi: "Phản ứng, nguyên tố và hợp chất", th: "ปฏิกิริยา ธาตุ และสารประกอบ", id: "Reaksi, unsur, dan senyawa", nl: "Reacties, elementen en verbindingen", pl: "Reakcje, pierwiastki i związki", bn: "বিক্রিয়া, মৌল ও যৌগ", tl: "Reaksyon, elemento at compound" },
    query: { en: "chemistry education", ko: "화학 강의", ja: "化学 授業", zh: "化学 教育", es: "química educación", fr: "chimie cours", de: "Chemie Bildung", pt: "química educação", it: "chimica lezioni", ru: "химия уроки", ar: "كيمياء تعليم", hi: "रसायन शिक्षा", tr: "kimya dersleri", vi: "hóa học giáo dục", th: "เคมี การศึกษา", id: "kimia pendidikan", nl: "scheikunde onderwijs", pl: "chemia edukacja", bn: "রসায়ন শিক্ষা", tl: "kimika edukasyon" },
  },
  {
    id: "biology",
    icon: "🧬",
    label: { en: "Biology", ko: "생물학", ja: "生物学", zh: "生物", es: "Biología", fr: "Biologie", de: "Biologie", pt: "Biologia", it: "Biologia", ru: "Биология", ar: "أحياء", hi: "जीवविज्ञान", tr: "Biyoloji", vi: "Sinh học", th: "ชีววิทยา", id: "Biologi", nl: "Biologie", pl: "Biologia", bn: "জীববিজ্ঞান", tl: "Biyolohiya" },
    desc: { en: "Life, cells & evolution", ko: "생명, 세포, 진화", ja: "生命、細胞、進化", zh: "生命、细胞与进化", es: "Vida, células y evolución", fr: "Vie, cellules et évolution", de: "Leben, Zellen und Evolution", pt: "Vida, células e evolução", it: "Vita, cellule ed evoluzione", ru: "Жизнь, клетки и эволюция", ar: "حياة وخلايا وتطور", hi: "जीवन, कोशिकाएँ और विकास", tr: "Yaşam, hücreler ve evrim", vi: "Sự sống, tế bào và tiến hóa", th: "ชีวิต เซลล์ และวิวัฒนาการ", id: "Kehidupan, sel, dan evolusi", nl: "Leven, cellen en evolutie", pl: "Życie, komórki i ewolucja", bn: "জীবন, কোষ ও বিবর্তন", tl: "Buhay, cell at ebolusyon" },
    query: { en: "biology education", ko: "생물학 강의", ja: "生物学 授業", zh: "生物 教育", es: "biología educación", fr: "biologie cours", de: "Biologie Bildung", pt: "biologia educação", it: "biologia lezioni", ru: "биология уроки", ar: "أحياء تعليم", hi: "जीवविज्ञान शिक्षा", tr: "biyoloji dersleri", vi: "sinh học giáo dục", th: "ชีววิทยา การศึกษา", id: "biologi pendidikan", nl: "biologie onderwijs", pl: "biologia edukacja", bn: "জীববিজ্ঞান শিক্ষা", tl: "biyolohiya edukasyon" },
  },
  {
    id: "history",
    icon: "📜",
    label: { en: "History", ko: "역사", ja: "歴史", zh: "历史", es: "Historia", fr: "Histoire", de: "Geschichte", pt: "História", it: "Storia", ru: "История", ar: "تاريخ", hi: "इतिहास", tr: "Tarih", vi: "Lịch sử", th: "ประวัติศาสตร์", id: "Sejarah", nl: "Geschiedenis", pl: "Historia", bn: "ইতিহাস", tl: "Kasaysayan" },
    desc: { en: "Civilizations & major events", ko: "문명과 주요 역사 사건", ja: "文明と歴史的事件", zh: "文明与重大事件", es: "Civilizaciones y eventos clave", fr: "Civilisations et événements majeurs", de: "Zivilisationen und wichtige Ereignisse", pt: "Civilizações e eventos importantes", it: "Civiltà e grandi eventi", ru: "Цивилизации и важные события", ar: "حضارات وأحداث كبرى", hi: "सभ्यताएँ और प्रमुख घटनाएँ", tr: "Uygarlıklar ve önemli olaylar", vi: "Văn minh và sự kiện lớn", th: "อารยธรรมและเหตุการณ์สำคัญ", id: "Peradaban dan peristiwa penting", nl: "Beschavingen en belangrijke gebeurtenissen", pl: "Cywilizacje i ważne wydarzenia", bn: "সভ্যতা ও প্রধান ঘটনা", tl: "Sibilisasyon at mahahalagang pangyayari" },
    query: { en: "history documentary", ko: "역사 다큐멘터리", ja: "歴史 ドキュメンタリー", zh: "历史 纪录片", es: "historia documental", fr: "histoire documentaire", de: "Geschichte Dokumentation", pt: "história documentário", it: "storia documentario", ru: "история документальный", ar: "تاريخ وثائقي", hi: "इतिहास वृत्तचित्र", tr: "tarih belgesel", vi: "lịch sử phim tài liệu", th: "ประวัติศาสตร์ สารคดี", id: "sejarah dokumenter", nl: "geschiedenis documentaire", pl: "historia dokument", bn: "ইতিহাস তথ্যচিত্র", tl: "kasaysayan dokumentaryo" },
  },
  {
    id: "programming",
    icon: "💻",
    label: { en: "Programming", ko: "프로그래밍", ja: "プログラミング", zh: "编程", es: "Programación", fr: "Programmation", de: "Programmierung", pt: "Programação", it: "Programmazione", ru: "Программирование", ar: "برمجة", hi: "प्रोग्रामिंग", tr: "Programlama", vi: "Lập trình", th: "การเขียนโปรแกรม", id: "Pemrograman", nl: "Programmeren", pl: "Programowanie", bn: "প্রোগ্রামিং", tl: "Programming" },
    desc: { en: "Coding tutorials & projects", ko: "코딩 튜토리얼과 프로젝트", ja: "コーディング講座", zh: "编程教程与项目", es: "Tutoriales de código y proyectos", fr: "Tutoriels de code et projets", de: "Coding-Tutorials und Projekte", pt: "Tutoriais de código e projetos", it: "Tutorial di codice e progetti", ru: "Уроки кода и проекты", ar: "دروس برمجة ومشاريع", hi: "कोडिंग ट्यूटोरियल और प्रोजेक्ट", tr: "Kodlama dersleri ve projeler", vi: "Hướng dẫn lập trình và dự án", th: "บทเรียนเขียนโค้ดและโปรเจกต์", id: "Tutorial coding dan proyek", nl: "Codingtutorials en projecten", pl: "Samouczki kodowania i projekty", bn: "কোডিং টিউটোরিয়াল ও প্রজেক্ট", tl: "Coding tutorial at proyekto" },
    query: { en: "programming tutorial", ko: "프로그래밍 강의", ja: "プログラミング 講座", zh: "编程 教程", es: "programación tutorial", fr: "programmation tutoriel", de: "Programmierung Tutorial", pt: "programação tutorial", it: "programmazione tutorial", ru: "программирование уроки", ar: "برمجة تعليم", hi: "प्रोग्रामिंग ट्यूटोरियल", tr: "programlama dersleri", vi: "lập trình hướng dẫn", th: "เขียนโปรแกรม สอน", id: "pemrograman tutorial", nl: "programmeren tutorial", pl: "programowanie tutorial", bn: "প্রোগ্রামিং টিউটোরিয়াল", tl: "programming tutorial" },
  },
  {
    id: "economics",
    icon: "📊",
    label: { en: "Economics", ko: "경제", ja: "経済学", zh: "经济", es: "Economía", fr: "Économie", de: "Wirtschaft", pt: "Economia", it: "Economia", ru: "Экономика", ar: "اقتصاد", hi: "अर्थशास्त्र", tr: "Ekonomi", vi: "Kinh tế", th: "เศรษฐศาสตร์", id: "Ekonomi", nl: "Economie", pl: "Ekonomia", bn: "অর্থনীতি", tl: "Ekonomiya" },
    desc: { en: "Markets, policy & finance", ko: "시장, 정책, 금융", ja: "市場、政策、金融", zh: "市场、政策与金融", es: "Mercados, política y finanzas", fr: "Marchés, politique et finance", de: "Märkte, Politik und Finanzen", pt: "Mercados, política e finanças", it: "Mercati, politica e finanza", ru: "Рынки, политика и финансы", ar: "أسواق وسياسات ومالية", hi: "बाज़ार, नीति और वित्त", tr: "Piyasalar, politika ve finans", vi: "Thị trường, chính sách và tài chính", th: "ตลาด นโยบาย และการเงิน", id: "Pasar, kebijakan, dan keuangan", nl: "Markten, beleid en financiën", pl: "Rynki, polityka i finanse", bn: "বাজার, নীতি ও অর্থায়ন", tl: "Merkado, patakaran at pinansya" },
    query: { en: "economics explained", ko: "경제 강의", ja: "経済学 講義", zh: "经济学 讲解", es: "economía explicada", fr: "économie expliquée", de: "Wirtschaft erklärt", pt: "economia explicada", it: "economia spiegata", ru: "экономика лекции", ar: "اقتصاد شرح", hi: "अर्थशास्त्र व्याख्या", tr: "ekonomi dersleri", vi: "kinh tế giải thích", th: "เศรษฐศาสตร์ อธิบาย", id: "ekonomi penjelasan", nl: "economie uitgelegd", pl: "ekonomia wyjaśniona", bn: "অর্থনীতি ব্যাখ্যা", tl: "ekonomiya paliwanag" },
  },
  {
    id: "philosophy",
    icon: "🤔",
    label: { en: "Philosophy", ko: "철학", ja: "哲学", zh: "哲学", es: "Filosofía", fr: "Philosophie", de: "Philosophie", pt: "Filosofia", it: "Filosofia", ru: "Философия", ar: "فلسفة", hi: "दर्शन", tr: "Felsefe", vi: "Triết học", th: "ปรัชญา", id: "Filsafat", nl: "Filosofie", pl: "Filozofia", bn: "দর্শন", tl: "Pilosopiya" },
    desc: { en: "Ethics, logic & great thinkers", ko: "윤리, 논리, 위대한 사상가", ja: "倫理、論理、偉大な思想家", zh: "伦理、逻辑与伟大思想家", es: "Ética, lógica y grandes pensadores", fr: "Éthique, logique et grands penseurs", de: "Ethik, Logik und große Denker", pt: "Ética, lógica e grandes pensadores", it: "Etica, logica e grandi pensatori", ru: "Этика, логика и великие мыслители", ar: "أخلاق ومنطق ومفكرون عظماء", hi: "नैतिकता, तर्क और महान विचारक", tr: "Etik, mantık ve büyük düşünürler", vi: "Đạo đức, logic và nhà tư tưởng", th: "จริยธรรม ตรรกะ และนักคิดผู้ยิ่งใหญ่", id: "Etika, logika, dan pemikir besar", nl: "Ethiek, logica en grote denkers", pl: "Etyka, logika i wielcy myśliciele", bn: "নীতিশাস্ত্র, যুক্তি ও মহান চিন্তাবিদ", tl: "Etika, lohika at dakilang isip" },
    query: { en: "philosophy lectures", ko: "철학 강의", ja: "哲学 講義", zh: "哲学 讲座", es: "filosofía clases", fr: "philosophie cours", de: "Philosophie Vorlesung", pt: "filosofia aulas", it: "filosofia lezioni", ru: "философия лекции", ar: "فلسفة محاضرات", hi: "दर्शन व्याख्यान", tr: "felsefe dersleri", vi: "triết học bài giảng", th: "ปรัชญา บทเรียน", id: "filsafat pelajaran", nl: "filosofie lessen", pl: "filozofia wykłady", bn: "দর্শন বক্তৃতা", tl: "pilosopiya aralin" },
  },
  {
    id: "engineering",
    icon: "⚙️",
    label: { en: "Engineering", ko: "공학", ja: "工学", zh: "工程", es: "Ingeniería", fr: "Ingénierie", de: "Ingenieurwesen", pt: "Engenharia", it: "Ingegneria", ru: "Инженерия", ar: "هندسة", hi: "अभियांत्रिकी", tr: "Mühendislik", vi: "Kỹ thuật", th: "วิศวกรรม", id: "Teknik", nl: "Techniek", pl: "Inżynieria", bn: "প্রকৌশল", tl: "Inhinyeriya" },
    desc: { en: "Design, build & innovate", ko: "설계, 제작, 혁신", ja: "設計、構築、革新", zh: "设计、建造与创新", es: "Diseño, construcción e innovación", fr: "Concevoir, construire et innover", de: "Entwerfen, bauen und innovieren", pt: "Projetar, construir e inovar", it: "Progettare, costruire e innovare", ru: "Проектирование, строительство и инновации", ar: "تصميم وبناء وابتكار", hi: "डिज़ाइन, निर्माण और नवाचार", tr: "Tasarla, inşa et ve yenilik yap", vi: "Thiết kế, xây dựng và đổi mới", th: "ออกแบบ สร้าง และนวัตกรรม", id: "Desain, bangun, dan inovasi", nl: "Ontwerpen, bouwen en innoveren", pl: "Projektowanie, budowa i innowacje", bn: "ডিজাইন, নির্মাণ ও উদ্ভাবন", tl: "Disenyo, gawa at inobasyon" },
    query: { en: "engineering explained", ko: "공학 강의", ja: "工学 講義", zh: "工程 讲解", es: "ingeniería explicada", fr: "ingénierie expliquée", de: "Ingenieurwesen erklärt", pt: "engenharia explicada", it: "ingegneria spiegata", ru: "инженерия лекции", ar: "هندسة شرح", hi: "अभियांत्रिकी व्याख्या", tr: "mühendislik dersleri", vi: "kỹ thuật giải thích", th: "วิศวกรรม อธิบาย", id: "teknik penjelasan", nl: "techniek uitgelegd", pl: "inżynieria wyjaśniona", bn: "প্রকৌশল ব্যাখ্যা", tl: "inhinyeriya paliwanag" },
  },
  {
    id: "medicine",
    icon: "🩺",
    label: { en: "Medicine", ko: "의학", ja: "医学", zh: "医学", es: "Medicina", fr: "Médecine", de: "Medizin", pt: "Medicina", it: "Medicina", ru: "Медицина", ar: "طب", hi: "चिकित्सा", tr: "Tıp", vi: "Y học", th: "แพทยศาสตร์", id: "Kedokteran", nl: "Geneeskunde", pl: "Medycyna", bn: "চিকিৎসা", tl: "Medisina" },
    desc: { en: "Health, anatomy & medical science", ko: "건강, 해부학, 의학", ja: "健康、解剖学、医学", zh: "健康、解剖与医学", es: "Salud, anatomía y ciencia médica", fr: "Santé, anatomie et science médicale", de: "Gesundheit, Anatomie und Medizin", pt: "Saúde, anatomia e ciência médica", it: "Salute, anatomia e scienza medica", ru: "Здоровье, анатомия и медицинская наука", ar: "صحة وتشريح وعلوم طبية", hi: "स्वास्थ्य, शरीर रचना और चिकित्सा विज्ञान", tr: "Sağlık, anatomi ve tıp bilimi", vi: "Sức khỏe, giải phẫu và y khoa", th: "สุขภาพ กายวิภาค และวิทยาศาสตร์การแพทย์", id: "Kesehatan, anatomi, dan ilmu kedokteran", nl: "Gezondheid, anatomie en medische wetenschap", pl: "Zdrowie, anatomia i nauki medyczne", bn: "স্বাস্থ্য, শারীরবিদ্যা ও চিকিৎসা বিজ্ঞান", tl: "Kalusugan, anatomiya at medikal na agham" },
    query: { en: "medical education", ko: "의학 강의", ja: "医学 講義", zh: "医学 教育", es: "medicina educación", fr: "médecine cours", de: "Medizin Bildung", pt: "medicina educação", it: "medicina lezioni", ru: "медицина лекции", ar: "طب تعليم", hi: "चिकित्सा शिक्षा", tr: "tıp dersleri", vi: "y học giáo dục", th: "แพทยศาสตร์ การศึกษา", id: "kedokteran pendidikan", nl: "geneeskunde onderwijs", pl: "medycyna edukacja", bn: "চিকিৎসা শিক্ষা", tl: "medisina edukasyon" },
  },
  {
    id: "psychology",
    icon: "🧠",
    label: { en: "Psychology", ko: "심리학", ja: "心理学", zh: "心理学", es: "Psicología", fr: "Psychologie", de: "Psychologie", pt: "Psicologia", it: "Psicologia", ru: "Психология", ar: "علم نفس", hi: "मनोविज्ञान", tr: "Psikoloji", vi: "Tâm lý học", th: "จิตวิทยา", id: "Psikologi", nl: "Psychologie", pl: "Psychologia", bn: "মনোবিজ্ঞান", tl: "Sikolohiya" },
    desc: { en: "Mind, behavior & mental health", ko: "마음, 행동, 정신건강", ja: "心、行動、メンタルヘルス", zh: "心理、行为与心理健康", es: "Mente, comportamiento y salud mental", fr: "Esprit, comportement et santé mentale", de: "Geist, Verhalten und psychische Gesundheit", pt: "Mente, comportamento e saúde mental", it: "Mente, comportamento e salute mentale", ru: "Разум, поведение и психическое здоровье", ar: "عقل وسلوك وصحة نفسية", hi: "मन, व्यवहार और मानसिक स्वास्थ्य", tr: "Zihin, davranış ve ruh sağlığı", vi: "Tâm trí, hành vi và sức khỏe tâm thần", th: "จิตใจ พฤติกรรม และสุขภาพจิต", id: "Pikiran, perilaku, dan kesehatan mental", nl: "Geest, gedrag en geestelijke gezondheid", pl: "Umysł, zachowanie i zdrowie psychiczne", bn: "মন, আচরণ ও মানসিক স্বাস্থ্য", tl: "Isip, asal at kalusugang pangkaisipan" },
    query: { en: "psychology lectures", ko: "심리학 강의", ja: "心理学 講義", zh: "心理学 讲座", es: "psicología clases", fr: "psychologie cours", de: "Psychologie Vorlesung", pt: "psicologia aulas", it: "psicologia lezioni", ru: "психология лекции", ar: "علم نفس محاضرات", hi: "मनोविज्ञान व्याख्यान", tr: "psikoloji dersleri", vi: "tâm lý học bài giảng", th: "จิตวิทยา บทเรียน", id: "psikologi pelajaran", nl: "psychologie lessen", pl: "psychologia wykłady", bn: "মনোবিজ্ঞান বক্তৃতা", tl: "sikolohiya aralin" },
  },
  {
    id: "geopolitics",
    icon: "🌍",
    label: { en: "Geopolitics", ko: "국제정치", ja: "地政学", zh: "地缘政治", es: "Geopolítica", fr: "Géopolitique", de: "Geopolitik", pt: "Geopolítica", it: "Geopolitica", ru: "Геополитика", ar: "جيوسياسية", hi: "भू-राजनीति", tr: "Jeopolitik", vi: "Địa chính trị", th: "ภูมิรัฐศาสตร์", id: "Geopolitik", nl: "Geopolitiek", pl: "Geopolityka", bn: "ভূ-রাজনীতি", tl: "Geopolitika" },
    desc: { en: "World affairs & global strategy", ko: "세계 정세와 국제 전략", ja: "国際情勢と戦略", zh: "世界局势与全球战略", es: "Asuntos mundiales y estrategia global", fr: "Affaires mondiales et stratégie globale", de: "Weltgeschehen und globale Strategie", pt: "Assuntos mundiais e estratégia global", it: "Affari mondiali e strategia globale", ru: "Мировые дела и глобальная стратегия", ar: "شؤون عالمية واستراتيجية دولية", hi: "विश्व मामले और वैश्विक रणनीति", tr: "Dünya meseleleri ve küresel strateji", vi: "Quan hệ quốc tế và chiến lược toàn cầu", th: "กิจการโลกและยุทธศาสตร์ระดับโลก", id: "Urusan dunia dan strategi global", nl: "Wereldzaken en mondiale strategie", pl: "Sprawy światowe i strategia globalna", bn: "বিশ্ব বিষয়াবলি ও বৈশ্বিক কৌশল", tl: "Pandaigdigang usapin at global na estratehiya" },
    query: { en: "geopolitics analysis", ko: "국제정치 분석", ja: "地政学 分析", zh: "地缘政治 分析", es: "geopolítica análisis", fr: "géopolitique analyse", de: "Geopolitik Analyse", pt: "geopolítica análise", it: "geopolitica analisi", ru: "геополитика анализ", ar: "جيوسياسية تحليل", hi: "भू-राजनीति विश्लेषण", tr: "jeopolitik analiz", vi: "địa chính trị phân tích", th: "ภูมิรัฐศาสตร์ วิเคราะห์", id: "geopolitik analisis", nl: "geopolitiek analyse", pl: "geopolityka analiza", bn: "ভূ-রাজনীতি বিশ্লেষণ", tl: "geopolitika pagsusuri" },
  },
  {
    id: "music",
    icon: "🎵",
    label: { en: "Music Theory", ko: "음악이론", ja: "音楽理論", zh: "乐理", es: "Teoría Musical", fr: "Théorie musicale", de: "Musiktheorie", pt: "Teoria Musical", it: "Teoria Musicale", ru: "Теория музыки", ar: "نظرية موسيقى", hi: "संगीत सिद्धांत", tr: "Müzik Teorisi", vi: "Lý thuyết âm nhạc", th: "ทฤษฎีดนตรี", id: "Teori Musik", nl: "Muziektheorie", pl: "Teoria Muzyki", bn: "সংগীত তত্ত্ব", tl: "Teorya ng Musika" },
    desc: { en: "Harmony, rhythm & composition", ko: "화성학, 리듬, 작곡", ja: "和声、リズム、作曲", zh: "和声、节奏与作曲", es: "Armonía, ritmo y composición", fr: "Harmonie, rythme et composition", de: "Harmonie, Rhythmus und Komposition", pt: "Harmonia, ritmo e composição", it: "Armonia, ritmo e composizione", ru: "Гармония, ритм и композиция", ar: "تناغم وإيقاع وتأليف", hi: "सामंजस्य, ताल और रचना", tr: "Armoni, ritim ve kompozisyon", vi: "Hòa âm, nhịp điệu và sáng tác", th: "ฮาร์โมนี จังหวะ และการประพันธ์", id: "Harmoni, ritme, dan komposisi", nl: "Harmonie, ritme en compositie", pl: "Harmonia, rytm i kompozycja", bn: "সুরসংগতি, তাল ও রচনা", tl: "Harmonya, ritmo at komposisyon" },
    query: { en: "music theory lessons", ko: "음악이론 강의", ja: "音楽理論 レッスン", zh: "乐理 教程", es: "teoría musical clases", fr: "théorie musicale cours", de: "Musiktheorie Unterricht", pt: "teoria musical aulas", it: "teoria musicale lezioni", ru: "теория музыки уроки", ar: "نظرية موسيقى دروس", hi: "संगीत सिद्धांत पाठ", tr: "müzik teorisi dersleri", vi: "lý thuyết âm nhạc bài học", th: "ทฤษฎีดนตรี บทเรียน", id: "teori musik pelajaran", nl: "muziektheorie lessen", pl: "teoria muzyki lekcje", bn: "সংগীত তত্ত্ব পাঠ", tl: "teorya ng musika aralin" },
  },
];

export function getSubjects(lang) {
  return subjects.map(s => ({
    id: s.id,
    icon: s.icon,
    label: s.label[lang] || s.label.en,
    desc: s.desc[lang] || s.desc.en,
    query: s.query[lang] || s.query.en,
  }));
}
