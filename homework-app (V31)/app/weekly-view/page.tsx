"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import WeeklyView from "@/components/WeeklyView"
import AddHomeworkForm from "@/components/AddHomeworkForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function WeeklyViewPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Adjust when day is sunday
    return new Date(today.setDate(diff))
  })

  const moveWeek = (direction: number) => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + direction * 7)
    setCurrentWeekStart(newDate)
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">לוח שבועי</h1>
        <div className="space-x-2">
          <Button onClick={() => moveWeek(-1)}>שבוע קודם</Button>
          <Button onClick={() => moveWeek(1)}>שבוע הבא</Button>
        </div>
      </div>
      <WeeklyView startDate={currentWeekStart} />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">הוסף שיעורי בית</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>הוסף שיעורי בית חדשים</DialogTitle>
          </DialogHeader>
          <AddHomeworkForm />
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

