
import React from 'react';
import { getGaugePosition } from '../utils';

interface BMIGaugeProps {
  value: number;
}

const BMIGauge: React.FC<BMIGaugeProps> = ({ value }) => {
  const pos = getGaugePosition(value);

  return (
    <div className="w-full mt-6 space-y-2">
      <div className="flex justify-between text-[10px] font-medium text-slate-400 uppercase tracking-wider">
        <span>Underweight</span>
        <span>Healthy</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
      <div className="relative h-2 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex">
        <div className="h-full bg-blue-400" style={{ width: '15%' }}></div>
        <div className="h-full bg-emerald-400" style={{ width: '30%' }}></div>
        <div className="h-full bg-amber-400" style={{ width: '25%' }}></div>
        <div className="h-full bg-rose-400" style={{ width: '30%' }}></div>
      </div>
      <div className="relative w-full h-4">
        <div 
          className="absolute -top-6 transition-all duration-700 ease-out flex flex-col items-center" 
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-1 h-4 bg-slate-800 dark:bg-slate-200 rounded-full"></div>
          <span className="text-xs font-bold mt-1 dark:text-slate-200">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default BMIGauge;
