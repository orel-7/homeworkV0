"use client"

import { useAppContext } from "@/contexts/AppContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function HomeworkHistory() {
  const { state } = useAppContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle>היסטוריית שיעורי בית</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>מקצוע</TableHead>
              <TableHead>תיאור</TableHead>
              <TableHead>תאריך הגשה</TableHead>
              <TableHead>ספר</TableHead>
              <TableHead>עמוד</TableHead>
              <TableHead>סעיף</TableHead>
              <TableHead>הערות</TableHead>
              <TableHead>סטטוס</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.homeworkHistory.map((homework, index) => (
              <TableRow key={index}>
                <TableCell>{homework.subject}</TableCell>
                <TableCell>{homework.description}</TableCell>
                <TableCell>{homework.dueDate}</TableCell>
                <TableCell>{homework.book}</TableCell>
                <TableCell>{homework.page}</TableCell>
                <TableCell>{homework.section}</TableCell>
                <TableCell>{homework.notes}</TableCell>
                <TableCell>{homework.completed ? "הושלם" : "לא הושלם"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

