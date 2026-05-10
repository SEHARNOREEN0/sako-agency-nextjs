"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Layers, Search, Palette, Sparkles, Brain } from "lucide-react";
import MagicBento from "./MagicBento";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Code2, num: "01", name: "Web Development", tagline: "Bespoke & Lightning-Fast", desc: "Custom-engineered websites that convert visitors into revenue. Performance-first, pixel-perfect." },
  { icon: Layers, num: "02", name: "UI / UX Design", tagline: "Inevitable Interfaces", desc: "Interfaces that feel designed for the user, not the designer. Clean, considered, conversion-led." },
  { icon: Search, num: "03", name: "SEO & Growth", tagline: "Rank Where It Matters", desc: "Compound organic growth that compounds month over month. We play the long game." },
  { icon: Palette, num: "04", name: "Brand & Graphics", tagline: "Identity That Lasts", desc: "Visual identities that command attention and build instant recognition across every touchpoint." },
  { icon: Sparkles, num: "05", name: "AR Experiences", tagline: "Immersive & Unforgettable", desc: "Augmented reality activations that turn heads, generate press, and live rent-free in memory." },
  { icon: Brain, num: "06", name: "AI Integration", tagline: "Automate at Scale", desc: "Embed AI into your operations to personalize, automate, and ship 10× faster." },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".magic-bento-card", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".bento-section", start: "top 80%" },
      });
      gsap.fromTo(".svc-heading", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".svc-heading", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ background: "var(--black)", position: "relative" }}>
      <div className="container section-pad">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end flex-wrap gap-6 mb-12">
          <div className="svc-heading">
            <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>— Capabilities</span>
            <h2 style={{ fontFamily: "'Cormorant',serif", fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1.05 }}>
              What we <em style={{ background: "linear-gradient(135deg,#e8c56a,#c9a84c,#8b6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>do</em><br />— and do better.
            </h2>
          </div>
          <p style={{ maxWidth: "320px", fontSize: "14px", color: "var(--cream-dim)", lineHeight: 1.8 }}>
            Six disciplines. One studio. Everything your brand needs to dominate.
          </p>
        </div>

        <MagicBento 
          cards={services.map(s => ({
            title: s.name,
            description: s.desc,
            label: s.tagline,
            icon: <s.icon size={24} strokeWidth={1.5} />,
          }))}
          glowColor="201, 168, 76"
          particleCount={15}
          spotlightRadius={400}
        />
      </div>
    </section>
  );
}
