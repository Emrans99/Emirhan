export type Locale = 'tr' | 'en'

export type LocalizedText = Record<Locale, string>

export type NavItem = {
  label: LocalizedText
  href: string
}

export type SocialLink = {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'instagram' | 'mail'
}

export type HeroStat = {
  value: number
  suffix: LocalizedText
  label: LocalizedText
  detail: LocalizedText
}

export type StoryCard = {
  title: LocalizedText
  description: LocalizedText
}

export type SkillGroup = {
  title: LocalizedText
  description: LocalizedText
  items: string[]
}

export type ExperienceItem = {
  company: string
  role: LocalizedText
  period: LocalizedText
  location: LocalizedText
  summary: LocalizedText
  points: LocalizedText[]
}

export type Project = {
  id: string
  category: LocalizedText
  title: string
  summary: LocalizedText
  highlights: LocalizedText[]
  stack: string[]
  repo: string
  accent: [string, string]
}

export type QuickFact = {
  label: LocalizedText
  value: LocalizedText
}

export const l = (tr: string, en: string): LocalizedText => ({ tr, en })

export const navItems: NavItem[] = [
  { label: l('Kimlik', 'Identity'), href: '#story' },
  { label: l('Deneyim', 'Experience'), href: '#experience' },
  { label: l('Projeler', 'Projects'), href: '#projects' },
  { label: l('Playground', 'Playground'), href: '#playground' },
  { label: l('İletişim', 'Contact'), href: '#contact' },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Emrans99', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/emirhan-g%C3%BCrb%C3%BCz/',
    icon: 'linkedin',
  },
  { label: 'Instagram', href: 'https://www.instagram.com/emirhan__grbz', icon: 'instagram' },
  { label: 'Mail', href: 'mailto:emirhangurbuz0606@gmail.com', icon: 'mail' },
]

export const profile = {
  name: 'Emirhan Gürbüz',
  role: l('Python Developer & App Builder', 'Python Developer & App Builder'),
  location: l('Ankara, Türkiye', 'Ankara, Turkiye'),
  educationShort: l('Bilgisayar Programcılığı öğrencisi', 'Computer Programming student'),
}

export const heroLines = [
  l('Sadece izlenen değil,', "Not just viewed,"),
  l('etkileşim kurulan', 'but interacted with,'),
  l('yazılım deneyimleri üretiyorum.', 'software experiences.'),
]

export const heroIntro = l(
  "Ankara'da bilgisayar programcılığı okuyorum. Eylül 2025'ten beri MechSoft Türkiye'de staj yapıyor; Python projelerinde, CloudOffix ve M-Files tarafında app builder akışları, küçük ürün modülleri ve demolar geliştiriyorum.",
  "I study Computer Programming in Ankara. Since September 2025, I have been interning at MechSoft Turkiye, working on Python projects while building app-builder flows, product modules, and demos across CloudOffix and M-Files.",
)

export const heroEyebrow = l(
  'Ankara / MechSoft Türkiye / Python + CloudOffix + M-Files',
  'Ankara / MechSoft Turkiye / Python + CloudOffix + M-Files',
)

export const heroSignals = [
  'Python',
  'CloudOffix',
  'M-Files',
  'Algorithms',
  'Prompt Engineering',
  'UI Thinking',
]

export const heroStats: HeroStat[] = [
  {
    value: 2025,
    suffix: l('+', '+'),
    label: l('MechSoft Başlangıcı', 'MechSoft Start'),
    detail: l(
      "Eylül 2025'ten beri MechSoft Türkiye Ankara ofisinde aktif staj deneyimi.",
      'Active internship experience at MechSoft Turkiye Ankara office since September 2025.',
    ),
  },
  {
    value: 6,
    suffix: l(' araç', ' tools'),
    label: l('Quick Proje Serisi', 'Quick Tool Series'),
    detail: l(
      'GitHub tarafında öne çıkan hızlı geliştirici araçları ve üretkenlik projeleri.',
      'A focused set of fast developer tools and productivity projects published on GitHub.',
    ),
  },
  {
    value: 12,
    suffix: l(' yıl', ' years'),
    label: l('Lisanslı Satranç', 'Licensed Chess'),
    detail: l(
      'Disiplin, strateji ve problem çözme refleksimi güçlendiren uzun süreli spor geçmişi.',
      'A long-term sports background that sharpened discipline, strategy, and problem solving.',
    ),
  },
  {
    value: 2,
    suffix: l(' dil', ' languages'),
    label: l('TR / EN Akış', 'TR / EN Flow'),
    detail: l(
      'Site varsayılan olarak Türkçe başlar ve anında İngilizceye geçebilir.',
      'The site starts in Turkish by default and can switch to English instantly.',
    ),
  },
]

export const ribbonWords = [
  l('Python geliştirici', 'Python developer'),
  l('App builder akışları', 'App builder flows'),
  l('CloudOffix modülleri', 'CloudOffix modules'),
  l('M-Files çözümleri', 'M-Files solutions'),
  l('Deneysel arayüzler', 'Experimental interfaces'),
  l('Hızlı ürün prototipleri', 'Fast product prototypes'),
]

export const storyCards: StoryCard[] = [
  {
    title: l('Yazılıma erken başlayan merak', 'Curiosity that started early'),
    description: l(
      'Yazılıma ilgim ortaokuldan bu yana devam ediyor. Algoritma mantığını kavrama, problem çözme ve öğrenmeye açık kalma tarafı benim için sadece ders değil, uzun vadeli bir çalışma biçimi.',
      'My interest in software has been active since middle school. Understanding algorithmic thinking, solving problems, and staying open to learning have become a long-term working style rather than a short-term goal.',
    ),
  },
  {
    title: l('Bugün odaklandığım alan', 'What I focus on today'),
    description: l(
      "Şu anda iki eksende ilerliyorum: bir yanda Python ile proje içi geliştirme ve üretkenlik araçları, diğer yanda CloudOffix ve M-Files tarafında app builder mantığıyla iş akışları ve demolar üretmek.",
      'Today I am moving across two tracks: Python for project work and developer tooling on one side, and workflow building plus demos with a CloudOffix and M-Files app-builder mindset on the other.',
    ),
  },
  {
    title: l('Neden daha oyunumsu bir site?', 'Why a more playful site?'),
    description: l(
      'Çünkü benim için iyi bir portföy sadece bilgi göstermez. Karakter gösterir. Resmiyeti tamamen bozmadan, ziyaretçinin küçük keşifler yapabildiği daha canlı bir deneyim kurmak istiyorum.',
      'Because a strong portfolio should not only present information. It should also show character. Without losing professionalism, I want the visitor to discover small interactive moments that make the experience feel alive.',
    ),
  },
]

export const quickFacts: QuickFact[] = [
  { label: l('Eğitim', 'Education'), value: l('Ostim Teknik Üniversitesi', 'Ostim Technical University') },
  { label: l('Bölüm', 'Department'), value: l('Bilgisayar Programcılığı', 'Computer Programming') },
  { label: l('İngilizce', 'English'), value: l('B1 - B2', 'B1 - B2') },
  { label: l('Çalışma tarzı', 'Working style'), value: l('Disiplinli / hızlı / detaycı', 'Disciplined / fast / detail-focused') },
]

export const skillGroups: SkillGroup[] = [
  {
    title: l('Python ve geliştirme mantığı', 'Python and software logic'),
    description: l(
      'Projelerde Python kullanımı, algoritma odaklı düşünme ve küçük ama işe yarayan araçlar üretme tarafı benim temel eksenim.',
      'Using Python in projects, thinking algorithmically, and building small but useful tools form one of my main axes.',
    ),
    items: ['Python', 'Algorithms', 'Problem Solving', 'Prompt Engineering'],
  },
  {
    title: l('CloudOffix / M-Files akışları', 'CloudOffix / M-Files flows'),
    description: l(
      'Staj tarafında app builder mantığıyla modüller, örnek akışlar ve demolar geliştiriyor; iş süreçlerini daha net anlatan deneyimler üretmeye odaklanıyorum.',
      'On the internship side, I build modules, sample flows, and demos with an app-builder mindset to make business processes easier to understand.',
    ),
    items: ['CloudOffix', 'M-Files', 'App Builder', 'Demo Flows'],
  },
  {
    title: l('Web ve arayüz tarafı', 'Web and interface work'),
    description: l(
      'HTML, CSS ve modern front-end yaklaşımıyla daha dikkat çekici ama kontrollü arayüzler geliştirmeyi seviyorum.',
      'With HTML, CSS, and a modern front-end mindset, I enjoy building interfaces that feel striking while still staying controlled.',
    ),
    items: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
  },
  {
    title: l('Destekleyen teknik zemin', 'Supporting technical base'),
    description: l(
      'SQL, yazılım mantığı, hızlı prototipleme ve satrançtan gelen stratejik düşünme biçimi işleri daha sağlam kurmama yardımcı oluyor.',
      'SQL, software fundamentals, rapid prototyping, and a strategic mindset shaped by chess help me build with more structure.',
    ),
    items: ['SQL', 'Java', 'Rapid Prototyping', 'Strategic Thinking'],
  },
]

export const experienceItems: ExperienceItem[] = [
  {
    company: 'MechSoft Türkiye',
    role: l('Stajyer Developer', 'Intern Developer'),
    period: l('Eylül 2025 - Devam ediyor', 'September 2025 - Present'),
    location: l('Ankara Ofisi', 'Ankara Office'),
    summary: l(
      'Gerçek proje akışlarında teknik destek, demo geliştirme ve low-code / app-builder mantığıyla ürün akışları üretme deneyimi.',
      'Hands-on experience contributing to project work, building demos, and shaping product flows with a low-code / app-builder mindset.',
    ),
    points: [
      l('Python developer olarak staj projelerinde görev alıyorum.', 'I contribute to internship projects as a Python developer.'),
      l(
        'CloudOffix ve M-Files tarafında app builder bölümlerinde akışlar ve küçük modüller geliştiriyorum.',
        'I build flows and small modules inside CloudOffix and M-Files app-builder environments.',
      ),
      l(
        'Ürün ve süreçleri anlatmak için demolar, örnek ekranlar ve açıklayıcı prototipler hazırlıyorum.',
        'I prepare demos, sample screens, and explanatory prototypes to communicate products and processes better.',
      ),
    ],
  },
  {
    company: 'Ostim Teknik Üniversitesi',
    role: l('Bilgisayar Programcılığı', 'Computer Programming'),
    period: l('2024 - Devam ediyor', '2024 - Present'),
    location: l('Ankara', 'Ankara'),
    summary: l(
      'Yazılım mantığı, algoritma temeli ve uygulamalı geliştirme tarafını güçlendiren akademik yolculuk.',
      'An academic path that reinforces software logic, algorithmic foundations, and practical development.',
    ),
    points: [
      l('Yazılım dilleri ve algoritma mantığını sürekli pratikle güçlendiriyorum.', 'I keep strengthening programming and algorithmic thinking through practice.'),
      l('Teknik merakı gerçek projelere taşımak için okul dışı üretim de yapıyorum.', 'I also build outside school to turn technical curiosity into real projects.'),
      l('Amaç: sistem geliştirme ve yapay zeka odaklı alanlarda daha ileri seviye üretim yapmak.', 'Goal: move toward more advanced work in system building and AI-oriented fields.'),
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'quickvault',
    category: l('Güvenlik Aracı', 'Security Tool'),
    title: 'quickvault',
    summary: l(
      'AES-256 algoritmasıyla tamamen tarayıcı tarafında şifreleme yapan, gizlilik odaklı güvenli not defteri ve şifre kasası.',
      'A privacy-first secure notebook and password vault that performs AES-256 encryption fully on the client side.',
    ),
    highlights: [
      l('Tarayıcı tarafında AES-256 yaklaşımı', 'Client-side AES-256 approach'),
      l('Gizlilik odaklı not ve parola akışı', 'Privacy-focused notes and password flow'),
      l('Tek arayüzde güvenlik hissi', 'A security-focused single interface'),
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Security UX'],
    repo: 'https://github.com/Emrans99/quickvault',
    accent: ['#8af1ff', '#1a7fff'],
  },
  {
    id: 'quickmock',
    category: l('Python Aracı', 'Python Tool'),
    title: 'quickmock',
    summary: l(
      'Python geliştiricileri için dinamik ve hızlı mock veri üretici.',
      'A fast and dynamic mock data generator built for Python developers.',
    ),
    highlights: [
      l('Python geliştiricilerine yönelik kullanım', 'Built for Python developer workflows'),
      l('Hızlı mock veri üretimi', 'Fast mock data generation'),
      l('Prototipleme ve test akışına uygun yapı', 'Suitable for prototyping and testing flows'),
    ],
    stack: ['Python', 'Data Mocking', 'Developer Experience'],
    repo: 'https://github.com/Emrans99/quickmock',
    accent: ['#d8ff70', '#2a6d17'],
  },
  {
    id: 'quickreadme',
    category: l('GitHub Yardımcısı', 'GitHub Helper'),
    title: 'quickreadme',
    summary: l(
      'Geliştiriciler için sürükle-bırak destekli, otomatik badge entegreli profesyonel GitHub README oluşturucusu.',
      'A drag-and-drop GitHub README builder for developers with automatic badge integration.',
    ),
    highlights: [
      l('Sürükle-bırak kullanım', 'Drag-and-drop workflow'),
      l('Otomatik badge entegrasyonu', 'Automatic badge integration'),
      l('Daha profesyonel repo sunumu', 'Cleaner and more professional repo presentation'),
    ],
    stack: ['README UX', 'Automation', 'Frontend'],
    repo: 'https://github.com/Emrans99/quickreadme',
    accent: ['#ff9ab3', '#7f2555'],
  },
  {
    id: 'quickjson',
    category: l('Veri Aracı', 'Data Tool'),
    title: 'quickjson',
    summary: l(
      'Veri işleme süreçlerini hızlandıran, akıllı hata yakalama ve satır sayacı özellikli profesyonel JSON formatlayıcı ve doğrulayıcı.',
      'A professional JSON formatter and validator with smart error capture and line counting for faster data workflows.',
    ),
    highlights: [
      l('JSON biçimlendirme ve doğrulama', 'JSON formatting and validation'),
      l('Akıllı hata yakalama', 'Smart error capture'),
      l('Satır sayacı ve okunabilir çıktı', 'Line counting and readable output'),
    ],
    stack: ['JSON', 'Validation', 'Developer Tooling'],
    repo: 'https://github.com/Emrans99/quickjson',
    accent: ['#ffb85c', '#ff5d36'],
  },
  {
    id: 'quickdev',
    category: l('Araç Seti', 'Utility Suite'),
    title: 'quickdev',
    summary: l(
      'Base64, URL Encode, SHA-256 ve Unix Timestamp araçlarını tek arayüzde toplayan hızlı ve hafif araç seti.',
      'A fast, lightweight toolbox that combines Base64, URL Encode, SHA-256, and Unix Timestamp utilities in one interface.',
    ),
    highlights: [
      l('Tek arayüzde çoklu geliştirici aracı', 'Multiple developer utilities in one surface'),
      l('Hızlı ve hafif kullanım', 'Fast and lightweight usage'),
      l('Günlük geliştirme akışına yakın tasarım', 'Designed around everyday development tasks'),
    ],
    stack: ['Utilities', 'Frontend', 'Developer Workflow'],
    repo: 'https://github.com/Emrans99/quickdev',
    accent: ['#9fffc0', '#0e7b5f'],
  },
  {
    id: 'quickpost',
    category: l('İçerik Aracı', 'Content Tool'),
    title: 'quickpost',
    summary: l(
      'Kodlarınızı sosyal medyada paylaşmak için şık, esnek ve yüksek kaliteli görseller üreten profesyonel araç.',
      'A professional tool that creates stylish, flexible, high-quality visuals for sharing code on social media.',
    ),
    highlights: [
      l('Kod paylaşımı için görsel üretim', 'Visual generation for code sharing'),
      l('Esnek ve şık çıktı yapısı', 'Flexible and stylish output'),
      l('Sosyal medya odaklı sunum', 'Presentation designed for social channels'),
    ],
    stack: ['Content Design', 'Tooling', 'Frontend'],
    repo: 'https://github.com/Emrans99/quickpost',
    accent: ['#f2d880', '#b65d1d'],
  },
]

export const contactCopy = {
  title: l(
    'Bir portföyden fazlasını; akılda kalan bir dijital deneyim kuruyorum.',
    'I aim to build more than a portfolio; I build a digital experience that stays in mind.',
  ),
  description: l(
    'Eğer birlikte ürün, demo, arayüz veya dikkat çeken bir deneyim tasarlamak istersen bana mail at. En temiz başlangıç noktası orası.',
    'If you want to build a product, demo, interface, or a striking digital experience together, send me an email. That is the cleanest place to start.',
  ),
  cta: l('Mail ile ulaş', 'Reach out by email'),
  subCta: l('GitHub profilini aç', 'Open GitHub profile'),
}

export const uiCopy = {
  languageLabel: l('Dil', 'Language'),
  contactButton: l('İletişime geç', 'Get in touch'),
  scrollLabel: l('Kaydır', 'Scroll'),
  heroPrimary: l('Projeleri keşfet', 'Explore projects'),
  heroSecondary: l('Playground alanına git', 'Jump to playground'),
  sectionStoryEyebrow: l('Kimlik', 'Identity'),
  sectionStoryTitle: l('Teknik altyapıyı kişilik ve etkileşimle birleştiren bir portföy sistemi.', 'A portfolio system that blends technical depth with personality and interaction.'),
  sectionStoryDescription: l(
    'Emirhan Gürbüz kimdir, nasıl çalışır ve neden daha sıra dışı arayüzlerden hoşlanır sorusuna cevap vermek için tasarlandı.',
    'Who Emirhan Gurbuz is, how he works, and why he is drawn to more unconventional interfaces.',
  ),
  sectionExperienceEyebrow: l('Deneyim', 'Experience'),
  sectionExperienceTitle: l('Gerçek iş akışı, staj deneyimi ve teknik yön burada somutlaşıyor.', 'This is where real workflow, internship experience, and technical direction become concrete.'),
  sectionExperienceDescription: l(
    'MechSoft deneyimi, eğitim zemini ve çalışma disiplinini birlikte gösteren bölüm.',
    'A section that combines MechSoft experience, academic foundation, and working discipline.',
  ),
  sectionProjectsEyebrow: l('Projeler', 'Projects'),
  sectionProjectsTitle: l('GitHub tarafındaki üretimlerini yatay bir sahnede gez.', 'Explore the GitHub work in a horizontal stage.'),
  sectionProjectsDescription: l(
    'Bu bölüm dikey akışı bozuyor. Kaydırdıkça seçili projeler sahne değiştirir gibi akıyor; sen de araçların arkasındaki düşünceyi görüyorsun.',
    'This section breaks the normal vertical flow. As you scroll, selected projects move like scene changes, letting the underlying thinking come forward.',
  ),
  sectionPlaygroundEyebrow: l('Playground', 'Playground'),
  sectionPlaygroundTitle: l('Kaydırma ve tıklamanın ötesinde küçük etkileşimler.', 'Small interactions beyond just scrolling and clicking.'),
  sectionPlaygroundDescription: l(
    'Komut terminali, mini grid görevi ve piksel dokuları.',
    'Command terminal, a mini grid task, and pixel textures.',
  ),
  sectionContactEyebrow: l('İletişim', 'Contact'),
  pixelEyebrow: l('Pixel Layer', 'Pixel Layer'),
  pixelTitle: l('Dijital kimliğin oyunumsu ama kontrollü yüzü.', 'The playful but controlled side of the digital identity.'),
  pixelText: l(
    'Bu piksel kartı kaslı görseller yerine sade bir işaret kullanıyor: teknik merak, oyun hissi ve düzen aynı karede buluşuyor.',
    'This pixel card uses a restrained symbol instead of a heavy graphic: technical curiosity, playful energy, and structure meet in the same frame.',
  ),
  consoleEyebrow: l('Signal Console', 'Signal Console'),
  consoleTitle: l('Komut yazarak hızlı profil bilgilerini çek.', 'Pull quick profile details by typing commands.'),
  consoleText: l(
    'Desteklenen komutlar: help, me, mechsoft, stack, projects, mail, clear',
    'Supported commands: help, me, mechsoft, stack, projects, mail, clear',
  ),
  arcadeEyebrow: l('Mini Görev', 'Mini Task'),
  arcadeTitle: l('Signal Run: modülleri topla.', 'Signal Run: collect the modules.'),
  arcadeText: l(
    'WASD veya ok tuşlarıyla ilerle. PY, MF, CO ve UI modüllerini toplayınca küçük bir easter egg açılır.',
    'Move with WASD or the arrow keys. Collect PY, MF, CO, and UI modules to unlock a small easter egg.',
  ),
  arcadeReset: l('Sıfırla', 'Reset'),
  arcadeComplete: l(
    'Easter egg açıldı: Emirhan, teknik tarafı ciddiye alırken deneyimi canlı tutmayı seven bir geliştirici.',
    'Easter egg unlocked: Emirhan is a developer who takes the technical side seriously while keeping the experience alive.',
  ),
  inspectorLabel: l('Seçili proje', 'Selected project'),
  projectButton: l('GitHub deposunu aç', 'Open GitHub repository'),
  inspectorHint: l('Kartların üzerine gelerek seçimi değiştir.', 'Hover the cards to change the selection.'),
}

export const terminalResponses = {
  help: l(
    'Komutlar: help, me, mechsoft, stack, projects, mail, clear',
    'Commands: help, me, mechsoft, stack, projects, mail, clear',
  ),
  me: l(
    'Emirhan Gürbüz / Python Developer & App Builder / Ankara / Bilgisayar Programcılığı öğrencisi',
    'Emirhan Gurbuz / Python Developer & App Builder / Ankara / Computer Programming student',
  ),
  mechsoft: l(
    'MechSoft Türkiye: Python projelerinde görev alıyorum. CloudOffix ve M-Files tarafında app builder akışları, küçük modüller ve demolar geliştiriyorum.',
    'MechSoft Turkiye: I work on Python projects while building app-builder flows, small modules, and demos for CloudOffix and M-Files.',
  ),
  stack: l(
    'Çekirdek eksen: Python / CloudOffix / M-Files / HTML / CSS / SQL / Java / Prompt Engineering',
    'Core axis: Python / CloudOffix / M-Files / HTML / CSS / SQL / Java / Prompt Engineering',
  ),
  projects: l(
    'Öne çıkanlar: quickvault, quickmock, quickreadme, quickjson, quickdev, quickpost',
    'Highlights: quickvault, quickmock, quickreadme, quickjson, quickdev, quickpost',
  ),
  mail: l(
    'İletişim: emirhangurbuz0606@gmail.com',
    'Contact: emirhangurbuz0606@gmail.com',
  ),
  unknown: l(
    'Komut tanınmadı. help yazarak desteklenen komutları görebilirsin.',
    'Unknown command. Type help to see the supported commands.',
  ),
  boot: l(
    'Signal console hazır. help yazarak başlayabilirsin.',
    'Signal console is ready. Type help to get started.',
  ),
}

export const pixelPattern = [
  '0000011111000000',
  '0001111111110000',
  '0011111001111000',
  '0111100000111100',
  '1111001110011110',
  '1110011111001110',
  '1110011111001110',
  '1111001110011110',
  '0111100000111100',
  '0011111001111000',
  '0001111111110000',
  '0000011111000000',
]
