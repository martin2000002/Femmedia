import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import { EcuadorMap } from '../components/stats/EcuadorMap'
import { StatsDisplay } from '../components/stats/StatsDisplay'
import { YouTubeCarousel } from '../components/stats/YouTubeCarousel'
import { provincesData } from '../data/provinces'

export function StatsSection() {
  const [selectedId, setSelectedId] = useState<string>('ECP')
  const [fallbackName, setFallbackName] = useState<string | undefined>(undefined)

  const selected = provincesData[selectedId]

  const provinceName = selected?.name ?? fallbackName ?? selectedId
  const alerts = selected?.alerts ?? 0
  const videos = selected?.videos ?? []

  const onSelect = useMemo(
    () => (provinceId: string, provinceNameFromSvg?: string) => {
      setSelectedId(provinceId)
      setFallbackName(provinceNameFromSvg)
    },
    [],
  )

  return (
    <section
      id="cifras"
      className="relative scroll-mt-20 bg-brand-primary"
    >

      {/* Decorative wave at bottom */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-20">
        <svg viewBox="0 0 1440 120" className="block w-full h-auto" preserveAspectRatio="none">
          <path
            fill="var(--color-brand-surface)"
            d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 pb-40">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-brand-accent drop-shadow-md">
          Cifras
        </h2>
        <p className="mt-2 text-lg text-brand-on-primary/90">
          Estas son algunas de las alertas de agresiones en provincias del Ecuador
        </p>

        <motion.div 
          className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1fr]"
          layout="position"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Map */}
          <motion.div layout="position" className="flex justify-center p-4">
            <EcuadorMap selectedId={selectedId} onSelect={onSelect} className="w-full max-w-md" />
          </motion.div>

          {/* Province card*/}
          <div className="rounded-3xl bg-brand-secondary p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-extrabold text-brand-on-primary drop-shadow">{provinceName}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-brand-accent drop-shadow-lg">{alerts}</span>
                  <span className="text-xl font-bold text-brand-on-primary/90">alertas</span>
                </div>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-on-primary/20 text-3xl font-bold text-brand-on-primary">
                !
              </span>
            </div>

            {videos.length > 0 && (
              <div className="mt-8">
                <YouTubeCarousel videos={videos} activeKey={selectedId} />
              </div>
            )}
          </div>
        </motion.div>

        <StatsDisplay />
      </div>
    </section>
  )
}
