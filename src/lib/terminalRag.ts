import { portfolioProjects } from "@/data/projects";

type KnowledgeDoc = {
  source: string;
  section: string;
  text: string;
};

type RagChunk = {
  id: string;
  source: string;
  section: string;
  text: string;
  vector: number[];
  tokens: string[];
};

type IntentId = "role" | "strengths" | "skills" | "projects" | "contact" | "resume" | "education" | "achievements" | "location" | "personal" | "unknown";

type QueryIntent = {
  id: IntentId;
  sectionBoosts: Partial<Record<RagChunk["section"], number>>;
};

const VECTOR_DIMENSION = 128;

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "in", "is", "it",
  "its", "of", "on", "or", "that", "the", "to", "was", "were", "will", "with", "you", "your", "me",
  "i", "we", "our", "they", "their", "this", "those", "these", "about", "what", "which", "how", "can",
  "do", "does", "did", "please", "tell", "give", "show", "into", "inside", "have", "had", "using",
]);

const QUERY_TOKEN_ALIASES: Record<string, string> = {
  shubhum: "shubham",
  shubam: "shubham",
  opntext: "opentext",
  experince: "experience",
  skil: "skill",
  wrking: "working",
};

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeQueryText(text: string): string {
  const rawTokens = normalize(text).split(" ").filter(Boolean);
  const mapped = rawTokens.map((token) => QUERY_TOKEN_ALIASES[token] ?? token);
  return mapped.join(" ");
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const previous = new Array(b.length + 1).fill(0).map((_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const temp = previous[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      previous[j] = Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + cost);
      diagonal = temp;
    }
  }

  return previous[b.length];
}

function hasApproxToken(tokens: string[], candidate: string): boolean {
  return tokens.some((token) => {
    if (token === candidate) return true;
    if (Math.abs(token.length - candidate.length) > 1) return false;
    return levenshteinDistance(token, candidate) <= 1;
  });
}

function containsApproxPhrase(queryTokens: string[], phrase: string): boolean {
  const phraseTokens = tokenize(normalizeQueryText(phrase));
  if (phraseTokens.length === 0) return false;
  return phraseTokens.every((token) => hasApproxToken(queryTokens, token));
}

function detectIntent(query: string): QueryIntent {
  const queryTokens = tokenize(normalizeQueryText(query));

  if (
    hasApproxToken(queryTokens, "single") ||
    hasApproxToken(queryTokens, "married") ||
    containsApproxPhrase(queryTokens, "relationship status") ||
    containsApproxPhrase(queryTokens, "girlfriend") ||
    containsApproxPhrase(queryTokens, "boyfriend")
  ) {
    return { id: "personal", sectionBoosts: {} };
  }

  if (
    containsApproxPhrase(queryTokens, "where from") ||
    containsApproxPhrase(queryTokens, "where he from") ||
    containsApproxPhrase(queryTokens, "where is he from") ||
    hasApproxToken(queryTokens, "location") ||
    hasApproxToken(queryTokens, "based")
  ) {
    return { id: "location", sectionBoosts: { about: 0.24, experience: 0.12, education: 0.18 } };
  }

  if (
    containsApproxPhrase(queryTokens, "working at") ||
    containsApproxPhrase(queryTokens, "work at") ||
    hasApproxToken(queryTokens, "employer") ||
    hasApproxToken(queryTokens, "company") ||
    hasApproxToken(queryTokens, "opentext")
  ) {
    return { id: "role", sectionBoosts: { experience: 0.45, about: 0.25 } };
  }

  if (
    containsApproxPhrase(queryTokens, "really good") ||
    containsApproxPhrase(queryTokens, "best at") ||
    containsApproxPhrase(queryTokens, "top skills") ||
    containsApproxPhrase(queryTokens, "strong at")
  ) {
    return { id: "strengths", sectionBoosts: { skills: 0.48, experience: 0.2, achievements: 0.14 } };
  }

  if (hasApproxToken(queryTokens, "skill") || hasApproxToken(queryTokens, "stack") || hasApproxToken(queryTokens, "tech")) {
    return { id: "skills", sectionBoosts: { skills: 0.42 } };
  }

  if (hasApproxToken(queryTokens, "project") || hasApproxToken(queryTokens, "build")) {
    return { id: "projects", sectionBoosts: { projects: 0.4 } };
  }

  if (hasApproxToken(queryTokens, "contact") || hasApproxToken(queryTokens, "email") || hasApproxToken(queryTokens, "phone")) {
    return { id: "contact", sectionBoosts: { about: 0.35 } };
  }

  if (hasApproxToken(queryTokens, "resume") || hasApproxToken(queryTokens, "cv")) {
    return { id: "resume", sectionBoosts: { about: 0.2, experience: 0.2 } };
  }

  if (hasApproxToken(queryTokens, "education") || hasApproxToken(queryTokens, "college") || hasApproxToken(queryTokens, "cgpa")) {
    return { id: "education", sectionBoosts: { education: 0.45 } };
  }

  if (hasApproxToken(queryTokens, "achievement") || hasApproxToken(queryTokens, "leetcode") || hasApproxToken(queryTokens, "hackerrank")) {
    return { id: "achievements", sectionBoosts: { achievements: 0.45 } };
  }

  return { id: "unknown", sectionBoosts: {} };
}

function hashToken(token: string): number {
  let hash = 0;
  for (let index = 0; index < token.length; index += 1) {
    hash = (hash * 31 + token.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function buildVector(text: string): number[] {
  const vector = new Array<number>(VECTOR_DIMENSION).fill(0);
  const tokens = tokenize(text);

  for (const token of tokens) {
    const baseHash = hashToken(token);
    const slot = baseHash % VECTOR_DIMENSION;
    const sign = (baseHash & 1) === 0 ? 1 : -1;
    vector[slot] += sign * (1 + Math.min(token.length, 8) * 0.08);
  }

  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => value / magnitude);
}

function cosineSimilarity(left: number[], right: number[]): number {
  let sum = 0;
  for (let index = 0; index < VECTOR_DIMENSION; index += 1) {
    sum += left[index] * right[index];
  }
  return sum;
}

function chunkText(text: string, maxWords = 34, overlapWords = 8): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return [text.trim()];

  const chunks: string[] = [];
  let cursor = 0;

  while (cursor < words.length) {
    const nextCursor = Math.min(cursor + maxWords, words.length);
    chunks.push(words.slice(cursor, nextCursor).join(" "));

    if (nextCursor === words.length) break;
    cursor = Math.max(0, nextCursor - overlapWords);
  }

  return chunks;
}

function buildKnowledgeDocs(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [
    {
      source: "resume-summary",
      section: "about",
      text: "Resume summary: Shubham Bisht is an Associate Software Engineer at OpenText in Bangalore, focused on backend APIs, cloud-native delivery, automation, and production reliability.",
    },
    {
      source: "profile",
      section: "about",
      text: "Shubham Bisht is an Associate Software Engineer at OpenText. He focuses on scalable APIs, cloud-native delivery, backend reliability, and enterprise workflow automation.",
    },
    {
      source: "role",
      section: "experience",
      text: "Current role: Associate Software Engineer at OpenText, Bangalore, from Sept 2024 to present, after completing a Software Engineer Internship from May 2024 to Aug 2024.",
    },
    {
      source: "contact",
      section: "about",
      text: "Contact details include email shubhambisht703@gmail.com, phone 8699391033, and GitHub profile github.com/Shubhithebeast.",
    },
    {
      source: "skills",
      section: "skills",
      text: "Languages include Java, JavaScript, Python, C++, and SQL. Backend and frontend stack includes Node.js, Express.js, React.js, AngularJS, Spring, and REST APIs.",
    },
    {
      source: "skills",
      section: "skills",
      text: "Databases and tooling include MongoDB, PostgreSQL, Firebase, MySQL, Redis, Docker, Kubernetes, GCP Anthos, Helm, CI/CD, Git, Linux, and Jenkins.",
    },
    {
      source: "skills",
      section: "skills",
      text: "AI and ML experience includes NLP basics, word embeddings, transformer attention, and LLM integration.",
    },
    {
      source: "experience",
      section: "experience",
      text: "At OpenText, Shubham upgraded ContentConnect from Node.js 20 to 24, implemented check-in and check-out features in SmartView, resolved 40+ production defects, and automated demos with PowerShell and Microsoft Graph APIs reducing manual effort by 90%.",
    },
    {
      source: "experience",
      section: "experience",
      text: "He optimized Docker images by 20 to 40 percent, contributed to Helm chart optimization for Kubernetes deployments, and during internship automated 70 to 80 Selenium WebDriver Java end-to-end test cases reducing manual testing effort by 80 percent.",
    },
    {
      source: "projects-resume",
      section: "projects",
      text: "Highlighted projects in resume include PahadiLingo, Talkies real-time chat app, and QuotesApp. Talkies uses MERN stack, Socket.io, WebSockets, and secure authentication. QuotesApp includes author search, usage stats, and favorites flow.",
    },
    {
      source: "education",
      section: "education",
      text: "Education includes B.E. in Computer Science from Chitkara University, Punjab with CGPA 9.0 and higher secondary from Army Public School, Punjab with 82 percent.",
    },
    {
      source: "resume-focus",
      section: "skills",
      text: "Professional strengths include API design, backend optimization, production debugging, enterprise document workflow features, cloud deployment workflows, and cross-team collaboration.",
    },
    {
      source: "achievements",
      section: "achievements",
      text: "Achievements include solving 500+ coding problems with 1400+ rating on LeetCode, 5-star badges in Java C++ and Problem Solving on HackerRank, and certifications in Advanced Web Development, AI Attention in Transformers, JavaScript Essentials, and Machine Learning Regression.",
    },
  ];

  for (const project of portfolioProjects) {
    docs.push({
      source: `project:${project.name.toLowerCase()}`,
      section: "projects",
      text: `${project.name} is a ${project.desc}. Tech stack: ${project.tech.join(", ")}. Timeline: ${project.period}. Highlights: ${project.bullets.join(" ")}`,
    });
  }

  return docs;
}

const KNOWLEDGE_BASE: RagChunk[] = buildKnowledgeDocs().flatMap((doc, docIndex) =>
  chunkText(doc.text).map((chunk, chunkIndex) => ({
    id: `${doc.section}-${docIndex}-${chunkIndex}`,
    source: doc.source,
    section: doc.section,
    text: chunk,
    vector: buildVector(chunk),
    tokens: tokenize(chunk),
  }))
);

function retrieveChunks(query: string, intent: QueryIntent, limit = 4): Array<RagChunk & { score: number }> {
  const normalizedQuery = normalizeQueryText(query);
  const queryVector = buildVector(normalizedQuery);
  const queryTokens = tokenize(normalizedQuery);

  return KNOWLEDGE_BASE
    .map((chunk) => ({
      ...chunk,
      score: (() => {
        const cosine = cosineSimilarity(queryVector, chunk.vector);
        const overlapCount = queryTokens.filter((token) => chunk.tokens.includes(token)).length;
        const overlapScore = overlapCount / Math.max(1, queryTokens.length);
        const sectionBoost = intent.sectionBoosts[chunk.section] ?? 0;
        return cosine + overlapScore * 0.28 + sectionBoost;
      })(),
    }))
    .filter((chunk) => chunk.score > 0.14)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
}

function buildDirectAnswer(intent: QueryIntent, retrieved: Array<RagChunk & { score: number }>): string {
  switch (intent.id) {
    case "personal":
      return "I can only answer professional portfolio questions (skills, projects, experience, education, contact).";
    case "location":
      return "From available portfolio info: Shubham is currently working in Bangalore and has education background in Punjab.";
    case "role":
      return "Shubham is working as an Associate Software Engineer at OpenText (Bangalore) since Sept 2024, after an internship there from May to Aug 2024.";
    case "strengths":
      return "Shubham is strongest in backend APIs, React-based full-stack systems, cloud/devops workflows, and production debugging/automation.";
    case "skills":
      return "Core stack: Java, JavaScript, Python, Node.js, Express.js, React.js, AngularJS, Spring, MongoDB, PostgreSQL, Redis, Docker, Kubernetes, and GCP Anthos.";
    case "projects":
      return "Key projects include PahadiLingo, Talkies, and QuotesApp, with hands-on work in React, Firebase, Node.js, Express, MongoDB, Socket.io, and scalable API design.";
    case "contact":
      return "You can contact Shubham at shubhambisht703@gmail.com or +91 8699391033.";
    case "resume":
      return "Use resume --view to open the CV or resume --download to download it from the terminal.";
    case "education":
      return "Shubham has a B.E. in Computer Science from Chitkara University (CGPA 9.0).";
    case "achievements":
      return "Top achievements: 500+ problems solved with 1400+ LeetCode rating, 5-star HackerRank badges, and multiple certifications in web, AI, JavaScript, and ML.";
    default:
      return "I do not have exact portfolio context for that. Ask about skills, projects, experience, education, achievements, contact, or resume.";
  }
}

function chooseSuggestion(topic: string): string {
  if (topic === "projects") return "open projects";
  if (topic === "skills") return "open skills";
  if (topic === "experience") return "open experience";
  if (topic === "education") return "open education";
  if (topic === "achievements") return "open achievements";
  return "help";
}

export function runTerminalRag(query: string): string[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [
      '<span class="text-[hsl(0,80%,60%)]">Usage: ai &lt;message&gt;</span>',
      'Example: <span class="text-[hsl(180,70%,55%)]">ai summarize your OpenText impact</span>',
    ];
  }

  const intent = detectIntent(trimmedQuery);

  if (intent.id === "personal") {
    return [
      `<span class="text-[hsl(35,100%,55%)]">AI:</span> ${escapeHtml(buildDirectAnswer(intent, []))}`,
      '<span class="text-[hsl(220,10%,40%)]">RAG:</span> personal-topic guardrail applied',
      'Try <span class="text-[hsl(180,70%,55%)]">ai what are his top skills</span>.',
    ];
  }

  const retrieved = retrieveChunks(trimmedQuery, intent);

  if (retrieved.length === 0 || (intent.id === "unknown" && retrieved[0]?.score < 0.5)) {
    return [
      `<span class="text-[hsl(35,100%,55%)]">AI:</span> ${escapeHtml(buildDirectAnswer(intent, retrieved))}`,
      '<span class="text-[hsl(220,10%,40%)]">RAG:</span> chunking ✓ · embedding ✓ · vector search (low match)',
      'Try asking about <span class="text-[hsl(180,70%,55%)]">skills</span>, <span class="text-[hsl(180,70%,55%)]">projects</span>, <span class="text-[hsl(180,70%,55%)]">experience</span>, or <span class="text-[hsl(180,70%,55%)]">education</span>.',
    ];
  }

  const best = retrieved[0];
  const confidence = Math.max(0, Math.min(100, Math.round(best.score * 100)));
  const directAnswer = buildDirectAnswer(intent, retrieved);

  const suggestion = chooseSuggestion(best.section);

  return [
    `<span class="text-[hsl(35,100%,55%)]">AI:</span> ${escapeHtml(directAnswer)}`,
    `<span class="text-[hsl(220,10%,40%)]">RAG:</span> ${KNOWLEDGE_BASE.length} chunks indexed · top context ${escapeHtml(best.section)} (${confidence}%)`,
    `Try <span class="text-[hsl(180,70%,55%)]">${suggestion}</span> in terminal for full details.`,
  ];
}
