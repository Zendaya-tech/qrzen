import { useState, useEffect } from 'react';
import QrGenerator from './components/QrGenerator';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen text-[color:var(--ink)] bg-[color:var(--surface)]">
      {/* Atmospheric background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.16),transparent_50%),linear-gradient(to_br,rgba(255,255,255,0.9),rgba(248,250,252,0.95))] dark:bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(249,115,22,0.15),transparent_50%),linear-gradient(to_br,rgba(2,6,23,0.95),rgba(15,23,42,0.92))]"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(226,232,240,0.08)_1px,transparent_0)] [background-size:20px_20px]"></div>
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl opacity-40 bg-[color:var(--glow)]"></div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-white/30 dark:border-slate-800/40 safe-top">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-14 sm:h-16">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
              aria-label="Toggle theme"
            >
              <Sun size={16} className="hidden dark:block sm:w-[18px] sm:h-[18px]" />
              <Moon size={16} className="block dark:hidden sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </nav>
      </header>

      <main className="relative">
        <QrGenerator />
      </main>
    </div>
  );
}

export default App;
