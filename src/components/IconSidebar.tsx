import { motion } from "framer-motion";
import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Trophy,
  Sparkles,
  Eye,
  Download,
} from "lucide-react";

const sections = [
  { id: "about", icon: User, label: "About" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: FolderGit2, label: "Projects" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "achievements", icon: Trophy, label: "Achievements" },
  { id: "ai", icon: Sparkles, label: "Ask to AI" },
];

interface IconSidebarProps {
  activeSection: string | null;
  onSelect: (id: string) => void;
  visibleSections: string[];
  embedded?: boolean;
  resumeViewPath?: string;
  resumePdfPath?: string;
}

const IconSidebar = ({
  activeSection,
  onSelect,
  visibleSections,
  embedded = false,
  resumeViewPath = "/resume-view.html",
  resumePdfPath = "/resume.pdf",
}: IconSidebarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={embedded
        ? "flex flex-nowrap items-center gap-1 p-1.5 sm:p-2 bg-card/90 border-b border-border"
        : "fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 p-2 bg-card/90 backdrop-blur-sm border border-border rounded-r-lg shadow-lg"
      }
    >
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        const isVisible = visibleSections.includes(s.id);
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            title={s.label}
            className={`group relative p-2 sm:p-2.5 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground"
                : isVisible
                ? "text-foreground hover:bg-muted"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <s.icon size={18} />
            {/* Tooltip */}
            <span className={`${embedded ? "bottom-full mb-2 left-1/2 -translate-x-1/2 z-20" : "left-full ml-2"} absolute px-2 py-1 text-xs bg-card border border-border rounded-md text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity`}>
              {s.label}
              {!isVisible && (
                <span className="text-muted-foreground ml-1">(click to show)</span>
              )}
            </span>
          </button>
        );
      })}

      {embedded && (
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 pl-1 sm:pl-2">
          <a
            href={resumeViewPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-border text-xs text-terminal-cyan hover:text-primary hover:border-primary/60 transition-colors"
            title="View Resume"
          >
            <Eye size={14} />
            <span className="hidden 2xl:inline">View CV</span>
          </a>
          <a
            href={resumePdfPath}
            download="Shubham-Bisht-CV.pdf"
            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-border text-xs text-terminal-cyan hover:text-primary hover:border-primary/60 transition-colors"
            title="Download Resume"
          >
            <Download size={14} />
            <span className="hidden 2xl:inline">Download CV</span>
          </a>
        </div>
      )}
    </motion.nav>
  );
};

export default IconSidebar;
