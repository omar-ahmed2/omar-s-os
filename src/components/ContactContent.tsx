import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const useTypewriterSimple = (text: string, delay: number) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 20);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return { displayed, done };
};

const ContactContent = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const cmd = useTypewriterSimple('init contact_form --secure', 100);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowForm(true), 700);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="font-mono text-sm">
      {/* Command */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-os-cyan text-[10px]">omar@os</span>
        <span className="text-os-muted text-[10px]">:</span>
        <span className="text-os-cyan text-[10px]">~/contact</span>
        <span className="text-os-text text-[10px]">$</span>
        <span className="text-os-text/70 text-[10px] ml-1">
          {cmd.displayed}
          {!cmd.done && <span className="text-os-cyan animate-pulse">█</span>}
        </span>
      </div>

      {cmd.done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-os-green text-[10px] mb-3">
          ✓ Form ready — secure channel established
        </motion.div>
      )}

      {showForm && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 rounded-lg border border-os-green/20"
              style={{ background: 'rgba(0,255,136,0.03)' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-4xl mb-3"
              >
                ✅
              </motion.div>
              <p className="text-os-green text-sm font-bold">TRANSMISSION SENT</p>
              <p className="text-os-muted text-[10px] mt-1">Omar will respond within 24 hours.</p>
              <div className="mt-3 text-[9px] text-os-muted/40">[ Resetting in 4 seconds... ]</div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-[9px] text-os-muted tracking-widest uppercase mb-2 flex items-center gap-2">
                  <span>SEND TRANSMISSION</span>
                  <div className="flex-1 h-px bg-os-cyan/10" />
                </div>

                {[
                  { label: 'NAME', key: 'name', type: 'text' },
                  { label: 'EMAIL', key: 'email', type: 'email' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[9px] text-os-muted tracking-widest uppercase block mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full bg-transparent border border-os-cyan/10 rounded text-os-text py-2 px-2 text-[11px] focus:border-os-cyan/30 outline-none transition-colors font-mono hover:border-os-cyan/20"
                      style={{ background: 'rgba(0,212,255,0.02)' }}
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="text-[9px] text-os-muted tracking-widest uppercase block mb-1">MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={3}
                    className="w-full bg-transparent border border-os-cyan/10 rounded text-os-text py-2 px-2 text-[11px] focus:border-os-cyan/30 outline-none transition-colors font-mono resize-none hover:border-os-cyan/20"
                    style={{ background: 'rgba(0,212,255,0.02)' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-os-cyan/10 text-os-cyan font-bold text-[10px] rounded border border-os-cyan/20 hover:bg-os-cyan hover:text-os-bg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300 tracking-widest uppercase cursor-pointer"
                >
                  ▸ TRANSMIT MESSAGE
                </button>
              </form>

              {/* Contact info sidebar */}
              <div className="space-y-3">
                <div className="text-[9px] text-os-muted tracking-widest uppercase mb-2 flex items-center gap-2">
                  <span>DIRECT CHANNELS</span>
                  <div className="flex-1 h-px bg-os-cyan/10" />
                </div>

                <div className="space-y-2">
                  {[
                    { icon: '📧', label: 'Email', value: 'omarahmedt2460@gmail.com', href: 'mailto:omarahmedt2460@gmail.com' },
                    { icon: '📱', label: 'Phone', value: '01025891909' },
                    { icon: '📍', label: 'Location', value: 'Cairo, Egypt' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2 p-2 rounded border border-os-cyan/6" style={{ background: 'rgba(0,212,255,0.02)' }}>
                      <span className="text-sm">{item.icon}</span>
                      <div>
                        <p className="text-[9px] text-os-muted uppercase tracking-wider">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-os-cyan text-[10px] hover:underline">{item.value}</a>
                        ) : (
                          <p className="text-os-text/70 text-[10px]">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[9px] text-os-muted tracking-widest uppercase mt-4 mb-2 flex items-center gap-2">
                  <span>SOCIAL</span>
                  <div className="flex-1 h-px bg-os-cyan/10" />
                </div>

                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/omar-ahmed-" target="_blank" rel="noreferrer"
                    className="flex-1 text-center text-[10px] px-3 py-2 rounded border border-os-cyan/15 text-os-cyan/70 hover:text-os-cyan hover:bg-os-cyan/8 hover:border-os-cyan/30 transition-all cursor-pointer tracking-wider">
                    LinkedIn ↗
                  </a>
                  <a href="https://github.com/omar-ahmed" target="_blank" rel="noreferrer"
                    className="flex-1 text-center text-[10px] px-3 py-2 rounded border border-os-cyan/15 text-os-cyan/70 hover:text-os-cyan hover:bg-os-cyan/8 hover:border-os-cyan/30 transition-all cursor-pointer tracking-wider">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ContactContent;
