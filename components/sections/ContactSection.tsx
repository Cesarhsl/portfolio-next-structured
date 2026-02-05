'use client';

import * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Mail, Phone, Linkedin, MapPin
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, staggerItem, fadeInLeft } from "@/hooks/useScrollReveal";

const contactInfo = [
  {
    label: "E-mail",
    value: "cesar.henrique1620@gmail.com",
    icon: Mail,
    href: "mailto:cesar.henrique1620@gmail.com",
    action: "mailto",
  },
  {
    label: "Telefone",
    value: "(75) 99169-7025",
    icon: Phone,
    href: "https://wa.me/5575991697025?text=Ol%C3%A1%20C%C3%A9sar%2C%20vim%20pelo%20seu%20portf%C3%B3lio",
    action: "link",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/cesar-henrique-sousa-lima-251873297",
    displayValue: "César Henrique S. Lima",
    icon: Linkedin,
    href: "https://linkedin.com/in/cesar-henrique-sousa-lima-251873297",
    action: "link",
  },
  {
    label: "Localização",
    value: "Feira de Santana - Bahia",
    icon: MapPin,
    href: null,
    action: "none",
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contato"
      ref={ref}
      className="py-24 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] fx-blob fx-vector" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] fx-blob fx-vector" />

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
            Vamos <span className="gradient-text">Conversar</span>?
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Estou sempre aberto a novas oportunidades, colaborações e projetos interessantes. 
            Entre em contato!
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Cards */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
            className="grid gap-4 sm:grid-cols-2 content-start"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {info.href ? (
                  <a href={info.href} target={info.action === "link" ? "_blank" : undefined} rel="noopener noreferrer">
                    <Card className="h-full glass-card border-border/50 cursor-pointer group">
                      <CardContent className="p-5 h-full">
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                            <info.icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              {info.label}
                            </p>
                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-300">
                              {info.displayValue || info.value}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card className="h-full glass-card border-border/50">
                    <CardContent className="p-5 h-full">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                          <info.icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {info.label}
                          </p>
                          <p className="text-sm font-medium">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

