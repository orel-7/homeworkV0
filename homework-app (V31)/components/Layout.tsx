import type React from "react"
import Navigation from "./Navigation"
import { AppProvider } from "@/contexts/AppContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </AppProvider>
  )
}

