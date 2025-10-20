import './global.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './providers/theme-provider'
import ModalProvider from './providers/modal-provider'
import { AuthProvider } from '../contexts/AuthContext'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevQuest Portfolio',
  description: 'A playful portfolio with developer quizzes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
