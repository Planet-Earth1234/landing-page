'use client';

import React, { useState } from 'react';
import { Sparkles, Shield, Hexagon, Twitter, Github, Send } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

/* -------------------------------------------------------------------------- */
/*                                MotionDiv                                   */
/* -------------------------------------------------------------------------- */
type MotionDivProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
};

const MotionDiv: React.FC<MotionDivProps> = ({ children, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Landing Page UI                               */
/* -------------------------------------------------------------------------- */
export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail('');
        }, 5000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <MotionDiv initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center space-x-2">
              <Hexagon className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SocialChain
              </span>
            </MotionDiv>
            <MotionDiv initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </MotionDiv>
          </div>
        </div>
      </MotionDiv>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm animate-pulse">
            <span className="text-purple-300 text-sm font-medium">Powered by Polygon Blockchain</span>
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
            <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Own Your Content.
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Redefine Social Media.
              </span>
            </h1>
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-gray-300 text-xl mb-12">
            The first social platform where creators truly own their content. Built on Web3 principles with blockchain security, transparent ownership, and ethical moderation.
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>Join the Waitlist</span>
              <Send className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </MotionDiv>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950/30 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <MotionDiv initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Be Among the First</h2>
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-xl text-gray-300 mb-8">
            Join our waitlist and get early access when we launch — plus exclusive NFTs for early adopters.
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
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
              {loading ? 'Joining...' : submitted ? '✓ Subscribed!' : 'Join Waitlist'}
            </button>
          </MotionDiv>

          {error && <p className="mt-4 text-red-400">{error}</p>}
          {submitted && (
            <MotionDiv initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="mt-4 text-green-400 animate-pulse">Thanks! We’ll notify you when we launch.</p>
            </MotionDiv>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 bg-slate-950/80">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Hexagon className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SocialChain</span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 SocialChain. All rights reserved. Built on Polygon.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-purple-600 transition-all hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-purple-600 transition-all hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
