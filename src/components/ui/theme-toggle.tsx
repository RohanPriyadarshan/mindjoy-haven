
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme } = useTheme();
  
  // Since our ThemeProvider is currently just a stub, 
  // we'll implement a basic toggle that doesn't actually change themes yet
  const [isLight, setIsLight] = React.useState(theme === 'light');
  
  const toggleTheme = () => {
    setIsLight(!isLight);
    // In a full implementation, this would call a setTheme function from the ThemeProvider
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isLight ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
