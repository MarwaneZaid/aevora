const cdn = (path: string, format = 2500) =>
  `https://images.squarespace-cdn.com/content/v1/6a15d99c2b416b60c8fa6ac2/${path}?format=${format}w`

export const images = {
  hero: cdn('8122871c-dfbb-497c-9aed-e7ca9a0c4e24/IMG_5472.png'),
  craftHands: cdn('ced80e87-63c9-4859-bb8b-4e071c6ef00a/IMG_5233.jpg'),
  workshopTable: cdn('b78dc00c-044b-484c-95e0-58dffe1b2cf9/IMG_4205+2.jpg'),
  journalGrid: cdn('c101a399-0fdb-46a4-a62e-20f5a87ee6ab/2CED2987-B7FC-474F-9638-228532332904.jpg'),
  journalRow: cdn('11a1bedd-5e96-4162-b211-2a6537ebb123/2CED2987-B7FC-474F-9638-228532332904.jpg'),
  heldJournal: cdn('98c135db-26c2-4f76-84fe-e02b9a46abbe/IMG_4210+2.jpg'),
  charms: cdn('a887841e-7c64-4e33-9297-2d9e8fe7ad3c/IMG_4068.jpg'),
  stack: cdn('43bb856f-3f89-4252-abb3-41c7f672be9d/IMG_4822.jpg'),
  pair: cdn('93c2c82b-1095-4d52-8e3c-46cb5bd61ee3/IMG_4208+2.jpg'),
  cylinder: cdn('5e961f9c-9e96-4243-94d9-7cbc33359323/IMG_4877.png'),
}

export const galleryPics = [
  images.heldJournal,
  images.craftHands,
  images.journalRow,
  images.pair,
  images.charms,
  images.workshopTable,
]

export const values = [
  {
    title: 'Made by hand',
    copy: 'Every piece is created with patience, care and attention to detail.',
  },
  {
    title: 'Personal to you',
    copy: 'Your journal should reflect your taste, personality and story.',
  },
  {
    title: 'Made in Morocco',
    copy: 'We proudly celebrate Moroccan craftsmanship and locally made creations.',
  },
  {
    title: 'Designed to grow with you',
    copy: 'Genuine leather becomes more beautiful with time, making every journal completely unique.',
  },
]

export const included = [
  'One genuine leather journal made by you',
  'One 150-page notebook',
  'All tools and crafting materials',
  'Guidance throughout the workshop',
  'Available decorative and personalization options',
  'Drink of your choice',
  'Sweet treats',
  'Good music and a cozy creative atmosphere',
]

export const faqs = [
  {
    q: 'Do I need experience?',
    a: 'Not at all. The workshop is beginner-friendly, and we will guide you through every step.',
  },
  {
    q: 'Can I come alone?',
    a: 'Absolutely. The workshop is designed to help people create and connect, so coming alone is completely welcome.',
  },
  {
    q: 'Can I choose my leather colour?',
    a: 'Yes. You will choose from the leather colours available for your workshop session. Availability may vary.',
  },
  {
    q: 'What will I take home?',
    a: 'You will leave with the genuine leather journal you created and a 150-page notebook.',
  },
  {
    q: 'Are all materials included?',
    a: 'Yes. The necessary leather, tools, materials and selected decorations are provided.',
  },
  {
    q: 'Are drinks and food included?',
    a: 'Yes. One drink and sweet treats are included in your workshop experience.',
  },
  {
    q: 'Can I personalize my journal?',
    a: 'Yes. Available options may include stamped initials, ribbons, lace, metal details and selected decorative elements.',
  },
  {
    q: 'Can I book more than one seat?',
    a: 'Yes. Select the number of participants when completing your booking.',
  },
]

/** Placeholder workshop info — owners can edit later */
export const workshopInfo = {
  title: 'Make your own leather journal',
  date: 'Next session — TBA',
  place: 'Casablanca',
  price: '350',
  seatsLeft: 8,
  duration: 'About 3 hours',
}

export const contact = {
  whatsapp: '', // add real number later
  email: '',
  instagram: 'https://www.instagram.com/aevora_97',
  tiktok: 'https://www.tiktok.com/@aevora97',
  handle: '@aevora_97',
}

export const payment = {
  bank: {
    holder: '[Full name]',
    bank: '[Bank name]',
    rib: '[RIB number]',
  },
  cash: {
    recipient: '[Full name]',
    phone: '[Phone number]',
  },
}

export type LeatherTone = { id: string; name: string; hex: string }
export type JournalSize = { id: string; label: string; detail: string }
export type Charm = { id: string; name: string }
export type Ribbon = { id: string; name: string; hex: string }
export type PaperStyle = {
  id: 'lined' | 'blank' | 'dotted'
  name: string
  detail: string
}

export const leatherTones: LeatherTone[] = [
  { id: 'oxblood', name: 'Oxblood', hex: '#330a10' },
  { id: 'espresso', name: 'Espresso', hex: '#3a2a22' },
  { id: 'sienna', name: 'Sienna', hex: '#8a4f2f' },
  { id: 'sand', name: 'Sand', hex: '#b08968' },
  { id: 'ink', name: 'Ink', hex: '#1a1a1a' },
]

export const journalSizes: JournalSize[] = [
  { id: 'a6', label: 'A6', detail: 'Pocket companion' },
  { id: 'a5', label: 'A5', detail: 'Everyday carry' },
  { id: 'a4', label: 'A4', detail: 'Studio folio' },
]

export const charms: Charm[] = [
  { id: 'sun', name: 'Sun' },
  { id: 'star', name: 'Star' },
  { id: 'heart', name: 'Heart' },
  { id: 'moon', name: 'Moon' },
  { id: 'key', name: 'Key' },
  { id: 'pearl', name: 'Pearl' },
]

export const ribbons: Ribbon[] = [
  { id: 'gold', name: 'Gold cord', hex: '#c6a15b' },
  { id: 'cream', name: 'Cream lace', hex: '#f3ebe0' },
  { id: 'black', name: 'Black elastic', hex: '#1a1a1a' },
  { id: 'wine', name: 'Wine ribbon', hex: '#6e2b24' },
]

export const paperStyles: PaperStyle[] = [
  { id: 'lined', name: 'Lined', detail: 'Classic writing' },
  { id: 'blank', name: 'Blank', detail: 'Free sketch' },
  { id: 'dotted', name: 'Dotted', detail: 'Bullet & plans' },
]

export const workshopSteps = [
  { id: 'leather', label: 'Leather', hint: 'Pick your hide' },
  { id: 'size', label: 'Size', hint: 'Choose the format' },
  { id: 'paper', label: 'Paper', hint: 'Select the insert' },
  { id: 'charms', label: 'Charms', hint: 'Decorate the cover' },
  { id: 'mark', label: 'Mark', hint: 'Add your initials' },
  { id: 'review', label: 'Review', hint: 'Ready to order' },
] as const

export type WorkshopStepId = (typeof workshopSteps)[number]['id']
