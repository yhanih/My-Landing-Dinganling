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
    <div className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 mb-4 text-sm font-semibold text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
            <span className="mr-2">⭐</span> Trusted by 10,000+ Users
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Real Results from <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Real Users</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of marketers and promoters who are transforming their business with REVA
          </p>
        </div>

        {/* Performance Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-1">$2.4M+</div>
            <div className="text-sm text-gray-400">Paid to Promoters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">450M+</div>
            <div className="text-sm text-gray-400">Verified Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">3.8x</div>
            <div className="text-sm text-gray-400">Average ROI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-1">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 rounded-3xl p-1">
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12">
              {/* Testimonial Content */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left side - Quote and Rating */}
                <div className="flex-1">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{currentTestimonial.image}</div>
                    <div>
                      <div className="text-white font-semibold text-lg">{currentTestimonial.name}</div>
                      <div className="text-gray-400">{currentTestimonial.role}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl">{currentTestimonial.logo}</span>
                        <span className="text-gray-300">{currentTestimonial.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* User Type Badge */}
                  <div className="inline-flex items-center mt-4 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30">
                    {currentTestimonial.type === 'marketer' ? '📊 Marketer' : '💰 Promoter'}
                  </div>
                </div>

                {/* Right side - Metrics */}
                <div className="md:w-80">
                  <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/20">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Key Results
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(currentTestimonial.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-xl font-bold text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'w-8 bg-gradient-to-r from-cyan-400 to-purple-400' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-16">
          <p className="text-center text-gray-400 mb-6">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustedCompanies.map((company, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <span className="text-2xl">{company.logo}</span>
                <span className="font-semibold">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;