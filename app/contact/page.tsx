"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-2">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Contact Support & Engineering
          </h1>
          <p className="text-zinc-500 mt-2 text-sm max-w-2xl leading-relaxed">
            Report a mathematical rounding bug, request a new calculator tool, or contact the core engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact details */}
          <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">Direct Channels</h3>
              <p className="mt-1">For critical enterprise calibration API integrations, contact our engineering branch:</p>
              <div className="mt-3 space-y-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <div>Email: engineering@convertly.com</div>
                <div>Server Availability: 99.99% Up</div>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">Tool Requests</h3>
              <p className="mt-1">
                We are actively expanding our catalog towards 1000+ custom calculators. Let us know if you require specialized construction, chemical science, or financial amortization worksheets.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Message Transmitted!</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Thank you. Our calculation calibration team will analyze your comments and respond within 24 business hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-xs text-emerald-500 font-bold hover:underline mt-4 cursor-pointer">
                  Submit another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-500 block mb-1">Your Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 block mb-1">Your Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 block mb-1">Topic</label>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold focus:outline-none cursor-pointer">
                    <option value="general">General Support</option>
                    <option value="bug">Calibrations / Bug Report</option>
                    <option value="feature">New Calculator Request</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 block mb-1">Message</label>
                  <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-semibold focus:outline-none text-sm resize-none"></textarea>
                </div>
                <button type="submit" className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
