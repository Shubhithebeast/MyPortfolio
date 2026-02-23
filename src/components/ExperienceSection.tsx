import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const bullets = [
    "Upgraded ContentConnect (Outlook Add-in) from Node.js 20 to 24, refactoring legacy modules.",
    "Implemented check-in/check-out in SmartView (Teams Add-in) and fixed 40+ production defects.",
    "Automated demos using PowerShell and MS Graph APIs, reducing manual effort by 90%.",
    "Optimized Docker images by 20–40% (500MB–1GB), improving deployment speed.",
    "Built CI/CD pipelines on GCP (Anthos) with Kubernetes for automated cloud deployments.",
    "Automated E2E testing using Selenium + Java (70+ test cases), reducing manual testing by 80%.",
    "Supported cloud-native deployments and production troubleshooting in distributed environments.",
    "Collaborated in Agile/Scrum environment with cross-functional teams.",
  ];

  return (
    <TerminalWindow title="shubham@portfolio: ~/experience" delay={0.3}>
      <TerminalLine command="systemctl status career.service" path="~/experience" delay={0.4} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <Briefcase size={16} className="text-secondary" />
          <h3 className="text-lg font-semibold text-secondary">Associate Software Engineer</h3>
        </div>
        <p className="text-sm text-terminal-cyan mb-3">
          OpenText, Bangalore <span className="text-muted-foreground">|</span> Sept 2024 – Present
        </p>
        <div className="space-y-1.5 text-sm">
          {bullets.map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="flex gap-2"
            >
              <span className="text-primary shrink-0">→</span>
              <span className="text-card-foreground">{bullet}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </TerminalWindow>
  );
};

export default ExperienceSection;
