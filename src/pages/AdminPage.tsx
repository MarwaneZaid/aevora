import { FormEvent, useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type {
  Customer,
  PaymentStatus,
  Review,
  WorkshopPhoto,
  WorkshopSession,
} from '../lib/database.types'

type Tab = 'workshop' | 'reviews' | 'photos' | 'customers'

const paymentOptions: PaymentStatus[] = ['pending', 'paid', 'confirmed', 'cancelled']

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [bootstrapping, setBootstrapping] = useState(true)
  const [email, setEmail] = useState('aevora97studio@gmail.com')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<Tab>('workshop')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setBootstrapping(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setBootstrapping(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  const login = async (e: FormEvent) => {
    e.preventDefault()
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (!isSupabaseConfigured) {
    return (
      <Shell>
        <p className="text-muted">
          Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
        </p>
      </Shell>
    )
  }

  if (bootstrapping) {
    return (
      <Shell>
        <p className="text-muted">Loading…</p>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell>
        <form onSubmit={login} className="mx-auto max-w-md space-y-4 border border-line bg-cream p-6">
          <h1 className="display text-3xl">Studio login</h1>
          <p className="text-sm text-muted">
            Edit workshop details, reviews, photos and customer bookings.
          </p>
          <label className="block">
            <span className="mb-2 block text-sm">Email</span>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm">Password</span>
            <input
              className="field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {authError && <p className="text-sm text-burgundy">{authError}</p>}
          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
        </form>
      </Shell>
    )
  }

  return (
    <Shell onLogout={logout}>
      <div className="mb-8 flex flex-wrap gap-2">
        {(
          [
            ['workshop', 'Workshop'],
            ['reviews', 'Reviews'],
            ['photos', 'Photos'],
            ['customers', 'Customers'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`border px-4 py-2 text-sm transition ${
              tab === id
                ? 'border-burgundy bg-burgundy text-cream'
                : 'border-line text-burgundy hover:border-burgundy/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'workshop' && <WorkshopEditor />}
      {tab === 'reviews' && <ReviewsEditor />}
      {tab === 'photos' && <PhotosEditor />}
      {tab === 'customers' && <CustomersEditor />}
    </Shell>
  )
}

function Shell({
  children,
  onLogout,
}: {
  children: ReactNode
  onLogout?: () => void
}) {
  return (
    <div className="min-h-screen bg-cream-warm text-burgundy">
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-display text-2xl tracking-[0.14em]">AEVORA 97</p>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Studio admin</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="underline-offset-4 hover:underline">
              View site
            </Link>
            {onLogout && (
              <button type="button" onClick={onLogout} className="btn-ghost !py-2 !text-xs">
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
    </div>
  )
}

function WorkshopEditor() {
  const [row, setRow] = useState<WorkshopSession | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from('workshop_sessions')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      setRow(data)
    })()
  }, [])

  if (!row) return <p className="text-muted">Loading workshop…</p>

  const save = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    const { error } = await supabase
      .from('workshop_sessions')
      .update({
        title: row.title,
        date_label: row.date_label,
        place: row.place,
        price: row.price,
        seats_left: row.seats_left,
        duration: row.duration,
        blurb: row.blurb,
        is_active: row.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', row.id)

    setSaving(false)
    setMessage(error ? error.message : 'Workshop saved — live on the site.')
  }

  return (
    <form onSubmit={save} className="space-y-4 border border-line bg-cream p-6">
      <h2 className="display text-3xl">Workshop info</h2>
      <p className="text-sm text-muted">
        Changes appear on the public site after save (date, price, seats, place…).
      </p>
      {(
        [
          ['title', 'Title'],
          ['date_label', 'Date label'],
          ['place', 'Place'],
          ['duration', 'Duration'],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="block">
          <span className="mb-2 block text-sm">{label}</span>
          <input
            className="field"
            value={row[key]}
            onChange={(e) => setRow({ ...row, [key]: e.target.value })}
          />
        </label>
      ))}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm">Price (MAD)</span>
          <input
            className="field"
            type="number"
            value={row.price}
            onChange={(e) => setRow({ ...row, price: Number(e.target.value) })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm">Seats left</span>
          <input
            className="field"
            type="number"
            value={row.seats_left}
            onChange={(e) => setRow({ ...row, seats_left: Number(e.target.value) })}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm">Short blurb (optional)</span>
        <textarea
          className="field resize-y"
          rows={3}
          value={row.blurb ?? ''}
          onChange={(e) => setRow({ ...row, blurb: e.target.value })}
        />
      </label>
      <button type="submit" className="btn-primary" disabled={saving}>
        {saving ? 'Saving…' : 'Save workshop'}
      </button>
      {message && <p className="text-sm text-muted">{message}</p>}
    </form>
  )
}

function ReviewsEditor() {
  const [items, setItems] = useState<Review[]>([])
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')

  const load = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    setItems(data ?? [])
  }

  useEffect(() => {
    void load()
  }, [])

  const add = async (e: FormEvent) => {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.from('reviews').insert({
      author_name: author.trim(),
      quote: quote.trim(),
      rating,
      is_published: true,
    })
    if (error) {
      setMessage(error.message)
      return
    }
    setAuthor('')
    setQuote('')
    setRating(5)
    setMessage('Review published.')
    await load()
  }

  const toggle = async (item: Review) => {
    await supabase
      .from('reviews')
      .update({ is_published: !item.is_published })
      .eq('id', item.id)
    await load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this review?')) return
    await supabase.from('reviews').delete().eq('id', id)
    await load()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="space-y-4 border border-line bg-cream p-6">
        <h2 className="display text-3xl">Add a review</h2>
        <label className="block">
          <span className="mb-2 block text-sm">Customer name</span>
          <input
            className="field"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm">Review</span>
          <textarea
            className="field resize-y"
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          />
        </label>
        <label className="block max-w-[140px]">
          <span className="mb-2 block text-sm">Rating</span>
          <select
            className="field"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn-primary">
          Publish review
        </button>
        {message && <p className="text-sm text-muted">{message}</p>}
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="border border-line bg-cream p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl">{item.author_name}</p>
                <p className="mt-1 text-sm text-muted">{item.rating}/5</p>
                <p className="mt-2 text-sm leading-relaxed">{item.quote}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted">
                  {item.is_published ? 'Published' : 'Hidden'}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-ghost !py-2 !text-xs" onClick={() => toggle(item)}>
                  {item.is_published ? 'Hide' : 'Publish'}
                </button>
                <button type="button" className="btn-ghost !py-2 !text-xs" onClick={() => remove(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted">No reviews yet.</p>}
      </div>
    </div>
  )
}

function PhotosEditor() {
  const [items, setItems] = useState<WorkshopPhoto[]>([])
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const load = async () => {
    const { data } = await supabase
      .from('workshop_photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    setItems(data ?? [])
  }

  useEffect(() => {
    void load()
  }, [])

  const onFile = async (file: File | null) => {
    if (!file) return
    setUploading(true)
    setMessage('')
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('workshop-media')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (uploadError) {
      setUploading(false)
      setMessage(uploadError.message)
      return
    }

    const { data: publicUrl } = supabase.storage.from('workshop-media').getPublicUrl(path)
    const { error } = await supabase.from('workshop_photos').insert({
      url: publicUrl.publicUrl,
      caption: caption.trim() || null,
      is_published: true,
    })

    setUploading(false)
    if (error) {
      setMessage(error.message)
      return
    }
    setCaption('')
    setMessage('Photo added.')
    await load()
  }

  const toggle = async (item: WorkshopPhoto) => {
    await supabase
      .from('workshop_photos')
      .update({ is_published: !item.is_published })
      .eq('id', item.id)
    await load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this photo?')) return
    await supabase.from('workshop_photos').delete().eq('id', id)
    await load()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 border border-line bg-cream p-6">
        <h2 className="display text-3xl">Workshop & customer photos</h2>
        <label className="block">
          <span className="mb-2 block text-sm">Caption (optional)</span>
          <input
            className="field"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Workshop table · Sara’s journal…"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm">Upload image</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {uploading && <p className="text-sm text-muted">Uploading…</p>}
        {message && <p className="text-sm text-muted">{message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="border border-line bg-cream overflow-hidden">
            <img src={item.url} alt={item.caption || 'Workshop photo'} className="aspect-square w-full object-cover" />
            <div className="space-y-2 p-3">
              <p className="text-sm">{item.caption || 'No caption'}</p>
              <p className="text-xs uppercase tracking-wider text-muted">
                {item.is_published ? 'Published' : 'Hidden'}
              </p>
              <div className="flex gap-2">
                <button type="button" className="btn-ghost !py-2 !text-xs" onClick={() => toggle(item)}>
                  {item.is_published ? 'Hide' : 'Publish'}
                </button>
                <button type="button" className="btn-ghost !py-2 !text-xs" onClick={() => remove(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-muted">No photos yet.</p>}
    </div>
  )
}

function CustomersEditor() {
  const [items, setItems] = useState<Customer[]>([])
  const [filter, setFilter] = useState<'all' | PaymentStatus>('all')

  const load = async () => {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
    setItems(data ?? [])
  }

  useEffect(() => {
    void load()
  }, [])

  const setStatus = async (id: string, payment_status: PaymentStatus) => {
    await supabase.from('customers').update({ payment_status }).eq('id', id)
    await load()
  }

  const saveNotes = async (id: string, notes: string) => {
    await supabase.from('customers').update({ notes }).eq('id', id)
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this customer booking?')) return
    await supabase.from('customers').delete().eq('id', id)
    await load()
  }

  const visible =
    filter === 'all' ? items : items.filter((item) => item.payment_status === filter)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="display text-3xl">Customers</h2>
          <p className="mt-1 text-sm text-muted">
            Bookings from the website form ({items.length} total).
          </p>
        </div>
        <select
          className="field max-w-[180px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | PaymentStatus)}
        >
          <option value="all">All statuses</option>
          {paymentOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {visible.map((item) => (
          <div key={item.id} className="border border-line bg-cream p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-2xl">{item.full_name}</p>
                <p className="mt-1 text-sm text-muted">
                  {item.email} · {item.phone} · {item.seats} seat(s)
                </p>
                {item.instagram && (
                  <p className="mt-1 text-sm text-muted">IG: {item.instagram}</p>
                )}
                {item.allergies && (
                  <p className="mt-1 text-sm text-muted">Allergies: {item.allergies}</p>
                )}
                {item.special_requests && (
                  <p className="mt-1 text-sm text-muted">Requests: {item.special_requests}</p>
                )}
                {item.journal_preview && (
                  <p className="mt-1 text-sm text-muted">Preview: {item.journal_preview}</p>
                )}
                <p className="mt-2 text-xs text-muted">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  className="field !py-2"
                  value={item.payment_status}
                  onChange={(e) =>
                    void setStatus(item.id, e.target.value as PaymentStatus)
                  }
                >
                  {paymentOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn-ghost !py-2 !text-xs"
                  onClick={() => remove(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-xs uppercase tracking-wider text-muted">
                Admin notes
              </span>
              <textarea
                className="field resize-y"
                rows={2}
                defaultValue={item.notes ?? ''}
                onBlur={(e) => void saveNotes(item.id, e.target.value)}
                placeholder="Internal notes…"
              />
            </label>
          </div>
        ))}
        {visible.length === 0 && <p className="text-muted">No customers yet.</p>}
      </div>
    </div>
  )
}
