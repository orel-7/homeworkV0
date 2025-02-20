import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function checkTables() {
  try {
    const tables = ["tasks", "books", "user_profiles", "schedule", "homework_history"]

    for (const table of tables) {
      const { error } = await supabase.from(table).select("*").limit(1)
      if (error && error.code !== "PGRST116") {
        // Ignore "no rows returned" error
        console.error(`Error checking table ${table}:`, error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error("Error checking tables:", error)
    return false
  }
}

export async function createUserProfile() {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error("Auth error:", authError)
      return null
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

    if (existingProfile) {
      return existingProfile
    }

    // Create new profile if none exists
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([
        {
          id: user.id,
          name: "משתמש חדש",
          school: "",
          grade: "",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating user profile:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createUserProfile:", error)
    return null
  }
}

