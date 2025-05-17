import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

export type Testimonial = {
  id: number;
  name: string;
  title: string;
  content: string;
  imagePath?: string;
};

export type Expert = {
  id: number;
  name: string;
  title: string;
  bio: string;
  imagePath: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
};

export type Service = {
  id: number;
  name: string;
  category: 'therapy' | 'mindfulness' | 'wellness';
  description: string;
  icon: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type Stat = {
  id: number;
  value: number;
  label: string;
  suffix: string;
};

export type ContactInfo = {
  address: string;
  email: string;
  phone: string;
  hours: string;
};

export type SocialLinks = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};
