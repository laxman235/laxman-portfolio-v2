import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Copy,
  Database,
  GraduationCap,
  Globe,
  MapPin,
  ServerCog,
  Terminal,
} from 'lucide-react'

const email = 'janakwadelaxman23@gmail.com'

const profileFacts = [
  { label: 'Location', value: 'Pune, India', icon: MapPin },
  { label: 'Experience', value: '3+ Years Production Experience', icon: BriefcaseBusiness },
  { label: 'Education', value: 'B.Tech, GH Raisoni College of Engineering and Management (2018–2022)', icon: GraduationCap },
]

const capabilities = [
  {
    title: 'Modern Frontend',
    icon: Code2,
    description: 'Intuitive, responsive client experiences and dynamic data dashboards.',
    technologies: ['React.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
    accent: 'from-cyan-400 to-sky-500',
  },
  {
    title: 'Distributed Backend',
    icon: ServerCog,
    description: 'High-throughput services built for secure and reliable workflows.',
    technologies: ['Java (8–25)', 'Spring Boot', 'Apache Kafka', 'REST APIs', 'Microservices'],
    accent: 'from-sky-400 to-emerald-400',
  },
  {
    title: 'Cloud & Persistence',
    icon: Database,
    description: 'Durable data platforms and production-ready cloud deployments.',
    technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    accent: 'from-emerald-400 to-cyan-400',
  },
]

const principles = [
  {
    title: 'End-to-End Ownership',
    description:
      'Own the full lifecycle—from responsive UI views to database index optimization and event consumers.',
  },
  {
    title: 'Resilience Over Complexity',
    description:
      'Prefer decoupled architectures, automated retries, and idempotent Kafka processing over unnecessary abstractions.',
  },
  {
    title: 'Production-Grade Security',
    description:
      'Build in JWT bearer authentication, role-based controls, and carefully validated API endpoints.',
  },
]

export function AboutSection() {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  useEffect(() => {
    if (!copied && !copyFailed) return
    const timeout = window.setTimeout(() => {
      setCopied(false)
      setCopyFailed(false)
    }, 2200)
    return () => window.clearTimeout(timeout)
  }, [copied, copyFailed])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = document.querySelectorAll<HTMLElement>('#about .about-reflect')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('about-in-view', entry.isIntersecting)
        })
      },
      { threshold: 0.2 },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setCopyFailed(false)
    } catch {
      setCopyFailed(true)
      setCopied(false)
    }
  }

  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-28 py-10 sm:py-14 lg:py-16">
      <div className="about-reveal mb-9 max-w-4xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1.5 font-mono text-xs tracking-wide text-cyan-200">
          <Terminal size={14} aria-hidden="true" />
          [ ENGINEERING PROFILE ]
        </div>
        <h1
          id="about-heading"
          className="about-gradient-text bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl"
        >
          Bridging Sleek Frontends with Resilient Enterprise Backends
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
          Full-stack delivery from polished user workflows to high-throughput cloud infrastructure—connecting useful interfaces to dependable systems.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="about-reveal about-reveal-delay-1 about-hover-card about-reflect overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/70 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="about-accent-line h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400" />
          <div className="p-5 sm:p-6">
            <div>
              <div>
                <h2 className="text-xl font-bold text-white">Laxman Janakwade</h2>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Full-Stack Software Engineer
                  <span className="block text-cyan-300">Java, Spring Boot & React / Angular</span>
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available for Full-Stack & Contract Roles
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-4 border-t border-slate-700/80 pt-5">
              {profileFacts.map(({ label, value, icon: Icon }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon size={17} className="mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</span>
                    <span className="mt-0.5 block text-sm leading-5 text-slate-200">{value}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-3 rounded-xl border border-slate-700/70 bg-slate-950/40 p-3 text-sm">
              <p className="text-slate-300">
                <span className="font-medium text-white">Current:</span> Software Engineer at Neutara Technologies, working on CloudFuze migration engines.
              </p>
              <p className="text-slate-300">
                <span className="font-medium text-white">Previous:</span> Jr. Software Engineer at Bitwise, building banking systems and microservices.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-700/80 bg-slate-950/60 p-3">
                <p className="text-xl font-bold text-cyan-300">50+</p>
                <p className="mt-1 text-xs leading-4 text-slate-400">REST APIs Built</p>
              </div>
              <div className="rounded-xl border border-slate-700/80 bg-slate-950/60 p-3">
                <p className="text-xl font-bold text-emerald-300">Java 25</p>
                <p className="mt-1 text-xs leading-4 text-slate-400">Modern Core Upgrade</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-400/20 active:translate-y-0"
                aria-label={copied ? 'Email address copied' : 'Copy email address'}
              >
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                {copied ? 'Email Copied' : 'Copy Email'}
              </button>
              <a
                href={`mailto:${email}`}
                className="text-sm text-slate-400 underline decoration-slate-600 underline-offset-4 transition hover:text-white"
              >
                {email}
              </a>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {copied ? 'Email copied to clipboard.' : copyFailed ? 'Could not access clipboard. Use the email link to contact Laxman.' : ''}
            </p>
            {copyFailed && <p className="mt-2 text-xs text-amber-300">Clipboard unavailable. You can email directly using the address above.</p>}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href="https://www.linkedin.com/in/laxman-janakwade-491a931a0/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 transition hover:text-cyan-200"
              >
                <Globe size={14} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          <div className="about-reveal about-reveal-delay-2 about-hover-card about-reflect rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5 backdrop-blur-lg sm:p-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Engineering Narrative</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
              <p>
                I’m a full-stack engineer with 3+ years of production experience delivering cloud migration platforms and core banking applications. At Neutara Technologies, I work on CloudFuze migration engines; previously at Bitwise, I built banking systems and distributed microservices.
              </p>
              <p>
                I bring both sides of a feature together: crafting intuitive React and Angular experiences while building for zero data loss and high throughput with Java 21/25, Spring Boot, Kafka, and MongoDB.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {capabilities.map(({ title, icon: Icon, description, technologies, accent }, index) => (
              <article
                key={title}
                style={{ animationDelay: `${280 + index * 100}ms` }}
                className="about-reveal about-hover-card about-reflect group rounded-2xl border border-slate-700/80 bg-slate-900/55 p-4 transition duration-200 hover:border-cyan-400/40 hover:bg-slate-900/85"
              >
                <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${accent} p-[1px]`}>
                  <span className="rounded-xl bg-slate-950/90 p-2 text-cyan-200">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {technologies.map((technology) => (
                    <span key={technology} className="rounded-md border border-slate-700/80 bg-slate-950/60 px-2 py-1 font-mono text-[10px] text-slate-300">
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="about-reveal about-reveal-delay-3 flex flex-col gap-3 pt-1 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/15 active:translate-y-0"
            >
              Explore Featured Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:text-emerald-200 active:translate-y-0"
            >
              Discuss a Project
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="about-reveal about-reveal-delay-3 mt-12 sm:mt-16">
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 sm:text-sm">
            Core Engineering Philosophy
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              style={{ animationDelay: `${450 + index * 100}ms` }}
              className="about-reveal about-hover-card about-reflect rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition duration-200 hover:border-emerald-400/30 hover:bg-slate-900/70"
            >
              <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
              <h3 className="mt-2 text-base font-semibold text-white">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
