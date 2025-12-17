import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function ConocenosSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const },
    },
  }

  return (
    <section id="conocenos" className="scroll-mt-20 relative overflow-hidden bg-brand-primary">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-24 md:py-32"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-wide">
            Conócenos
          </h2>
        </motion.div>

        <div className="space-y-8 lg:space-y-12">
          {/* Section 1*/}
          <motion.div 
            variants={itemVariants}
            className="flex justify-start"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 w-full lg:w-[85%]">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                ¿Quiénes somos?
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-brand-accent">Femmedia</span> es una iniciativa de investigación y divulgación periodística ejecutada por la{' '}
                <span className="font-semibold text-brand-accent">Universidad San Francisco de Quito (USFQ)</span> y el{' '}
                <span className="font-semibold text-brand-accent">Observatorio Interuniversitario de Medios Ecuatorianos (OIME)</span>. 
                Este proyecto cuenta con el aval y articulación de esfuerzos de la{' '}
                <span className="font-semibold text-brand-accent">UNESCO</span> para investigar la seguridad de las mujeres periodistas.
              </p>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-end"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 w-full lg:w-[85%]">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Nuestro Objetivo
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Nuestro trabajo se centra en generar <span className="font-bold text-brand-accent">"Cifras Violetas"</span>: 
                datos con enfoque de género sobre las múltiples violencias que ocurren en el territorio ecuatoriano. 
                Buscamos profundizar en las relaciones laborales de las mujeres periodistas y visibilizar sus condiciones 
                de seguridad y precariedad.
              </p>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-start"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 w-full lg:w-[85%]">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Origen y Contexto
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                El proyecto inició en <span className="font-semibold text-brand-accent">febrero de 2024</span> y se lanzó oficialmente el{' '}
                <span className="font-semibold text-brand-accent">27 de marzo</span> durante el espacio de diálogo sobre{' '}
                <em>"Violencias múltiples alrededor de lo comunicacional"</em>. Surge ante la necesidad de combatir la 
                creciente violencia en línea y fuera de línea, que incluye estigmatización, discurso de odio y agresiones 
                físicas contra la prensa femenina.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
