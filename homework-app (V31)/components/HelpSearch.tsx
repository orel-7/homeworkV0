"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const resources = [
  { name: "המקפצה", url: "https://www.makpetza.org.il/", description: "אתר הלמידה הדיגיטלית של משרד החינוך" },
  { name: "ויקיפדיה", url: "https://he.wikipedia.org/", description: "האנציקלופדיה החופשית" },
  { name: "וולפרם אלפא", url: "https://www.wolframalpha.com/", description: "מנוע חישובי לפתרון בעיות מתמטיות" },
  { name: "מורפיקס", url: "https://www.morfix.co.il/", description: "מילון עברי-אנגלי מקוון" },
]

export default function HelpSearch() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically integrate with a search API
    console.log(`Searching for: ${query}`)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl">ברוכים הבאים לספריה הווירטואלית</CardTitle>
        </CardHeader>
        <CardContent>
          <p>כאן תוכלו למצוא מגוון רחב של משאבי למידה ומידע לעזרה בלימודים.</p>
        </CardContent>
      </Card>
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="הקלד את שאלתך כאן"
          className="flex-grow"
        />
        <Button type="submit">חפש</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card key={resource.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{resource.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{resource.description}</p>
              <Button asChild variant="outline">
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  בקר באתר
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

