'use client'

import {NextUIProvider} from '@nextui-org/react'

/**
 * Fournit les providers de l'application (Theme, etc...)
 * @param children Contenu du site
 */
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}