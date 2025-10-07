import { useState, useEffect } from "react";
import { Github, Terminal as TerminalIcon, Search } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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

  const navItems = [
    { label: "Home", href: "https://fkvim.netlify.app/" },
    { label: "Features", href: "https://fkvim.netlify.app/#features" },
    { label: "Installation", href: "https://fkvim.netlify.app/#installation" },
    { label: "Docs", href: "https://fkvim.netlify.app/#docs" },
    { label: "Try FKvim Interactive", href: "/", isActive: true, isNew: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-terminal-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a 
            href="https://fkvim.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-fkvim flex items-center justify-center shadow-glow">
              <TerminalIcon className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-fkvim bg-clip-text text-transparent">FKvim</h1>
          </a>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`text-sm font-medium transition-colors relative flex items-center gap-2 ${
                  item.isActive 
                    ? "text-foreground after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {item.isNew && (
                  <Badge variant="default" className="bg-gradient-fkvim text-white text-xs px-1.5 py-0.5 h-5 animate-pulse">
                    NEW
                  </Badge>
                )}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-secondary border border-terminal-border hover:bg-secondary/80 transition-colors group min-w-[200px]"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-xs text-muted-foreground flex-1 text-left">Search...</span>
              <kbd className="px-1.5 py-0.5 text-xs bg-background rounded text-muted-foreground font-mono border border-terminal-border">
                {navigator.platform.includes("Mac") ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            <a
              href="https://github.com/TheFlashCodes/FKvim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <Button
              asChild
              className="bg-gradient-fkvim hover:opacity-90 transition-opacity border-0"
            >
              <a
                href="https://fkvim.netlify.app/#installation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
};
