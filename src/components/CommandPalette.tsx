import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Keybinding {
  key: string;
  description: string;
  category: string;
}

const keybindings: Keybinding[] = [
  // General
  { key: "Space", description: "Leader key", category: "General" },
  { key: "Space + f", description: "Find files", category: "General" },
  { key: "Space + /", description: "Find in files (live grep)", category: "General" },
  { key: "Space + b", description: "Switch buffers", category: "General" },
  
  // File Explorer
  { key: "Space + e", description: "Toggle file explorer", category: "File Explorer" },
  { key: "a", description: "Add new file", category: "File Explorer" },
  { key: "d", description: "Delete file", category: "File Explorer" },
  { key: "r", description: "Rename file", category: "File Explorer" },
  
  // Editor
  { key: "i", description: "Enter insert mode", category: "Editor" },
  { key: "Esc", description: "Exit to normal mode", category: "Editor" },
  { key: "v", description: "Enter visual mode", category: "Editor" },
  { key: "V", description: "Enter visual line mode", category: "Editor" },
  
  // LSP
  { key: "gd", description: "Go to definition", category: "LSP" },
  { key: "gr", description: "Go to references", category: "LSP" },
  { key: "K", description: "Hover documentation", category: "LSP" },
  { key: "Space + ca", description: "Code actions", category: "LSP" },
  { key: "Space + rn", description: "Rename symbol", category: "LSP" },
  
  // Window Management
  { key: "Ctrl + h", description: "Move to left window", category: "Window" },
  { key: "Ctrl + l", description: "Move to right window", category: "Window" },
  { key: "Ctrl + j", description: "Move to bottom window", category: "Window" },
  { key: "Ctrl + k", description: "Move to top window", category: "Window" },
  
  // Git
  { key: "Space + gg", description: "Open LazyGit", category: "Git" },
  { key: "Space + gb", description: "Git blame", category: "Git" },
  { key: "Space + gd", description: "Git diff", category: "Git" },
  
  // Themes
  { key: "Space + t", description: "Toggle theme picker", category: "Themes" },
  { key: "Space + u", description: "Update plugins", category: "Config" },
  { key: "Space + c", description: "Config files", category: "Config" },
  { key: "Space + q", description: "Quit", category: "Config" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const [search, setSearch] = useState("");
  const [filteredBindings, setFilteredBindings] = useState(keybindings);

  useEffect(() => {
    if (search) {
      const filtered = keybindings.filter(
        (kb) =>
          kb.key.toLowerCase().includes(search.toLowerCase()) ||
          kb.description.toLowerCase().includes(search.toLowerCase()) ||
          kb.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBindings(filtered);
    } else {
      setFilteredBindings(keybindings);
    }
  }, [search]);

  const groupedBindings = filteredBindings.reduce((acc, kb) => {
    if (!acc[kb.category]) {
      acc[kb.category] = [];
    }
    acc[kb.category].push(kb);
    return acc;
  }, {} as Record<string, Keybinding[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0 bg-card border-terminal-border">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-terminal-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search keybindings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs bg-secondary rounded text-muted-foreground font-mono">Esc</kbd>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {Object.entries(groupedBindings).map(([category, bindings]) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-sm font-semibold text-primary mb-2 font-mono">{category}</h3>
              <div className="space-y-1">
                {bindings.map((kb, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md",
                      "hover:bg-secondary/50 transition-colors cursor-pointer"
                    )}
                  >
                    <span className="text-sm text-foreground">{kb.description}</span>
                    <kbd className="px-2 py-1 text-xs bg-secondary rounded text-primary font-mono border border-terminal-border">
                      {kb.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {filteredBindings.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No keybindings found matching "{search}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
