import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, ChevronRight, ChevronLeft, X, ArrowRight } from 'lucide-react';
import { services, barbers, galleryItems, galleryCategories, siteConfig, type Service } from '../data/siteData';

// ============ HERO ============
export function Hero({ onBookingOpen }: { onBookingOpen: () => void }) {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <img
          src="https://image.qwenlm.ai/generated-images/ae8fdd29-4264-46af-a1e7-6222126878a4/_result.png"
          alt="URBANCUT STUDIO interior with warm lighting and professional grooming environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/50 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-28 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">
            Contemporary Grooming Atelier
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 leading-[1.05] font-light"
        >
          The Art of<br />
          <span className="italic font-light">A Better Cut.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-white/60 text-base lg:text-lg mt-6 max-w-md font-light"
        >
          Precision grooming, considered detail, and a style that feels distinctly yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <button
            onClick={onBookingOpen}
            className="text-[11px] uppercase tracking-[0.15em] font-medium px-7 py-3.5 bg-champagne text-obsidian hover:bg-white transition-colors duration-300"
          >
            Book Your Appointment
          </button>
          <a
            href="#studio"
            onClick={(e) => { e.preventDefault(); document.querySelector('#studio')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-[11px] uppercase tracking-[0.15em] font-medium px-7 py-3.5 border border-white/40 text-white hover:bg-white/10 transition-colors duration-300"
          >
            Discover the Studio
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 left-6 lg:left-12 right-6 lg:right-12"
        >
          <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.15em]">
            <div className="w-8 h-[1px] bg-white/20" />
            <span>A Private Moment. A Distinctive Standard.</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-white/30"
        />
      </motion.div>
    </section>
  );
}

// ============ TRUST STRIP ============
export function TrustStrip() {
  return (
    <section className="bg-ivory border-y border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-16">
          <div className="flex items-center gap-2 text-stone">
            <MapPin size={14} className="text-champagne" />
            <span className="text-[12px] tracking-wide">{siteConfig.address}</span>
          </div>
          <div className="hidden sm:block w-[1px] h-4 bg-border" />
          <div className="flex items-center gap-2 text-stone">
            <Clock size={14} className="text-champagne" />
            <span className="text-[12px] tracking-wide">Tue–Fri 9–19 · Sat 9–17</span>
          </div>
          <div className="hidden sm:block w-[1px] h-4 bg-border" />
          <span className="text-[12px] tracking-wide text-stone">
            By Appointment · Walk-ins Welcome
          </span>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES ============
interface ServicesProps {
  onBookService: (service: Service) => void;
}

export function ServicesSection({ onBookService }: ServicesProps) {
  return (
    <section id="services" className="bg-porcelain py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">Our Services</span>
          <h2 className="font-serif text-3xl lg:text-5xl text-obsidian mt-3 font-light leading-tight">
            Crafted for the<br />discerning client.
          </h2>
          <p className="text-stone mt-4 text-base leading-relaxed max-w-lg">
            Each service is performed with precision, care, and an attention to detail that transforms a routine appointment into a considered experience.
          </p>
        </div>

        {/* Service List */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group py-6 lg:py-8 border-t border-border/60 last:border-b"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-xl lg:text-2xl text-obsidian font-normal">{service.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.1em] text-taupe bg-ivory px-2 py-0.5">{service.category}</span>
                  </div>
                  <p className="text-sm text-stone leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-taupe">
                    <span className="flex items-center gap-1"><Clock size={12} />{service.duration} min</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-serif text-2xl text-obsidian">£{service.price}</span>
                  <button
                    onClick={() => onBookService(service)}
                    className="block mt-2 text-[10px] uppercase tracking-[0.12em] text-champagne hover:text-obsidian transition-colors font-medium"
                  >
                    Book →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PORTFOLIO ============
export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All Work');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All Work') return galleryItems;
    return galleryItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="portfolio" className="bg-ivory py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">Portfolio</span>
            <h2 className="font-serif text-3xl lg:text-5xl text-obsidian mt-3 font-light leading-tight">
              The Art of the Cut.
            </h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 border transition-all duration-300 ${
                  activeFilter === cat
                    ? 'border-obsidian bg-obsidian text-porcelain'
                    : 'border-border text-stone hover:border-stone'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
              aria-label={`View ${item.alt}`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? 'aspect-square sm:aspect-auto sm:h-full' : 'aspect-[4/5]'}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-champagne">{item.category}</span>
                  <p className="text-white text-sm mt-1">{item.alt}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-obsidian/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 lg:left-8 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 lg:right-8 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
          <div className="max-w-4xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              className="w-full h-full object-contain"
            />
            <div className="text-center mt-4">
              <span className="text-[10px] uppercase tracking-[0.15em] text-champagne">{filteredItems[lightboxIndex].category}</span>
              <p className="text-white/70 text-sm mt-1">{filteredItems[lightboxIndex].alt}</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// ============ BARBERS ============
interface BarbersProps {
  onBookBarber: (barberId: string) => void;
}

export function BarbersSection({ onBookBarber }: BarbersProps) {
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  return (
    <section id="barbers" className="bg-porcelain py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">The Team</span>
          <h2 className="font-serif text-3xl lg:text-5xl text-obsidian mt-3 font-light leading-tight">
            The people behind<br />the craft.
          </h2>
          <p className="text-stone mt-4 text-base leading-relaxed max-w-lg">
            Each barber brings a distinct approach, united by a shared commitment to precision and personal attention.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {barbers.map((barber, index) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <button
                onClick={() => setSelectedBarber(selectedBarber === barber.id ? null : barber.id)}
                className="w-full text-left"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-5">
                  <img
                    src={barber.image}
                    alt={`Portrait of ${barber.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-colors duration-500" />
                </div>
              </button>
              <h3 className="font-serif text-xl lg:text-2xl text-obsidian">{barber.name}</h3>
              <p className="text-[11px] uppercase tracking-[0.1em] text-champagne mt-1">{barber.title}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {barber.specialties.map((s) => (
                  <span key={s} className="text-[10px] uppercase tracking-[0.08em] text-taupe border border-border/60 px-2 py-0.5">{s}</span>
                ))}
              </div>

              {/* Expanded bio */}
              {selectedBarber === barber.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 overflow-hidden"
                >
                  <p className="text-sm text-stone leading-relaxed">{barber.bio}</p>
                  <p className="text-sm text-stone/80 italic mt-2">"{barber.approach}"</p>
                </motion.div>
              )}

              <button
                onClick={() => onBookBarber(barber.id)}
                className="mt-4 text-[11px] uppercase tracking-[0.12em] text-champagne hover:text-obsidian transition-colors font-medium flex items-center gap-1"
              >
                Book with {barber.name.split(' ')[0]} <ArrowRight size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ STUDIO STORY ============
export function StudioSection({ onBookingOpen }: { onBookingOpen: () => void }) {
  return (
    <section id="studio" className="relative bg-obsidian text-white overflow-hidden grain-overlay">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://image.qwenlm.ai/generated-images/4837f018-09cd-4871-9e32-59f22c9e0e3f/_result.png"
              alt="URBANCUT STUDIO interior with warm lighting and refined furnishings"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">Our Philosophy</span>
              <h2 className="font-serif text-3xl lg:text-5xl text-white mt-3 font-light leading-tight">
                Excellence lives<br />in the details.
              </h2>
              <p className="text-white/60 mt-6 text-base leading-relaxed">
                Every appointment is an opportunity to refine a style, respect the craft, and leave feeling unmistakably yourself.
              </p>
              <p className="text-white/50 mt-4 text-sm leading-relaxed">
                We believe in consultation before creation, precision over speed, and the quiet confidence that comes from knowing every detail has been considered. Our studio is designed as a space for focus — where the art of grooming is given the time and attention it deserves.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2">Precision</h4>
                  <p className="text-white/50 text-sm">Every cut is shaped to the individual — not the trend.</p>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2">Consultation</h4>
                  <p className="text-white/50 text-sm">We listen first, then craft a style that feels distinctly yours.</p>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2">Craftsmanship</h4>
                  <p className="text-white/50 text-sm">Classic technique meets contemporary vision in every service.</p>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2">Atmosphere</h4>
                  <p className="text-white/50 text-sm">An intimate space designed for focus and personal attention.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={onBookingOpen}
                  className="text-[11px] uppercase tracking-[0.15em] font-medium px-7 py-3.5 bg-champagne text-obsidian hover:bg-white transition-colors duration-300"
                >
                  Book Your Appointment
                </button>
                <a
                  href="#barbers"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#barbers')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-[11px] uppercase tracking-[0.15em] font-medium px-7 py-3.5 border border-white/30 text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Meet the Team
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CONSULTATION TEASER ============
interface ConsultationTeaserProps {
  onOpenConsultation: () => void;
}

export function ConsultationTeaser({ onOpenConsultation }: ConsultationTeaserProps) {
  return (
    <section className="bg-ivory py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">Personal Consultation</span>
          <h2 className="font-serif text-3xl lg:text-4xl text-obsidian mt-3 font-light leading-tight">
            Find Your Signature Style.
          </h2>
          <p className="text-stone mt-4 text-base leading-relaxed max-w-lg mx-auto">
            Answer a few questions about your preferences and we'll recommend services and styles tailored to you.
          </p>
          <button
            onClick={onOpenConsultation}
            className="mt-8 text-[11px] uppercase tracking-[0.15em] font-medium px-7 py-3.5 border border-obsidian text-obsidian hover:bg-obsidian hover:text-porcelain transition-colors duration-300"
          >
            Start Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ FAQ ============
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book directly through our website using the Book Appointment button, or call us at the studio. Walk-ins are also welcome when availability allows.'
    },
    {
      question: 'What should I expect at my first visit?',
      answer: 'Your appointment begins with a brief consultation where your barber will discuss your style preferences, hair type, and desired outcome before any cutting begins.'
    },
    {
      question: 'How long does a typical appointment take?',
      answer: 'Service durations range from 30 minutes for a beard trim to 60 minutes for our Gentleman\'s Combination. We recommend allowing a few extra minutes for your first visit.'
    },
    {
      question: 'Can I choose a specific barber?',
      answer: 'Absolutely. You can select any of our barbers when booking, or choose "Any Available Barber" for the earliest appointment.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We ask for at least 24 hours notice if you need to cancel or reschedule. This allows us to offer the appointment to another client.'
    },
    {
      question: 'Do you offer gift vouchers?',
      answer: 'Gift vouchers are available for purchase at the studio. Please contact us directly for current availability and denominations.'
    },
  ];

  return (
    <section className="bg-porcelain py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">FAQ</span>
            <h2 className="font-serif text-3xl lg:text-4xl text-obsidian mt-3 font-light">
              Common Questions.
            </h2>
          </div>

          <div className="divide-y divide-border/50">
            {faqs.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left flex items-center justify-between gap-4 group"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base text-obsidian font-medium group-hover:text-champagne transition-colors">
                    {faq.question}
                  </h3>
                  <span className={`text-champagne transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-stone leading-relaxed mt-3 pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS ============
export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "The attention to detail is remarkable. Every appointment feels considered and personal — it's clear the craft matters here.",
      attribution: "A valued client",
    },
    {
      quote: "I've never experienced a haircut that felt this intentional. The consultation, the precision, the atmosphere — everything is refined.",
      attribution: "A valued client",
    },
    {
      quote: "URBANCUT has become part of my routine. The quality is consistent, the team is exceptional, and the studio itself feels like a retreat.",
      attribution: "A valued client",
    },
  ];

  return (
    <section className="bg-ivory py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">Client Experience</span>
          
          <div className="mt-8 relative min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="font-serif text-2xl lg:text-3xl text-obsidian font-light leading-relaxed italic">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <p className="text-sm text-taupe mt-6">— {testimonials[activeIndex].attribution}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-champagne w-6' : 'bg-border hover:bg-taupe'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>

          <p className="text-xs text-taupe mt-8 italic">
            These are sample testimonials for demonstration purposes.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ LOCATION ============
export function LocationSection() {
  return (
    <section id="location" className="bg-porcelain py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">Visit Us</span>
            <h2 className="font-serif text-3xl lg:text-4xl text-obsidian mt-3 font-light leading-tight">
              Find the studio.
            </h2>
            <p className="text-stone mt-4 text-base leading-relaxed">
              Located in the heart of Kensington, URBANCUT STUDIO offers a calm, considered space for your grooming appointment.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2 font-medium">Address</h4>
                <p className="text-obsidian text-sm">{siteConfig.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.1em] text-champagne hover:text-obsidian transition-colors mt-1 inline-flex items-center gap-1"
                >
                  Get Directions <ChevronRight size={12} />
                </a>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2 font-medium">Hours</h4>
                <ul className="text-sm text-obsidian space-y-1">
                  <li>{siteConfig.hours.weekday}</li>
                  <li>{siteConfig.hours.saturday}</li>
                  <li>{siteConfig.hours.sunday}</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2 font-medium">Contact</h4>
                <ul className="text-sm space-y-1">
                  <li><a href={`tel:${siteConfig.phone}`} className="text-obsidian hover:text-champagne transition-colors">{siteConfig.phone}</a></li>
                  <li><a href={`mailto:${siteConfig.email}`} className="text-obsidian hover:text-champagne transition-colors">{siteConfig.email}</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-champagne mb-2 font-medium">Good to Know</h4>
                <ul className="text-sm text-stone space-y-1">
                  <li>• Walk-ins welcome, appointments preferred</li>
                  <li>• Street parking and nearby garage available</li>
                  <li>• 2 min walk from High Street Kensington station</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative aspect-square lg:aspect-auto bg-ivory border border-border/50 overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin size={32} className="text-champagne mx-auto mb-4" />
              <p className="font-serif text-xl text-obsidian">Kensington, London</p>
              <p className="text-sm text-stone mt-2">{siteConfig.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[11px] uppercase tracking-[0.12em] text-champagne hover:text-obsidian transition-colors border border-champagne px-4 py-2 hover:bg-champagne hover:text-obsidian"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
