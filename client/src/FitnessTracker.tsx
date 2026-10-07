import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import {
  ArrowLeft,
  Menu,
  X,
  Check,
  Star,
  QrCode,
  Smartphone,
  ChevronDown,
  ExternalLink,
  Apple
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   FITBOD GLOBAL STYLES & TYPOGRAPHY
   ───────────────────────────────────────────────────────────────────────────── */
const FitbodStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @import url('https://fonts.googleapis.com/css2?family=Roobert:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    :root {
      --fitbod-bg: #15161D;
      --fitbod-card: #21222A;
      --fitbod-crimson: #F2305A;
      --fitbod-crimson-hover: #E81845;
    }

    body {
      background-color: #15161D;
      color: #FFFFFF;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      margin: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .font-roobert {
      font-family: 'Roobert', 'Inter', sans-serif;
      letter-spacing: -0.02em;
    }

    .fitbod-hero-bg {
      background-color: #15161D;
      position: relative;
    }
    .fitbod-hero-bg::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 55%;
      height: 100%;
      background-image: radial-gradient(circle at right center, rgba(242, 48, 90, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }

    .fitbod-start-btn {
      background-color: #F2305A;
      color: #FFFFFF;
      font-style: italic;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 4px 15px rgba(242, 48, 90, 0.4);
    }
    .fitbod-start-btn:hover {
      background-color: #E81845;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(242, 48, 90, 0.6);
    }

    .glass-header {
      background: rgba(21, 22, 29, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .stealth-card {
      background: #21222A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .stealth-card:hover {
      background: #272834;
      border-color: rgba(242, 48, 90, 0.4);
      transform: translateY(-3px);
      box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.45);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #15161D; }
    ::-webkit-scrollbar-thumb { background: #2F313E; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #F2305A; }
  ` }} />
);

/* ─────────────────────────────────────────────────────────────────────────────
   FITBOD LOGO COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
const FitbodLogo = ({ className = "h-7", onClick }: { className?: string; onClick?: () => void }) => (
  <div 
    onClick={onClick} 
    className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
  >
    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F2305A] to-[#FF6B8B] flex items-center justify-center shadow-lg shadow-[#F2305A]/30 transform group-hover:scale-105 transition-transform">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4L18 4L14 20L2 20L6 4Z" fill="white" />
        <path d="M12 4L22 4L18 20L8 20L12 4Z" fill="white" fillOpacity="0.4" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="font-roobert font-black text-xl tracking-wider text-white uppercase italic flex items-center gap-1">
        FIT<span className="text-[#F2305A]">TRACK</span>
      </span>
      <span className="text-[9px] font-semibold text-[#8E8EA0] tracking-widest uppercase -mt-1">
        WORKOUT PLANNER
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   LAUREL ACCOLADE BADGE (Editor's Choice 250,000+ Reviews)
   ───────────────────────────────────────────────────────────────────────────── */
const LaurelAccolade = () => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center">
      {/* Left Laurel */}
      <svg className="w-8 h-12 text-[#9A9AA8]" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4C14 10 10 18 10 26C10 33 13 39 18 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 9C9 7 5 8 4 10C5 12 8 13 11 11" fill="currentColor" />
        <path d="M9 16C6 14 2 15 1 17C2 19 5 20 8 18" fill="currentColor" />
        <path d="M8 24C5 22 1 23 0 25C1 27 4 28 7 26" fill="currentColor" />
        <path d="M9 32C6 30 2 31 1 33C2 35 5 36 8 34" fill="currentColor" />
        <path d="M12 39C9 37 5 38 4 40C5 42 8 43 11 41" fill="currentColor" />
      </svg>
      
      {/* Apple & Text */}
      <div className="flex flex-col items-center px-1">
        <Apple className="w-3.5 h-3.5 text-white fill-white mb-0.5" />
        <span className="font-bold text-white text-xs italic tracking-tight">Editor’s Choice</span>
        <span className="text-[11px] font-extrabold text-[#F2305A] tracking-tight">250,000+ Reviews</span>
      </div>

      {/* Right Laurel */}
      <svg className="w-8 h-12 text-[#9A9AA8] -scale-x-100" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4C14 10 10 18 10 26C10 33 13 39 18 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 9C9 7 5 8 4 10C5 12 8 13 11 11" fill="currentColor" />
        <path d="M9 16C6 14 2 15 1 17C2 19 5 20 8 18" fill="currentColor" />
        <path d="M8 24C5 22 1 23 0 25C1 27 4 28 7 26" fill="currentColor" />
        <path d="M9 32C6 30 2 31 1 33C2 35 5 36 8 34" fill="currentColor" />
        <path d="M12 39C9 37 5 38 4 40C5 42 8 43 11 41" fill="currentColor" />
      </svg>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   QR CODE & MOBILE APP MODAL
   ───────────────────────────────────────────────────────────────────────────── */
const QrModal = ({ isOpen, onClose, onLaunchWeb }: { isOpen: boolean; onClose: () => void; onLaunchWeb: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md anim-fade-in">
      <div className="relative w-full max-w-md bg-[#21222A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#8E8EA0] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <FitbodLogo className="justify-center mb-4" />
          <h3 className="font-roobert text-2xl font-bold text-white">Scan to Get the App</h3>
          <p className="text-xs text-[#8E8EA0] mt-1.5 max-w-xs mx-auto">
            Point your camera to scan and sync your personalized workout routine across iOS, Android, and Web.
          </p>
        </div>

        {/* QR Simulation Card */}
        <div className="bg-white p-6 rounded-2xl max-w-[200px] mx-auto mb-6 shadow-xl flex flex-col items-center justify-center">
          <div className="w-36 h-36 border-4 border-black p-2 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-white">
            <QrCode className="w-28 h-28 text-black" />
            <div className="absolute inset-x-0 h-1 bg-[#F2305A] shadow-md shadow-[#F2305A] animate-pulse" style={{ top: '50%' }} />
          </div>
          <span className="text-[10px] font-black text-black uppercase tracking-widest mt-2">
            SCAN WITH CAMERA
          </span>
        </div>

        {/* App Store Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-[#15161D] hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-white"
          >
            <Apple className="w-5 h-5" />
            <div className="text-left">
              <span className="text-[8px] text-[#8E8EA0] block uppercase leading-none">Download on</span>
              <span className="text-xs font-bold leading-tight">App Store</span>
            </div>
          </a>

          <a
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-[#15161D] hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-white"
          >
            <Smartphone className="w-5 h-5" />
            <div className="text-left">
              <span className="text-[8px] text-[#8E8EA0] block uppercase leading-none">Get it on</span>
              <span className="text-xs font-bold leading-tight">Google Play</span>
            </div>
          </a>
        </div>

        <div className="pt-4 border-t border-white/10 text-center">
          <button
            onClick={() => {
              onClose();
              onLaunchWeb();
            }}
            className="text-xs font-bold text-[#F2305A] hover:underline cursor-pointer"
          >
            Or continue directly in Web Browser →
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN FITBOD LANDING PAGE
   ───────────────────────────────────────────────────────────────────────────── */
const LandingPage = ({ setView }: { setView: (view: 'landing' | 'signin' | 'signup') => void }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: "How does Fit-track personalize my workouts compared to static gym apps?",
      a: "Fit-track leverages a proprietary adaptive algorithm inspired by clinical exercise physiology. Rather than giving you static PDF routines, it evaluates your previous sets, reps, estimated 1-Rep Max (1RM), and muscle recovery state to compute the exact optimal weight, volume, and rest intervals for every session."
    },
    {
      q: "Can I use Fit-track if I only have a pair of dumbbells at home?",
      a: "Yes! Fit-track allows you to configure full equipment profiles (Full Gym, Home Dumbbells, Barbells, Cable Only, or Bodyweight). The algorithm automatically swaps exercises to ensure you still achieve progressive overload with whatever gear you have."
    },
    {
      q: "Is Fit-track eligible for HSA / FSA reimbursement?",
      a: "Yes, in many jurisdictions wellness and exercise prescription apps qualify for Health Savings Account (HSA) and Flexible Spending Account (FSA) reimbursement. You can download an itemized invoice from your profile dashboard."
    },
    {
      q: "How does the AI Nutrition & Food Logging feature work?",
      a: "Fit-track is equipped with Google Gemini AI multimodal analysis. You can describe your meal or log your daily food to automatically calculate macro targets (protein, carbohydrates, healthy fats) calibrated to your active daily caloric burn."
    },
    {
      q: "Can I cancel anytime or try it risk-free?",
      a: "Absolutely. All elite subscriptions include a 7-day full free trial, and you can cancel anytime with 1-click in your account settings with zero questions asked."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#15161D] text-white selection:bg-[#F2305A] selection:text-white">
      <FitbodStyles />

      {/* ── TOP HSA/FSA ANNOUNCEMENT BANNER ── */}
      <div className="bg-[#21222A] border-b border-white/10 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-[#F2305A] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest">
              NEW
            </span>
            <span className="text-white/90 font-medium text-xs truncate">
              Fit-track is now covered by HSA | FSA
            </span>
          </div>
          <button
            onClick={() => setQrModalOpen(true)}
            className="hidden sm:flex items-center gap-1 text-[#F2305A] font-bold hover:underline shrink-0 text-xs cursor-pointer ml-4"
          >
            Check Eligibility <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-8 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-header h-16' : 'h-20 bg-[#15161D]/70 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <FitbodLogo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-xs font-bold text-[#8E8EA0] hover:text-white transition-colors">
              Workouts
            </a>
            <a href="#smart-tracking" className="text-xs font-bold text-[#8E8EA0] hover:text-white transition-colors">
              Smart Tracking
            </a>
            <a href="#custom-fit" className="text-xs font-bold text-[#8E8EA0] hover:text-white transition-colors">
              Custom-Fit
            </a>
            <a href="#recovery" className="text-xs font-bold text-[#8E8EA0] hover:text-white transition-colors">
              Monitored Recovery
            </a>
            <a href="#pricing" className="text-xs font-bold text-[#8E8EA0] hover:text-white transition-colors">
              Pricing
            </a>
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate('/')}
                className="px-5 py-2.5 bg-[#F2305A] hover:bg-[#E81845] text-white rounded-lg text-xs font-black tracking-wider uppercase italic transition-all cursor-pointer shadow-md shadow-[#F2305A]/30"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => setView('signin')}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold text-[#8E8EA0] hover:text-white transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => setView('signup')}
                  className="px-5 py-2.5 bg-[#F2305A] hover:bg-[#E81845] text-white rounded-lg text-xs font-black tracking-wider uppercase italic transition-all cursor-pointer shadow-md shadow-[#F2305A]/30"
                >
                  Try Fitbod
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg bg-white/5 text-white cursor-pointer"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#F2305A]" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenu && (
          <div className="md:hidden absolute top-full inset-x-0 bg-[#21222A] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
            <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="text-sm font-bold text-white">Workouts</a>
            <a href="#smart-tracking" onClick={() => setMobileMenu(false)} className="text-sm font-bold text-white">Smart Tracking</a>
            <a href="#custom-fit" onClick={() => setMobileMenu(false)} className="text-sm font-bold text-white">Custom-Fit</a>
            <a href="#recovery" onClick={() => setMobileMenu(false)} className="text-sm font-bold text-white">Monitored Recovery</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="text-sm font-bold text-white">Pricing</a>
            
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenu(false);
                  setView('signup');
                }}
                className="w-full py-3 bg-[#F2305A] rounded-lg text-xs font-black tracking-wider uppercase italic text-center cursor-pointer"
              >
                Try Fitbod Free
              </button>
              <button
                onClick={() => {
                  setMobileMenu(false);
                  setView('signin');
                }}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-white text-center cursor-pointer"
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── EXACT FITBOD HERO SECTION ── */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center pt-32 pb-16 lg:py-0 bg-[#15161D] overflow-hidden">
        
        {/* Full-height Right Hero Graphic shifted further to the right */}
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-[68%] lg:w-[60%] xl:w-[55%] flex items-center justify-end pointer-events-none select-none z-0 translate-x-4 sm:translate-x-8 lg:translate-x-14">
          <img 
            src="https://fitbod.me/wp-content/uploads/2024/12/bg_hero_v2-scaled-1.webp" 
            alt="Fitbod Workout App" 
            className="h-full w-full object-cover object-left md:object-center"
          />
        </div>

        {/* Left-to-Right Dark Gradient Overlay so left text is 100% crisp and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#15161D] via-[#15161D]/90 md:via-[#15161D]/75 lg:via-[#15161D]/25 to-transparent pointer-events-none z-[1]" />
        
        {/* Subtle Top & Bottom Edge Blends */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#15161D] to-transparent pointer-events-none z-[1]" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#15161D] to-transparent pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10 py-12">
          <div className="max-w-xl lg:max-w-lg text-left">
            
            {/* Laurel Wreath Badge */}
            <div className="mb-6">
              <LaurelAccolade />
            </div>

            {/* Main Headline */}
            <h1 className="font-roobert font-black text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.04] tracking-tight uppercase mb-5 text-white">
              LESS PLANNING.<br />
              MORE PROGRESS.
            </h1>

            {/* Subtitle description */}
            <p className="text-sm sm:text-base text-[#A5A5B5] max-w-md leading-relaxed font-normal mb-5">
              Fitbod creates a personalized workout plan that updates with your body, recovery, and progress. Know exactly what to do next—without second guessing what’s best for you.
            </p>

            <p className="text-xs sm:text-sm text-[#8E8EA0] font-medium mb-8">
              Available on both Android and iOS.
            </p>

            {/* Start Now Button */}
            <div>
              <button
                onClick={() => setView('signup')}
                className="px-10 py-3.5 fitbod-start-btn rounded-lg text-sm font-black tracking-wider uppercase italic transition-all cursor-pointer inline-block"
              >
                START NOW
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── ACCOLADES STRIP ── */}
      <section className="bg-[#121319] border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5 text-[#F2305A] mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#F2305A]" />
                ))}
              </div>
              <span className="font-roobert font-black text-xl sm:text-2xl text-white">4.8 Rating</span>
              <span className="text-[11px] text-[#8E8EA0]">250,000+ Reviews</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-roobert font-black text-2xl sm:text-3xl text-white">15M+</span>
              <span className="text-[11px] text-[#8E8EA0] uppercase font-bold tracking-wider mt-0.5">Downloads</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-roobert font-black text-2xl sm:text-3xl text-white">120M+</span>
              <span className="text-[11px] text-[#8E8EA0] uppercase font-bold tracking-wider mt-0.5">Workouts logged</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 1: PERSONALIZED WORKOUTS ── */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#F2305A] flex items-center justify-center text-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h2 className="font-roobert font-black text-2xl sm:text-3xl text-white">
                  Personalized Workouts
                </h2>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white/90">
                A plan made for you and your goals
              </h3>

              <p className="text-sm sm:text-base text-[#8E8EA0] leading-relaxed max-w-lg">
                Fitbod removes the planning work behind strength training by creating a personalized routine that updates as you go—so you can focus on lifting, not figuring everything out.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="max-w-md w-full ml-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#21222A] lg:translate-x-4">
                <img 
                  src="https://fitbod.me/wp-content/uploads/2024/12/how-fitbod-works-hero.png" 
                  alt="Personalized Workouts" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURE 2: SMART TRACKING ── */}
      <section id="smart-tracking" className="py-20 md:py-28 bg-[#0D0E12] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-end">
              <div className="max-w-md w-full ml-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#21222A] lg:translate-x-4">
                <img 
                  src="https://fitbod.me/wp-content/uploads/2024/12/Smart-tracking-hero.png" 
                  alt="Smart Tracking" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#F2305A] flex items-center justify-center text-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h2 className="font-roobert font-black text-2xl sm:text-3xl text-white">
                  Smart Tracking
                </h2>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white/90">
                See your progress as it happens
              </h3>

              <p className="text-sm sm:text-base text-[#8E8EA0] leading-relaxed max-w-lg">
                Fitbod tracks your performance over time and updates your recommendations as you improve—so you always know you’re moving forward.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURE 3: CUSTOM-FIT WORKOUTS ── */}
      <section id="custom-fit" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#F2305A] flex items-center justify-center text-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h2 className="font-roobert font-black text-2xl sm:text-3xl text-white">
                  Custom-Fit Workouts
                </h2>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white/90">
                Built around your real life
              </h3>

              <p className="text-sm sm:text-base text-[#8E8EA0] leading-relaxed max-w-lg">
                Fitbod creates workouts based on your equipment, schedule, and preferences—so you can keep making progress without forcing your life to fit a rigid plan.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="max-w-md w-full ml-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#21222A] lg:translate-x-4">
                <img 
                  src="https://fitbod.me/wp-content/uploads/2024/12/hyper-personalized-hero.png" 
                  alt="Custom Fit Workouts" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURE 4: MONITORED RECOVERY ── */}
      <section id="recovery" className="py-20 md:py-28 bg-[#0D0E12] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-end">
              <div className="max-w-md w-full ml-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#21222A] lg:translate-x-4">
                <img 
                  src="https://fitbod.me/wp-content/uploads/2024/12/Recovery-hero.png" 
                  alt="Monitored Recovery" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#F2305A] flex items-center justify-center text-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h2 className="font-roobert font-black text-2xl sm:text-3xl text-white">
                  Monitored Recovery
                </h2>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white/90">
                Know what to train next
              </h3>

              <p className="text-sm sm:text-base text-[#8E8EA0] leading-relaxed max-w-lg">
                Fitbod uses your training history and recovery to recommend the right muscles for each session—so you can stop guessing and train with confidence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED IN PRESS STRIP ── */}
      <section className="py-14 bg-[#15161D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-extrabold text-[#8E8EA0] uppercase tracking-[0.25em] mb-8">
            FEATURED IN
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['The New York Times', 'NBC Sports', 'TIME', 'Business Insider', "Women's Health", "Men's Health", 'TechCrunch', 'People'].map((press) => (
              <span key={press} className="font-roobert font-bold text-base sm:text-lg text-white whitespace-nowrap tracking-tight">
                {press}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" className="py-20 bg-[#0D0E12] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-roobert font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
            Start Your Fitness Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#8E8EA0] mb-8">
            Try 7 days free. Cancel anytime with 1-click.
          </p>

          <div className="inline-flex items-center p-1 bg-[#21222A] rounded-lg border border-white/10 mb-10">
            <button
              onClick={() => setPricingCycle('monthly')}
              className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                pricingCycle === 'monthly' ? 'bg-white text-black font-extrabold' : 'text-[#8E8EA0]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPricingCycle('annual')}
              className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                pricingCycle === 'annual' ? 'bg-[#F2305A] text-white font-extrabold' : 'text-[#8E8EA0]'
              }`}
            >
              Annual <span className="bg-white/20 text-white text-[9px] px-1 py-0.2 rounded">SAVE 50%</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            {/* Free */}
            <div className="bg-[#21222A] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#8E8EA0] uppercase">Free Plan</span>
                <h3 className="font-roobert text-3xl font-black text-white mt-1">$0</h3>
                <p className="text-xs text-[#8E8EA0] mt-1 mb-6">Basic workout logging & exercise database</p>
                <div className="space-y-2.5 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D084]" />
                    <span>3 Custom AI Workouts / Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D084]" />
                    <span>400+ Exercise Video Demos</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setView('signup')}
                className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Elite */}
            <div className="bg-[#21222A] p-6 rounded-2xl border-2 border-[#F2305A] relative flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-extrabold text-[#F2305A] uppercase">Fitbod Elite</span>
                <h3 className="font-roobert text-3xl font-black text-white mt-1">
                  {pricingCycle === 'annual' ? '$6.67' : '$12.99'}<span className="text-xs text-[#8E8EA0]"> / mo</span>
                </h3>
                <p className="text-xs text-[#8E8EA0] mt-1 mb-6">
                  {pricingCycle === 'annual' ? 'Billed annually ($79.99/yr)' : 'Billed monthly'}
                </p>
                <div className="space-y-2.5 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F2305A] stroke-[3]" />
                    <span>Unlimited Adaptive Workouts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F2305A] stroke-[3]" />
                    <span>Real-Time Muscle Recovery Heatmap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F2305A] stroke-[3]" />
                    <span>Automatic Progressive Overload</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setView('signup')}
                className="w-full mt-6 py-3 fitbod-start-btn rounded-lg text-xs uppercase cursor-pointer"
              >
                Start 7-Day Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-left">
        <h2 className="font-roobert font-black text-2xl sm:text-3xl text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-[#21222A] rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#F2305A] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#F2305A] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#8E8EA0] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── EXACT FITBOD / FIT-TRACK FOOTER (MATCHING SCREENSHOT) ── */}
      <footer className="bg-[#21222C] text-[#EFEFF5] pt-16 pb-6 overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Top Links & Hexagon Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-10 items-start">
            
            {/* Column 1: COMPANY */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-black text-[#F2305A] tracking-[0.16em] uppercase">
                COMPANY
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-[#BDBDCB]">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">About Fit-Track</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Fitbod For Business</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Fitbod For Families</a></li>
              </ul>
            </div>

            {/* Column 2: EXPLORE */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-black text-[#F2305A] tracking-[0.16em] uppercase">
                EXPLORE
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-[#BDBDCB]">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Articles</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Workouts</a></li>
                <li><a href="#smart-tracking" className="hover:text-white transition-colors">Exercises</a></li>
                <li>
                  <a href="#recovery" className="text-[#F2305A] underline underline-offset-4 font-bold hover:text-[#ff4d73] transition-colors">
                    Strength Tester
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: SUPPORT */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-black text-[#F2305A] tracking-[0.16em] uppercase">
                SUPPORT
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-[#BDBDCB]">
                <li><a href="#" className="hover:text-white transition-colors">Help Articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accounts And Billing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Column 4: OFFERS */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-black text-[#F2305A] tracking-[0.16em] uppercase">
                OFFERS
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-[#BDBDCB]">
                <li><button onClick={() => setView('signup')} className="hover:text-white transition-colors text-left cursor-pointer">Gift Fitbod</button></li>
                <li><button onClick={() => setView('signup')} className="hover:text-white transition-colors text-left cursor-pointer">Redeem Code</button></li>
              </ul>
            </div>

            {/* Column 5: Hexagon Brand Logo (Top Right) */}
            <div className="col-span-2 md:col-span-1 flex justify-start md:justify-end items-start pt-1">
              <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                <svg className="w-full h-full text-[#F2305A]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Hexagonal Outline */}
                  <path d="M50 8L88 28.5V71.5L50 92L12 71.5V28.5L50 8Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
                  {/* Inner Stylized F */}
                  <path d="M37 30H67V40H49V49H63V59H49V70H37V30Z" fill="currentColor" />
                </svg>
              </div>
            </div>

          </div>

          {/* Giant Brand Typography: FIT-TRACK on 1 Single Line */}
          <div className="pt-4 pb-2 select-none overflow-hidden text-center w-full flex items-center justify-center">
            <h1 className="font-roobert font-black italic tracking-tighter text-[#EFEFF5] uppercase text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[14.5vw] leading-[0.85] text-center pointer-events-none whitespace-nowrap">
              FIT-TRACK
            </h1>
          </div>

        </div>

        {/* Bottom Pink Legal Bar Strip */}
        <div className="w-full border-t-2 border-[#F2305A] pt-4 mt-2">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8E8EA0] gap-3">
            <p>© 2026 Fit-Track / Fitbod Inc. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Ad Choices / Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── QR CODE POPUP MODAL ── */}
      <QrModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        onLaunchWeb={() => setView('signup')}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   AUTHENTICATION PAGES (Fitbod Theme)
   ───────────────────────────────────────────────────────────────────────────── */

const AuthLayout = ({ children, title, subtitle, setView }: { children: React.ReactNode; title: string; subtitle?: string; setView: (view: 'landing' | 'signin' | 'signup') => void }) => {
  return (
    <div className="min-h-screen bg-[#15161D] text-white flex flex-col p-4 md:p-8 relative overflow-hidden">
      <FitbodStyles />
      <button
        onClick={() => setView('landing')}
        className="gap-2 inline-flex items-center h-9 px-3 rounded-lg font-bold transition-all bg-[#21222A] hover:bg-[#2B2B36] text-[#8E8EA0] hover:text-white z-50 cursor-pointer w-fit border border-white/10 text-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="flex-1 flex items-center justify-center relative z-10 w-full py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <FitbodLogo className="justify-center mb-3" onClick={() => setView('landing')} />
            <h2 className="font-roobert font-black text-2xl text-white tracking-tight">{title}</h2>
            {subtitle && <p className="text-xs text-[#8E8EA0] mt-1">{subtitle}</p>}
          </div>

          <div className="bg-[#21222A] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInPage = ({ setView }: { setView: (view: 'landing' | 'signin' | 'signup') => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithProvider } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Logged in successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to continue your personalized training program."
      setView={setView}
    >
      <button
        type="button"
        onClick={() => loginWithProvider('google')}
        className="w-full h-11 rounded-lg bg-[#15161D] hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 mb-5 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#8E8EA0] uppercase tracking-wider block">Email</label>
          <input
            type="email"
            placeholder="athlete@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-10 bg-[#15161D] border border-white/10 rounded-lg px-3 text-xs text-white focus:border-[#F2305A] outline-none transition-all placeholder:text-white/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#8E8EA0] uppercase tracking-wider block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-10 bg-[#15161D] border border-white/10 rounded-lg px-3 text-xs text-white focus:border-[#F2305A] outline-none transition-all placeholder:text-white/30"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-2 fitbod-start-btn rounded-lg font-bold text-xs uppercase cursor-pointer"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-xs text-[#8E8EA0] mt-5">
        Don’t have an account?{' '}
        <button onClick={() => setView('signup')} className="text-[#F2305A] font-bold hover:underline cursor-pointer">
          Start Free Trial
        </button>
      </p>
    </AuthLayout>
  );
};

const SignUpPage = ({ setView }: { setView: (view: 'landing' | 'signin' | 'signup') => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, loginWithProvider } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sanitizedUsername = name.replace(/\s+/g, '_').toLowerCase();
      await signup({ username: sanitizedUsername, email, password });
      toast.success('Account created successfully! Welcome.');
    } catch (err: any) {
      toast.error(err.message || 'Signup failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your 7-day free trial with personalized workout planning."
      setView={setView}
    >
      <button
        type="button"
        onClick={() => loginWithProvider('google')}
        className="w-full h-11 rounded-lg bg-[#15161D] hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 mb-5 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign up with Google
      </button>

      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#8E8EA0] uppercase tracking-wider block">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-10 bg-[#15161D] border border-white/10 rounded-lg px-3 text-xs text-white focus:border-[#F2305A] outline-none transition-all placeholder:text-white/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#8E8EA0] uppercase tracking-wider block">Email</label>
          <input
            type="email"
            placeholder="athlete@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-10 bg-[#15161D] border border-white/10 rounded-lg px-3 text-xs text-white focus:border-[#F2305A] outline-none transition-all placeholder:text-white/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#8E8EA0] uppercase tracking-wider block">Password</label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full h-10 bg-[#15161D] border border-white/10 rounded-lg px-3 text-xs text-white focus:border-[#F2305A] outline-none transition-all placeholder:text-white/30"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-2 fitbod-start-btn rounded-lg font-bold text-xs uppercase cursor-pointer"
        >
          {loading ? 'Creating Account...' : 'START NOW'}
        </button>
      </form>

      <p className="text-center text-xs text-[#8E8EA0] mt-5">
        Already have an account?{' '}
        <button onClick={() => setView('signin')} className="text-[#F2305A] font-bold hover:underline cursor-pointer">
          Sign In
        </button>
      </p>
    </AuthLayout>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT EXPORT
   ───────────────────────────────────────────────────────────────────────────── */

export default function FitnessTracker() {
  const [view, setView] = useState<'landing' | 'signin' | 'signup'>('landing');

  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { background: '#21222A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      {view === 'landing' && <LandingPage setView={setView} />}
      {view === 'signin' && <SignInPage setView={setView} />}
      {view === 'signup' && <SignUpPage setView={setView} />}
    </>
  );
}
