import type { PropsWithChildren } from 'react'
import { Navbar } from './Navbar'

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-brand-surface text-brand-dark">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
