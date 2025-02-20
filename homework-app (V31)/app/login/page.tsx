"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // כאן תוכל להוסיף לוגיקת אימות אמיתית
    console.log("Logging in with:", username, password)
    router.push("/")
  }

  const handleGuestLogin = () => {
    console.log("Logging in as guest")
    router.push("/")
  }

  const handleCreateAccount = () => {
    console.log("Creating new account")
    // כאן תוכל להוסיף לוגיקה ליצירת חשבון חדש
    router.push("/create-account")
  }

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>כניסה למערכת</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">שם משתמש</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">סיסמה</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                כניסה
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full" onClick={handleGuestLogin}>
              כניסה כאורח
            </Button>
            <Button variant="secondary" className="w-full" onClick={handleCreateAccount}>
              יצירת חשבון חדש
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}

