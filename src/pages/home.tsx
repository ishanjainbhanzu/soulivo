import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TeamSection } from "@/components/team-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Soulivo - Mental Wellness & Therapy Services</title>
        <meta name="description" content="Discover professional mental wellness services that help you overcome challenges and nurture lasting peace of mind with Soulivo." />
        <meta property="og:title" content="Soulivo - Mental Wellness & Therapy Services" />
        <meta property="og:description" content="Discover professional mental wellness services that help you overcome challenges and nurture lasting peace of mind." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://soulivo.com" />
      </Helmet>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <TeamSection />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
