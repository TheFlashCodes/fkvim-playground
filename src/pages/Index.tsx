import { Navbar } from "@/components/Navbar";
import { Terminal } from "@/components/Terminal";
import { KeybindingsSection } from "@/components/KeybindingsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-glow pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-fkvim bg-clip-text text-transparent">
              Experience FKvim
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try out the FKvim Neovim configuration interactively in your browser
            </p>
          </div>

          {/* Terminal */}
          <Terminal />

          {/* Keybindings */}
          <KeybindingsSection />
        </div>
      </main>

        {/* Footer */}
        <footer className="border-t border-terminal-border py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              Developed by{" "}
              <a
                href="https://github.com/TheFlashCodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Mayank Kumar Jha
              </a>
            </p>
            <p className="mt-2">
              Visit{" "}
              <a
                href="https://fkvim.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                fkvim.netlify.app
              </a>{" "}
              for documentation
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
