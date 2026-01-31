
import React from 'react';
import { getGaugePosition } from '../utils';

interface BMIGaugeProps {
  value: number;
}

const BMIGauge: React.FC<BMIGaugeProps> = ({ value }) => {
  const pos = getGaugePosition(value);

  return (
    <div className="w-full space-y-4">
      <div className="relative h-4 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex shadow-inner">
        <div className="h-full bg-sky-400/40" style={{ width: '15%' }}></div>
        <div className="h-full bg-emerald-400/40 border-x border-white/20 dark:border-black/10" style={{ width: '30%' }}></div>
        <div className="h-full bg-amber-400/40" style={{ width: '25%' }}></div>
        <div className="h-full bg-rose-400/40" style={{ width: '30%' }}></div>
        
        {/* Indicator */}
        <div 
          className="absolute inset-y-0 w-2 bg-slate-900 dark:bg-white rounded-full shadow-lg transition-all duration-1000 ease-out z-10"
          style={{ left: `calc(${pos}% - 4px)` }}
        >
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-slate-900 dark:border-t-white"></div>
        </div>
      </div>
      
      <div className="flex justify-between px-1">
        {[
          { label: 'Under', color: 'text-sky-500' },
          { label: 'Ideal', color: 'text-emerald-500 font-black' },
          { label: 'Over', color: 'text-amber-500' },
          { label: 'Obese', color: 'text-rose-500' }
        ].map((item, idx) => (
          <span key={idx} className={`text-[9px] uppercase tracking-widest font-bold ${item.color}`}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BMIGauge;
