import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const LANGS = [
  { code: "auto", name: "Auto" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
];

export default function TranslatorForm() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("en");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace("3000", "8000");

  async function handleTranslate() {
    setError("");
    setResult("");
    if (!text.trim()) {
      setError("Please enter some text to translate.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source, target }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Translation failed");
      setResult(data.translated);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur border border-black/5 p-4">
        <div className="flex gap-3 mb-3">
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-3 py-2 text-sm"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
          <ArrowRight className="h-5 w-5 text-gray-500 self-center" />
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="flex-1 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-3 py-2 text-sm"
          >
            {LANGS.filter(l=>l.code!=="auto").map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here..."
          rows={8}
          className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)] text-gray-800 dark:text-gray-100"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Powered by LibreTranslate</p>
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] text-white px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur border border-black/5 p-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Translation</label>
        <div className="min-h-[224px] rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-4 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
          {result || <span className="text-gray-400">Your translation will appear here…</span>}
        </div>
      </div>
    </section>
  );
}
