"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimerProps {
  targetDate: Date
  label: string
}

function CountdownTimer({ targetDate, label }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft(`${days} ימים, ${hours} שעות, ${minutes} דקות, ${seconds} שניות`)
      } else {
        setTimeLeft("הזמן הגיע!")
        clearInterval(timer)
      }
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{timeLeft}</p>
      </CardContent>
    </Card>
  )
}

interface TimersProps {
  customTimers?: { name: string; date: Date }[]
}

export default function Timers({ customTimers = [] }: TimersProps) {
  const summerVacation = new Date(new Date().getFullYear(), 5, 20) // June 20th of current year
  const homeworkDue = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days from now

  return (
    <div className="space-y-4">
      <CountdownTimer targetDate={summerVacation} label="זמן עד החופש הגדול" />
      <CountdownTimer targetDate={homeworkDue} label="זמן עד הגשת שיעורי הבית" />
      {customTimers.map((timer, index) => (
        <CountdownTimer key={index} targetDate={timer.date} label={timer.name} />
      ))}
    </div>
  )
}

