"use client"

import React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/contexts/AppContext"

interface ClassSchedule {
  day: string
  time: string
  subject: string
  teacher: string
  room: string
  classmates: string
}

const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"]

export default function Schedule() {
  const { state, setState } = useAppContext()
  const [isLocked, setIsLocked] = useState(false)

  const addClassToSchedule = (newClass: ClassSchedule) => {
    if (!isLocked) {
      setState((prevState) => ({
        ...prevState,
        schedule: [...prevState.schedule, newClass],
      }))
    }
  }

  const toggleLock = () => {
    setIsLocked(!isLocked)
  }

  return (
    <div>
      <Button onClick={toggleLock} className="mb-4">
        {isLocked ? "בטל נעילת מערכת השעות" : "נעל מערכת השעות"}
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>יום</TableHead>
            <TableHead>שעה</TableHead>
            <TableHead>מקצוע</TableHead>
            <TableHead>מורה</TableHead>
            <TableHead>כיתה</TableHead>
            <TableHead>חברים</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {daysOfWeek.map((day) => (
            <TableRow key={day}>
              <TableCell className="font-medium">{day}</TableCell>
              {state.schedule
                .filter((cls: ClassSchedule) => cls.day === day)
                .map((cls: ClassSchedule, index: number) => (
                  <React.Fragment key={index}>
                    <TableCell>{cls.time}</TableCell>
                    <TableCell>{cls.subject}</TableCell>
                    <TableCell>{cls.teacher}</TableCell>
                    <TableCell>{cls.room}</TableCell>
                    <TableCell>{cls.classmates}</TableCell>
                  </React.Fragment>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

