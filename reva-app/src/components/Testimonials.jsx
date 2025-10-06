import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    type: 'marketer',
    name: 'Michael Rodriguez',
    role: 'Head of Growth',
    company: 'TechFlow Solutions',
    logo: '🏢',
    image: '👨‍💼',
    rating: 5,
    quote: 'REVA completely transformed our customer acquisition strategy. We reduced our CAC by 68% while scaling to 10,000+ monthly conversions.',
    metrics: {
      cac: '-68%',
      conversions: '10K+/mo',
      roi: '4.2x'
    }
  },
  {
    id: 2,
    type: 'promoter',
    name: 'Jessica Liu',
    role: 'Digital Influencer',
    company: 'Self-Employed',
    logo: '💼',
    image: '👩‍💼',
    rating: 5,
    quote: 'Finally, a platform that values quality traffic! I\'m earning $8,500+ monthly by sharing products I genuinely believe in.',
    metrics: {
      monthly: '$8,500+',
      clicks: '125K',
      rate: '$0.85/click'
    }
  },
  {
    id: 3,
    type: 'marketer',
    name: 'David Thompson',
    role: 'CMO',
    company: 'E-Commerce Plus',
    logo: '🛍️',
    image: '👨‍💼',
    rating: 5,
    quote: 'We migrated from traditional PPC and saw immediate results. Our conversion rate jumped 3.5x while cutting ad spend by 40%.',
    metrics: {
      conversion: '+350%',
      adSpend: '-40%',
      revenue: '+180%'
    }
  },
  {
    id: 4,
    type: 'promoter',
    name: 'Aisha Patel',
    role: 'Content Creator',
    company: 'Lifestyle Blog',
    logo: '📱',
    image: '👩‍💼',
    rating: 5,
    quote: 'REVA\'s transparent tracking and instant payments changed everything. I know exactly what I\'m earning and get paid weekly.',
    metrics: {
      weekly: '$2,100',
      campaigns: '45 Active',
      payout: '100% on-time'
    }
  },
  {
    id: 5,
    type: 'marketer',
    name: 'Robert Kim',
    role: 'VP Marketing',
    company: 'SaaS Dynamics',
    logo: '💻',
    image: '👨‍💼',
    rating: 5,
    quote: 'The fraud detection alone saved us $45,000 last quarter. Real clicks, real customers, real growth.',
    metrics: {
      saved: '$45K/quarter',
      fraud: '-94%',
      ltv: '+2.1x'
    }
  }
];

const trustedCompanies = [
  { name: 'TechCorp', logo: '🚀' },
  { name: 'MarketPro', logo: '📈' },
  { name: 'CloudScale', logo: '☁️' },
  { name: 'DataDrive', logo: '💾' },
  { name: 'GrowthHub', logo: '🌱' },
  { name: 'DigitalEdge', logo: '⚡' }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">⭐ Trusted by 10,000+ Users</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Real Results from <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Real Users</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Join thousands of marketers and promoters who are transforming their business with REVA
          </p>
        </div>

        {/* Performance Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent mb-1">$2.4M+</div>
            <div className="text-sm text-slate-500">Paid to Promoters</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-1">450M+</div>
            <div className="text-sm text-slate-500">Verified Clicks</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">3.8x</div>
            <div className="text-sm text-slate-500">Average ROI</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">99.9%</div>
            <div className="text-sm text-slate-500">Uptime</div>
          </div>
        </div>

        {/* Testimonial Carousel with Gradient Border */}
        <div className="relative">
          <div className="p-[1px] rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-500">
            <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12">
              {/* Testimonial Content */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left side - Quote and Rating */}
                <div className="flex-1">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <span key={i} className="text-cyan-400 text-xl">★</span>
                    ))}
                  </div>
                  
                  {/* Quote with gradient accent */}
                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-gradient bg-gradient-to-r from-cyan-500/20 to-purple-500/20 bg-clip-text text-transparent">"</span>
                    <p className="text-xl md:text-2xl text-slate-200 leading-relaxed pl-6">
                      {currentTestimonial.quote}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-[1px]">
                      <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center text-xl">
                        {currentTestimonial.image}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{currentTestimonial.name}</div>
                      <div className="text-sm text-slate-400">
                        {currentTestimonial.role} at {currentTestimonial.company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Metrics */}
                <div className="md:w-80">
                  <div className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl p-6 border border-cyan-500/10">
                    <div className="text-sm font-semibold text-slate-400 mb-4">KEY RESULTS</div>
                    <div className="space-y-4">
                      {Object.entries(currentTestimonial.metrics).map(([key, value], index) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Type Badge */}
                    <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {currentTestimonial.type === 'marketer' ? '📊 Marketer' : '💰 Promoter'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between">
                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-gradient-to-r from-cyan-400 to-purple-400'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Trusted by Industry Leaders</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-black px-8">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {trustedCompanies.map((company, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors duration-300"
                    >
                      <span className="text-2xl opacity-60">{company.logo}</span>
                      <span className="text-sm font-medium">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;