"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60",
    title: "Color Psychology in UI: How to Choose the Right Palette",
    category: "UI/UX design",
    date: "May 12, 2026"
  },
  {
    image: "https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60",
    title: "Understanding Typography: Crafting a Visual Voice for Your Brand",
    category: "Branding",
    date: "April 28, 2026"
  },
  {
    image: "https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60",
    title: "Design Thinking in Practice: How to Solve Real User Problems",
    category: "Product Design",
    date: "April 15, 2026"
  }
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-card", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-grid", start: "top 85%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" style={{ background: "var(--black-2)", position: "relative", width: "100%" }}>
      <div className="container section-pad">
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "8vh" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "3vh" }}>— Knowledge Hub</span>
          <h2 style={{ fontFamily: "'Cormorant',serif", fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1.05 }}>
            Latest from the{" "}
            <em style={{ background: "linear-gradient(135deg,#e8c56a,#c9a84c,#8b6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Studio.</em>
          </h2>
          <p style={{ maxWidth: "40vw", margin: "3vh auto 0", fontSize: "clamp(0.9rem, 1.1vw, 1.2rem)", color: "var(--cream-dim)", lineHeight: 1.8 }}>
            Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(25vw, 1fr))", gap: "3vw" }}>
          {posts.map((post, i) => (
            <div key={i} className="blog-card group" style={{ cursor: "none" }}>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "1.5vw", aspectRatio: "16/10", marginBottom: "3vh", border: "1px solid rgba(201,168,76,0.06)", transition: "border-color 0.4s" }} className="group-hover:border-[rgba(201,168,76,0.2)]">
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
                  className="group-hover:scale-105"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", opacity: 0.6, transition: "opacity 0.4s" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5vh" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.7vw", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.8 }}>{post.category}</span>
                <span style={{ fontSize: "0.8vw", color: "rgba(245,240,232,0.4)", fontFamily: "'Outfit', sans-serif" }}>{post.date}</span>
              </div>

              <h3 style={{ fontFamily: "'Cormorant',serif", fontSize: "clamp(20px, 2vw, 36px)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.2, marginBottom: "2.5vh", transition: "color 0.4s" }} className="group-hover:text-[var(--gold)]">
                {post.title}
              </h3>

              <button
                data-cursor="magnetic"
                style={{ display: "flex", alignItems: "center", gap: "0.8vw", background: "none", border: "none", color: "var(--cream-dim)", fontSize: "0.7vw", fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: "0.15em", cursor: "none", transition: "color 0.3s" }}
                className="group-hover:text-white"
              >
                Read Article <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* View All */}
        <div style={{ marginTop: "8vh", textAlign: "center" }}>
          <button
            data-cursor="magnetic"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.8vw", background: "transparent", color: "var(--gold)", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "0.7vw", letterSpacing: "0.15em", textTransform: "uppercase", padding: "2vh 2.5vw", borderRadius: "100vw", border: "1px solid rgba(201,168,76,0.3)", cursor: "none", transition: "all 0.4s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.07)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}
          >
            Visit the Blog <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
