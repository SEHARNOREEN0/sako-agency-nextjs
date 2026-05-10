"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import ScrollFloat from "@/components/ui/ScrollFloat";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = ["Web Design & Dev", "UI / UX Design", "SEO & Growth", "Brand & Graphics", "AR Experience", "AI Integration", "Full Studio Retainer"];
const budgets = ["$5k – $15k", "$15k – $30k", "$30k – $75k", "$75k+"];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-left", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
      });
      gsap.fromTo(".contact-right", { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: "4px", padding: "20px 24px", color: "var(--cream)", fontSize: "15px",
    fontFamily: "'DM Sans',sans-serif", fontWeight: 300, outline: "none",
    transition: "border-color 0.3s, background 0.3s",
  };

  return (
    <section ref={sectionRef} id="contact" className="grain" style={{ position: "relative", background: "var(--black-2)", overflow: "hidden" }}>
      {/* Top ambient glow */}
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="container section-pad">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>— Let's Build Something</span>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="mb-0 max-w-[700px] mx-auto"
            textClassName="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05]"
          >
            Ready to evolve your business?
          </ScrollFloat>
          <p style={{ maxWidth: "480px", margin: "20px auto 0", fontSize: "16px", color: "var(--cream-dim)", lineHeight: 1.8 }}>
            We take on 4–6 new projects per quarter. Tell us about yours — we respond within 24 hours.
          </p>
          {/* Availability badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "20px", border: "1px solid rgba(76,201,126,0.25)", background: "rgba(76,201,126,0.05)", padding: "8px 20px", borderRadius: "100px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4cc97e" }} className="animate-pulse-gold" />
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4cc97e" }}>2 Spots Open — Q3 2026</span>
          </div>
        </div>

        {/* Two-col grid */}
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "64px", alignItems: "start" }}>
          {/* Left — info */}
          <div className="contact-left">
            <div style={{ marginBottom: "48px" }}>
              <h3 style={{ fontFamily: "'Cormorant',serif", fontSize: "32px", fontWeight: 400, marginBottom: "16px" }}>Start the Conversation</h3>
              <p style={{ fontSize: "14px", color: "var(--cream-dim)", lineHeight: 1.8 }}>
                Whether you're a startup ready to make noise, or an established brand that needs reinvention — we're built for this.
              </p>
            </div>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
              {[
                { icon: Mail, label: "Email", value: "hello@sako.agency" },
                { icon: MapPin, label: "Location", value: "Lahore, Pakistan · Remote Worldwide" },
                { icon: Clock, label: "Response", value: "Within 24 hours" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <item.icon size={15} color="var(--gold)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontSize: "13px", color: "var(--cream-dim)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative large text */}
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="mt-auto"
              textClassName="font-display text-[rgba(201,168,76,0.15)] tracking-[-0.03em] select-none uppercase !font-light text-[clamp(5rem,10vw,9rem)] leading-[0.9]"
            >
              SAKO
            </ScrollFloat>
          </div>

          {/* Right — form */}
          <div className="contact-right">
            {sent ? (
              <div style={{ textAlign: "center", padding: "80px 40px", border: "1px solid rgba(76,201,126,0.2)", borderRadius: "4px", background: "rgba(76,201,126,0.03)" }}>
                <div style={{ fontFamily: "'Cormorant',serif", fontSize: "64px", color: "#4cc97e", marginBottom: "20px" }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant',serif", fontSize: "32px", fontWeight: 400, marginBottom: "12px" }}>Message received.</h3>
                <p style={{ fontSize: "14px", color: "var(--cream-dim)", lineHeight: 1.8 }}>We'll review your project and respond within 24 hours. Get excited.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Name + Company row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {(["name", "company"] as const).map(f => (
                    <div key={f}>
                      <label style={{ display: "block", fontFamily: "'Syne',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: "8px" }}>
                        {f === "name" ? "Full Name *" : "Company"}
                      </label>
                      <input
                        name={f} value={form[f]} onChange={handleChange}
                        required={f === "name"} placeholder={f === "name" ? "Your name" : "Company name"}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = "rgba(201,168,76,0.5)"; e.target.style.background = "rgba(201,168,76,0.03)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.15)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontFamily: "'Syne',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: "8px" }}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "rgba(201,168,76,0.5)"; e.target.style.background = "rgba(201,168,76,0.03)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.15)"; e.target.style.background = "rgba(255,255,255,0.03)"; }} />
                </div>

                {/* Service + Budget row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {([
                    { name: "service", label: "Service *", options: services, placeholder: "Select service" },
                    { name: "budget", label: "Budget", options: budgets, placeholder: "Select budget" },
                  ] as const).map(f => (
                    <div key={f.name}>
                      <label style={{ display: "block", fontFamily: "'Syne',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: "8px" }}>{f.label}</label>
                      <select name={f.name} value={form[f.name as "service" | "budget"]} onChange={handleChange}
                        required={f.name === "service"}
                        style={{ ...inputStyle, cursor: "none", appearance: "none" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(201,168,76,0.5)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.15)"; }}>
                        <option value="" disabled style={{ background: "var(--black-2)" }}>{f.placeholder}</option>
                        {f.options.map(o => <option key={o} value={o} style={{ background: "var(--black-2)" }}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: "block", fontFamily: "'Syne',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: "8px" }}>Tell us about your project *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                    placeholder="What are you building? What's the goal? Any challenges?"
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    onFocus={e => { e.target.style.borderColor = "rgba(201,168,76,0.5)"; e.target.style.background = "rgba(201,168,76,0.03)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.15)"; e.target.style.background = "rgba(255,255,255,0.03)"; }} />
                </div>

                {/* Submit */}
                <button type="submit" disabled={sending}
                  data-cursor="magnetic"
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", background: sending ? "rgba(201,168,76,0.5)" : "var(--gold)", color: "var(--black)", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "20px 40px", borderRadius: "4px", border: "none", cursor: "none", transition: "transform 0.3s,box-shadow 0.3s,background 0.3s", marginTop: "8px" }}
                  onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 50px -10px rgba(201,168,76,0.4)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  {sending ? (
                    <span>Sending...</span>
                  ) : (
                    <><span>Send Project Brief</span><ArrowRight size={15} strokeWidth={2.5} /></>
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: "11px", color: "rgba(245,240,232,0.25)", marginTop: "8px" }}>
                  No spam. No pressure. Just a conversation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
