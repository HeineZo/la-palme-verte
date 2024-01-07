'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

/**
 * Fournit les providers de l'application (Theme, etc...)
 * @param children Contenu du site
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Analytics />
        {children}
      </NextUIProvider>
    </QueryClientProvider>
  );
}
