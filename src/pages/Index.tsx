import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import EducationSection from "../components/EducationSection";
import AchievementsSection from "../components/AchievementsSection";
import TerminalCLI from "../components/TerminalCLI";
import IconSidebar from "../components/IconSidebar";
import ShowcasePanel from "../components/ShowcasePanel";
import LinuxBootScreen from "../components/LinuxBootScreen";
import AIChatPanel from "../components/AIChatPanel";
import { useTerminalRouter, SectionId } from "../hooks/useTerminalRouter";

const RECENT_LOGIN_KEY = "portfolio:lastLoginAt";
const RECENT_LOGIN_WINDOW_MS = 1000 * 60 * 60 * 24;

const sectionComponents: Record<SectionId, React.FC> = {
  about: HeroSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  education: EducationSection,
  achievements: AchievementsSection,
  ai: AIChatPanel,
};

const sectionOrder: SectionId[] = [
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "achievements",
  "ai",
];

const Index = () => {
  const { visibleSections, activeSection, outputHistory, handleCommand, showSection } =
    useTerminalRouter();
  const shouldScrollRightPanel = activeSection === "projects";
  const terminalRef = useRef<HTMLDivElement>(null);
  const [showBoot, setShowBoot] = useState(false);
  const [bootCheckDone, setBootCheckDone] = useState(false);

  useEffect(() => {
    const lastLoginValue = window.localStorage.getItem(RECENT_LOGIN_KEY);
    const lastLoginTime = lastLoginValue ? Number(lastLoginValue) : 0;
    const isRecentLogin = Number.isFinite(lastLoginTime) && Date.now() - lastLoginTime < RECENT_LOGIN_WINDOW_MS;

    setShowBoot(!isRecentLogin);
    setBootCheckDone(true);
  }, []);

  const completeBootSequence = () => {
    window.localStorage.setItem(RECENT_LOGIN_KEY, String(Date.now()));
    setShowBoot(false);
  };

  const handleSidebarSelect = (id: string) => {
    const sectionId = id as SectionId;
    showSection(sectionId);
    setTimeout(() => {
      document.getElementById(`section-${sectionId}`)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!bootCheckDone) {
    return null;
  }

  if (showBoot) {
    return <LinuxBootScreen onComplete={completeBootSequence} />;
  }

  return (
    <div className="min-h-screen bg-background terminal-scanline">
      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl leading-tight">
            <span className="text-primary font-bold">⟩</span>
            <span className="text-foreground font-bold">shubham-bisht-resume</span>
            <span className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm">v2.0.0</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden lg:inline">interactive mode</span>
            <span className="hidden lg:inline">|</span>
            <span>type <span className="text-primary">help</span> below</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="w-full px-3 sm:px-4 py-5 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(460px,1fr)] 2xl:grid-cols-[minmax(0,1.9fr)_minmax(520px,1.2fr)] gap-4 sm:gap-6 items-start">
          <div className="min-w-0">
            <div ref={terminalRef} id="section-terminal" className="xl:sticky xl:top-28">
              <TerminalCLI onCommand={handleCommand} outputHistory={outputHistory} />
            </div>
          </div>

          <div className="min-w-0 xl:sticky xl:top-28 xl:h-[calc(100vh-9.5rem)] xl:flex xl:flex-col xl:gap-3">
            <IconSidebar embedded activeSection={activeSection} onSelect={handleSidebarSelect} visibleSections={visibleSections} />
            <div
              className={`terminal-scanline xl:flex-1 xl:min-h-0 pr-1 ${
                shouldScrollRightPanel ? "xl:overflow-y-auto" : "xl:overflow-y-hidden"
              }`}
            >
              <AnimatePresence mode="wait">
                {activeSection === "projects" ? (
                  <motion.div
                    key="preview-projects"
                    id="section-projects"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ShowcasePanel projectsActive />
                  </motion.div>
                ) : (
                  sectionOrder
                    .filter((id) => id === activeSection)
                    .map((id) => {
                      const Component = sectionComponents[id];
                      return (
                        <motion.div
                          key={`preview-${id}`}
                          id={`section-${id}`}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Component />
                        </motion.div>
                      );
                    })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full flex items-center justify-center text-center text-xs text-muted-foreground h-16 border-t border-border"
      >
        <p>
          <span className="text-terminal-comment"># </span>
          Built with ❤️ by Shubham Bisht
          <span className="text-terminal-comment"> | </span>
          <span className="text-primary">exit 0</span>
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
