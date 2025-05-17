import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export function NewsletterSection() {
  const { toast } = useToast();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: NewsletterFormValues) => {
      const response = await apiRequest("POST", "/api/newsletter", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
      });
    },
  });

  function onSubmit(data: NewsletterFormValues) {
    newsletterMutation.mutate(data);
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-white text-opacity-90 mb-8">
            Stay updated with the latest wellness tips, event announcements, and exclusive content.
          </p>
          
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="flex-grow max-w-md">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-white text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="h-12 whitespace-nowrap bg-white text-primary hover:bg-gray-100 px-6"
              disabled={newsletterMutation.isPending}
            >
              {newsletterMutation.isPending ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
