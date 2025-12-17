export type NavItem = {
  label: string
  href: `#${string}`
}

export const navItems: NavItem[] = [
  { label: 'Cifras', href: '#cifras' },
  { label: 'Serie', href: '#serie' },
  { label: 'Acciones', href: '#acciones' },
  { label: 'Conócenos', href: '#conocenos' },
]

export type HiddenRoute = {
  path: string
  redirect: string
}

export const hiddenRoutes: HiddenRoute[] = [
  {
    path: '/presentation',
    redirect:
      'https://docs.google.com/presentation/d/1mDynHK_4SLYGhXCsCL5d7u6ZyjQ9UfQBAnCEvIIQsOU/edit?usp=sharing',
  },
]
