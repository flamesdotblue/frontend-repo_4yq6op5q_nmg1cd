import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TranslatorForm from "./components/TranslatorForm";
import ThemeCustomizer from "./components/ThemeCustomizer";
import ThemeGallery from "./components/ThemeGallery";

const DEFAULT_THEME = {
  name: "Indigo Dream",
  primary: "#4f46e5",
  background_from: "#ffffff",
  background_to: "#eef2ff",
  text: "#0b1220",
  mode: "light",
  font: "Inter",
};

export default function App() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [showCustomizer, setShowCustomizer] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("translator.theme");
    if (saved) setTheme(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("translator.theme", JSON.stringify(theme));
  }, [theme]);

  const wrapperStyle = useMemo(() => ({
    "--primary": theme.primary,
    "--text": theme.text,
    fontFamily: theme.font,
    backgroundImage: `linear-gradient(135deg, ${theme.background_from}, ${theme.background_to})`,
  }), [theme]);

  return (
    <div className={theme.mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen transition-colors" style={wrapperStyle}>
        <div className="mx-auto max-w-6xl px-4">
          <Header onOpenCustomizer={() => setShowCustomizer(true)} />

          <main className="py-6 space-y-6">
            <TranslatorForm />
            <ThemeGallery onSelect={(t) => setTheme(t)} />

            {showCustomizer && (
              <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur border border-black/5 p-5">
                <ThemeCustomizer
                  currentTheme={theme}
                  onApply={(t) => setTheme(t)}
                  onSaved={(t) => {
                    setTheme(t);
                    setShowCustomizer(false);
                  }}
                />
              </div>
            )}
          </main>

          <footer className="py-10 text-center text-sm text-gray-600 dark:text-gray-300">
            Built with love • Customize freely
          </footer>
        </div>
      </div>
    </div>
  );
}
