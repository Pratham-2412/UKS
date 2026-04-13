import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Twitter, Youtube, ArrowUpRight } from 'lucide-react'
import { navLinks } from '../data/data'

const socials = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Twitter, label: 'X / Twitter', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-obsidian border-t border-gold/10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />

      {/* Top CTA band */}
      <div className="border-b border-gold/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <p className="section-tag">Start Your Journey</p>
            <h2 className="display-heading text-4xl md:text-5xl text-ivory">
              Ready to Transform<br />
              <em className="gold-text not-italic">Your Space?</em>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-gold whitespace-nowrap">
              Book Consultation
            </Link>
            <Link to="/projects" className="btn-outline whitespace-nowrap">
              View Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/">
            <div className="mb-6">
              <div className="font-display text-3xl font-light tracking-[0.35em] gold-text mb-1">AURUM</div>
              <div className="font-body font-light tracking-[0.5em] text-[9px] text-ivory/30 uppercase">Luxury Interiors</div>
            </div>
          </Link>
          <p className="font-body font-light text-sm text-ivory/40 leading-relaxed mb-8 max-w-xs">
            Crafting extraordinary living environments for those who appreciate the finest things in life.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -3, color: '#C9A84C' }}
                className="w-9 h-9 border border-gold/20 flex items-center justify-center text-ivory/40 hover:border-gold/60 transition-colors duration-300"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-body font-light tracking-[0.3em] text-[10px] uppercase text-gold mb-8">Navigation</h4>
          <ul className="space-y-4">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="font-body font-light text-sm text-ivory/40 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-3 h-px bg-gold/30 group-hover:w-5 group-hover:bg-gold transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-body font-light tracking-[0.3em] text-[10px] uppercase text-gold mb-8">Services</h4>
          <ul className="space-y-4">
            {['Bespoke Design', 'Interior Styling', 'Project Management', 'Material Sourcing', '3D Visualization'].map(s => (
              <li key={s}>
                <span className="font-body font-light text-sm text-ivory/40 flex items-center gap-2 group">
                  <span className="w-3 h-px bg-gold/30" />
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body font-light tracking-[0.3em] text-[10px] uppercase text-gold mb-8">Contact</h4>
          <ul className="space-y-5">
            <li>
              <p className="font-body font-light text-[10px] tracking-[0.2em] uppercase text-gold/50 mb-1">Studio</p>
              <p className="font-body font-light text-sm text-ivory/40">12 Mayfair Quarter<br />London, W1K 4AA</p>
            </li>
            <li>
              <p className="font-body font-light text-[10px] tracking-[0.2em] uppercase text-gold/50 mb-1">Email</p>
              <a href="mailto:hello@aurum.design" className="font-body font-light text-sm text-ivory/40 hover:text-gold transition-colors duration-300">
                hello@aurum.design
              </a>
            </li>
            <li>
              <p className="font-body font-light text-[10px] tracking-[0.2em] uppercase text-gold/50 mb-1">Phone</p>
              <a href="tel:+442071234567" className="font-body font-light text-sm text-ivory/40 hover:text-gold transition-colors duration-300">
                +44 (0) 207 123 4567
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/08 max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body font-light text-xs text-ivory/20 tracking-[0.1em]">
          © {year} AURUM Interiors. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="font-body font-light text-xs text-ivory/20 hover:text-gold/60 transition-colors duration-300 tracking-[0.1em]">Privacy Policy</a>
          <a href="#" className="font-body font-light text-xs text-ivory/20 hover:text-gold/60 transition-colors duration-300 tracking-[0.1em]">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
