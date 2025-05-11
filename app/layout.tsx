import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pilipinas 2025',
  description: 'PiliPinas 2025 was created with a simple but powerful mission: to help Filipino voters make informed decisions by connecting them with candidates who share their values and priorities.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://pilipinas2025.vercel.app/',
  },
  twitter: {
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
