import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { FolderGit2 } from "lucide-react";

const projects = [
  {
    name: "PahadiLingo",
    desc: "Cultural Language Learning Platform",
    tech: ["React.js", "Firebase"],
    period: "Sept 2023 – Present",
    bullets: [
      "Cross-platform React.js web app promoting Pahadi language and culture.",
      "Firebase auth and real-time database for secure content management.",
      "Search and favorites functionality for quick word lookup.",
      "Scalable architecture supporting 50+ active community contributors.",
    ],
  },
  {
    name: "VideoTube",
    desc: "Video Streaming Backend Platform",
    tech: ["Node.js", "MongoDB", "Express.js"],
    period: "Dec 2024 – Present",
    bullets: [
      "Scalable REST API (35+ routes) with JWT auth and role-based access control.",
      "Optimized MongoDB queries with aggregation pipelines, improving response time 40%.",
      "Secure file upload with Multer for video and image processing.",
    ],
  },
];

const ProjectsSection = () => {
  return (
    <TerminalWindow title="shubham@portfolio: ~/projects" delay={0.4}>
      <TerminalLine command="ls -la ~/projects/" path="~/projects" delay={0.5} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-3 space-y-5"
      >
        {projects.map((project, pi) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + pi * 0.2 }}
            className="border border-border rounded-md p-4 bg-muted/30 hover:bg-muted/60 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <FolderGit2 size={16} className="text-terminal-green" />
              <h3 className="font-semibold text-primary">{project.name}</h3>
              <span className="text-muted-foreground text-xs">– {project.desc}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">{project.period}</span>
              <span className="text-muted-foreground">|</span>
              <div className="flex gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-1.5 py-0.5 rounded-sm bg-border text-terminal-blue">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-1 text-sm">
              {project.bullets.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-terminal-green shrink-0">$</span>
                  <span className="text-card-foreground">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </TerminalWindow>
  );
};

export default ProjectsSection;
