import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { ExternalLink, PlayCircle } from "lucide-react";
import { portfolioProjects } from "../data/projects";

const ProjectsSection = () => {
  return (
    <TerminalWindow title="shubham@portfolio: ~/projects" delay={0.4}>
      <TerminalLine command="open projects" path="~/projects" delay={0.5} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-3 border border-border rounded-md bg-muted/20 p-3"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioProjects.map((project, index) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.08 }}
              className="group block rounded-md border border-border bg-card hover:bg-muted/60 hover:border-primary/50 transition-colors overflow-hidden"
            >
              <div className="relative h-36 border-b border-border bg-black/30">
                <img src={project.image} alt={`${project.name} preview`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-background/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <span className="text-terminal-cyan text-xs flex items-center gap-1"><ExternalLink size={14} />Visit</span>
                  <span className="text-terminal-cyan text-xs flex items-center gap-1"><PlayCircle size={14} />Preview</span>
                </div>
              </div>

              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-primary">{project.name}</h3>
                  <span className="text-[11px] text-muted-foreground">{project.period}</span>
                </div>
                <p className="text-xs text-muted-foreground">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((technology) => (
                    <span key={technology} className="text-[11px] px-1.5 py-0.5 rounded-sm bg-border text-terminal-blue">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </TerminalWindow>
  );
};

export default ProjectsSection;
