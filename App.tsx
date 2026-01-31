
import React, { useState, useEffect, useMemo } from 'react';
import { UnitType, BMIResult } from './types';
import { calculateBMI } from './utils';
import BMIGauge from './components/BMIGauge';
import InfoTooltip from './components/InfoTooltip';

const App: React.FC = () => {
  const [unitType, setUnitType] = useState<UnitType>(UnitType.METRIC);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightInch, setHeightInch] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-slate-900');
      document.body.classList.remove('bg-slate-50');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-slate-900');
      document.body.classList.add('bg-slate-50');
    }
  }, [darkMode]);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const hInch = parseFloat(heightInch || '0');

    if (isNaN(w) || isNaN(h) || (unitType === UnitType.IMPERIAL && isNaN(hInch))) {
      setError('Please enter valid numeric values.');
      return;
    }

    if (w <= 0 || h <= 0) {
      setError('Values must be greater than zero.');
      return;
    }

    setError('');
    setIsCalculating(true);
    
    // Simulate calculation time for smooth animation effect
    setTimeout(() => {
      const calculatedResult = calculateBMI(w, h, unitType, hInch);
      setResult(calculatedResult);
      setIsCalculating(false);
    }, 400);
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setHeightInch('');
    setResult(null);
    setError('');
  };

  const handleUnitToggle = (unit: UnitType) => {
    setUnitType(unit);
    handleReset();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${darkMode ? 'dark text-white' : 'text-slate-800'}`}>
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-indigo-500' : 'bg-emerald-200'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
      </div>

      <div className="w-full max-w-lg">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Vitality<span className="text-emerald-500 font-normal underline decoration-2 underline-offset-4">BMI</span></h1>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
        </header>

        {/* Main Card */}
        <main className="glass p-8 rounded-[2.5rem] shadow-2xl space-y-8">
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl">
            <button 
              onClick={() => handleUnitToggle(UnitType.METRIC)}
              className={`flex-1 py-2.5 rounded-xl font-semibold transition-all duration-300 ${unitType === UnitType.METRIC ? 'bg-white dark:bg-slate-700 shadow-md text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Metric
            </button>
            <button 
              onClick={() => handleUnitToggle(UnitType.IMPERIAL)}
              className={`flex-1 py-2.5 rounded-xl font-semibold transition-all duration-300 ${unitType === UnitType.IMPERIAL ? 'bg-white dark:bg-slate-700 shadow-md text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Imperial
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 flex items-center justify-between">
                Height
                <span className="text-slate-400 font-normal">{unitType === UnitType.METRIC ? '(cm)' : '(ft)'}</span>
              </label>
              <div className="relative group">
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unitType === UnitType.METRIC ? "e.g. 175" : "e.g. 5"}
                  className="w-full px-5 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all group-hover:border-slate-200 dark:group-hover:border-slate-600"
                />
              </div>
            </div>

            {unitType === UnitType.IMPERIAL && (
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 flex items-center justify-between">
                  Inches
                  <span className="text-slate-400 font-normal">(in)</span>
                </label>
                <input 
                  type="number" 
                  value={heightInch}
                  onChange={(e) => setHeightInch(e.target.value)}
                  placeholder="e.g. 9"
                  className="w-full px-5 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 flex items-center justify-between">
                Weight
                <span className="text-slate-400 font-normal">{unitType === UnitType.METRIC ? '(kg)' : '(lb)'}</span>
              </label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unitType === UnitType.METRIC ? "e.g. 70" : "e.g. 155"}
                className="w-full px-5 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-rose-500 bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/30 animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button 
              onClick={handleCalculate}
              disabled={isCalculating}
              className={`flex-[2] py-5 rounded-2xl bg-emerald-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/25 hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center space-x-2 ${isCalculating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isCalculating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Calculating...</span>
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  <span>Calculate BMI</span>
                </>
              )}
            </button>
            <button 
              onClick={handleReset}
              className="flex-1 py-5 rounded-2xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold border-2 border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center space-x-2"
              aria-label="Reset fields"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Result Section */}
          {result && !isCalculating && (
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">Your Result</h3>
                <InfoTooltip />
              </div>
              
              <div className="flex items-end space-x-4 mb-4">
                <div className={`text-6xl font-black tracking-tighter ${result.color}`}>
                  {result.value}
                </div>
                <div className="pb-2">
                  <div className={`text-sm font-bold uppercase tracking-widest ${result.color} mb-0.5`}>
                    {result.category}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Body Mass Index</div>
                </div>
              </div>

              <BMIGauge value={result.value} />

              <div className="mt-10 p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {result.description}
                </p>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-8 text-center text-slate-400 text-sm">
          <p>© 2024 Vitality Health System • Professional BMI Guidance</p>
        </footer>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
