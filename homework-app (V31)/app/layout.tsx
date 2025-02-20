import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppProvider } from "@/contexts/AppContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "אפליקציית ניהול לימודים",
  description: "נהל את הלימודים שלך בקלות",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}



import './globals.css'