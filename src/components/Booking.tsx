import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Calendar, Clock, User, AlertCircle } from 'lucide-react';
import { services, barbers, getAvailability, type Service } from '../data/siteData';

interface BookingProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
  initialBarberId?: string | null;
}

type BookingStep = 'service' | 'barber' | 'date' | 'time' | 'details' | 'review' | 'confirmation';

interface BookingState {
  service: Service | null;
  barberId: string | null;
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const initialState: BookingState = {
  service: null,
  barberId: null,
  date: null,
  time: null,
  name: '',
  email: '',
  phone: '',
  notes: ''
};

const stepOrder: BookingStep[] = ['service', 'barber', 'date', 'time', 'details', 'review', 'confirmation'];

export function BookingFlow({ isOpen, onClose, initialService, initialBarberId }: BookingProps) {
  const [step, setStep] = useState<BookingStep>('service');
  const [state, setState] = useState<BookingState>(() => ({
    ...initialState,
    service: initialService || null,
    barberId: initialBarberId || null,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber] = useState(() => `UC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);

  const availability = useMemo(() => getAvailability(), []);

  // Update when initial props change while modal is open
  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setState(prev => ({ ...prev, service: initialService }));
        setStep('barber');
      }
      if (initialBarberId) {
        setState(prev => ({ ...prev, barberId: initialBarberId }));
      }
    }
  }, [isOpen, initialService, initialBarberId]);

  const updateState = (updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
    setErrors({});
  };

  const goNext = () => {
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const goBack = () => {
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const validateDetails = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!state.name.trim()) newErrors.name = 'Please enter your name';
    if (!state.email.trim()) newErrors.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) newErrors.email = 'Please enter a valid email';
    if (!state.phone.trim()) newErrors.phone = 'Please enter your phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('service');
    setState(initialState);
    setErrors({});
    onClose();
  };

  const selectedBarber = barbers.find(b => b.id === state.barberId);
  const stepIndex = stepOrder.indexOf(step);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-obsidian/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-porcelain w-full max-w-2xl min-h-screen sm:min-h-0 sm:my-8 sm:rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Book an appointment"
        >
          {/* Header */}
          <div className="sticky top-0 bg-porcelain border-b border-border/50 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              {stepIndex > 0 && step !== 'confirmation' && (
                <button onClick={goBack} className="p-1 text-stone hover:text-obsidian transition-colors" aria-label="Go back">
                  <ChevronLeft size={20} />
                </button>
              )}
              <div>
                <h2 className="font-serif text-xl text-obsidian">Book Appointment</h2>
                {step !== 'confirmation' && (
                  <p className="text-[11px] uppercase tracking-[0.1em] text-taupe mt-0.5">
                    Step {Math.min(stepIndex + 1, 6)} of 6
                  </p>
                )}
              </div>
            </div>
            <button onClick={handleClose} className="p-2 text-stone hover:text-obsidian transition-colors" aria-label="Close booking">
              <X size={20} />
            </button>
          </div>

          {/* Progress bar */}
          {step !== 'confirmation' && (
            <div className="h-[2px] bg-border">
              <div
                className="h-full bg-champagne transition-all duration-500"
                style={{ width: `${((stepIndex + 1) / 6) * 100}%` }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {/* Step: Service */}
              {step === 'service' && (
                <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <h3 className="font-serif text-2xl text-obsidian mb-1">Choose a Service</h3>
                  <p className="text-sm text-stone mb-6">Select the service you'd like to book.</p>
                  <div className="space-y-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => updateState({ service })}
                        className={`w-full text-left p-4 border transition-all duration-200 ${
                          state.service?.id === service.id
                            ? 'border-champagne bg-ivory'
                            : 'border-border hover:border-stone'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-serif text-lg text-obsidian">{service.name}</h4>
                            <p className="text-sm text-stone mt-1">{service.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-taupe">
                              <span className="flex items-center gap-1"><Clock size={11} />{service.duration} min</span>
                            </div>
                          </div>
                          <span className="font-serif text-xl text-obsidian flex-shrink-0 ml-4">£{service.price}</span>
                        </div>
                        {state.service?.id === service.id && (
                          <div className="absolute top-4 right-4">
                            <Check size={16} className="text-champagne" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={goNext}
                    disabled={!state.service}
                    className="mt-6 w-full text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3.5 bg-obsidian text-porcelain hover:bg-espresso disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step: Barber */}
              {step === 'barber' && (
                <motion.div key="barber" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <h3 className="font-serif text-2xl text-obsidian mb-1">Choose Your Barber</h3>
                  <p className="text-sm text-stone mb-6">Select a preferred barber or leave it to availability.</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => updateState({ barberId: null })}
                      className={`w-full text-left p-4 border transition-all duration-200 ${
                        state.barberId === null ? 'border-champagne bg-ivory' : 'border-border hover:border-stone'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-ivory border border-border flex items-center justify-center">
                          <User size={16} className="text-taupe" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-obsidian">Any Available Barber</h4>
                          <p className="text-xs text-stone">Next available appointment</p>
                        </div>
                      </div>
                    </button>
                    {barbers.map((barber) => (
                      <button
                        key={barber.id}
                        onClick={() => updateState({ barberId: barber.id })}
                        className={`w-full text-left p-4 border transition-all duration-200 ${
                          state.barberId === barber.id ? 'border-champagne bg-ivory' : 'border-border hover:border-stone'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={barber.image} alt={barber.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h4 className="font-serif text-lg text-obsidian">{barber.name}</h4>
                            <p className="text-xs text-stone">{barber.specialties.slice(0, 2).join(', ')}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={goNext}
                    className="mt-6 w-full text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3.5 bg-obsidian text-porcelain hover:bg-espresso transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step: Date */}
              {step === 'date' && (
                <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <h3 className="font-serif text-2xl text-obsidian mb-1">Choose a Date</h3>
                  <p className="text-sm text-stone mb-6">Select your preferred appointment date.</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {Object.keys(availability).map((dateStr) => {
                      const date = new Date(dateStr + 'T00:00:00');
                      const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
                      const dayNum = date.getDate();
                      const month = date.toLocaleDateString('en-GB', { month: 'short' });
                      const isSelected = state.date === dateStr;
                      return (
                        <button
                          key={dateStr}
                          onClick={() => updateState({ date: dateStr, time: null })}
                          className={`p-3 border text-center transition-all duration-200 ${
                            isSelected
                              ? 'border-champagne bg-ivory'
                              : 'border-border hover:border-stone'
                          }`}
                        >
                          <span className="text-[10px] uppercase tracking-wider text-taupe block">{dayName}</span>
                          <span className="font-serif text-xl text-obsidian block">{dayNum}</span>
                          <span className="text-[10px] text-taupe block">{month}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={goNext}
                    disabled={!state.date}
                    className="mt-6 w-full text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3.5 bg-obsidian text-porcelain hover:bg-espresso disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step: Time */}
              {step === 'time' && (
                <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <h3 className="font-serif text-2xl text-obsidian mb-1">Choose a Time</h3>
                  <p className="text-sm text-stone mb-6">
                    {state.date && new Date(state.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {(state.date ? availability[state.date] : []).map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && updateState({ time: slot.time })}
                        disabled={!slot.available}
                        className={`p-3 border text-center text-sm transition-all duration-200 ${
                          state.time === slot.time
                            ? 'border-champagne bg-ivory text-obsidian font-medium'
                            : slot.available
                              ? 'border-border hover:border-stone text-obsidian'
                              : 'border-border/30 text-border cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={goNext}
                    disabled={!state.time}
                    className="mt-6 w-full text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3.5 bg-obsidian text-porcelain hover:bg-espresso disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step: Details */}
              {step === 'details' && (
                <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <h3 className="font-serif text-2xl text-obsidian mb-1">Your Details</h3>
                  <p className="text-sm text-stone mb-6">Please provide your contact information.</p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="booking-name" className="text-[11px] uppercase tracking-[0.1em] text-stone block mb-1.5">Full Name *</label>
                      <input
                        id="booking-name"
                        type="text"
                        value={state.name}
                        onChange={(e) => updateState({ name: e.target.value })}
                        className={`w-full px-4 py-3 border bg-white text-obsidian text-sm transition-colors ${errors.name ? 'border-red-400' : 'border-border focus:border-champagne'} outline-none`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="booking-email" className="text-[11px] uppercase tracking-[0.1em] text-stone block mb-1.5">Email *</label>
                      <input
                        id="booking-email"
                        type="email"
                        value={state.email}
                        onChange={(e) => updateState({ email: e.target.value })}
                        className={`w-full px-4 py-3 border bg-white text-obsidian text-sm transition-colors ${errors.email ? 'border-red-400' : 'border-border focus:border-champagne'} outline-none`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="text-[11px] uppercase tracking-[0.1em] text-stone block mb-1.5">Phone *</label>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={state.phone}
                        onChange={(e) => updateState({ phone: e.target.value })}
                        className={`w-full px-4 py-3 border bg-white text-obsidian text-sm transition-colors ${errors.phone ? 'border-red-400' : 'border-border focus:border-champagne'} outline-none`}
                        placeholder="+44 7700 000000"
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="booking-notes" className="text-[11px] uppercase tracking-[0.1em] text-stone block mb-1.5">Notes (optional)</label>
                      <textarea
                        id="booking-notes"
                        value={state.notes}
                        onChange={(e) => updateState({ notes: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-obsidian text-sm transition-colors focus:border-champagne outline-none resize-none h-20"
                        placeholder="Any preferences or notes for your barber..."
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => { if (validateDetails()) goNext(); }}
                    className="mt-6 w-full text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3.5 bg-obsidian text-porcelain hover:bg-espresso transition-colors flex items-center justify-center gap-2"
                  >
                    Review Booking <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step: Review */}
              {step === 'review' && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <h3 className="font-serif text-2xl text-obsidian mb-1">Review Your Appointment</h3>
                  <p className="text-sm text-stone mb-6">Please confirm the details below.</p>
                  
                  <div className="border border-border divide-y divide-border/50">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.1em] text-taupe">Service</span>
                        <p className="text-sm text-obsidian font-medium">{state.service?.name}</p>
                      </div>
                      <span className="font-serif text-lg text-obsidian">£{state.service?.price}</span>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-[0.1em] text-taupe">Barber</span>
                      <p className="text-sm text-obsidian font-medium">{selectedBarber?.name || 'Any Available Barber'}</p>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-[0.1em] text-taupe">Date & Time</span>
                      <p className="text-sm text-obsidian font-medium">
                        {state.date && new Date(state.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        {' at '}{state.time}
                      </p>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-[0.1em] text-taupe">Duration</span>
                      <p className="text-sm text-obsidian font-medium">{state.service?.duration} minutes</p>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-[0.1em] text-taupe">Contact</span>
                      <p className="text-sm text-obsidian">{state.name}</p>
                      <p className="text-xs text-stone">{state.email} · {state.phone}</p>
                    </div>
                  </div>

                  <p className="text-xs text-taupe mt-4 italic">
                    This is a demonstration booking. No real appointment will be created.
                  </p>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="mt-6 w-full text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3.5 bg-champagne text-obsidian hover:bg-obsidian hover:text-porcelain disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      'Confirm Appointment'
                    )}
                  </button>
                </motion.div>
              )}

              {/* Step: Confirmation */}
              {step === 'confirmation' && (
                <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 border-2 border-champagne rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={28} className="text-champagne" />
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl text-obsidian">Appointment Confirmed</h3>
                    <p className="text-sm text-stone mt-2">Your booking has been received.</p>
                    
                    <div className="mt-8 p-6 bg-ivory border border-border text-left">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-taupe mb-3">Reference</p>
                      <p className="font-mono text-lg text-obsidian">{referenceNumber}</p>
                      
                      <div className="mt-4 space-y-2 text-sm">
                        <p className="text-obsidian"><span className="text-taupe">Service:</span> {state.service?.name}</p>
                        <p className="text-obsidian"><span className="text-taupe">Barber:</span> {selectedBarber?.name || 'Any Available'}</p>
                        <p className="text-obsidian"><span className="text-taupe">Date:</span> {state.date && new Date(state.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at {state.time}</p>
                        <p className="text-obsidian"><span className="text-taupe">Total:</span> £{state.service?.price}</p>
                      </div>
                    </div>

                    <p className="text-xs text-taupe mt-4 italic">
                      This is a demonstration. No real appointment has been booked.
                    </p>

                    <button
                      onClick={handleClose}
                      className="mt-8 text-[11px] uppercase tracking-[0.15em] font-medium px-7 py-3.5 border border-obsidian text-obsidian hover:bg-obsidian hover:text-porcelain transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
