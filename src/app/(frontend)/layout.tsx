import React from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  description: 'El Koffee serves warm coffee moments with carefully crafted espresso drinks.',
  title: 'El Koffee',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
