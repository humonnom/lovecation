export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number
          name: string
          age: number
          gender: "female" | "male"
          city: string
          image: string
          is_liked: boolean
          is_online: boolean | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          age: number
          gender: "female" | "male"
          city: string
          image: string
          is_liked?: boolean
          is_online?: boolean | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          age?: number
          gender?: "female" | "male"
          city?: string
          image?: string
          is_liked?: boolean
          is_online?: boolean | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          age: number | null
          gender: "female" | "male" | null
          city: string | null
          bio: string | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          age?: number | null
          gender?: "female" | "male" | null
          city?: string | null
          bio?: string | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          age?: number | null
          gender?: "female" | "male" | null
          city?: string | null
          bio?: string | null
          updated_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}