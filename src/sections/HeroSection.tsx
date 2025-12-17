import { motion } from 'framer-motion'

import logoLargoPositivo from '../assets/logo/largo-positivo.png'
import journalistWomen from '../assets/journalist-women.jpg'

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[80vh] overflow-hidden bg-brand-surface flex items-center">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src={journalistWomen} 
          alt="Fondo Periodista" 
          className="h-full w-full object-cover grayscale"
        />
      </div>

      {/* Blob */}
      <div className="absolute -bottom-7 -right-20 w-[300px] h-[200px] md:w-[600px] md:h-[400px] pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <path 
            className="fill-brand-primary" 
            d="M397.32,223c12-20,20-21,29-22s24,3,36,4,15-3,19-8,4-23,4-30-15-71-10-92,23-26,27-28,39-17,43-18,21-9,51,1,37,36,39,45,36,159,40,214,11,116,5,159-19,83-35,105-59,45-115,53-164,11-212,8-205-18-230-21-57-5-69-27,41-76,41-76c0,0,7-12,29-22s74-7,74-7c0,0,21,5,38-11s15-56,25-76,35-34,35-34c0,0,5.62-10,37.81-13s45.44,16.21,69.82,17.11,40.37-20.11,42.37-38.11-21-30-23-50,9-33,9-33Z"
          />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center z-10 w-full">
        
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <img 
              src={logoLargoPositivo} 
              alt="Femmedia" 
              className="h-24 md:h-32 w-auto object-contain -ml-2"
            />
            
            <h1 className="font-display text-3xl font-extrabold leading-tight text-brand-primary md:text-4xl lg:text-5xl">
              Visibilizando las desigualdades de <span className="text-brand-secondary">mujeres periodistas</span> del Ecuador.
            </h1>
            
            <p className="max-w-xl text-lg font-medium text-brand-dark/80 leading-relaxed">
              Un proyecto académico y social respaldado por <span className="font-bold text-brand-primary">UNESCO</span>, <span className="font-bold text-brand-primary">USFQ</span>, <span className="font-bold text-brand-primary">OIME</span> y otros.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.a 
              href="#cifras"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-8 py-4 text-base font-bold text-white shadow-lg transition-colors duration-300 hover:bg-brand-secondary hover:shadow-xl"
            >
              Ver Cifras
            </motion.a>
            <motion.a 
              href="#conocenos"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl border-2 border-brand-primary bg-transparent px-8 py-4 text-base font-bold text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-white hover:shadow-xl"
            >
              Conócenos
            </motion.a>
          </div>
        </div>

        {/* Right Content - Empty now as the visual is absolute */}
        <div className="hidden md:block" />
      </div>
    </section>
  )
}
