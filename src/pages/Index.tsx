import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from '@/components/BootSequence';
import ParticleBackground from '@/components/ParticleBackground';
import AppLauncher from '@/components/AppLauncher';
import DesktopHero from '@/components/DesktopHero';
import Taskbar from '@/components/Taskbar';
import OSWindow from '@/components/OSWindow';
import AboutContent from '@/components/AboutContent';
import SkillsContent from '@/components/SkillsContent';
import ExperienceContent from '@/components/ExperienceContent';
import ProjectsContent from '@/components/ProjectsContent';
import ContactContent from '@/components/ContactContent';
import TerminalContent from '@/components/TerminalContent';
import DesktopContextMenu from '@/components/DesktopContextMenu';
import NotificationToast, { ToastMessage } from '@/components/NotificationToast';
import { useIsMobile } from '@/hooks/use-mobile';

type WindowId = 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'terminal';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

const defaultPositions: Record<WindowId, { x: number; y: number }> = {
  about:      { x: 140, y: 30 },
  projects:   { x: 200, y: 50 },
  skills:     { x: 160, y: 70 },
  experience: { x: 260, y: 40 },
  contact:    { x: 300, y: 60 },
  terminal:   { x: 180, y: 80 },
};

const defaultSizes: Record<WindowId, { width: number; height: number }> = {
  about:      { width: 620, height: 540 },
  projects:   { width: 750, height: 550 },
  skills:     { width: 720, height: 500 },
  experience: { width: 660, height: 520 },
  contact:    { width: 680, height: 540 },
  terminal:   { width: 720, height: 460 },
};

const windowOpenMessages: Record<WindowId, { message: string; subtext?: string; type: ToastMessage['type']; icon?: string }> = {
  about:      { message: 'Accessing identity.info', subtext: 'Decentralized data retrieved', type: 'system', icon: '👤' },
  projects:   { message: 'Mounting projects.fs',    subtext: '3 repositories detected',    type: 'info',   icon: '💼' },
  skills:     { message: 'Loading skillsets.bin',    subtext: 'Neural engine engaged',      type: 'success', icon: '⚡' },
  experience: { message: 'History node mounted',    subtext: 'Timeline synchronized',       type: 'system', icon: '🏢' },
  contact:    { message: 'Uplink established',      subtext: 'Signal strength: 100%',     type: 'success', icon: '📡' },
  terminal:   { message: 'Root session started',    subtext: 'User: OMAR_OS',              type: 'info',   icon: '>_' },
};

// ── Background Floating Orbs ──────────────────────────────────────────
const AmbientOrbs = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, 40, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.08]"
      style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
    />
    <motion.div
      animate={{
        x: [0, -120, 80, 0],
        y: [0, 60, -100, 0],
        scale: [1, 1.1, 0.8, 1],
      }}
      transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.05]"
      style={{ background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)' }}
    />
    <motion.div
      animate={{
        x: [0, 40, -40, 0],
        y: [0, -50, 30, 0],
        scale: [1, 1.3, 1, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.03]"
      style={{ background: 'radial-gradient(circle, #ffb800 0%, transparent 70%)' }}
    />
  </div>
);

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [zCounter, setZCounter] = useState(10);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const isMobile = useIsMobile();

  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    about:      { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    projects:   { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 2 },
    skills:     { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 3 },
    experience: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 4 },
    contact:    { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 5 },
    terminal:   { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 6 },
  });

  const addToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(t => [...t.slice(-4), { ...msg, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    setZCounter(z => {
      const newZ = z + 1;
      setWindows(prev => ({
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: newZ },
      }));
      return newZ;
    });
    setActiveWindow(id);
    addToast({ ...windowOpenMessages[id] });
  }, [addToast]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false } }));
    setActiveWindow(null);
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }));
    setActiveWindow(null);
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMaximized: !prev[id].isMaximized } }));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setZCounter(z => {
      const newZ = z + 1;
      setWindows(prev => ({ ...prev, [id]: { ...prev[id], zIndex: newZ } }));
      return newZ;
    });
    setActiveWindow(id);
  }, []);

  const handleTaskbarClick = useCallback((id: string) => {
    const wid = id as WindowId;
    setWindows(prev => {
      const win = prev[wid];
      if (!win) return prev;
      if (win.isMinimized) {
        setZCounter(z => {
          const newZ = z + 1;
          setWindows(p => ({ ...p, [wid]: { ...p[wid], isMinimized: false, zIndex: newZ } }));
          return newZ;
        });
        setActiveWindow(wid);
        return prev;
      }
      return prev;
    });
    const win = windows[id as WindowId];
    if (win && !win.isMinimized) {
      if (activeWindow === id) minimizeWindow(id as WindowId);
      else focusWindow(id as WindowId);
    }
  }, [windows, activeWindow, minimizeWindow, focusWindow]);

  useEffect(() => {
    if (!booted) return;
    const map: Record<string, WindowId> = {
      '1': 'about', '2': 'projects', '3': 'skills',
      '4': 'experience', '5': 'contact', 't': 'terminal',
    };
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && map[e.key.toLowerCase()]) {
        e.preventDefault();
        openWindow(map[e.key.toLowerCase()]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [booted, openWindow]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  }, []);

  const handleDownloadCV = useCallback(() => {
    addToast({ message: 'Initiating transfer...', subtext: 'Omar_Ahmed_CV.pdf', type: 'success', icon: '📥' });
    const a = document.createElement('a');
    a.href = '/Omar_Ahmed_CV.pdf';
    a.download = 'Omar_Ahmed_CV.pdf';
    a.click();
  }, [addToast]);

  const handleBooted = useCallback(() => {
    setBooted(true);
    setTimeout(() => {
      addToast({
        message: 'System Online',
        subtext: 'Neural interface active. UI calibrated.',
        type: 'system', icon: '🌐', duration: 5000,
      });
    }, 800);
  }, [addToast]);

  const openWindows = Object.entries(windows).filter(([, w]) => w.isOpen).map(([id]) => id);

  const windowContents: Record<WindowId, React.ReactNode> = {
    about:      <AboutContent />,
    skills:     <SkillsContent />,
    experience: <ExperienceContent />,
    projects:   <ProjectsContent />,
    contact:    <ContactContent />,
    terminal:   <TerminalContent />,
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none crt-flicker"
      style={{ background: '#020508' }}
      onContextMenu={handleContextMenu}
    >
      {!booted && <BootSequence onComplete={handleBooted} />}

      <ParticleBackground />
      <AmbientOrbs />
      <div className="grid-bg fixed inset-0 z-[1]" />
      <div className="scanlines" />
      <div className="noise-overlay" />

      {/* ─── DESKTOP HUD ────────────────────────────────────────── */}
      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-10 pointer-events-none"
            style={{ paddingBottom: 64, paddingTop: 40, paddingLeft: 40, paddingRight: 40 }}
          >
            <div className="flex w-full h-full items-center justify-between pointer-events-none">
              
              {/* Left Side: Sidebar Launcher */}
              <div className="pointer-events-auto shrink-0 self-start mt-8">
                 <AppLauncher onOpen={(id) => openWindow(id as WindowId)} />
              </div>

              {/* Center Area: Hero Branding */}
              <div className="flex-1 flex items-center justify-center pointer-events-auto">
                <DesktopHero onOpen={(id) => openWindow(id as WindowId)} />
              </div>

              {/* Right Side: Optional Decorative Hud (Hidden on small screens) */}
              {!isMobile && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="hidden xl:flex flex-col gap-6 shrink-0 text-right opacity-30 select-none pointer-events-none"
                >
                  <div>
                    <p className="font-mono text-[10px] text-os-cyan uppercase tracking-[0.3em]">Network Topology</p>
                    <p className="font-mono text-[8px] text-white/50 mt-1">Status: Encrypted / Secure</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-os-cyan uppercase tracking-[0.3em]">Neural Load</p>
                    <div className="flex gap-1 justify-end mt-1">
                       {[...Array(8)].map((_, i) => (
                         <motion.div key={i} className="w-1 h-3 bg-os-cyan/40" animate={{ scaleY: [1, 0.4, 0.9, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} />
                       ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── WINDOWS ─────────────────────────────────────────────── */}
      {booted && (
        <div className="fixed inset-0 z-20 pointer-events-none">
          {(Object.keys(windows) as WindowId[]).map(id => (
            <OSWindow
              key={id}
              id={id}
              title={id}
              isOpen={windows[id].isOpen}
              isMinimized={windows[id].isMinimized}
              isMaximized={windows[id].isMaximized}
              zIndex={windows[id].zIndex}
              onClose={() => closeWindow(id)}
              onMinimize={() => minimizeWindow(id)}
              onMaximize={() => maximizeWindow(id)}
              onFocus={() => focusWindow(id)}
              defaultPosition={defaultPositions[id]}
              defaultSize={defaultSizes[id]}
            >
              {windowContents[id]}
            </OSWindow>
          ))}
        </div>
      )}

      {booted && (
        <Taskbar
          openWindows={openWindows}
          activeWindow={activeWindow}
          onWindowClick={handleTaskbarClick}
        />
      )}

      <DesktopContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        visible={contextMenu.visible}
        onClose={() => setContextMenu(m => ({ ...m, visible: false }))}
        onOpen={id => openWindow(id as WindowId)}
        onDownloadCV={handleDownloadCV}
      />

      <NotificationToast toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Index;
