'use client';
import { AuthProvider } from '@/context/AuthContext';
import { SmsProvider } from '@/context/SmsContext';
import { PropsWithChildren, useState } from 'react';

export default function SmsLayout({ children }: PropsWithChildren) {
  const [activeNumber, setActiveNumber] = useState<number | undefined>();

  return (
    <main className="h-screen">
      <div className="container">
        <AuthProvider>
          <SmsProvider>{children}</SmsProvider>
        </AuthProvider>
      </div>
    </main>
  );
}
