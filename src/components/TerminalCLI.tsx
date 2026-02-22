import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Prompt } from "./TerminalLine";

interface TerminalCLIProps {
  onCommand: (cmd: string) => string[];
  outputHistory: { input: string; output: string[] }[];
}

const TerminalCLI = ({ onCommand, outputHistory }: TerminalCLIProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [outputHistory]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onCommand(input.trim());
      setHistory((prev) => [input.trim(), ...prev]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const next = historyIndex + 1;
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(history[next]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = ["help", "ls", "cd", "cat", "clear", "whoami", "pwd"];
      const match = commands.find((c) => c.startsWith(input));
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="rounded-lg border border-border bg-card overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          shubham@portfolio: ~ — bash
        </span>
      </div>
      <div
        ref={scrollRef}
        className="p-4 max-h-[300px] overflow-y-auto terminal-scanline space-y-2"
      >
        {outputHistory.map((entry, i) => (
          <div key={i}>
            <div className="text-sm">
              <Prompt />
              <span className="text-foreground">{entry.input}</span>
            </div>
            {entry.output.map((line, j) => (
              <div
                key={j}
                className="text-sm pl-0 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
        ))}
        {/* Input line */}
        <div className="text-sm flex items-center">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-foreground flex-1 caret-primary"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalCLI;
