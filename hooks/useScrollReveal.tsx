'use client';

import { useEffect, useRef, useState } from "react";
import type { Variants } from "framer-motion";
 
 interface UseScrollRevealOptions {
   threshold?: number;
   rootMargin?: string;
   once?: boolean;
 }
 
 export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
   const { threshold = 0.1, rootMargin = "-50px", once = true } = options;
   const ref = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);
 
   useEffect(() => {
     const element = ref.current;
     if (!element) return;
 
     const observer = new IntersectionObserver(
       ([entry]) => {
         if (entry.isIntersecting) {
           setIsVisible(true);
           if (once) {
             observer.unobserve(element);
           }
         } else if (!once) {
           setIsVisible(false);
         }
       },
       { threshold, rootMargin }
     );
 
     observer.observe(element);
 
     return () => observer.unobserve(element);
   }, [threshold, rootMargin, once]);
 
   return { ref, isVisible };
 };
 
 // Animation variants for framer-motion
export const fadeInUp: Variants = {
   hidden: { opacity: 0, y: 30 },
   visible: { 
     opacity: 1, 
     y: 0,
     transition: {
       duration: 0.6,
      ease: "easeOut"
     }
   }
 };
 
export const fadeInLeft: Variants = {
   hidden: { opacity: 0, x: -30 },
   visible: { 
     opacity: 1, 
     x: 0,
     transition: {
       duration: 0.6,
      ease: "easeOut"
     }
   }
 };
 
export const fadeInRight: Variants = {
   hidden: { opacity: 0, x: 30 },
   visible: { 
     opacity: 1, 
     x: 0,
     transition: {
       duration: 0.6,
      ease: "easeOut"
     }
   }
 };
 
export const scaleIn: Variants = {
   hidden: { opacity: 0, scale: 0.9 },
   visible: { 
     opacity: 1, 
     scale: 1,
     transition: {
       duration: 0.5,
      ease: "easeOut"
     }
   }
 };
 
export const staggerContainer: Variants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: {
       staggerChildren: 0.1,
       delayChildren: 0.1
     }
   }
 };
 
export const staggerItem: Variants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
     opacity: 1,
     y: 0,
     transition: {
       duration: 0.5,
      ease: "easeOut"
     }
   }
 };