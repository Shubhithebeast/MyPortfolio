import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

const HeroSection = () => {
  return (
    <TerminalWindow title="shubham@portfolio: ~/about" delay={0}>
      <TerminalLine command="whoami" delay={0.2} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-3 mb-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
          SHUBHAM BISHT
        </h1>
        <p className="text-secondary text-lg">Associate Software Engineer @ OpenText</p>
      </motion.div>

      <TerminalLine command="cat contact.txt" path="~/about" delay={0.7} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="mt-2 flex flex-wrap gap-4 text-sm"
      >
        <a href="mailto:shubhambisht703@gmail.com" className="flex items-center gap-1.5 text-terminal-cyan hover:text-primary transition-colors">
          <Mail size={14} /> shubhambisht703@gmail.com
        </a>
        <a href="tel:8699391033" className="flex items-center gap-1.5 text-terminal-cyan hover:text-primary transition-colors">
          <Phone size={14} /> 8699391033
        </a>
        <a href="https://github.com/Shubhithebeast" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-terminal-cyan hover:text-primary transition-colors">
          <Github size={14} /> Shubhithebeast
        </a>
        <a href="#" className="flex items-center gap-1.5 text-terminal-cyan hover:text-primary transition-colors">
          <Linkedin size={14} /> shubham
        </a>
      </motion.div>

    </TerminalWindow>
  );
};

export default HeroSection;
