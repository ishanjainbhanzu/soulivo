import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  
  // On component mount, check the current theme
  useEffect(() => {
    // Check if dark mode is already set
    const isDarkMode = document.documentElement.classList.contains('dark');
    setDarkMode(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Apply theme change to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('soulivo-theme', 'dark');
      } catch (e) {
        console.error('Could not save theme preference', e);
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('soulivo-theme', 'light');
      } catch (e) {
        console.error('Could not save theme preference', e);
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="sr-only">
        {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      {darkMode ? (
        <Moon className="h-5 w-5 text-blue-500" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500" />
      )}
    </Button>
  );
}
