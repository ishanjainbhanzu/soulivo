import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Linkedin, Twitter, Mail, ArrowUpRight, CheckCircle, Award, BookOpen } from "lucide-react";
import { Expert } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Enhanced expert data with more details
const experts: Expert[] = [
  {
    id: 1,
    name: "Dr. Emma Richardson",
    title: "Clinical Psychologist",
    bio: "Specializing in anxiety disorders and trauma recovery with over 15 years of experience. Dr. Richardson holds a Ph.D. in Clinical Psychology and has published numerous research papers on cognitive behavioral therapy techniques.",
    imagePath: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Mindfulness Coach",
    bio: "Certified mindfulness practitioner with expertise in stress reduction and emotional regulation techniques. Michael has trained with leading meditation teachers across Asia and brings a blend of traditional practices and modern approaches.",
    imagePath: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    id: 3,
    name: "Dr. Sophia Martinez",
    title: "Licensed Therapist",
    bio: "Experienced in relationship counseling and interpersonal therapy with a holistic approach to mental wellness. Dr. Martinez specializes in helping clients navigate life transitions and build resilience through evidence-based therapeutic methods.",
    imagePath: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Neuropsychologist",
    bio: "Specializing in the connection between brain function and behavior, Dr. Wilson helps clients understand the neurological basis of their emotional responses and develop personalized strategies for mental health optimization.",
    imagePath: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    socialLinks: {
      linkedin: "#",
      email: "#"
    }
  }
];

export function TeamSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  // Animation variants
  const containerVariants = {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="team" 
      ref={(node) => {
        // Safely combine refs
        if (node) {
          // @ts-ignore - this is a safe operation for our use case
          sectionRef.current = node;
          ref(node);
        }
      }}
      className="py-24 md:py-32 relative bg-gray-50 dark:bg-gray-800 overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10"
          style={{ y: bgY }}
        />
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.div className="text-center mb-4" variants={textItemVariants}>
            <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-sm font-semibold py-1 px-3 rounded-full inline-block">
              Expert Team
            </span>
          </motion.div>
          
          <motion.h2 
            variants={textItemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Meet Our <span className="gradient-text text-shadow">Specialists</span>
          </motion.h2>
          
          <motion.p 
            variants={textItemVariants}
            className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Our team of certified mental health professionals brings decades of expertise to support your journey toward emotional wellbeing and personal growth.
          </motion.p>
          
          <motion.div variants={textItemVariants} className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Licensed Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-primary h-5 w-5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Award-Winning Care</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary h-5 w-5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Evidence-Based Methods</span>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-6">
          {experts.map((expert, index) => (
            <motion.div 
              key={expert.id}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                <img 
                  src={expert.imagePath} 
                  alt={`${expert.name}, ${expert.title}`} 
                  className="w-full h-80 md:h-72 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Expert info overlay */}
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h3 className="text-xl font-display font-bold mb-1 text-white">
                    {expert.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {expert.title}
                  </p>
                </div>
                
                {/* Hover action button */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#contact" className="flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-4 mb-4 min-h-[5rem]">
                  {expert.bio}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {expert.socialLinks.linkedin && (
                      <a href={expert.socialLinks.linkedin} className="text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {expert.socialLinks.twitter && (
                      <a href={expert.socialLinks.twitter} className="text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {expert.socialLinks.email && (
                      <a href={expert.socialLinks.email} className="text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  
                  <Button variant="outline" size="sm" asChild className="text-xs px-3 py-1 h-auto border-gray-200 dark:border-gray-700">
                    <a href="#contact">Book</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="inline-flex items-center text-primary dark:text-primary hover:underline font-medium">
            <span>Schedule a consultation with our experts</span>
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
