import type { Metadata } from 'next'
import './globals.css'
import {Toaster} from "sonner";
import {Head} from "next/document";

export const metadata: Metadata = {
  title: 'Pilipinas 2025',
  description: 'PiliPinas 2025 was created with a simple but powerful mission: to help Filipino voters make informed decisions by connecting them with candidates who share their values and priorities.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://pilipinas2025.vercel.app/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <head>
        {/* Google Analytics script */}
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-D7565NTJF8`}
        ></script>
        <script
            dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-D7565NTJF8');
              `,
            }}
        />
    </head>
      <body>{children}
      <Toaster />
      </body>
    </html>
  )
}
