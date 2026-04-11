import { useState, useRef, useEffect, useReducer } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'special' | 'ascii';
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

const asciiArt: TerminalLine[] = [
  { type: 'ascii', text: '  ╔═══════════════════════════════════════╗' },
  { type: 'ascii', text: '  ║   ___  __  __   _   ___    ___  ___  ║' },
  { type: 'ascii', text: '  ║  / _ \\|  \\/  | /_\\ | _ \\  / _ \\/ __| ║' },
  { type: 'ascii', text: '  ║ | (_) | |\\/| |/ _ \\|   / | (_) \\__ \\ ║' },
  { type: 'ascii', text: '  ║  \\___/|_|  |_/_/ \\_\\_|_\\  \\___/|___/ ║' },
  { type: 'ascii', text: '  ║                                       ║' },
  { type: 'ascii', text: '  ║   Terminal v2.0 — Type "help" to start║' },
  { type: 'ascii', text: '  ╚═══════════════════════════════════════╝' },
];

const commands: Record<string, TerminalLine[]> = {
  help: [
    { type: 'output', text: '' },
    { type: 'success', text: '┌─ AVAILABLE COMMANDS ─────────────────────┐' },
    { type: 'output', text: '│                                          │' },
    { type: 'output', text: '│  help        — show this help menu        │' },
    { type: 'output', text: '│  whoami      — display identity info      │' },
    { type: 'output', text: '│  skills      — list technical skills      │' },
    { type: 'output', text: '│  projects    — list projects with links   │' },
    { type: 'output', text: '│  experience  — show work history          │' },
    { type: 'output', text: '│  contact     — show contact details       │' },
    { type: 'output', text: '│  education   — show education             │' },
    { type: 'output', text: '│  awards      — show achievements          │' },
    { type: 'output', text: '│  clear       — clear terminal             │' },
    { type: 'output', text: '│  hire        — 🚀 secret command          │' },
    { type: 'output', text: '│                                          │' },
    { type: 'success', text: '└──────────────────────────────────────────┘' },
    { type: 'output', text: '' },
  ],
  whoami: [
    { type: 'output', text: '' },
    { type: 'success', text: '▸ Identity verified.' },
    { type: 'output', text: '' },
    { type: 'output', text: '  Name     : Omar Ahmed' },
    { type: 'output', text: '  Role     : Frontend Developer' },
    { type: 'output', text: '  Location : Cairo, Egypt' },
    { type: 'output', text: '  Email    : omarahmedt2460@gmail.com' },
    { type: 'output', text: '  Phone    : 01025891909' },
    { type: 'output', text: '  Status   : Available for hire ✓' },
    { type: 'output', text: '' },
  ],
  skills: [
    { type: 'output', text: '' },
    { type: 'success', text: '▸ Scanning skill modules...' },
    { type: 'output', text: '' },
    { type: 'output', text: '  HTML5/CSS3        ████████████████████ 98%' },
    { type: 'output', text: '  JavaScript        ███████████████████░ 95%' },
    { type: 'output', text: '  TypeScript        ██████████████████░░ 90%' },
    { type: 'output', text: '  React.js          ██████████████████░░ 90%' },
    { type: 'output', text: '  Tailwind CSS      ████████████████████ 98%' },
    { type: 'output', text: '  Redux             ████████████████░░░░ 80%' },
    { type: 'output', text: '  REST APIs         ████████████████░░░░ 80%' },
    { type: 'output', text: '  Socket.IO         █████████████░░░░░░░ 65%' },
    { type: 'output', text: '  Three.js          ████████████░░░░░░░░ 60%' },
    { type: 'output', text: '  Supabase          █████████████░░░░░░░ 65%' },
    { type: 'output', text: '  Git               ████████████████████ 95%' },
    { type: 'output', text: '' },
  ],
  projects: [
    { type: 'output', text: '' },
    { type: 'success', text: '▸ Found 3 repositories' },
    { type: 'output', text: '' },
    { type: 'output', text: '  ┌─ 📁 PORTFOLIO.DEV ──────────────────────' },
    { type: 'output', text: '  │  Stack: React · Tailwind · Three.js · TS' },
    { type: 'output', text: '  │  Interactive portfolio with 3D hero section' },
    { type: 'output', text: '  └──────────────────────────────────────────' },
    { type: 'output', text: '' },
    { type: 'output', text: '  ┌─ 💰 TATAB3NY — تتابعني ─────────────────' },
    { type: 'output', text: '  │  Stack: React · TypeScript · Supabase' },
    { type: 'output', text: '  │  Finance platform for the MENA region' },
    { type: 'output', text: '  └──────────────────────────────────────────' },
    { type: 'output', text: '' },
    { type: 'output', text: '  ┌─ 🤖 CAREERSYNC ─────────────────────────' },
    { type: 'output', text: '  │  Stack: React · Tailwind · Gemini AI' },
    { type: 'output', text: '  │  AI-powered career tool with dashboards' },
    { type: 'output', text: '  └──────────────────────────────────────────' },
    { type: 'output', text: '' },
  ],
  experience: [
    { type: 'output', text: '' },
    { type: 'success', text: '▸ Loading experience log...' },
    { type: 'output', text: '' },
    { type: 'output', text: '  ═══ CODVEDA TECHNOLOGIES ═════════════════' },
    { type: 'output', text: '  Frontend Developer Intern | Remote' },
    { type: 'output', text: '  Mar 2026 → Present' },
    { type: 'output', text: '  ───────────────────────────────────────────' },
    { type: 'output', text: '  ✓ Built responsive SPAs with React.js' },
    { type: 'output', text: '  ✓ REST API integration, CI/CD deployment' },
    { type: 'output', text: '' },
    { type: 'output', text: '  ═══ DEPI ═════════════════════════════════' },
    { type: 'output', text: '  Front End Developer | Cairo, Egypt' },
    { type: 'output', text: '  Oct 2024 → Jul 2025' },
    { type: 'output', text: '  ───────────────────────────────────────────' },
    { type: 'output', text: '  ✓ Real-time chat app — Socket.IO' },
    { type: 'output', text: '  ✓ JWT auth, protected routes, RBAC' },
    { type: 'output', text: '' },
  ],
  contact: [
    { type: 'output', text: '' },
    { type: 'success', text: '▸ Contact channels:' },
    { type: 'output', text: '' },
    { type: 'output', text: '  📧  omarahmedt2460@gmail.com' },
    { type: 'output', text: '  📱  01025891909' },
    { type: 'output', text: '  📍  Cairo, Egypt' },
    { type: 'output', text: '  🔗  linkedin.com/in/omar-ahmed' },
    { type: 'output', text: '  🐙  github.com/omar-ahmed' },
    { type: 'output', text: '' },
  ],
  education: [
    { type: 'output', text: '' },
    { type: 'success', text: '▸ Education record:' },
    { type: 'output', text: '' },
    { type: 'output', text: '  🎓 Al Safwa High Institute of Engineering' },
    { type: 'output', text: '     Computer Engineering — B.Sc.' },
    { type: 'output', text: '     Sep 2022 → Present | Cairo, Egypt' },
    { type: 'output', text: '' },
  ],
  awards: [
    { type: 'output', text: '' },
    { type: 'success', text: '▸ Awards & recognition:' },
    { type: 'output', text: '' },
    { type: 'output', text: '  🏆 Best Project of Semester — June 2024' },
    { type: 'output', text: '  🎖️  Certificate of Recognition — Oct 2024' },
    { type: 'output', text: '     Ministry of Communications, Egypt' },
    { type: 'output', text: '' },
  ],
};

const hireSequence: TerminalLine[] = [
  { type: 'output', text: '' },
  { type: 'special', text: '  ⚡ Initiating hire sequence...' },
  { type: 'output', text: '  Establishing secure connection...' },
  { type: 'output', text: '  Contacting Omar Ahmed...' },
  { type: 'output', text: '  ████████████████████████████ 100%' },
  { type: 'output', text: '' },
  { type: 'success', text: '  ✅ CONNECTION ESTABLISHED' },
  { type: 'output', text: '' },
  { type: 'success', text: '  Congratulations! Excellent decision. 🎉' },
  { type: 'output', text: "  Omar is now 87% more likely to make your product 🔥" },
  { type: 'output', text: '' },
  { type: 'output', text: '  ┌─ NEXT STEPS ──────────────────────────' },
  { type: 'output', text: '  │  📧 omarahmedt2460@gmail.com' },
  { type: 'output', text: '  │  📱 01025891909' },
  { type: 'output', text: '  └────────────────────────────────────────' },
  { type: 'output', text: '' },
  { type: 'special', text: '  [ This message will self-destruct in 5s ]' },
];

const TerminalContent = () => {
  const [lines, dispatch] = useReducer(terminalReducer, asciiArt);
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
        setTimeout(() => dispatch({ type: 'ADD_LINE', line }), i * 250);
      });
      return;
    }

    const output = commands[trimmed];
    if (output) {
      dispatch({ type: 'ADD_LINES', lines: output });
    } else {
      dispatch({
        type: 'ADD_LINES',
        lines: [
          { type: 'output', text: '' },
          { type: 'error', text: `  ✗ Command not found: '${trimmed}'` },
          { type: 'output', text: "  Type 'help' for available commands." },
          { type: 'output', text: '' },
        ],
      });
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
      case 'ascii': return 'text-os-cyan/60';
      case 'special': return 'text-os-amber';
      default: return 'text-os-text/80';
    }
  };

  return (
    <div
      className="font-mono text-xs h-full flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-os-cyan/10">
        <span className="text-os-cyan/40 text-[10px]">SESSION</span>
        <span className="text-os-green text-[10px]">● connected</span>
        <span className="text-os-muted text-[10px] ml-auto">PID: 1337</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto space-y-0.5 pb-2 scroll-smooth">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={`${getLineColor(line.type)} whitespace-pre leading-relaxed`}
          >
            {line.text || '\u00A0'}
          </motion.div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 border-t border-os-cyan/10 pt-3 mt-1">
        <span className="text-os-green shrink-0 text-[11px]">
          <span className="text-os-cyan">omar</span>
          <span className="text-os-muted">@</span>
          <span className="text-os-green">portfolio</span>
          <span className="text-os-muted">:</span>
          <span className="text-os-cyan">~</span>
          <span className="text-os-text">$</span>
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-os-text caret-os-cyan font-mono text-xs cursor-text"
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command..."
        />
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="text-os-cyan text-sm"
        >
          █
        </motion.span>
      </div>
    </div>
  );
};

export default TerminalContent;
