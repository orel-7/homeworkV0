"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Clock, Calendar, BookOpen, Settings, Search, Code, Book, History, LogIn, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "דף הבית", icon: Home },
  { href: "/timers", label: "טיימרים", icon: Clock },
  { href: "/weekly-view", label: "לוח שבועי", icon: Calendar },
  { href: "/schedule", label: "מערכת שעות", icon: BookOpen },
  { href: "/help-search", label: "חיפוש עזרה", icon: Search },
  { href: "/online-homework", label: "תרגול מקוון", icon: Code },
  { href: "/book-list", label: "רשימת ספרים", icon: Book },
  { href: "/homework-history", label: "היסטוריית שיעורי בית", icon: History },
  { href: "/login", label: "כניסה", icon: LogIn },
  { href: "/settings", label: "הגדרות", icon: Settings },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">ניהול לימודים</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-black hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center text-black hover:bg-gray-200 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 ml-2" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

