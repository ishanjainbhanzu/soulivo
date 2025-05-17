import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, ChevronLeft, ChevronRight, Star, Heart, Users } from "lucide-react";
import { Testimonial } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Enhanced testimonial data
const testimonials: Testimonial[] = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    title: "Marketing Executive", 
    content: "Soulivo transformed my approach to work-life balance entirely. The mindfulness sessions helped me manage chronic stress and significantly improved my focus. After just three months, colleagues started noticing positive changes in my demeanor and productivity.",
    imagePath: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  { 
    id: 2, 
    name: "Michael Torres", 
    title: "Software Developer", 
    content: "The therapy sessions at Soulivo helped me overcome severe burnout and develop healthy boundaries in my professional life. Their holistic approach addressed both my immediate stress symptoms and the underlying causes. Couldn't recommend their services enough.",
    imagePath: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  { 
    id: 3, 
    name: "Elena Rodriguez", 
    title: "Healthcare Professional", 
    content: "After months of struggling with anxiety that affected my work performance, the personalized therapy at Soulivo gave me practical coping strategies that actually work in high-pressure moments. Their evidence-based approach made a meaningful difference in my daily life.",
    imagePath: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 4,
    name: "David Chen",
    title: "Finance Manager",
    content: "The group meditation sessions provided a supportive community and structure that helped me maintain consistency in my practice. The skills I've learned have improved my decision-making under pressure and relationships with my team members.",
    imagePath: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 5,
    name: "Olivia Smith",
    title: "Teacher",
    content: "As an educator dealing with burnout, Soulivo's wellness programs helped me reconnect with my passion for teaching. Their nature retreats were particularly transformative, allowing me to reset completely. I returned to my classroom with renewed energy and perspective.",
    imagePath: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  }
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax background effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto advance testimonials with pause on hover
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (!inView || isHovering) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000);
    
    return () => clearInterval(interval);
  }, [inView, isHovering]);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      id="testimonials" 
      ref={(node) => {
        // Safely combine refs
        if (node) {
          // @ts-ignore - this is a safe operation for our use case
          sectionRef.current = node;
          ref(node);
        }
      }}
      className="py-24 md:py-32 relative bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Background element with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10"
          style={{ y: backgroundY }}
        />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-sm font-semibold py-1 px-3 rounded-full inline-block">
              Success Stories
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Client <span className="gradient-text text-shadow">Testimonials</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-2xl text-balance"
          >
            Hear from individuals who have experienced positive transformation through our services and approaches.
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div
            className="relative p-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex justify-center">
              {/* Testimonial Cards */}
              <div className="relative w-full max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-20 rounded-3xl" />
                
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={current}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={cardVariants}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="md:grid md:grid-cols-5">
                      {/* Left Column - Image and info */}
                      <div className="md:col-span-2 relative">
                        <div className="h-48 md:h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/80 to-accent/80" />
                          {testimonials[current].imagePath && (
                            <img 
                              src={testimonials[current].imagePath} 
                              alt={testimonials[current].name}
                              className="w-full h-full object-cover mix-blend-overlay opacity-80"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <h3 className="text-xl font-display font-bold">{testimonials[current].name}</h3>
                          <p className="text-white/80 text-sm">{testimonials[current].title}</p>
                        </div>
                        
                        <div className="absolute top-4 left-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Column - Content */}
                      <div className="md:col-span-3 p-8 md:p-10">
                        <div className="flex items-center mb-6">
                          <Quote className="h-10 w-10 text-primary/30 dark:text-primary/20 mr-2" />
                          <div className="h-px flex-grow bg-gray-200 dark:bg-gray-700" />
                        </div>
                        
                        <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                          "{testimonials[current].content}"
                        </blockquote>
                        
                        <div className="mt-8 flex items-center">
                          <div className="flex text-primary space-x-1">
                            {current === 0 && <Heart className="h-5 w-5" />}
                            {current === 1 && <Users className="h-5 w-5" />}
                            {current === 2 && <Star className="h-5 w-5" />}
                          </div>
                          <div className="h-px flex-grow bg-gray-200 dark:bg-gray-700 mx-4" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Verified Client
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Floating Navigation Controls */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between pointer-events-none px-2 md:px-6 lg:px-12">
              <motion.button 
                onClick={prevTestimonial}
                className="group flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-full shadow-lg pointer-events-auto hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
              
              <motion.button 
                onClick={nextTestimonial}
                className="group flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-full shadow-lg pointer-events-auto hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    current === index 
                      ? "bg-primary w-8" 
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/70 dark:hover:bg-primary/70"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <a href="#contact" className="gradient-bg text-white py-3 px-8 rounded-full inline-flex items-center font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey Today
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
