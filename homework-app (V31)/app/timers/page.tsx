"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/Layout"
import Timers from "@/components/Timers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TimersPage() {
  const [customTimers, setCustomTimers] = useState([])
  const [newTimerName, setNewTimerName] = useState("")
  const [newTimerDate, setNewTimerDate] = useState("")

  const addCustomTimer = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTimerName && newTimerDate) {
      setCustomTimers([...customTimers, { name: newTimerName, date: new Date(newTimerDate) }])
      setNewTimerName("")
      setNewTimerDate("")
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">טיימרים</h1>
      <Timers customTimers={customTimers} />
      <form onSubmit={addCustomTimer} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="timerName">שם הטיימר</Label>
          <Input
            id="timerName"
            value={newTimerName}
            onChange={(e) => setNewTimerName(e.target.value)}
            placeholder="הכנס שם לטיימר"
          />
        </div>
        <div>
          <Label htmlFor="timerDate">תאריך יעד</Label>
          <Input id="timerDate" type="date" value={newTimerDate} onChange={(e) => setNewTimerDate(e.target.value)} />
        </div>
        <Button type="submit">הוסף טיימר</Button>
      </form>
    </Layout>
  )
}

