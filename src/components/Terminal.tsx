import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import dashboardImg from "@/assets/fkvim-dashboard.png";
import editorImg from "@/assets/fkvim-editor.png";
import explorerImg from "@/assets/fkvim-explorer.png";
import finderImg from "@/assets/fkvim-finder.png";

type TerminalState = "welcome" | "dashboard" | "editor" | "explorer" | "finder";

export const Terminal = () => {
  const [state, setState] = useState<TerminalState>("welcome");
  const [input, setInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (state === "dashboard" && e.key === "i") {
        setState("editor");
      } else if (state === "editor" || state === "explorer" || state === "finder") {
        if (e.key === "Escape") {
          setState("dashboard");
        } else if (e.key === "e" && e.code === "KeyE" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        } else if (e.key === " ") {
          // Wait for next key
          const handleSpace = (ev: KeyboardEvent) => {
            if (ev.key === "e") {
              setState("explorer");
            } else if (ev.key === "/") {
              setState("finder");
            }
            window.removeEventListener("keydown", handleSpace);
          };
          window.addEventListener("keydown", handleSpace);
          setTimeout(() => window.removeEventListener("keydown", handleSpace), 1000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (["fkvim", "nvim", "neovim"].includes(cmd)) {
      setState("dashboard");
      setInput("");
    }
  };

  const renderContent = () => {
    switch (state) {
      case "welcome":
        return (
          <div className="space-y-4">
            <div className="text-terminal-text font-mono text-sm">
              <div className="text-success">→</div>
              <div className="mt-2">Welcome to FKvim Interactive Demo</div>
              <div className="mt-4 text-muted-foreground">
                Type <span className="text-primary font-semibold">fkvim</span>,{" "}
                <span className="text-primary font-semibold">nvim</span>, or{" "}
                <span className="text-primary font-semibold">neovim</span> to get started
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-6">
              <span className="text-success">→</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-terminal-text font-mono"
                autoFocus
                spellCheck={false}
              />
              {showCursor && <span className="w-2 h-4 bg-terminal-cursor animate-pulse" />}
            </form>
          </div>
        );
      case "dashboard":
        return (
          <div className="relative">
            <img src={dashboardImg} alt="FKvim Dashboard" className="w-full rounded-lg" />
            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-terminal-border">
              <div className="text-sm font-mono text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-secondary rounded text-primary">i</kbd> to enter editor mode
              </div>
            </div>
          </div>
        );
      case "editor":
        return (
          <div className="relative">
            <img src={editorImg} alt="FKvim Editor" className="w-full rounded-lg" />
            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-terminal-border">
              <div className="text-sm font-mono text-muted-foreground space-y-1">
                <div>
                  Press <kbd className="px-2 py-1 bg-secondary rounded text-primary">Space</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-secondary rounded text-primary">e</kbd> for file explorer
                </div>
                <div>
                  Press <kbd className="px-2 py-1 bg-secondary rounded text-primary">Space</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-secondary rounded text-primary">/</kbd> for fuzzy finder
                </div>
                <div>
                  Press <kbd className="px-2 py-1 bg-secondary rounded text-primary">Esc</kbd> to return
                </div>
              </div>
            </div>
          </div>
        );
      case "explorer":
        return (
          <div className="relative">
            <img src={explorerImg} alt="FKvim Explorer" className="w-full rounded-lg" />
            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-terminal-border">
              <div className="text-sm font-mono text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-secondary rounded text-primary">Esc</kbd> to return to editor
              </div>
            </div>
          </div>
        );
      case "finder":
        return (
          <div className="relative">
            <img src={finderImg} alt="FKvim Finder" className="w-full rounded-lg" />
            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-terminal-border">
              <div className="text-sm font-mono text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-secondary rounded text-primary">Esc</kbd> to return to editor
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg border border-terminal-border bg-terminal-bg shadow-terminal overflow-hidden",
        "transition-all duration-300"
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-terminal-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-warning" />
          <div className="w-3 h-3 rounded-full bg-success" />
        </div>
        <div className="flex-1 text-center text-sm font-mono text-muted-foreground">Terminal</div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 min-h-[500px]">{renderContent()}</div>
    </div>
  );
};
