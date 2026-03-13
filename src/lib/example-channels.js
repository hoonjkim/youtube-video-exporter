const en = [
  { handle: "@3blue1brown", name: "3Blue1Brown", desc: "Visual math explanations", tag: "Math" },
  { handle: "@veritasium", name: "Veritasium", desc: "Science and engineering videos", tag: "Science" },
  { handle: "@khanacademy", name: "Khan Academy", desc: "Free courses for everyone", tag: "Education" },
  { handle: "@mitocw", name: "MIT OpenCourseWare", desc: "MIT university lectures", tag: "Lectures" },
  { handle: "@crashcourse", name: "CrashCourse", desc: "Fast-paced learning series", tag: "Education" },
  { handle: "@numberphile", name: "Numberphile", desc: "Entertaining number theory", tag: "Math" },
  { handle: "@TEDEd", name: "TED-Ed", desc: "Short animated lessons", tag: "Education" },
  { handle: "@kurzgesagt", name: "Kurzgesagt", desc: "Science & philosophy animations", tag: "Science" },
  { handle: "@CaspianReport", name: "CaspianReport", desc: "Geopolitics analysis", tag: "Geopolitics" },
  { handle: "@minutephysics", name: "MinutePhysics", desc: "Physics explained quickly", tag: "Physics" },
];

const ko = [
  { handle: "@kuaboratory", name: "안될과학", desc: "흥미로운 과학 실험과 해설", tag: "과학" },
  { handle: "@science_cookie", name: "과학쿠키", desc: "과학을 쉽고 재미있게", tag: "과학" },
  { handle: "@1minutescience", name: "1분과학", desc: "짧고 간결한 과학 영상", tag: "과학" },
  { handle: "@sfreedoctor", name: "셜록현준", desc: "경제와 시사 분석", tag: "경제" },
  { handle: "@leegwahyung", name: "이과형", desc: "재밌는 과학 이야기", tag: "과학" },
  { handle: "@sebasi15", name: "세바시", desc: "세상을 바꾸는 시간 15분", tag: "강연" },
  { handle: "@mikikim8972", name: "김미경TV", desc: "자기계발과 동기부여", tag: "교육" },
  { handle: "@3blue1brown", name: "3Blue1Brown", desc: "수학을 시각적으로 설명", tag: "수학" },
  { handle: "@kurzgesagt", name: "Kurzgesagt", desc: "과학 애니메이션", tag: "과학" },
  { handle: "@TEDEd", name: "TED-Ed", desc: "짧은 애니메이션 강의", tag: "교육" },
];

const ja = [
  { handle: "@yobinori", name: "ヨビノリ", desc: "大学レベルの数学・物理を分かりやすく", tag: "数学" },
  { handle: "@nakata_university", name: "中田敦彦YouTube大学", desc: "あらゆる学問をエンタメで", tag: "教育" },
  { handle: "@3blue1brown", name: "3Blue1Brown", desc: "数学を視覚的に解説", tag: "数学" },
  { handle: "@TEDEd", name: "TED-Ed", desc: "短いアニメーション授業", tag: "教育" },
  { handle: "@kurzgesagt", name: "Kurzgesagt", desc: "科学アニメーション", tag: "科学" },
  { handle: "@veritasium", name: "Veritasium", desc: "科学と工学の動画", tag: "科学" },
  { handle: "@khanacademy", name: "Khan Academy", desc: "無料の学習コース", tag: "教育" },
  { handle: "@numberphile", name: "Numberphile", desc: "数字の面白い世界", tag: "数学" },
  { handle: "@crashcourse", name: "CrashCourse", desc: "テンポの速い学習シリーズ", tag: "教育" },
  { handle: "@minutephysics", name: "MinutePhysics", desc: "物理を手短に解説", tag: "物理" },
];

const zh = [
  { handle: "@liyongle", name: "李永乐老师", desc: "用通俗语言讲数学和科学", tag: "数学" },
  { handle: "@3blue1brown", name: "3Blue1Brown", desc: "数学可视化讲解", tag: "数学" },
  { handle: "@kurzgesagt", name: "Kurzgesagt", desc: "科学与哲学动画", tag: "科学" },
  { handle: "@veritasium", name: "Veritasium", desc: "科学与工程视频", tag: "科学" },
  { handle: "@TEDEd", name: "TED-Ed", desc: "简短动画课程", tag: "教育" },
  { handle: "@khanacademy", name: "Khan Academy", desc: "免费在线课程", tag: "教育" },
  { handle: "@crashcourse", name: "CrashCourse", desc: "快节奏学习系列", tag: "教育" },
  { handle: "@CaspianReport", name: "CaspianReport", desc: "地缘政治分析", tag: "政治" },
  { handle: "@numberphile", name: "Numberphile", desc: "有趣的数字理论", tag: "数学" },
  { handle: "@minutephysics", name: "MinutePhysics", desc: "一分钟物理", tag: "物理" },
];

const es = [
  { handle: "@QuantumFracture", name: "QuantumFracture", desc: "Física explicada con animaciones", tag: "Física" },
  { handle: "@Derivando", name: "Derivando", desc: "Matemáticas entretenidas", tag: "Matemáticas" },
  { handle: "@CdeCiencia", name: "CdeCiencia", desc: "Ciencia y descubrimientos", tag: "Ciencia" },
  { handle: "@3blue1brown", name: "3Blue1Brown", desc: "Visualizaciones matemáticas", tag: "Matemáticas" },
  { handle: "@veritasium", name: "Veritasium", desc: "Videos de ciencia e ingeniería", tag: "Ciencia" },
  { handle: "@TEDEd", name: "TED-Ed", desc: "Lecciones animadas cortas", tag: "Educación" },
  { handle: "@kurzgesagt", name: "Kurzgesagt", desc: "Animaciones de ciencia", tag: "Ciencia" },
  { handle: "@khanacademy", name: "Khan Academy", desc: "Cursos gratuitos para todos", tag: "Educación" },
  { handle: "@crashcourse", name: "CrashCourse", desc: "Series de aprendizaje rápido", tag: "Educación" },
  { handle: "@CaspianReport", name: "CaspianReport", desc: "Análisis geopolítico", tag: "Geopolítica" },
];

export function getExampleChannels(lang) {
  const map = { en, ko, ja, zh, es };
  return map[lang] || en;
}
