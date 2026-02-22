import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { Trophy } from "lucide-react";

const AchievementsSection = () => {
  const achievements = [
    "Solved 500+ DSA problems (1400+ rating) on LeetCode.",
    "5 Star in Java, C++, and Problem Solving on HackerRank.",
    "Strong foundation in Data Structures, Algorithms, and OOP.",
  ];

  return (
    <TerminalWindow title="shubham@portfolio: ~/achievements" delay={0.6}>
      <TerminalLine command="cat ~/achievements/README.md" path="~/achievements" delay={0.7} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-3 space-y-2"
      >
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + i * 0.1 }}
            className="flex items-start gap-2 text-sm"
          >
            <Trophy size={14} className="text-secondary mt-0.5 shrink-0" />
            <span className="text-card-foreground">{a}</span>
          </motion.div>
        ))}
      </motion.div>
    </TerminalWindow>
  );
};

export default AchievementsSection;
