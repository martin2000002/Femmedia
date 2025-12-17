import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CustomDatePickerProps {
  label: string
  name?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

// Parse dd/mm/aaaa to Date
function parseDisplayDate(str: string): Date | null {
  const parts = str.split('/')
  if (parts.length !== 3) return null
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 2100) return null
  const date = new Date(year, month, day)
  if (date.getDate() !== day) return null // Invalid day for month
  return date
}

// Format Date to dd/mm/aaaa
function formatToDisplay(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Format Date to ISO yyyy-mm-dd
function formatToISO(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function CustomDatePicker({
  label,
  value,
  onChange,
  required = false,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  // Sync input value with external value
  useEffect(() => {
    if (value) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        setInputValue(formatToDisplay(date))
      }
    } else {
      setInputValue('')
    }
  }, [value])

  const parsedDate = value ? new Date(value) : null

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  
  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  function selectDate(day: number) {
    const date = new Date(viewYear, viewMonth, day)
    onChange(formatToISO(date))
    setIsOpen(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setInputValue(newValue)
    
    // Try to parse the date
    const parsed = parseDisplayDate(newValue)
    if (parsed) {
      onChange(formatToISO(parsed))
      setViewYear(parsed.getFullYear())
      setViewMonth(parsed.getMonth())
    } else if (newValue === '') {
      onChange('')
    }
  }

  function handleInputBlur() {
    // If input doesn't match current value, reset it
    if (value) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        setInputValue(formatToDisplay(date))
      }
    } else {
      setInputValue('')
    }
  }

  function isSelected(day: number) {
    if (!parsedDate) return false
    return (
      parsedDate.getDate() === day &&
      parsedDate.getMonth() === viewMonth &&
      parsedDate.getFullYear() === viewYear
    )
  }

  function isToday(day: number) {
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-semibold text-brand-dark mb-2">
        {label} {required && <span className="text-brand-secondary">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder="dd/mm/aaaa"
          className="w-full px-4 py-3.5 rounded-xl border-2 border-brand-light bg-white hover:border-brand-secondary/50 focus:border-brand-secondary focus:outline-none transition-all duration-200 pr-12"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-secondary hover:text-brand-primary transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 bg-white rounded-xl shadow-xl border border-brand-light overflow-hidden p-4 w-72 md:w-80"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-brand-secondary/10 transition-colors"
              >
                <svg className="w-5 h-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-bold text-brand-dark">
                {months[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-brand-secondary/10 transition-colors"
              >
                <svg className="w-5 h-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-brand-dark/60 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day !== null ? (
                    <button
                      type="button"
                      onClick={() => selectDate(day)}
                      className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-150 hover:scale-110 ${
                        isSelected(day)
                          ? 'bg-brand-secondary text-white'
                          : isToday(day)
                          ? 'bg-brand-secondary/20 text-brand-secondary'
                          : 'hover:bg-brand-secondary/10 text-brand-dark'
                      }`}
                    >
                      {day}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="mt-4 pt-3 border-t border-brand-light flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange(formatToISO(today))
                  setIsOpen(false)
                }}
                className="flex-1 py-2 text-sm font-semibold text-brand-secondary hover:bg-brand-secondary/10 rounded-lg transition-colors"
              >
                Hoy
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                }}
                className="flex-1 py-2 text-sm font-semibold text-brand-dark/60 hover:bg-brand-dark/5 rounded-lg transition-colors"
              >
                Limpiar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
