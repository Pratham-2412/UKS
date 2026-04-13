import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/data'

const process = [
  { step: '01', title: 'Discovery', description: 'We begin with an in-depth consultation to understand your vision, lifestyle, and aspirations for your space.' },
  { step: '02', title: 'Concept Design', description: 'Our designers craft a bespoke concept, presented through mood boards, material palettes, and 3D visualisations.' },
  { step: '03', title: 'Development', description: 'Every detail is refined — from custom furniture specifications to the precise placement of lighting and art.' },
  { step: '04', title: 'Procurement', description: 'We source and manage all materials, furniture, and artisan works from our exclusive global network of suppliers.' },
  { step: '05', title: 'Installation', description: 'Our expert team orchestrates the complete installation with meticulous attention to every last detail.' },
  { step: '06', title: 'Reveal', description: 'The moment of transformation — your extraordinary new space is revealed in all its splendour.' },
]

export default function Services() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle at 70% 40%, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.p className="section-tag" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            What We Offer
          </motion.p>
          <motion.h1
            className="display-heading text-6xl md:text-8xl lg:text-[120px] text-ivory mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            Services
          </motion.h1>
          <motion.div
            className="w-full h-px mt-12"
            style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-36">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* Process Section */}
        <div className="border-t border-gold/10 pt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="section-tag">How We Work</p>
              <h2 className="display-heading text-5xl md:text-6xl text-ivory mt-2">
                Our <em className="gold-text not-italic">Process</em>
              </h2>
            </div>
            <p className="font-body font-light text-sm text-ivory/40 max-w-xs leading-relaxed">
              A carefully refined six-stage process that transforms your vision into a living masterpiece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group bg-obsidian p-10 hover:bg-charcoal/60 transition-colors duration-500 cursor-default"
              >
                <div className="font-display text-6xl font-light text-gold/10 group-hover:text-gold/20 transition-colors duration-500 mb-6 leading-none">
                  {step.step}
                </div>
                <h3 className="font-display text-2xl font-light text-ivory mb-4 group-hover:text-gold transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-body font-light text-sm text-ivory/40 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <h2 className="display-heading text-4xl md:text-5xl text-ivory mb-8">
            Ready to Begin?
          </h2>
          <Link to="/contact" className="btn-gold">
            Book Your Consultation
          </Link>
        </motion.div>
      </section>
    </>
  )
}
