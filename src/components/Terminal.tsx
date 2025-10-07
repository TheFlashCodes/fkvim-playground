import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import dashboardImg from "@/assets/fkvim-dashboard.png";
import editorImg from "@/assets/fkvim-editor.png";
import explorerImg from "@/assets/fkvim-explorer.png";
import finderImg from "@/assets/fkvim-finder.png";

type TerminalState = "welcome" | "quit" | "dashboard" | "editor" | "explorer" | "finder";

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
      // Handle :q command
      if (e.key === ":" && (state === "editor" || state === "dashboard" || state === "explorer" || state === "finder")) {
        e.preventDefault();
        const handleQ = (ev: KeyboardEvent) => {
          ev.preventDefault();
          if (ev.key === "q") {
            if (state === "explorer") {
              setState("editor");
            } else if (state === "finder") {
              setState("editor");
            } else {
              setState("quit");
            }
          }
          window.removeEventListener("keydown", handleQ);
        };
        window.addEventListener("keydown", handleQ);
        setTimeout(() => window.removeEventListener("keydown", handleQ), 1000);
        return;
      }

      if (state === "dashboard" && e.key === "i") {
        setState("editor");
      } else if (state === "editor" || state === "explorer" || state === "finder") {
        if (e.key === " ") {
          e.preventDefault(); // Prevent page scroll
          // Wait for next key
          const handleSpace = (ev: KeyboardEvent) => {
            ev.preventDefault();
            if (ev.key === "e") {
              setState(state === "explorer" ? "editor" : "explorer");
            } else if (ev.key === "/") {
              setState(state === "finder" ? "editor" : "finder");
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
      case "quit":
        return (
          <div className="space-y-4">
            <div className="text-terminal-text font-mono text-sm">
              <div className="text-success">→</div>
              <div className="mt-2 text-success">FKvim quit successfully</div>
              <div className="mt-4">Welcome to FKvim Interactive Demo</div>
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
          <div className="relative group h-full w-full">
            <img src={dashboardImg} alt="FKvim Dashboard" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 border-t border-terminal-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-sm font-mono text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-secondary rounded text-primary">i</kbd> to enter editor • 
                Type <kbd className="px-2 py-1 bg-secondary rounded text-primary">:q</kbd> to quit
              </div>
            </div>
          </div>
        );
      case "editor":
        return (
          <div className="relative group h-full w-full">
            <img src={editorImg} alt="FKvim Editor" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 border-t border-terminal-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-sm font-mono text-muted-foreground space-y-1">
                <div>
                  <kbd className="px-2 py-1 bg-secondary rounded text-primary">Space</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-secondary rounded text-primary">e</kbd> for file explorer • 
                  <kbd className="px-2 py-1 bg-secondary rounded text-primary ml-2">Space</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-secondary rounded text-primary">/</kbd> for fuzzy finder • 
                  <kbd className="px-2 py-1 bg-secondary rounded text-primary ml-2">:q</kbd> to quit
                </div>
              </div>
            </div>
          </div>
        );
      case "explorer":
        return (
          <div className="relative group h-full w-full">
            <img src={explorerImg} alt="FKvim Explorer" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 border-t border-terminal-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-sm font-mono text-muted-foreground">
                <kbd className="px-2 py-1 bg-secondary rounded text-primary">Space</kbd> +{" "}
                <kbd className="px-2 py-1 bg-secondary rounded text-primary">e</kbd> or{" "}
                <kbd className="px-2 py-1 bg-secondary rounded text-primary">:q</kbd> to return to editor
              </div>
            </div>
          </div>
        );
      case "finder":
        return (
          <div className="relative group h-full w-full">
            <img src={finderImg} alt="FKvim Finder" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 border-t border-terminal-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-sm font-mono text-muted-foreground">
                <kbd className="px-2 py-1 bg-secondary rounded text-primary">Space</kbd> +{" "}
                <kbd className="px-2 py-1 bg-secondary rounded text-primary">/</kbd> or{" "}
                <kbd className="px-2 py-1 bg-secondary rounded text-primary">:q</kbd> to return to editor
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
        <div className="flex-1 flex justify-between items-center px-4">
          <span className="text-sm font-mono text-muted-foreground">Terminal</span>
          <span className="text-sm font-mono font-semibold bg-gradient-fkvim bg-clip-text text-transparent">FKvim</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className={cn(
        "flex flex-col",
        state === "welcome" || state === "quit" ? "p-6 min-h-[600px]" : "min-h-[600px]"
      )}>{renderContent()}</div>
    </div>
  );
};
