import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Calendar, 
  CheckCircle,
  Lock,
  ArrowRight,
  Quote as QuoteIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(5, { message: "Message must be at least 5 characters" }),
  privacy: z.boolean().refine(val => val === true, {
    message: "You must agree to our privacy policy",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const contactInfo = {
  address: "1234 Wellness Avenue, Suite 100\nSan Francisco, CA 94110",
  email: "info@soulivo.com",
  phone: "(555) 123-4567",
  hours: "Monday-Friday: 9am-6pm\nSaturday: 10am-2pm",
  socialLinks: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
};

export function ContactSection() {
  const { toast } = useToast();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  const [formStep, setFormStep] = useState(0);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      privacy: false,
    },
    mode: "onChange",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        className: "bg-primary/10 dark:bg-primary/20 text-primary border-primary/20",
      });
      form.reset();
      setFormStep(0);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send your message. Please try again.",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    contactMutation.mutate(data);
  }

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

  const nextFormStep = () => {
    form.trigger(["name", "email", "phone"]);
    
    const nameState = form.getFieldState("name");
    const emailState = form.getFieldState("email");
    
    if (!nameState.invalid && !emailState.invalid) {
      setFormStep(1);
    }
  };

  return (
    <section 
      id="contact" 
      ref={(node) => {
        // Safely combine refs
        if (node) {
          // @ts-ignore - this is a safe operation for our use case
          sectionRef.current = node;
          ref(node);
        }
      }}
      className="py-24 md:py-32 relative bg-white dark:bg-gray-800 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10" 
          style={{ y: bgY }}
        />
        <div className="absolute top-20 -left-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl opacity-70" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-sm font-semibold py-1 px-3 rounded-full inline-block">
              Connect With Us
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Begin Your <span className="gradient-text text-shadow">Wellness</span> Journey
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-2xl mb-8"
          >
            Take the first step toward emotional wellbeing by reaching out to our team of experienced professionals. We're here to support your personal growth journey.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            {/* Contact Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Reach out to us directly or fill out the form to schedule your consultation.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Our Location</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mt-1">{contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Email Us</h4>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors mt-1 inline-block"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Call Us</h4>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`} 
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors mt-1 inline-block"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Business Hours</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mt-1">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h4>
                <div className="flex space-x-3">
                  {contactInfo.socialLinks.facebook && (
                    <a 
                      href={contactInfo.socialLinks.facebook} 
                      className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {contactInfo.socialLinks.twitter && (
                    <a 
                      href={contactInfo.socialLinks.twitter} 
                      className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all duration-300"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {contactInfo.socialLinks.instagram && (
                    <a 
                      href={contactInfo.socialLinks.instagram} 
                      className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {contactInfo.socialLinks.linkedin && (
                    <a 
                      href={contactInfo.socialLinks.linkedin} 
                      className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial Quote */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 relative"
            >
              <QuoteIcon className="absolute top-6 left-6 h-12 w-12 text-primary/20 dark:text-primary/30" />
              <div className="relative">
                <p className="text-gray-700 dark:text-gray-200 italic mb-4 text-lg">
                  "Soulivo has been instrumental in my personal growth journey. The compassionate guidance I've received has helped me develop healthier coping strategies."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="ml-3">
                    <p className="text-gray-900 dark:text-white font-medium">Rachel W.</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Client for 2+ years</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Contact Form */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="lg:col-span-3"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative"
            >
              {/* Form Header */}
              <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center mb-2">
                  <Calendar className="text-primary h-5 w-5 mr-2" />
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                    Book Your Consultation
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below to schedule a session or request more information.
                </p>
              </div>
              
              {/* Multi-step form */}
              <div className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Form Step Indicator */}
                    <div className="mb-8 relative">
                      <div className="flex justify-between mb-1">
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          formStep >= 0 ? "text-primary" : "text-gray-500 dark:text-gray-400"
                        )}>
                          Personal Details
                        </span>
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          formStep >= 1 ? "text-primary" : "text-gray-500 dark:text-gray-400"
                        )}>
                          Your Request
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300 rounded-full"
                          style={{ width: formStep === 0 ? "50%" : "100%" }}
                        />
                      </div>
                    </div>
                    
                    {/* Step 1: Personal Details */}
                    <div className={cn(formStep === 0 ? "block" : "hidden")}>
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  {...field} 
                                  className="h-12 px-4"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="your@email.com" 
                                  {...field} 
                                  className="h-12 px-4"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="(555) 123-4567" 
                                  {...field} 
                                  className="h-12 px-4"
                                />
                              </FormControl>
                              <FormDescription className="text-xs">
                                Optional, but recommended for appointment confirmations
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-4">
                          <Button
                            type="button"
                            onClick={nextFormStep}
                            className="w-full gradient-bg text-white h-12 font-medium rounded-xl hover:opacity-90 transition-all duration-300"
                          >
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Step 2: Service Details */}
                    <div className={cn(formStep === 1 ? "block" : "hidden")}>
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service You're Interested In</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="individual-therapy">Individual Therapy</SelectItem>
                                  <SelectItem value="group-meditation">Group Meditation</SelectItem>
                                  <SelectItem value="couples-counseling">Couples Counseling</SelectItem>
                                  <SelectItem value="mindfulness-training">Mindfulness Training</SelectItem>
                                  <SelectItem value="stress-management">Stress Management</SelectItem>
                                  <SelectItem value="nature-retreats">Nature Retreats</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tell Us More</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Share your goals or any specific concerns you'd like to address..." 
                                  rows={5} 
                                  {...field} 
                                  className="resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="privacy"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 dark:border-gray-700 p-4">
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="privacy"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4 rounded border-gray-300 text-primary"
                                  />
                                  <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-300 select-none">
                                    I agree to the <a href="#" className="text-primary hover:underline">privacy policy</a> and consent to being contacted regarding my inquiry.
                                  </label>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFormStep(0)}
                            className="sm:flex-1 h-12 border-gray-200 dark:border-gray-700"
                          >
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            className="sm:flex-1 h-12 gradient-bg text-white hover:opacity-90 transition-all duration-300 rounded-xl font-medium"
                            disabled={contactMutation.isPending}
                          >
                            {contactMutation.isPending ? (
                              <span className="flex items-center">
                                <span className="animate-pulse">Sending...</span>
                              </span>
                            ) : (
                              <span className="flex items-center">
                                Submit Request
                                <CheckCircle className="ml-2 h-4 w-4" />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
              
              {/* Form Footer */}
              <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                <Lock className="h-4 w-4 mr-2" /> All information is encrypted and secure
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
