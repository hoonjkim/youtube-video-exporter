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
    label: { en: "AI", ko: "인공지능", ja: "AI", zh: "人工智能", es: "IA" },
    desc: { en: "Machine learning & deep learning", ko: "머신러닝과 딥러닝", ja: "機械学習とディープラーニング", zh: "机器学习与深度学习", es: "Aprendizaje automático y profundo" },
    query: { en: "artificial intelligence", ko: "인공지능 강의", ja: "人工知能 講義", zh: "人工智能 教程", es: "inteligencia artificial" },
  },
  {
    id: "math",
    icon: "📐",
    label: { en: "Math", ko: "수학", ja: "数学", zh: "数学", es: "Matemáticas" },
    desc: { en: "Algebra, calculus & beyond", ko: "대수학, 미적분 등", ja: "代数、微積分など", zh: "代数、微积分等", es: "Álgebra, cálculo y más" },
    query: { en: "mathematics education", ko: "수학 강의", ja: "数学 授業", zh: "数学 教育", es: "matemáticas educación" },
  },
  {
    id: "science",
    icon: "🔬",
    label: { en: "Science", ko: "과학", ja: "科学", zh: "科学", es: "Ciencia" },
    desc: { en: "Experiments & discoveries", ko: "실험과 과학 발견", ja: "実験と科学的発見", zh: "实验与科学发现", es: "Experimentos y descubrimientos" },
    query: { en: "science education", ko: "과학 강의", ja: "科学 教育", zh: "科学 教育", es: "ciencia educación" },
  },
  {
    id: "physics",
    icon: "⚛️",
    label: { en: "Physics", ko: "물리학", ja: "物理学", zh: "物理", es: "Física" },
    desc: { en: "Mechanics, quantum & relativity", ko: "역학, 양자, 상대성이론", ja: "力学、量子、相対性理論", zh: "力学、量子与相对论", es: "Mecánica, cuántica y relatividad" },
    query: { en: "physics lectures", ko: "물리학 강의", ja: "物理学 講義", zh: "物理 讲座", es: "física clases" },
  },
  {
    id: "chemistry",
    icon: "🧪",
    label: { en: "Chemistry", ko: "화학", ja: "化学", zh: "化学", es: "Química" },
    desc: { en: "Reactions, elements & compounds", ko: "반응, 원소, 화합물", ja: "反応、元素、化合物", zh: "反应、元素与化合物", es: "Reacciones, elementos y compuestos" },
    query: { en: "chemistry education", ko: "화학 강의", ja: "化学 授業", zh: "化学 教育", es: "química educación" },
  },
  {
    id: "biology",
    icon: "🧬",
    label: { en: "Biology", ko: "생물학", ja: "生物学", zh: "生物", es: "Biología" },
    desc: { en: "Life, cells & evolution", ko: "생명, 세포, 진화", ja: "生命、細胞、進化", zh: "生命、细胞与进化", es: "Vida, células y evolución" },
    query: { en: "biology education", ko: "생물학 강의", ja: "生物学 授業", zh: "生物 教育", es: "biología educación" },
  },
  {
    id: "history",
    icon: "📜",
    label: { en: "History", ko: "역사", ja: "歴史", zh: "历史", es: "Historia" },
    desc: { en: "Civilizations & major events", ko: "문명과 주요 역사 사건", ja: "文明と歴史的事件", zh: "文明与重大事件", es: "Civilizaciones y eventos clave" },
    query: { en: "history documentary", ko: "역사 다큐멘터리", ja: "歴史 ドキュメンタリー", zh: "历史 纪录片", es: "historia documental" },
  },
  {
    id: "programming",
    icon: "💻",
    label: { en: "Programming", ko: "프로그래밍", ja: "プログラミング", zh: "编程", es: "Programación" },
    desc: { en: "Coding tutorials & projects", ko: "코딩 튜토리얼과 프로젝트", ja: "コーディング講座", zh: "编程教程与项目", es: "Tutoriales de código y proyectos" },
    query: { en: "programming tutorial", ko: "프로그래밍 강의", ja: "プログラミング 講座", zh: "编程 教程", es: "programación tutorial" },
  },
  {
    id: "economics",
    icon: "📊",
    label: { en: "Economics", ko: "경제", ja: "経済学", zh: "经济", es: "Economía" },
    desc: { en: "Markets, policy & finance", ko: "시장, 정책, 금융", ja: "市場、政策、金融", zh: "市场、政策与金融", es: "Mercados, política y finanzas" },
    query: { en: "economics explained", ko: "경제 강의", ja: "経済学 講義", zh: "经济学 讲解", es: "economía explicada" },
  },
  {
    id: "philosophy",
    icon: "🤔",
    label: { en: "Philosophy", ko: "철학", ja: "哲学", zh: "哲学", es: "Filosofía" },
    desc: { en: "Ethics, logic & great thinkers", ko: "윤리, 논리, 위대한 사상가", ja: "倫理、論理、偉大な思想家", zh: "伦理、逻辑与伟大思想家", es: "Ética, lógica y grandes pensadores" },
    query: { en: "philosophy lectures", ko: "철학 강의", ja: "哲学 講義", zh: "哲学 讲座", es: "filosofía clases" },
  },
  {
    id: "engineering",
    icon: "⚙️",
    label: { en: "Engineering", ko: "공학", ja: "工学", zh: "工程", es: "Ingeniería" },
    desc: { en: "Design, build & innovate", ko: "설계, 제작, 혁신", ja: "設計、構築、革新", zh: "设计、建造与创新", es: "Diseño, construcción e innovación" },
    query: { en: "engineering explained", ko: "공학 강의", ja: "工学 講義", zh: "工程 讲解", es: "ingeniería explicada" },
  },
  {
    id: "medicine",
    icon: "🩺",
    label: { en: "Medicine", ko: "의학", ja: "医学", zh: "医学", es: "Medicina" },
    desc: { en: "Health, anatomy & medical science", ko: "건강, 해부학, 의학", ja: "健康、解剖学、医学", zh: "健康、解剖与医学", es: "Salud, anatomía y ciencia médica" },
    query: { en: "medical education", ko: "의학 강의", ja: "医学 講義", zh: "医学 教育", es: "medicina educación" },
  },
  {
    id: "psychology",
    icon: "🧠",
    label: { en: "Psychology", ko: "심리학", ja: "心理学", zh: "心理学", es: "Psicología" },
    desc: { en: "Mind, behavior & mental health", ko: "마음, 행동, 정신건강", ja: "心、行動、メンタルヘルス", zh: "心理、行为与心理健康", es: "Mente, comportamiento y salud mental" },
    query: { en: "psychology lectures", ko: "심리학 강의", ja: "心理学 講義", zh: "心理学 讲座", es: "psicología clases" },
  },
  {
    id: "geopolitics",
    icon: "🌍",
    label: { en: "Geopolitics", ko: "국제정치", ja: "地政学", zh: "地缘政治", es: "Geopolítica" },
    desc: { en: "World affairs & global strategy", ko: "세계 정세와 국제 전략", ja: "国際情勢と戦略", zh: "世界局势与全球战略", es: "Asuntos mundiales y estrategia global" },
    query: { en: "geopolitics analysis", ko: "국제정치 분석", ja: "地政学 分析", zh: "地缘政治 分析", es: "geopolítica análisis" },
  },
  {
    id: "music",
    icon: "🎵",
    label: { en: "Music Theory", ko: "음악이론", ja: "音楽理論", zh: "乐理", es: "Teoría Musical" },
    desc: { en: "Harmony, rhythm & composition", ko: "화성학, 리듬, 작곡", ja: "和声、リズム、作曲", zh: "和声、节奏与作曲", es: "Armonía, ritmo y composición" },
    query: { en: "music theory lessons", ko: "음악이론 강의", ja: "音楽理論 レッスン", zh: "乐理 教程", es: "teoría musical clases" },
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
