import { Settings, Palette, Globe } from "lucide-react";

export default function Header({ onOpenCustomizer }) {
  return (
    <header className="w-full flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur border border-black/5 flex items-center justify-center">
          <Globe className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">FlexTranslate</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Translate anything. Make it yours.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCustomizer}
          className="inline-flex items-center gap-2 rounded-lg bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition"
        >
          <Palette className="h-4 w-4" />
          Customize
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-white/70 dark:bg-white/10 backdrop-blur px-4 py-2 text-sm font-medium border border-black/5 text-gray-800 dark:text-gray-100 hover:bg-white/90 dark:hover:bg-white/20 transition"
          disabled
          title="Settings coming soon"
        >
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </header>
  );
}
