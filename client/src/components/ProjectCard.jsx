import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'

export default function ProjectCard({ project, index, large = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.08 }}
      className={`group relative overflow-hidden cursor-pointer ${large ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}
    >
      <Link to="/projects" className="block h-full">
        {/* Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Gradient overlay - always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-5 left-5">
          <span className="font-body font-light tracking-[0.3em] text-[9px] uppercase px-3 py-1.5 glass-dark text-gold border-gold/20 border">
            {project.category}
          </span>
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute top-5 right-5 w-10 h-10 border border-gold/30 flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-all duration-300"
          whileHover={{ rotate: 45 }}
        >
          <ArrowUpRight size={16} />
        </motion.div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0.7 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Location */}
            <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <MapPin size={10} className="text-gold" />
              <span className="font-body font-light tracking-[0.2em] text-[10px] uppercase text-ivory/60">
                {project.location}
              </span>
            </div>

            {/* Title */}
            <h3 className={`font-display font-light text-ivory group-hover:text-gold transition-colors duration-300 leading-tight ${large ? 'text-3xl' : 'text-2xl'}`}>
              {project.title}
            </h3>

            {/* Hidden description on hover */}
            <motion.p
              className="font-body font-light text-xs text-ivory/40 leading-relaxed mt-3 max-w-sm"
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {project.description}
            </motion.p>

            {/* Meta */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gold/10">
              <div>
                <p className="font-body font-light text-[9px] tracking-[0.3em] uppercase text-gold/40 mb-0.5">Year</p>
                <p className="font-body font-light text-xs text-ivory/60">{project.year}</p>
              </div>
              <div>
                <p className="font-body font-light text-[9px] tracking-[0.3em] uppercase text-gold/40 mb-0.5">Area</p>
                <p className="font-body font-light text-xs text-ivory/60">{project.area}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
