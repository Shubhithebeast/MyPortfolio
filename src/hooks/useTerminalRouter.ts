import { useState, useCallback } from "react";
import { runTerminalRag } from "@/lib/terminalRag";

export type SectionId = "about" | "skills" | "experience" | "projects" | "education" | "achievements" | "ai";

const SECTION_MAP: Record<string, SectionId> = {
  about: "about",
  skills: "skills",
  experience: "experience",
  projects: "projects",
  education: "education",
  achievements: "achievements",
  ai: "ai",
};

const HELP_OUTPUT = [
  '<span class="text-[hsl(140,100%,50%)]">Available commands:</span>',
  '',
  // '  <span class="text-[hsl(180,70%,55%)]">help</span>          — Show this help message',
  '  <span class="text-[hsl(180,70%,55%)]">about</span>         — Show profile intro',
  '  <span class="text-[hsl(180,70%,55%)]">ls</span>            — List all sections',
  // '  <span class="text-[hsl(180,70%,55%)]">cd &lt;section&gt;</span>  — Navigate to a section',
  '  <span class="text-[hsl(180,70%,55%)]">cat &lt;section&gt;</span> — Print section preview in terminal',
  '  <span class="text-[hsl(180,70%,55%)]">open &lt;section&gt;</span>— Open section on page',
  // '  <span class="text-[hsl(180,70%,55%)]">showall</span>       — Show all sections',
  // '  <span class="text-[hsl(180,70%,55%)]">ai &lt;message&gt;</span>   — AI chat with portfolio RAG',
  // '  <span class="text-[hsl(180,70%,55%)]">chat &lt;message&gt;</span> — Alias for ai',
  '  <span class="text-[hsl(180,70%,55%)]">whoami</span>        — About me',
  '  <span class="text-[hsl(180,70%,55%)]">pwd</span>           — Print current directory',
  '  <span class="text-[hsl(180,70%,55%)]">resume [--view|--download]</span> — Open/download CV PDF',
  '  <span class="text-[hsl(180,70%,55%)]">clear</span>         — Clear terminal (with wipe animation)',
  '  <span class="text-[hsl(180,70%,55%)]">reboot</span>        — Restart portfolio shell',
  '',
  '<span class="text-[hsl(35,100%,55%)]">Hidden easter eggs:</span>',
  '  <span class="text-[hsl(180,70%,55%)]">matrix</span>        — Green raining animation',
  // '  <span class="text-[hsl(180,70%,55%)]">top</span>           — Live skill usage stats',
  '  <span class="text-[hsl(180,70%,55%)]">history</span>       — Command history',
  // '  <span class="text-[hsl(180,70%,55%)]">neofetch</span>      — ASCII profile card',
  '',
  '<span class="text-[hsl(220,10%,40%)]"># Sections: about, skills, experience, projects, education, achievements, ai</span>',
];

const MATRIX_MARKER = "__EASTER_MATRIX__";
const PROFILE_IMAGE_PATH = `${import.meta.env.BASE_URL}mypic.png`;
const RESUME_PDF_PATH = "/resume.pdf";
const RESUME_VIEW_PATH = "/resume-view.html";

const HISTORY_OUTPUT = [
  '  1  whoami',
  '  2  help',
  '  3  open projects',
  '  4  cat skills',
  '  5  top',
  '  6  neofetch',
  '  7  matrix',
  '<span class="text-[hsl(220,10%,40%)]"># synthetic shell history · session replay mode</span>',
];

const NEOFETCH_OUTPUT = [
  '<span class="text-[hsl(140,100%,50%)]">       .--.      </span> <span class="text-[hsl(140,100%,80%)]">shubham@portfolio</span>',
  '<span class="text-[hsl(140,100%,50%)]">      |o_o |     </span> <span class="text-[hsl(180,70%,55%)]">OS:</span> Portfolio Linux 1.0',
  '<span class="text-[hsl(140,100%,50%)]">      |:_/ |     </span> <span class="text-[hsl(180,70%,55%)]">Host:</span> Developer Workstation',
  '<span class="text-[hsl(140,100%,50%)]">     //   \\ \\    </span> <span class="text-[hsl(180,70%,55%)]">Kernel:</span> 6.8.0-portfolio',
  '<span class="text-[hsl(140,100%,50%)]">    (|     | )   </span> <span class="text-[hsl(180,70%,55%)]">Role:</span> Associate Software Engineer',
  '<span class="text-[hsl(140,100%,50%)]">   /\_\___/_/\   </span> <span class="text-[hsl(180,70%,55%)]">Stack:</span> React · Node.js · MongoDB',
  '<span class="text-[hsl(140,100%,50%)]">   \___)=(___/   </span> <span class="text-[hsl(180,70%,55%)]">Contact:</span> shubh17bisht@gmail.com',
];

function buildTopOutput() {
  const now = new Date();
  const uptimeMinutes = Math.floor(Math.random() * 240) + 40;
  const api = Math.floor(Math.random() * 8) + 92;
  const react = Math.floor(Math.random() * 10) + 88;
  const dsa = Math.floor(Math.random() * 15) + 80;
  const devops = Math.floor(Math.random() * 25) + 65;

  return [
    `<span class="text-[hsl(140,100%,50%)]">top - ${now.toLocaleTimeString()} up ${uptimeMinutes} mins, 1 user, load average: 0.21, 0.37, 0.42</span>`,
    '<span class="text-[hsl(220,10%,55%)]">PID  USER      PR  NI  VIRT   RES   SHR  S  %CPU %MEM  TIME+    COMMAND</span>',
    '4042 shubham   20   0  185m   46m   12m  R   4.7  2.2  00:12.11 skill-monitor',
    '4201 shubham   20   0  256m   72m   18m  S   3.8  3.1  00:09.34 project-engine',
    '',
    '<span class="text-[hsl(35,100%,55%)]">Live Skill Usage</span>',
    `<span class="text-[hsl(180,70%,55%)]">API Design      </span> [${"█".repeat(Math.floor(api / 10))}${"░".repeat(10 - Math.floor(api / 10))}] ${api}%`,
    `<span class="text-[hsl(180,70%,55%)]">React Systems   </span> [${"█".repeat(Math.floor(react / 10))}${"░".repeat(10 - Math.floor(react / 10))}] ${react}%`,
    `<span class="text-[hsl(180,70%,55%)]">DSA/Problem Sol </span> [${"█".repeat(Math.floor(dsa / 10))}${"░".repeat(10 - Math.floor(dsa / 10))}] ${dsa}%`,
    `<span class="text-[hsl(180,70%,55%)]">DevOps/Infra    </span> [${"█".repeat(Math.floor(devops / 10))}${"░".repeat(10 - Math.floor(devops / 10))}] ${devops}%`,
  ];
}

const LS_OUTPUT = [
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">about/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">skills/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">experience/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">projects/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">education/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">achievements/</span>',
  '<span class="text-[hsl(210,80%,60%)]">drwxr-xr-x</span>  shubham  <span class="text-[hsl(140,70%,50%)]">ai/</span>',
];

const WHOAMI_OUTPUT = [
  `<div style="white-space:normal;border-top:1px solid hsl(220,10%,30%);border-bottom:1px solid hsl(220,10%,30%);padding:10px 0;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;align-items:flex-start;"><div style="min-width:240px;flex:1 1 320px;line-height:1.2;"><div style="font-size:28px;font-weight:800;color:hsl(140,100%,50%);">SHUBHAM BISHT</div><div style="margin-top:4px;font-size:16px;font-weight:700;color:hsl(35,100%,55%);">Associate Software Engineer @ OpenText</div><div style="margin-top:4px;font-size:14px;font-weight:600;color:hsl(140,100%,75%);">This portfolio belongs to Shubham Bisht.</div><div style="margin-top:4px;font-size:14px;color:hsl(180,70%,55%);">shubhambisht703@gmail.com <span style="color:hsl(220,10%,55%);">|</span> github.com/Shubhithebeast</div></div><div style="width:104px;height:104px;border:1px solid hsl(140,30%,20%);border-radius:10px;overflow:hidden;background:hsl(220,16%,10%);flex:0 0 104px;"><img src="${PROFILE_IMAGE_PATH}" alt="Shubham profile" style="width:100%;height:100%;object-fit:cover;object-position:center 28%;" /></div></div></div>`,
];

const SECTION_PREVIEW: Record<SectionId, string[]> = {
  about: [
    '<span class="text-[hsl(140,70%,50%)]">about.txt</span>',
    'Name: Shubham Bisht',
    'Role: Associate Software Engineer @ OpenText',
    'Focus: Full-stack development, APIs, and scalable backend systems',
    'Contact: shubh17bisht@gmail.com | 8699391033 | github.com/Shubhithebeast',
  ],
  skills: [
    '<span class="text-[hsl(140,70%,50%)]">skills.conf</span>',
    'Languages: Java, JavaScript, Python, C++, SQL',
    'Backend: Node.js, Express.js, REST APIs, JWT auth',
    'Frontend: React.js, responsive UI patterns',
    'Database/Tools: MongoDB, Firebase, Git/GitHub',
  ],
  experience: [
    '<span class="text-[hsl(140,70%,50%)]">experience.log</span>',
    'Current: Associate Software Engineer @ OpenText',
    'Built and maintained production-grade backend and integration workflows',
    'Improved API performance and reliability through optimization and testing',
  ],
  projects: [
    '<span class="text-[hsl(140,70%,50%)]">projects.json</span>',
    'PahadiLingo: Cultural language learning platform (React + Firebase)',
    'VideoTube: Scalable video backend with auth, upload, and REST endpoints',
    'Highlights: Search/favorites, role-based access, optimized DB queries',
  ],
  education: [
    '<span class="text-[hsl(140,70%,50%)]">education.md</span>',
    'Degree and core academic background in computer science/engineering',
    'Strong foundation in DSA, DBMS, OOP, operating systems, and networking',
  ],
  achievements: [
    '<span class="text-[hsl(140,70%,50%)]">achievements.md</span>',
    'Professional and project milestones across backend and full-stack work',
    'Consistent delivery on feature ownership, quality, and collaboration',
  ],
  ai: [
    '<span class="text-[hsl(140,70%,50%)]">ask-to-ai.chat</span>',
    'Open the Ask to AI panel from sidebar to ask portfolio questions.',
    'Example: is he making any project related to pahadi language?',
  ],
};

export function useTerminalRouter() {
  const [visibleSections, setVisibleSections] = useState<SectionId[]>(["about"]);
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [currentDir, setCurrentDir] = useState("~");
  const [outputHistory, setOutputHistory] = useState<{ input: string; output: string[] }[]>([
    { input: "whoami", output: WHOAMI_OUTPUT },
    { input: "help", output: HELP_OUTPUT },
  ]);

  const addOutput = useCallback((input: string, output: string[]) => {
    setOutputHistory((prev) => [...prev, { input, output }]);
  }, []);

  const showSection = useCallback((id: SectionId) => {
    setActiveSection(id);
    setVisibleSections((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const showAllSections = useCallback(() => {
    setVisibleSections(["about", "skills", "experience", "projects", "education", "achievements", "ai"]);
  }, []);

  const resetView = useCallback(() => {
    setOutputHistory([{ input: "whoami", output: WHOAMI_OUTPUT }]);
    setVisibleSections(["about"]);
    setActiveSection("about");
    setCurrentDir("~");
  }, []);

  const processCommand = useCallback(
    (raw: string): string[] => {
      const parts = raw.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = parts[1]?.toLowerCase();
      const fullArg = parts.slice(1).join(" ").trim();

      switch (cmd) {
        case "help":
          return HELP_OUTPUT;

        case "ls":
          return LS_OUTPUT;

        case "pwd":
          return [`<span class="text-[hsl(280,70%,65%)]">${currentDir}</span>`];

        case "about":
        case "whoami":
          showSection("about");
          return WHOAMI_OUTPUT;

        case "ai":
        case "chat": {
          showSection("ai");
          if (!fullArg) {
            return runTerminalRag("");
          }
          return runTerminalRag(fullArg);
        }

        case "matrix":
          return [
            '<span class="text-[hsl(140,100%,50%)]">Entering matrix mode...</span>',
            MATRIX_MARKER,
            '<span class="text-[hsl(220,10%,40%)]"># press any command to continue</span>',
          ];

        case "top":
          return buildTopOutput();

        case "history":
          return HISTORY_OUTPUT;

        case "neofetch":
          return NEOFETCH_OUTPUT;

        case "resume": {
          if (arg === "--view") {
            window.open(RESUME_VIEW_PATH, "_blank", "noopener,noreferrer");
            return [
              '<span class="text-[hsl(140,70%,50%)]">✓ Opening CV in new tab...</span>',
              `<span class="text-[hsl(180,70%,55%)]">Source: ${RESUME_VIEW_PATH}</span>`,
            ];
          }

          if (arg === "--download") {
            const downloadLink = document.createElement("a");
            downloadLink.href = RESUME_PDF_PATH;
            downloadLink.download = "Shubham-Bisht-CV.pdf";
            downloadLink.click();
            return [
              '<span class="text-[hsl(140,70%,50%)]">✓ Downloading CV PDF...</span>',
              `<span class="text-[hsl(180,70%,55%)]">Source: ${RESUME_PDF_PATH}</span>`,
            ];
          }

          if (arg && arg !== "--view" && arg !== "--download") {
            return [
              '<span class="text-[hsl(0,80%,60%)]">Usage: resume [--view|--download]</span>',
              '<span class="text-[hsl(220,10%,40%)]"># default: open + download</span>',
            ];
          }

          const link = document.createElement("a");
          link.href = RESUME_VIEW_PATH;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.download = "Shubham-Bisht-CV.pdf";
          link.click();

          return [
            '<span class="text-[hsl(140,70%,50%)]">✓ Opening CV PDF...</span>',
            `<span class="text-[hsl(180,70%,55%)]">Source: ${RESUME_VIEW_PATH}</span>`,
            '<span class="text-[hsl(220,10%,40%)]"># resume pdf saved...</span>',
          ];
        }

        case "clear":
          resetView();
          return [];

        case "reboot":
          window.localStorage.removeItem("portfolio:lastLoginAt");
          window.setTimeout(() => {
            window.location.reload();
          }, 420);
          return [
            '<span class="text-[hsl(35,100%,55%)]">Rebooting portfolio runtime...</span>',
            '<span class="text-[hsl(220,10%,40%)]">[OK] session cache cleared</span>',
            '<span class="text-[hsl(220,10%,40%)]">[OK] relaunching boot sequence</span>',
          ];

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

        case "cat": {
          if (!arg) {
            return [`<span class="text-[hsl(0,80%,60%)]">Usage: ${cmd} &lt;section&gt;</span>`];
          }
          const section = SECTION_MAP[arg];
          if (section) {
            return SECTION_PREVIEW[section];
          }
          return [`<span class="text-[hsl(0,80%,60%)]">${cmd}: ${arg}: No such file or directory</span>`];
        }

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
    [currentDir, showSection, showAllSections, resetView]
  );

  const handleCommand = useCallback(
    (raw: string) => {
      if (raw.trim().toLowerCase() === "clear") {
        resetView();
        return [];
      }
      const output = processCommand(raw);
      addOutput(raw, output);
      return output;
    },
    [processCommand, addOutput, resetView]
  );

  return {
    visibleSections,
    activeSection,
    outputHistory,
    handleCommand,
    showSection,
    showAllSections,
  };
}
