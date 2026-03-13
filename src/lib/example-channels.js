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
    query: { en: "artificial intelligence", ko: "인공지능 강의", ja: "人工知能 講義", zh: "人工智能 教程", es: "inteligencia artificial" },
  },
  {
    id: "math",
    icon: "📐",
    label: { en: "Math", ko: "수학", ja: "数学", zh: "数学", es: "Matemáticas" },
    query: { en: "mathematics education", ko: "수학 강의", ja: "数学 授業", zh: "数学 教育", es: "matemáticas educación" },
  },
  {
    id: "science",
    icon: "🔬",
    label: { en: "Science", ko: "과학", ja: "科学", zh: "科学", es: "Ciencia" },
    query: { en: "science education", ko: "과학 강의", ja: "科学 教育", zh: "科学 教育", es: "ciencia educación" },
  },
  {
    id: "history",
    icon: "📜",
    label: { en: "History", ko: "역사", ja: "歴史", zh: "历史", es: "Historia" },
    query: { en: "history documentary", ko: "역사 다큐멘터리", ja: "歴史 ドキュメンタリー", zh: "历史 纪录片", es: "historia documental" },
  },
  {
    id: "programming",
    icon: "💻",
    label: { en: "Programming", ko: "프로그래밍", ja: "プログラミング", zh: "编程", es: "Programación" },
    query: { en: "programming tutorial", ko: "프로그래밍 강의", ja: "プログラミング 講座", zh: "编程 教程", es: "programación tutorial" },
  },
];

export function getSubjects(lang) {
  return subjects.map(s => ({
    id: s.id,
    icon: s.icon,
    label: s.label[lang] || s.label.en,
    query: s.query[lang] || s.query.en,
  }));
}
