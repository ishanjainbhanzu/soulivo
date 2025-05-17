import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Heart, Fingerprint, Lock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Start animation when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.2 + custom * 0.1 
      },
    }),
  };

  return (
    <section 
      id="about" 
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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-sm font-semibold py-1 px-3 rounded-full inline-block">
              Who We Are
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Our <span className="gradient-text text-shadow">Mission</span> at Soulivo
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mx-auto"
          >
            Since 2011, we've been making quality mental health care accessible, personalized, and effective.
          </motion.p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Gallery with Parallax Effect */}
          <motion.div
            className="order-2 lg:order-1 lg:col-span-5 space-y-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div style={{ y: y1 }} className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80" 
                  alt="Therapist in professional setting with client" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-semibold">Experienced Therapists</h3>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div style={{ y: y2 }} className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80" 
                  alt="Group meditation session in a peaceful studio" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Group Sessions</p>
                </div>
              </motion.div>
              
              <motion.div style={{ y: y3 }} className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1518021964703-4b2030f03085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80" 
                  alt="Peaceful natural retreat with mountains and lake" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Nature Retreats</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="max-w-2xl">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Soulivo was born from a vision to make quality mental health care accessible, personalized, and effective. We believe that emotional wellbeing is fundamental to living a fulfilling life, and everyone deserves support on their journey.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our team of experienced therapists and mindfulness practitioners is dedicated to providing evidence-based approaches that address the unique needs of each individual, fostering lasting positive change.
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
              >
                {[
                  {
                    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
                    title: "Licensed Experts",
                    description: "All our therapists are fully licensed and accredited professionals with advanced degrees in their fields.",
                    delay: 0
                  },
                  {
                    icon: <Heart className="h-6 w-6 text-primary" />,
                    title: "Compassionate Care",
                    description: "We approach every client with empathy, deep understanding, and genuine care for your wellbeing.",
                    delay: 1
                  },
                  {
                    icon: <Fingerprint className="h-6 w-6 text-primary" />,
                    title: "Personalized Approach",
                    description: "Customized treatment plans tailored to your specific needs, goals, and life circumstances.",
                    delay: 2
                  },
                  {
                    icon: <Lock className="h-6 w-6 text-primary" />,
                    title: "Confidential Service",
                    description: "Your privacy is paramount in all our interactions, with strict adherence to confidentiality standards.",
                    delay: 3
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={feature.delay}
                    variants={cardVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group border border-gray-100 dark:border-gray-700"
                  >
                    <div className="mb-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white ml-4">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div variants={itemVariants} className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="gradient-bg text-white hover:opacity-90 hover:shadow-lg shadow-md transition-all duration-300 rounded-xl px-6 py-3 h-auto"
                >
                  <a href="#contact" className="flex items-center space-x-2">
                    <span>Start Your Wellness Journey</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements for decoration */}
        <motion.div 
          className="absolute top-20 left-[15%] hidden lg:block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Sparkles className="text-primary/30 dark:text-primary/20 h-10 w-10" />
        </motion.div>
      </div>
    </section>
  );
}
