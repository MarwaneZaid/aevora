import { useEffect, useState } from 'react'
import { workshopInfo as fallbackWorkshop } from '../data/catalog'
import { isSupabaseConfigured, supabase } from './supabase'
import type { Review, WorkshopPhoto, WorkshopSession } from './database.types'

export type LiveWorkshop = {
  id?: string
  title: string
  date: string
  place: string
  price: string
  seatsLeft: number
  duration: string
  blurb?: string | null
}

function mapWorkshop(row: WorkshopSession): LiveWorkshop {
  return {
    id: row.id,
    title: row.title,
    date: row.date_label,
    place: row.place,
    price: String(row.price),
    seatsLeft: row.seats_left,
    duration: row.duration,
    blurb: row.blurb,
  }
}

export function useWorkshop() {
  const [workshop, setWorkshop] = useState<LiveWorkshop>(fallbackWorkshop)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from('workshop_sessions')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!cancelled && data) setWorkshop(mapWorkshop(data))
      if (!cancelled) setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return { workshop, loading }
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (!cancelled) {
        setReviews(data ?? [])
        setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return { reviews, loading }
}

export function useWorkshopPhotos() {
  const [photos, setPhotos] = useState<WorkshopPhoto[]>([])
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from('workshop_photos')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (!cancelled) {
        setPhotos(data ?? [])
        setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return { photos, loading }
}
