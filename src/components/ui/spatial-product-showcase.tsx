'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Zap,
  Layers,
  ShieldCheck,
  Server,
  Code2,
  Terminal,
  Cpu,
  Database,
  LucideIcon,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'left' | 'right';

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  icon: LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string; // Display name for the switcher
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string; // Tailwind gradient classes
    glow: string;     // Tailwind color class for accents
    ring: string;     // Tailwind border color for rings
  };
  stats: {
    status: string;
    level: string;
  };
  features: FeatureMetric[];
}

const PRODUCT_DATA: Record<ProductId, ProductData> = {
  left: {
    id: 'left',
    label: 'Formação',
    title: 'Engenharia de Software',
    description: 'Graduando pela Estácio, unindo base teórica sólida com a prática constante no ecossistema Java. Minha abordagem é guiada pela resolução de problemas complexos através de arquiteturas bem estruturadas.',
    image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    colors: {
      gradient: 'from-blue-600 to-indigo-900',
      glow: 'bg-blue-500',
      ring: 'border-l-blue-500/50',
    },
    stats: { status: 'Ativo', level: 'Graduando' },
    features: [
      { label: 'Arquitetura', value: 95, icon: Layers },
      { label: 'Resolução de Problemas', value: 92, icon: Cpu },
    ],
  },
  right: {
    id: 'right',
    label: 'Expertise',
    title: 'Backend Developer',
    description: 'Especialista em transformar requisitos de negócio em APIs RESTful eficientes. Priorizo Clean Code e Orientação a Objetos para garantir que cada linha de código seja sustentável, testável e pronta para escala.',
    image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    colors: {
      gradient: 'from-orange-600 to-red-900',
      glow: 'bg-orange-500',
      ring: 'border-r-orange-500/50',
    },
    stats: { status: 'Especialista', level: 'Junior Mindset' },
    features: [
      { label: 'Clean Code', value: 98, icon: ShieldCheck },
      { label: 'APIs RESTful', value: 94, icon: Server },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isLeft: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(15px)',
      rotate: isLeft ? -30 : 30,
      x: isLeft ? -80 : 80,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isLeft }: { isLeft: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{
        background: isLeft
          ? 'radial-gradient(circle at 0% 50%, rgba(59, 130, 246, 0.1), transparent 50%)'
          : 'radial-gradient(circle at 100% 50%, rgba(249, 115, 22, 0.1), transparent 50%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProductVisual = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => (
  <motion.div layout="position" className="relative group shrink-0">
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-3xl opacity-20`}
    />

    {/* Image Container */}
    <div className="relative h-64 w-64 md:h-[400px] md:w-[400px] rounded-full shadow-2xl flex items-center justify-center overflow-hidden bg-white/[0.02] backdrop-blur-sm">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={`${data.title}`}
            variants={ANIMATIONS.image(isLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-1/2 h-1/2 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

      {/* Status Label */}
      <motion.div
        layout="position"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 bg-zinc-950/80 px-4 py-2 rounded-full backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full ${data.colors.glow} animate-pulse`} />
          {data.stats.status}
        </div>
      </motion.div>
  </motion.div>
);

const ProductDetails = ({ data, isLeft }: { data: ProductData; isLeft: boolean; key?: string | number }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isLeft ? 'flex-row' : 'flex-row-reverse';
  const barColorClass = isLeft ? 'left-0 bg-blue-500' : 'right-0 bg-orange-500';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.h2 variants={ANIMATIONS.item} className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2">
        {data.label}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-white/50 text-base mb-8 max-w-sm leading-relaxed ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className="w-full space-y-6 bg-white/[0.02] p-6 rounded-2xl backdrop-blur-sm">
        {data.features.map((feature, idx) => (
          <div key={feature.label} className="group">
            <div className={`flex items-center justify-between mb-3 text-xs ${flexDirClass}`}>
              <div className={`flex items-center gap-2 text-white/70`}>
                <feature.icon size={14} className="text-blue-500" /> <span>{feature.label}</span>
              </div>
              <span className="font-mono text-[10px] text-white/30">{feature.value}%</span>
            </div>
            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                className={`absolute top-0 bottom-0 ${barColorClass} opacity-60`}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Level */}
      <motion.div variants={ANIMATIONS.item} className={`mt-6 flex items-center gap-3 text-white/30 ${flexDirClass}`}>
        <Terminal size={14} />
        <span className="text-xs font-mono uppercase tracking-wider">{data.stats.level}</span>
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({ 
  activeId, 
  onToggle 
}: { 
  activeId: ProductId; 
  onToggle: (id: ProductId) => void 
}) => {
  const options = Object.values(PRODUCT_DATA).map(p => ({ id: p.id, label: p.label }));

  return (
    <div className="flex justify-center mt-12">
      <motion.div layout className="flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-xl">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative w-28 h-10 rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest focus:outline-none"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="island-surface"
                className="absolute inset-0 rounded-full bg-white/10 shadow-inner"
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-300 ${activeId === opt.id ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function AboutShowcase() {
  const [activeSide, setActiveSide] = useState<ProductId>('left');
  
  const currentData = PRODUCT_DATA[activeSide];
  const isLeft = activeSide === 'left';

  return (
    <div className="relative w-full bg-transparent text-zinc-100 overflow-hidden py-24">
      
      <BackgroundGradient isLeft={isLeft} />

      <div className="relative z-10 w-full px-6 flex flex-col justify-center max-w-6xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 lg:gap-32 w-full ${
            isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Left Column: Visuals */}
          <ProductVisual data={currentData} isLeft={isLeft} />

          {/* Right Column: Content */}
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <ProductDetails 
                key={activeSide} 
                data={currentData} 
                isLeft={isLeft} 
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <Switcher activeId={activeSide} onToggle={setActiveSide} />
      </div>
    </div>
  );
}
