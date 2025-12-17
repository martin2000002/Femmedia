import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import womanPointing from '../assets/woman-pointing.png'
import { protocols } from '../data/protocols'
import { provinciasOptions, tipoAgresionOptions } from '../data/formOptions'
import { CustomSelect } from '../components/ui/CustomSelect'
import { CustomDatePicker } from '../components/ui/CustomDatePicker'

const immediateSteps = [
  {
    title: 'Denuncia Pública',
    description: 'Rompe el silencio. Es fundamental denunciar públicamente los ataques utilizando tus redes sociales y espacios en medios de comunicación. Hacerlo no solo expone al agresor, sino que ayuda a visibilizar la magnitud de la violencia que enfrentan las periodistas.',
  },
  {
    title: 'Guarda Evidencia',
    description: 'Documenta todo antes de bloquear. Debes registrar y acumular evidencia de cada incidente. Asegúrate de tomar y guardar pantallazos (capturas de pantalla) de los mensajes, comentarios ofensivos o amenazas digitales para tener un respaldo de la agresión.',
  },
  {
    title: 'Red de Apoyo',
    description: 'No enfrentes la situación sola. Es vital coordinar y reunirse con colegas del gremio. Activar estas redes de apoyo permite dar un seguimiento conjunto a los casos y generar estrategias de protección mutua ante la inseguridad.',
  },
]

export function ActionsSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    provincia: '',
    tipoAgresion: '',
    descripcion: '',
    fecha: '',
    anonimo: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isFormInView = useInView(formRef, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Reporte enviado:', formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section id="acciones" className="scroll-mt-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-1 z-20 rotate-180">
        <svg viewBox="0 0 1440 120" className="block w-full h-auto" preserveAspectRatio="none">
          <path
            fill="var(--color-brand-surface)"
            d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="relative bg-brand-accent pt-24 pb-32">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative z-10 mx-auto w-full max-w-7xl px-6"
        >
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-brand-primary drop-shadow-md"
          >
            Acciones
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 font-display text-2xl md:text-3xl lg:text-4xl font-bold text-brand-secondary leading-tight"
          >
            NO TE QUEDES CALLADA
          </motion.p>

          {/* Actions + Woman Image Row */}
          <div className="mt-10 flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Actions Card */}
            <motion.div
              variants={itemVariants}
              className="flex-1 bg-brand-secondary rounded-3xl p-6 md:p-8 text-white shadow-xl"
            >
              <div className="space-y-8">
                {immediateSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
                    className="group"
                  >
                    <h4 className="font-bold text-xl md:text-2xl mb-2 group-hover:text-brand-accent transition-colors">{step.title}</h4>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex-shrink-0 lg:w-72 xl:w-80 flex items-stretch"
            >
              <img
                src={womanPointing}
                alt="Mujer periodista"
                className="w-full h-full object-cover object-top rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>

          {/* Protocols */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-primary text-center mb-8">
              Descarga los Protocolos
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto overflow-visible">
              {protocols.map((protocol, index) => (
                <motion.a
                  key={protocol.lang}
                  href={protocol.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/0 to-brand-primary/0 group-hover:from-brand-secondary/5 group-hover:to-brand-primary/10 transition-all duration-500" />

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 right-4 bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full"
                  >
                    {protocol.lang}
                  </motion.div>

                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative w-14 h-14 bg-brand-light/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors"
                  >
                    <svg
                      className="w-8 h-8 text-brand-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </motion.div>

                  <h4 className="relative font-bold text-lg text-brand-dark group-hover:text-brand-primary transition-colors">
                    {protocol.title}
                  </h4>
                  <p className="relative text-brand-dark/60 text-sm mt-1">{protocol.subtitle}</p>

                  <div className="relative flex items-center gap-2 mt-4 text-brand-secondary text-sm font-medium">
                    <span>Ver protocolo</span>
                    <motion.svg
                      className="w-4 h-4"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </motion.svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Report Form */}
          <motion.div ref={formRef} className="mt-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-brand-primary text-center mb-4"
            >
              REPORTA TU CASO
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center text-brand-dark/70 mb-10 max-w-xl mx-auto"
            >
              Tu voz importa. Comparte tu experiencia para documentar y visibilizar la violencia contra periodistas.
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/90 backdrop-blur-sm border-2 border-brand-secondary rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h4 className="text-2xl font-bold text-brand-primary mb-2">¡Gracias por reportar!</h4>
                <p className="text-brand-dark/70">Tu caso ha sido registrado. Nos pondremos en contacto contigo pronto.</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl max-w-3xl mx-auto"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-brand-dark mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-brand-light bg-white focus:border-brand-secondary focus:outline-none transition-all duration-200 hover:border-brand-secondary/50"
                      placeholder="Tu nombre"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-brand-light bg-white focus:border-brand-secondary focus:outline-none transition-all duration-200 hover:border-brand-secondary/50"
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Province */}
                  <CustomSelect
                    label="Provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={(value) => setFormData((prev) => ({ ...prev, provincia: value }))}
                    options={provinciasOptions}
                  />

                  {/* Type of Aggression */}
                  <CustomSelect
                    label="Tipo de agresión"
                    name="tipoAgresion"
                    value={formData.tipoAgresion}
                    onChange={(value) => setFormData((prev) => ({ ...prev, tipoAgresion: value }))}
                    options={tipoAgresionOptions}
                    required
                  />

                  {/* Date */}
                  <div className="md:col-span-2">
                    <CustomDatePicker
                      label="Fecha aproximada del incidente"
                      value={formData.fecha}
                      onChange={(value) => setFormData((prev) => ({ ...prev, fecha: value }))}
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label htmlFor="descripcion" className="block text-sm font-semibold text-brand-dark mb-2">
                      Descripción del caso *
                    </label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-brand-light bg-white focus:border-brand-secondary focus:outline-none transition-all duration-200 resize-none hover:border-brand-secondary/50"
                      placeholder="Describe lo que sucedió..."
                    />
                  </div>

                  {/* Anonymous */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="anonimo"
                          checked={formData.anonimo}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-6 h-6 rounded-lg border-2 border-brand-light peer-checked:border-brand-secondary peer-checked:bg-brand-secondary transition-all duration-200 flex items-center justify-center group-hover:border-brand-secondary/50">
                          {formData.anonimo && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-brand-dark/80">Deseo mantener mi identidad anónima</span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Enviar Reporte
                </motion.button>

                <p className="mt-4 text-xs text-center text-brand-dark/50">
                  Tu información será tratada con confidencialidad. Solo será utilizada para documentar y dar seguimiento
                  a los casos.
                </p>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-20">
        <svg viewBox="0 0 1440 120" className="block w-full h-auto" preserveAspectRatio="none">
          <path
            fill="var(--color-brand-primary)"
            d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  )
}
