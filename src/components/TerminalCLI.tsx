import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Prompt } from "./TerminalLine";

interface TerminalCLIProps {
  onCommand: (cmd: string) => string[];
  outputHistory: { input: string; output: string[] }[];
}

const MATRIX_MARKER = "__EASTER_MATRIX__";

const MatrixRainBlock = () => {
  const columns = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="matrix-rain mt-1 mb-2 rounded-md border border-border bg-black/30">
      {columns.map((column) => (
        <span
          key={column}
          className="matrix-column"
          style={{
            left: `${(column / columns.length) * 100}%`,
            animationDelay: `${(column % 7) * 0.18}s`,
            animationDuration: `${2.2 + (column % 5) * 0.35}s`,
          }}
        >
          {Math.random().toString(2).slice(2, 14)}
        </span>
      ))}
    </div>
  );
};

const TerminalCLI = ({ onCommand, outputHistory }: TerminalCLIProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorPos, setCursorPos] = useState(0);
  const [clearAnimating, setClearAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [outputHistory]);

  const syncCursorPosition = () => {
    const position = inputRef.current?.selectionStart ?? input.length;
    setCursorPos(position);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim();
      setHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
      setInput("");
      setCursorPos(0);

      if (cmd.toLowerCase() === "clear") {
        setClearAnimating(true);
        window.setTimeout(() => {
          onCommand(cmd);
          setClearAnimating(false);
        }, 350);
        return;
      }

      onCommand(cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const next = historyIndex + 1;
        setHistoryIndex(next);
        setInput(history[next]);
        setCursorPos(history[next].length);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(history[next]);
        setCursorPos(history[next].length);
      } else {
        setHistoryIndex(-1);
        setInput("");
        setCursorPos(0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "help",
        "about",
        "whoami",
        "ls",
        "cd",
        "cat",
        "open",
        "showall",
        "ai",
        "chat",
        "pwd",
        "matrix",
        "top",
        "history",
        "neofetch",
        "resume",
        "reboot",
        "clear",
      ];
      const match = commands.find((c) => c.startsWith(input));
      if (match) {
        setInput(match);
        setCursorPos(match.length);
      }
    }

    requestAnimationFrame(syncCursorPosition);
  };

  return (
    <div
      className="relative rounded-lg border border-border bg-card overflow-hidden h-[58vh] sm:h-[65vh] xl:h-[calc(100vh-9.5rem)] flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <span className="text-sm sm:text-base lg:text-xl font-bold text-foreground ml-2 truncate">
          shubham@portfolio: ~ — bash
        </span>
      </div>
      <div
        ref={scrollRef}
        className="p-4 flex-1 overflow-y-auto terminal-scanline space-y-2"
      >
        {outputHistory.map((entry, i) => (
          <div key={i}>
            <div className="text-xs sm:text-sm">
              <Prompt />
              <span className="text-foreground">{entry.input}</span>
            </div>
            {entry.output.map((line, j) => (
              line === MATRIX_MARKER ? (
                <MatrixRainBlock key={j} />
              ) : (
                <div
                  key={j}
                  className="text-xs sm:text-sm pl-0 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              )
            ))}
          </div>
        ))}
        {/* Input line */}
        <div className="text-xs sm:text-sm flex items-center">
          <Prompt />
          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setCursorPos(e.target.selectionStart ?? e.target.value.length);
              }}
              onKeyDown={handleKeyDown}
              onKeyUp={syncCursorPosition}
              onClick={syncCursorPosition}
              onSelect={syncCursorPosition}
              className="bg-transparent border-none outline-none text-foreground w-full caret-transparent"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 bg-primary cursor-blink h-6 w-[3px] rounded-sm"
              style={{ left: `calc(${cursorPos}ch)` }}
            />
          </div>
        </div>
      </div>

      {clearAnimating && (
        <div className="clear-wipe pointer-events-none absolute inset-0 z-20" />
      )}
    </div>
  );
};

export default TerminalCLI;
