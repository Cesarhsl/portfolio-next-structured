'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Briefcase, GraduationCap, Award, Languages,
  Calendar, MapPin, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from "@/hooks/useScrollReveal";

const experiences = [
  {
    role: "Analista de Inteligência de Mercado",
    company: "Moto Clube Honda",
    period: "Atual",
    location: "Feira de Santana - BA",
    current: true,
    bullets: [
      "Desenvolvimento de dashboards estratégicos para tomada de decisão",
      "Análises preditivas com Python (Pandas, NumPy, PySpark)",
      "Monitoramento de KPIs",
      "Suporte a marketing e vendas com insights",
      "Otimização de processos com automações em BI",
    ],
  },
  {
    role: "CDO | Cientista de Dados",
    company: "MaisCash Promotora",
    period: "02/2022 – 01/2025",
    location: "Feira de Santana - BA",
    current: false,
    bullets: [
      "Liderança de projetos de automação de processos internos",
      "Implementação de soluções de machine learning",
      "Pipelines de dados com PySpark e PostgreSQL",
      "Coordenação de equipe técnica e controle de entregas",
      "Sistemas internos de apoio à decisão para diretoria",
    ],
  },
];

const education = [
  {
    course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    institution: "UNIFAN",
    year: "2025",
  },
];

const certifications = [
  "II Simpósio de Pesquisa e Inovação - UNIFAN (2024)",
  "Feira Internacional do Conhecimento (FINC) - UNIFAN (2024)",
  "OficinaGit — Versionamento e Workflow - UNIFAN (2024)",
  "NLW Pocket: JavaScript (Iniciante) - Rocketseat (2024)",
  "NLW Pocket: JavaScript (Full Stack Intermediário) - Rocketseat (2024)",
];

const languages = [
  { name: "Inglês", level: "B2" },
  { name: "Espanhol", level: "A2" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-24 md:py-28 relative overflow-hidden md:mt-12"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary/5 blur-[120px] fx-blob fx-vector" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-accent/5 blur-[120px] fx-blob fx-vector" />

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
            <span className="gradient-text">Sobre</span> Mim
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Profissional em formação em Análise e Desenvolvimento de Sistemas. Minha atuação combina 
            inteligência de mercado, BI e engenharia/ciência de dados para gerar impacto real.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Experience Timeline */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold">Experiência Profissional</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="timeline-connector" />

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-4 w-4 h-4 rounded-full border-2 ${
                      exp.current 
                        ? "bg-primary border-primary" 
                        : "bg-background border-muted-foreground"
                    }`}
                    style={exp.current ? { boxShadow: '0 0 12px hsl(var(--primary) / 0.6)' } : {}}
                    />

                    <Card className="glass-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                          <div>
                            <h4 className="font-display font-semibold text-lg">{exp.role}</h4>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge 
                              variant={exp.current ? "default" : "secondary"} 
                              className={`text-xs ${exp.current ? 'bg-primary/90' : ''}`}
                            >
                              {exp.period}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <ul className="space-y-2.5">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInRight}
            className="space-y-6"
          >
            {/* Education */}
            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">Formação</h3>
                </div>
                {education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-medium text-sm">{edu.course}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <Badge variant="outline" className="text-xs mt-2 border-primary/30 text-primary">
                      {edu.year}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">Certificações & Eventos</h3>
                </div>
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <motion.li 
                      key={index} 
                      className="text-sm text-muted-foreground flex items-start gap-2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {cert}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Languages className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">Idiomas</h3>
                </div>
                <div className="flex gap-3">
                  {languages.map((lang, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                    >
                      {lang.name} — {lang.level}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

