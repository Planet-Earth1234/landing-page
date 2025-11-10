"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Shield, Hexagon, X, Github, Send, Users, Zap, MessageSquare, Play } from 'lucide-react';

export default function LandingPage() {
  type FeedbackData = {
    motivation: string;
    frustration: string;
    wish: string;
    earlyAccess: string;
    earlyAccessReason: string;
    additionalThoughts: string;
  };
  
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackDismissed, setFeedbackDismissed] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    motivation: '',
    frustration: '',
    wish: '',
    earlyAccess: '',
    earlyAccessReason: '',
    additionalThoughts: ''
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = async () => {
  if (!email) return;
  
  console.log("🚀 Starting waitlist submission...");
  console.log("Email:", email);
  
  setLoading(true);
  setError('');
  
  try {
    console.log("📤 Sending POST request to /api/waitlist");
    
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    console.log("📥 Response status:", response.status);
    console.log("📥 Response ok:", response.ok);
    
    const data = await response.json();
    console.log("📥 Response data:", data);
    
    if (response.ok) {
      console.log("✅ Waitlist submission successful!");
      setSubmittedEmail(email); // Store email before clearing
      setSubmitted(true);
      setShowFeedback(true);
      // Don't clear email yet - wait for feedback submission or dismissal
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } else {
      console.log("❌ Waitlist submission failed:", data.error);
      setError(data.error || 'Something went wrong');
    }
  } catch (err) {
    console.error("💥 Network error:", err);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const dismissFeedback = () => {
  setFeedbackDismissed(true);
  setShowFeedback(false);
  setEmail('');
  setSubmittedEmail('');
};

  

  const handleFeedbackSubmit = async () => {
  const emailToUse = submittedEmail || email;
  
  console.log("\n📝 === FEEDBACK SUBMISSION ===");
  console.log("Feedback data:", JSON.stringify(feedbackData, null, 2));
  console.log("Email:", emailToUse);
  
  if (!emailToUse) {
    console.error("❌ No email found!");
    alert('Error: Email not found. Please try again.');
    return;
  }
  
  try {
    console.log("📤 Sending feedback to /api/waitlist");
    
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: emailToUse, 
        feedback: feedbackData 
      }),
    });
    
    console.log("📥 Feedback response status:", response.status);
    const data = await response.json();
    console.log("📥 Feedback response data:", data);
    
    if (response.ok) {
      console.log("✅ Feedback submitted successfully!");
      alert('Thank you for your feedback! 🎉');
    } else {
      console.error("❌ Feedback submission error:", data.error);
      alert('Thank you for your feedback! 🎉');
    }
  } catch (error) {
    console.error("💥 Feedback network error:", error);
    alert('Thank you for your feedback! 🎉');
  } finally {
    // NOW clear everything
    setShowFeedback(false);
    setEmail('');
    setSubmittedEmail('');
    setFeedbackData({
      motivation: '',
      frustration: '',
      wish: '',
      earlyAccess: '',
      earlyAccessReason: '',
      additionalThoughts: ''
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-on-scroll {
          opacity: 0;
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-delay-100 {
          animation-delay: 0.1s;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-300 {
          animation-delay: 0.3s;
        }

        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-content {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Header */}
      <div className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Hexagon className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fluxa
              </span>
            </div>
            <div>
              <button
                onClick={scrollToWaitlist}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm animate-pulse">
            <span className="text-purple-300 text-sm font-medium">
              Built on Polygon Blockchain
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-on-scroll">
            Own what you create
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              No Algorithms. No Middlemen.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl mb-12 animate-on-scroll animate-delay-100">
            Welcome to <span className="text-purple-400 font-semibold">Fluxa</span> — a
            social feed where you truly own your content. Transparent, secure, and built for creators who value freedom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll animate-delay-200">
            <button
              onClick={scrollToWaitlist}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Join Waitlist</span>
              <Send className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </div>

          <p className="mt-6 text-sm text-purple-300 animate-on-scroll animate-delay-300">
            ⚡ Limited early-access spots available
          </p>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 bg-purple-500/10 border-y border-purple-500/20">
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="inline-block px-8 text-2xl font-bold text-purple-300">
              True Ownership • No Algorithms • Web3 Native • Creator First • True Ownership • No Algorithms • Web3 Native • Creator First •
            </span>
            <span className="inline-block px-8 text-2xl font-bold text-purple-300">
              True Ownership • No Algorithms • Web3 Native • Creator First • True Ownership • No Algorithms • Web3 Native • Creator First •
            </span>
          </div>
        </div>
      </section>

      {/* MVP Preview Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-on-scroll">
            Sneak Peek of Fluxa
          </h2>
<h4 className="text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent mb-8 leading-relaxed tracking-wide animate-on-scroll">
  A glimpse of the social internet we actually deserve.
</h4>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-on-scroll animate-delay-100">
            Your content. Your ownership. A new kind of social feed is coming.
          </p>

          <div className="mt-12 animate-on-scroll animate-delay-200">
            <button
              onClick={scrollToWaitlist}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Join Early Access</span>
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Ownership Matters */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-purple-950/30">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-on-scroll">
          Why Ownership Matters
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg animate-on-scroll animate-delay-100">
          Traditional platforms decide who sees your work and who gets paid.
          Fluxa puts creators first — every post you share is verifiably yours,
          protected by blockchain, and free from algorithmic control.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-on-scroll">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { icon: Sparkles, title: 'Create', text: 'Post just like any other social app.' },
            { icon: Shield, title: 'Own', text: "Mint your content with one tap — it's verifiably yours." },
            { icon: Users, title: 'Connect', text: 'Engage and grow directly with your audience — no algorithms in the way.' },
          ].map((step, i) => (
            <div key={i} className={`animate-on-scroll animate-delay-${(i + 1) * 100}`}>
              <div className="p-8 bg-white/5 rounded-3xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 backdrop-blur-sm transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                <step.icon className="w-12 h-12 mx-auto mb-4 text-purple-400 floating" />
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950/30 to-transparent text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-on-scroll">
          Be Among the First
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-on-scroll animate-delay-100">
          Join our waitlist for early access — plus exclusive NFTs for the first 100 creators.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-on-scroll animate-delay-200">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !email}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Joining...' : submitted ? '✓ Subscribed!' : 'Join Early Access'}
          </button>
        </div>

        {error && <p className="mt-4 text-red-400">{error}</p>}
        {submitted && <p className="mt-4 text-green-400 animate-pulse">Thanks! We'll notify you when Fluxa launches 🚀</p>}
      </section>

      {/* Feedback Widget */}
      {(showFeedback || (!feedbackDismissed && submitted)) && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">💬 We'd love your quick feedback</h3>
                <p className="text-purple-200">Help us make Fluxa the social app you'll actually want to use.</p>
              </div>
              <button
                onClick={() => setShowFeedback(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-10">
              {/* Q1: Motivation */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">
                  👀 What made you check out Fluxa today?
                </h4>
                <textarea
                  value={feedbackData.motivation}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, motivation: e.target.value }))}
                  placeholder="e.g. I'm tired of algorithms, want more ownership, saw it on Reddit, etc."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-28 resize-y"
                />
              </div>

              {/* Q2: Core pain */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">
                  😣 What frustrates you most about current social media platforms?
                </h4>
                <textarea
                  value={feedbackData.frustration}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, frustration: e.target.value }))}
                  placeholder="e.g. Too many ads, fake engagement, privacy issues, no creator earnings..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-28 resize-y"
                />
              </div>

              {/* Q3: Dream feature */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">
                  🌟 If you could change one thing about how social media works, what would it be?
                </h4>
                <textarea
                  value={feedbackData.wish}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, wish: e.target.value }))}
                  placeholder="e.g. Let creators own posts, remove algorithms, reward engagement fairly..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-28 resize-y"
                />
              </div>

              {/* Q4: Early access interest */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">
                  🚀 Would you like early access to test Fluxa before public launch?
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  {["Yes, I want early access!", "Maybe later", "Not right now"].map((text, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        name="earlyAccess"
                        checked={feedbackData.earlyAccess === text}
                        onChange={() => setFeedbackData(prev => ({ ...prev, earlyAccess: text }))}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span>{text}</span>
                    </label>
                  ))}
                </div>
                {feedbackData.earlyAccess === "Yes, I want early access!" && (
                  <textarea
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all mt-3 min-h-24 resize-y"
                    placeholder="What kind of experience or feature would you love to test first?"
                    value={feedbackData.earlyAccessReason}
                    onChange={(e) =>
                      setFeedbackData((prev) => ({
                        ...prev,
                        earlyAccessReason: e.target.value,
                      }))
                    }
                  />
                )}
              </div>

              {/* Optional comments */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">
                  💭 Any other thoughts or ideas you'd like to share?
                </h4>
                <textarea
                  value={feedbackData.additionalThoughts}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, additionalThoughts: e.target.value }))}
                  placeholder="Your feedback helps us shape the future of Fluxa..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-28 resize-y"
                />
              </div>
            </div>

            {/* Demo Section */}
            <div className="mt-10 p-6 bg-white/5 rounded-xl border border-purple-500/20">
              <p className="text-center mb-4">
                🧩 Want to see how it works?
              </p>
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="mx-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-4 h-4" />
                View Demo
              </button>
              {showDemo && (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                  <p className="text-center text-gray-400 mb-2">Demo video/GIF would appear here</p>
                  <div className="w-full h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Demo Preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Dismissal Option */}
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-purple-500/20">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={dismissFeedback}
                  className="w-4 h-4 rounded border-purple-400 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-400">✓ Don't show this again</span>
              </label>
              <button
                onClick={handleFeedbackSubmit}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Community & Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-purple-950/30">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-on-scroll">
          Built by Creators, for Creators
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-8 animate-on-scroll animate-delay-100">
          We're building a platform that values ownership, transparency, and freedom over ads and algorithms.
        </p>
        <p className="text-purple-400 font-semibold text-xl animate-on-scroll animate-delay-200">
          Join 100+ early creators redefining the future of social media.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 bg-slate-950/80">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Hexagon className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Fluxa
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Fluxa. All rights reserved. Built on Polygon.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://x.com/AI_Tardigrade"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-purple-600 transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-purple-600 transition-all hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Feedback Button (when widget is hidden) */}
      {!showFeedback && !feedbackDismissed && (
        <button
          onClick={() => setShowFeedback(true)}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 z-40 floating"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Debug Button (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-8 left-8 z-40">
         
         
          {debugInfo && (
            <pre className="mt-2 p-4 bg-black/90 text-green-400 rounded-lg text-xs max-w-md overflow-auto max-h-96">
              {debugInfo}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}