import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

type ThemeContextType = {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") setIsDark(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  const value = useMemo(() => ({ isDark, setIsDark }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeMode must be used inside ThemeProviderCustom");
  return ctx;
};
