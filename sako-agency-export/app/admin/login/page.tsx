"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/admin/requests");
        router.refresh();
      }
    } else {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        router.push("/admin/requests");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to register");
        setLoading(false);
      }
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/admin/requests" });
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: "4px", padding: "16px 20px", color: "var(--cream)", fontSize: "14px",
    fontFamily: "'DM Sans',sans-serif", outline: "none", marginBottom: "16px"
  };

  const btnStyle = {
    width: "100%", background: "var(--gold)", color: "var(--black)",
    padding: "16px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer",
    border: "none", marginTop: "10px"
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--black)", color: "white" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "40px", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", background: "rgba(255,255,255,0.02)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center", fontFamily: "'Playfair Display', serif" }}>
          {isLogin ? "Admin Login" : "Admin Sign Up"}
        </h2>
        
        {error && <p style={{ color: "red", textAlign: "center", marginBottom: "16px", fontSize: "14px" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          )}
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          
          <button type="submit" disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div style={{ margin: "20px 0", textAlign: "center", fontSize: "12px", color: "gray" }}>OR</div>

        <button onClick={handleGoogle} style={{ ...btnStyle, background: "white" }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </span>
        </button>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "var(--cream-dim)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: "var(--gold)", cursor: "pointer" }}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}
