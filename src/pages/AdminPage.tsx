import { FormEvent, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  ImagePlus,
  LogOut,
  MessageSquareQuote,
  Users,
} from 'lucide-react'
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

const tabMeta: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'workshop', label: 'Workshop', icon: <CalendarDays size={15} /> },
  { id: 'reviews', label: 'Reviews', icon: <MessageSquareQuote size={15} /> },
  { id: 'photos', label: 'Photos', icon: <Camera size={15} /> },
  { id: 'customers', label: 'Customers', icon: <Users size={15} /> },
]

function statusBadge(status: PaymentStatus) {
  const map: Record<PaymentStatus, string> = {
    pending: 'badge badge-pending',
    paid: 'badge badge-paid',
    confirmed: 'badge badge-confirmed',
    cancelled: 'badge badge-cancelled',
  }
  return map[status]
}

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [bootstrapping, setBootstrapping] = useState(true)
  const [email, setEmail] = useState('aevora97studio@gmail.com')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [tab, setTab] = useState<Tab>('workshop')
  const [stats, setStats] = useState({ customers: 0, pending: 0, reviews: 0, photos: 0 })

  const refreshStats = useCallback(async () => {
    const [customers, reviews, photos] = await Promise.all([
      supabase.from('customers').select('payment_status'),
      supabase.from('reviews').select('id', { count: 'exact', head: true }),
      supabase.from('workshop_photos').select('id', { count: 'exact', head: true }),
    ])
    const rows = (customers.data ?? []) as { payment_status: PaymentStatus }[]
    setStats({
      customers: rows.length,
      pending: rows.filter((r) => r.payment_status === 'pending').length,
      reviews: reviews.count ?? 0,
      photos: photos.count ?? 0,
    })
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setBootstrapping(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setBootstrapping(false)
      if (data.session) void refreshStats()
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (next) void refreshStats()
    })

    return () => sub.subscription.unsubscribe()
  }, [refreshStats])

  const login = async (e: FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setSigningIn(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSigningIn(false)
    if (error) setAuthError(error.message)
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (!isSupabaseConfigured) {
    return (
      <Shell>
        <div className="panel mx-auto max-w-lg p-8 text-center">
          <p className="display text-3xl">Studio unavailable</p>
          <p className="mt-3 text-sm text-muted">
            Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable the admin.
          </p>
        </div>
      </Shell>
    )
  }

  if (bootstrapping) {
    return (
      <Shell>
        <p className="text-center text-muted">Opening studio…</p>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell>
        <form
          onSubmit={login}
          className="panel mx-auto max-w-md space-y-5 p-8 shadow-lift"
        >
          <div>
            <p className="eyebrow mb-2">Aevora 97</p>
            <h1 className="display text-4xl">Studio login</h1>
            <p className="mt-2 text-sm text-muted">
              Manage workshop sessions, reviews, photos and customer bookings.
            </p>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm">Email</span>
            <input
              className="field"
              type="email"
              autoComplete="username"
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {authError && (
            <p className="border border-burgundy/15 bg-cream-warm px-3 py-2 text-sm text-burgundy">
              {authError}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={signingIn}>
            {signingIn ? 'Signing in…' : 'Sign in to studio'}
          </button>
        </form>
      </Shell>
    )
  }

  return (
    <Shell onLogout={logout} email={session.user.email}>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Bookings', value: stats.customers },
          { label: 'Pending payment', value: stats.pending },
          { label: 'Reviews', value: stats.reviews },
          { label: 'Photos', value: stats.photos },
        ].map((item) => (
          <div key={item.label} className="panel p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{item.label}</p>
            <p className="mt-2 font-display text-4xl text-burgundy">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-line pb-4">
        {tabMeta.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition ${
              tab === item.id
                ? 'border-burgundy bg-burgundy text-cream'
                : 'border-line bg-cream text-burgundy hover:border-burgundy/35'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'workshop' && <WorkshopEditor />}
      {tab === 'reviews' && <ReviewsEditor onChange={refreshStats} />}
      {tab === 'photos' && <PhotosEditor onChange={refreshStats} />}
      {tab === 'customers' && <CustomersEditor onChange={refreshStats} />}
    </Shell>
  )
}

function Shell({
  children,
  onLogout,
  email,
}: {
  children: ReactNode
  onLogout?: () => void
  email?: string | null
}) {
  return (
    <div className="min-h-screen bg-cream-warm text-burgundy">
      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-display text-2xl tracking-[0.14em]">AEVORA 97</p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
              Studio · {email || 'Admin'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-burgundy/70 transition hover:text-burgundy">
              View site
            </Link>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="btn-ghost !inline-flex !items-center !gap-1.5 !py-2 !text-xs"
              >
                <LogOut size={14} />
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

function Notice({ children, tone = 'ok' }: { children: ReactNode; tone?: 'ok' | 'error' }) {
  return (
    <p
      className={`flex items-start gap-2 border px-3 py-2.5 text-sm ${
        tone === 'error'
          ? 'border-burgundy/20 bg-cream-warm text-burgundy'
          : 'border-burgundy/15 bg-cream text-burgundy'
      }`}
    >
      {tone === 'ok' && <CheckCircle2 size={16} className="mt-0.5 shrink-0" />}
      <span>{children}</span>
    </p>
  )
}

function WorkshopEditor() {
  const [row, setRow] = useState<WorkshopSession | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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

  if (!row) {
    return <p className="text-muted">Loading workshop…</p>
  }

  const save = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    const { error: err } = await supabase
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
    if (err) setError(err.message)
    else setMessage('Workshop updated — live on the website.')
  }

  return (
    <form onSubmit={save} className="panel space-y-5 p-6 md:p-8">
      <div>
        <h2 className="display text-3xl md:text-4xl">Workshop session</h2>
        <p className="mt-2 text-sm text-muted">
          Edit what visitors see for the next session: date, place, price and seats.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {(
          [
            ['title', 'Title'],
            ['date_label', 'Date label'],
            ['place', 'Place'],
            ['duration', 'Duration'],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block md:col-span-1">
            <span className="mb-2 block text-sm">{label}</span>
            <input
              className="field"
              value={row[key]}
              onChange={(e) => setRow({ ...row, [key]: e.target.value })}
            />
          </label>
        ))}
        <label className="block">
          <span className="mb-2 block text-sm">Price (MAD)</span>
          <input
            className="field"
            type="number"
            min={0}
            value={row.price}
            onChange={(e) => setRow({ ...row, price: Number(e.target.value) })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm">Seats left</span>
          <input
            className="field"
            type="number"
            min={0}
            value={row.seats_left}
            onChange={(e) => setRow({ ...row, seats_left: Number(e.target.value) })}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm">Short intro (optional)</span>
        <textarea
          className="field resize-y"
          rows={3}
          value={row.blurb ?? ''}
          onChange={(e) => setRow({ ...row, blurb: e.target.value })}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save workshop'}
        </button>
        {message && <Notice>{message}</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  )
}

function ReviewsEditor({ onChange }: { onChange: () => void }) {
  const [items, setItems] = useState<Review[]>([])
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

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
    setSaving(true)
    setMessage('')
    const { error } = await supabase.from('reviews').insert({
      author_name: author.trim(),
      quote: quote.trim(),
      rating,
      is_published: true,
    })
    setSaving(false)
    if (error) {
      setMessage(error.message)
      return
    }
    setAuthor('')
    setQuote('')
    setRating(5)
    setMessage('Review published on the site.')
    await load()
    onChange()
  }

  const toggle = async (item: Review) => {
    await supabase.from('reviews').update({ is_published: !item.is_published }).eq('id', item.id)
    await load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this review?')) return
    await supabase.from('reviews').delete().eq('id', id)
    await load()
    onChange()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="panel space-y-4 p-6 md:p-8">
        <div>
          <h2 className="display text-3xl">Add a review</h2>
          <p className="mt-2 text-sm text-muted">Published reviews appear on the homepage.</p>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm">Customer name</span>
          <input className="field" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm">Review text</span>
          <textarea
            className="field resize-y"
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          />
        </label>
        <label className="block max-w-[160px]">
          <span className="mb-2 block text-sm">Rating</span>
          <select className="field" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} stars
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Publishing…' : 'Publish review'}
        </button>
        {message && <Notice>{message}</Notice>}
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-2xl">{item.author_name}</p>
                  <span className={item.is_published ? 'badge badge-confirmed' : 'badge badge-cancelled'}>
                    {item.is_published ? 'Live' : 'Hidden'}
                  </span>
                </div>
                <p className="mt-1 text-xs tracking-[0.18em] text-muted">
                  {'★'.repeat(item.rating)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-burgundy/85">{item.quote}</p>
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
        {items.length === 0 && (
          <div className="panel p-8 text-center text-muted">
            No reviews yet — add the first guest quote above.
          </div>
        )}
      </div>
    </div>
  )
}

function PhotosEditor({ onChange }: { onChange: () => void }) {
  const [items, setItems] = useState<WorkshopPhoto[]>([])
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [dragOver, setDragOver] = useState(false)

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
    setMessage('Photo published on the workshop page.')
    await load()
    onChange()
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
    onChange()
  }

  return (
    <div className="space-y-6">
      <div className="panel space-y-4 p-6 md:p-8">
        <div>
          <h2 className="display text-3xl">Workshop & customer photos</h2>
          <p className="mt-2 text-sm text-muted">
            Upload moments from the table — they appear under the workshop section.
          </p>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm">Caption (optional)</span>
          <input
            className="field"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Workshop table · Sara’s journal…"
          />
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            void onFile(e.dataTransfer.files?.[0] ?? null)
          }}
          className={`relative grid place-items-center border border-dashed px-6 py-12 text-center transition ${
            dragOver ? 'border-burgundy bg-cream-warm' : 'border-line bg-cream-warm/40'
          }`}
        >
          <ImagePlus className="mb-3 text-burgundy/40" size={28} />
          <p className="text-sm text-burgundy">
            {uploading ? 'Uploading…' : 'Drag & drop a photo here, or browse'}
          </p>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
          />
        </div>
        {message && <Notice>{message}</Notice>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="panel overflow-hidden">
            <img
              src={item.url}
              alt={item.caption || 'Workshop photo'}
              className="aspect-square w-full object-cover"
            />
            <div className="space-y-2 p-3">
              <p className="text-sm">{item.caption || 'No caption'}</p>
              <span className={item.is_published ? 'badge badge-confirmed' : 'badge badge-cancelled'}>
                {item.is_published ? 'Live' : 'Hidden'}
              </span>
              <div className="flex gap-2 pt-1">
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
      {items.length === 0 && (
        <div className="panel p-8 text-center text-muted">No photos yet.</div>
      )}
    </div>
  )
}

function CustomersEditor({ onChange }: { onChange: () => void }) {
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
    onChange()
  }

  const saveNotes = async (id: string, notes: string) => {
    await supabase.from('customers').update({ notes }).eq('id', id)
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this customer booking?')) return
    await supabase.from('customers').delete().eq('id', id)
    await load()
    onChange()
  }

  const visible = useMemo(
    () => (filter === 'all' ? items : items.filter((item) => item.payment_status === filter)),
    [filter, items],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="display text-3xl md:text-4xl">Customers</h2>
          <p className="mt-1 text-sm text-muted">
            Bookings from the website · {items.length} total
          </p>
        </div>
        <select
          className="field max-w-[200px]"
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
          <article key={item.id} className="panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-2xl md:text-3xl">{item.full_name}</h3>
                  <span className={statusBadge(item.payment_status)}>{item.payment_status}</span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  <a href={`mailto:${item.email}`} className="hover:text-burgundy">
                    {item.email}
                  </a>
                  {' · '}
                  <a href={`tel:${item.phone}`} className="hover:text-burgundy">
                    {item.phone}
                  </a>
                  {' · '}
                  {item.seats} seat{item.seats > 1 ? 's' : ''}
                </p>
                <div className="mt-3 space-y-1 text-sm text-muted">
                  {item.instagram && <p>Instagram: {item.instagram}</p>}
                  {item.allergies && <p>Allergies: {item.allergies}</p>}
                  {item.special_requests && <p>Requests: {item.special_requests}</p>}
                  {item.journal_preview && <p>Preview: {item.journal_preview}</p>}
                </div>
                <p className="mt-3 text-xs text-muted/80">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[160px]">
                <select
                  className="field !py-2"
                  value={item.payment_status}
                  onChange={(e) => void setStatus(item.id, e.target.value as PaymentStatus)}
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
              <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted">
                Internal notes
              </span>
              <textarea
                className="field resize-y"
                rows={2}
                defaultValue={item.notes ?? ''}
                onBlur={(e) => void saveNotes(item.id, e.target.value)}
                placeholder="Payment received, seat confirmed…"
              />
            </label>
          </article>
        ))}
        {visible.length === 0 && (
          <div className="panel p-8 text-center text-muted">No customers in this filter.</div>
        )}
      </div>
    </div>
  )
}
