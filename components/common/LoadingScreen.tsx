'use client';

 import { useState, useEffect, forwardRef } from "react";
 import { motion } from "framer-motion";
 
 interface LoadingScreenProps {
   onComplete: () => void;
 }
 
 export const LoadingScreen = forwardRef<HTMLDivElement, LoadingScreenProps>(
   function LoadingScreen({ onComplete }, ref) {
   const [progress, setProgress] = useState(0);
   const [phase, setPhase] = useState<'loading' | 'complete'>('loading');
     const duration = 1200 + Math.random() * 600;
 
   useEffect(() => {
     const startTime = Date.now();
     const interval = setInterval(() => {
       const elapsed = Date.now() - startTime;
       const linearProgress = Math.min(elapsed / duration, 1);
       const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
       const newProgress = easedProgress * 100;
       setProgress(newProgress);
 
       if (newProgress >= 100) {
         clearInterval(interval);
         setPhase('complete');
         setTimeout(onComplete, 400);
       }
     }, 16);
 
     return () => clearInterval(interval);
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [onComplete]);
 
   return (
     <motion.div
       ref={ref}
       initial={{ opacity: 1 }}
       exit={{ opacity: 0, scale: 1.02 }}
       transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
       className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
     >
       {/* Animated background */}
      <div className="absolute inset-0 fx-vector">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px] fx-blob"
          initial={{ x: -200, y: -200, scale: 0.8 }}
          animate={{ 
            x: [-200, -100, -200],
            y: [-200, -100, -200],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] fx-blob"
          initial={{ x: 200, y: 200, scale: 0.8 }}
          animate={{ 
            x: [200, 100, 200],
            y: [200, 100, 200],
            scale: [0.8, 1.2, 0.8]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
         />
         <motion.div
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
           style={{
             background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)'
           }}
           animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         />
       </div>
 
       {/* Logo monogram */}
       <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ 
           scale: phase === 'complete' ? 1.05 : 1, 
           opacity: 1 
         }}
         transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
         className="relative mb-8"
       >
         <motion.div
           className="absolute inset-0 rounded-full"
           style={{
             background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
             transform: 'scale(1.5)'
           }}
           animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.4, 1.6, 1.4] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />
         
         <svg width="140" height="140" viewBox="0 0 140 140" className="relative z-10">
           <motion.circle
             cx="70" cy="70" r="65"
             fill="none"
             stroke="hsl(var(--primary) / 0.2)"
             strokeWidth="1.5"
           />
           
           <motion.circle
             cx="70" cy="70" r="65"
             fill="none"
             stroke="url(#loadingGradient)"
             strokeWidth="2.5"
             strokeLinecap="round"
             initial={{ pathLength: 0, rotate: -90 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
             style={{ 
               filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.6))",
               transformOrigin: "center"
             }}
           />
           
           <motion.circle
             cx="70" cy="70" r="50"
             fill="none"
             stroke="hsl(var(--accent) / 0.15)"
             strokeWidth="1"
             strokeDasharray="4 8"
             initial={{ rotate: 0 }}
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             style={{ transformOrigin: "center" }}
           />
           
           <motion.text
             x="70" y="82"
             textAnchor="middle"
             fill="hsl(var(--foreground))"
             className="font-display font-bold"
             style={{ fontSize: "48px", fontFamily: "Space Grotesk, sans-serif" }}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
           >
             CL
           </motion.text>
 
           <defs>
             <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="hsl(var(--primary))" />
               <stop offset="50%" stopColor="hsl(var(--accent))">
                 <animate attributeName="offset" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite" />
               </stop>
               <stop offset="100%" stopColor="hsl(var(--primary))" />
             </linearGradient>
           </defs>
         </svg>
       </motion.div>
 
       {/* Progress bar */}
       <motion.div
         initial={{ width: 0, opacity: 0, scaleX: 0 }}
         animate={{ width: "240px", opacity: 1, scaleX: 1 }}
         transition={{ delay: 0.2, duration: 0.3 }}
         className="relative mb-6"
       >
         <div className="h-1 w-[240px] rounded-full bg-secondary/30 overflow-hidden">
           <motion.div 
             className="h-full rounded-full"
             style={{ 
               width: `${progress}%`,
               background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
               backgroundSize: '200% 100%',
               boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--accent) / 0.3)'
             }}
             animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           />
         </div>
         
         <motion.span
           className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
         >
           {Math.round(progress)}%
         </motion.span>
       </motion.div>
 
       {/* Loading text */}
       <motion.p
         initial={{ opacity: 0, y: 15 }}
         animate={{ opacity: phase === 'complete' ? 0.5 : 0.8, y: 0 }}
         transition={{ delay: 0.5, duration: 0.4 }}
         className="text-sm text-muted-foreground text-center max-w-xs font-light tracking-wide"
       >
         {phase === 'complete' 
           ? 'Pronto!' 
           : 'Carregando experiências e projetos orientados por dados…'
         }
       </motion.p>
     </motion.div>
   );
   }
 );

