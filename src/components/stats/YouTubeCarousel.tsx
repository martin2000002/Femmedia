import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import type { Video } from '../../data/provinces'

function getEmbedSrc(video: Video) {
  if (video.type === 'direct') {
    return `https://www.youtube.com/embed/${video.url}?rel=0&modestbranding=1`
  }

  const index = typeof video.playlistIndex === 'number' ? video.playlistIndex : 0
  return `https://www.youtube.com/embed/videoseries?list=${video.url}&index=${index}&rel=0&modestbranding=1`
}

export function YouTubeCarousel({ videos, activeKey }: { videos: Video[]; activeKey: string }) {
  const [index, setIndex] = useState(0)
  const prevKey = useRef(activeKey)

  useEffect(() => {
    if (prevKey.current !== activeKey) {
      prevKey.current = activeKey
      setIndex(0)
    }
  }, [activeKey])

  const safeIndex = videos.length === 0 ? 0 : Math.min(Math.max(index, 0), videos.length - 1)
  const current = videos[safeIndex]
  if (!current) return null

  const canNav = videos.length > 1

  function prev() {
    setIndex((i) => (i - 1 + videos.length) % videos.length)
  }

  function next() {
    setIndex((i) => (i + 1) % videos.length)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold text-brand-on-primary">Entrevistas</h3>
        {videos.length > 1 && (
          <span className="text-sm font-semibold text-brand-on-primary/70">
            {safeIndex + 1} / {videos.length}
          </span>
        )}
      </div>

      <div className="relative mt-3">
        {/* Video container */}
        <div className="overflow-hidden rounded-2xl bg-brand-surface shadow-lg">
          <div className="relative aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={getEmbedSrc(current)}
              title={current.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            {/* Navigation buttons */}
            {canNav && (
              <>
                <motion.button
                  type="button"
                  onClick={prev}
                  aria-label="Entrevista anterior"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="group absolute left-2 top-1/2 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-dark/50 text-brand-on-primary backdrop-blur-md transition-colors duration-200 hover:bg-brand-accent hover:text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={next}
                  aria-label="Siguiente entrevista"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="group absolute right-2 top-1/2 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-dark/50 text-brand-on-primary backdrop-blur-md transition-colors duration-200 hover:bg-brand-accent hover:text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}
          </div>
          <div className="px-4 py-3 text-sm font-semibold text-brand-dark">{current.title}</div>
        </div>
      </div>
    </div>
  )
}
