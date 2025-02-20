import Layout from "@/components/Layout"
import HomeworkHistory from "@/components/HomeworkHistory"

export default function HomeworkHistoryPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">היסטוריית שיעורי בית</h1>
      <HomeworkHistory />
    </Layout>
  )
}

