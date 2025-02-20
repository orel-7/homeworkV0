import Layout from "@/components/Layout"
import BookList from "@/components/BookList"

export default function BookListPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">רשימת ספרים</h1>
      <BookList />
    </Layout>
  )
}

