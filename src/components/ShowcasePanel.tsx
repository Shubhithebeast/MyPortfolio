import { motion } from "framer-motion";
import { ExternalLink, PlayCircle } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { portfolioProjects } from "../data/projects";

interface ShowcasePanelProps {
  projectsActive: boolean;
}

const ShowcasePanel = ({ projectsActive }: ShowcasePanelProps) => {
  return (
    <TerminalWindow title="shubham@portfolio: ~/showcase" delay={0.15}>
      {projectsActive ? (
        <>
          <TerminalLine command="open projects" path="~/showcase" delay={0.2} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-3 border border-border rounded-md bg-muted/20 p-3"
          >
            <div className="grid grid-cols-1 gap-3">
              {portfolioProjects.map((project, index) => (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.06 }}
                  className="group block rounded-md border border-border bg-card hover:border-primary/60 hover:bg-muted/40 transition-colors overflow-hidden"
                >
                  <div className="relative h-32 border-b border-border bg-black/40">
                    <img src={project.image} alt={`${project.name} preview`} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-background/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-terminal-cyan">
                      <span className="flex items-center gap-1 text-xs"><ExternalLink size={14} />Open</span>
                      <span className="flex items-center gap-1 text-xs"><PlayCircle size={14} />Preview</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-primary font-semibold text-sm">{project.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{project.desc}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <TerminalLine command='echo "Hey! Please visit my portfolio 🚀"' path="~/showcase" delay={0.2} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-3 border border-border rounded-md bg-muted/20 p-3"
          >
            <img src="/project-placeholder.svg" alt="Portfolio showcase" className="w-full rounded-md border border-border" />
            <p className="mt-3 text-sm text-terminal-cyan">Use <span className="text-primary">open projects</span> in terminal to load all projects here.</p>
          </motion.div>
        </>
      )}
    </TerminalWindow>
  );
};

export default ShowcasePanel;
