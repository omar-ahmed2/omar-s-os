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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-os-cyan/5 border border-transparent hover:border-os-cyan/20 transition-all group cursor-none w-20"
      whileHover={{ y: -4 }}
    >
      <span className="text-2xl group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)] transition-all">
        {icon}
      </span>
      <span className="font-mono text-[10px] text-os-muted group-hover:text-os-cyan transition-colors truncate w-full text-center">
        {label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
