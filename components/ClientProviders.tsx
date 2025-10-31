'use client';

import AgeVerification from './AgeVerification';
import CookieConsent from './CookieConsent';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AgeVerification />
      <CookieConsent />
    </>
  );
}
