"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { supabase, checkTables, createUserProfile } from "@/lib/supabase"

interface AppState {
  tasks: any[]
  books: any[]
  userProfile: any
  schedule: any[]
  homeworkHistory: any[]
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

interface AppContextType {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
  fetchData: () => Promise<void>
  saveData: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialState: AppState = {
  tasks: [],
  books: [],
  userProfile: null,
  schedule: [],
  homeworkHistory: [],
  isLoading: true,
  error: null,
  isAuthenticated: false,
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState)

  const checkAuth = useCallback(async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error("Error checking auth:", error)
      return null
    }
  }, [])

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      // Check authentication first
      const user = await checkAuth()
      setState((prev) => ({ ...prev, isAuthenticated: !!user }))

      if (!user) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "נא להתחבר כדי לצפות בנתונים",
        }))
        return
      }

      // Check if tables exist
      const tablesExist = await checkTables()
      if (!tablesExist) {
        throw new Error("Tables do not exist or are not accessible")
      }

      // Fetch all data with proper error handling
      const [
        { data: tasks, error: tasksError },
        { data: books, error: booksError },
        { data: userProfileData, error: userProfileError },
        { data: schedule, error: scheduleError },
        { data: homeworkHistory, error: homeworkHistoryError },
      ] = await Promise.all([
        supabase.from("tasks").select("*").eq("user_id", user.id),
        supabase.from("books").select("*").eq("user_id", user.id),
        supabase.from("user_profiles").select("*").eq("id", user.id),
        supabase.from("schedule").select("*").eq("user_id", user.id),
        supabase.from("homework_history").select("*").eq("user_id", user.id),
      ])

      // Check for any errors
      if (tasksError) throw tasksError
      if (booksError) throw booksError
      if (userProfileError) throw userProfileError
      if (scheduleError) throw scheduleError
      if (homeworkHistoryError) throw homeworkHistoryError

      // Handle user profile creation if needed
      const userProfile = userProfileData && userProfileData.length > 0 ? userProfileData[0] : await createUserProfile()

      if (!userProfile) {
        throw new Error("Failed to create or fetch user profile")
      }

      // Update state with all fetched data
      setState({
        tasks: tasks || [],
        books: books || [],
        userProfile,
        schedule: schedule || [],
        homeworkHistory: homeworkHistory || [],
        isLoading: false,
        error: null,
        isAuthenticated: true,
      })
    } catch (error) {
      console.error("Error in fetchData:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "שגיאה בטעינת הנתונים. אנא נסה שוב מאוחר יותר.",
      }))
    }
  }, [checkAuth])

  const saveData = async () => {
    try {
      const user = await checkAuth()
      if (!user) {
        throw new Error("No authenticated user found")
      }

      const { error: tasksError } = await supabase
        .from("tasks")
        .upsert(state.tasks.map((task) => ({ ...task, user_id: user.id })))

      const { error: booksError } = await supabase
        .from("books")
        .upsert(state.books.map((book) => ({ ...book, user_id: user.id })))

      const { error: scheduleError } = await supabase
        .from("schedule")
        .upsert(state.schedule.map((item) => ({ ...item, user_id: user.id })))

      const { error: homeworkError } = await supabase
        .from("homework_history")
        .upsert(state.homeworkHistory.map((item) => ({ ...item, user_id: user.id })))

      if (tasksError) throw tasksError
      if (booksError) throw booksError
      if (scheduleError) throw scheduleError
      if (homeworkError) throw homeworkError
    } catch (error) {
      console.error("Error saving data:", error)
      setState((prev) => ({
        ...prev,
        error: "שגיאה בשמירת הנתונים. אנא נסה שוב מאוחר יותר.",
      }))
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <AppContext.Provider value={{ state, setState, fetchData, saveData }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

