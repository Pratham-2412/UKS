import { motion } from 'framer-motion'
import { Compass, Gem, Layout, Star, Sparkles, Clock } from 'lucide-react'

const iconMap = { Compass, Gem, Layout, Star, Sparkles, Clock }

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon] || Star

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative p-8 border border-gold/10 hover:border-gold/30 transition-colors duration-500 cursor-default"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(201,168,76,0.02) 100%)',
      }}
    >
      {/* Corner decoration */}
      <div className="absolute top-0 left-0 w-6 h-px bg-gold" />
      <div className="absolute top-0 left-0 w-px h-6 bg-gold" />
      <div className="absolute bottom-0 right-0 w-6 h-px bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-px h-6 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-12 h-12 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-colors duration-500">
          <Icon size={20} className="text-gold/60 group-hover:text-gold transition-colors duration-300" />
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-2xl font-light text-ivory mb-3 group-hover:text-gold transition-colors duration-300">
        {service.title}
      </h3>
      <p className="font-body font-light text-sm text-ivory/40 leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Stat */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-px bg-gold/30" />
        <span className="font-body font-light tracking-[0.2em] text-[10px] uppercase text-gold/60">
          {service.stat}
        </span>
      </div>
    </motion.div>
  )
}
