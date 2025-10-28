"use client";
import React, { useState } from 'react';
import { Sparkles, Shield, Hexagon, Twitter, Github, Send, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
      <div className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Hexagon className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SocialChain
              </span>
            </div>
            <div>
              <button 
                onClick={scrollToWaitlist}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm animate-pulse">
            <span className="text-purple-300 text-sm font-medium">Powered by Polygon Blockchain</span>
          </div>

          <div>
            <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Own Your Content.
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Redefine Social Media.
              </span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto text-gray-300 text-xl mb-12">
            The first social platform where creators truly own their content. Built on Web3 principles with blockchain security, transparent ownership, and ethical moderation.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToWaitlist}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Join the Waitlist</span>
              <Send className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* MVP Preview Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Sneak Peek of SocialChain
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Your content. Your ownership. A new kind of social feed is coming.
            </p>
          </div>

         

          <div className="mt-12">
            <button 
              onClick={scrollToWaitlist}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Join Waitlist</span>
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Ownership Matters */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-purple-950/30">
        <div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Why Ownership Matters</h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            Traditional platforms control your reach, your data, and even your creative rights. SocialChain gives that power back to you — making every post verifiably yours, 
            protected by blockchain, and free from algorithmic manipulation.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { icon: Sparkles, title: 'Create', text: 'Post your content just like any other social app.' },
            { icon: Shield, title: 'Own', text: "Mint your post as an NFT in one tap — it's now verifiably yours." },
            { icon: Users, title: 'Connect', text: 'Engage, grow, and earn recognition directly from your audience.' },
          ].map((step, i) => (
            <div key={i}>
              <div className="p-8 bg-white/5 rounded-3xl border border-purple-500/20 hover:border-purple-400/40 transition-all backdrop-blur-sm">
                <step.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950/30 to-transparent text-center">
        <div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Be Among the First</h2>
        </div>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our waitlist and get early access when we launch — plus exclusive NFTs for early adopters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
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
        </div>

        {error && <p className="mt-4 text-red-400">{error}</p>}
        {submitted && <p className="mt-4 text-green-400 animate-pulse">Thanks! We'll notify you when we launch.</p>}
      </section>

      {/* Community & Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-purple-950/30">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Built by Creators, for Creators
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-8">
          We're building a new kind of social network — one that values ownership, transparency, and freedom over ads and algorithms.
        </p>
        <p className="text-purple-400 font-semibold text-xl">Join 100+ early creators redefining the future of social media.</p>
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