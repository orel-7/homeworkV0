"use client"

import { useState, useEffect } from "react"

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = time.getHours()
    if (hour < 12) return "בוקר טוב!"
    if (hour < 18) return "צהריים טובים!"
    return "ערב טוב!"
  }

  return (
    <div className="text-center">
      <p className="text-2xl font-bold">{time.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>
      <p className="text-xl">{getGreeting()}</p>
    </div>
  )
}

