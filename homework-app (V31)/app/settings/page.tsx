import Layout from "@/components/Layout"
import UserProfile from "@/components/UserProfile"

export default function SettingsPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">הגדרות</h1>
      <UserProfile />
    </Layout>
  )
}

