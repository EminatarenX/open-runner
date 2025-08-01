export interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  type: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  relevantCoursework?: string[];
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  social: {
    github?: string;
    linkedin?: string;
    youtube?: string;
    email?: string;
  };
}

export const profile: Profile = {
  name: "Emiliano Nataren del Rivero",
  title: "Full Stack Developer",
  summary: "Backend Developer with 3+ years of experience in Application/Production Support, building scalable systems (Java/Spring, Python, NestJS), and event-driven architectures (Kafka, WebSockets). Proven track record in deploying AI-powered solutions (WhatsApp automation, NLP) used by 300+ companies, including Fortune 500 clients. Experienced in healthcare backend systems, with knowledge of PACS, HL7 and FHIR standards for medical data interoperability. Technical educator with 1K+ YouTube subscribers, creating content on microservices and cloud optimization.",
  
  experience: [
    {
      company: "Grupo Salinas - Elektra",
      position: "Backend Developer",
      period: "Apr 2025 - Present",
      location: "Mexico City",
      type: "Full-time",
      achievements: [
        "Working on backend systems for one of Mexico's largest retail companies",
        "Contributing to scalable e-commerce solutions",
        "Implementing microservices architecture"
      ]
    },
    {
      company: "E-Bitware",
      position: "Semi-Senior Backend Developer",
      period: "Oct 2024 - Apr 2025",
      location: "Mexico City",
      type: "Hybrid",
      achievements: [
        "Conversational AI System: Designed a Python-based (Flask/FastAPI + AsyncIO) backend integrated with Claude API and LangChain, improving NLP accuracy by 40% for WhatsApp campaigns",
        "Microservices Architecture: Built 5 Java Spring Boot services with Kafka, reducing latency by 30% through Redis caching and MongoDB transactions",
        "Kubernetes Deployment: Orchestrated DEV/QA/PROD environments on AWS (EC2, S3), cutting cloud costs by 22% via auto-scaling",
        "Impact: Solution deployed by 300+ enterprises (e.g., Liverpool, Banxico) to automate 50K+ monthly customer interactions"
      ]
    },
    {
      company: "Neurotry",
      position: "Backend Developer",
      period: "Aug 2023 - Sep 2024",
      location: "Remote",
      type: "Full-time",
      achievements: [
        "WhatsApp Automation: Developed a NestJS/TypeScript backend integrating WhatsApp Cloud API, boosting user engagement by 35%",
        "Offline Catalog: Created a low-bandwidth solution for SMEs, expanding reach to 1.5K users in 3 months",
        "AI Model: Built a Google AI-powered chatbot presented at OpenMINDFest2023 (CUTonalá)"
      ]
    },
    {
      company: "HighTech Process Counselors",
      position: "Backend Developer",
      period: "Aug 2022 - Jun 2023",
      location: "Remote",
      type: "Full-time",
      achievements: [
        "Web Catalog Backend: Laravel/MySQL application with an admin panel that reduced manual tasks by 20%",
        "Auth Middleware: Implemented JWT-based access control, eliminating 3 critical security vulnerabilities"
      ]
    }
  ],

  education: [
    {
      institution: "Universidad Politécnica de Chiapas",
      degree: "B.S. in Software Engineering",
      period: "Sep 2022 - Jul 2025",
      location: "Suchiapa, Mexico",
      relevantCoursework: ["Cloud Architecture", "Microservices Design", "Cybersecurity"]
    }
  ],

  skills: [
    {
      category: "Languages",
      skills: ["Java (Spring Boot)", "Python (Flask/FastAPI)", "TypeScript (NestJS)", "JavaScript", "PHP (Laravel)"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS (EC2, S3)", "Kubernetes", "Docker", "CI/CD", "Nginx", "Unix"]
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL", "Redis", "MySQL", "SQL"]
    },
    {
      category: "Event-Driven",
      skills: ["Kafka", "WebSockets", "Message Queues"]
    },
    {
      category: "Healthcare Standards",
      skills: ["PACS", "HL7", "FHIR"]
    },
    {
      category: "APIs & Integrations",
      skills: ["REST", "GraphQL", "WhatsApp Cloud API", "Stripe", "Claude API", "LangChain"]
    },
    {
      category: "Methodologies",
      skills: ["Agile", "Microservices", "Event-Driven Architecture", "AI/ML Integration"]
    }
  ],

  projects: [
    {
      title: "RunJS App",
      description: "A modern JavaScript playground built with Tauri, React, and Monaco Editor. Features safe code execution, syntax highlighting, and auto-save functionality.",
      technologies: ["React", "TypeScript", "Tauri", "Monaco Editor", "Rust"],
      github: "https://github.com/emiliano-nataren/runjs-app"
    },
    {
      title: "WhatsApp AI Automation",
      description: "AI-powered WhatsApp automation system used by 300+ companies, including Fortune 500 clients. Handles 50K+ monthly customer interactions.",
      technologies: ["Python", "FastAPI", "Claude API", "LangChain", "WhatsApp Cloud API", "Kafka"],
      link: "https://e-bitware.com"
    },
    {
      title: "Microservices Architecture",
      description: "Built 5 Java Spring Boot services with Kafka integration, reducing latency by 30% through Redis caching and MongoDB transactions.",
      technologies: ["Java", "Spring Boot", "Kafka", "Redis", "MongoDB", "Kubernetes", "AWS"]
    },
    {
      title: "Healthcare Backend System",
      description: "Backend system for medical data interoperability using PACS, HL7, and FHIR standards.",
      technologies: ["Java", "Spring Boot", "HL7", "FHIR", "PACS", "PostgreSQL"]
    }
  ],

  certifications: [
    {
      name: "AWS Academy Cloud Architecting",
      issuer: "AWS",
      year: "2024"
    },
    {
      name: "English for IT (C1)",
      issuer: "OpenEDG",
      year: "2023"
    },
    {
      name: "Cybersecurity Essentials",
      issuer: "Cisco",
      year: "2023"
    }
  ],

  social: {
    github: "https://github.com/emiliano-nataren",
    linkedin: "https://linkedin.com/in/emiliano-nataren",
    youtube: "https://youtube.com/@eminataren",
    email: "emiliano.nataren@gmail.com"
  }
}; 