import { useState } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { portfolioProjects } from "../data/projects";
import type { PortfolioProject } from "../data/projects";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <TerminalWindow title="shubham@portfolio: ~/projects" delay={0.4}>
      <TerminalLine command="open projects" path="~/projects" delay={0.5} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-3 border border-border rounded-md bg-muted/20 p-3"
      >
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-border bg-card overflow-hidden"
          >
            <div className="h-44 border-b border-border bg-black/30">
              <img src={selectedProject.image} alt={`${selectedProject.name} preview`} className="h-full w-full object-cover" />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-primary">{selectedProject.name}</h3>
                <span className="text-[11px] text-muted-foreground">{selectedProject.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{selectedProject.desc}</p>
              <div className="space-y-1.5">
                {selectedProject.bullets.map((bullet) => (
                  <div key={bullet} className="text-xs text-card-foreground flex gap-2">
                    <span className="text-primary shrink-0">→</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map((technology) => (
                  <span key={technology} className="text-[11px] px-1.5 py-0.5 rounded-sm bg-border text-terminal-blue">
                    {technology}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-foreground hover:text-primary hover:border-primary/60 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to Projects
                </button>
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-terminal-cyan hover:text-primary hover:border-primary/60 transition-colors"
                >
                  <ExternalLink size={14} />
                  Open Project
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.08 }}
                className="group rounded-md border border-border bg-card hover:bg-muted/60 hover:border-primary/50 transition-colors overflow-hidden"
              >
                <div className="relative h-36 border-b border-border bg-black/30">
                  <img src={project.image} alt={`${project.name} preview`} className="h-full w-full object-cover" />
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
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-foreground hover:text-primary hover:border-primary/60 transition-colors"
                    >
                      Preview
                    </button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-terminal-cyan hover:text-primary hover:border-primary/60 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Open
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </TerminalWindow>
  );
};

export default ProjectsSection;
