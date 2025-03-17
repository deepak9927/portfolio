'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Github, Linkedin, Mail, Code2, Database, Server, Brain, 
  Cpu, Globe, Cloud, Lock, Settings, Terminal, Layers,
  Smartphone, TestTube, GitBranch, Shield, Workflow
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FloatingIcon {
  icon: JSX.Element;
  x: number;
  y: number;
  speed: number;
  direction: number;
}
interface Skill {
    title: string;
    description: string;
    icon: JSX.Element;
    technologies: string[];
    isStrong?: boolean; // Flag for strong vs weak skills
  }
export default function Home() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const icons = [Cpu, Globe, Cloud, Lock, Settings, Terminal].map((Icon) => ({
      icon: <Icon className="w-8 h-8 text-primary/20" />,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      speed: 0.5 + Math.random() * 0.5,
      direction: Math.random() * Math.PI * 2
    }));
    setFloatingIcons(icons);

    let animationFrameId: number;
    const animate = () => {
      setFloatingIcons(prevIcons => 
        prevIcons.map(icon => {
          const newX = icon.x + Math.cos(icon.direction) * icon.speed;
          const newY = icon.y + Math.sin(icon.direction) * icon.speed;
          
          let newDirection = icon.direction;
          if (newX < 0 || newX > window.innerWidth) newDirection = Math.PI - newDirection;
          if (newY < 0 || newY > window.innerHeight) newDirection = -newDirection;

          return {
            ...icon,
            x: newX < 0 ? 0 : newX > window.innerWidth ? window.innerWidth : newX,
            y: newY < 0 ? 0 : newY > window.innerHeight ? window.innerHeight : newY,
            direction: newDirection
          };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const skills: Skill[] = [
    {
      title: "Frontend Excellence",
      description: "Building modern, responsive web apps",
      icon: <Code2 className="w-10 h-10 mb-4 text-primary" />,
      technologies: ["React.js", "Next.js 13+", "TypeScript", "Tailwind CSS", "Redux"],
      isStrong: true,
    },
    {
      title: "Backend Development",
      description: "Scalable and secure server-side solutions",
      icon: <Server className="w-10 h-10 mb-4 text-primary" />,
      technologies: ["Node.js", "Express.js", "Python", "Django", "FastAPI"],
      isStrong: true,
    },
    {
      title: "Database & Storage",
      description: "Efficient data management",
      icon: <Database className="w-10 h-10 mb-4 text-primary" />,
      technologies: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
      isStrong: true,
    },
    {
      title: "Cloud Services",
      description: "Cloud deployment and management",
      icon: <Cloud className="w-10 h-10 mb-4 text-primary" />,
      technologies: ["AWS", "Vercel", "Docker", "CI/CD"],
      isStrong: true,
    },
    {
      title: "Frontend Alternatives",
      description: "Familiar but less experienced",
      icon: <Code2 className="w-10 h-10 mb-4 text-muted-foreground" />,
      technologies: ["Vue.js", "Angular"],
      isStrong: false,
    },
    {
      title: "Java Ecosystem",
      description: "Basic knowledge",
      icon: <Server className="w-10 h-10 mb-4 text-muted-foreground" />,
      technologies: ["Java", "Spring"],
      isStrong: false,
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (isStrong: boolean) => ({
      opacity: 1,
      scale: isStrong ? 1 : 0.95, // Slightly smaller for weak skills
      transition: { duration: 0.5 },
    }),
    hover: (isStrong: boolean) => ({
      scale: isStrong ? 1.05 : 1, // Bigger hover for strong skills
      transition: { duration: 0.3 },
    }),
  };



  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {floatingIcons.map((floatingIcon, index) => (
          <div
            key={index}
            className="absolute transition-transform duration-100 ease-linear"
            style={{
              transform: `translate(${floatingIcon.x}px, ${floatingIcon.y}px)`,
              transition: 'transform 0.1s linear'
            }}
          >
            {floatingIcon.icon}
          </div>
        ))}
      </div>

      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Full Stack Developer
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
          Passionate about building modern web applications with cutting-edge technologies.
          Experienced in MERN stack, Next.js, Python, and cloud services.
        </p>
        <div className="flex gap-4 mb-12">
          <Button asChild>
            <Link href="mailto:deepakthakur9927@gmail.com">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://github.com/deepak9927" target="_blank">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://www.linkedin.com/in/deepak-thakur-304b2a186" target="_blank">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-secondary/30 relative">
        <h2 className="text-3xl font-bold text-center mb-16">Technical Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Card key={skill.title} className="hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center">
                {skill.icon}
                <h3 className="text-xl font-semibold mt-2" aria-label={skill.title}>{skill.title}</h3>
                <p className="text-center mt-1">{skill.description}</p>
                <ul className="mt-2">
                  {skill.technologies.map((tech) => (
                    <li key={tech} className="inline-block mr-2">{tech}</li>
                  ))}
                </ul>
                <a href="mailto:deepak9927kumarthakur@gmail.com" className="text-blue-500 mt-2">Contact Me</a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <blockquote className="border-l-4 border-gray-300 pl-4 italic mt-4">
          <p>"An exceptional developer with a keen eye for detail!" - Client A</p>
        </blockquote>
        <blockquote className="border-l-4 border-gray-300 pl-4 italic mt-4">
          <p>"A pleasure to work with, always delivers on time!" - Client B</p>
        </blockquote>
      </section>

      <section className="container mx-auto px-4 py-20 text-center relative">
        <h2 className="text-3xl font-bold mb-6">Let's Build Something Amazing Together</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities.
          Whether you need a web application built from scratch or want to improve an existing one,
          I'm here to help.
        </p>
        <Button size="lg" asChild>
          <Link href="mailto:deepak9927kumarthakur@gmail.com">
            Get In Touch
          </Link>
        </Button>
      </section>
    </main>
  );
}