import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

const TerminalWindow = ({ title, children, delay = 0 }: TerminalWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-lg border border-border overflow-hidden bg-card"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">{title}</span>
      </div>
      {/* Content */}
      <div className="p-5 terminal-scanline">{children}</div>
    </motion.div>
  );
};

export default TerminalWindow;
