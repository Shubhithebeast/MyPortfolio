import { useMemo, useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { runTerminalRag } from "@/lib/terminalRag";

type ChatEntry = {
  question: string;
  answer: string[];
};

const AIChatPanel = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const isEmpty = chatHistory.length === 0;

  const placeholderHints = useMemo(
    () => ["what is shubham working at", "what is shubham really good at", "summarize skills"],
    []
  );

  const handleAsk = () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const answer = runTerminalRag(trimmed);
    setChatHistory((prev) => [...prev, { question: trimmed, answer }]);
    setQuestion("");
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col h-[62vh] sm:h-[64vh] xl:h-full min-h-0">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-muted border-b border-border">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles size={15} className="text-primary" />
          <span>AI Chat</span>
        </div>
        <span className="text-xs text-muted-foreground">portfolio-rag</span>
      </div>

      <div className={`flex-1 p-3 terminal-scanline ${isEmpty ? "overflow-y-hidden" : "overflow-y-auto"}`}>
        {isEmpty ? (
          <div className="h-full rounded-md border border-border bg-muted/20 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-primary">shubham@portfolio:~/ai</span>
              <span className="text-muted-foreground">stack-profile.mode</span>
            </div>

            <div className="rounded-md border border-border bg-card/70 p-3 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-3 items-start">
                <pre className="text-[11px] sm:text-xs leading-5 text-terminal-green whitespace-pre">
{`   .--.
  |o_o |
  |:_/ |
 //   \\ \\
(|     | )
/\_\___/_/\
\___)=(___/`}
                </pre>
                <div className="text-[11px] sm:text-xs leading-6 text-terminal-cyan">
                  <div><span className="text-muted-foreground">name:</span> Shubham Bisht</div>
                  <div><span className="text-muted-foreground">role:</span> Associate Software Engineer</div>
                  <div><span className="text-muted-foreground">org:</span> OpenText · Bangalore</div>
                  <div><span className="text-muted-foreground">focus:</span> APIs · React · Cloud Systems</div>
                  <div><span className="text-muted-foreground">stack:</span> Node.js · Express · MongoDB · Docker · K8s</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
              {[
                "JavaScript",
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Docker",
                "Kubernetes",
                "REST APIs",
                "CI/CD",
              ].map((item) => (
                <span key={item} className="px-2 py-1 rounded-sm border border-border bg-background text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div>Ask things like:</div>
              <div className="text-terminal-cyan">• what is shubham working at</div>
              <div className="text-terminal-cyan">• what are his strongest skills</div>
              <div className="text-terminal-cyan">• is he making pahadi language projects</div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {chatHistory.map((entry, index) => (
              <div key={`${entry.question}-${index}`} className="space-y-1.5">
                <div className="text-xs sm:text-sm text-foreground">
                  <span className="text-primary">You:</span> {entry.question}
                </div>
                <div className="space-y-1 pl-2 border-l border-border">
                  {entry.answer.map((line, lineIndex) => (
                    <div
                      key={`${index}-${lineIndex}`}
                      className="text-xs sm:text-sm text-card-foreground whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-2.5 bg-muted/30">
        <div className="flex items-center gap-2">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAsk();
              }
            }}
            placeholder={`Try: ${placeholderHints[Math.floor(Math.random() * placeholderHints.length)]}`}
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={handleAsk}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border text-terminal-cyan hover:text-primary hover:border-primary/60 transition-colors"
            title="Send"
            aria-label="Send"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;
