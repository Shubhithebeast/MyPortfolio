import { useState, useCallback } from "react";

export type SectionId = "about" | "skills" | "experience" | "projects" | "education" | "achievements";

const SECTION_MAP: Record<string, SectionId> = {
  about: "about",
  skills: "skills",
  experience: "experience",
  projects: "projects",
  education: "education",
  achievements: "achievements",
};

const HELP_OUTPUT = [
  '<span class="text-[hsl(140,100%,50%)]">Available commands:</span>',
  '',
  '  <span class="text-[hsl(180,70%,55%)]">help</span>          — Show this help message',
  '  <span class="text-[hsl(180,70%,55%)]">ls</span>            — List all sections',
  '  <span class="text-[hsl(180,70%,55%)]">cd &lt;section&gt;</span>  — Navigate to a section',
  '  <span class="text-[hsl(180,70%,55%)]">cat &lt;section&gt;</span> — Display section content',
  '  <span class="text-[hsl(180,70%,55%)]">open &lt;section&gt;</span>— Show section on page',
  '  <span class="text-[hsl(180,70%,55%)]">showall</span>       — Show all sections',
  '  <span class="text-[hsl(180,70%,55%)]">whoami</span>        — About me',
  '  <span class="text-[hsl(180,70%,55%)]">pwd</span>           — Print current directory',
  '  <span class="text-[hsl(180,70%,55%)]">clear</span>         — Clear terminal',
  '',
  '<span class="text-[hsl(220,10%,40%)]"># Sections: about, skills, experience, projects, education, achievements</span>',
];

const LS_OUTPUT = [
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">about/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">skills/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">experience/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">projects/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">education/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">achievements/</span>',
];

const WHOAMI_OUTPUT = [
  '<span class="text-[hsl(140,100%,50%)]">Shubham Bisht</span>',
  'Associate Software Engineer @ Opentext',
  '<span class="text-[hsl(180,70%,55%)]">shubh17bisht@gmail.com</span> | <span class="text-[hsl(180,70%,55%)]">github.com/Shubhithebeast</span>',
];

export function useTerminalRouter() {
  const [visibleSections, setVisibleSections] = useState<SectionId[]>(["about"]);
  const [currentDir, setCurrentDir] = useState("~");
  const [outputHistory, setOutputHistory] = useState<{ input: string; output: string[] }[]>([
    { input: "help", output: HELP_OUTPUT },
  ]);

  const addOutput = useCallback((input: string, output: string[]) => {
    setOutputHistory((prev) => [...prev, { input, output }]);
  }, []);

  const showSection = useCallback((id: SectionId) => {
    setVisibleSections((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const showAllSections = useCallback(() => {
    setVisibleSections(["about", "skills", "experience", "projects", "education", "achievements"]);
  }, []);

  const processCommand = useCallback(
    (raw: string): string[] => {
      const parts = raw.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = parts[1]?.toLowerCase();

      switch (cmd) {
        case "help":
          return HELP_OUTPUT;

        case "ls":
          return LS_OUTPUT;

        case "pwd":
          return [`<span class="text-[hsl(280,70%,65%)]">${currentDir}</span>`];

        case "whoami":
          showSection("about");
          return WHOAMI_OUTPUT;

        case "clear":
          setOutputHistory([]);
          return [];

        case "cd": {
          if (!arg || arg === "~") {
            setCurrentDir("~");
            return ['<span class="text-[hsl(220,10%,40%)]"># Changed to home directory</span>'];
          }
          const section = SECTION_MAP[arg];
          if (section) {
            setCurrentDir(`~/${arg}`);
            showSection(section);
            return [`<span class="text-[hsl(220,10%,40%)]"># Now in ~/${arg}</span>`];
          }
          return [`<span class="text-[hsl(0,80%,60%)]">bash: cd: ${arg}: No such directory</span>`];
        }

        case "cat":
        case "open": {
          if (!arg) {
            return [`<span class="text-[hsl(0,80%,60%)]">Usage: ${cmd} &lt;section&gt;</span>`];
          }
          const section = SECTION_MAP[arg];
          if (section) {
            showSection(section);
            setTimeout(() => {
              document.getElementById(`section-${section}`)?.scrollIntoView({ behavior: "smooth" });
            }, 100);
            return [`<span class="text-[hsl(140,70%,50%)]">✓ Showing ${arg} section</span>`];
          }
          return [`<span class="text-[hsl(0,80%,60%)]">${cmd}: ${arg}: No such file or directory</span>`];
        }

        case "showall":
          showAllSections();
          return ['<span class="text-[hsl(140,70%,50%)]">✓ All sections are now visible</span>'];

        default:
          return [
            `<span class="text-[hsl(0,80%,60%)]">bash: ${cmd}: command not found</span>`,
            '<span class="text-[hsl(220,10%,40%)]"># Type "help" to see available commands</span>',
          ];
      }
    },
    [currentDir, showSection, showAllSections]
  );

  const handleCommand = useCallback(
    (raw: string) => {
      if (raw.trim().toLowerCase() === "clear") {
        setOutputHistory([]);
        return [];
      }
      const output = processCommand(raw);
      addOutput(raw, output);
      return output;
    },
    [processCommand, addOutput]
  );

  return {
    visibleSections,
    outputHistory,
    handleCommand,
    showSection,
    showAllSections,
  };
}
