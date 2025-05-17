import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize theme from localStorage before rendering
const initializeTheme = () => {
  try {
    const storedTheme = localStorage.getItem('soulivo-theme');
    
    // Apply saved theme or default to dark mode
    if (storedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch (error) {
    // Default to dark theme if localStorage isn't available
    document.documentElement.classList.add('dark');
  }
};

// Run theme initialization before rendering
initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
