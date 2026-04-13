import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/data'

export default function Projects() {
  return (
    <>
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle at 20% 30%, #C9A84C 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.p className="section-tag" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            Signature Works
          </motion.p>
          <motion.h1
            className="display-heading text-6xl md:text-8xl lg:text-[120px] text-ivory mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            Projects
          </motion.h1>
          <motion.p
            className="font-body font-light text-sm text-ivory/40 max-w-lg mt-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A selection of our most celebrated projects — each a testament to the art of exceptional interior design.
          </motion.p>
          <motion.div
            className="w-full h-px mt-12"
            style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-36">
        {/* Featured project — large */}
        <div className="mb-8">
          {projects[0] && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden aspect-[16/9] group cursor-pointer"
            >
              <motion.img
                src={projects[0].image}
                alt={projects[0].title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="font-body font-light tracking-[0.3em] text-[9px] uppercase px-3 py-1.5 bg-gold text-obsidian">
                  Featured
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-10 flex items-end justify-between">
                <div>
                  <p className="font-body font-light tracking-[0.2em] text-xs uppercase text-gold/70 mb-2">{projects[0].location}</p>
                  <h2 className="font-display text-4xl md:text-5xl font-light text-ivory">{projects[0].title}</h2>
                </div>
                <div className="hidden md:block text-right">
                  <p className="font-body font-light text-xs text-ivory/40">{projects[0].area}</p>
                  <p className="font-body font-light text-xs text-ivory/40">{projects[0].year}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
