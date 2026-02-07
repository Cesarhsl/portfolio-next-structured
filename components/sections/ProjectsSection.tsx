'use client';

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BarChart3, Database, Settings, Brain, 
  ExternalLink, X, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

const projects = [
  {
    id: 1,
    title: "Dashboards Estratégicos de Inteligência de Mercado",
    subtitle: "Power BI • KPIs • Tomada de decisão",
    description: "Construção e apresentação de dashboards para apoiar decisões estratégicas, acompanhando indicadores-chave (KPIs) e gerando insights para áreas de marketing e vendas.",
    icon: BarChart3,
    tags: ["Power BI", "KPIs", "Insights", "Storytelling"],
    metrics: ["KPIs monitorados", "Automação de relatórios", "Visão executiva"],
    color: "from-blue-500 to-cyan-500",
    details: {
      challenge: "Unificar dados de múltiplas fontes e criar visualizações que facilitem a tomada de decisão executiva.",
      solution: "Desenvolvimento de dashboards interativos com Power BI, integrando dados de vendas, marketing e operações.",
      impact: "Redução significativa no tempo de geração de relatórios e aumento na qualidade das decisões baseadas em dados.",
    },
  },
  {
    id: 2,
    title: "Pipelines de Dados com PySpark e PostgreSQL",
    subtitle: "PySpark • ETL • Performance",
    description: "Desenvolvimento de pipelines de dados voltados a escalabilidade e performance, organizando bases para análises e produtos internos de decisão.",
    icon: Database,
    tags: ["PySpark", "PostgreSQL", "ETL", "Escalabilidade"],
    metrics: ["Processamento em lote", "Padronização de dados", "Confiabilidade"],
    color: "from-orange-500 to-red-500",
    details: {
      challenge: "Processar grandes volumes de dados com eficiência e garantir qualidade e consistência.",
      solution: "Arquitetura de pipelines ETL robustos utilizando PySpark para processamento distribuído e PostgreSQL para armazenamento.",
      impact: "Capacidade de processar milhões de registros com alta performance e confiabilidade.",
    },
  },
  {
    id: 3,
    title: "Automação de Processos e Rotinas de BI",
    subtitle: "Python • Automação • Eficiência",
    description: "Automação de rotinas de dados e BI para reduzir esforço manual, aumentar consistência e acelerar entregas para o negócio.",
    icon: Settings,
    tags: ["Python", "Automação", "BI", "Eficiência"],
    metrics: ["Menos retrabalho", "Entregas mais rápidas", "Padronização"],
    color: "from-green-500 to-emerald-500",
    details: {
      challenge: "Eliminar tarefas repetitivas e propensas a erros humanos nos processos de BI.",
      solution: "Scripts Python para automatização de coleta, transformação e distribuição de dados e relatórios.",
      impact: "Economia de horas semanais em tarefas manuais e maior consistência nos dados entregues.",
    },
  },
  {
    id: 4,
    title: "Modelos Preditivos para Apoio à Decisão",
    subtitle: "Machine Learning • Análise Preditiva",
    description: "Aplicação de análises preditivas com bibliotecas Python para antecipar tendências e apoiar planejamento/estratégia.",
    icon: Brain,
    tags: ["Machine Learning", "Pandas", "NumPy", "Preditivo"],
    metrics: ["Cenários", "Projeções", "Decisão orientada a dados"],
    color: "from-purple-500 to-pink-500",
    details: {
      challenge: "Antecipar tendências de mercado e comportamento de clientes para suporte à estratégia.",
      solution: "Modelos de machine learning utilizando Pandas, NumPy e scikit-learn para análises preditivas.",
      impact: "Insights antecipados que permitem ações proativas e melhor planejamento estratégico.",
    },
  },
];

type Project = (typeof projects)[number];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);

  return (
    <section
      id="projetos"
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
            <span className="gradient-text">Projetos</span> em Destaque
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Seleção de iniciativas que representam meu foco em impacto no negócio, automação e performance em dados.
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card 
                className="h-full glass-card border-border/50 cursor-pointer overflow-hidden group-hover:border-primary/30"
                onClick={() => {
                  if (closeTimeout.current) {
                    window.clearTimeout(closeTimeout.current);
                    closeTimeout.current = null;
                  }
                  setSelectedProject(project);
                  setIsDialogOpen(true);
                }}
              >
                {/* Gradient accent */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${project.color} transition-all duration-300 group-hover:h-2`} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4 mb-1">
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <project.icon className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="font-display text-lg mb-1.5 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {project.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + tagIndex * 0.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                    {project.metrics.map((metric, i) => (
                      <span key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-primary" />
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* View details */}
                  <motion.div 
                    className="flex items-center text-sm text-primary font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Ver detalhes</span>
                    <ExternalLink className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsDialogOpen(false);
              if (closeTimeout.current) {
                window.clearTimeout(closeTimeout.current);
              }
              closeTimeout.current = window.setTimeout(() => {
                setSelectedProject(null);
                closeTimeout.current = null;
              }, 220);
            }
          }}
        >
          <DialogContent className="sm:max-w-2xl glass-panel border-border/50">
            {selectedProject && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedProject.color} text-white`}>
                      <selectedProject.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <DialogTitle className="font-display text-xl">
                        {selectedProject.title}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedProject.subtitle}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div key={selectedProject.id} className="space-y-6 mt-4">
                  <p className="text-muted-foreground">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Desafio
                      </h4>
                      <p className="text-sm text-muted-foreground">{selectedProject.details.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Solução
                      </h4>
                      <p className="text-sm text-muted-foreground">{selectedProject.details.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Impacto
                      </h4>
                      <p className="text-sm text-muted-foreground">{selectedProject.details.impact}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/60">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

