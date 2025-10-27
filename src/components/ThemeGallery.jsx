import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export default function ThemeGallery({ onSelect }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace("3000", "8000");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/themes`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur border border-black/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Saved Themes</h3>
        <button onClick={load} className="inline-flex items-center gap-2 rounded-lg bg-white/70 dark:bg-white/10 px-3 py-2 text-sm border border-black/5">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-300">No themes yet. Create one in the customizer and save it.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect?.(t)}
            className="rounded-xl border border-black/5 overflow-hidden text-left hover:shadow transition"
            style={{ background: `linear-gradient(135deg, ${t.background_from}, ${t.background_to})` }}
          >
            <div className="p-3">
              <div className="h-2 w-10 rounded-full mb-2" style={{ background: t.primary }} />
              <p className="text-sm font-medium" style={{ color: t.text }}>{t.name}</p>
              <p className="text-xs opacity-70" style={{ color: t.text }}>Mode: {t.mode} • Font: {t.font}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
