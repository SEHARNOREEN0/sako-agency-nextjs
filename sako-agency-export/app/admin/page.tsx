"use client";
import React from "react";
import MagicBento from "@/components/MagicBento";
import { TrendingUp, Users, DollarSign, Activity, Eye, MousePointerClick } from "lucide-react";

const analyticsData = [
  {
    title: "Total Revenue",
    description: "+14.5% from last month. Recurring MRR is stabilizing.",
    label: "$124,500",
    icon: <DollarSign size={24} strokeWidth={1.5} />,
    color: "rgba(201, 168, 76, 0.05)",
  },
  {
    title: "Active Users",
    description: "Peak activity observed during 10am-2pm EST.",
    label: "1,245",
    icon: <Users size={24} strokeWidth={1.5} />,
    color: "rgba(201, 168, 76, 0.05)",
  },
  {
    title: "Conversion Rate",
    description: "Checkout flow optimizations yielded a 2% lift.",
    label: "4.2%",
    icon: <TrendingUp size={24} strokeWidth={1.5} />,
    color: "rgba(201, 168, 76, 0.05)",
  },
  {
    title: "System Health",
    description: "All services running flawlessly.",
    label: "99.9% Uptime",
    icon: <Activity size={24} strokeWidth={1.5} />,
    color: "rgba(201, 168, 76, 0.05)",
  },
  {
    title: "Page Views",
    description: "Traffic from social campaigns increased by 30%.",
    label: "84,000",
    icon: <Eye size={24} strokeWidth={1.5} />,
    color: "rgba(201, 168, 76, 0.05)",
  },
  {
    title: "Click-Throughs",
    description: "Hero CTA is the primary conversion driver.",
    label: "12,400",
    icon: <MousePointerClick size={24} strokeWidth={1.5} />,
    color: "rgba(201, 168, 76, 0.05)",
  },
];

export default function AdminDashboard() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 400, color: "var(--cream)", marginBottom: "8px" }}>
            Overview
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: "var(--cream-dim)", fontSize: "16px" }}>
            Real-time insights and analytics for your agency.
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "10px 20px", borderRadius: "100px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--cream)", fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
            Export PDF
          </button>
          <button style={{ padding: "10px 20px", borderRadius: "100px", background: "var(--gold)", border: "none", color: "var(--black)", fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
            Generate Report
          </button>
        </div>
      </header>

      {/* Analytics Grid using MagicBento for premium look */}
      <MagicBento 
        cards={analyticsData}
        glowColor="201, 168, 76"
        particleCount={8}
        spotlightRadius={350}
        enableStars={true}
        enableTilt={true}
      />
    </div>
  );
}
