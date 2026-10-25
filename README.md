# URBANCUT STUDIO

A luxury barbershop website built with React, TypeScript, Vite, and Tailwind CSS.

## Overview

URBANCUT STUDIO is a contemporary grooming atelier website that combines modern design principles with luxury brand aesthetics. The site delivers a refined digital experience featuring editorial typography, cinematic photography, and a complete booking system.

## Features

### Core Experience
- **Cinematic Hero** — Full-screen imagery with editorial typography and smooth animations
- **Services Menu** — 6 premium services with pricing, durations, and descriptions
- **Portfolio Gallery** — Filterable image gallery with lightbox and keyboard navigation
- **Barber Profiles** — Team section with expandable bios and direct booking links
- **Studio Story** — Editorial section showcasing brand philosophy and values
- **Location & Contact** — Complete business information with directions

### Interactive Features
- **Multi-step Booking System**
  - Service selection
  - Barber preference
  - Date picker (14-day availability)
  - Time slot selection
  - Customer details with validation
  - Review and confirmation
  - Reference number generation

- **Style Consultation Tool**
  - 4-question interactive questionnaire
  - Dynamic service recommendations based on answers
  - Direct booking integration

- **FAQ Accordion** — Common questions with smooth expand/collapse animations

### Design System
- **Color Palette**
  - Obsidian: `#151513`
  - Deep Espresso: `#28231F`
  - Warm Ivory: `#F3EFE7`
  - Porcelain: `#FAF8F3`
  - Champagne Brass: `#B49A6A`
  - Muted Taupe: `#A49A8C`
  - Stone Grey: `#77736D`

- **Typography**
  - Display: Cormorant Garamond (serif)
  - Body: Inter (sans-serif)

- **Motion & Animation**
  - Framer Motion for smooth transitions
  - Reduced-motion support
  - Scroll-triggered animations
  - Hover and focus states

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **Lucide React** — Icon library
- **date-fns** — Date utilities

## Project Structure

```
src/
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
├── index.css                  # Global styles and design tokens
├── components/
│   ├── Layout.tsx             # Navbar, Footer, Mobile Menu
│   ├── Sections.tsx           # All page sections (Hero, Services, etc.)
│   ├── Booking.tsx            # Multi-step booking flow
│   └── Consultation.tsx       # Style consultation tool
└── data/
    └── siteData.ts            # Services, barbers, gallery, config
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck
```

The development server runs at `http://localhost:3000`

## Configuration

### Site Information

Edit `src/data/siteData.ts` to customize:

```typescript
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
  }
};
```

### Services

Services are defined in `src/data/siteData.ts`:

```typescript
export const services: Service[] = [
  {
    id: 'signature-cut',
    name: 'The Signature Cut',
    description: 'A tailored haircut, refined finishing, and personalized styling.',
    price: 65,
    duration: 45,
    category: 'Haircut'
  },
  // ... more services
];
```

### Barbers

Barber profiles in `src/data/siteData.ts`:

```typescript
export const barbers: Barber[] = [
  {
    id: 'marcus',
    name: 'Marcus Cole',
    title: 'Master Barber & Studio Director',
    specialties: ['Classic Cuts', 'Precision Fades', 'Scissor Work'],
    bio: '...',
    approach: '...',
    image: '/path/to/image.jpg',
    portfolioIds: ['fade-1', 'classic-1']
  },
  // ... more barbers
];
```

### Gallery Images

Portfolio images in `src/data/siteData.ts`:

```typescript
export const galleryItems: GalleryItem[] = [
  {
    id: 'fade-1',
    src: '/path/to/image.jpg',
    alt: 'Precision fade with clean blending',
    category: 'Fades',
    barberId: 'marcus'
  },
  // ... more images
];
```

## Booking System

The booking flow includes:

1. **Service Selection** — Choose from available services
2. **Barber Selection** — Select preferred barber or "Any Available"
3. **Date Selection** — 14-day availability calendar
4. **Time Selection** — Available time slots
5. **Customer Details** — Name, email, phone, notes
6. **Review** — Confirm all selections
7. **Confirmation** — Reference number and summary

### Availability

The system generates sample availability for the next 14 days:

```typescript
export function getAvailability(): Record<string, TimeSlot[]> {
  // Generates time slots from 9:00 to closing time
  // Randomly marks some slots as unavailable for demo
}
```

**Note:** This is a demonstration system. For production, integrate with a real booking API.

## Accessibility

The site implements:

- Semantic HTML structure
- Keyboard navigation support
- Focus management in modals
- ARIA labels and roles
- Reduced-motion preferences
- Sufficient color contrast
- Form validation with error messages
- Escape key dismissal for modals

## Performance

- Lazy-loaded images
- Optimized animations (transform and opacity only)
- Minimal bundle size
- Efficient re-renders with React hooks
- Intersection Observer for scroll effects

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design

Breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1440px+

## Images

The project includes 9 AI-generated images:
- Hero background
- Portfolio gallery (5 images)
- Barber portraits (3 images)
- Studio interior
- Tools still life

Replace these with actual photography for production use.

## Deployment

### Build Output

```bash
npm run build
```

Output in `dist/` directory:
- `index.html`
- `assets/*.css`
- `assets/*.js`

### Hosting

Deploy the `dist/` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

## Customization

### Colors

Edit `src/index.css` to modify the color palette:

```css
@theme {
  --color-obsidian: #151513;
  --color-champagne: #B49A6A;
  /* ... */
}
```

### Fonts

Change fonts in `index.html` and `src/index.css`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font" rel="stylesheet" />
```

```css
@theme {
  --font-serif: 'Your Serif Font', serif;
  --font-sans: 'Your Sans Font', sans-serif;
}
```

## Important Notes

### Demonstration Mode

This is a demonstration website with:
- Sample service prices (not real business pricing)
- Fictional barber profiles
- Simulated booking system (no real appointments)
- Sample testimonials (clearly marked)
- Demo availability data

For production use:
- Replace with real business information
- Integrate actual booking API
- Use real photography
- Add real customer reviews
- Connect payment processing if needed

### Data Privacy

The booking form collects:
- Name
- Email
- Phone
- Optional notes

For production:
- Implement proper data handling
- Add privacy policy
- Comply with GDPR/data protection regulations
- Use secure backend for data storage

## License

This project is provided as-is for demonstration purposes.

## Credits

- Design & Development: Custom implementation
- Typography: Cormorant Garamond by Christian Thalmann, Inter by Rasmus Andersson
- Icons: Lucide React
- Images: AI-generated for demonstration

## Support

For questions or issues, please refer to the source code comments or create an issue in the repository.

---

**URBANCUT STUDIO** — The art of a better cut.
