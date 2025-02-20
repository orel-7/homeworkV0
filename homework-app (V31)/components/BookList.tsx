"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAppContext } from "@/contexts/AppContext"

const subjects = ["מתמטיקה", "היסטוריה", "מדעים", "ספרות", "אנגלית", 'תנ"ך']
const grades = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב"]

interface Book {
  id: number
  subject: string
  grade: string
  title: string
  author: string
}

export default function BookList() {
  const { state, setState } = useAppContext()
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const addBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (subject && grade && title) {
      const newBook = { id: Date.now(), subject, grade, title, author }
      setState((prevState) => ({
        ...prevState,
        books: [...prevState.books, newBook],
      }))
      setSubject("")
      setGrade("")
      setTitle("")
      setAuthor("")
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addBook} className="space-y-4">
        <div>
          <Label htmlFor="subject">מקצוע</Label>
          <Select value={subject} onValueChange={setSubject}>
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
          <Label htmlFor="grade">כיתה</Label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger>
              <SelectValue placeholder="בחר כיתה" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="title">שם הספר</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="הכנס את שם הספר" />
        </div>
        <div>
          <Label htmlFor="author">מחבר</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="הכנס את שם המחבר"
          />
        </div>
        <Button type="submit">הוסף ספר</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>מקצוע</TableHead>
            <TableHead>כיתה</TableHead>
            <TableHead>שם הספר</TableHead>
            <TableHead>מחבר</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.books.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell>{book.subject}</TableCell>
              <TableCell>{book.grade}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

