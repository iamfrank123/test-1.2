import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pentagramma - Interactive MIDI Piano Trainer',
    description: 'Learn piano with real-time MIDI feedback and digital sheet music',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="it">
            <body>{children}</body>
        </html>
    )
}
