import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GearHeads Hub - Car Enthusiast Community',
  description: 'Share your rides, connect with fellow gearheads, and find local meetups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
