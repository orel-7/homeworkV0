import Layout from "@/components/Layout"
import Clock from "@/components/Clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for daily tasks
const dailyTasks = [
  { id: 1, task: "השלם שיעורי בית במתמטיקה", completed: false },
  { id: 2, task: "קרא פרק בספר היסטוריה", completed: false },
  { id: 3, task: "תרגל אנגלית למשך 20 דקות", completed: false },
]

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">ברוכים הבאים</h1>
      <Clock />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>שיעורי בית להיום</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add logic to display today's homework */}
            <p>אין שיעורי בית להיום</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>משימות קרובות</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add logic to display upcoming tasks */}
            <p>אין משימות קרובות</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>סטטיסטיקות</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add statistics about completed homework, etc. */}
            <p>טרם הושלמו משימות</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>משימות יומיות</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {dailyTasks.map((task) => (
              <li key={task.id} className="flex items-center space-x-2">
                <Checkbox id={`task-${task.id}`} />
                <label htmlFor={`task-${task.id}`}>{task.task}</label>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Layout>
  )
}

