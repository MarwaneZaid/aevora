export type PaymentStatus = 'pending' | 'paid' | 'confirmed' | 'cancelled'

export type WorkshopSession = {
  id: string
  title: string
  date_label: string
  place: string
  price: number
  seats_left: number
  duration: string
  blurb: string | null
  is_active: boolean
  updated_at: string
}

export type Review = {
  id: string
  author_name: string
  quote: string
  rating: number
  is_published: boolean
  sort_order: number
  created_at: string
}

export type WorkshopPhoto = {
  id: string
  url: string
  caption: string | null
  is_published: boolean
  sort_order: number
  created_at: string
}

export type Customer = {
  id: string
  full_name: string
  email: string
  phone: string
  seats: number
  allergies: string | null
  instagram: string | null
  special_requests: string | null
  journal_preview: string | null
  payment_status: PaymentStatus
  notes: string | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      workshop_sessions: {
        Row: WorkshopSession
        Insert: Partial<WorkshopSession> &
          Pick<WorkshopSession, 'title' | 'date_label' | 'place'>
        Update: Partial<WorkshopSession>
      }
      reviews: {
        Row: Review
        Insert: Partial<Review> & Pick<Review, 'author_name' | 'quote'>
        Update: Partial<Review>
      }
      workshop_photos: {
        Row: WorkshopPhoto
        Insert: Partial<WorkshopPhoto> & Pick<WorkshopPhoto, 'url'>
        Update: Partial<WorkshopPhoto>
      }
      customers: {
        Row: Customer
        Insert: Partial<Customer> &
          Pick<Customer, 'full_name' | 'email' | 'phone'>
        Update: Partial<Customer>
      }
    }
  }
}
