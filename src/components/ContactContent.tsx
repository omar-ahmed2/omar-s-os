import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactContent = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="font-mono text-sm">
      <div className="mb-4">
        <span className="text-os-cyan">&gt; </span>
        <span className="text-os-muted">init contact_form...</span>
      </div>

      {sent ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-os-green text-lg font-bold text-glow-green">TRANSMISSION SENT ✓</p>
          <p className="text-os-muted text-xs mt-2">Omar will respond shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="label block mb-1">NAME</label>
            <input
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full bg-transparent border-b border-os-cyan/30 text-os-text py-2 px-1 text-sm focus:border-os-cyan outline-none transition-colors font-mono"
              required
            />
          </div>
          <div>
            <label className="label block mb-1">EMAIL</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full bg-transparent border-b border-os-cyan/30 text-os-text py-2 px-1 text-sm focus:border-os-cyan outline-none transition-colors font-mono"
              required
            />
          </div>
          <div>
            <label className="label block mb-1">MESSAGE</label>
            <textarea
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              rows={4}
              className="w-full bg-transparent border-b border-os-cyan/30 text-os-text py-2 px-1 text-sm focus:border-os-cyan outline-none transition-colors font-mono resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-os-cyan text-os-bg font-bold text-xs rounded hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:scale-[1.02] transition-all"
          >
            &gt; TRANSMIT MESSAGE
          </button>
        </form>
      )}

      <div className="mt-8 pt-4 border-t border-os-cyan/10 space-y-2 text-xs">
        <p className="text-os-muted">Or reach me directly:</p>
        <p>📧 <a href="mailto:omarahmedt2460@gmail.com" className="text-os-cyan hover:underline">omarahmedt2460@gmail.com</a></p>
        <p>📱 <span className="text-os-text">01025891909</span></p>
        <p>📍 <span className="text-os-muted">Cairo, Egypt</span></p>
        <div className="flex gap-3 mt-2">
          <a href="https://www.linkedin.com/in/omar-ahmed-" target="_blank" rel="noreferrer" className="text-os-cyan hover:underline">LinkedIn</a>
          <a href="https://github.com/omar-ahmed" target="_blank" rel="noreferrer" className="text-os-cyan hover:underline">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
