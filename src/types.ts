export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  avatarColor: string; // Tailwind class
  initial: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  relation: string;
  location: string;
  avatarUrl?: string;
}
