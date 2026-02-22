export interface PortfolioProject {
  name: string;
  desc: string;
  tech: string[];
  period: string;
  bullets: string[];
  url: string;
  image: string;
  videoUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "PahadiLingo",
    desc: "Cultural Language Learning Platform",
    tech: ["React.js", "Firebase"],
    period: "Sept 2023 – Present",
    bullets: [
      "Cross-platform React.js web app promoting Pahadi language and culture.",
      "Firebase auth and real-time database for secure content management.",
      "Search and favorites functionality for quick word lookup.",
      "Scalable architecture supporting 50+ active community contributors.",
    ],
    url: "https://example.com/pahadilingo",
    image: "/project-placeholder.svg",
  },
  {
    name: "VideoTube",
    desc: "Video Streaming Backend Platform",
    tech: ["Node.js", "MongoDB", "Express.js"],
    period: "Dec 2024 – Present",
    bullets: [
      "Scalable REST API (35+ routes) with JWT auth and role-based access control.",
      "Optimized MongoDB queries with aggregation pipelines, improving response time 40%.",
      "Secure file upload with Multer for video and image processing.",
    ],
    url: "https://example.com/videotube",
    image: "/project-placeholder.svg",
  },
  {
    name: "Portfolio CLI",
    desc: "Interactive terminal-based portfolio",
    tech: ["React", "Tailwind", "Framer Motion"],
    period: "2025",
    bullets: [
      "Command-driven portfolio navigation with keyboard-first UX.",
      "Custom blinking cursor and section routing via terminal commands.",
    ],
    url: "https://example.com/portfolio-cli",
    image: "/project-placeholder.svg",
  },
  {
    name: "Auth Starter",
    desc: "Reusable auth starter template",
    tech: ["Node.js", "JWT", "MongoDB"],
    period: "2025",
    bullets: [
      "Starter template for auth, RBAC, and API security basics.",
      "Pre-configured middleware and clean module structure.",
    ],
    url: "https://example.com/auth-starter",
    image: "/project-placeholder.svg",
  },
  {
    name: "Realtime Chat",
    desc: "Socket-based chat demo",
    tech: ["React", "Socket.io", "Express"],
    period: "2024",
    bullets: [
      "Low-latency messaging with typing indicators and room support.",
      "Simple production-ready architecture for extensions.",
    ],
    url: "https://example.com/realtime-chat",
    image: "/project-placeholder.svg",
  },
];
