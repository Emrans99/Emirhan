import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Briefcase,
  ExternalLink,
  FolderGit2,
  Gauge,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Orbit,
  Sparkles,
  TerminalSquare,
  Workflow,
} from 'lucide-react'
import './App.css'
import { AtmosphereCanvas } from './components/AtmosphereCanvas'
import { PixelBadge } from './components/PixelBadge'
import { PlaygroundConsole } from './components/PlaygroundConsole'
import { SignalRun } from './components/SignalRun'
import {
  contactCopy,
  experienceItems,
  heroEyebrow,
  heroIntro,
  heroLines,
  heroSignals,
  heroStats,
  l,
  navItems,
  profile,
  projects,
  quickFacts,
  ribbonWords,
  skillGroups,
  socialLinks,
  storyCards,
  type ExperienceItem,
  type HeroStat,
  type Locale,
  type LocalizedText,
  type Project,
  type SkillGroup,
  type SocialLink,
  type StoryCard,
  uiCopy,
} from './data/siteData'
import { usePortfolioMotion } from './hooks/usePortfolioMotion'
import { useScrollProgress } from './hooks/useScrollProgress'

const socialIconMap: Record<SocialLink['icon'], ReactNode> = {
  github: <FolderGit2 size={16} />,
  linkedin: <Briefcase size={16} />,
  instagram: <Sparkles size={16} />,
  mail: <Mail size={16} />,
}

const storyIconMap = [<Sparkles size={18} />, <Workflow size={18} />, <TerminalSquare size={18} />]
const skillIconMap = [<Blocks size={18} />, <Orbit size={18} />, <Gauge size={18} />, <Sparkles size={18} />]

function pick(locale: Locale, value: LocalizedText) {
  return value[locale]
}

function SectionHeading({
  locale,
  eyebrow,
  title,
  description,
}: {
  locale: Locale
  eyebrow: LocalizedText
  title: LocalizedText
  description: LocalizedText
}) {
  return (
    <div className="section-heading reveal">
      <div>
        <span className="eyebrow">{pick(locale, eyebrow)}</span>
        <h2>{pick(locale, title)}</h2>
      </div>
      <p>{pick(locale, description)}</p>
    </div>
  )
}

function MetricCard({ locale, stat }: { locale: Locale; stat: HeroStat }) {
  return (
    <article className="metric-card tilt-card">
      <span className="metric-card__label">{pick(locale, stat.label)}</span>
      <strong
        className="metric-card__value"
        data-counter={stat.value}
        data-suffix={pick(locale, stat.suffix)}
      >
        0{pick(locale, stat.suffix)}
      </strong>
      <p>{pick(locale, stat.detail)}</p>
    </article>
  )
}

function StoryPanel({
  locale,
  item,
  icon,
}: {
  locale: Locale
  item: StoryCard
  icon: ReactNode
}) {
  return (
    <article className="story-card tilt-card reveal">
      <div className="story-card__icon">{icon}</div>
      <h3>{pick(locale, item.title)}</h3>
      <p>{pick(locale, item.description)}</p>
    </article>
  )
}

function SkillPanel({
  locale,
  item,
  icon,
}: {
  locale: Locale
  item: SkillGroup
  icon: ReactNode
}) {
  return (
    <article className="skill-card tilt-card reveal">
      <div className="skill-card__icon">{icon}</div>
      <h3>{pick(locale, item.title)}</h3>
      <p>{pick(locale, item.description)}</p>
      <div className="chip-row">
        {item.items.map((entry) => (
          <span key={entry} className="chip chip--ghost">
            {entry}
          </span>
        ))}
      </div>
    </article>
  )
}

function ExperiencePanel({
  locale,
  item,
  icon,
}: {
  locale: Locale
  item: ExperienceItem
  icon: ReactNode
}) {
  return (
    <article className="experience-card tilt-card reveal">
      <div className="experience-card__header">
        <div className="experience-card__icon">{icon}</div>
        <div>
          <span className="experience-card__company">{item.company}</span>
          <h3>{pick(locale, item.role)}</h3>
        </div>
      </div>
      <div className="experience-card__meta">
        <span>{pick(locale, item.period)}</span>
        <span>{pick(locale, item.location)}</span>
      </div>
      <p>{pick(locale, item.summary)}</p>
      <ul className="experience-card__list">
        {item.points.map((point) => (
          <li key={pick(locale, point)}>{pick(locale, point)}</li>
        ))}
      </ul>
    </article>
  )
}

function ProjectCard({
  locale,
  project,
  isActive,
  onActivate,
}: {
  locale: Locale
  project: Project
  isActive: boolean
  onActivate: () => void
}) {
  const accentStyle = useMemo(
    () =>
      ({
        '--accent-a': project.accent[0],
        '--accent-b': project.accent[1],
      }) as CSSProperties,
    [project.accent],
  )

  return (
    <article
      className={`project-card tilt-card ${isActive ? 'is-active' : ''}`}
      style={accentStyle}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
    >
      <div className="project-card__glow" aria-hidden="true" />
      <div className="project-card__top">
        <span className="project-card__category">{pick(locale, project.category)}</span>
        <a href={project.repo} target="_blank" rel="noreferrer" className="project-card__link magnetic">
          GitHub
          <ArrowUpRight size={15} />
        </a>
      </div>
      <h3>{project.title}</h3>
      <p>{pick(locale, project.summary)}</p>
      <div className="chip-row">
        {project.stack.map((entry) => (
          <span key={entry} className="chip">
            {entry}
          </span>
        ))}
      </div>
    </article>
  )
}

function SocialPill({ link }: { link: SocialLink }) {
  return (
    <a href={link.href} target="_blank" rel="noreferrer" className="social-pill magnetic">
      {socialIconMap[link.icon]}
      <span>{link.label}</span>
    </a>
  )
}

function App() {
  const appRef = useRef<HTMLDivElement | null>(null)
  const progress = useScrollProgress()
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') {
      return 'tr'
    }

    return window.localStorage.getItem('emirhan-locale') === 'en' ? 'en' : 'tr'
  })
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? '')
  const deferredProjectId = useDeferredValue(activeProjectId)
  const [brandTaps, setBrandTaps] = useState(0)
  const [secretUnlocked, setSecretUnlocked] = useState(false)

  usePortfolioMotion(appRef, [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem('emirhan-locale', locale)
  }, [locale])

  const selectedProject = projects.find((item) => item.id === deferredProjectId) ?? projects[0]
  const ribbonTrack = useMemo(() => [...ribbonWords, ...ribbonWords], [])

  return (
    <div ref={appRef} className={`app-shell ${secretUnlocked ? 'is-secret' : ''}`}>
      <AtmosphereCanvas />
      <div className="ambient-layer ambient-layer--grid" aria-hidden="true" />
      <div className="ambient-layer ambient-layer--glow" aria-hidden="true" />

      <header className="dock">
        <a href="#hero" className="brand magnetic">
          <span
            className="brand__mark"
            onClick={() => {
              const next = brandTaps + 1
              setBrandTaps(next)

              if (next >= 5) {
                setSecretUnlocked(true)
              }
            }}
          >
            EG
          </span>
          <span className="brand__copy">
            <strong>{profile.name}</strong>
            <small>{pick(locale, profile.role)}</small>
          </span>
        </a>

        <nav className="dock__nav" aria-label={pick(locale, l('Bölüm gezintisi', 'Section navigation'))}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {pick(locale, item.label)}
            </a>
          ))}
        </nav>

        <div className="dock__actions">
          <div className="language-switch" aria-label={pick(locale, uiCopy.languageLabel)}>
            <Languages size={14} />
            <button
              type="button"
              className={locale === 'tr' ? 'is-active' : ''}
              onClick={() => {
                startTransition(() => setLocale('tr'))
              }}
            >
              TR
            </button>
            <button
              type="button"
              className={locale === 'en' ? 'is-active' : ''}
              onClick={() => {
                startTransition(() => setLocale('en'))
              }}
            >
              EN
            </button>
          </div>

          <a href="mailto:emirhangurbuz0606@gmail.com" className="dock__cta magnetic">
            {pick(locale, uiCopy.contactButton)}
            <ArrowRight size={15} />
          </a>
        </div>
      </header>

      <div className="progress-hud" aria-label={`${pick(locale, uiCopy.scrollLabel)} ${progress}%`}>
        <span>{pick(locale, uiCopy.scrollLabel)}</span>
        <strong>{progress}%</strong>
        <div className="progress-hud__bar">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>

      {secretUnlocked ? (
        <div className="secret-toast">
          <span>{pick(locale, l('Easter egg', 'Easter egg'))}</span>
          <strong>{pick(locale, l('12 yıllık lisanslı satranç modu açıldı.', '12-year licensed chess mode unlocked.'))}</strong>
        </div>
      ) : null}

      <main>
        <section id="hero" className="section hero">
          <div className="hero__copy">
            <span className="eyebrow hero-fade">{pick(locale, heroEyebrow)}</span>
            <h1 className="headline">
              {heroLines.map((line) => (
                <span key={pick(locale, line)} className="headline-line">
                  <span className="headline-word">{pick(locale, line)}</span>
                </span>
              ))}
            </h1>
            <p className="hero-description hero-fade">{pick(locale, heroIntro)}</p>

            <div className="hero-actions hero-fade">
              <a href="#projects" className="button button--primary magnetic">
                {pick(locale, uiCopy.heroPrimary)}
                <ArrowUpRight size={18} />
              </a>
              <a href="#playground" className="button button--secondary magnetic">
                {pick(locale, uiCopy.heroSecondary)}
              </a>
            </div>

            <div className="hero-signals hero-fade">
              {heroSignals.map((signal) => (
                <span key={signal} className="signal-chip">
                  {signal}
                </span>
              ))}
            </div>

            <div className="hero-metrics hero-fade">
              {heroStats.map((stat) => (
                <MetricCard key={pick(locale, stat.label)} locale={locale} stat={stat} />
              ))}
            </div>
          </div>

          <div className="hero__scene hero-fade">
            <div className="hero-scene">
              <div className="hero-rings">
                <span />
                <span />
                <span />
              </div>

              <div className="beam-cluster" aria-hidden="true">
                <span className="beam" />
                <span className="beam beam--secondary" />
                <span className="beam beam--tertiary" />
              </div>

              <div className="orbit-chip orbit-chip--top">Python</div>
              <div className="orbit-chip orbit-chip--left">CloudOffix</div>
              <div className="orbit-chip orbit-chip--right">M-Files</div>
              <div className="orbit-chip orbit-chip--bottom">Interactive UI</div>

              <article className="hero-card tilt-card">
                <span className="eyebrow">{pick(locale, l('Canlı sinyal', 'Live signal'))}</span>
                <h2>{profile.name}</h2>
                <p>{pick(locale, l('Teknik üretim ile deneysel arayüz duygusunu aynı sistemde buluşturan portföy.', 'A portfolio that merges technical production with an experimental interface sensibility.'))}</p>

                <div className="hero-card__meta">
                  <span>
                    <MapPin size={15} />
                    {pick(locale, profile.location)}
                  </span>
                  <span>
                    <Briefcase size={15} />
                    MechSoft Türkiye
                  </span>
                  <span>
                    <Languages size={15} />
                    TR / EN
                  </span>
                </div>

                <div className="social-row">
                  {socialLinks.map((link) => (
                    <SocialPill key={link.label} link={link} />
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="ribbon-lane hero-fade" aria-hidden="true">
            <div className="ribbon-track">
              {ribbonTrack.map((item, index) => (
                <span key={`${pick(locale, item)}-${index}`}>{pick(locale, item)}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="section">
          <SectionHeading
            locale={locale}
            eyebrow={uiCopy.sectionStoryEyebrow}
            title={uiCopy.sectionStoryTitle}
            description={uiCopy.sectionStoryDescription}
          />

          <div className="identity-grid">
            <article className="identity-panel tilt-card reveal">
              <span className="eyebrow">{pick(locale, l('Profil çekirdeği', 'Profile core'))}</span>
              <h3>{pick(locale, profile.role)}</h3>
              <p>{pick(locale, heroIntro)}</p>
              <div className="identity-facts">
                {quickFacts.map((item) => (
                  <div key={pick(locale, item.label)} className="identity-fact">
                    <span>{pick(locale, item.label)}</span>
                    <strong>{pick(locale, item.value)}</strong>
                  </div>
                ))}
              </div>
            </article>

            {storyCards.map((item, index) => (
              <StoryPanel
                key={pick(locale, item.title)}
                locale={locale}
                item={item}
                icon={storyIconMap[index % storyIconMap.length]}
              />
            ))}

            <article className="pixel-panel tilt-card reveal">
              <div className="pixel-panel__header">
                <span className="eyebrow">{pick(locale, uiCopy.pixelEyebrow)}</span>
                <h3>{pick(locale, uiCopy.pixelTitle)}</h3>
              </div>
              <PixelBadge />
              <p>{pick(locale, uiCopy.pixelText)}</p>
              <div className="chip-row">
                <span className="chip">Pixel Art</span>
                <span className="chip">Easter Egg</span>
                <span className="chip">Controlled Playfulness</span>
              </div>
            </article>
          </div>

          <div className="skill-grid">
            {skillGroups.map((item, index) => (
              <SkillPanel
                key={pick(locale, item.title)}
                locale={locale}
                item={item}
                icon={skillIconMap[index % skillIconMap.length]}
              />
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeading
            locale={locale}
            eyebrow={uiCopy.sectionExperienceEyebrow}
            title={uiCopy.sectionExperienceTitle}
            description={uiCopy.sectionExperienceDescription}
          />

          <div className="experience-grid">
            <ExperiencePanel locale={locale} item={experienceItems[0]} icon={<Briefcase size={18} />} />
            <ExperiencePanel locale={locale} item={experienceItems[1]} icon={<GraduationCap size={18} />} />

            <article className="experience-card experience-card--highlight tilt-card reveal">
              <div className="experience-card__header">
                <div className="experience-card__icon">
                  <Workflow size={18} />
                </div>
                <div>
                  <span className="experience-card__company">{pick(locale, l('Çalışma yaklaşımı', 'Working approach'))}</span>
                  <h3>{pick(locale, l('Hızlı ama dağılmayan üretim', 'Fast but structured production'))}</h3>
                </div>
              </div>
              <p>
                {pick(
                  locale,
                  l(
                    'Staj tarafında demolar, modüller ve akışlar geliştirirken; GitHub tarafında daha ürünleşmiş mini araçlar üretmeye devam ediyorum. Yani hem iş süreci hem kişisel üretim paralel ilerliyor.',
                    'While building demos, modules, and flows in the internship context, I also keep shipping more productized mini tools on GitHub. Work process and personal production move in parallel.',
                  ),
                )}
              </p>
              <div className="chip-row">
                <span className="chip">Python</span>
                <span className="chip">CloudOffix</span>
                <span className="chip">M-Files</span>
                <span className="chip">Product Demos</span>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="projects-panorama">
          <div className="section section--panorama">
            <SectionHeading
              locale={locale}
              eyebrow={uiCopy.sectionProjectsEyebrow}
              title={uiCopy.sectionProjectsTitle}
              description={uiCopy.sectionProjectsDescription}
            />

            <div className="projects-stage">
              <div className="projects-track">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    locale={locale}
                    project={project}
                    isActive={selectedProject.id === project.id}
                    onActivate={() => {
                      startTransition(() => setActiveProjectId(project.id))
                    }}
                  />
                ))}
              </div>
            </div>

            <article className="project-inspector tilt-card reveal">
              <div className="project-inspector__header">
                <span className="eyebrow">{pick(locale, uiCopy.inspectorLabel)}</span>
                <span className="project-inspector__hint">{pick(locale, uiCopy.inspectorHint)}</span>
              </div>
              <h3>{selectedProject.title}</h3>
              <p>{pick(locale, selectedProject.summary)}</p>
              <ul className="project-inspector__list">
                {selectedProject.highlights.map((entry) => (
                  <li key={pick(locale, entry)}>{pick(locale, entry)}</li>
                ))}
              </ul>
              <div className="chip-row">
                {selectedProject.stack.map((entry) => (
                  <span key={entry} className="chip chip--ghost">
                    {entry}
                  </span>
                ))}
              </div>
              <div className="project-inspector__actions">
                <a href={selectedProject.repo} target="_blank" rel="noreferrer" className="button button--primary magnetic">
                  {pick(locale, uiCopy.projectButton)}
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="playground" className="section">
          <SectionHeading
            locale={locale}
            eyebrow={uiCopy.sectionPlaygroundEyebrow}
            title={uiCopy.sectionPlaygroundTitle}
            description={uiCopy.sectionPlaygroundDescription}
          />

          <div className="playground-grid">
            <div className="playground-copy reveal">
              <article className="play-copy-card tilt-card">
                <span className="eyebrow">{pick(locale, uiCopy.consoleEyebrow)}</span>
                <h3>{pick(locale, uiCopy.consoleTitle)}</h3>
                <p>{pick(locale, uiCopy.consoleText)}</p>
              </article>
              <article className="play-copy-card tilt-card">
                <span className="eyebrow">{pick(locale, uiCopy.arcadeEyebrow)}</span>
                <h3>{pick(locale, uiCopy.arcadeTitle)}</h3>
                <p>{pick(locale, uiCopy.arcadeText)}</p>
              </article>
            </div>

            <PlaygroundConsole key={locale} locale={locale} />
            <SignalRun locale={locale} />
          </div>
        </section>

        <section id="contact" className="section">
          <div className="contact-card tilt-card reveal">
            <div className="contact-card__copy">
              <span className="eyebrow">{pick(locale, uiCopy.sectionContactEyebrow)}</span>
              <h2>{pick(locale, contactCopy.title)}</h2>
              <p>{pick(locale, contactCopy.description)}</p>
            </div>

            <div className="contact-card__actions">
              <a
                href="mailto:emirhangurbuz0606@gmail.com"
                className="button button--primary magnetic"
              >
                {pick(locale, contactCopy.cta)}
                <Mail size={18} />
              </a>
              <a
                href="https://github.com/Emrans99"
                target="_blank"
                rel="noreferrer"
                className="button button--secondary magnetic"
              >
                {pick(locale, contactCopy.subCta)}
                <FolderGit2 size={18} />
              </a>

              <div className="contact-card__socials">
                {socialLinks.map((link) => (
                  <SocialPill key={link.label} link={link} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
