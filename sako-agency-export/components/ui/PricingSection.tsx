"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ─────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.pw-root *, .pw-root *::before, .pw-root *::after { box-sizing: border-box; }

.pw-root {
  font-family: 'Inter', sans-serif;
  background: #050505;
  color: #f5f0e8;
  min-height: 100vh;
  position: relative;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

/* ── Background ── */
.pw-mesh {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 20% 10%, rgba(201,168,76,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201,168,76,0.05) 0%, transparent 60%),
    radial-gradient(ellipse 40% 60% at 60% 30%, rgba(201,168,76,0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}
.pw-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
}
.pw-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.008) 2px,
    rgba(255,255,255,0.008) 4px
  );
  pointer-events: none;
  z-index: 0;
}
.pw-dots {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(201,168,76,0.12) 0%, transparent 45%);
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

/* ── Inner ── */
.pw-inner {
  position: relative;
  z-index: 10;
  padding: 10vh 4vw;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6vh;
}

/* ── Header ── */
.pw-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
}
.pw-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.8vw;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7vw;
  min-font-size: 11px;
  color: rgba(201,168,76,0.85);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.pw-eyebrow-line {
  width: 2vw;
  height: 1px;
  background: rgba(201,168,76,0.45);
}
.pw-title {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(2.4rem, 4.5vw, 3.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin: 0;
  color: #f5f0e8;
}
.pw-subtitle {
  font-size: 1vw;
  min-font-size: 14px;
  color: rgba(245,240,232,0.4);
  line-height: 1.7;
  max-width: 40vw;
  margin: 0;
}

/* ── Card wrapper ── */
.pw-card-wrap {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 2.5vw;
  align-items: stretch;
}
.pw-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5vw;
  padding: 4vh 2.5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.pw-card.featured {
  transform: scale(1.03);
  z-index: 1;
  border-color: transparent;
  background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05)) padding-box,
    linear-gradient(90deg, rgba(201,168,76,0.35), rgba(255,255,255,0.12)) border-box;
  border: 1px solid transparent;
  box-shadow: 0 30px 80px rgba(0,0,0,0.32);
}
.pw-card:hover {
  box-shadow: 0 30px 90px rgba(0,0,0,0.35);
}
.pw-card-intro {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  min-height: 25vh;
}
.pw-card-body {
  display: flex;
  flex-direction: column;
  gap: 3vh;
}
.pw-card-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1vw;
}
.pw-card-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 2vw;
  min-font-size: 24px;
  color: #f5f0e8;
  line-height: 1;
}
.pw-plan-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7vw;
  min-font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(232,234,242,0.35);
  margin-bottom: 1vh;
}
.pw-plan-price {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 3.5vw;
  min-font-size: 40px;
  letter-spacing: -0.04em;
  color: #c9a84c;
  line-height: 1;
  margin: 0;
}
.pw-plan-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9vw;
  min-font-size: 14px;
  color: rgba(245,240,232,0.68);
  line-height: 1.8;
  margin: 0;
}
.pw-divider {
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin: 3vh 0;
}
.pw-btn-ghost {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8vw;
  min-font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1.5vh 1.8vw;
  border-radius: 1vw;
  background: transparent;
  border: 1px solid rgba(201,168,76,0.30);
  color: rgba(245,240,232,0.85);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}
.pw-btn-ghost:hover {
  background: rgba(201,168,76,0.14);
  border-color: rgba(201,168,76,0.55);
  color: #f5f0e8;
}
.pw-btn-primary {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.8vw;
  min-font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1.5vh 1.8vw;
  border-radius: 1vw;
  background: #c9a84c;
  border: none;
  color: #050505;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
}
.pw-btn-primary:hover {
  background: #e8c56a;
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(201,168,76,0.24);
}
.pw-btn-outline {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8vw;
  min-font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1.5vh 1.8vw;
  border-radius: 1vw;
  background: transparent;
  border: 1px solid rgba(201,168,76,0.30);
  color: rgba(245,240,232,0.82);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}
.pw-btn-outline:hover {
  background: rgba(255,255,255,0.03);
  border-color: rgba(201,168,76,0.55);
  color: #f5f0e8;
}
.pw-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  font-family: 'Inter', sans-serif;
  font-size: 0.8vw;
  min-font-size: 13px;
  line-height: 1.75;
  color: rgba(245,240,232,0.72);
}
.pw-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.8vw;
}
.pw-feat-icon {
  width: 1.2vw;
  height: 1.2vw;
  min-width: 18px;
  min-height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(201,168,76,0.18);
}
.pw-pro {
  display: contents;
}
.pw-chart-card {
  border-radius: 1.2vw;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 25vh;
}
.pw-chart-body {
  flex: 1;
  padding: 1.5vh 1vw 1vw;
}
.pw-chart-header {
  padding: 0 0 1.5vh 0;
  text-align: center;
}
.pw-chart-sub {
  font-size: 0.7vw;
  min-font-size: 11px;
  color: rgba(245,240,232,0.45);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Specific styling for the Professional card title */
.featured .pw-card-title {
  font-family: 'Cormorant', serif;
  font-weight: 300;
  font-style: italic;
  font-size: 2.8vw;
  min-font-size: 32px;
  background: linear-gradient(135deg, #f5f0e8 0%, #c9a84c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.01em;
}

.pw-card-footer {
  margin-top: auto;
}
.pw-footnote {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  font-family: 'Inter', sans-serif;
  font-size: 0.8vw;
  min-font-size: 13px;
  color: rgba(245,240,232,0.26);
  letter-spacing: 0.08em;
}
.pw-footnote-dot {
  width: 0.3vw; height: 0.3vw;
  min-width: 3px; min-height: 3px;
  border-radius: 50%;
  background: rgba(245,240,232,0.15);
}

@media (max-width: 1200px) {
  .pw-card-wrap { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 900px) {
  .pw-card-wrap { grid-template-columns: 1fr; }
  .pw-inner { padding: 8vh 4vw; }
  .pw-card { padding: 4vh 6vw; }
}

/* ── Toggle Switch ── */
.pw-toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2vw;
  margin-bottom: 5vh;
}
.pw-toggle-label {
  font-size: 0.8vw;
  min-font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: rgba(245,240,232,0.7);
}
.pw-toggle-label.active {
  color: #f5f0e8;
  font-weight: 600;
}
.pw-toggle-switch {
  position: relative;
  width: 4vw;
  min-width: 60px;
  height: 2vw;
  min-height: 30px;
  background: rgba(201,168,76,0.15);
  border: 1px solid rgba(201,168,76,0.25);
  border-radius: 100vw;
  cursor: pointer;
  transition: all 0.3s ease;
}
.pw-toggle-switch.active {
  background: rgba(201,168,76,0.25);
}
.pw-toggle-thumb {
  position: absolute;
  top: 0.2vw;
  left: 0.2vw;
  width: 1.6vw;
  min-width: 24px;
  height: 1.6vw;
  min-height: 24px;
  background: #c9a84c;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.pw-toggle-switch.active .pw-toggle-thumb {
  transform: translateX(1.8vw);
}
.pw-discount-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5vw;
  padding: 0.5vh 0.8vw;
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 0.5vw;
  font-size: 0.7vw;
  min-font-size: 11px;
  font-family: 'Inter', sans-serif;
  color: #c9a84c;
  margin-left: 0.8vw;
}

/* ── Counter Animation ── */
.pw-price-counter {
  font-variant-numeric: tabular-nums;
}
`;

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const PRICING_DATA = {
  monthly: {
    free: 0,
    pro: 299,
  },
  annual: {
    free: 0,
    pro: 2990,
  },
};

const chartData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 150 },
  { month: "Apr", users: 210 },
  { month: "May", users: 250 },
  { month: "Jun", users: 300 },
  { month: "Jul", users: 280 },
  { month: "Aug", users: 320 },
  { month: "Sep", users: 340 },
  { month: "Oct", users: 390 },
  { month: "Nov", users: 420 },
  { month: "Dec", users: 500 },
];

const FREE_FEATURES = [
  "Up to 3 team members",
  "5GB secure storage",
  "Community support",
];

const CUSTOM_FEATURES = [
  "White-label solutions available",
  "Unlimited cloud storage & bandwidth",
  "Dedicated account manager",
  "24/7 priority support & SLA",
  "Custom development & integration",
  "Advanced security & compliance",
  "On-premise deployment options",
  "Training & onboarding support",
  "Quarterly business reviews",
  "Performance optimization & scaling",
];

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <span className="pw-feat-icon">
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path
        d="M1.8 4.5L3.6 6.3L7.2 2.7"
        stroke="#c9a84c"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const ChartTooltipContent = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="pw-tooltip">
      <div className="pw-tooltip-label">{label}</div>
      <div className="pw-tooltip-val">{payload[0].value.toLocaleString()} users</div>
    </div>
  );
};

const PriceCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div className="pw-price-counter">
      ${displayValue.toLocaleString()}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────
export default function PricingWithChart() {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (tier: "free" | "pro") => {
    return isAnnual ? PRICING_DATA.annual[tier] : PRICING_DATA.monthly[tier];
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="pw-root">
        <div className="pw-mesh" />
        <div className="pw-noise" />
        <div className="pw-scanlines" />
        <div className="pw-dots" />

        <div className="pw-inner">

          {/* ── Header ── */}
          <motion.div
            className="pw-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pw-eyebrow">
              <span className="pw-eyebrow-line" />
              Pricing
              <span className="pw-eyebrow-line" />
            </div>
            <h1 className="pw-title">Pricing that Scales with You</h1>
            <p className="pw-subtitle">
              Choose the perfect plan for your team. Transparent pricing with no hidden fees—upgrade or downgrade anytime.
            </p>
          </motion.div>

          {/* ── Pricing Cards ── */}
          <motion.div
            className="pw-card-wrap"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >

            <article className="pw-card">
              <div className="pw-card-intro">
                <div className="pw-plan-label">Tier 00</div>
                <div className="pw-card-title">Free</div>
                <div className="pw-plan-price">
                  <PriceCounter value={getPrice("free")} />
                </div>
                <p className="pw-plan-desc">Get started with essential tools and effortless onboarding.</p>
              </div>

              <div className="pw-card-body">
                <div className="pw-divider" />
                <ul className="pw-features">
                  {FREE_FEATURES.map((f, i) => (
                    <li key={i} className="pw-feature-item">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pw-card-footer">
                <button className="pw-btn-ghost" style={{ gridColumn: "1 / -1" }}>Get Started</button>
              </div>
            </article>

            <article className="pw-card featured" style={{ position: "relative" }}>
              {/* ── Toggle Switch moved to corner ── */}
              <div
                className="pw-toggle-container"
                style={{
                  position: "absolute",
                  top: "1.5vh",
                  right: "1vw",
                  margin: 0,
                  zIndex: 20,
                  transform: "scale(0.75)",
                  transformOrigin: "top right",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.5vh"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className={`pw-toggle-label ${!isAnnual ? "active" : ""}`} style={{ fontSize: "10px" }}>Monthly</span>
                  <div
                    className={`pw-toggle-switch ${isAnnual ? "active" : ""}`}
                    onClick={() => setIsAnnual(!isAnnual)}
                    role="switch"
                    aria-checked={isAnnual}
                  >
                    <div className="pw-toggle-thumb" />
                  </div>
                  <span className={`pw-toggle-label ${isAnnual ? "active" : ""}`} style={{ fontSize: "10px" }}>Annual</span>
                </div>
                
                {isAnnual && (
                  <motion.div
                    className="pw-discount-badge"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ margin: 0, fontSize: "9px", padding: "2px 6px" }}
                  >
                    Save 17%
                  </motion.div>
                )}
              </div>

              <div className="pw-card-intro">
                <div className="pw-plan-label">Tier 01</div>
                <div className="pw-card-title">Professional</div>
                <div className="pw-plan-price">
                  <PriceCounter value={getPrice("pro")} />
                </div>
                <p className="pw-plan-desc">Perfect for small businesses & startups.</p>
              </div>

              <div className="pw-card-body">
                <div className="pw-chart-card">
                  <div className="pw-chart-header">
                    <div className="pw-chart-sub">Plan Popularity</div>
                  </div>
                  <div className="pw-chart-body">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 4, right: 12, left: -28, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="pw-line-grad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(201,168,76,0.2)" />
                            <stop offset="50%" stopColor="#c9a84c" />
                            <stop offset="100%" stopColor="rgba(201,168,76,0.2)" />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          vertical={false}
                          stroke="rgba(245,240,232,0.05)"
                          strokeDasharray="3 3"
                        />
                        <XAxis
                          dataKey="month"
                          tick={{
                            fill: "rgba(245,240,232,0.3)",
                            fontSize: 10,
                            fontFamily: "Inter",
                          }}
                          axisLine={false}
                          tickLine={false}
                          tickMargin={6}
                        />
                        <YAxis hide />
                        <Tooltip
                          content={<ChartTooltipContent />}
                          cursor={{
                            stroke: "rgba(201,168,76,0.15)",
                            strokeWidth: 1,
                            strokeDasharray: "3 3",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="url(#pw-line-grad)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{
                            r: 4,
                            fill: "#c9a84c",
                            stroke: "rgba(201,168,76,0.3)",
                            strokeWidth: 4,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="pw-card-footer">
                <button className="pw-btn-primary">Start Now</button>
                <button className="pw-btn-outline">Free trial</button>
              </div>
            </article>

            <article className="pw-card">
              <div className="pw-card-intro">
                <div className="pw-plan-label">Tier 02</div>
                <div className="pw-card-title">Custom</div>
                <p className="pw-plan-desc">Tailored solutions designed for your most ambitious goals.</p>
              </div>

              <div className="pw-card-body">
                <div className="pw-divider" />
                <ul className="pw-features">
                  {CUSTOM_FEATURES.map((f, i) => (
                    <li key={i} className="pw-feature-item">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pw-card-footer">
                <button className="pw-btn-ghost">Contact Sales</button>
                <button className="pw-btn-ghost">Schedule Demo</button>
              </div>
            </article>
          </motion.div>

          {/* ── Footer ── */}
          <motion.div
            className="pw-footnote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span>{isAnnual ? "Billed annually" : "Billed monthly"}</span>
            <span className="pw-footnote-dot" />
            <span>Cancel anytime</span>
            <span className="pw-footnote-dot" />
            <span>No credit card required</span>
            <span className="pw-footnote-dot" />
            <span>SOC 2 Type II certified</span>
          </motion.div>

        </div>
      </div>
    </>
  );
}
