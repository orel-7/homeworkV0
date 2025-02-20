"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAppContext } from "@/contexts/AppContext"
import { supabase } from "@/lib/supabase"

const subjects = ["מתמטיקה", "היסטוריה", "מדעים", "ספרות", "אנגלית", 'תנ"ך']

export default function AddHomeworkForm({ onClose }: { onClose: () => void }) {
  const { state, setState } = useAppContext()
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [book, setBook] = useState("")
  const [page, setPage] = useState("")
  const [section, setSection] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newHomework = {
      id: Date.now().toString(),
      subject,
      description,
      dueDate,
      book,
      page,
      section,
      notes,
      completed: false,
    }

    try {
      const { data, error } = await supabase.from("homework_history").insert([newHomework]).select()

      if (error) throw error

      setState((prevState) => ({
        ...prevState,
        homeworkHistory: [...prevState.homeworkHistory, newHomework],
      }))

      // Reset form
      setSubject("")
      setDescription("")
      setDueDate("")
      setBook("")
      setPage("")
      setSection("")
      setNotes("")

      onClose()
    } catch (error) {
      console.error("Error adding homework:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="subject">מקצוע</Label>
        <Select value={subject} onValueChange={setSubject} required>
          <SelectTrigger>
            <SelectValue placeholder="בחר מקצוע" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subj) => (
              <SelectItem key={subj} value={subj}>
                {subj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">תיאור המטלה</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="תאר את המטלה"
        />
      </div>
      <div>
        <Label htmlFor="dueDate">תאריך הגשה</Label>
        <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="book">ספר לימוד</Label>
        <Input id="book" value={book} onChange={(e) => setBook(e.target.value)} placeholder="שם הספר" />
      </div>
      <div>
        <Label htmlFor="page">עמוד</Label>
        <Input id="page" value={page} onChange={(e) => setPage(e.target.value)} placeholder="מספר עמוד" />
      </div>
      <div>
        <Label htmlFor="section">סעיף</Label>
        <Input
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          placeholder="מספר סעיף או שאלה"
        />
      </div>
      <div>
        <Label htmlFor="notes">הערות מיוחדות</Label>
        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="הערות נוספות" />
      </div>
      <Button type="submit">הוסף שיעורי בית</Button>
    </form>
  )
}

