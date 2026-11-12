import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '59 Saniyede Ülke Gündemi | Hızlı Haber ve Canlı Özet Bülteni',
  description: 'Türkiye ve dünya gündemini 59 saniyede hızlıca kaydırarak, sesli ve görsel özetle takip edebileceğiniz modern haber akışı.',
  openGraph: {
    title: '59 Saniyede Ülke Gündemi | Hızlı Haber ve Canlı Özet',
    description: 'Türkiye ve dünya gündemini 59 saniyede hızlıca kaydırarak, sesli ve görsel özetle takip edebileceğiniz modern haber akışı.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '59 Saniyede Ülke Gündemi',
    description: 'Türkiye ve dünya gündemini 59 saniyede sesli ve görsel özetle takip edin.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-rose-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
