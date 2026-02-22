import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { GraduationCap } from "lucide-react";

const EducationSection = () => {
  return (
    <TerminalWindow title="shubham@portfolio: ~/education" delay={0.5}>
      <TerminalLine command="cat ~/.education" path="~/education" delay={0.6} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-3 space-y-3"
      >
        <div className="flex items-start gap-3 border border-border rounded-md p-3 bg-muted/30">
          <GraduationCap size={18} className="text-secondary mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-secondary">B.E. in Computer Science</h3>
            <p className="text-sm text-terminal-cyan">Chitkara University, Punjab <span className="text-muted-foreground">| 2020–2024</span></p>
            <p className="text-sm text-primary mt-0.5">CGPA: 9.0</p>
          </div>
        </div>
        <div className="flex items-start gap-3 border border-border rounded-md p-3 bg-muted/30">
          <GraduationCap size={18} className="text-secondary mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-secondary">Higher Secondary (12th)</h3>
            <p className="text-sm text-terminal-cyan">Army Public School, Punjab <span className="text-muted-foreground">| 2018–2020</span></p>
            <p className="text-sm text-primary mt-0.5">82%</p>
          </div>
        </div>
      </motion.div>
    </TerminalWindow>
  );
};

export default EducationSection;
