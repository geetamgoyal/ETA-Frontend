/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Brand / Primary ────────────────────────────────────
        "primary": "#002046",
        "primary-container": "#1b365d",
        "on-primary": "#ffffff",
        "on-primary-container": "#93b6e0",
        "primary-fixed": "#d6e3ff",
        "primary-fixed-dim": "#aec7f7",
        "on-primary-fixed": "#001b3d",
        "on-primary-fixed-variant": "#2e476f",
        "inverse-primary": "#aec7f7",

        // ── Secondary / Interactive ─────────────────────────────
        "secondary": "#0369a1",
        "secondary-container": "#38b2f7",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#003554",
        "secondary-fixed": "#cde5ff",
        "secondary-fixed-dim": "#90caff",
        "on-secondary-fixed": "#001d32",
        "on-secondary-fixed-variant": "#004b74",

        // ── Tertiary ────────────────────────────────────────────
        "tertiary": "#1d2123",
        "tertiary-container": "#333638",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#9c9fa1",
        "tertiary-fixed": "#e0e3e5",
        "tertiary-fixed-dim": "#c4c7c9",
        "on-tertiary-fixed": "#191c1e",
        "on-tertiary-fixed-variant": "#444749",

        // ── Surfaces (operational light theme) ─────────────────
        "surface": "#f0f4f9",
        "surface-dim": "#c8d6e8",
        "surface-bright": "#f8fafc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f7fb",
        "surface-container": "#edf1f8",
        "surface-container-high": "#e2e9f3",
        "surface-container-highest": "#d8e3ef",
        "surface-variant": "#dde3ef",
        "on-surface": "#0f172a",
        "on-surface-variant": "#475569",
        "inverse-surface": "#1e2a3a",
        "inverse-on-surface": "#edf2f9",
        "surface-tint": "#3b5a88",
        "background": "#f0f4f9",
        "on-background": "#0f172a",

        // ── Borders ─────────────────────────────────────────────
        "outline": "#64748b",
        "outline-variant": "#cbd5e1",

        // ── Error ───────────────────────────────────────────────
        "error": "#c41c1c",
        "error-container": "#fee2e2",
        "on-error": "#ffffff",
        "on-error-container": "#7b0000",

        // ── Operational Status Colors ───────────────────────────
        "status-ok":              "#16a34a",
        "status-ok-bg":           "#f0fdf4",
        "status-ok-border":       "#bbf7d0",
        "status-ok-text":         "#15803d",
        "status-warn":            "#d97706",
        "status-warn-bg":         "#fffbeb",
        "status-warn-border":     "#fde68a",
        "status-warn-text":       "#b45309",
        "status-critical":        "#dc2626",
        "status-critical-bg":     "#fef2f2",
        "status-critical-border": "#fecaca",
        "status-critical-text":   "#b91c1c",
        "status-info":            "#2563eb",
        "status-info-bg":         "#eff6ff",
        "status-info-border":     "#bfdbfe",
        "status-info-text":       "#1d4ed8",
        "status-ai":              "#7c3aed",
        "status-ai-bg":           "#f5f3ff",
        "status-ai-border":       "#ddd6fe",
        "status-ai-text":         "#6d28d9",
        "status-recovery":        "#0891b2",
        "status-recovery-bg":     "#ecfeff",
        "status-recovery-border": "#a5f3fc",
        "status-recovery-text":   "#0e7490",

        // ── Alert System ────────────────────────────────────────
        "alert-critical":    "#dc2626",
        "alert-critical-bg": "#fef2f2",
        "alert-warning":     "#d97706",
        "alert-warning-bg":  "#fffbeb",
        "alert-recovery":    "#059669",
        "alert-recovery-bg": "#ecfdf5",
        "accent-green":      "#059669",
        "accent-orange":     "#d97706",
        "ai-accent":         "#7c3aed",
      },

      borderRadius: {
        DEFAULT: "0.25rem",
        none:    "0",
        sm:      "0.1875rem",
        md:      "0.375rem",
        lg:      "0.5rem",
        xl:      "0.75rem",
        "2xl":   "1rem",
        full:    "9999px",
      },

      spacing: {
        base:   "4px",
        xs:     "4px",
        sm:     "8px",
        md:     "16px",
        lg:     "24px",
        xl:     "32px",
        gutter: "16px",
        margin: "20px",
      },

      fontFamily: {
        sans:          ["Inter", "system-ui", "sans-serif"],
        display:       ["Inter", "sans-serif"],
        body:          ["Inter", "sans-serif"],
        mono:          ["JetBrains Mono", "ui-monospace", "monospace"],
        "display-lg":  ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "body-lg":     ["Inter", "sans-serif"],
        "body-md":     ["Inter", "sans-serif"],
        "label-md":    ["Inter", "sans-serif"],
        "mono-data":   ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      fontSize: {
        "display-lg":  ["2rem",     { lineHeight: "2.5rem",   fontWeight: "800" }],
        "headline-lg": ["1.25rem",  { lineHeight: "1.75rem",  fontWeight: "700" }],
        "headline-md": ["1.0625rem",{ lineHeight: "1.5rem",   fontWeight: "700" }],
        "headline-sm": ["0.9375rem",{ lineHeight: "1.375rem", fontWeight: "600" }],
        "body-lg":     ["0.9375rem",{ lineHeight: "1.5rem"  }],
        "body-md":     ["0.875rem", { lineHeight: "1.375rem"}],
        "label-md":    ["0.75rem",  { lineHeight: "1.125rem"}],
        "label-sm":    ["0.6875rem",{ lineHeight: "1rem",     fontWeight: "600" }],
      },

      boxShadow: {
        xs:      "0 1px 2px 0 rgba(15,23,42,0.04)",
        sm:      "0 1px 3px 0 rgba(15,23,42,0.06)",
        DEFAULT: "0 2px 4px 0 rgba(15,23,42,0.06)",
        md:      "0 4px 8px -2px rgba(15,23,42,0.08)",
        lg:      "0 8px 16px -4px rgba(15,23,42,0.08)",
        ambient: "0 2px 12px -2px rgba(15,23,42,0.05)",
        hover:   "0 6px 20px -4px rgba(15,23,42,0.10)",
        panel:   "0 1px 0 0 rgba(15,23,42,0.06)",
      },

      animation: {
        "fade-in":      "fadeIn 0.18s ease-out both",
        "fade-up":      "fadeUp 0.22s ease-out both",
        "slide-in-l":   "slideInLeft 0.2s ease-out both",
        "pulse-subtle": "pulseSubtle 2.5s cubic-bezier(0.4,0,0.6,1) infinite",
        "bar-grow":     "barGrow 0.6s ease-out both",
        "spin-slow":    "spin 1.8s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.55" },
        },
        barGrow: {
          "0%":   { transform: "scaleY(0)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom" },
        },
      },
    },
  },
  plugins: [],
};
