import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Scissors, 
  Truck, 
  X, 
  Check, 
  Share2, 
  Calendar,
  ExternalLink,
  Settings,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';
import './App.css';

// Default 5 initial royal cloth showcase slides
const DEFAULT_HERO_SLIDES = [
  {
    id: 'slide-1',
    image: '/images/hero_banner.jpg',
    title: 'Signature Imperial Couple Suite',
    subtitle: 'saddacloths Autumn-Winter Preview',
    tag: 'Signature Couture Suite'
  },
  {
    id: 'slide-2',
    image: '/images/men_sherwani.jpg',
    title: 'Royal Sapphire Velvet Sherwani',
    subtitle: 'Handcrafted Zardozi & Antique Dabka',
    tag: 'Bespoke Groom Masterpiece'
  },
  {
    id: 'slide-3',
    image: '/images/bridal_lehenga.jpg',
    title: 'Gulnar Crimson Heritage Lehenga',
    subtitle: 'Pure Raw Silk with Heirloom Gotapatti',
    tag: 'Bridal Heritage Glory'
  },
  {
    id: 'slide-4',
    image: '/images/silk_saree.jpg',
    title: 'Emerald Mayura Kanchipuram Silk',
    subtitle: 'Certified Handloom 24K Gold Zari Weave',
    tag: 'GI Certified Silk'
  },
  {
    id: 'slide-5',
    image: '/images/men_kurta.jpg',
    title: 'Mint Sovereign Silk Kurta Set',
    subtitle: 'Tonal Resham Needlework with Silk Dupatta',
    tag: 'Festive Luxury Wear'
  }
];

// Social Icon Components (matching Lucide style)
const Instagram = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Youtube = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

// Cloth items showcase data
const CLOTH_COLLECTIONS = [
  {
    id: 1,
    name: 'Royal Sapphire Velvet Sherwani',
    category: 'mens',
    categoryLabel: "Men's Royal Couture",
    price: '₹42,500',
    tag: 'Bespoke Masterpiece',
    rating: 4.9,
    reviews: 84,
    image: '/images/men_sherwani.jpg',
    description: 'Masterfully tailored in midnight sapphire royal velvet, featuring opulent gold zardozi motifs and antique dabka embroidery on collar and hems.',
    fabric: 'Pure Royal Velvet with Banarasi Silk Churidar',
    embroidery: 'Handcrafted Gold Zari & Resham Dabka'
  },
  {
    id: 2,
    name: 'Gulnar Crimson Bridal Lehenga',
    category: 'bridal',
    categoryLabel: 'Heritage Bridal',
    price: '₹78,000',
    tag: 'Bridal Heritage',
    rating: 5.0,
    reviews: 112,
    image: '/images/bridal_lehenga.jpg',
    description: 'An ethereal crimson red masterpiece adorned with intricate royal floral jaal, pure metallic zari accents, and an ornate handcrafted veil.',
    fabric: 'Pure Raw Silk with Sheer Organza Dupatta',
    embroidery: 'Authentic Zardozi, Cutdana & Sequin Detailing'
  },
  {
    id: 3,
    name: 'Emerald Mayura Kanchipuram Silk',
    category: 'sarees',
    categoryLabel: 'Pure Silk Sarees',
    price: '₹28,900',
    tag: 'GI Certified Silk',
    rating: 4.8,
    reviews: 95,
    image: '/images/silk_saree.jpg',
    description: 'Woven with centuries-old pit-loom traditions, this regal emerald saree highlights grand gold zari pallu with peacock and floral heritage medallions.',
    fabric: '100% Mulberry Kanchipuram Silk',
    embroidery: 'Pure 2G Gold Zari Weave'
  },
  {
    id: 4,
    name: 'Mint Sovereign Silk Kurta & Bandi',
    category: 'festive',
    categoryLabel: 'Festive & Occasion',
    price: '₹19,500',
    tag: 'Modern Classic',
    rating: 4.9,
    reviews: 67,
    image: '/images/men_kurta.jpg',
    description: 'Subtle pastel mint green chanderi silk kurta paired with an ivory Nehru bandi jacket featuring tonal floral thread embroidery.',
    fabric: 'Chanderi Silk & Handspun Linen Blend',
    embroidery: 'Tonal Resham Needlework'
  },
  {
    id: 5,
    name: 'The Imperial Wedding Couple Ensemble',
    category: 'bridal',
    categoryLabel: 'Signature Edition',
    price: '₹1,15,000',
    tag: 'Couture Suite',
    rating: 5.0,
    reviews: 140,
    image: '/images/hero_banner.jpg',
    description: 'Harmonious coordinating wedding couture pairing a structured bandhgala sherwani with a matching hand-embellished heirloom drape.',
    fabric: 'Matka Silk & Velvet Hybrid',
    embroidery: 'Gilded Heritage Gold Threadwork'
  }
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', phone: '', outfitInterest: '', date: '' });

  // Hero Slider & Admin Panel State
  const [slides, setSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('saddacloths_hero_slides');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_HERO_SLIDES;
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPausedOnHover, setIsPausedOnHover] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(3500);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPasswordError, setAdminPasswordError] = useState(false);

  // New slide form state
  const [newSlide, setNewSlide] = useState({
    title: '',
    subtitle: '',
    tag: 'Royal Collection',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  // Persist slides to localStorage
  const saveSlides = (newSlides) => {
    setSlides(newSlides);
    try {
      localStorage.setItem('saddacloths_hero_slides', JSON.stringify(newSlides));
    } catch {
      // quota safeguard
    }
  };

  // Auto-scroll Timer
  useEffect(() => {
    if (!isAutoPlaying || isPausedOnHover || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isPausedOnHover, slides.length, autoPlayInterval]);

  // Ensure currentSlideIndex stays valid
  useEffect(() => {
    if (currentSlideIndex >= slides.length) {
      setCurrentSlideIndex(Math.max(0, slides.length - 1));
    }
  }, [slides.length, currentSlideIndex]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (idx) => {
    setCurrentSlideIndex(idx);
  };

  // Image file upload handler (converts user selected photo to DataURL)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setNewSlide(prev => ({ ...prev, image: dataUrl }));
      setImagePreview(dataUrl);
      showToast('Photo loaded! Add a title and click "Add Cloth to Showcase".');
    };
    reader.readAsDataURL(file);
  };

  // Add new cloth slide
  const handleAddSlide = (e) => {
    e.preventDefault();
    if (!newSlide.image) {
      showToast('Please upload an image or provide an image URL first.');
      return;
    }
    if (!newSlide.title.trim()) {
      showToast('Please enter a title for the cloth.');
      return;
    }

    const added = {
      id: `slide-${Date.now()}`,
      image: newSlide.image,
      title: newSlide.title.trim(),
      subtitle: newSlide.subtitle.trim() || 'saddacloths Handcrafted Couture',
      tag: newSlide.tag.trim() || 'Exclusive Collection'
    };

    const updated = [...slides, added];
    saveSlides(updated);
    setCurrentSlideIndex(updated.length - 1);
    setNewSlide({ title: '', subtitle: '', tag: 'Royal Collection', image: '' });
    setImagePreview('');
    showToast(`Added "${added.title}" to hero showcase! Showing ${updated.length} cloths.`);
  };

  // Delete slide
  const handleDeleteSlide = (id) => {
    if (slides.length <= 1) {
      showToast('Showcase must keep at least 1 cloth image.');
      return;
    }
    const updated = slides.filter(s => s.id !== id);
    saveSlides(updated);
    showToast('Cloth removed from showcase.');
  };

  // Reset to default 5 royal cloths
  const handleResetDefaultSlides = () => {
    saveSlides(DEFAULT_HERO_SLIDES);
    setCurrentSlideIndex(0);
    showToast('Restored 5 default royal showcase cloths!');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone) return;
    setBookingSubmitted(true);
    showToast('Your boutique consultation appointment has been scheduled!');
  };

  const currentSlide = slides[currentSlideIndex] || slides[0] || DEFAULT_HERO_SLIDES[0];

  return (
    <div className="app-root">

      {/* Main Navigation */}
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo with saddacloths */}
          <a href="#" className="brand-logo" id="brand-logo">
            <div className="logo-icon">S</div>
            <div className="logo-text-group">
              <span className="brand-name gold-text">saddacloths</span>
              <span className="brand-sub">LUXURY TEXTILES & COUTURE</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link active">Home</a></li>
              <li><a href="#craftsmanship" className="nav-link">Craftsmanship</a></li>
              <li><a href="#location" className="nav-link">Store Location</a></li>
              <li><a href="#media" className="nav-link">Social Media</a></li>
            </ul>
          </nav>


        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-grid">
          {/* Hero Auto-Scrolling Slider Visual */}
          <div 
            className="hero-slider-container"
            onMouseEnter={() => setIsPausedOnHover(true)}
            onMouseLeave={() => setIsPausedOnHover(false)}
            id="hero-slider"
          >


            {/* Slides Array */}
            {slides.map((slide, idx) => (
              <div 
                key={slide.id}
                className={`hero-slide ${idx === currentSlideIndex ? 'active' : ''}`}
              >
                {/* Ambient Soft Blur Backdrop */}
                <div 
                  className="hero-slide-backdrop" 
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>

                {/* Uncropped Zoomed-Out Main Image */}
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="hero-slide-img"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                <div className="hero-slide-overlay"></div>
              </div>
            ))}

            {/* Previous & Next Arrow Buttons */}
            <button 
              className="slider-arrow-btn prev"
              onClick={prevSlide}
              aria-label="Previous Slide"
              id="slider-prev-btn"
            >
              <ChevronLeft size={22} />
            </button>

            <button 
              className="slider-arrow-btn next"
              onClick={nextSlide}
              aria-label="Next Slide"
              id="slider-next-btn"
            >
              <ChevronRight size={22} />
            </button>



            {/* Dynamic Active Floating Craft Card displaying Name, Title & Tag */}
            <div className="floating-craft-card" id="active-cloth-info-card">
              <div style={{ width: '100%' }}>
                {currentSlide.tag && (
                  <span className="slide-tag-pill">{currentSlide.tag}</span>
                )}
                <div className="floating-title">
                  {currentSlide.title || 'Untitled Royal Cloth'}
                </div>
                {currentSlide.subtitle && (
                  <div className="floating-sub">
                    {currentSlide.subtitle}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-tag">
              <Sparkles size={14} color="#d4af37" />
              <span>Handcrafted Heritage Perfection</span>
            </div>
            
            <h1 className="hero-title">
              Elegance Woven with Royalty at <span className="gold-text">saddacloths</span>
            </h1>

            <p className="hero-description">
              Welcome to <strong>saddacloths</strong> — where artisanal Indian craftsmanship harmonizes with modern couture. Discover handcrafted sherwanis, opulent bridal lehengas, authentic pure silks, and festive menswear designed to turn every celebration into an unforgettable spectacle.
            </p>

            <div className="hero-actions">
              <a href="https://maps.app.goo.gl/8htLGcLYanC4cJ959" target="_blank" rel="noopener noreferrer" className="cta-button" id="hero-explore-btn">
                <MapPin size={17} />
                <span>Our Store's Location</span>
              </a>
              <a href="tel:+918930255007" className="cta-secondary" id="hero-locate-btn">
                <Phone size={17} />
                <span>Call Now</span>
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <div className="stat-number">100%</div>
                <div className="stat-label">Pure Silk & Fabrics</div>
              </div>
              <div>
                <div className="stat-number">25+</div>
                <div className="stat-label">Years Master Weavers</div>
              </div>
              <div>
                <div className="stat-number">15K+</div>
                <div className="stat-label">Happy Royal Patrons</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Craft Highlights */}
      <div className="features-strip" id="craftsmanship">
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Scissors size={24} />
            </div>
            <div>
              <div className="feature-title">Bespoke Fit Guarantee</div>
              <div className="feature-desc">Custom tailoring by in-house master artisans.</div>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="feature-title">Authentic Fabrics</div>
              <div className="feature-desc">Pure mulberry silks, fine velvets & real zari.</div>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="feature-title">Heirloom Quality</div>
              <div className="feature-desc">Timeless needlecraft made to endure generations.</div>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Truck size={24} />
            </div>
            <div>
              <div className="feature-title">Worldwide Delivery</div>
              <div className="feature-desc">Insured luxury shipping across the globe.</div>
            </div>
          </div>
        </div>
      </div>


      {/* Store Location Section */}
      <section className="section-container location-section" id="location">
        <div className="section-header">
          <span className="section-tag">Flagship Boutique</span>
          <h2 className="section-title">Visit saddacloths in Person</h2>
          <p className="section-subtitle">
            Experience our rich fabrics in real life, touch the intricate embroidery, and enjoy personalized styling consultations at our flagship boutique.
          </p>
        </div>

        <div className="location-grid">
          {/* Store Info Card */}
          <div className="store-card">
            <div>
              <span className="store-badge">
                <MapPin size={16} />
                <span>Prime Fashion District</span>
              </span>
              <h3 className="store-name">saddacloths Studio & Cloth Shop</h3>

              <div className="store-details-list">
                <div className="store-item">
                  <div className="store-icon-circle">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="store-label">Physical Address</div>
                    <div className="store-value">
                      <strong>saddacloths Heritage Flagship</strong><br />
                      Shop No. 14-16, Royal Heritage Complex, Main Textile Boulevard,<br />
                      Opposite Grand Plaza, Connaught Circle, New Delhi 110001
                    </div>
                  </div>
                </div>

                <div className="store-item">
                  <div className="store-icon-circle">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="store-label">Store Hours</div>
                    <div className="store-value">
                      Monday to Saturday: <strong>10:30 AM – 9:00 PM</strong><br />
                      Sunday: <strong>11:00 AM – 8:00 PM</strong> (Walk-ins & Appointments Welcome)
                    </div>
                  </div>
                </div>

                <div className="store-item">
                  <div className="store-icon-circle">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="store-label">Direct Contact & WhatsApp</div>
                    <div className="store-value">
                      Phone: <a href="tel:+918930255007" style={{ color: 'var(--gold-light)' }}>+91 89302 55007</a><br />
                      Boutique Support: <a href="mailto:boutique@saddacloths.com" style={{ color: 'var(--gold-light)' }}>boutique@saddacloths.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="store-buttons">
              <a 
                href="https://maps.google.com/?q=saddacloths+Luxury+Fashion+Store" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-button"
                id="get-directions-btn"
              >
                <MapPin size={16} />
                <span>Get Driving Directions</span>
                <ExternalLink size={14} />
              </a>

              <a 
                href="https://wa.me/918930255007?text=Hi%20saddacloths%2C%20I%20am%20planning%20to%20visit%20your%20store%20today" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-secondary"
                id="location-whatsapp-btn"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Store Manager</span>
              </a>
            </div>
          </div>

          {/* Interactive Map & Appointment Booking */}
          <div className="map-visual-box">
            {/* Embedded Interactive Map representation */}
            <iframe 
              title="saddacloths Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.384667954992!2d77.214952!3d28.632425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b8d00001%3A0xb3a824490f8f1766!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="interactive-map-frame"
              allowFullScreen="" 
              loading="lazy"
            />
            
            <div className="map-overlay-badge">
              <MapPin size={18} color="#d4af37" />
              <div>
                <strong style={{ fontSize: '0.85rem' }}>saddacloths Flagship</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Centrally Located • Valet Parking Available</div>
              </div>
            </div>

            {/* Quick Consultation Form Box */}
            <div style={{ padding: '24px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-gold)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '8px', color: '#fff' }}>
                Book Personal Fitting Appointment
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Reserve a private styling lounge with our master designer.
              </p>

              {bookingSubmitted ? (
                <div style={{ padding: '12px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80', borderRadius: '8px', color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={18} />
                  <span>Appointment Confirmed! Our team will contact you at {bookingData.phone}.</span>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    required 
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="newsletter-input" 
                  />
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    required 
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="newsletter-input" 
                  />
                  <select 
                    className="newsletter-input"
                    value={bookingData.outfitInterest}
                    onChange={(e) => setBookingData({...bookingData, outfitInterest: e.target.value})}
                  >
                    <option value="">Select Interested Category</option>
                    <option value="Men's Sherwani">Men's Sherwani / Kurta</option>
                    <option value="Bridal Lehenga">Bridal Lehenga & Gown</option>
                    <option value="Pure Silk Saree">Pure Silk Saree</option>
                    <option value="Festive Wear">Festive Family Ensemble</option>
                  </select>
                  <input 
                    type="date" 
                    className="newsletter-input"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                  <button type="submit" className="cta-button" style={{ gridColumn: 'span 2', justifyContent: 'center' }}>
                    <Calendar size={16} />
                    <span>Confirm Free VIP Fitting</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Media Links Section */}
      <section className="social-section" id="media">
        <span className="section-tag">Connect With Us Online</span>
        <h2 className="section-title">Follow saddacloths On Media</h2>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Explore behind-the-scenes handloom weaving, latest runway arrivals, styling tips, and real wedding captures across all our social platforms.
        </p>

        <div className="social-cards-grid">
          {/* Instagram */}
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-card"
            id="social-instagram"
          >
            <div className="social-icon-box">
              <Instagram size={28} />
            </div>
            <div className="social-title">Instagram</div>
            <div className="social-handle">@saddacloths</div>
            <div className="social-tagline">Runway Reels & Bridal Looks</div>
          </a>

          {/* WhatsApp Direct */}
          <a 
            href="https://wa.me/918930255007?text=Hello%20saddacloths%20team" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-card"
            id="social-whatsapp"
          >
            <div className="social-icon-box">
              <MessageCircle size={28} />
            </div>
            <div className="social-title">WhatsApp Studio</div>
            <div className="social-handle">+91 98765 43210</div>
            <div className="social-tagline">Instant Stylist Support & Orders</div>
          </a>

          {/* Facebook */}
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-card"
            id="social-facebook"
          >
            <div className="social-icon-box">
              <Facebook size={28} />
            </div>
            <div className="social-title">Facebook</div>
            <div className="social-handle">saddacloths Official</div>
            <div className="social-tagline">Community, Reviews & Events</div>
          </a>

          {/* YouTube */}
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-card"
            id="social-youtube"
          >
            <div className="social-icon-box">
              <Youtube size={28} />
            </div>
            <div className="social-title">YouTube Channel</div>
            <div className="social-handle">saddacloths Couture</div>
            <div className="social-tagline">Artisan Stories & Fashion Films</div>
          </a>
        </div>
      </section>

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setQuickViewProduct(null)}
              id="modal-close-btn"
            >
              <X size={20} />
            </button>

            <img 
              src={quickViewProduct.image} 
              alt={quickViewProduct.name} 
              className="modal-img" 
            />

            <div className="modal-body">
              <span className="cloth-category-label">{quickViewProduct.categoryLabel}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '8px', color: '#fff' }}>
                {quickViewProduct.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', color: 'var(--gold-primary)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {quickViewProduct.rating} ({quickViewProduct.reviews} verified bridal & groom reviews)
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--gold-light)', marginBottom: '16px' }}>
                {quickViewProduct.price}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                {quickViewProduct.description}
              </p>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.82rem', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--gold-light)' }}>Fabric: </strong> {quickViewProduct.fabric}
                </div>
                <div style={{ fontSize: '0.82rem' }}>
                  <strong style={{ color: 'var(--gold-light)' }}>Embroidery: </strong> {quickViewProduct.embroidery}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <button 
                  className="cta-button" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => {
                    handleAddToBag(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Add To Bag</span>
                </button>

                <a 
                  href={`https://wa.me/918930255007?text=Hello%20saddacloths%2C%20I%20am%20interested%20in%20${encodeURIComponent(quickViewProduct.name)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-secondary"
                  style={{ justifyContent: 'center' }}
                >
                  <MessageCircle size={18} />
                  <span>Inquire Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Control Panel Modal */}
      {isAdminOpen && (
        <div className="admin-modal-backdrop" onClick={() => { setIsAdminOpen(false); setAdminAuthenticated(false); setAdminPassword(''); setAdminPasswordError(false); }}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>
                  <Settings size={22} color="#d4af37" />
                  <span>Showcase Admin Panel</span>
                </h3>
                <p>
                  {adminAuthenticated 
                    ? `Add and manage showcase cloth images (${slides.length} active items)`
                    : 'Enter password to access admin controls'
                  }
                </p>
              </div>
              <button 
                className="admin-close-btn"
                onClick={() => { setIsAdminOpen(false); setAdminAuthenticated(false); setAdminPassword(''); setAdminPasswordError(false); }}
                title="Close Admin Panel"
                id="admin-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {!adminAuthenticated ? (
              <div className="admin-modal-body">
                <div className="admin-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
                  <h4 style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '8px' }}>Admin Access Required</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '24px' }}>Enter your admin password to continue</p>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (adminPassword === '7sadakatali') {
                      setAdminAuthenticated(true);
                      setAdminPasswordError(false);
                    } else {
                      setAdminPasswordError(true);
                    }
                  }} style={{ maxWidth: '320px', margin: '0 auto' }}>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => { setAdminPassword(e.target.value); setAdminPasswordError(false); }}
                      placeholder="Enter admin password"
                      className="admin-input"
                      style={{ width: '100%', marginBottom: '12px', textAlign: 'center', fontSize: '1rem' }}
                      autoFocus
                    />
                    {adminPasswordError && (
                      <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '12px' }}>❌ Incorrect password. Please try again.</p>
                    )}
                    <button type="submit" className="cta-button" style={{ width: '100%', justifyContent: 'center' }}>
                      <ShieldCheck size={17} />
                      <span>Unlock Admin Panel</span>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
            <div className="admin-modal-body">

              {/* Add New Cloth Form */}
              <div className="admin-card">
                <div className="admin-card-title">
                  <span>Add New Cloth Image to Showcase</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>
                    Recommended: 5 - 10 cloth items
                  </span>
                </div>

                <form onSubmit={handleAddSlide}>
                  {/* Image Upload Area */}
                  <div className="admin-input-group" style={{ marginBottom: '14px' }}>
                    <span className="admin-label">Upload Cloth Image (From Your Computer):</span>
                    <div className="admin-upload-box">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload} 
                        className="admin-file-hidden"
                        id="admin-file-input"
                      />
                      <div className="admin-upload-content">
                        <Upload size={28} color="#d4af37" />
                        <div className="admin-upload-text">
                          <strong>Click here to choose photo from device</strong> (or drag & drop)
                        </div>
                        <div className="admin-upload-hint">Supports high resolution JPG, PNG, WEBP files</div>
                      </div>
                    </div>
                  </div>

                  {/* Or Image URL Input */}
                  <div className="admin-input-group" style={{ marginBottom: '14px' }}>
                    <span className="admin-label">Or Paste Image URL Directly:</span>
                    <input 
                      type="url"
                      placeholder="https://example.com/images/cloth-photo.jpg"
                      value={newSlide.image.startsWith('data:') ? '' : newSlide.image}
                      onChange={(e) => {
                        setNewSlide(prev => ({ ...prev, image: e.target.value }));
                        setImagePreview(e.target.value);
                      }}
                      className="admin-input"
                      id="admin-url-input"
                    />
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="admin-preview-box">
                      <img src={imagePreview} alt="Preview" className="admin-preview-img" />
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Image Ready</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--gold-light)' }}>
                          This photo will be displayed in the auto-scrolling hero banner
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setNewSlide(prev => ({ ...prev, image: '' })); setImagePreview(''); }}
                        className="admin-delete-btn"
                        style={{ marginLeft: 'auto' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Title and Tag Details */}
                  <div className="admin-form-grid" style={{ marginTop: '14px' }}>
                    <div className="admin-input-group">
                      <label className="admin-label" htmlFor="admin-cloth-title">Cloth Name / Title *</label>
                      <input 
                        id="admin-cloth-title"
                        type="text" 
                        placeholder="e.g. Royal Emerald Velvet Anarkali"
                        required
                        value={newSlide.title}
                        onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-label" htmlFor="admin-cloth-tag">Collection Tag</label>
                      <input 
                        id="admin-cloth-tag"
                        type="text" 
                        placeholder="e.g. Autumn Heritage / Bridal Special"
                        value={newSlide.tag}
                        onChange={(e) => setNewSlide({...newSlide, tag: e.target.value})}
                        className="admin-input"
                      />
                    </div>
                  </div>

                  <div className="admin-input-group" style={{ marginTop: '14px' }}>
                    <label className="admin-label" htmlFor="admin-cloth-sub">Subtitle / Craft Details</label>
                    <input 
                      id="admin-cloth-sub"
                      type="text" 
                      placeholder="e.g. Handcrafted Pure Zari Weave & Resham Needlework"
                      value={newSlide.subtitle}
                      onChange={(e) => setNewSlide({...newSlide, subtitle: e.target.value})}
                      className="admin-input"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="admin-submit-btn"
                    disabled={!newSlide.image || !newSlide.title.trim()}
                    id="admin-add-cloth-submit"
                  >
                    <Plus size={18} />
                    <span>Add Cloth to Auto-Scroll Showcase</span>
                  </button>
                </form>
              </div>

              {/* Manage Existing Cloth Slides List */}
              <div className="admin-card">
                <div className="admin-card-title">
                  <span>Currently Active Cloths ({slides.length} in auto-scroll)</span>
                  <button 
                    type="button"
                    className="speed-btn"
                    onClick={handleResetDefaultSlides}
                    title="Restore Original 5 Royal Ensembles"
                    style={{ fontSize: '0.74rem' }}
                  >
                    <RotateCcw size={12} style={{ marginRight: 4, display: 'inline' }} />
                    Reset to 5 Defaults
                  </button>
                </div>

                <div className="admin-slides-grid">
                  {slides.map((slide, idx) => (
                    <div 
                      key={slide.id} 
                      className={`admin-slide-card ${idx === currentSlideIndex ? 'current' : ''}`}
                    >
                      <div className="admin-slide-thumb-wrap">
                        <img src={slide.image} alt={slide.title} className="admin-slide-thumb" />
                        <span className="admin-slide-badge">Slide {idx + 1}</span>
                        {idx === currentSlideIndex && (
                          <span className="admin-slide-badge" style={{ left: 'auto', right: 8, background: '#10b981', color: '#fff', borderColor: '#10b981' }}>
                            Active Now
                          </span>
                        )}
                      </div>

                      <div className="admin-slide-details">
                        <div className="admin-slide-title" title={slide.title}>{slide.title}</div>
                        <div className="admin-slide-sub" title={slide.subtitle}>{slide.subtitle}</div>

                        <div className="admin-slide-actions">
                          <button 
                            type="button" 
                            className="admin-view-btn"
                            onClick={() => {
                              setCurrentSlideIndex(idx);
                              showToast(`Switched view to "${slide.title}"`);
                            }}
                          >
                            View
                          </button>

                          <button 
                            type="button" 
                            className="admin-delete-btn"
                            onClick={() => handleDeleteSlide(slide.id)}
                            title="Delete this cloth from showcase"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="toast-alert">
          <Sparkles size={20} color="#d4af37" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <a href="#" className="brand-logo">
                <div className="logo-icon">S</div>
                <div className="logo-text-group">
                  <span className="brand-name gold-text">saddacloths</span>
                  <span className="brand-sub">LUXURY TEXTILES & COUTURE</span>
                </div>
              </a>
              <p className="footer-about-text">
                Crafting peerless ethnic wear, bespoke bridal ensembles, and handwoven royal textiles. Designed with heritage, tailored for majesty.
              </p>
            </div>

            <div>
              <h4 className="footer-heading">Collections</h4>
              <ul className="footer-links">
                <li><a href="#collections" className="footer-link">Groom's Sherwanis</a></li>
                <li><a href="#collections" className="footer-link">Bridal Lehengas</a></li>
                <li><a href="#collections" className="footer-link">Pure Kanchipuram Silks</a></li>
                <li><a href="#collections" className="footer-link">Festive Kurta Ensembles</a></li>
                <li><a href="#collections" className="footer-link">Indo-Western Fusion</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Store & Studio</h4>
              <ul className="footer-links">
                <li><a href="#location" className="footer-link">Flagship Boutique</a></li>
                <li><a href="#location" className="footer-link">Directions & Map</a></li>
                <li><a href="#location" className="footer-link">Book VIP Appointment</a></li>
                <li><a href="#craftsmanship" className="footer-link">Master Weaving Artisans</a></li>
                <li><a href="tel:+918930255007" className="footer-link">Call Store: +91 89302 55007</a></li>
                <li>
                  <button 
                    onClick={() => setIsAdminOpen(true)} 
                    className="footer-link" 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--gold-light)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    id="footer-admin-link"
                  >
                    <Settings size={14} />
                    <span>Showcase Admin Panel</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Private VIP Club</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
                Receive invitations to private seasonal collection showcases and bridal trunk shows.
              </p>
              <div className="newsletter-box">
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button className="cta-button" style={{ padding: '8px 16px' }} onClick={() => showToast('Thank you for joining saddacloths VIP Circle!')}>
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} saddacloths. All Rights Reserved. Mastercrafted with pride.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="#home" style={{ color: 'var(--text-dim)' }}>Privacy Policy</a>
              <a href="#home" style={{ color: 'var(--text-dim)' }}>Terms of Service</a>
              <a href="#media" style={{ color: 'var(--text-dim)' }}>Media Relations</a>
              <button 
                onClick={() => setIsAdminOpen(true)} 
                style={{ 
                  background: 'rgba(212, 175, 55, 0.12)', 
                  border: '1px solid rgba(212, 175, 55, 0.35)', 
                  borderRadius: '4px', 
                  padding: '4px 10px', 
                  color: 'var(--gold-light)', 
                  cursor: 'pointer', 
                  fontSize: '0.75rem', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px' 
                }} 
                id="footer-admin-btn"
                title="Open Showcase Admin Panel"
              >
                <Settings size={12} />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
