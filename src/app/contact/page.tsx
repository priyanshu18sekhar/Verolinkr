'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const inputClass = `
  w-full py-4 px-5 text-[15px] font-medium
  border rounded-xl bg-white/70
  transition-all duration-200
  focus:outline-none focus:ring-1 focus:ring-[#08080c] focus:border-[#08080c]
  border-[rgba(11,11,18,0.18)] hover:border-[rgba(11,11,18,0.38)]
`;

const labelClass = `
  block text-[12px] font-semibold uppercase tracking-[0.1em] mb-2
`;

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'hello@verolinkr.com',
    sub: 'Typically responds within 24 hours',
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    sub: 'Monday–Friday, 9 am–6 pm',
  },
  {
    icon: MapPinIcon,
    label: 'Office',
    value: '123 Innovation Street, Tech City',
    sub: 'Visit our headquarters',
  },
];

const faqs = [
  {
    q: 'How quickly can I get started?',
    a: 'Brand registration takes 2–3 business days for verification. Creator registration is typically approved within 24 hours.',
  },
  {
    q: 'What payment methods do you support?',
    a: 'We support all major payment methods including bank transfers, UPI, and digital wallets for Indian users.',
  },
  {
    q: 'How do you ensure creator authenticity?',
    a: 'Our AI-driven vetting system analyzes engagement patterns, follower authenticity, and content quality to verify creators.',
  },
  {
    q: 'Can I track campaign performance in real-time?',
    a: 'Yes. Our platform provides real-time analytics including verified views, engagement rates, and conversion tracking.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="cine-wrap min-h-screen pt-28 pb-24 px-5">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="cine-eyebrow mb-5" style={{ color: '#6b6a7b' }}>Get in touch · Support</p>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#08080c',
            }}
          >
            How can we help?
          </h1>
          <p
            className="mt-5 max-w-xl"
            style={{ color: '#6b6a7b', fontSize: '0.9rem', lineHeight: 1.6 }}
          >
            Have a question about the platform, a campaign, or your account? Reach out — we're here.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <div className="space-y-3 mb-10">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(11,11,18,0.08)', backdropFilter: 'blur(8px)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(11,11,18,0.06)' }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: '#08080c' }} />
                  </div>
                  <div>
                    <p className="cine-eyebrow mb-0.5">{item.label}</p>
                    <p className="font-semibold text-[14px]" style={{ color: '#08080c' }}>{item.value}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: '#8a899a' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(11,11,18,0.08)', backdropFilter: 'blur(8px)' }}
            >
              <p className="cine-eyebrow mb-4">Business hours</p>
              {[
                ['Monday – Friday', '9:00 AM – 6:00 PM'],
                ['Saturday', '10:00 AM – 4:00 PM'],
                ['Sunday', 'Closed'],
              ].map(([day, hrs]) => (
                <div
                  key={day}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: '1px solid rgba(11,11,18,0.06)' }}
                >
                  <span className="text-[13px]" style={{ color: '#6b6a7b' }}>{day}</span>
                  <span className="text-[13px] font-semibold" style={{ color: '#08080c' }}>{hrs}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          >
            <div className="lp-card px-7 py-9 sm:px-9 sm:py-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ border: '1px solid rgba(11,11,18,0.14)' }}
                    >
                      <EnvelopeIcon className="w-7 h-7" style={{ color: '#08080c' }} />
                    </div>
                    <p className="cine-eyebrow mb-3">Message sent</p>
                    <h2
                      className="mb-3"
                      style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#08080c' }}
                    >
                      We'll be in touch
                    </h2>
                    <p className="mb-7" style={{ color: '#6b6a7b', fontSize: '0.85rem', lineHeight: 1.55 }}>
                      Thanks for reaching out. We typically respond within one business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="cine-btn-ghost"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="cine-eyebrow mb-3">Send a message</p>
                    <h2
                      className="mb-7"
                      style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#08080c' }}
                    >
                      We'd love to hear from you
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className={labelClass} style={{ color: '#6b6a7b' }}>Full name</label>
                          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" required />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClass} style={{ color: '#6b6a7b' }}>Email address</label>
                          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className={labelClass} style={{ color: '#6b6a7b' }}>Subject</label>
                        <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="What's this about?" required />
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass} style={{ color: '#6b6a7b' }}>Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={inputClass + ' resize-none'}
                          placeholder="Tell us how we can help…"
                          required
                        />
                      </div>

                      <button type="submit" className="cine-btn w-full">
                        Send message
                      </button>
                    </form>

                    <p className="mt-5 text-[12px] text-center" style={{ color: '#8a899a' }}>
                      We typically respond within 24 hours during business days.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <div className="lp-hair mb-12" />
          <p className="cine-eyebrow mb-4" style={{ color: '#6b6a7b' }}>Common questions</p>
          <h2
            className="mb-10"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.035em', color: '#08080c' }}
          >
            Frequently asked
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(11,11,18,0.08)', backdropFilter: 'blur(8px)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
              >
                <h3 className="font-semibold mb-3 text-[14px]" style={{ color: '#08080c' }}>{faq.q}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: '#6b6a7b' }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
