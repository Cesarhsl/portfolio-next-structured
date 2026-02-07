'use client';

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { 
  Code2, Database, BarChart3, GitBranch, Cpu, 
  MessageSquare, TrendingUp, Users, Target, Lightbulb,
  Presentation, Settings, Brain, LineChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from "@/hooks/useScrollReveal";

const hardSkills = [
  { name: "Python", level: 90, icon: Code2 },
  { name: "PySpark / Spark", level: 75, icon: Cpu },
  { name: "Power BI", level: 90, icon: BarChart3 },
  { name: "PostgreSQL", level: 70, icon: Database },
  { name: "Pandas / NumPy", level: 85, icon: LineChart },
  { name: "Angular (Web)", level: 65, icon: Code2 },
  { name: "Git / GitHub", level: 70, icon: GitBranch },
];

const softSkills = [{ name: "Comunicação com áreas de negócio", icon: MessageSquare }, { name: "Tradução de dados em decisões de negócio", icon: TrendingUp }, { name: "Storytelling com dados", icon: Presentation }, { name: "Visão analítica e orientação a resultados", icon: Target }, { name: "Pensamento crítico e resolução de problemas", icon: Brain }, { name: "Autonomia na condução de projetos", icon: Users }, { name: "Aprendizado contínuo", icon: Lightbulb }];

const highlights = [
  { title: "Dashboards", description: "para tomada de decisão", icon: BarChart3 },
  { title: "KPIs", description: "Monitoramento e insights para marketing e vendas", icon: TrendingUp },
  { title: "Automações", description: "Otimização de processos com BI", icon: Settings },
  { title: "Machine Learning", description: "Soluções e análises preditivas", icon: Brain },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 md:py-28 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={staggerItem}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">Skills</span> & Competências
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Conjunto de habilidades técnicas e comportamentais desenvolvidas ao longo da minha trajetória profissional.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Hard Skills */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <Card className="relative h-full glass-card border-border/50 overflow-hidden">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-[-20%] h-24 w-[60%] bg-gradient-to-r from-transparent via-primary/15 to-transparent blur-2xl"
                initial={{ opacity: 0, x: "-30%" }}
                animate={isInView ? { opacity: 1, x: "160%" } : { opacity: 0, x: "-30%" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              />
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-display text-xl">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  Hard Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {hardSkills.map((skill, index) => (
                  <HardSkillRow key={skill.name} skill={skill} index={index} isInView={isInView} />
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInRight}
          >
            <Card className="h-full glass-card border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-display text-xl">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Lightbulb className="w-5 h-5 text-accent" />
                  </div>
                  Soft Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-6">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-4 py-2.5 text-sm bg-secondary/60 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default flex items-center gap-2 border border-transparent"
                      >
                        <skill.icon className="w-4 h-4" />
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mt-16"
        >
          <motion.h3 
            variants={staggerItem}
            className="text-xl font-display font-semibold text-center mb-10"
          >
            O que eu entrego
          </motion.h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full glass-card border-border/50 text-center p-6 group-hover:border-primary/30">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-5 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-semibold mb-2 text-lg group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

type HardSkillRowProps = {
  skill: (typeof hardSkills)[number];
  index: number;
  isInView: boolean;
};

const HardSkillRow = ({ skill, index, isInView }: HardSkillRowProps) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const progress = useMotionValue(0);
  const width = useTransform(progress, (value) => `${Math.round(value)}%`);

  useEffect(() => {
    if (!isInView) {
      setDisplayLevel(0);
      progress.set(0);
      return;
    }

    const controls = animate(progress, skill.level, {
      duration: 1.3,
      delay: 0.35 + index * 0.08,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (value) => setDisplayLevel(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, skill.level, index, progress]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
      className="group cursor-default"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <skill.icon className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{skill.name}</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{displayLevel}%</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-secondary/60 overflow-hidden group-hover:bg-secondary/80 transition-colors duration-300">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          style={{ width }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={isInView ? { backgroundPosition: ["0% 50%", "200% 50%"] } : { backgroundPosition: "0% 50%" }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-primary/30 blur-sm"
          style={{ width }}
        />
      </div>
    </motion.div>
  );
};

