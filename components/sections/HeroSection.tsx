'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/hooks/useSmoothScroll";
import { staggerContainer, staggerItem } from "@/hooks/useScrollReveal";

const typewriterTexts = [
  "Dados e BI para decisões estratégicas",
  "Automação de processos orientada a dados",
  "Inteligência de mercado aplicada ao negócio",
  "Machine Learning & Analytics em produção",
  "Desenvolvimento Full Stack integrado a dados",
];

export const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
 
  useEffect(() => {
    const currentFullText = typewriterTexts[currentTextIndex];
    const timeout = isDeleting ? 25 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 88;
      const rect = element.getBoundingClientRect();
      const offsetTop = window.pageYOffset + rect.top - headerOffset;
      smoothScrollTo(offsetTop);
    }
  };

  return (
    <section
      id="apresentacao"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8 md:pt-4"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-foreground">
              <span className="gradient-text">César</span> Henrique
            </span>
            <br />
            <span className="text-foreground">
              Sousa <span className="gradient-text">Lima</span>
            </span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            variants={staggerItem}
            className="h-14 flex items-center justify-center mb-8"
          >
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-medium">
              <span className="text-primary">
              {displayText}
              </span>
              <motion.span 
                className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </h2>
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={staggerItem}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Sou um profissional graduado, com atuação prática em Dados/BI, Automação de Processos, Inteligência de Mercado,
            Machine Learning & Analytics e Desenvolvimento Full Stack. Entrego soluções orientadas a impacto, com foco em
            eficiência, qualidade e resultados para o negócio.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 -mt-2"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("#projetos")}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 text-primary-foreground px-8 h-12"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver Projetos
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#contato")}
              className="group border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 px-8 h-12"
            >
              <MessageCircle className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Falar comigo
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.button
        type="button"
        aria-label="Rolar para baixo"
        onClick={() => scrollToSection("#sobre")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 text-muted-foreground/70 hover:text-primary transition-colors"
      >
        <span className="text-[10px] sm:text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="p-1.5 sm:p-2 rounded-full border border-muted-foreground/30 backdrop-blur-sm"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};








