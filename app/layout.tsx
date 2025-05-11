import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pilipinas 2025',
  description: 'Pilipinas 2025',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://pilipinas2025.vercel.app/',
  },
  twitter: {
    handle: '@james_j_m',
    cardType: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
