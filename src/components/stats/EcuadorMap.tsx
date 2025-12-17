import { useEffect, useRef, useState } from 'react'

import ecuadorSvgUrl from '../../assets/maps/ec-cropped.svg?url'

type ProvinceSelectHandler = (provinceId: string, provinceName?: string) => void

export function EcuadorMap({
  selectedId,
  onSelect,
  className = '',
}: {
  selectedId: string
  onSelect: ProvinceSelectHandler
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [svgText, setSvgText] = useState<string>('')
  const prevSelectedIdRef = useRef<string>(selectedId)

  useEffect(() => {
    let isActive = true

    async function loadSvg() {
      const res = await fetch(ecuadorSvgUrl)
      const text = await res.text()
      if (!isActive) return
      setSvgText(text)
    }

    loadSvg().catch(() => {
      if (!isActive) return
      setSvgText('')
    })

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const svg = root.querySelector('svg')
    if (!svg) return

    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    const provincePaths = Array.from(svg.querySelectorAll<SVGPathElement>('#features path[id]'))
    const featuresGroup = svg.querySelector('#features')

    for (const p of provincePaths) {
      p.classList.add('is-interactive')
    }

    const prevSelectedId = prevSelectedIdRef.current

    for (const p of provincePaths) {
      p.classList.remove('is-deselecting')
    }

    if (prevSelectedId && prevSelectedId !== selectedId) {
      const prevPath = provincePaths.find(p => p.getAttribute('id') === prevSelectedId)
      if (prevPath) {
        prevPath.classList.add('is-deselecting')
        setTimeout(() => {
          prevPath.classList.remove('is-deselecting')
        }, 500)
      }
    }

    for (const p of provincePaths) {
      const id = p.getAttribute('id') || ''
      const isSelected = id === selectedId
      p.classList.toggle('is-selected', isSelected)
    }

    prevSelectedIdRef.current = selectedId

    const selectedPath = provincePaths.find(p => p.getAttribute('id') === selectedId)
    if (selectedPath && featuresGroup) {
      featuresGroup.appendChild(selectedPath)
    }

    function handleClick(ev: Event) {
      const target = ev.currentTarget as SVGPathElement
      const id = target.getAttribute('id')
      if (!id) return
      const name = target.getAttribute('name') || undefined
      onSelect(id, name)
    }

    function handleKeyDown(ev: KeyboardEvent) {
      if (ev.key !== 'Enter' && ev.key !== ' ') return
      ev.preventDefault()
      const target = ev.currentTarget as SVGPathElement
      const id = target.getAttribute('id')
      if (!id) return
      const name = target.getAttribute('name') || undefined
      onSelect(id, name)
    }

    for (const p of provincePaths) {
      p.setAttribute('tabindex', '0')
      p.setAttribute('role', 'button')
      p.setAttribute('aria-label', p.getAttribute('name') || p.getAttribute('id') || 'Provincia')
      p.addEventListener('click', handleClick)
      p.addEventListener('keydown', handleKeyDown)
    }

    const labelPoints = svg.querySelector('#label_points') as SVGGElement | null
    if (labelPoints) {
      ;(labelPoints as unknown as HTMLElement).style.pointerEvents = 'none'
    }

    return () => {
      for (const p of provincePaths) {
        p.removeEventListener('click', handleClick)
        p.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [onSelect, selectedId, svgText])

  return (
    <div
      className={`ecuador-map ${className}`.trim()}
      ref={containerRef}
      aria-label="Mapa del Ecuador"
    >
      {svgText ? (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: svgText }} />
      ) : (
        <div className="rounded-2xl border border-brand-gray/30 bg-brand-surface p-6 text-sm text-brand-dark/70">
          Cargando mapa…
        </div>
      )}
    </div>
  )
}
