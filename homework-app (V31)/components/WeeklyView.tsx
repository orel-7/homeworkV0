"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AddHomeworkForm from "./AddHomeworkForm"
import { useAppContext } from "@/contexts/AppContext"
import { supabase } from "@/lib/supabase"

interface HomeworkItem {
  id: string
  subject: string
  description: string
  dueDate: string
  book: string
  page: string
  section: string
  notes: string
  completed: boolean
}

interface WeeklyViewProps {
  startDate?: Date
}

export default function WeeklyView({ startDate }: WeeklyViewProps) {
  const { state, setState } = useAppContext()
  const [isAddHomeworkOpen, setIsAddHomeworkOpen] = useState(false)

  useEffect(() => {
    fetchHomework()
  }, [])

  const fetchHomework = async () => {
    try {
      const { data, error } = await supabase.from("homework_history").select("*").order("dueDate", { ascending: true })

      if (error) throw error

      setState((prevState) => ({ ...prevState, homeworkHistory: data || [] }))
    } catch (error) {
      console.error("Error fetching homework:", error)
    }
  }

  const toggleCompleted = async (id: string) => {
    const updatedHomework = state.homeworkHistory.map((item: HomeworkItem) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    )

    try {
      const itemToUpdate = updatedHomework.find((item: HomeworkItem) => item.id === id)
      const { error } = await supabase
        .from("homework_history")
        .update({ completed: itemToUpdate?.completed })
        .eq("id", id)

      if (error) throw error

      setState((prevState) => ({ ...prevState, homeworkHistory: updatedHomework }))
    } catch (error) {
      console.error("Error updating homework:", error)
    }
  }

  const deleteHomework = async (id: string) => {
    try {
      const { error } = await supabase.from("homework_history").delete().eq("id", id)

      if (error) throw error

      setState((prevState) => ({
        ...prevState,
        homeworkHistory: prevState.homeworkHistory.filter((item: HomeworkItem) => item.id !== id),
      }))
    } catch (error) {
      console.error("Error deleting homework:", error)
    }
  }

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate || new Date())
    date.setDate(date.getDate() + i)
    return date
  })

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">לוח שבועי</h2>
        <Dialog open={isAddHomeworkOpen} onOpenChange={setIsAddHomeworkOpen}>
          <DialogTrigger asChild>
            <Button>הוסף שיעורי בית</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>הוסף שיעורי בית חדשים</DialogTitle>
            </DialogHeader>
            <AddHomeworkForm onClose={() => setIsAddHomeworkOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <Card key={formatDate(day)}>
            <CardHeader>
              <CardTitle>
                {day.toLocaleDateString("he-IL", { weekday: "long", month: "long", day: "numeric" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.homeworkHistory
                .filter((item: HomeworkItem) => item.dueDate === formatDate(day))
                .map((item: HomeworkItem) => (
                  <div key={item.id} className="mb-2 p-2 bg-gray-100 rounded flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox checked={item.completed} onCheckedChange={() => toggleCompleted(item.id)} />
                        <div className={item.completed ? "line-through" : ""}>
                          <p className="font-semibold">{item.subject}</p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteHomework(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {(item.book || item.page || item.section) && (
                      <div className="mt-2 text-sm text-gray-600">
                        {item.book && <p>ספר: {item.book}</p>}
                        {item.page && <p>עמוד: {item.page}</p>}
                        {item.section && <p>סעיף: {item.section}</p>}
                      </div>
                    )}
                    {item.notes && <p className="mt-2 text-sm text-gray-600">הערות: {item.notes}</p>}
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

