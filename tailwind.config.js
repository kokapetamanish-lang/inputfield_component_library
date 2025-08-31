/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* slate-200 / slate-700 */
        input: "var(--color-input)", /* slate-50 / slate-800 */
        ring: "var(--color-ring)", /* blue-600 / blue-500 */
        background: "var(--color-background)", /* white / slate-900 */
        foreground: "var(--color-foreground)", /* slate-900 / slate-50 */
        primary: {
          DEFAULT: "var(--color-primary)", /* blue-600 / blue-500 */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* slate-500 */
          foreground: "var(--color-secondary-foreground)", /* white / slate-50 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-600 / red-500 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* slate-50 / slate-800 */
          foreground: "var(--color-muted-foreground)", /* slate-600 / slate-400 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* sky-500 */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white / slate-800 */
          foreground: "var(--color-popover-foreground)", /* slate-900 / slate-50 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white / slate-800 */
          foreground: "var(--color-card-foreground)", /* slate-900 / slate-50 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-600 / emerald-500 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-600 / amber-500 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-600 / red-500 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: "var(--color-surface)", /* slate-50 / slate-800 */
        "text-primary": "var(--color-text-primary)", /* slate-900 / slate-50 */
        "text-secondary": "var(--color-text-secondary)", /* slate-600 / slate-400 */
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer": "shimmer 1.5s infinite",
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
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        'micro': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '120': '120ms',
        '150': '150ms',
        '200': '200ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}