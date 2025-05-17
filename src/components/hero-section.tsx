import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Heart, Sparkles, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Parallax, Background } from "react-parallax";

export function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const floatingCard = {
    initial: { y: 0 },
    animate: { 
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  // We don't need this effect anymore as we use gradient-border class instead
  const glowEffect = {
    initial: { opacity: 1 },
    animate: { 
      opacity: [1, 0.8, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <Parallax
      strength={300}
      className="relative overflow-hidden"
      renderLayer={(percentage) => (
        <div
          className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-30 dark:from-primary/20 dark:opacity-20"
          style={{
            transform: `translateY(${percentage * 40}px)`,
          }}
        />
      )}
    >
      <section className="min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 relative bg-gradient-to-b from-background via-background to-white dark:from-background dark:via-background dark:to-gray-900">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-[10%] w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 left-[25%] w-40 h-40 bg-accent/5 dark:bg-accent/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={slideUp} className="mb-4">
                <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-sm font-semibold py-1 px-3 rounded-full inline-block mb-6">
                  Mental Wellness Services
                </span>
              </motion.div>
              
              <motion.h1 
                variants={slideUp}
                className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.1] text-gray-900 dark:text-white mb-8 text-balance tracking-tight"
              >
                Find Inner <br/>
                <span className="gradient-text text-shadow">Balance & Mental</span> <br/>
                Clarity
              </motion.h1>
              
              <motion.p 
                variants={slideUp}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl text-balance"
              >
                Discover professional mental wellness services that help you overcome challenges and nurture lasting peace of mind.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Button
                  size="lg"
                  asChild
                  className="gradient-bg text-white hover:opacity-90 text-base px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a href="#services">Explore Our Services</a>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary text-base px-8 h-14 rounded-xl shadow-md backdrop-blur-sm transition-all duration-300"
                >
                  <a href="#contact">Book a Consultation</a>
                </Button>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-wrap gap-4 mt-10"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Licensed Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Personalized Plans</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Online Sessions</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.div
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <picture>
                  <source 
                    srcSet="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=1000&q=80" 
                    media="(min-width: 640px)" 
                  />
                  <source 
                    srcSet="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80" 
                    media="(max-width: 639px)" 
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=1000&q=80" 
                    alt="Woman in peaceful meditation pose with soft natural lighting" 
                    className="w-full h-full object-cover rounded-3xl"
                    loading="eager"
                  />
                </picture>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </motion.div>
              
              {/* Floating Stats Card 1 */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-xl max-w-[200px] backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 gradient-border"
                variants={floatingCard}
                initial="initial"
                animate="animate"
                custom={0}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Mental Wellness</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Professional Support</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Stats Card 2 */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-xl max-w-[200px] backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 gradient-border"
                variants={floatingCard}
                initial="initial"
                animate="animate"
                custom={1}
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center">
                    <Award className="text-secondary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Proven Results</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lasting Transformation</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Stats Card 3 */}
              <motion.div 
                className="absolute top-1/3 -right-4 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 gradient-border"
                variants={floatingCard}
                initial="initial"
                animate="animate"
                custom={2}
                style={{ animationDelay: "0.75s" }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center">
                    <Sparkles className="text-accent h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">98% Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="scroll-indicator text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ArrowDown className="h-6 w-6 text-primary" />
          </motion.div>
        </div>
      </section>
    </Parallax>
  );
}
