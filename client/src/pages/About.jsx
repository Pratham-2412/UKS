import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { stats } from '../data/data'

const team = [
  {
    name: 'Alexandra Voss',
    role: 'Founder & Creative Director',
    bio: 'With over 20 years defining the luxury interiors landscape, Alexandra\'s vision is the soul of AURUM.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b5e4d7a5?w=600&q=80',
  },
  {
    name: 'Marcus Chen',
    role: 'Principal Designer',
    bio: 'Trained at the École Boulle in Paris, Marcus brings architectural precision and artisan sensitivity to every project.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    name: 'Isabelle Fontaine',
    role: 'Head of Materials & Procurement',
    bio: 'Isabelle\'s global network of artisans and suppliers ensures every material is as extraordinary as the spaces it inhabits.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
  },
  {
    name: 'James Whitfield',
    role: 'Project Director',
    bio: 'James orchestrates every project with military precision, ensuring flawless execution from first sketch to final reveal.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
  },
]

const awards = [
  { year: '2024', name: 'House & Garden — Designer of the Year' },
  { year: '2024', name: 'SBID International Design Awards — Gold' },
  { year: '2023', name: 'AD100 — Most Influential Designers' },
  { year: '2023', name: 'Evening Standard — Luxury Interior Studio' },
  { year: '2022', name: 'Blueprint Awards — Best Residential Project' },
  { year: '2021', name: 'Dezeen Awards — Interior of the Year' },
]

export default function About() {
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <>
      {/* Header */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-px opacity-10"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <motion.p className="section-tag" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              Our Story
            </motion.p>
            <motion.h1
              className="display-heading text-6xl md:text-8xl text-ivory mt-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              About<br />
              <em className="gold-text not-italic">AURUM</em>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-body font-light text-base text-ivory/50 leading-relaxed mb-6">
              Founded in 2009 in Mayfair, London, AURUM has spent fifteen years crafting interiors that transcend expectation — spaces that are not merely beautiful, but profoundly alive.
            </p>
            <p className="font-body font-light text-base text-ivory/50 leading-relaxed">
              We believe that great design is not about following trends, but about understanding the essence of a person and translating that into a space of extraordinary resonance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero image with parallax */}
      <section ref={parallaxRef} className="relative overflow-hidden h-[60vh] md:h-[80vh] mb-32">
        <motion.div className="absolute inset-0" style={{ y }}>
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85"
            alt="AURUM Studio"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-obsidian/30" />
        </motion.div>
        <div className="relative z-10 h-full flex items-end p-12">
          <div className="glass-dark px-8 py-6 max-w-sm">
            <p className="font-display text-3xl font-light text-ivory italic">"Design is not decoration. It is the art of being."</p>
            <p className="font-body font-light text-xs text-gold/70 tracking-[0.3em] uppercase mt-3">— Alexandra Voss, Founder</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border border-gold/10 p-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-5xl font-light gold-text mb-2">{stat.value}</div>
              <div className="font-body font-light tracking-[0.3em] text-[10px] uppercase text-ivory/30">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
        <div className="mb-20">
          <p className="section-tag">The People</p>
          <h2 className="display-heading text-5xl md:text-6xl text-ivory mt-2">
            Our <em className="gold-text not-italic">Team</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group cursor-default"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-60" />
              </div>
              <h3 className="font-display text-2xl font-light text-ivory mb-1 group-hover:text-gold transition-colors duration-300">
                {member.name}
              </h3>
              <p className="font-body font-light tracking-[0.2em] text-[10px] uppercase text-gold/60 mb-3">
                {member.role}
              </p>
              <p className="font-body font-light text-xs text-ivory/40 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <p className="section-tag">Recognition</p>
            <h2 className="display-heading text-5xl md:text-6xl text-ivory mt-2">
              Awards &<br />
              <em className="gold-text not-italic">Accolades</em>
            </h2>
          </div>
          <div className="space-y-0">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex items-center justify-between py-6 border-b border-gold/10 group hover:border-gold/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-8">
                  <span className="font-body font-light text-xs text-gold/40 tracking-[0.2em] w-12">{award.year}</span>
                  <span className="font-body font-light text-sm text-ivory/60 group-hover:text-ivory transition-colors duration-300">{award.name}</span>
                </div>
                <div className="w-2 h-2 border border-gold/20 rotate-45 group-hover:bg-gold group-hover:border-gold transition-all duration-300 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-heading text-4xl md:text-6xl text-ivory mb-8">
            Work With Us
          </h2>
          <p className="font-body font-light text-sm text-ivory/40 max-w-md mx-auto mb-12 leading-relaxed">
            We take on a limited number of projects each year to ensure every client receives our full dedication.
          </p>
          <Link to="/contact" className="btn-gold">
            Begin a Conversation
          </Link>
        </motion.div>
      </section>
    </>
  )
}
