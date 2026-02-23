import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import TerminalLine from "./TerminalLine";
import { portfolioProjects } from "../data/projects";
import type { PortfolioProject } from "../data/projects";

interface ShowcasePanelProps {
  projectsActive: boolean;
}

const ShowcasePanel = ({ projectsActive }: ShowcasePanelProps) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

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
            {selectedProject ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md border border-border bg-card overflow-hidden"
              >
                <div className="relative h-40 border-b border-border bg-black/40">
                  <img src={selectedProject.image} alt={`${selectedProject.name} preview`} className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="p-3 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-primary font-semibold text-sm">{selectedProject.name}</div>
                    <span className="text-[11px] text-muted-foreground">{selectedProject.period}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{selectedProject.desc}</div>
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
                      className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-border text-xs text-foreground hover:text-primary hover:border-primary/60 transition-colors"
                    >
                      <ArrowLeft size={13} />
                      Back
                    </button>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-border text-xs text-terminal-cyan hover:text-primary hover:border-primary/60 transition-colors"
                    >
                      <ExternalLink size={13} />
                      Open
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {portfolioProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.06 }}
                    className="group rounded-md border border-border bg-card hover:border-primary/60 hover:bg-muted/40 transition-colors overflow-hidden"
                  >
                    <div className="relative h-32 border-b border-border bg-black/40">
                      <img src={project.image} alt={`${project.name} preview`} className="w-full h-full object-cover opacity-90" />
                    </div>
                    <div className="p-3">
                      <div className="text-primary font-semibold text-sm">{project.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{project.desc}</div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-border text-xs text-foreground hover:text-primary hover:border-primary/60 transition-colors"
                        >
                          Preview
                        </button>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-border text-xs text-terminal-cyan hover:text-primary hover:border-primary/60 transition-colors"
                        >
                          <ExternalLink size={13} />
                          Open
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
            <img src={`${import.meta.env.BASE_URL}project-placeholder.svg`} alt="Portfolio showcase" className="w-full rounded-md border border-border" />
            <p className="mt-3 text-sm text-terminal-cyan">Use <span className="text-primary">open projects</span> in terminal to load all projects here.</p>
          </motion.div>
        </>
      )}
    </TerminalWindow>
  );
};

export default ShowcasePanel;
