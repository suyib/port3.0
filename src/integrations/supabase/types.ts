export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string
          published: boolean
          slug: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string
          published?: boolean
          slug: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string
          published?: boolean
          slug?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          budget_range: string
          company: string
          created_at: string
          goal: string
          id: string
          name: string
          project_type: string
          timeline: string
        }
        Insert: {
          budget_range?: string
          company: string
          created_at?: string
          goal?: string
          id?: string
          name: string
          project_type: string
          timeline?: string
        }
        Update: {
          budget_range?: string
          company?: string
          created_at?: string
          goal?: string
          id?: string
          name?: string
          project_type?: string
          timeline?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          caption: string
          created_at: string
          id: string
          project_id: string
          sort_order: number
          url: string
          visible: boolean
        }
        Insert: {
          caption?: string
          created_at?: string
          id?: string
          project_id: string
          sort_order?: number
          url: string
          visible?: boolean
        }
        Update: {
          caption?: string
          created_at?: string
          id?: string
          project_id?: string
          sort_order?: number
          url?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          challenge: string
          comparison: Json
          component_states: Json
          cover_caption: string
          created_at: string
          description: string
          headline: string
          id: string
          image_url: string
          outcome: string
          pain_points: Json
          process: Json
          published: boolean
          role: string
          slug: string
          solution: string
          sort_order: number
          stakeholders: string
          takeaways: Json
          tech_pivot: Json
          timeline: string
          title: string
          tools: string[]
          updated_at: string
        }
        Insert: {
          category?: string
          challenge?: string
          comparison?: Json
          component_states?: Json
          cover_caption?: string
          created_at?: string
          description?: string
          headline?: string
          id?: string
          image_url?: string
          outcome?: string
          pain_points?: Json
          process?: Json
          published?: boolean
          role?: string
          slug: string
          solution?: string
          sort_order?: number
          stakeholders?: string
          takeaways?: Json
          tech_pivot?: Json
          timeline?: string
          title: string
          tools?: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          challenge?: string
          comparison?: Json
          component_states?: Json
          cover_caption?: string
          created_at?: string
          description?: string
          headline?: string
          id?: string
          image_url?: string
          outcome?: string
          pain_points?: Json
          process?: Json
          published?: boolean
          role?: string
          slug?: string
          solution?: string
          sort_order?: number
          stakeholders?: string
          takeaways?: Json
          tech_pivot?: Json
          timeline?: string
          title?: string
          tools?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          design_skills: Json
          dev_skills: Json
          footer_left: string
          footer_right: string
          homepage_content: Json
          id: string
          nav_links: Json
          social_links: Json
          updated_at: string
        }
        Insert: {
          design_skills?: Json
          dev_skills?: Json
          footer_left?: string
          footer_right?: string
          homepage_content?: Json
          id?: string
          nav_links?: Json
          social_links?: Json
          updated_at?: string
        }
        Update: {
          design_skills?: Json
          dev_skills?: Json
          footer_left?: string
          footer_right?: string
          homepage_content?: Json
          id?: string
          nav_links?: Json
          social_links?: Json
          updated_at?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
