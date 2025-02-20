"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/Layout"
import Schedule from "@/components/Schedule"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppContext } from "@/contexts/AppContext"

export default function SchedulePage() {
  const { state, setState } = useAppContext()
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [newClass, setNewClass] = useState({ day: "", time: "", subject: "", teacher: "", room: "", classmates: "" })

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault()
    setState((prevState) => ({
      ...prevState,
      schedule: [...prevState.schedule, newClass],
    }))
    setIsAddingClass(false)
    setNewClass({ day: "", time: "", subject: "", teacher: "", room: "", classmates: "" })
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">מערכת שעות</h1>
      <Schedule />
      <Dialog open={isAddingClass} onOpenChange={setIsAddingClass}>
        <DialogTrigger asChild>
          <Button className="mt-4">הוסף שיעור</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>הוסף שיעור חדש</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddClass} className="space-y-4">
            <div>
              <Label htmlFor="day">יום</Label>
              <Input
                id="day"
                value={newClass.day}
                onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                placeholder="יום בשבוע"
              />
            </div>
            <div>
              <Label htmlFor="time">שעה</Label>
              <Input
                id="time"
                value={newClass.time}
                onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                placeholder="שעת השיעור"
              />
            </div>
            <div>
              <Label htmlFor="subject">מקצוע</Label>
              <Input
                id="subject"
                value={newClass.subject}
                onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                placeholder="שם המקצוע"
              />
            </div>
            <div>
              <Label htmlFor="teacher">מורה</Label>
              <Input
                id="teacher"
                value={newClass.teacher}
                onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                placeholder="שם המורה"
              />
            </div>
            <div>
              <Label htmlFor="room">כיתה</Label>
              <Input
                id="room"
                value={newClass.room}
                onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                placeholder="מספר הכיתה"
              />
            </div>
            <div>
              <Label htmlFor="classmates">חברים לכיתה</Label>
              <Input
                id="classmates"
                value={newClass.classmates}
                onChange={(e) => setNewClass({ ...newClass, classmates: e.target.value })}
                placeholder="שמות החברים (מופרדים בפסיקים)"
              />
            </div>
            <Button type="submit">הוסף שיעור</Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

