import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";

const skills = [
  { category: "Languages", items: ["Java", "JavaScript", "Python", "C++", "SQL"], color: "text-terminal-green" },
  { category: "Backend & Frontend", items: ["Node.js", "Express.js", "React.js", "REST APIs"], color: "text-terminal-blue" },
  { category: "Databases", items: ["MongoDB", "PostgreSQL", "Firebase", "MySQL"], color: "text-terminal-yellow" },
  { category: "DevOps & Cloud", items: ["Docker", "Kubernetes", "GCP (Anthos)", "Helm", "CI/CD", "Git", "Linux", "Jenkins"], color: "text-terminal-purple" },
  { category: "AI/ML", items: ["NLP basics", "Word Embeddings", "Transformer Attention", "LLM Integration"], color: "text-terminal-cyan" },
];

const SkillsSection = () => {
  return (
    <TerminalWindow title="shubham@portfolio: ~/skills" delay={0.2}>
      <TerminalLine command="cat /etc/skills.conf" path="~/skills" delay={0.3} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-3 space-y-3"
      >
        {skills.map((skill, i) => (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="text-sm"
          >
            <span className="text-terminal-comment"># {skill.category}</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className={`px-2 py-0.5 rounded-sm border border-border bg-muted text-xs ${skill.color} hover:bg-border transition-colors cursor-default`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </TerminalWindow>
  );
};

export default SkillsSection;
