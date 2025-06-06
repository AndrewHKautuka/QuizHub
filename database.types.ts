export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Admin: {
        Row: {
          admin_id: string
          created_at: string
        }
        Insert: {
          admin_id?: string
          created_at?: string
        }
        Update: {
          admin_id?: string
          created_at?: string
        }
        Relationships: []
      }
      Attempt: {
        Row: {
          quiz_id: string
          student_id: string
        }
        Insert: {
          quiz_id: string
          student_id: string
        }
        Update: {
          quiz_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Attempt_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "Quiz"
            referencedColumns: ["quiz_id"]
          },
          {
            foreignKeyName: "Attempt_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["student_id"]
          },
        ]
      }
      AttemptChoice: {
        Row: {
          choice_no: number
          question_no: number
          quiz_id: string
          student_id: string
        }
        Insert: {
          choice_no: number
          question_no: number
          quiz_id: string
          student_id: string
        }
        Update: {
          choice_no?: number
          question_no?: number
          quiz_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "AttemptChoice_question_no_choice_no_quiz_id_fkey"
            columns: ["question_no", "choice_no", "quiz_id"]
            isOneToOne: false
            referencedRelation: "Choice"
            referencedColumns: ["question_no", "choice_no", "quiz_id"]
          },
          {
            foreignKeyName: "AttemptChoice_quiz_id_student_id_fkey"
            columns: ["quiz_id", "student_id"]
            isOneToOne: false
            referencedRelation: "Attempt"
            referencedColumns: ["quiz_id", "student_id"]
          },
        ]
      }
      Choice: {
        Row: {
          choice_no: number
          is_correct: boolean
          question_no: number
          quiz_id: string
          text: string
        }
        Insert: {
          choice_no?: number
          is_correct?: boolean
          question_no: number
          quiz_id: string
          text?: string
        }
        Update: {
          choice_no?: number
          is_correct?: boolean
          question_no?: number
          quiz_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "Choice_quiz_id_question_no_fkey"
            columns: ["quiz_id", "question_no"]
            isOneToOne: false
            referencedRelation: "Question"
            referencedColumns: ["quiz_id", "question_no"]
          },
        ]
      }
      Question: {
        Row: {
          question_no: number
          quiz_id: string
          text: string
        }
        Insert: {
          question_no?: number
          quiz_id: string
          text?: string
        }
        Update: {
          question_no?: number
          quiz_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "Question_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "Quiz"
            referencedColumns: ["quiz_id"]
          },
        ]
      }
      Quiz: {
        Row: {
          created_at: string
          creator_id: string
          description: string
          quiz_id: string
          title: string
        }
        Insert: {
          created_at?: string
          creator_id?: string
          description?: string
          quiz_id?: string
          title?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string
          quiz_id?: string
          title?: string
        }
        Relationships: []
      }
      Student: {
        Row: {
          created_at: string
          student_id: string
        }
        Insert: {
          created_at?: string
          student_id?: string
        }
        Update: {
          created_at?: string
          student_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
