import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { services } from '../data/siteData';

interface ConsultationProps {
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

interface Answers {
  style: string;
  maintenance: string;
  service: string;
  recommend: string;
}

const questions = [
  {
    key: 'style',
    question: 'What style direction interests you?',
    options: [
      { value: 'classic', label: 'Classic & Refined', desc: 'Timeless, clean, elegant' },
      { value: 'fade', label: 'Clean Fade', desc: 'Sharp, precise, modern' },
      { value: 'textured', label: 'Textured & Modern', desc: 'Movement, volume, character' },
      { value: 'longer', label: 'Longer & Layered', desc: 'Flowing, natural, scissor-cut' },
    ]
  },
  {
    key: 'maintenance',
    question: 'What is your preferred maintenance level?',
    options: [
      { value: 'minimal', label: 'Minimal', desc: 'Low effort, wash-and-go' },
      { value: 'moderate', label: 'Moderate', desc: 'Some styling, manageable' },
      { value: 'detailed', label: 'Detailed', desc: 'Full styling routine, precise' },
    ]
  },
  {
    key: 'service',
    question: 'What service are you considering?',
    options: [
      { value: 'haircut', label: 'Haircut', desc: 'Cut and styling' },
      { value: 'beard', label: 'Beard', desc: 'Trim and shape' },
      { value: 'both', label: 'Both', desc: 'Complete grooming' },
    ]
  },
  {
    key: 'recommend',
    question: 'Would you like your barber to recommend a style?',
    options: [
      { value: 'yes', label: 'Yes', desc: 'I\'d welcome professional guidance' },
      { value: 'no', label: 'No', desc: 'I have a specific style in mind' },
    ]
  }
];

function getRecommendations(answers: Answers) {
  const { style, maintenance, service, recommend } = answers;
  const recommendations: { service: typeof services[0]; reason: string }[] = [];

  if (service === 'beard') {
    recommendations.push({
      service: services.find(s => s.id === 'beard-ritual')!,
      reason: 'Your focus on beard grooming makes our Beard Ritual the ideal starting point.'
    });
    if (style === 'classic') {
      recommendations.push({
        service: services.find(s => s.id === 'traditional-shave')!,
        reason: 'A Traditional Shave complements classic beard styling beautifully.'
      });
    }
  } else if (service === 'both') {
    recommendations.push({
      service: services.find(s => s.id === 'gentleman-combo')!,
      reason: 'The Gentleman\'s Combination gives you a complete haircut and beard service in one appointment.'
    });
  } else {
    // Haircut recommendations based on style
    if (style === 'classic') {
      recommendations.push({
        service: services.find(s => s.id === 'signature-cut')!,
        reason: 'The Signature Cut delivers a refined, tailored result suited to classic styling.'
      });
    } else if (style === 'fade') {
      recommendations.push({
        service: services.find(s => s.id === 'precision-fade')!,
        reason: 'The Precision Fade is designed for sharp, controlled results with clean blending.'
      });
    } else if (style === 'textured') {
      recommendations.push({
        service: services.find(s => s.id === 'signature-cut')!,
        reason: 'The Signature Cut allows for textured styling with personalized finishing.'
      });
    } else {
      recommendations.push({
        service: services.find(s => s.id === 'scissor-atelier')!,
        reason: 'The Scissor Atelier is crafted for longer, layered styles with natural movement.'
      });
    }

    if (maintenance === 'detailed') {
      recommendations.push({
        service: services.find(s => s.id === 'beard-ritual')!,
        reason: 'Adding the Beard Ritual completes your grooming with precise finishing.'
      });
    }
  }

  if (recommend === 'yes' && recommendations.length < 2) {
    recommendations.push({
      service: services.find(s => s.id === 'signature-cut')!,
      reason: 'Our Signature Cut includes a personal consultation where your barber will recommend the best approach for your features.'
    });
  }

  // Ensure we have at least 2 recommendations
  if (recommendations.length < 2) {
    const fallback = services.find(s => !recommendations.some(r => r.service.id === s.id));
    if (fallback) {
      recommendations.push({
        service: fallback,
        reason: 'This service pairs well with your preferences and offers a refined result.'
      });
    }
  }

  return recommendations.slice(0, 3);
}

export function StyleConsultation({ isOpen, onClose, onBookService }: ConsultationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ style: '', maintenance: '', service: '', recommend: '' });
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].key]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 200);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({ style: '', maintenance: '', service: '', recommend: '' });
    setShowResults(false);
  };

  const handleClose = () => {
    handleRestart();
    onClose();
  };

  const recommendations = showResults ? getRecommendations(answers) : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-obsidian/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="bg-porcelain w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Style consultation"
        >
          {/* Header */}
          <div className="sticky top-0 bg-porcelain border-b border-border/50 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="font-serif text-xl text-obsidian">Find Your Style</h2>
              {!showResults && (
                <p className="text-[11px] uppercase tracking-[0.1em] text-taupe mt-0.5">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              )}
            </div>
            <button onClick={handleClose} className="p-2 text-stone hover:text-obsidian transition-colors" aria-label="Close consultation">
              <X size={20} />
            </button>
          </div>

          {/* Progress */}
          {!showResults && (
            <div className="h-[2px] bg-border">
              <div
                className="h-full bg-champagne transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-8">
            {!showResults ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-serif text-2xl text-obsidian mb-2">{questions[currentQuestion].question}</h3>
                  <p className="text-sm text-stone mb-6">Select the option that best describes your preference.</p>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full text-left p-4 border transition-all duration-200 ${
                          answers[questions[currentQuestion].key as keyof Answers] === option.value
                            ? 'border-champagne bg-ivory'
                            : 'border-border hover:border-stone'
                        }`}
                      >
                        <h4 className="text-obsidian font-medium">{option.label}</h4>
                        <p className="text-xs text-stone mt-0.5">{option.desc}</p>
                      </button>
                    ))}
                  </div>

                  {currentQuestion > 0 && (
                    <button
                      onClick={() => setCurrentQuestion(prev => prev - 1)}
                      className="mt-6 text-[11px] uppercase tracking-[0.1em] text-stone hover:text-obsidian transition-colors flex items-center gap-1"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-serif text-2xl text-obsidian mb-2">Your Recommendations</h3>
                <p className="text-sm text-stone mb-6">Based on your preferences, we recommend the following services.</p>

                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={rec.service.id} className="p-4 border border-border">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.1em] text-champagne">Recommendation {index + 1}</span>
                          <h4 className="font-serif text-lg text-obsidian mt-1">{rec.service.name}</h4>
                          <p className="text-sm text-stone mt-1">{rec.reason}</p>
                          <p className="text-xs text-taupe mt-2">£{rec.service.price} · {rec.service.duration} min</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { onBookService(rec.service.id); handleClose(); }}
                        className="mt-3 text-[11px] uppercase tracking-[0.12em] text-champagne hover:text-obsidian transition-colors font-medium flex items-center gap-1"
                      >
                        Book This Service <ChevronRight size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-taupe mt-6 italic">
                  These are general recommendations based on your preferences. Your barber will discuss the best approach during your consultation.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={handleRestart}
                    className="text-[11px] uppercase tracking-[0.1em] text-stone hover:text-obsidian transition-colors flex items-center gap-1 px-4 py-2 border border-border"
                  >
                    <RotateCcw size={12} /> Start Again
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-[11px] uppercase tracking-[0.1em] text-obsidian hover:text-champagne transition-colors px-4 py-2"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
