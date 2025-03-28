
import * as React from "react";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  // This is now just a placeholder component that doesn't actually toggle themes
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Light mode"
      className="hidden" // Hide this button since dark mode is not functional
    >
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Light mode</span>
    </Button>
  );
}
