import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "The Movies Database Project",
  description: "Interface de Exploração de Filmes e Séries",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "font-sans antialiased",
        geistHeading.variable, // Aplica a variável de fonte para títulos
        inter.variable, // Aplica a variável de fonte padrão
        fontMono.variable // Aplica a variável de fonte mono
      )}
      suppressHydrationWarning // Necessário para o ThemeProvider gerenciar estado sem warning inicial
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
