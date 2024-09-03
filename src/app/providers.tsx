import { NextUIProvider } from '@nextui-org/react';
import { Analytics } from '@vercel/analytics/react';

/**
 * Fournit les providers de l'application (Theme, etc...)
 * @param children Contenu du site
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <NextUIProvider>
        <Analytics />
        {children}
      </NextUIProvider>
  );
}
