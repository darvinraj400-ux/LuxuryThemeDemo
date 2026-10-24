import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Navbar, Footer } from './components/Layout';
import { Hero, TrustStrip, ServicesSection, PortfolioSection, BarbersSection, StudioSection, ConsultationTeaser, FAQSection, TestimonialsSection, LocationSection } from './components/Sections';
import { BookingFlow } from './components/Booking';
import { StyleConsultation } from './components/Consultation';
import { services, type Service } from './data/siteData';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [initialService, setInitialService] = useState<Service | null>(null);
  const [initialBarberId, setInitialBarberId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track active section for nav highlighting
  useEffect(() => {
    const sections = ['services', 'barbers', 'portfolio', 'studio', 'location'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard events for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (bookingOpen) setBookingOpen(false);
        if (consultationOpen) setConsultationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookingOpen, consultationOpen]);

  const openBooking = useCallback(() => {
    setBookingOpen(true);
  }, []);

  const handleBookService = useCallback((service: Service) => {
    setInitialService(service);
    setInitialBarberId(null);
    setBookingOpen(true);
  }, []);

  const handleBookBarber = useCallback((barberId: string) => {
    setInitialService(null);
    setInitialBarberId(barberId);
    setBookingOpen(true);
  }, []);

  const handleBookServiceFromConsultation = useCallback((serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setInitialService(service);
      setInitialBarberId(null);
      setBookingOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-porcelain">
      <Navbar onBookingOpen={openBooking} activeSection={activeSection} />
      
      <main>
        <Hero onBookingOpen={openBooking} />
        <TrustStrip />
        <ServicesSection onBookService={handleBookService} />
        <PortfolioSection />
        <BarbersSection onBookBarber={handleBookBarber} />
        <StudioSection onBookingOpen={openBooking} />
        <ConsultationTeaser onOpenConsultation={() => setConsultationOpen(true)} />
        <TestimonialsSection />
        <FAQSection />
        <LocationSection />
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingFlow
        isOpen={bookingOpen}
        onClose={() => { setBookingOpen(false); setInitialService(null); setInitialBarberId(null); }}
        initialService={initialService}
        initialBarberId={initialBarberId}
      />

      {/* Consultation Modal */}
      <StyleConsultation
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        onBookService={handleBookServiceFromConsultation}
      />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-obsidian/80 text-white hover:bg-obsidian transition-colors flex items-center justify-center backdrop-blur-sm"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
