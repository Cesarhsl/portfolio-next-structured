'use client';

import { Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-10 border-t border-border/50 bg-gradient-to-t from-card/50 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} César Henrique Sousa Lima</span>
            <span className="hidden sm:inline">—</span>
            <span className="hidden sm:inline">Dados, BI e Automação</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-10 w-10 rounded-xl hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <a
                  href="https://linkedin.com/in/cesar-henrique-sousa-lima-251873297"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-10 w-10 rounded-xl hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <a
                  href="mailto:cesar.henrique1620@gmail.com"
                  aria-label="E-mail"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Tech stack */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Feito com</span>
            <span className="text-foreground/80">Next.js</span>
            <span>+</span>
            <span className="text-foreground/80">React</span>
            <span>+</span>
            <span className="text-foreground/80">TypeScript</span>
            <span>+</span>
            <span className="text-foreground/80">Tailwind CSS</span>
            <span>+</span>
            <span className="text-foreground/80">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

