import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { serieVideos } from '../data/serieVideos'

export function SerieSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as const },
    },
  }

  return (
    <section id="serie" className="scroll-mt-20 relative overflow-hidden">
      <div className="relative bg-brand-surface rounded-t-[4rem] md:rounded-t-[6rem]">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl px-6 py-20 md:py-28"
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary leading-tight">
              Serie Audiovisual
            </h2>
            <p className="text-lg md:text-xl font-bold text-brand-secondary mt-3">
              Periodismo En Violeta
            </p>
          </motion.div>

          {/* Intro */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-16">
            <p className="text-brand-dark/80 text-base md:text-lg leading-relaxed text-center">
              Los 5 capítulos de esta serie son producto del proyecto Femmedia, con el objetivo de 
              exponer y reflexionar sobre las desigualdades, las condiciones laborales y la inseguridad 
              que enfrentan las mujeres periodistas en Ecuador. La propuesta audiovisual es uno de 
              los productos de una investigación realizada durante el 2024 por el Observatorio 
              Interuniversitario de Medios Ecuatorianos (OIME) y la carrera de periodismo USFQ con 
              el aval del Programa Internacional para el Desarrollo de la Comunicación (PIDC) de la 
              UNESCO.
            </p>
            <p className="text-brand-dark/70 text-sm md:text-base leading-relaxed text-center mt-6">
              La serie se estructura en 5 episodios, todos producidos en menos de 5 minutos en 
              formato vertical 9:16, diseñados para TikTok. Cada capítulo aborda un tema específico: <span className="font-semibold text-brand-primary">Desigualdades de género</span>, <span className="font-semibold text-brand-primary">Estereotipos de género</span>, <span className="font-semibold text-brand-primary">Maternidad</span>, <span className="font-semibold text-brand-primary">Representatividad Laboral</span> e <span className="font-semibold text-brand-primary">Inseguridad</span>.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 items-start overflow-visible">
            {serieVideos.map((video, index) => (
              <motion.div
                key={video.youtubeId + index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 + index * 0.03, duration: 0.2 }}
                whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
                className="flex flex-col items-center group"
              >
                <p className="mb-3 text-xs md:text-sm font-bold text-brand-primary text-center min-h-[2.5rem] flex items-center justify-center group-hover:text-brand-secondary transition-colors">
                  {video.title}
                </p>
                {/* Video container */}
                <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-black group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      title={video.title}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
