import { useState, useRef, useEffect, useReducer } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'special';
  text: string;
}

type TerminalAction =
  | { type: 'ADD_LINE'; line: TerminalLine }
  | { type: 'ADD_LINES'; lines: TerminalLine[] }
  | { type: 'CLEAR' };

const terminalReducer = (state: TerminalLine[], action: TerminalAction): TerminalLine[] => {
  switch (action.type) {
    case 'ADD_LINE': return [...state, action.line];
    case 'ADD_LINES': return [...state, ...action.lines];
    case 'CLEAR': return [];
    default: return state;
  }
};

const commands: Record<string, TerminalLine[]> = {
  help: [
    { type: 'output', text: 'Available commands:' },
    { type: 'output', text: '  help        — show all available commands' },
    { type: 'output', text: '  whoami      — display Omar\'s info' },
    { type: 'output', text: '  skills      — list all technical skills' },
    { type: 'output', text: '  projects    — list projects with links' },
    { type: 'output', text: '  experience  — show work history' },
    { type: 'output', text: '  contact     — show contact info' },
    { type: 'output', text: '  education   — show education' },
    { type: 'output', text: '  awards      — show achievements' },
    { type: 'output', text: '  clear       — clear terminal' },
    { type: 'output', text: '  hire        — 😄 special easter egg' },
  ],
  whoami: [
    { type: 'success', text: '[OK] Identity verified.' },
    { type: 'output', text: 'Omar Ahmed — Frontend Developer' },
    { type: 'output', text: 'Cairo, Egypt | omarahmedt2460@gmail.com' },
    { type: 'output', text: 'CS Engineering Student @ Al Safwa Institute' },
  ],
  skills: [
    { type: 'success', text: '[OK] Skills loaded.' },
    { type: 'output', text: 'HTML5/CSS3 ████████████████████ 98%' },
    { type: 'output', text: 'JavaScript ███████████████████░ 95%' },
    { type: 'output', text: 'TypeScript ██████████████████░░ 90%' },
    { type: 'output', text: 'React.js   ██████████████████░░ 90%' },
    { type: 'output', text: 'Tailwind   ████████████████████ 98%' },
    { type: 'output', text: 'Redux      ████████████████░░░░ 80%' },
    { type: 'output', text: 'Git        ████████████████████ 95%' },
  ],
  projects: [
    { type: 'success', text: '[OK] Projects found: 3' },
    { type: 'output', text: '' },
    { type: 'output', text: '📁 PORTFOLIO.DEV — React, Tailwind, Three.js, TypeScript' },
    { type: 'output', text: '   Interactive portfolio with 3D hero section' },
    { type: 'output', text: '' },
    { type: 'output', text: '💰 TATAB3NY — React, TypeScript, Supabase, Recharts' },
    { type: 'output', text: '   Personal finance platform for MENA region' },
    { type: 'output', text: '' },
    { type: 'output', text: '🤖 CAREERSYNC — React, Tailwind, Gemini AI, Recharts' },
    { type: 'output', text: '   AI-powered career tool with Google Gemini' },
  ],
  experience: [
    { type: 'success', text: '[OK] Loading experience log...' },
    { type: 'output', text: '' },
    { type: 'output', text: 'CODVEDA TECHNOLOGIES — Frontend Developer Intern' },
    { type: 'output', text: 'Mar 2026 → Present | Remote' },
    { type: 'output', text: '' },
    { type: 'output', text: 'DEPI — Front End Developer' },
    { type: 'output', text: 'Oct 2024 → Jul 2025 | Cairo, Egypt' },
  ],
  contact: [
    { type: 'success', text: '[OK] Contact info:' },
    { type: 'output', text: '📧 omarahmedt2460@gmail.com' },
    { type: 'output', text: '📱 01025891909' },
    { type: 'output', text: '📍 Cairo, Egypt' },
    { type: 'output', text: '🔗 LinkedIn | GitHub' },
  ],
  education: [
    { type: 'success', text: '[OK] Education:' },
    { type: 'output', text: 'Al Safwa High Institute of Engineering' },
    { type: 'output', text: 'Computer Engineering — B.Sc.' },
    { type: 'output', text: 'Sep 2022 → Present | Cairo' },
  ],
  awards: [
    { type: 'success', text: '[OK] Awards loaded.' },
    { type: 'output', text: '🏆 Best Project of Semester — June 2024' },
    { type: 'output', text: '🎖️  Certificate of Recognition — Oct 2024' },
    { type: 'output', text: '   Ministry of Communications, Egypt' },
  ],
};

const hireSequence: TerminalLine[] = [
  { type: 'special', text: '' },
  { type: 'output', text: 'Initiating hire sequence... 🚀' },
  { type: 'output', text: 'Contacting Omar Ahmed...' },
  { type: 'output', text: '████████████████████ 100%' },
  { type: 'special', text: '' },
  { type: 'success', text: 'Congratulations! You made an excellent decision.' },
  { type: 'output', text: "Omar is now 87% more likely to make your product 🔥" },
  { type: 'output', text: 'Send an email to: omarahmedt2460@gmail.com' },
  { type: 'output', text: 'Or call: 01025891909' },
  { type: 'special', text: '' },
  { type: 'output', text: '[ This message will self-destruct in 5 seconds ]' },
];

const TerminalContent = () => {
  const [lines, dispatch] = useReducer(terminalReducer, [
    { type: 'output', text: "Welcome to Omar OS Terminal. Type 'help' to get started." },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const execute = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    dispatch({ type: 'ADD_LINE', line: { type: 'input', text: `omar@portfolio:~$ ${cmd}` } });

    if (!trimmed) return;

    setHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);

    if (trimmed === 'clear') {
      dispatch({ type: 'CLEAR' });
      return;
    }

    if (trimmed === 'hire') {
      hireSequence.forEach((line, i) => {
        setTimeout(() => dispatch({ type: 'ADD_LINE', line }), i * 300);
      });
      return;
    }

    const output = commands[trimmed];
    if (output) {
      dispatch({ type: 'ADD_LINES', lines: output });
    } else {
      dispatch({ type: 'ADD_LINE', line: { type: 'error', text: `[ERROR] Command not found: '${trimmed}'. Type 'help'.` } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= history.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const allCmds = [...Object.keys(commands), 'clear', 'hire'];
      const match = allCmds.filter(c => c.startsWith(input.toLowerCase()));
      if (match.length === 1) setInput(match[0]);
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'input': return 'text-os-muted';
      case 'error': return 'text-red-400';
      case 'success': return 'text-os-green';
      default: return 'text-os-text/80';
    }
  };

  return (
    <div className="font-mono text-xs h-full flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="flex-1 overflow-auto space-y-0.5 pb-2">
        {lines.map((line, i) => (
          <div key={i} className={getLineColor(line.type)}>
            {line.text || '\u00A0'}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 border-t border-os-cyan/10 pt-2">
        <span className="text-os-green shrink-0">omar@portfolio:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-os-text caret-os-cyan font-mono"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="text-os-cyan animate-pulse">█</span>
      </div>
    </div>
  );
};

export default TerminalContent;
