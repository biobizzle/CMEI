/** Canonical navigation, contact and editorial data for CMEI. */
export const navigation = [
  { label: 'About', href: '/about' },
  { label: 'What we do', href: '/approach' },
  { label: 'Our work', href: '/work' },
  { label: 'Films', href: '/films' },
  { label: 'Our people', href: '/#people' },
  { label: 'Partner with us', href: '/partner' },
] as const;

export const features = [
  {
    title: 'Learn the craft',
    description: 'Learn photography, filming and editing by trying them yourself.',
    image: '/images/learn.webp',
    alt: 'A photographer learning with a mentor',
  },
  {
    title: 'Tell the story',
    description: 'Turn people, places and ideas into stories worth telling.',
    image: '/images/story.webp',
    alt: 'A filmmaker recording a conversation',
  },
  {
    title: 'Build your path',
    description: 'Collect your best work and learn from experienced creators.',
    image: '/images/path.webp',
    alt: 'Creatives reviewing a portfolio together',
  },
] as const;

export const people = [
  { name: 'Emmanuel-Omolere Austin Ademola', role: 'Project Director', image: '/people/emmanuel.jpg' },
  { name: 'Fajuyigbe Taiwo Gabriel', role: 'Head of Creative Training and Production', image: '/people/taiwo.png' },
  { name: 'Biodun Fatuase', role: 'Head of Technology and Digital Innovation', image: '/people/biodun.jpg' },
  { name: 'Agunbiade Jayeola Ayomiposi', role: 'Head of Administration and Partnerships', image: '/people/ayomiposi.jpg' },
] as const;

export const contact = {
  email: 'Omolereemmanuel12@gmail.com',
  phoneNumbers: [
    { display: '08123540647', href: 'tel:+2348123540647' },
    { display: '08167635508', href: 'tel:+2348167635508' },
  ],
} as const;
