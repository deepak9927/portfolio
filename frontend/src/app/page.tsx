'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, Linkedin, Mail, Code2, Database, Server, 
  Cpu, Globe, Cloud, Rocket, Sparkles, Trophy,
  Brain, Zap, Target, BookOpen, Users, LogIn
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface FloatingIcon {
  icon: JSX.Element;
  x: number;
  y: number;
  speed: number;
  direction: number;
}

export default function Home() {
  const { user, logout } = useAuth();
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const icons = [Cpu, Globe, Cloud, Rocket, Sparkles, Trophy, Brain, Zap, Target, BookOpen, Users].map((Icon) => ({
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

  const skills = [
    {
      title: "React Master",
      description: "Building interactive UIs",
      icon: <Code2 className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/50",
      technologies: ["React.js", "Hooks", "Context API", "Redux"],
    },
    {
      title: "Next.js Pro",
      description: "Server & Client rendering",
      icon: <Server className="w-10 h-10" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/50",
      technologies: ["Next.js 15", "App Router", "Server Actions", "SSR"],
    },
    {
      title: "Database Guru",
      description: "Data management expert",
      icon: <Database className="w-10 h-10" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/50",
      technologies: ["MongoDB", "PostgreSQL", "Prisma", "Redis"],
    },
    {
      title: "Cloud Architect",
      description: "Scalable deployments",
      icon: <Cloud className="w-10 h-10" />,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
      technologies: ["AWS", "Vercel", "Docker", "CI/CD"],
    },
    {
      title: "TypeScript Ninja",
      description: "Type-safe development",
      icon: <Zap className="w-10 h-10" />,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/50",
      technologies: ["TypeScript", "Type Safety", "Generics", "Advanced Types"],
    },
    {
      title: "Full Stack Dev",
      description: "End-to-end solutions",
      icon: <Target className="w-10 h-10" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/50",
      technologies: ["MERN", "Node.js", "Express", "API Design"],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-codedex-950 via-codedex-900 to-codedex-950 text-white relative overflow-hidden">
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

      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-codedex-700/50 bg-codedex-900/50 backdrop-blur-sm">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-codedex-400 to-codedex-200">
          DevQuest
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/quiz" className="text-codedex-300 hover:text-white transition-colors duration-200">
            <Button variant="ghost" className="flex items-center gap-2 text-codedex-300 hover:text-white hover:bg-codedex-800">
              <BookOpen className="h-4 w-4" /> Quizzes
            </Button>
          </Link>
          {user ? (
            <>
              <span className="text-codedex-300">Welcome, {user.name || user.email}!</span>
              <Button onClick={logout} variant="outline" className="text-white border-codedex-500 hover:bg-codedex-500/20">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" className="flex items-center gap-2 text-codedex-300 hover:text-white hover:bg-codedex-800">
                  <LogIn className="h-4 w-4" /> Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center relative z-10">
        <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 bg-codedex-600/20 text-codedex-300 border-codedex-500">
          <Sparkles className="mr-2 h-4 w-4" /> Level Up Your Dev Skills
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-codedex-400 to-codedex-600">
          Deepak Thakur
        </h1>
        <p className="text-xl md:text-2xl text-codedex-300 max-w-3xl mb-10">
          Passionate Full Stack Developer crafting robust and scalable web applications.
          Specializing in modern frameworks and cloud solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
            <Link href="mailto:deepakthakur9927@gmail.com">
              <Mail className="mr-2 h-5 w-5" /> Contact Me
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="text-white border-codedex-500 hover:bg-codedex-500/20">
            <Link href="https://github.com/deepak9927" target="_blank">
              <Github className="mr-2 h-5 w-5" /> GitHub
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="text-white border-codedex-500 hover:bg-codedex-500/20">
            <Link href="https://www.linkedin.com/in/deepak-thakur-304b2a186" target="_blank">
              <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-codedex-400 to-codedex-500">
          My Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <Card key={skill.title} className={`p-6 border border-codedex-700 bg-codedex-900 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${skill.color}`}>
                  {skill.title}
                </CardTitle>
                <div className={`p-2 rounded-full bg-gradient-to-br ${skill.color}`}>
                  {skill.icon}
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <CardDescription className="text-codedex-300 mb-4">
                  {skill.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-codedex-700 text-codedex-200 hover:bg-codedex-600">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-codedex-400 to-codedex-500">
          Ready for a Challenge?
        </h2>
        <p className="text-xl text-codedex-300 max-w-2xl mx-auto mb-8">
          Test your knowledge with our interactive quizzes on React.js and Next.js!
        </p>
        <Button size="lg" asChild className="bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
            <Link href="/quiz">
            <Brain className="mr-2 h-5 w-5" /> Start Quizzing!
          </Link>
        </Button>
      </section>

      <footer className="relative z-10 text-center py-10 text-codedex-500 border-t border-codedex-700/50 bg-codedex-900/50 backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} Deepak Thakur. All rights reserved.</p>
      </footer>
    </main>
  );
}
