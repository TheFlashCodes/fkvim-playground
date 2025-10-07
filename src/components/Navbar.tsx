import { useState, useEffect } from "react";
import { Search, Github, Terminal as TerminalIcon } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

export const Navbar = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-terminal-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="https://fkvim.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-fkvim flex items-center justify-center shadow-glow">
              <TerminalIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-fkvim bg-clip-text text-transparent">FKvim</h1>
              <p className="text-xs text-muted-foreground">Interactive Demo</p>
            </div>
          </a>

          {/* Search */}
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary border border-terminal-border hover:bg-secondary/80 transition-colors group"
          >
            <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-sm text-muted-foreground">Search keybindings...</span>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs bg-background rounded text-muted-foreground font-mono border border-terminal-border">
                {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
              </kbd>
              <kbd className="px-2 py-1 text-xs bg-background rounded text-muted-foreground font-mono border border-terminal-border">
                K
              </kbd>
            </div>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/TheFlashCodes/FKvim"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </nav>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
};
