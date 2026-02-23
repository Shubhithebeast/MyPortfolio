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

const staticBase = import.meta.env.BASE_URL;

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
    url: "https://www.pahadilingo.in/",
    image: `${staticBase}pics/pahadilingo.png`,
  },
  {
    name: "Talkies",
    desc: "Real-Time Chat Application",
    tech: ["MERN", "Socket.io", "WebSockets", "REST APIs"],
    period: "Apr 2024",
    bullets: [
      "Built full-stack real-time chat app using MERN and Socket.io.",
      "Implemented auth with bcrypt, avatar customization, and contact management.",
      "Responsive UI with real-time updates and emoji support.",
    ],
    url: "https://talkiez.onrender.com/",
    image: `${staticBase}pics/talkies.png`,
  },
  {
    name: "QuotesApp",
    desc: "MERN Quotes Application",
    tech: ["MERN", "MongoDB Atlas", "REST APIs"],
    period: "Nov 2023",
    bullets: [
      "Built and deployed full-stack MERN quote app with React and Node.js/Express.",
      "Implemented random quote retrieval, author search, and usage stats APIs.",
      "Added favorites persistence, copy/share actions, and responsive UI.",
    ],
    url: "https://quotesapp-gcj1.onrender.com",
    image: `${staticBase}pics/quotesapp.png`,
  },
];
