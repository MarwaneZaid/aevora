import { FormEvent, useState } from 'react'
import { contact, payment, workshopInfo } from '../data/catalog'
import { Reveal } from './Reveal'

type Props = {
  composition: string
}

function openWhatsApp(message: string) {
  window.open(
    `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export function Book({ composition }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [seats, setSeats] = useState('1')
  const [allergies, setAllergies] = useState('')
  const [instagram, setInstagram] = useState('')
  const [requests, setRequests] = useState('')
  const [sent, setSent] = useState(false)

  const total = Number(workshopInfo.price) * Number(seats)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const lines = [
      'Aevora 97 — Workshop booking',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone/WhatsApp: ${phone}`,
      `Seats: ${seats}`,
      allergies ? `Allergies: ${allergies}` : '',
      instagram ? `Instagram: ${instagram}` : '',
      requests ? `Special requests: ${requests}` : '',
      composition ? `Journal preview: ${composition}` : '',
      `Session: ${workshopInfo.date} · ${workshopInfo.price} MAD × ${seats} = ${total} MAD`,
    ]
      .filter(Boolean)
      .join('\n')

    openWhatsApp(lines)
    setSent(true)
  }

  const sendReceipt = () => {
    const msg = [
      'Aevora 97 — Payment receipt',
      `Name: ${name || '[your name]'}`,
      `Session: ${workshopInfo.date}`,
      `Amount: ${total} MAD`,
      'I am sending my payment receipt.',
    ].join('\n')
    openWhatsApp(msg)
  }

  return (
    <section id="book" className="bg-cream-warm py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-8 lg:px-10">
        <div className="md:col-span-7">
          <Reveal>
            <p className="eyebrow mb-4">Reserve</p>
            <h2 className="display text-4xl md:text-5xl">Book your workshop seat</h2>
            <p className="mt-4 max-w-xl text-muted">
              Complete the form below to reserve your place. Your booking is
              confirmed once payment has been completed and you receive a
              confirmation message.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 border border-burgundy/10 bg-cream p-5 md:p-6">
              <p className="eyebrow mb-2">Session details</p>
              <p className="font-display text-2xl text-burgundy">{workshopInfo.title}</p>
              <p className="mt-2 text-sm text-muted">
                {workshopInfo.date} · {workshopInfo.place} · {workshopInfo.duration}
              </p>
              <p className="mt-1 text-sm text-burgundy">
                {workshopInfo.price} MAD / seat · {workshopInfo.seatsLeft} seats left
              </p>
              {composition && (
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">
                  Your preview: <span className="text-burgundy">{composition}</span>
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <p className="text-sm font-medium text-burgundy">Your information</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-burgundy">Full name</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="field" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-burgundy">Email address</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-burgundy">Phone number / WhatsApp</span>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212…"
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-burgundy">Number of seats</span>
                  <select value={seats} onChange={(e) => setSeats(e.target.value)} className="field">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-burgundy">
                    Food allergies or dietary restrictions
                  </span>
                  <input
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="field"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-burgundy">
                    Instagram username — optional
                  </span>
                  <input
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@…"
                    className="field"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-burgundy">
                    Special requests — optional
                  </span>
                  <textarea
                    rows={3}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    className="field resize-y"
                  />
                </label>
              </div>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                {sent ? 'Send booking again' : 'Continue to payment'}
              </button>
            </form>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal>
            <div className="border border-burgundy/10 bg-cream p-6 shadow-lift md:sticky md:top-28">
              <p className="eyebrow mb-3">Payment methods</p>
              <h3 className="display text-3xl">How to pay</h3>

              <div className="mt-6 space-y-6 text-sm text-muted">
                <div>
                  <p className="font-medium text-burgundy">Option 1 — Bank transfer</p>
                  <p className="mt-2">
                    Transfer the total amount using the following bank details:
                  </p>
                  <ul className="mt-3 space-y-1 text-burgundy">
                    <li>Account holder: {payment.bank.holder}</li>
                    <li>Bank: {payment.bank.bank}</li>
                    <li>RIB: {payment.bank.rib}</li>
                    <li>Amount: {total} MAD</li>
                  </ul>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="font-medium text-burgundy">Option 2 — Wafacash or Cash Plus</p>
                  <p className="mt-2">
                    You can also send the payment through your nearest Wafacash or
                    Cash Plus agency using the following details:
                  </p>
                  <ul className="mt-3 space-y-1 text-burgundy">
                    <li>Recipient’s full name: {payment.cash.recipient}</li>
                    <li>Phone number: {payment.cash.phone}</li>
                    <li>Amount: {total} MAD</li>
                  </ul>
                </div>

                <p className="border-t border-line pt-6 leading-relaxed">
                  Once the transfer is complete, please send your payment receipt
                  through WhatsApp to {contact.whatsapp}, along with your full
                  name. Your seat will be confirmed after we verify that the
                  payment has been received.
                </p>

                <button type="button" onClick={sendReceipt} className="btn-primary w-full">
                  Send My Payment Receipt
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
