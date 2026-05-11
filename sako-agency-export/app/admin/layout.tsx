"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Users, PieChart, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050505", color: "#f5f0e8", fontFamily: "'Outfit', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", borderRight: "1px solid rgba(201,168,76,0.1)", background: "#0a0908", padding: "32px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "64px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "16px", height: "16px", background: "#c9a84c", borderRadius: "50%" }} />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.2em", color: "#c9a84c" }}>SAKO</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", background: "rgba(201,168,76,0.1)", color: "#c9a84c", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="#" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", color: "rgba(245,240,232,0.6)", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "color 0.3s" }}>
            <PieChart size={18} /> Analytics
          </Link>
          <Link href="#" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", color: "rgba(245,240,232,0.6)", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "color 0.3s" }}>
            <Users size={18} /> Clients
          </Link>
          <Link href="#" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", color: "rgba(245,240,232,0.6)", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "color 0.3s" }}>
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "16px", marginTop: "auto" }}>
          {session.user?.email && (
            <p style={{ fontSize: "12px", color: "rgba(245,240,232,0.4)", marginBottom: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {session.user.email}
            </p>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "none", border: "none", color: "rgba(245,240,232,0.6)", fontSize: "14px", fontWeight: 500, cursor: "pointer", width: "100%" }}
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "48px 64px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
