import { createContext } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    bg: "bg-light",
    bg2: "#eaeaea",
    bg3: "bg-white",
    bg4: "bg-white",
    text: "text-dark",
    text2: "text-muted",
    button: "outline-secondary",
    button2: "secondary",
    submit: "#0CCA98",
    submit2: "#CBC3E3",
    table: "white",
    close: null,
    labels: "gray",
    tab: "bg-white border-white",
  },
  dark: {
    bg: "bg-dark",
    bg2: "#6c757d",
    bg3: "bg-dark",
    bg4: "bg-secondary",
    text: "text-white",
    text2: "text-light",
    button: "outline-light",
    button2: "light",
    submit: "#3CAE63",
    submit2: "#50A8B7",
    table: "dark",
    close: "white",
    labels: "white",
    tab: "bg-dark border-dark",
  },
};

export { ThemeContext, themes };
