export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: string;
}

export interface Barber {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  approach: string;
  image: string;
  portfolioIds: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  barberId?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const services: Service[] = [
  {
    id: 'signature-cut',
    name: 'The Signature Cut',
    description: 'A tailored haircut, refined finishing, and personalized styling.',
    price: 65,
    duration: 45,
    category: 'Haircut'
  },
  {
    id: 'precision-fade',
    name: 'The Precision Fade',
    description: 'Detailed blending, clean contours, and a controlled finish.',
    price: 55,
    duration: 40,
    category: 'Haircut'
  },
  {
    id: 'gentleman-combo',
    name: "The Gentleman's Combination",
    description: 'A haircut and beard-shaping service in one appointment.',
    price: 90,
    duration: 60,
    category: 'Haircut & Beard'
  },
  {
    id: 'beard-ritual',
    name: 'The Beard Ritual',
    description: 'Careful beard trimming, sculpting, and finishing.',
    price: 40,
    duration: 30,
    category: 'Beard'
  },
  {
    id: 'traditional-shave',
    name: 'The Traditional Shave',
    description: 'A classic hot towel shaving experience with precision razor work.',
    price: 50,
    duration: 35,
    category: 'Shave'
  },
  {
    id: 'scissor-atelier',
    name: 'The Scissor Atelier',
    description: 'A considered scissor cut for longer, layered, or textured hairstyles.',
    price: 75,
    duration: 50,
    category: 'Haircut'
  }
];

export const barbers: Barber[] = [
  {
    id: 'marcus',
    name: 'Marcus Cole',
    title: 'Master Barber & Studio Director',
    specialties: ['Classic Cuts', 'Precision Fades', 'Scissor Work'],
    bio: 'With a meticulous eye for proportion and a deep respect for classic technique, Marcus brings fifteen years of craft to every appointment.',
    approach: 'I believe every cut should feel considered — shaped to the individual, not the trend.',
    image: 'https://image.qwenlm.ai/generated-images/ce70779d-95a1-4111-96b2-c316ccab27c6/_result.png',
    portfolioIds: ['fade-1', 'classic-1']
  },
  {
    id: 'james',
    name: 'James Whitfield',
    title: 'Senior Barber',
    specialties: ['Textured Cuts', 'Modern Styles', 'Beard Design'],
    bio: 'James combines contemporary vision with technical precision, creating styles that feel both current and timeless.',
    approach: 'Great grooming is about listening first — understanding what someone wants before the first cut.',
    image: 'https://image.qwenlm.ai/generated-images/01f2e636-c3c4-47a0-85aa-ad15ebae51a6/_result.png',
    portfolioIds: ['texture-1', 'beard-1']
  },
  {
    id: 'daniel',
    name: 'Daniel Reeves',
    title: 'Barber & Grooming Specialist',
    specialties: ['Traditional Shaves', 'Beard Sculpting', 'Classic Fades'],
    bio: 'Daniel brings a calm, methodical approach to his work, specializing in traditional techniques refined for the modern client.',
    approach: 'The details matter most — the final pass, the neckline, the way light catches the finish.',
    image: 'https://image.qwenlm.ai/generated-images/07602bf5-a3d2-4f07-b0e9-8f66ecb8601c/_result.png',
    portfolioIds: ['classic-1', 'fade-1']
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'fade-1',
    src: 'https://image.qwenlm.ai/generated-images/d77a2a60-dbe4-4e87-8b83-bc05cc369cba/_result.png',
    alt: 'Precision fade with clean blending and sharp contours',
    category: 'Fades',
    barberId: 'marcus'
  },
  {
    id: 'classic-1',
    src: 'https://image.qwenlm.ai/generated-images/c297df51-4f3e-45b3-8efb-3bacd1b58bda/_result.png',
    alt: 'Classic gentleman\'s cut with refined side part',
    category: 'Classic',
    barberId: 'marcus'
  },
  {
    id: 'texture-1',
    src: 'https://image.qwenlm.ai/generated-images/f2b7ce41-1ebf-4225-84d3-487bc482bced/_result.png',
    alt: 'Modern textured crop with natural movement',
    category: 'Texture',
    barberId: 'james'
  },
  {
    id: 'beard-1',
    src: 'https://image.qwenlm.ai/generated-images/c2765152-1380-473f-8489-8b95eccbe2cc/_result.png',
    alt: 'Precision beard sculpting and grooming detail',
    category: 'Beard',
    barberId: 'daniel'
  },
  {
    id: 'scissor-1',
    src: 'https://image.qwenlm.ai/generated-images/ae8fdd29-4264-46af-a1e7-6222126878a4/_result.png',
    alt: 'Scissor cut with layered texture and movement',
    category: 'Scissor Cuts',
    barberId: 'james'
  }
];

export const galleryCategories = ['All Work', 'Fades', 'Classic', 'Texture', 'Scissor Cuts', 'Beard'];

export const siteConfig = {
  name: 'URBANCUT STUDIO',
  tagline: 'The art of a better cut.',
  address: '42 Kensington High Street, London W8 4PT',
  phone: '+44 20 7946 0958',
  email: 'appointments@urbancutstudio.com',
  hours: {
    weekday: 'Tuesday – Friday: 9:00 – 19:00',
    saturday: 'Saturday: 9:00 – 17:00',
    sunday: 'Sunday – Monday: Closed'
  },
  social: {
    instagram: 'https://instagram.com',
  }
};

// Generate availability for the next 14 days
export function getAvailability(): Record<string, TimeSlot[]> {
  const availability: Record<string, TimeSlot[]> = {};
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeek = date.getDay();
    
    // Skip Sundays and Mondays
    if (dayOfWeek === 0 || dayOfWeek === 1) continue;
    
    const dateStr = date.toISOString().split('T')[0];
    const slots: TimeSlot[] = [];
    
    const startHour = 9;
    const endHour = dayOfWeek === 6 ? 17 : 19;
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({ time: `${hour.toString().padStart(2, '0')}:00`, available: Math.random() > 0.25 });
      if (hour < endHour - 1 || (hour === endHour - 1)) {
        slots.push({ time: `${hour.toString().padStart(2, '0')}:30`, available: Math.random() > 0.3 });
      }
    }
    
    availability[dateStr] = slots;
  }
  
  return availability;
}
