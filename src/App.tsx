import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  Database, 
  ShieldCheck, 
  Terminal,
  Layers,
  Server,
  ChevronRight,
  TrendingUp,
  Menu,
  X
} from "lucide-react";
import { HeroGeometric } from "@/src/components/ui/shape-landing-hero";
import SectionWithMockup from "@/src/components/ui/section-with-mockup";
import AboutShowcase from "@/src/components/ui/spatial-product-showcase";
import { BentoGrid, type BentoItem } from "@/src/components/ui/bento-grid";
import RadialOrbitalTimeline, { type TimelineItem } from "@/src/components/ui/radial-orbital-timeline";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const skillsData: TimelineItem[] = [
  {
    id: 1,
    title: "Linguagens & Frameworks",
    date: "Core",
    content: "Java 21, Spring Boot, Spring Security, Spring Data JPA. Foco em robustez e performance.",
    category: "Backend",
    icon: Code2,
    relatedIds: [2, 3],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Banco de Dados & Infra",
    date: "Infra",
    content: "PostgreSQL, Flyway, Docker. Experiência em modelagem relacional e containerização.",
    category: "Infra",
    icon: Database,
    relatedIds: [1, 4],
    status: "completed",
    energy: 85,
  },
  {
    id: 3,
    title: "Segurança & API",
    date: "API",
    content: "JWT, Swagger/OpenAPI, RESTful Design. Implementação de padrões de segurança e documentação.",
    category: "Security",
    icon: ShieldCheck,
    relatedIds: [1, 4],
    status: "completed",
    energy: 90,
  },
  {
    id: 4,
    title: "Metodologias",
    date: "Práticas",
    content: "Clean code, SOLID, Git, Clean Architecture. Comprometimento com a qualidade e manutenibilidade.",
    category: "Methodology",
    icon: Layers,
    relatedIds: [2, 3],
    status: "completed",
    energy: 92,
  },
];

const projectItems: BentoItem[] = [
  {
    title: "aparaFlow",
    meta: "Java 21 • Spring Boot",
    description: "API de agendamento inteligente para barbearias com autenticação JWT, prevenção de conflitos e sistema de cargos.",
    icon: <Terminal className="w-5 h-5" />,
    status: "Produção",
    tags: ["Backend", "Security", "PostgreSQL"],
    colSpan: 2,
    cta: "Ver Repositório →"
  },
  {
    title: "SalesFlow CRM",
    meta: "Java 21 • Clean Arch",
    description: "Sistema de gestão de vendas empresarial com foco em metas de vendedores e arquitetura desacoplada.",
    icon: <TrendingUp className="w-5 h-5" />,
    status: "Novo",
    tags: ["CRM", "Flyway", "PostgreSQL"],
    colSpan: 1,
  },
  {
    title: "Clean Architecture",
    meta: "Padrões",
    description: "Implementação de princípios SOLID e Clean Code em sistemas distribuídos.",
    icon: <Layers className="w-5 h-5" />,
    status: "Estudo",
    tags: ["SOLID", "Design Patterns"],
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Sobre', 'Projetos', 'Skills', 'Contato'];

  return (
    <div className="min-h-screen bg-[#030303] selection:bg-accent/30 selection:text-accent">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-[#030303]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="font-mono font-bold text-white text-sm">R</span>
            </div>
            <span className="font-mono text-sm tracking-tighter uppercase font-bold text-white">Ramon.dev</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-[#030303] border-b border-white/5 md:hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-mono uppercase tracking-[0.2em] text-white/60 hover:text-blue-400 transition-colors py-2"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative">
        
        {/* Hero Section */}
        <HeroGeometric 
          badge="DISPONÍVEL PARA NOVOS DESAFIOS"
          title1="Arquitetando APIs"
          title2="robustas e escaláveis com Java."
          description="Engenharia de Software focada em performance, segurança e código limpo. Transformando lógica complexa em sistemas eficientes."
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-white/5 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-all group w-full sm:w-auto"
            >
              <Github size={16} />
              <span>GitHub</span>
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 text-white/80 px-6 py-3 rounded-lg text-sm font-medium hover:text-white hover:bg-white/5 transition-all w-full sm:w-auto"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </HeroGeometric>

        {/* About Section */}
        <section id="sobre" className="scroll-mt-32">
          <AboutShowcase />
        </section>

        {/* Featured Project Section */}
        <section id="projetos" className="scroll-mt-32">
          <div className="max-w-7xl mx-auto px-6 pt-20">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white font-bold mb-12 text-center">
              02 / Projetos em Destaque
            </div>
            <BentoGrid items={projectItems} />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          {/* Skills Section */}
          <section id="skills" className="mb-24 mt-24 scroll-mt-32">
            <div className="max-w-7xl mx-auto px-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white font-bold mb-12 text-center">
                03 / Skills & Expertise
              </div>
              <div className="relative">
                <RadialOrbitalTimeline timelineData={skillsData} />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contato" className="pb-24 scroll-mt-32">
            <div className="bg-blue-600/90 rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  Vamos construir algo sólido juntos?
                </h2>
                <p className="text-white/70 text-sm sm:text-base mb-8 max-w-lg mx-auto">
                  Conecte-se comigo no LinkedIn para networking ou explore meus repositórios no GitHub.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a 
                    href="https://linkedin.com" 
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg text-sm font-bold hover:scale-105 transition-transform w-full sm:w-auto"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com" 
                    className="bg-[#030303] text-white px-8 py-4 rounded-lg text-sm font-bold hover:scale-105 transition-transform w-full sm:w-auto"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>

      <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-xs font-mono">
            © {new Date().getFullYear()} RAMON.DEV — BACKEND ENGINEER
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-blue-400 transition-colors"><Github size={20} /></a>
            <a href="#" className="text-white/40 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
