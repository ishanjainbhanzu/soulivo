import { useState, useEffect } from "react";
import { Link } from "wouter";
import { NavMenu } from "@/components/nav-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  // Get scroll progress for header effects
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(
    scrollYProgress, 
    [0, 0.05], 
    [1, 0.98]
  );

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-white/85 dark:bg-gray-900/90 shadow-sm border-b border-gray-200/40 dark:border-gray-800/40"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="relative flex items-center cursor-pointer group">
                <div className="absolute -inset-x-2 -inset-y-1 bg-primary/10 dark:bg-primary/20 scale-75 rounded-full blur-md group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <Sparkles className="absolute -left-6 text-primary dark:text-primary/90 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary font-display text-2xl sm:text-3xl font-bold relative">
                  Soulivo
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <NavMenu />

          {/* Dark Mode Toggle & Book Session Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="hidden md:block">
              <Button 
                asChild
                className="gradient-bg text-white hover:opacity-90 hover:shadow-lg shadow-md transition-all duration-300 rounded-xl px-5 py-2.5"
              >
                <a href="#contact">Book a Session</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
