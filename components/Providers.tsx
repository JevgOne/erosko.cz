'use client';

import { SessionProvider } from 'next-auth/react';
import AgeVerification from './AgeVerification';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AgeVerification />
      {children}
    </SessionProvider>
  );
}
