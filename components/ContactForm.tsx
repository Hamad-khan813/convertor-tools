"use client";

import React, { useState } from "react";

export default function ContactForm() {
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
  );
}
