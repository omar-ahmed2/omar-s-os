import { motion } from 'framer-motion';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  delay?: number;
}

const DesktopIcon = ({ icon, label, onClick, delay = 0 }: DesktopIconProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-os-cyan/5 border border-transparent hover:border-os-cyan/20 transition-all group cursor-pointer w-[76px] relative"
      whileHover={{ y: -6, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow behind icon on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(0,212,255,0.08) 0%, transparent 70%)' }}
      />
      
      <div className="relative">
        <span className="text-2xl group-hover:drop-shadow-[0_0_12px_rgba(0,212,255,0.6)] transition-all duration-300 block">
          {icon}
        </span>
      </div>
      
      <span className="font-mono text-[9px] text-os-muted group-hover:text-os-cyan transition-colors duration-200 truncate w-full text-center tracking-wider">
        {label}
      </span>
      
      {/* Active dot indicator on hover */}
      <div className="w-1 h-1 rounded-full bg-os-cyan opacity-0 group-hover:opacity-100 transition-opacity" 
        style={{ boxShadow: '0 0 4px rgba(0,212,255,0.6)' }}
      />
    </motion.button>
  );
};

export default DesktopIcon;
