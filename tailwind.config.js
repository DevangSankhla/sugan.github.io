/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Sugan Atelier Apple palette
        sugan: {
          bone: "#FAF8F5",
          "bone-dark": "#EFEAE2",
          ink: "#0F0E0C",
          "ink-soft": "#3C3530",
          gold: "#B68B3F",
          "gold-soft": "#F5EBD8",
          // legacy aliases (kept for incremental migration; prefer the tokens above)
          "gold-light": "#E5BC7A",
          "gold-dark": "#8A6A30",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(56px, 9vw, 144px)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(40px, 6vw, 96px)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(32px, 4vw, 64px)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(24px, 2.5vw, 40px)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.18em" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        body: ["15px", { lineHeight: "1.65", letterSpacing: "0" }],
        "body-sm": ["13px", { lineHeight: "1.5", letterSpacing: "0" }],
        mono: ["12px", { lineHeight: "1.4", letterSpacing: "0.04em" }],
      },
      spacing: {
        "section-y": "clamp(96px, 12vw, 200px)",
        "section-x": "clamp(20px, 5vw, 96px)",
        gutter: "clamp(16px, 2vw, 32px)",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        // shadcn components rely on these tokens — keep them but flatten
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
        "3xl": "4px",
        xs: "2px",
        pill: "9999px",
      },
      boxShadow: {
        hairline: "0 0 0 1px rgb(15 14 12 / 0.08)",
        lift: "0 24px 60px -20px rgb(15 14 12 / 0.12)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        400: "400ms",
        800: "800ms",
        1200: "1200ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        grain: "grain 8s steps(10) infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
