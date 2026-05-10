"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "./ProfileCard";

// Types
interface TeamMember {
  name: string;
  role: string;
  handle: string;
  initials: string;
  color: string;
  bio: string;
  avatar: string;
  category: "Designer" | "Developer" | "Creative";
}

// Data extracted from the component logic
const TEAM_DATA: TeamMember[] = [
  {
    name: "Ali Ahmed",
    role: "Chief Executive Officer",
    handle: "aliahmed",
    initials: "AA",
    color: "#c9a84c",
    bio: "Cybersecurity Expert | Innovation Enthusiast | Web Designer",
    avatar: "https://i.ibb.co/SDv8KMNx/Whats-App-Image-2026-04-23-at-1-LE-upscale-prime.jpg",
    category: "Designer",
  },
  {
    name: "Atif Mumtaz",
    role: "Chief Technology Officer",
    handle: "atifmumtaz",
    initials: "AM",
    color: "#9b4cc9",
    bio: "Full-stack architect obsessed with performance and scalability.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    category: "Developer",
  },
  {
    name: "Adrien Sako",
    role: "Creative Director",
    handle: "adriensako",
    initials: "AS",
    color: "#4c8ec9",
    bio: "Art director who believes beauty and conversion are never opposites.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    category: "Creative",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Register plugin inside useEffect to ensure window is defined
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-card-wrapper",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  // Professional style objects to keep JSX clean
  const headerStyles = {
    title: {
      fontFamily: "'Cormorant', serif",
      fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
      fontWeight: 300,
      lineHeight: 1.05,
    },
    gradientText: {
      background: "linear-gradient(135deg, #e8c56a, #c9a84c, #8b6914)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
  };

  return (
    <section 
      ref={sectionRef} 
      id="team" 
      className="relative py-24" 
      style={{ background: "var(--black-3)" }}
    >
      <div className="container px-6 mx-auto">
        {/* Section Header */}
        <header className="text-center mb-20">
          <span className="eyebrow block mb-5 text-gold uppercase tracking-widest text-sm">— The People</span>
          <h2 style={headerStyles.title}>
            Meet the <em style={headerStyles.gradientText}>studio.</em>
          </h2>
          <p className="max-w-md mx-auto mt-5 text-base leading-relaxed" style={{ color: "var(--cream-dim)" }}>
            A small, senior team. No middlemen — direct access to the people building your future.
          </p>
        </header>

        {/* Responsive Grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEAM_DATA.map((member) => (
            <div key={member.handle} className="team-card-wrapper h-full">
              <ProfileCard
                name={member.name}
                title={member.role}
                bubbleText={member.category}
                handle={member.handle}
                status="Online"
                contactText="Contact"
                avatarUrl={member.avatar}
                miniAvatarUrl={member.avatar}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg, rgba(10, 9, 8, 0.9) 0%, rgba(20, 18, 16, 0.95) 100%)"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}