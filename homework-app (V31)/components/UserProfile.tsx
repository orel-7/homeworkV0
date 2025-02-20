"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UserProfile() {
  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [grade, setGrade] = useState("")
  const [track, setTrack] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to a server
    console.log({ name, school, grade, track })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="name">שם התלמיד</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="הכנס את שמך" />
      </div>
      <div>
        <Label htmlFor="school">שם בית הספר</Label>
        <Input
          id="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="הכנס את שם בית הספר"
        />
      </div>
      <div>
        <Label htmlFor="grade">כיתה</Label>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger>
            <SelectValue placeholder="בחר כיתה" />
          </SelectTrigger>
          <SelectContent>
            {["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב"].map((g) => (
              <SelectItem key={g} value={g}>{`כיתה ${g}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="track">מגמה</Label>
        <Input id="track" value={track} onChange={(e) => setTrack(e.target.value)} placeholder="הכנס את המגמה שלך" />
      </div>
      <Button type="submit">שמור פרטים</Button>
    </form>
  )
}

