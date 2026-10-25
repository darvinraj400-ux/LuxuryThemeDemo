import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../data/siteData';

interface NavbarProps {
  onBookingOpen: () => void;
  activeSection: string;
}

export function Navbar({ onBookingOpen, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'The Barbers', href: '#barbers' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Our Studio', href: '#studio' },
    { label: 'Visit Us', href: '#location' },
  ];

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-porcelain/95 backdrop-blur-sm border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
          >
            <div className={`w-6 h-6 border transition-colors duration-300 ${scrolled ? 'border-obsidian' : 'border-white'}`}
              style={{ transform: 'rotate(45deg)' }} />
            <span className={`font-serif text-lg tracking-wide font-medium transition-colors duration-300 ${
              scrolled ? 'text-obsidian' : 'text-white'
            }`}>
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-[13px] uppercase tracking-[0.12em] font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-champagne after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled
                    ? activeSection === link.href.slice(1) ? 'text-obsidian after:w-full' : 'text-stone hover:text-obsidian'
                    : activeSection === link.href.slice(1) ? 'text-white after:w-full' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBookingOpen}
              className={`hidden lg:block text-[11px] uppercase tracking-[0.15em] font-medium px-5 py-2.5 border transition-all duration-300 ${
                scrolled
                  ? 'border-obsidian text-obsidian hover:bg-obsidian hover:text-porcelain'
                  : 'border-white/60 text-white hover:bg-white hover:text-obsidian'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-obsidian' : 'text-white'}`}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <span className="font-serif text-lg text-white tracking-wide">{siteConfig.name}</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-8 pt-20"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-serif text-2xl text-white/90 hover:text-champagne transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => { setMobileOpen(false); onBookingOpen(); }}
                className="mt-4 text-[12px] uppercase tracking-[0.15em] font-medium px-8 py-3 border border-champagne text-champagne hover:bg-champagne hover:text-obsidian transition-all"
              >
                Book Appointment
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-obsidian text-white/70 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 border border-champagne" style={{ transform: 'rotate(45deg)' }} />
              <span className="font-serif text-lg text-white tracking-wide">{siteConfig.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mt-4">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-champagne mb-4 font-medium">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Services', href: '#services' },
                { label: 'The Barbers', href: '#barbers' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Our Studio', href: '#studio' },
                { label: 'Visit Us', href: '#location' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-champagne mb-4 font-medium">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a></li>
              <li className="text-white/40">{siteConfig.address}</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-champagne mb-4 font-medium">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li>{siteConfig.hours.weekday}</li>
              <li>{siteConfig.hours.saturday}</li>
              <li>{siteConfig.hours.sunday}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">Instagram</a>
            <a href={`mailto:${siteConfig.email}`} className="text-xs text-white/40 hover:text-white transition-colors">Email</a>
            <a href={`tel:${siteConfig.phone}`} className="text-xs text-white/40 hover:text-white transition-colors">Call</a>
          </div>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Demonstration website. Services and availability are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
