import React, { useState, useEffect } from 'react';
import QrGenerator from './components/QrGenerator';
import { Sun, Moon, Zap } from 'lucide-react';

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
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950">
      {/* Background decorative gradients */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-white dark:bg-slate-900">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(124,58,237,0.5)] opacity-50 blur-[80px] dark:bg-[rgba(99,102,241,0.5)]"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-slate-200/40 bg-white/80 backdrop-blur-lg dark:border-slate-800/40 dark:bg-slate-900/80">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                QR Spark
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950"
              aria-label="Toggle theme"
            >
              <Sun size={20} className="hidden dark:block" />
              <Moon size={20} className="block dark:hidden" />
            </button>
          </div>
        </nav>
      </header>

      <main>
        <QrGenerator />
      </main>
    </div>
  );
}

export default App;