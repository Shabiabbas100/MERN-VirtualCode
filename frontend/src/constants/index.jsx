

// src/constants/index.js or features.js

import user1 from "../Asset/profile-pictures/user1.png";
import user2 from "../Asset/profile-pictures/user2.jpg";
import user3 from "../Asset/profile-pictures/user3.jpg";
import user4 from "../Asset/profile-pictures/user4.jpg";
import user5 from "../Asset/profile-pictures/user5.jpg";
import user6 from "../Asset/profile-pictures/user6.jpg";

import {
  Code,
  TerminalSquare,
  ShieldCheck,
  CloudCog,
  Languages,
  LayoutDashboard,
} from "lucide-react";

export const features = [
  {
    icon: <Code />,
    text: "Multi-language Support",
    description:
      "Write, run, and test code in C, C++, Java, Python, Go, and more — all from a single platform.",
  },
  {
    icon: <TerminalSquare />,
    text: "Online Code Execution",
    description:
      "Execute code instantly using a powerful cloud-based compiler powered by Piston API.",
  },
  {
    icon: <ShieldCheck />,
    text: "Secure Authentication",
    description:
      "User login and project protection via JWT authentication ensures your code is safe and private.",
  },
  {
    icon: <CloudCog />,
    text: "Project Management",
    description:
      "Create, edit, rename, and delete coding projects with an intuitive interface and auto-save support.",
  },
  {
    icon: <Languages />,
    text: "Language Detection",
    description:
      "Automatically detect the selected language to streamline code compilation and reduce errors.",
  },
  {
    icon: <LayoutDashboard />,
    text: "Interactive Dashboard",
    description:
      "Get an overview of all your projects and manage them efficiently with a clean UI and filters.",
  },
];





export const navItems = [
    { label: "Home", href: "/home" },
    { label: "Features", href: "/about" },
    { label: "Testimonials", href: "/services" },
    { label: "feedback", href: "/contact" },
  ];

  export const testimonials = [
    {
      user: "Aryan Verma",
      company: "BIET Jhansi",
      image: user1,
      text: "Codex completely changed how I practice coding. The real-time code execution and multi-language support make it an essential tool for every developer.",
    },
    {
      user: "Sneha Kapoor",
      company: "NIT Trichy",
      image: user2,
      text: "Creating and managing projects has never been easier. Codex’s clean interface and responsiveness blew me away!",
    },
    {
      user: "Karan Patel",
      company: "BITS Pilani",
      image: user3,
      text: "As a beginner, I always feared compiling issues. Codex handles it all in the background — zero setup needed. Loved it!",
    },
    {
      user: "Ritika Sharma",
      company: "NSUT Delhi",
      image: user4,
      text: "What I admire most is how collaborative Codex is. Sharing projects with my peers and working together has become seamless.",
    },
    {
      user: "Aditya Verma",
      company: "VIT Vellore",
      image: user5,
      text: "The editor is blazing fast and supports all major languages. This is exactly what students need for quick debugging and testing.",
    },
    {
      user: "Fatima Khan",
      company: "AMU",
      image: user6,
      text: "Codex is a must-have for coders who want a smooth, fast, and intelligent online IDE. Hats off to the team behind it!",
    },
  ];
  