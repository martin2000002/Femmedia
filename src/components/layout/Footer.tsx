import logoUSFQ from '../../assets/external_logos/USFQ Blanco.png'
import logoUNESCO from '../../assets/external_logos/UNESCO.png'
import logoOIME from '../../assets/external_logos/OIME.png'
import logoFemmedia from '../../assets/logo/corto-negativo.png'

const partners = [
  { 
    name: 'UNESCO', 
    logo: logoUNESCO, 
    url: 'https://www.unesco.org/es/fieldoffice/quito' 
  },
  { 
    name: 'USFQ', 
    logo: logoUSFQ, 
    url: 'https://www.usfq.edu.ec/es' 
  },
  { 
    name: 'OIME', 
    logo: logoOIME, 
    url: null 
  },
]

export function Footer() {
  return (
    <footer className="bg-brand-dark">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side*/}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img 
              src={logoFemmedia} 
              alt="Femmedia" 
              className="h-6 w-auto object-contain"
            />
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} FEMMEDIA. Todos los derechos reservados.
            </p>
          </div>

          {/* Right side*/}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Nuestros Aliados
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              {partners.map((partner) => (
                partner.url ? (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200"
                    title={partner.name}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-6 md:h-8 w-auto object-contain filter brightness-0 invert"
                    />
                  </a>
                ) : (
                  <div
                    key={partner.name}
                    className="flex items-center justify-center opacity-60"
                    title={partner.name}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-6 md:h-8 w-auto object-contain filter brightness-0 invert"
                    />
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
