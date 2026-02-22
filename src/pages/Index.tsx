import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import EducationSection from "../components/EducationSection";
import AchievementsSection from "../components/AchievementsSection";
import IconSidebar from "../components/IconSidebar";
import { useTerminalRouter, SectionId } from "../hooks/useTerminalRouter";

const sectionComponents: Record<SectionId, React.FC> = {
  about: HeroSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  education: EducationSection,
  achievements: AchievementsSection,
};

const sectionOrder: SectionId[] = [
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "achievements",
];

const Index = () => {
  const { visibleSections, showSection } = useTerminalRouter();

  const handleSidebarSelect = (id: string) => {
    const sectionId = id as SectionId;
    showSection(sectionId);
    setTimeout(() => {
      document.getElementById(`section-${sectionId}`)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background terminal-scanline">
      {/* Icon sidebar */}
      <IconSidebar
        activeSection={null}
        onSelect={handleSidebarSelect}
        visibleSections={visibleSections}
      />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between pl-14">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary font-bold">⟩</span>
            <span className="text-foreground">shubham-bisht-resume</span>
            <span className="text-muted-foreground text-xs">v2.0.0</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden sm:inline">portfolio mode</span>
            <span className="hidden sm:inline">|</span>
            <span>use sidebar to navigate</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6 pl-14 md:pl-4 ml-0 md:ml-8">
        {/* Sections appear as user navigates */}
        <AnimatePresence>
          {sectionOrder
            .filter((id) => visibleSections.includes(id))
            .map((id) => {
              const Component = sectionComponents[id];
              return (
                <motion.div
                  key={id}
                  id={`section-${id}`}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <Component />
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground py-6 border-t border-border"
        >
          <p>
            <span className="text-terminal-comment"># </span>
            Built with ❤️ by Shubham Bisht
            <span className="text-terminal-comment"> | </span>
            <span className="text-primary">exit 0</span>
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
