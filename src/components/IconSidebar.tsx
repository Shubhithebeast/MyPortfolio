import { motion } from "framer-motion";
import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Trophy,
  Terminal,
} from "lucide-react";

const sections = [
  { id: "about", icon: User, label: "About" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: FolderGit2, label: "Projects" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "achievements", icon: Trophy, label: "Achievements" },
  { id: "terminal", icon: Terminal, label: "Terminal" },
];

interface IconSidebarProps {
  activeSection: string | null;
  onSelect: (id: string) => void;
  visibleSections: string[];
}

const IconSidebar = ({ activeSection, onSelect, visibleSections }: IconSidebarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 p-2 bg-card/90 backdrop-blur-sm border border-border rounded-r-lg shadow-lg"
    >
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        const isVisible = visibleSections.includes(s.id);
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            title={s.label}
            className={`group relative p-2.5 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground"
                : isVisible
                ? "text-foreground hover:bg-muted"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <s.icon size={18} />
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-card border border-border rounded-md text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              {s.label}
              {s.id !== "terminal" && !isVisible && (
                <span className="text-muted-foreground ml-1">(click to show)</span>
              )}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
};

export default IconSidebar;
