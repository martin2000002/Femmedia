import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CircularProgressProps {
  percentage: number
  label: string
  sublabel?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'accent' | 'primary' | 'secondary'
}

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      setDisplayValue(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration, isInView])

  return <span ref={ref}>{displayValue}</span>
}

function CircularProgress({ percentage, label, sublabel, size = 'md', color = 'accent' }: CircularProgressProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const sizes = {
    sm: { container: 'w-24 h-24', text: 'text-xl', stroke: 6 },
    md: { container: 'w-32 h-32', text: 'text-2xl', stroke: 8 },
    lg: { container: 'w-40 h-40', text: 'text-3xl', stroke: 10 },
  }

  const colors = {
    accent: 'stroke-brand-accent',
    primary: 'stroke-brand-primary',
    secondary: 'stroke-brand-on-primary',
  }

  const textColors = {
    accent: 'text-brand-accent',
    primary: 'text-brand-primary',
    secondary: 'text-brand-on-primary',
  }

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center group cursor-default"
    >
      <div className={`${sizes[size].container} relative`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={sizes[size].stroke}
            className="text-brand-on-primary/20"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={sizes[size].stroke}
            strokeLinecap="round"
            className={colors[color]}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${sizes[size].text} font-black ${textColors[color]} drop-shadow group-hover:scale-110 transition-transform`}>
            <AnimatedNumber value={percentage} />%
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-brand-on-primary/90 text-center max-w-[140px] leading-tight">
        {label}
      </p>
      {sublabel && (
        <p className="mt-1 text-xs text-brand-on-primary/70 text-center max-w-[140px]">{sublabel}</p>
      )}
    </motion.div>
  )
}

interface BarStatProps {
  percentage: number
  label: string
  comparison?: { value: number; label: string }
  primaryLabel?: string
  variant?: 'default' | 'dark'
}

function BarStat({ percentage, label, comparison, primaryLabel = 'mujeres', variant = 'default' }: BarStatProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colors = variant === 'dark' 
    ? { 
        number: 'text-brand-primary', 
        bar: 'bg-brand-primary', 
        text: 'text-brand-dark/80',
        bgBar: 'bg-brand-dark/15',
        secondary: 'text-brand-secondary',
        secondaryBar: 'bg-brand-secondary'
      }
    : { 
        number: 'text-brand-accent', 
        bar: 'bg-brand-accent', 
        text: 'text-brand-on-primary/80',
        bgBar: 'bg-brand-on-primary/15',
        secondary: 'text-brand-on-primary',
        secondaryBar: 'bg-brand-on-primary'
      }

  if (comparison) {
    return (
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="mb-3 flex items-center justify-between">
          <h4 className={`text-base font-semibold ${colors.text}`}>{label}</h4>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 group">
            <span className={`min-w-[3.5rem] text-lg font-black ${colors.number} group-hover:scale-110 transition-transform`}>
              <AnimatedNumber value={percentage} />%
            </span>
            <div className={`flex-1 h-3 ${colors.bgBar} rounded-full overflow-hidden`}>
              <motion.div 
                className={`h-full ${colors.bar} rounded-full`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <span className={`text-xs ${colors.text} capitalize`}>{primaryLabel}</span>
          </div>
          <div className="flex items-center gap-3 group">
            <span className={`min-w-[3.5rem] text-lg font-black ${colors.secondary} group-hover:scale-110 transition-transform`}>
              <AnimatedNumber value={comparison.value} />%
            </span>
            <div className={`flex-1 h-3 ${colors.bgBar} rounded-full overflow-hidden`}>
              <motion.div 
                className={`h-full ${colors.secondaryBar} rounded-full`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${comparison.value}%` } : { width: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              />
            </div>
            <span className={`text-xs ${colors.text} capitalize`}>{comparison.label}</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full group"
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className={`text-3xl font-black ${colors.number} group-hover:scale-110 transition-transform origin-left`}>
          <AnimatedNumber value={percentage} />%
        </span>
        <span className={`text-sm ${colors.text} max-w-[260px] text-right`}>{label}</span>
      </div>
      <div className={`h-3 ${colors.bgBar} rounded-full overflow-hidden`}>
        <motion.div 
          className={`h-full ${colors.bar} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

 

export function StatsDisplay() {
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const section4Ref = useRef(null)
  
  const isSection1InView = useInView(section1Ref, { once: true, margin: '-100px' })
  const isSection2InView = useInView(section2Ref, { once: true, margin: '-100px' })
  const isSection3InView = useInView(section3Ref, { once: true, margin: '-100px' })
  const isSection4InView = useInView(section4Ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative mt-16 space-y-20 overflow-visible">

      {/* Section 1: Violencia y Acoso */}
      <motion.div
        ref={section1Ref}
        variants={containerVariants}
        initial="hidden"
        animate={isSection1InView ? 'visible' : 'hidden'}
        className="relative"
      >
        <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-brand-accent mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-brand-accent rounded-full" />
          Violencia y Acoso
        </motion.h3>
        
        {/* Main stat highlight */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative bg-brand-secondary/80 rounded-3xl p-8 mb-8 overflow-hidden"
        >
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <CircularProgress percentage={73} label="de mujeres periodistas ha sufrido violencia en línea" size="lg" />
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg text-brand-on-primary/90 font-medium">
                Dato Global <span className="font-bold text-brand-accent">UNESCO</span>
              </p>
              <p className="mt-2 text-sm text-brand-on-primary/70">
                Solo el <span className="font-bold text-brand-accent">25%</span> denunció los ataques a sus empleadores
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grid of circular stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <CircularProgress percentage={45} label="agresiones vía redes sociales" sublabel="Encuesta local" size="sm" />
          <CircularProgress percentage={55} label="agresiones presenciales" size="sm" color="secondary" />
          <CircularProgress percentage={33} label="ataques sobre cuerpo y vida sexual" size="sm" />
          <CircularProgress percentage={20} label="agredidas físicamente" size="sm" color="secondary" />
        </motion.div>

        {/* Violence in home subsection */}
        <motion.div variants={itemVariants} className="bg-brand-dark/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center cursor-default"
            >
              <span className="text-5xl font-black text-brand-accent">
                <AnimatedNumber value={38} />%
              </span>
              <p className="mt-2 text-sm text-brand-on-primary/90">dificultades por violencia de género en el hogar</p>
            </motion.div>
            <div className="h-px md:h-16 w-full md:w-px bg-brand-on-primary/20" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center cursor-default"
            >
              <span className="text-4xl font-black text-brand-on-primary">
                <AnimatedNumber value={46} />%
              </span>
              <p className="mt-2 text-sm text-brand-on-primary/90">sufrió violencia psicológica</p>
              <p className="text-xs text-brand-on-primary/60">de las víctimas de violencia en hogar</p>
            </motion.div>
            <div className="h-px md:h-16 w-full md:w-px bg-brand-on-primary/20" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center cursor-default"
            >
              <span className="text-4xl font-black text-brand-accent">6 de 11</span>
              <p className="mt-2 text-sm text-brand-on-primary/90">periodistas exiliados en 2023 fueron mujeres</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Section 2: Precariedad Laboral */}
      <motion.div
        ref={section2Ref}
        variants={containerVariants}
        initial="hidden"
        animate={isSection2InView ? 'visible' : 'hidden'}
        className="relative"
      >
        <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-brand-accent mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-brand-accent rounded-full" />
          Precariedad Laboral
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="bg-brand-secondary/60 rounded-3xl p-6 space-y-6">
            <BarStat 
              percentage={57} 
              label="sin relación de dependencia" 
              comparison={{ value: 52, label: 'hombres' }}
            />
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="bg-brand-accent/60 rounded-3xl p-6 space-y-6">
            <BarStat percentage={58} label="discriminación al acceder a trabajo" variant="dark" />
            <BarStat percentage={43} label="madres acosadas para que renuncien" variant="dark" />
          </motion.div>
        </div>
      </motion.div>

      {/* Section 3: Discriminación y Techos de Cristal */}
      <motion.div
        ref={section3Ref}
        variants={containerVariants}
        initial="hidden"
        animate={isSection3InView ? 'visible' : 'hidden'}
        className="relative"
      >
        <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-brand-accent mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-brand-accent rounded-full" />
          Discriminación y Techos de Cristal
        </motion.h3>

        {/* Glass ceiling visual */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} className="relative bg-brand-secondary/50 rounded-3xl p-8 overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-6xl md:text-7xl font-black text-brand-accent">
              <AnimatedNumber value={76} />%
            </span>
            <p className="mt-2 text-lg text-brand-on-primary font-medium">no ha accedido a directivas en gremios tradicionales</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-brand-dark/40 rounded-xl p-4 text-center cursor-default">
              <span className="text-3xl font-black text-brand-on-primary">
                <AnimatedNumber value={63} />%
              </span>
              <p className="text-xs text-brand-on-primary/80 mt-1">vicepresidencia</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-brand-dark/40 rounded-xl p-4 text-center cursor-default">
              <span className="text-3xl font-black text-brand-on-primary/70">
                <AnimatedNumber value={37} />%
              </span>
              <p className="text-xs text-brand-on-primary/80 mt-1">cargos bajos</p>
              <p className="text-xs text-brand-on-primary/60">(secretaria, vocal)</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Discrimination stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bg-brand-dark/30 rounded-2xl p-4 text-center cursor-default">
            <span className="text-3xl font-black text-brand-accent">
              <AnimatedNumber value={43} />%
            </span>
            <p className="text-xs text-brand-on-primary/80 mt-2">discriminada en su medio</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bg-brand-dark/30 rounded-2xl p-4 text-center cursor-default">
            <span className="text-3xl font-black text-brand-on-primary">
              <AnimatedNumber value={55} />%
            </span>
            <p className="text-xs text-brand-on-primary/80 mt-2">por sus fuentes</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bg-brand-dark/30 rounded-2xl p-4 text-center cursor-default">
            <span className="text-3xl font-black text-brand-accent">
              <AnimatedNumber value={32} />%
            </span>
            <p className="text-xs text-brand-on-primary/80 mt-2">por edad</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bg-brand-dark/30 rounded-2xl p-4 text-center cursor-default">
            <span className="text-3xl font-black text-brand-on-primary">
              <AnimatedNumber value={31} />%
            </span>
            <p className="text-xs text-brand-on-primary/80 mt-2">por género</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 4: Salud y Maternidad */}
      <motion.div
        ref={section4Ref}
        variants={containerVariants}
        initial="hidden"
        animate={isSection4InView ? 'visible' : 'hidden'}
        className="relative"
      >
        <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-brand-accent mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-brand-accent rounded-full" />
          Salud y Maternidad
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 80% stat */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="bg-brand-secondary/70 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
            <CircularProgress percentage={80} label="sin servicios de salud sexual o reproductiva" size="lg" />
          </motion.div>

          {/* 1 of 168 */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="bg-brand-accent/60 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
            <div className="relative">
              <span className="text-7xl font-black text-brand-primary">1</span>
              <span className="text-2xl font-bold text-brand-dark/60">/168</span>
            </div>
            <p className="mt-4 text-sm text-brand-dark/80">mujer cuenta con atención en salud mental por su empresa</p>
          </motion.div>

          {/* Other stats */}
          <div className="space-y-4">
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -3 }} className="bg-brand-dark/30 rounded-2xl p-4 text-center cursor-default">
              <span className="text-3xl font-black text-brand-on-primary">
                <AnimatedNumber value={14} />%
              </span>
              <p className="text-xs text-brand-on-primary/80 mt-2">dificultades por embarazo, parto o lactancia</p>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -3 }} className="bg-brand-dark/30 rounded-2xl p-4 text-center cursor-default">
              <span className="text-3xl font-black text-brand-accent">
                <AnimatedNumber value={56} />%
              </span>
              <p className="text-xs text-brand-on-primary/80 mt-2">depresión y aislamiento</p>
              <p className="text-xs text-brand-on-primary/60">víctimas de violencia doméstica</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
