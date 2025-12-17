import { useState, useEffect } from 'react'
import { navItems } from '../../data/navigation'
import logoLargoNegativo from '../../assets/logo/largo-negativo.png'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-brand-primary py-2 ${
        isScrolled ? 'shadow-2xl' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <img
            src={logoLargoNegativo}
            alt="Femmedia Logo"
            className="h-10 w-auto object-contain transition-all duration-300 md:h-12"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                className={`group relative text-base font-bold transition-colors hover:text-brand-accent ${
                  activeSection === item.href ? 'text-brand-accent' : 'text-white'
                }`}
                href={item.href}
              >
                {item.label}
                <span 
                  className={`absolute -bottom-1.5 left-0 h-1 rounded-full bg-brand-accent transition-all duration-300 ${
                    activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-brand-primary shadow-xl md:hidden">
          <ul className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className={`relative inline-block text-lg font-bold transition-colors hover:text-brand-accent ${
                    activeSection === item.href ? 'text-brand-accent' : 'text-white'
                  }`}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-brand-accent transition-all duration-300 ${
                      activeSection === item.href ? 'w-full' : 'w-0'
                    }`} 
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
