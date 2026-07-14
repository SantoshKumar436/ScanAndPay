import { Contact, FAQItem, FeatureItem, TestimonialItem } from "./types";

export const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Arjun",
    relation: "Son",
    phone: "+91 98765 43210",
    avatarColor: "from-[#F5A623] to-[#F5D123]",
    initial: "A",
  },
  {
    id: "2",
    name: "Priya",
    relation: "Daughter",
    phone: "+44 7821 555092",
    avatarColor: "from-[#3B82F6] to-[#60A5FA]",
    initial: "P",
  },
  {
    id: "3",
    name: "Rohan",
    relation: "Son-in-law",
    phone: "+91 91234 56789",
    avatarColor: "from-[#10B981] to-[#34D399]",
    initial: "R",
  },
];

export const features: FeatureItem[] = [
  {
    title: "100% Zero-Learning Curve",
    description: "No banking apps to configure, no passwords or PINs to remember. Parents only need to know how to take a photo of the QR code.",
    iconName: "Camera",
  },
  {
    title: "Foolproof Gallery Long-Press",
    description: "By integrating directly into iOS and Android system sharing, parents long-press any QR image in their gallery to instantly choose a recipient.",
    iconName: "Maximize",
  },
  {
    title: "Absolute Financial Security",
    description: "Parents never enter their UPI PIN, cards, or bank credentials. All money remains safely controlled in your own accounts.",
    iconName: "ShieldCheck",
  },
  {
    title: "Designed for NRI & Out-of-City Children",
    description: "Whether you are in Bangalore, London, or New York, you receive the payment request on WhatsApp and complete it instantly with your own UPI app.",
    iconName: "Globe",
  },
  {
    title: "Dual-Recipient Routing",
    description: "Assign backup family members. If your son is in a meeting, the request can automatically alert your daughter or spouse to pay.",
    iconName: "Users",
  },
  {
    title: "Instant Smart Confirmations",
    description: "As soon as the child scans and pays, QRPass pushes a payment successful card directly back to the parent's WhatsApp so they can walk away with their goods.",
    iconName: "Sparkles",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    quote: "My 72-year-old Appa was always scared of going to local shops alone because he couldn't handle digital payments and carrying cash is risky. Now, he just snaps the QR, taps my name, and I pay from my Bangalore flat in seconds. It changed our lives.",
    author: "Karthik Subramanian",
    relation: "Son of Devraj Subramanian",
    location: "Bangalore / Chennai",
  },
  {
    quote: "QRPass is absolute genius. I live in Toronto, and my mother in Pune often needs medicines delivered. She sends the chemist's QR on WhatsApp via QRPass, and I pay remotely. No complex setups or risk of online scams for her.",
    author: "Shreya Gokhale",
    relation: "Daughter of Mangal Gokhale",
    location: "Toronto / Pune",
  },
  {
    quote: "Earlier, I had to write down shop details or request manual bank transfers which took hours. With QRPass, my daughter Priya receives the photo immediately, pays, and the shopkeeper gets his money instantly. It's so fast!",
    author: "Mr. Anand Joshi",
    relation: "Retired Teacher",
    location: "Nashik",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Do my elderly parents need a bank account or UPI app linked to QRPass?",
    answer: "No, absolutely not. That is the magic of QRPass. Your parents do not need any UPI apps (like GPay, PhonePe, Paytm), credit cards, or active banking connections. They only need to photograph the shop's QR code and share it through QRPass.",
  },
  {
    question: "How does the child pay remotely?",
    answer: "As the child, you receive a styled photo of the QR code in your WhatsApp chat with your parent, containing a 'Scan & Pay' deep link. Clicking the button opens any of your preferred UPI apps on your phone automatically with the merchant's QR loaded. You complete the payment securely.",
  },
  {
    question: "Is this safe from online phishing and scammers?",
    answer: "Extremely safe. Scammers often target elderly citizens by sending fake UPI collect requests, OTP phishing, or screen-sharing links. With QRPass, your parents never enter UPI PINs or passwords, nor do they download remote control apps. They only share images outward. You (the child) retain full control over final payments.",
  },
  {
    question: "How is QRPass set up for the parents' phone?",
    answer: "You install the lightweight QRPass app on their phone, add your name and WhatsApp number under their pre-saved family contacts, and grant gallery share access. From that moment, they don't even need to open the QRPass app—it integrates right into their gallery share sheet.",
  },
  {
    question: "What happens if I (the child) am unavailable or in a meeting?",
    answer: "QRPass lets you set up backup family members (e.g., Son, Daughter, Spouse). Parents can choose a backup contact instantly, or the system can automatically ping the next available contact if the primary one doesn't respond in 3 minutes.",
  },
];
