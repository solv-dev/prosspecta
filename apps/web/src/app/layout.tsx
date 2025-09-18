import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from './providers'

const titilliumWeb = Montserrat({
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Prosspecta | Run your CRM smarter',
    template: '%s | Prosspecta',
  },
  description:
    'Intelligent CRM with advanced AI features for sales automation, automatic prospecting, predictive analysis, and optimized lead management.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${titilliumWeb.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
