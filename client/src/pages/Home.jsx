import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import Hero from '../components/Hero'
import CollectionCard from '../components/CollectionCard'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import { collections, services, projects, materials, testimonials, stats } from '../data/data'

// Reusable section wrapper
function Section({ children, className = '' }) {
  return (
    <section className={`py-24 md:py-36 ${className}`}>
      {children}
    </section>
  )
}

// Stats counter section
function StatsSection() {
  return (
    <div className="border-y border-gold/10 py-16">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-5xl md:text-6xl font-light gold-text mb-2">{stat.value}</div>
            <div className="font-body font-light tracking-[0.3em] text-[10px] uppercase text-ivory/30">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Materials carousel
function MaterialsSection() {
  return (
    <Section className="overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-tag">Curated Materials</p>
            <h2 className="display-heading text-5xl md:text-6xl lg:text-7xl text-ivory">
              The Finest<br />
              <em className="gold-text not-italic">Materials</em>
            </h2>
          </div>
          <Link to="/collections" className="hidden md:flex items-center gap-3 text-gold/60 hover:text-gold transition-colors duration-300 group">
            <span className="font-body font-light tracking-[0.3em] text-xs uppercase">View All</span>
            <motion.div whileHover={{ x: 4 }}>
              <ArrowUpRight size={16} />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Horizontal scroll — plain DOM + CSS hover so native scroll stays on compositor */}
      <div className="horizontal-scroll-track px-6 md:px-12">
        {materials.map((mat) => (
          <article
            key={mat.id}
            className="material-card group flex-shrink-0 w-64 snap-start cursor-pointer select-none"
          >
            <div className="relative mb-4 aspect-square overflow-hidden bg-charcoal/50">
              <img
                src={mat.image}
                alt={mat.name}
                width={512}
                height={512}
                decoding="async"
                loading="lazy"
                draggable={false}
                className="material-card-media h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-obsidian/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight size={24} className="text-gold" />
              </div>
            </div>
            <p className="font-display text-lg font-light text-ivory transition-colors duration-300 group-hover:text-gold">{mat.name}</p>
            <p className="font-body font-light text-xs tracking-[0.2em] text-ivory/30">{mat.origin}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

// Testimonials
function TestimonialsSection() {
  return (
    <Section>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <p className="section-tag mx-auto" style={{ paddingLeft: 0 }}>
            <span className="inline-block relative pl-10">
              Client Stories
              <span className="absolute left-0 top-1/2 w-6 h-px bg-gold" />
            </span>
          </p>
          <h2 className="display-heading text-5xl md:text-6xl text-ivory mt-2">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="glass p-8 relative group hover:border-gold/20 transition-colors duration-500"
            >
              {/* Quote mark */}
              <div className="font-display text-8xl font-light text-gold/10 absolute -top-2 left-6 leading-none">"</div>

              <p className="font-body font-light text-sm text-ivory/60 leading-relaxed mb-8 relative z-10 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-gold/20"
                />
                <div>
                  <p className="font-display text-lg font-light text-ivory">{t.name}</p>
                  <p className="font-body font-light text-xs text-gold/60 tracking-wide">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// Parallax CTA
function CTASection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80])

  return (
    <section ref={ref} className="relative overflow-hidden py-40 md:py-56">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=85"
          alt="CTA background"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-obsidian/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-tag mx-auto mb-8" style={{ paddingLeft: '2.5rem' }}>Begin Your Journey</p>
        <h2 className="display-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory mb-6 max-w-4xl mx-auto">
          Design Your
          <br />
          <em className="gold-text not-italic">Dream Space</em>
        </h2>
        <p className="font-body font-light text-ivory/50 max-w-lg mx-auto mb-14 text-sm leading-relaxed">
          Every extraordinary home begins with a single conversation. Let's discuss how we can transform your vision into reality.
        </p>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Link
            to="/contact"
            className="btn-gold text-sm px-14 py-5"
            style={{
              boxShadow: '0 0 60px rgba(201,168,76,0.3), 0 0 120px rgba(201,168,76,0.1)',
            }}
          >
            Book a Design Consultation
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)
  const featuredCollections = collections.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* STATS */}
      <StatsSection />

      {/* COLLECTIONS */}
      <Section>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="section-tag">Our Portfolio</p>
              <h2 className="display-heading text-5xl md:text-6xl lg:text-7xl text-ivory">
                Curated<br />
                <em className="gold-text not-italic">Collections</em>
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="font-body font-light text-sm text-ivory/40 leading-relaxed mb-6">
                Each collection is a world unto itself — a carefully curated universe of materials, forms, and textures.
              </p>
              <Link to="/collections" className="btn-outline text-[10px]">
                All Collections
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((c, i) => (
              <CollectionCard key={c.id} collection={c} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="bg-charcoal/40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="section-tag" style={{ paddingLeft: '2.5rem' }}>What We Offer</p>
            <h2 className="display-heading text-5xl md:text-6xl lg:text-7xl text-ivory mt-2">
              Our <em className="gold-text not-italic">Services</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="section-tag">Signature Projects</p>
              <h2 className="display-heading text-5xl md:text-6xl lg:text-7xl text-ivory">
                Recent<br />
                <em className="gold-text not-italic">Masterworks</em>
              </h2>
            </div>
            <Link to="/projects" className="flex items-center gap-3 text-gold/60 hover:text-gold transition-colors duration-300 group">
              <span className="font-body font-light tracking-[0.3em] text-xs uppercase">All Projects</span>
              <motion.div whileHover={{ x: 4 }}>
                <ArrowUpRight size={16} />
              </motion.div>
            </Link>
          </div>

          {/* Bento-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {featuredProjects[0] && <ProjectCard project={featuredProjects[0]} index={0} large />}
            </div>
            <div className="flex flex-col gap-6">
              {featuredProjects.slice(1, 3).map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* MATERIALS */}
      <MaterialsSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CTA */}
      <CTASection />
    </>
  )
}
