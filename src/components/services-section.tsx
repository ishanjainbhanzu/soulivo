import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Service } from "@/lib/utils";
import { 
  Brain, Heart, Sprout, Users, Flame, Mountain,
  ArrowRight, ArrowUpRight, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const services: Service[] = [
  { 
    id: 1, 
    name: "Individual Therapy", 
    category: "therapy", 
    description: "One-on-one therapy sessions tailored to your specific needs and goals, helping you address personal challenges with professional guidance.", 
    icon: "Brain" 
  },
  { 
    id: 2, 
    name: "Group Meditation", 
    category: "mindfulness", 
    description: "Guided meditation sessions in a supportive group environment where you can develop your practice alongside others on similar journeys.", 
    icon: "Users" 
  },
  { 
    id: 3, 
    name: "Couples Counseling", 
    category: "therapy", 
    description: "Relationship-focused therapy to improve communication, resolve conflicts, and rebuild connection with your partner.", 
    icon: "Heart" 
  },
  { 
    id: 4, 
    name: "Mindfulness Training", 
    category: "mindfulness", 
    description: "Learn practical mindfulness techniques through structured programs designed to reduce stress, improve focus, and increase self-awareness.", 
    icon: "Sprout" 
  },
  { 
    id: 5, 
    name: "Stress Management", 
    category: "wellness", 
    description: "Develop effective strategies to manage stress in your daily life, from breathing techniques to cognitive reframing approaches.", 
    icon: "Flame" 
  },
  { 
    id: 6, 
    name: "Nature Retreats", 
    category: "wellness", 
    description: "Immersive experiences in natural settings to foster deep relaxation and renewal, combining guided activities with quiet reflection time.", 
    icon: "Mountain" 
  },
];

type CategoryType = "all" | "therapy" | "mindfulness" | "wellness";
type CategoryFilter = { 
  value: CategoryType; 
  label: string;
};

const categories: CategoryFilter[] = [
  { value: "all", label: "All Services" },
  { value: "therapy", label: "Therapy" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "wellness", label: "Wellness" },
];

export function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryType>("all");
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect for the section background shapes
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY1 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  const filteredServices = activeFilter === "all" 
    ? services 
    : services.filter(service => service.category === activeFilter);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain": return <Brain className="h-6 w-6" />;
      case "Heart": return <Heart className="h-6 w-6" />;
      case "Sprout": return <Sprout className="h-6 w-6" />;
      case "Users": return <Users className="h-6 w-6" />;
      case "Flame": return <Flame className="h-6 w-6" />;
      case "Mountain": return <Mountain className="h-6 w-6" />;
      default: return <Brain className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "therapy": return "from-secondary/20 to-secondary/5 dark:from-secondary/30 dark:to-secondary/10 text-secondary";
      case "mindfulness": return "from-accent/20 to-accent/5 dark:from-accent/30 dark:to-accent/10 text-accent";
      case "wellness": return "from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 text-primary";
      default: return "from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 text-primary";
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: { 
      y: -12,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="services" 
      ref={(node) => {
        // Only set the ref if the node exists
        if (node) {
          // Use a workaround to avoid the read-only property error
          // @ts-ignore - this is a safe operation for our use case
          sectionRef.current = node;
          ref(node);
        }
      }} 
      className="py-24 md:py-32 relative bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute right-0 top-20 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl opacity-60 dark:opacity-30"
        style={{ y: bgY1 }}
      />
      <motion.div 
        className="absolute -left-48 bottom-20 w-96 h-96 rounded-full bg-gradient-to-r from-secondary/10 to-accent/10 blur-3xl opacity-60 dark:opacity-30"
        style={{ y: bgY2 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="text-center mb-6" variants={itemVariants}>
            <div className="inline-block">
              <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-sm font-semibold py-1 px-3 rounded-full">
                Our Offerings
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gray-900 dark:text-white tracking-tight text-balance"
          >
            Comprehensive <span className="gradient-text text-shadow">Services</span> <br className="hidden md:block" />
            for Your Wellbeing
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto text-balance"
          >
            Discover our range of professional mental wellness services designed to support your journey toward emotional wellbeing and personal growth.
          </motion.p>
          
          {/* Service Category Filters */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button 
                key={category.value}
                onClick={() => setActiveFilter(category.value)} 
                className={cn(
                  "px-6 py-3 rounded-full text-base font-medium transition-all duration-300",
                  activeFilter === category.value 
                    ? "bg-primary text-white shadow-md dark:shadow-primary/30" 
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5, 
                    delay: 0.3 + (index * 0.1)
                  }
                }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, index) => (
              <motion.div 
                key={service.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                whileHover="hover"
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/30 overflow-hidden"
              >
                <div className="p-8">
                  <div className={cn(
                    "w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br",
                    getCategoryColor(service.category)
                  )}>
                    <span className={cn(
                      "text-current",
                      service.category === "therapy" ? "text-secondary" : "",
                      service.category === "mindfulness" ? "text-accent" : "",
                      service.category === "wellness" ? "text-primary" : ""
                    )}>
                      {getIcon(service.icon)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span 
                      className={cn(
                        "text-sm font-semibold px-4 py-1.5 rounded-full",
                        service.category === "therapy" ? "bg-secondary/10 text-secondary" : "",
                        service.category === "mindfulness" ? "bg-accent/10 text-accent" : "",
                        service.category === "wellness" ? "bg-primary/10 text-primary" : ""
                      )}
                    >
                      {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                    </span>
                    
                    <a 
                      href="#contact" 
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#contact"
            className="flex items-center gap-2 text-primary dark:text-primary hover:underline font-medium text-lg"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>Book a session today</span>
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
