import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import { FaqItem } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Enhanced FAQ items with more comprehensive answers
const faqItems: FaqItem[] = [
  { 
    id: 1, 
    question: "How do I know which service is right for me?", 
    answer: "We offer a complimentary 15-minute consultation to help determine which services would best meet your needs based on your goals and current challenges. Our expert team will discuss your situation and recommend the most appropriate approach, whether that's individual therapy, group sessions, or a combination of services tailored to your specific requirements." 
  },
  { 
    id: 2, 
    question: "What can I expect in my first therapy session?", 
    answer: "Your first session is primarily focused on getting to know you and understanding your concerns. Your therapist will ask questions about your background, current situation, and what you hope to achieve through therapy. This initial assessment helps us create a personalized treatment plan. Feel free to ask questions and share what you're comfortable with—this is the beginning of building a therapeutic relationship based on trust." 
  },
  { 
    id: 3, 
    question: "How long does each session last?", 
    answer: "Individual therapy sessions typically last 50 minutes, while group sessions can range from 60 to 90 minutes depending on the specific program. Mindfulness workshops are usually 75 minutes, and our intensive retreats can span several hours with breaks included. We're committed to providing the appropriate time needed for meaningful progress while respecting your schedule." 
  },
  { 
    id: 4, 
    question: "Do you accept insurance?", 
    answer: "Yes, we accept several major insurance providers including Blue Cross Blue Shield, Aetna, Cigna, and United Healthcare. Please contact our office with your insurance details to verify coverage before your first appointment. Our administrative team will help you understand your benefits and any out-of-pocket expenses. For those without insurance coverage, we offer sliding scale options based on financial need." 
  },
  { 
    id: 5, 
    question: "What is your cancellation policy?", 
    answer: "We require 24 hours notice for cancellations to avoid being charged the full session fee. We understand emergencies happen and will address those situations individually. This policy helps us maintain availability for all clients needing services. You can cancel or reschedule appointments through our client portal or by calling our office directly." 
  },
  { 
    id: 6, 
    question: "Do you offer virtual sessions?", 
    answer: "Yes, we offer secure video therapy sessions for clients who prefer remote access or are unable to visit our office in person. Our virtual platform is HIPAA-compliant to ensure your confidentiality and privacy. Many clients find that virtual sessions offer the same benefits as in-person therapy with the added convenience of eliminating travel time." 
  },
  { 
    id: 7, 
    question: "How often will I need to attend sessions?", 
    answer: "The frequency of sessions depends on your individual needs and treatment goals. Most clients begin with weekly sessions, then gradually transition to biweekly or monthly appointments as progress is made. During our initial consultation, we'll discuss recommendations for session frequency based on your specific situation and adjust as needed throughout your therapeutic journey." 
  }
];

export function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };
  
  // Animation variants
  const containerVariants = {
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
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      id="faq"
      ref={(node) => {
        // Safely combine refs
        if (node) {
          // @ts-ignore - this is a safe operation for our use case
          sectionRef.current = node;
          ref(node);
        }
      }}
      className="py-24 md:py-32 relative bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10"
          style={{ y: bgY }}
        />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-40 right-0 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div className="text-center mb-4" variants={itemVariants}>
            <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-sm font-semibold py-1 px-3 rounded-full inline-block">
              Got Questions?
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Frequently Asked <span className="gradient-text text-shadow">Questions</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Find answers to common questions about our services, approach, and what to expect when working with our team of mental wellness experts.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            className="flex justify-center mb-12"
          >
            <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-sm">
              <MessageCircle className="text-primary h-5 w-5" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Can't find what you're looking for? <a href="#contact" className="text-primary font-medium hover:underline">Contact us</a> for more information.
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5">
            {faqItems.map((item, index) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.1 * index }}
                className={cn(
                  "bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300",
                  openItem === item.id ? "shadow-lg ring-1 ring-primary/20 dark:ring-primary/30" : ""
                )}
              >
                <button 
                  onClick={() => toggleItem(item.id)} 
                  className="flex justify-between items-center w-full px-7 py-5 text-left focus:outline-none"
                  aria-expanded={openItem === item.id}
                  aria-controls={`faq-content-${item.id}`}
                >
                  <div className="flex items-center">
                    <HelpCircle className={cn(
                      "mr-4 h-5 w-5 flex-shrink-0 transition-colors duration-300",
                      openItem === item.id ? "text-primary" : "text-gray-400 dark:text-gray-500" 
                    )} />
                    <span className={cn(
                      "font-medium text-lg transition-colors duration-300",
                      openItem === item.id ? "text-primary dark:text-primary" : "text-gray-900 dark:text-white"
                    )}>
                      {item.question}
                    </span>
                  </div>
                  <div className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 flex-shrink-0 ml-4",
                    openItem === item.id ? "bg-primary text-white rotate-180" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  )}>
                    {openItem === item.id ? (
                      <Minus className="h-3 w-3" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div 
                      id={`faq-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4 mt-1">
                        <p className="text-base">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <a href="#contact" className="inline-flex items-center text-primary dark:text-primary font-medium hover:underline">
              <span>Have more questions? Let's talk</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
