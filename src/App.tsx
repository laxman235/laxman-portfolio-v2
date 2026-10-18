import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  Code2,
  Copy,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MonitorCog,
  Send,
  Workflow,
} from 'lucide-react'
import AboutSection from './components/AboutSection'
import './App.css'

type SkillFilter = 'All' | 'Frontend' | 'Backend' | 'Databases & Cloud' | 'DevOps & Tools' | 'AI & System Design'

type FormState = {
  name: string
  email: string
  service: string
  timeline: string
  brief: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

type ProjectData = {
  title: string
  tech: string
  metrics: string
  description: string
  details: string[]
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Full-Stack Capabilities', href: '#full-stack-capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Client Services', href: '#client-services' },
  { label: 'Contact', href: '#contact' },
]

const experience = [
  {
    title: 'Software Engineer',
    company: 'Neutara Technologies',
    period: 'Jan 2026 - Present',
    bullets: [
      'Built full-stack features for CloudFuze, including React-driven reporting dashboards and diagnostic views paired with high-performance MongoDB aggregation APIs.',
      'Developed dynamic migration tooling and monitoring interfaces for files, permissions, emails, and chats, while supporting Java 25 microservice delivery.',
      'Migrated legacy Java 8 monolithic workflows to scalable microservices, implementing automated retry logic and 50+ REST endpoints with Docker/Kubernetes on AWS.',
    ],
  },
  {
    title: 'Jr. Software Engineer',
    company: 'Bitwise',
    period: 'Feb 2023 - Jan 2026',
    bullets: [
      'Engineered Angular-based banking portals and secure Spring Boot services, connecting customer experiences with real-time financial workflows and backend validation.',
      'Developed an in-house OTP verification workflow, replacing third-party dependencies and simplifying pre-login loan application journeys.',
      'Implemented asynchronous Kafka messaging for decoupled background processing and resolved multi-module integration bottlenecks across distributed services.',
    ],
  },
]

const projectData: ProjectData[] = [
  {
    title: 'CloudFuze Migration Monitoring & Reporting Suite',
    tech: 'React.js, TypeScript, Java 21/25, Spring Boot 3.3.4, MongoDB, Grafana',
    metrics: 'Real-time dashboards, JWT-secured endpoints, optimized MongoDB indexes, dynamic migration analytics.',
    description:
      'Designed a full-stack monitoring layer for cloud migration operations, connecting responsive React dashboards to secure Java services and live migration telemetry.',
    details: [
      'Frontend architecture: filtered reporting views, status cards, and tenant-level drilldowns for migration health.',
      'API flow: secure REST endpoints, pagination, aggregate queries, and retries for failed migration workflows.',
      'Database decisions: MongoDB aggregation pipelines, indexing, and read-optimized reporting for large migration datasets.',
      'Benchmarks: reduced query latency, improved observability, and faster troubleshooting across tenant migration jobs.',
    ],
  },
  {
    title: 'Secure Customer Banking Portal & Loan Engine',
    tech: 'Angular, Java 11, Spring Boot, Hibernate, Kafka, MySQL',
    metrics: 'Self-hosted OTP flow, responsive customer self-service, real-time loan processing and verification.',
    description:
      'Built customer-facing banking experiences and secure workflow services for onboarding, eligibility checks, and transaction processing.',
    details: [
      'Frontend architecture: customer portals, audit-friendly form flows, and responsive pre-login screens for mobile and desktop.',
      'API flow: Angular-to-Spring Boot orchestration, secure validation, and event-driven loan workflow updates.',
      'Database decisions: transactional MySQL structures, optimized relationship mapping, and role-based access checks.',
      'Benchmarks: improved customer completion rates, reduced dependency cost, and more reliable background processing.',
    ],
  },
  {
    title: 'Real-Time Microservices Analytics Platform',
    tech: 'React, Spring Cloud, Apache Kafka, PostgreSQL, Docker, AWS',
    metrics: 'Decoupled event streams, idempotent consumer handling, live transaction analytics, containerized deployment.',
    description:
      'Developed an event-driven analytics platform for tracking downstream service health, transaction flow, and system-level behavior in near real time.',
    details: [
      'Frontend architecture: live dashboards, KPI cards, and event-line visualizations for system monitoring.',
      'API flow: Kafka producers/consumers, event replay logic, and resilient service-to-service communication.',
      'Database decisions: PostgreSQL-backed transaction state, durable event tracking, and analytics-friendly schemas.',
      'Benchmarks: improved event replay reliability, lower operational noise, and clearer business observability.',
    ],
  },
]

const skillFilters: SkillFilter[] = ['All', 'Frontend', 'Backend', 'Databases & Cloud', 'DevOps & Tools', 'AI & System Design']

const skillGroups = [
  {
    category: 'Frontend',
    title: 'Frontend',
    items: ['React.js', 'Angular', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'State Management'],
    level: 88,
  },
  {
    category: 'Backend',
    title: 'Backend',
    items: ['Java (8, 11, 21, 25)', 'Spring Boot', 'Spring MVC', 'Spring Security', 'REST APIs', 'Microservices', 'Apache Kafka', 'Hibernate', 'JPA', 'JWT Authentication'],
    level: 96,
  },
  {
    category: 'Databases & Cloud',
    title: 'Databases & Cloud',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Query Optimization', 'Schema Design', 'AWS (EC2, S3)', 'Cloud Architecture'],
    level: 90,
  },
  {
    category: 'DevOps & Tools',
    title: 'DevOps & Tools',
    items: ['Docker', 'Kubernetes', 'CI/CD', 'Grafana', 'Linux', 'Git', 'Bitbucket', 'Maven', 'Postman', 'Swagger/OpenAPI', 'JUnit', 'Mockito', 'Jira'],
    level: 92,
  },
  {
    category: 'AI & System Design',
    title: 'AI & System Design',
    items: ['Claude Agent', 'Claude Code', 'MCP', 'System Design', 'HLD / LLD', 'C4 Architecture', 'Event-Driven Design', 'Scalability & Resilience'],
    level: 80,
  },
]

const servicePackages = [
  {
    id: 'fullstack',
    title: 'Complete Full-Stack Web Application (React/Angular + Spring Boot)',
    timeline: '2-8 weeks',
    summary: 'End-to-end product builds combining responsive interfaces, secure APIs, data flow, and deployment readiness.',
  },
  {
    id: 'migration',
    title: 'Legacy Monolith Modernization & Cloud Migration',
    timeline: '4-12 weeks',
    summary: 'Modernize aging systems, break monoliths into services, and move critical workloads to resilient cloud infrastructure.',
  },
  {
    id: 'api',
    title: 'Custom REST API, Microservices & Kafka Event Architecture',
    timeline: '2-6 weeks',
    summary: 'Design scalable backend systems with clear APIs, event-driven pipelines, and production-safe integration contracts.',
  },
]

const quickConnects = [
  { label: 'Email', value: 'janakwadelaxman23@gmail.com', icon: Mail },
  { label: 'LinkedIn', value: 'https://www.linkedin.com/in/laxman-janakwade-491a931a0/', icon: Globe },
  { label: 'Location', value: 'Pune, India', icon: MapPin },
]

const defaultForm: FormState = {
  name: '',
  email: '',
  service: 'Complete Full-Stack Web Application (React/Angular + Spring Boot)',
  timeline: '',
  brief: '',
}

function App() {
  const [activeSkillFilter, setActiveSkillFilter] = useState<SkillFilter>('All')
  const [activeSkill, setActiveSkill] = useState(skillGroups[0].title)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const filteredSkillGroups =
    activeSkillFilter === 'All'
      ? skillGroups
      : skillGroups.filter((group) => group.category === activeSkillFilter)

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 2400)
    return () => window.clearTimeout(timeout)
  }, [toast])

  useEffect(() => {
    if (!copiedValue) return
    const timeout = window.setTimeout(() => setCopiedValue(null), 1500)
    return () => window.clearTimeout(timeout)
  }, [copiedValue])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let previousY = window.scrollY
    let lastSweepTime = 0
    let frame = 0
    const cards = document.querySelectorAll<HTMLElement>(
      '.glass-panel, main article, main form, main aside, main .about-hover-card, main .mirror-scroll-target',
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('mirror-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.2 },
    )

    cards.forEach((card) => {
      card.classList.add('mirror-reflect')
      observer.observe(card)
    })

    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const currentY = window.scrollY
        const difference = currentY - previousY
        previousY = currentY
        if (Math.abs(difference) < 2) return

        const direction = difference > 0 ? 'down' : 'up'
        document.documentElement.dataset.scrollDirection = direction
        const now = performance.now()
        if (now - lastSweepTime < 420) return
        lastSweepTime = now

        document.querySelectorAll<HTMLElement>('.mirror-reflect.mirror-visible').forEach((card) => {
          card.classList.remove('mirror-sweep-up', 'mirror-sweep-down')
          void card.offsetWidth
          card.classList.add(`mirror-sweep-${direction}`)
        })
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
      delete document.documentElement.dataset.scrollDirection
    }
  }, [])

  const handleCopyValue = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedValue(label)
      setToast(`${label} copied to clipboard`)
    } catch {
      setToast('Copy failed. Please copy manually.')
    }
  }

  const handleConsultation = (service: string) => {
    setForm((current) => ({ ...current, service }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setToast(`Consultation form prefilled for: ${service}`)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.timeline.trim()) nextErrors.timeline = 'Please share a timeline or budget range.'
    if (!form.brief.trim()) nextErrors.brief = 'Please describe your project requirements.'

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors)
      setToast('Please correct the highlighted fields.')
      return
    }

    setFormErrors({})
    setToast(`Thanks ${form.name.trim().split(' ')[0]} � your request has been submitted.`)
    setForm(defaultForm)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40 mb-12">
          <nav className="glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                LJ
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Laxman Janakwade</p>
              </div>
            </div>

            <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-cyan-300">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-medium text-emerald-300 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Open for Full-Stack & Contract Roles
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Hire Me
                <ArrowRight size={16} />
              </a>
            </div>
          </nav>
        </header>

        <main className="space-y-12">
          <AboutSection />

          <section id="full-stack-capabilities" className="py-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Full-Stack Capabilities</p>
                <h2 className="text-3xl font-bold text-white">System Design Across the Stack</h2>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent md:block" />
            </div>

            <div className="glass-panel rounded-3xl border border-slate-700/80 p-6">
              <div className="mb-6 flex flex-wrap gap-3">
                {skillFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveSkillFilter(filter)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      activeSkillFilter === filter
                        ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-300'
                        : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {filteredSkillGroups.map((group) => (
                  <button
                    key={group.title}
                    type="button"
                    onClick={() => setActiveSkill(group.title)}
                    className={`mirror-scroll-target rounded-2xl border p-5 text-left transition ${
                      activeSkill === group.title
                        ? 'border-cyan-400/40 bg-cyan-500/10'
                        : 'border-slate-700 bg-slate-950/60 hover:border-slate-500'
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                      <span className="text-sm text-cyan-300">{group.level}%</span>
                    </div>

                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400"
                        style={{ width: `${group.level}%` }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section id="experience" className="py-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Experience</p>
                <h2 className="text-3xl font-bold text-white">End-to-End Delivery Focus</h2>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent md:block" />
            </div>

            <div className="space-y-6">
              {experience.map((item) => (
                <div key={item.company} className="glass-panel relative overflow-hidden rounded-3xl border border-slate-700/80 p-6 lg:p-8">
                  <div className="absolute left-6 top-8 h-4 w-4 rounded-full border-4 border-cyan-400 bg-slate-950" />
                  <div className="ml-10 border-l border-slate-700/80 pl-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xl font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-cyan-300">{item.company}</p>
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        {item.period}
                      </span>
                    </div>

                    <ul className="mt-5 space-y-3 text-slate-300">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="py-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Projects</p>
                <h2 className="text-3xl font-bold text-white">Featured Full-Stack Builds</h2>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent md:block" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {projectData.map((project) => (
                <article key={project.title} className="glass-panel flex h-full flex-col rounded-3xl border border-slate-700/80 p-5">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      Architecture
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
                    >
                      Deep Dive
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm text-cyan-300">{project.tech}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
                  <div className="mt-5 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-3 text-sm text-slate-200">
                    {project.metrics}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="client-services" className="py-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Client Services</p>
                <h2 className="text-3xl font-bold text-white">Freelance Execution for Product Teams</h2>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent md:block" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {servicePackages.map((service) => (
                <div key={service.id} className="glass-panel flex h-full flex-col rounded-3xl border border-slate-700/80 p-5">
                  <div className="mb-4 inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300">
                    {service.id === 'fullstack' ? <Code2 size={18} /> : service.id === 'migration' ? <CloudCog size={18} /> : <Workflow size={18} />}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm text-cyan-300">Typical timeline: {service.timeline}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-slate-300">{service.summary}</p>
                  <button
                    type="button"
                    onClick={() => handleConsultation(service.title)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Request Consultation
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
                <h2 className="text-3xl font-bold text-white">Let’s Build Your Next Reliable Product</h2>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent md:block" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="glass-panel rounded-3xl border border-slate-700/80 p-6">
                <h3 className="mb-5 text-xl font-semibold text-white">Direct Connect</h3>
                <div className="space-y-3">
                  {quickConnects.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/70 p-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-300">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
                          <p className="mt-1 text-sm text-slate-200">{value}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyValue(value, label)}
                        className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                        aria-label={`Copy ${label}`}
                      >
                        <Copy size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyValue('https://www.linkedin.com/in/laxman-janakwade-491a931a0/', 'LinkedIn')}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <Globe size={15} />
                    Copy LinkedIn
                  </button>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <Code2 size={15} />
                    GitHub
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="glass-panel rounded-3xl border border-slate-700/80 p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">Client Name</label>
                    <input
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="mt-2 text-xs text-red-400">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                    <input
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
                      placeholder="your@email.com"
                    />
                    {formErrors.email && <p className="mt-2 text-xs text-red-400">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-slate-200">Service Needed</label>
                  <select
                    value={form.service}
                    onChange={(event) => setForm({ ...form, service: event.target.value })}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
                  >
                    {servicePackages.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-slate-200">Project Timeline / Budget</label>
                  <input
                    value={form.timeline}
                    onChange={(event) => setForm({ ...form, timeline: event.target.value })}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
                    placeholder="e.g. 3 weeks / $2,500"
                  />
                  {formErrors.timeline && <p className="mt-2 text-xs text-red-400">{formErrors.timeline}</p>}
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-slate-200">Project Description</label>
                  <textarea
                    value={form.brief}
                    onChange={(event) => setForm({ ...form, brief: event.target.value })}
                    rows={6}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
                    placeholder="Share your product goals, business context, and current technical challenges."
                  />
                  {formErrors.brief && <p className="mt-2 text-xs text-red-400">{formErrors.brief}</p>}
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Send Inquiry
                  <Send size={16} />
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700/80 p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Architecture Deep Dive</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{selectedProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-slate-300">
              <p className="text-cyan-300">{selectedProject.tech}</p>
              <p>{selectedProject.description}</p>
              <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <MonitorCog size={16} className="text-cyan-300" />
                  System Summary
                </div>
                <ul className="space-y-3">
                  {selectedProject.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 shadow-lg shadow-cyan-950/30">
          {toast}
        </div>
      )}
    </div>
  )
}

export default App