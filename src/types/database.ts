export interface Tool {
  id: string
  name: string
  description: string
  category: string
  url: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface ToolFinder {
  id: string
  name: string
  description: string
  url?: string
  category: string
  free_score: number
  created_at?: string
  updated_at?: string
}

export interface Database {
  public: {
    Tables: {
      tools: {
        Row: Tool
        Insert: Omit<Tool, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Tool, 'id'>>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Category, 'id'>>
      }
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id'>>
      }
      toolfinder: {
        Row: ToolFinder
        Insert: Omit<ToolFinder, 'id'>
        Update: Partial<Omit<ToolFinder, 'id'>>
      }
    }
  }
} 