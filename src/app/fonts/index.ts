import localFont from "next/font/local";

export const newsreader = localFont({
  src: "./newsreader/newsreader-latin-opsz-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-serif",
  adjustFontFallback: "Times New Roman",
  fallback: ["ui-serif", "Georgia", "Times New Roman", "serif"],
});

export const inter = localFont({
  src: "./inter/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: "Arial",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const jetbrainsMono = localFont({
  src: "./jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-mono",
  preload: false,
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "Liberation Mono",
    "monospace",
  ],
});

export const fontVariables = [
  newsreader.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");
