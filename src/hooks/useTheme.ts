// hooks/useTheme.js
import { useState, useEffect } from "react";

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "night" : "light";
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const setTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return { currentTheme, toggleTheme, setTheme };
};

export default useTheme;
