import { motion } from "framer-motion";

const Prompt = ({ path = "~" }: { path?: string }) => (
  <span className="text-muted-foreground">
    <span className="text-terminal-green">shubham</span>
    <span className="text-muted-foreground">@</span>
    <span className="text-terminal-blue">portfolio</span>
    <span className="text-muted-foreground">:</span>
    <span className="text-terminal-purple">{path}</span>
    <span className="text-primary">$ </span>
  </span>
);

interface TerminalLineProps {
  command: string;
  path?: string;
  delay?: number;
}

const TerminalLine = ({ command, path, delay = 0 }: TerminalLineProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay }}
    className="text-sm mb-1"
  >
    <Prompt path={path} />
    <span className="text-foreground">{command}</span>
  </motion.div>
);

export { TerminalLine, Prompt };
export default TerminalLine;
