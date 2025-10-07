import { Code, FolderTree, Search, GitBranch, Palette, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const keybindingCategories = [
  {
    icon: Code,
    title: "Editor Essentials",
    bindings: [
      { key: "i", desc: "Insert mode" },
      { key: "Esc", desc: "Normal mode" },
      { key: "v", desc: "Visual mode" },
      { key: "V", desc: "Visual line" },
    ],
  },
  {
    icon: FolderTree,
    title: "File Explorer",
    bindings: [
      { key: "Space + e", desc: "Toggle explorer" },
      { key: "a", desc: "New file" },
      { key: "d", desc: "Delete" },
      { key: "r", desc: "Rename" },
    ],
  },
  {
    icon: Search,
    title: "Search & Navigation",
    bindings: [
      { key: "Space + f", desc: "Find files" },
      { key: "Space + /", desc: "Live grep" },
      { key: "Space + b", desc: "Buffers" },
      { key: "gd", desc: "Go to definition" },
    ],
  },
  {
    icon: GitBranch,
    title: "Git Integration",
    bindings: [
      { key: "Space + gg", desc: "LazyGit" },
      { key: "Space + gb", desc: "Git blame" },
      { key: "Space + gd", desc: "Git diff" },
    ],
  },
  {
    icon: Palette,
    title: "Themes & UI",
    bindings: [
      { key: "Space + t", desc: "Theme picker" },
      { key: "Ctrl + h/l", desc: "Window navigation" },
    ],
  },
  {
    icon: Settings,
    title: "Config & Actions",
    bindings: [
      { key: "Space + ca", desc: "Code actions" },
      { key: "Space + rn", desc: "Rename" },
      { key: "Space + u", desc: "Update plugins" },
      { key: "K", desc: "Hover docs" },
    ],
  },
];

export const KeybindingsSection = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold bg-gradient-fkvim bg-clip-text text-transparent mb-3">
            Keybindings Reference
          </h2>
          <p className="text-muted-foreground">Master FKvim with these essential keyboard shortcuts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keybindingCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "p-6 rounded-lg bg-card border border-terminal-border",
                  "hover:border-primary/50 transition-all duration-300",
                  "hover:shadow-glow"
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.bindings.map((binding, bidx) => (
                    <div key={bidx} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{binding.desc}</span>
                      <kbd className="px-2 py-1 text-xs bg-secondary rounded text-primary font-mono border border-terminal-border">
                        {binding.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-lg bg-secondary/50 border border-terminal-border text-center">
          <p className="text-muted-foreground">
            Press{" "}
            <kbd className="px-2 py-1 text-xs bg-background rounded text-primary font-mono border border-terminal-border mx-1">
              {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
            </kbd>
            +
            <kbd className="px-2 py-1 text-xs bg-background rounded text-primary font-mono border border-terminal-border mx-1">
              K
            </kbd>{" "}
            to search all keybindings
          </p>
        </div>
      </div>
    </div>
  );
};
