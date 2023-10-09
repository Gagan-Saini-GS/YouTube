import { createContext } from "react";

const ThemeContext = createContext({
  theme: "dark",
});

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
