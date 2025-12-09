import { useState, useEffect } from 'react';
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
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950">
      {/* Enhanced gradient background with pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]"></div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="p-1 sm:p-1.5 bg-slate-900 dark:bg-white rounded-lg">
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white dark:text-slate-900" strokeWidth={2.5} />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                QRZen
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
              aria-label="Toggle theme"
            >
              <Sun size={16} className="hidden dark:block sm:w-[18px] sm:h-[18px]" />
              <Moon size={16} className="block dark:hidden sm:w-[18px] sm:h-[18px]" />
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
