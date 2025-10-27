import { useState } from "react";
import { Palette, Save } from "lucide-react";

const PRESETS = [
  {
    name: "Ocean Breeze",
    primary: "#0ea5e9",
    background_from: "#ecfeff",
    background_to: "#e0f2fe",
    text: "#0b1220",
    mode: "light",
    font: "Inter",
  },
  {
    name: "Midnight Glow",
    primary: "#a78bfa",
    background_from: "#0b0b14",
    background_to: "#111827",
    text: "#f8fafc",
    mode: "dark",
    font: "Geist",
  },
  {
    name: "Sunset Pop",
    primary: "#ef4444",
    background_from: "#fff7ed",
    background_to: "#ffe4e6",
    text: "#1f2937",
    mode: "light",
    font: "Manrope",
  },
];

export default function ThemeCustomizer({ currentTheme, onApply, onSaved }) {
  const [theme, setTheme] = useState(currentTheme);
  const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace("3000", "8000");

  function update(partial) {
    const next = { ...theme, ...partial };
    setTheme(next);
    onApply?.(next);
  }

  async function saveTheme() {
    const res = await fetch(`${API_BASE}/themes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theme),
    });
    const data = await res.json();
    if (res.ok) {
      onSaved?.(data);
    } else {
      alert(data.detail || "Failed to save theme");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Palette className="h-5 w-5" /> Live Theme Customizer
        </h3>
        <button
          onClick={saveTheme}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] text-white px-3 py-2 text-sm font-medium shadow hover:opacity-90 transition"
        >
          <Save className="h-4 w-4" /> Save Theme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-black/5 bg-white/70 dark:bg-white/10 p-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Theme name</label>
          <input
            value={theme.name}
            onChange={(e) => update({ name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-white/10 px-3 py-2 text-sm"
            placeholder="My Theme"
          />
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 dark:bg-white/10 p-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Primary color</label>
          <input type="color" value={theme.primary} onChange={(e) => update({ primary: e.target.value })} className="mt-2 h-10 w-full rounded" />
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 dark:bg-white/10 p-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Background from</label>
          <input type="color" value={theme.background_from} onChange={(e) => update({ background_from: e.target.value })} className="mt-2 h-10 w-full rounded" />
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 dark:bg-white/10 p-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Background to</label>
          <input type="color" value={theme.background_to} onChange={(e) => update({ background_to: e.target.value })} className="mt-2 h-10 w-full rounded" />
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 dark:bg-white/10 p-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Text color</label>
          <input type="color" value={theme.text} onChange={(e) => update({ text: e.target.value })} className="mt-2 h-10 w-full rounded" />
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 dark:bg-white/10 p-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Mode</label>
          <select value={theme.mode} onChange={(e) => update({ mode: e.target.value })} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-white/10 px-3 py-2 text-sm">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 dark:bg-white/10 p-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Font</label>
          <select value={theme.font} onChange={(e) => update({ font: e.target.value })} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-white/10 px-3 py-2 text-sm">
            <option>Inter</option>
            <option>Geist</option>
            <option>Mona Sans</option>
            <option>IBM Plex Sans</option>
            <option>Manrope</option>
          </select>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Quick presets</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => update({ ...p })}
              className="rounded-xl border border-black/5 overflow-hidden text-left hover:shadow transition"
              style={{ background: `linear-gradient(135deg, ${p.background_from}, ${p.background_to})` }}
            >
              <div className="p-3">
                <div className="h-2 w-10 rounded-full mb-2" style={{ background: p.primary }} />
                <p className="text-sm font-medium" style={{ color: p.text }}>{p.name}</p>
                <p className="text-xs opacity-70" style={{ color: p.text }}>Mode: {p.mode}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
