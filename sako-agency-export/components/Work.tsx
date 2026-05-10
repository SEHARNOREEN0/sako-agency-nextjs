"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1, num: "001", title: "Nocturne Atelier", category: "Luxury Fashion", services: "Web · SEO · Brand",
    year: "2025", tag: "Case Study",
    gradient: "linear-gradient(135deg,#1a0e00 0%,#0a0a0a 60%,#2a1500 100%)",
    accent: "#c9a84c", span: "col-2",
    result: "+340% organic traffic",
  },
  {
    id: 2, num: "002", title: "Heliox Capital", category: "Fintech", services: "Web · AI · UX",
    year: "2025", tag: "Case Study",
    gradient: "linear-gradient(135deg,#001520 0%,#0a0a0a 70%,#001025 100%)",
    accent: "#4c8ec9",
    result: "Series A secured",
  },
  {
    id: 3, num: "003", title: "Maison Verre", category: "Hospitality", services: "AR · Brand · Web",
    year: "2024", tag: "Concept",
    gradient: "linear-gradient(135deg,#0a1200 0%,#0a0a0a 70%,#121800 100%)",
    accent: "#7ec94c",
    result: "Michelin recognition",
  },
  {
    id: 4, num: "004", title: "Volta Motors", category: "Automotive", services: "UI/UX · Web · Motion",
    year: "2024", tag: "Case Study",
    gradient: "linear-gradient(135deg,#0a0014 0%,#0a0a0a 70%,#120020 100%)",
    accent: "#9b4cc9", span: "col-2",
    result: "+240% conversion rate",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".work-card", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".work-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" style={{ background: "var(--black-2)", position: "relative" }}>
      <div className="container section-pad">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>— Selected Work</span>
            <h2 style={{ fontFamily: "'Cormorant',serif", fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1.05 }}>
              Brands we've{" "}
              <em style={{ background: "linear-gradient(135deg,#e8c56a,#c9a84c,#8b6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                evolved.
              </em>
            </h2>
          </div>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="magnetic"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "none", fontFamily: "'Syne',sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", cursor: "none" }}>
            All Projects <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Grid */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[320px] gap-3">
          {projects.map(p => (
            <div
              key={p.id}
              className={`work-card relative overflow-hidden rounded-[4px] border border-[rgba(201,168,76,0.1)] cursor-none ${p.span === "col-2" ? "md:col-span-2 col-span-1" : "col-span-1"}`}
            >
              {/* Background */}
              <div style={{ position: "absolute", inset: 0, background: p.gradient }} />
              {/* Noise grain */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
              {/* Overlay */}
              <div className="card-overlay" style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.4)" }} />

              {/* Accent orb */}
              <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, ${p.accent}18 0%, transparent 70%)`, filter: "blur(30px)" }} />

              {/* Top tag */}
              <div style={{ position: "absolute", top: "24px", left: "24px", display: "flex", gap: "8px", alignItems: "center", zIndex: 2 }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", border: "1px solid rgba(245,240,232,0.15)", padding: "5px 12px", borderRadius: "100px", backdropFilter: "blur(8px)" }}>{p.tag}</span>
              </div>
              <div style={{ position: "absolute", top: "24px", right: "24px", zIndex: 2 }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(245,240,232,0.3)" }}>{p.year}</span>
              </div>

              {/* Content */}
              <div className="card-content" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", zIndex: 2, color: "#f5f0e8" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: p.accent, marginBottom: "8px" }}>{p.category}</div>
                <h3 style={{ fontFamily: "'Cormorant',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "8px", color: "#f5f0e8" }}>{p.title}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(245,240,232,0.6)" }}>{p.services}</span>
                  <span className="card-reveal" style={{ fontFamily: "'Syne',sans-serif", fontSize: "10px", fontWeight: 600, color: p.accent, display: "flex", alignItems: "center", gap: "4px", letterSpacing: "0.1em" }}>
                    {p.result} <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              {/* Project number */}
              <div style={{ position: "absolute", bottom: "32px", right: "32px", fontFamily: "'Cormorant',serif", fontSize: "80px", fontWeight: 300, color: "rgba(201,168,76,0.15)", lineHeight: 1, userSelect: "none", zIndex: 1 }}>{p.num}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "var(--cream-dim)", marginBottom: "20px" }}>Curious what we can do for your brand?</p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="magnetic"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "transparent", color: "var(--gold)", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 32px", borderRadius: "100px", border: "1px solid rgba(201,168,76,0.3)", cursor: "none", transition: "background 0.4s,border-color 0.4s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.07)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}
          >
            Start a Project <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
