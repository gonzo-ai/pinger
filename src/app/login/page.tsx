"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      redirect: "follow",
    });

    if (res.ok) {
      window.location.href = "/";
    } else if (!res.ok) {
      setError("Wrong email or password");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg, #f5f3ef)",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "48px",
        background: "#ffffff",
        border: "1px solid #e5e0d8",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: "320px",
      }}>
        <div style={{
          width: "48px", height: "48px",
          background: "#3ECF8E",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: "22px", fontWeight: 700,
        }}>S</div>

        <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1917", margin: 0 }}>
          Supabase Pinger
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          <input
            name="email" type="email" placeholder="Email" autoFocus required
            style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e0d8", borderRadius: "6px", fontSize: "14px", background: "#f5f3ef", boxSizing: "border-box" }}
          />
          <input
            name="password" type="password" placeholder="Password" required
            style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e0d8", borderRadius: "6px", fontSize: "14px", background: "#f5f3ef", boxSizing: "border-box" }}
          />
          {error && <p style={{ fontSize: "13px", color: "#dc2626", textAlign: "center", margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            padding: "11px", background: loading ? "#9ca3af" : "#3ECF8E",
            color: "white", borderRadius: "6px", fontSize: "14px",
            fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", border: "none",
          }}>
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
