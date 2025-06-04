'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/CustomSelect';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // Honeypot field - should be empty when submitted by a human
    _honey: ''
  });

  const subjectOptions = [
    { 
      value: 'General Inquiry', 
      label: 'General Inquiry',
      description: 'Questions about Plately or our services'
    },
    { 
      value: 'Support', 
      label: 'Support',
      description: 'Need help with your account or our platform'
    },
    { 
      value: 'Partnership', 
      label: 'Partnership',
      description: 'Business and collaboration opportunities'
    },
    { 
      value: 'Feedback', 
      label: 'Feedback',
      description: 'Share your thoughts and suggestions with us'
    },
    { 
      value: 'Other', 
      label: 'Other',
      description: 'Something else we should know'
    },
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field
    if (formData._honey) {
      console.log('Bot detected!');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ status: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (response.ok) {
        setSubmitStatus({ 
          status: 'success', 
          message: 'Your message has been sent successfully! We\'ll get back to you soon.' 
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          _honey: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        status: 'error', 
        message: 'There was an error sending your message. Please try again later or email us directly at support@plately.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link 
        href="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Homepage
      </Link>

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>

        {submitStatus.status === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
            {submitStatus.message}
          </div>
        ) : submitStatus.status === 'error' ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {submitStatus.message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from humans but visible to bots */}
          <div className="hidden">
            <label htmlFor="_honey">Do not fill this out if you're human</label>
            <input 
              type="text" 
              id="_honey" 
              name="_honey" 
              value={formData._honey}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          <CustomSelect
            options={subjectOptions}
            value={formData.subject}
            onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
            label="Subject"
            required
            placeholder="Select a subject"
          />

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent/90 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> support@plately.com
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> Plately AI<br />
              Apotekergata 10<br />
              0180 Oslo, Norway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
