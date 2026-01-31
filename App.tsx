
import React, { useState, useEffect } from 'react';
import { UnitType, BMIResult, HistoryEntry, BMICategory } from './types';
import { calculateBMI, formatDate } from './utils';
import BMIGauge from './components/BMIGauge';
import InfoTooltip from './components/InfoTooltip';

const App: React.FC = () => {
  const [unitType, setUnitType] = useState<UnitType>(UnitType.METRIC);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightInch, setHeightInch] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bmi_history');
    if (saved) setHistory(JSON.parse(saved));
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bmi_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const hInch = parseFloat(heightInch || '0');

    if (isNaN(w) || isNaN(h)) {
      setError('Enter valid numbers');
      return;
    }

    setError('');
    setIsCalculating(true);
    
    setTimeout(() => {
      const calculatedResult = calculateBMI(w, h, unitType, hInch);
      if (calculatedResult) {
        setResult(calculatedResult);
        const newEntry: HistoryEntry = {
          id: Date.now().toString(),
          date: formatDate(new Date()),
          bmi: calculatedResult.value,
          category: calculatedResult.category,
          weight: w,
          unit: unitType === UnitType.METRIC ? 'kg' : 'lb'
        };
        setHistory(prev => [newEntry, ...prev].slice(0, 5));
      }
      setIsCalculating(false);
    }, 600);
  };

  const removeHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className={`min-h-screen py-8 px-4 transition-all duration-500 ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-400 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/30 transform hover:rotate-12 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Vitality<span className="text-emerald-500">BMI</span></h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Premium Health Insights</p>
            </div>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-110 transition-all"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input & History */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full mr-3"></span>
                Input Data
              </h2>

              <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl mb-8">
                {Object.values(UnitType).map(type => (
                  <button 
                    key={type}
                    onClick={() => setUnitType(type)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${unitType === type ? 'bg-white dark:bg-slate-700 shadow-lg text-emerald-600 dark:text-emerald-400' : 'text-slate-500 opacity-60'}`}
                  >
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">Height {unitType === UnitType.METRIC ? '(cm)' : '(ft)'}</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-4 ring-emerald-500/10 transition-all font-bold text-lg"
                    placeholder="0"
                  />
                </div>

                {unitType === UnitType.IMPERIAL && (
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">Inches (in)</label>
                    <input 
                      type="number" 
                      value={heightInch}
                      onChange={(e) => setHeightInch(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-4 ring-emerald-500/10 transition-all font-bold text-lg"
                      placeholder="0"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">Weight {unitType === UnitType.METRIC ? '(kg)' : '(lb)'}</label>
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-4 ring-emerald-500/10 transition-all font-bold text-lg"
                    placeholder="0"
                  />
                </div>

                <button 
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/40 transform active:scale-95 transition-all disabled:opacity-50"
                >
                  {isCalculating ? 'Computing...' : 'Calculate Insight'}
                </button>
              </div>
            </section>

            {/* History Card */}
            <section className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
                  Recent Logs
                </span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full text-slate-400 uppercase">Last 5</span>
              </h2>
              <div className="space-y-4">
                {history.length === 0 ? (
                  <p className="text-center py-8 text-slate-400 text-sm italic">No records yet.</p>
                ) : (
                  history.map(item => (
                    <div key={item.id} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl transition-all hover:translate-x-1">
                      <div>
                        <div className="text-sm font-black">{item.bmi} BMI</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                          item.category === BMICategory.NORMAL ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {item.category}
                        </span>
                        <button onClick={() => removeHistory(item.id)} className="opacity-0 group-hover:opacity-100 p-1 text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Dynamic Results */}
          <div className="lg:col-span-8">
            {!result ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border-2 border-dashed border-slate-100 dark:border-slate-700 opacity-50 group">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-400">Awaiting Measurements</h3>
                <p className="text-slate-400 text-sm mt-2">Enter your details to see your health dashboard</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                {/* Score Hero */}
                <section className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 bg-current ${result.color}`}></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Calculated Score</span>
                        <InfoTooltip />
                      </div>
                      <div className="flex items-end space-x-4">
                        <span className={`text-8xl font-black tracking-tighter leading-none ${result.color}`}>
                          {result.value}
                        </span>
                        <div className="pb-2">
                          <span className={`text-xl font-black uppercase ${result.color}`}>{result.category}</span>
                          <p className="text-sm text-slate-400 font-bold">Health Status</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/2">
                      <BMIGauge value={result.value} />
                    </div>
                  </div>
                </section>

                {/* Detailed Insights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Ideal Range Card */}
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                      <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      Target Weight Range
                    </h4>
                    <div className="text-3xl font-black text-emerald-500 mb-2">
                      {result.idealWeightRange.min} - {result.idealWeightRange.max} 
                      <span className="text-lg ml-1 text-slate-400 font-medium">
                        {unitType === UnitType.METRIC ? 'kg' : 'lb'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                      Maintaining your weight within this window significantly reduces long-term health risks.
                    </p>
                  </div>

                  {/* Recommendation Card */}
                  <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center">
                      <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Vitality Advice
                    </h4>
                    <p className="text-lg font-bold leading-snug mb-4">
                      {result.description}
                    </p>
                    <div className="flex space-x-2">
                       <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider">Nutrition</span>
                       <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider">Movement</span>
                    </div>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <section className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Zone Proximity</h4>
                    <div className="flex space-x-4 text-[10px] font-black uppercase">
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-sky-400 mr-1.5"></span> Under</div>
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5"></span> Optimal</div>
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-400 mr-1.5"></span> High</div>
                    </div>
                  </div>
                  <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-[25%] right-[45%] bg-emerald-500/10 border-x-2 border-emerald-500/20"></div>
                    <div 
                      className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out flex items-center justify-end pr-2 font-black text-[9px] text-white rounded-full ${result.color.replace('text', 'bg')}`}
                      style={{ width: `${(result.value / 45) * 100}%` }}
                    >
                      {result.value}
                    </div>
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-300">
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50+</span>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-pulse {
          animation: pulse-gentle 8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
