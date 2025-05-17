import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Our Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {item.name}
          </a>
        ))}
      </nav>
      
      {/* Mobile Menu Button */}
      <div className="flex md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300"
          aria-label="Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="block w-full text-center text-white gradient-bg px-4 py-2 rounded-lg text-base font-medium shadow-sm hover:shadow transition-all duration-300 mt-4"
                onClick={closeMenu}
              >
                Book a Session
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
