import { useEffect, useMemo, useState } from "react";

interface LinuxBootScreenProps {
  onComplete: () => void;
}

const LinuxBootScreen = ({ onComplete }: LinuxBootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  const bootLines = useMemo(
    () => [
      "[    0.000000] Booting Linux 6.8.0-portfolio-generic x86_64",
      "[    0.182113] Initializing terminal subsystem...",
      "[    0.512448] Mounting /dev/portfolio-root as ext4",
      "[    0.903340] Starting network manager service",
      "[    1.240892] Launching secure shell daemon",
      "[    1.640112] Loading user profile: shubham",
      "[    1.980551] Checking project workspace integrity: OK",
      "[    2.312004] Starting portfolio runtime",
      "[    2.700876] Last login: user recently authenticated",
      "[    3.000121] Welcome to Shubham Bisht Portfolio Terminal",
    ],
    []
  );

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      setVisibleLines((prev) => {
        if (index >= bootLines.length) {
          return prev;
        }
        const next = [...prev, bootLines[index]];
        index += 1;
        if (index >= bootLines.length) {
          window.clearInterval(timer);
          window.setTimeout(onComplete, 500);
        }
        return next;
      });
    }, 170);

    return () => window.clearInterval(timer);
  }, [bootLines, onComplete]);

  return (
    <div className="min-h-screen bg-background terminal-scanline px-6 py-8 text-sm">
      <div className="mx-auto w-full max-w-6xl rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-terminal-red" />
            <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
            <div className="w-3 h-3 rounded-full bg-terminal-green" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">boot@portfolio: ~</span>
        </div>

        <div className="p-4 font-mono text-terminal-green space-y-1 min-h-[420px]">
          {visibleLines.map((line) => (
            <div key={line} className="whitespace-pre-wrap break-words">
              {line}
            </div>
          ))}
          <div className="pt-2">
            <span className="text-muted-foreground">boot@portfolio:~$ </span>
            <span className="cursor-blink text-primary">|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinuxBootScreen;
