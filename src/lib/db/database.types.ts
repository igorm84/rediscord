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
      friendships: {
        Row: {
          requested_at: string | null
          status: Database["public"]["Enums"]["friendship_status"] | null
          user_1_id: string
          user_2_id: string
        }
        Insert: {
          requested_at?: string | null
          status?: Database["public"]["Enums"]["friendship_status"] | null
          user_1_id: string
          user_2_id: string
        }
        Update: {
          requested_at?: string | null
          status?: Database["public"]["Enums"]["friendship_status"] | null
          user_1_id?: string
          user_2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friendships_user_1_id_fkey"
            columns: ["user_1_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_user_2_id_fkey"
            columns: ["user_2_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          display_name: string | null
          id: string
          status: Database["public"]["Enums"]["user_status"] | null
          type: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          display_name?: string | null
          id: string
          status?: Database["public"]["Enums"]["user_status"] | null
          type?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          display_name?: string | null
          id?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          type?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_username_available: {
        Args: {
          new_username: string
          ignored_id?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      friendship_status: "requested" | "accepted" | "refused"
      user_status: "online" | "idle" | "dnd" | "offline" | "mobile"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
