
import React, { useState, useEffect } from 'react';
import { UnitType, BMIResult, Gender, BMICategory } from './types';
import { calculateBMI } from './utils';
import BMIGauge from './components/BMIGauge';

const App: React.FC = () => {
  const [unitType, setUnitType] = useState<UnitType>(UnitType.METRIC);
  const [age, setAge] = useState<string>('25');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightInch, setHeightInch] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const hInch = parseFloat(heightInch || '0');
    const a = parseInt(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      setError('Please fill all fields with valid numbers.');
      return;
    }

    setError('');
    setIsCalculating(true);
    setResult(null); // Clear previous result to trigger needle reset
    
    // Simulate calculation time so the user sees the arrow "readying" itself
    setTimeout(() => {
      const res = calculateBMI(w, h, unitType, hInch);
      setResult(res);
      setIsCalculating(false);
    }, 600);
  };

  const handleClear = () => {
    setWeight('');
    setHeight('');
    setHeightInch('');
    setAge('25');
    setResult(null);
    setError('');
  };

  return (
    <div className={`min-h-screen py-8 md:py-16 px-4 transition-all duration-500 font-sans ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Dynamic Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[160px] opacity-20 transition-all duration-[2000ms] ${result ? result.color.replace('text', 'bg') : 'bg-emerald-400'}`}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[140px] opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-500/20 transform hover:rotate-6 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20.42 4.58a5 5 0 0 0-7.07 0l-1.35 1.35-1.35-1.35a5 5 0 0 0-7.07 7.07l1.35 1.35 7.07 7.07 7.07-7.07 1.35-1.35a5 5 0 0 0 0-7.07z"/></svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">VITALITY<span className="text-emerald-600 italic">CALC</span></h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Advanced Diagnostics</p>
            </div>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-110 transition-all text-xl"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800/50 flex flex-col">
            <div className="flex bg-slate-100 dark:bg-slate-950 p-2">
              {Object.values(UnitType).map((type) => (
                <button
                  key={type}
                  onClick={() => { setUnitType(type); handleClear(); }}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${unitType === type ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {type.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-10 space-y-6 flex-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase">Profile Data</label>
                  <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-4"></span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Age</label>
                    <input 
                      type="number" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-emerald-500 rounded-xl font-bold transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Gender</label>
                    <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl">
                      {Object.values(Gender).map(g => (
                        <button 
                          key={g}
                          onClick={() => setGender(g)}
                          className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${gender === g ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Height ({unitType === UnitType.METRIC ? 'cm' : 'ft'})</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-emerald-500 rounded-xl font-bold text-lg outline-none transition-all"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">{unitType === UnitType.METRIC ? 'CM' : 'FT'}</span>
                  </div>
                </div>

                {unitType === UnitType.US && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Inches (in)</label>
                    <input 
                      type="number" 
                      value={heightInch}
                      onChange={(e) => setHeightInch(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-emerald-500 rounded-xl font-bold text-lg outline-none transition-all"
                      placeholder="0"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Weight ({unitType === UnitType.METRIC ? 'kg' : 'lb'})</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-emerald-500 rounded-xl font-bold text-lg outline-none transition-all"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">{unitType === UnitType.METRIC ? 'KG' : 'LB'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button 
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-600/20 transform active:scale-95 transition-all flex items-center justify-center space-x-3"
                >
                  <span className={isCalculating ? 'animate-pulse' : ''}>{isCalculating ? 'ANALYZING...' : 'CALCULATE'}</span>
                  {!isCalculating && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
                </button>
                <button 
                  onClick={handleClear}
                  className="w-full py-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Reset Measurements
                </button>
              </div>

              {error && (
                <div className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl text-xs font-black animate-shake text-center border border-rose-100 dark:border-rose-900/30">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: High-Performance Gauge & Results */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex-1 border border-slate-100 dark:border-slate-800/50 flex flex-col">
              <div className="bg-emerald-600 dark:bg-emerald-800 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white leading-none">Diagnostic Result</h2>
                  <p className="text-[10px] font-bold text-emerald-100/60 uppercase tracking-widest mt-1">Real-time health telemetry</p>
                </div>
                <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                </button>
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center space-y-8">
                {/* We ALWAYS render the gauge so the needle can be seen "going" (swinging) */}
                <div className="w-full transform transition-all duration-700">
                  <BMIGauge value={result?.value ?? 15} isCalculating={isCalculating} />
                </div>

                <div className={`text-center space-y-4 transition-all duration-700 ${result && !isCalculating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {result && (
                    <>
                      <div className="inline-flex items-center px-6 py-2 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                        <span className={`text-3xl font-black ${result.color} mr-3`}>{result.category}</span>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${result.color.replace('text', 'bg')}`}></div>
                      </div>
                      
                      <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50 italic text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        "{result.description}"
                      </div>
                    </>
                  )}
                </div>

                {!result && !isCalculating && (
                  <div className="text-center py-10 opacity-30">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Telemetry Offline</p>
                    <p className="text-xs text-slate-400 mt-1">Calculations will appear here</p>
                  </div>
                )}
                
                {isCalculating && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Grade Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Privacy Protected</span>
            </div>
          </div>
          <p className="text-slate-300 dark:text-slate-700 text-[10px] font-bold uppercase tracking-[0.5em]">© 2024 VITALITY BIOMETRICS</p>
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
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default App;
