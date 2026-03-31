import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const useTypewriter = (text: string, speed = 20, startDelay = 0) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

const AboutContent = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2500),
      setTimeout(() => setStep(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="font-mono text-sm space-y-3">
      {step >= 0 && (
        <div>
          <span className="text-os-cyan">&gt; </span>
          <span className="text-os-muted">whoami</span>
        </div>
      )}
      {step >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
          <p className="text-2xl font-heading font-bold text-os-text">OMAR AHMED</p>
          <p className="text-os-cyan">Frontend Developer & CS Engineering Student</p>
          <p className="text-os-muted text-xs">Cairo, Egypt &nbsp;|&nbsp; 01025891909</p>
          <p className="text-os-muted text-xs">omarahmedt2460@gmail.com</p>
        </motion.div>
      )}
      {step >= 2 && (
        <>
          <div className="mt-4">
            <span className="text-os-cyan">&gt; </span>
            <span className="text-os-muted">cat bio.txt</span>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-os-text/80 leading-relaxed">
            Experienced Front-End Developer skilled in React.js, Redux, and API integration.
            Building fast, responsive, user-focused web apps with clean, maintainable code.
            Passionate about UI/UX, performance, and delivering seamless digital experiences.
          </motion.p>
        </>
      )}
      {step >= 3 && (
        <>
          <div className="mt-4">
            <span className="text-os-cyan">&gt; </span>
            <span className="text-os-muted">ls awards/</span>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p><span className="text-os-amber drop-shadow-[0_0_8px_rgba(255,184,0,0.4)]">🏆</span> Best Project of Semester — June 2024</p>
            <p><span className="text-os-amber drop-shadow-[0_0_8px_rgba(255,184,0,0.4)]">🎖️</span> Certificate of Recognition — Oct 2024</p>
            <p className="text-os-muted text-xs pl-6">Ministry of Communications, Egypt</p>
          </motion.div>
        </>
      )}
      {step >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 mt-6">
          <a href="https://www.linkedin.com/in/omar-ahmed-" target="_blank" rel="noreferrer"
            className="font-mono text-xs text-os-cyan hover:text-glow-cyan transition-all border border-os-cyan/20 px-3 py-1.5 rounded hover:bg-os-cyan/10">
            LinkedIn ↗
          </a>
          <a href="https://github.com/omar-ahmed" target="_blank" rel="noreferrer"
            className="font-mono text-xs text-os-cyan hover:text-glow-cyan transition-all border border-os-cyan/20 px-3 py-1.5 rounded hover:bg-os-cyan/10">
            GitHub ↗
          </a>
          <a href="/Omar_Ahmed_CV.pdf" download
            className="font-mono text-xs text-os-green hover:text-glow-green transition-all border border-os-green/20 px-3 py-1.5 rounded hover:bg-os-green/10">
            Download CV ↓
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default AboutContent;
