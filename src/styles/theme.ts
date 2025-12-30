import { FONT } from "./font";

export const theme = {
  colors: {
    primary: "#4F9CFF",
    secondary: "#1E1E1E",
    background: "#0D0D0D",
    text: "#FFFFFF",
    muted: "#888888",
  },

  font: {
    /* 
      Default font choices.
      You can redefine these later when you finalize your typography structure.
      body = main paragraph text
      heading = titles/headings
    */
    body: FONT.oktaNeue,      // current default for body text
    heading: FONT.alphaLyrae, // current default for headings
    code: "'JetBrains Mono', monospace",
  },

  spacing: (factor: number) => `${factor * 8}px`,

  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },
};

export type ThemeType = typeof theme;