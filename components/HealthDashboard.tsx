
import React, { useState } from 'react';

interface InsightCardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  type?: 'card' | 'file';
}

const InsightCard: React.FC<InsightCardProps> = ({ title, subtitle, description, icon, color, onClick, type = 'card' }) => {
  if (type === 'file') {
    return (
      <div 
        onClick={onClick}
        className="group bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all cursor-pointer flex items-center space-x-4"
      >
        <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-black leading-tight">{title}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{subtitle || 'PDF Document'}</p>
        </div>
        <div className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden h-full flex flex-col"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 ${color}`}></div>
      <div className={`w-14 h-14 ${color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1">
        {subtitle && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{subtitle}</span>}
        <h4 className="text-xl font-black mb-3 leading-tight">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
      <div className="mt-6 flex items-center text-[10px] font-black uppercase text-emerald-600 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Explore Module
        <svg className="ml-2 w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  );
};

const DetailOverlay: React.FC<{ content: any; onClose: () => void }> = ({ content, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
      <div className="absolute top-6 right-6 flex items-center space-x-2 z-20">
        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
        <button 
          onClick={onClose}
          className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      
      <div className="p-10 md:p-16 overflow-y-auto max-h-[85vh]">
        <div className="flex items-center space-x-6 mb-10">
          <div className={`w-20 h-20 ${content.color} bg-opacity-10 rounded-3xl flex items-center justify-center flex-shrink-0`}>
            {content.icon}
          </div>
          <div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.4em] block mb-1">{content.subtitle || 'Knowledge Base'}</span>
            <h2 className="text-4xl font-black tracking-tighter leading-tight">{content.title}</h2>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          {content.sections ? (
            content.sections.map((section: any, idx: number) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight flex items-center">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full mr-3"></span>
                  {section.heading}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{section.body}</p>
                {section.bullets && (
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {section.bullets.map((b: string, i: number) => (
                       <li key={i} className="flex items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3"></span>
                         <span className="text-sm font-bold">{b}</span>
                       </li>
                     ))}
                   </ul>
                )}
              </div>
            ))
          ) : (
            <div className="space-y-6">
               {content.longDescription.map((p: string, i: number) => (
                <p key={i} className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{p}</p>
              ))}
              {content.bullets && (
                <ul className="space-y-4 pt-4">
                  {content.bullets.map((b: string, i: number) => (
                    <li key={i} className="flex items-start bg-slate-50 dark:bg-slate-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const HealthDashboard: React.FC<{ onTabChange: (tab: 'calculator' | 'dashboard') => void }> = ({ onTabChange }) => {
  const [selectedInsight, setSelectedInsight] = useState<any | null>(null);

  const mainModules = [
    {
      title: "The BMI Formula",
      subtitle: "Chapter 1",
      description: "BMI = Weight (kg) ÷ Height (m²). Simple maths that reveals important health insights.",
      longDescription: [
        "The Body Mass Index (BMI) is calculated by dividing your weight in kilograms by your height in meters squared. It provides a simple, universal metric for health screening.",
        "For example, a person weighing 50kg with a height of 1.6m has a BMI of 19.5 (50 / (1.6 * 1.6)).",
        "Our website calculates this instantly—just enter your measurements and receive your result in seconds."
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
      color: "bg-blue-500",
      bullets: ["Metric: Weight (kg) / Height (m)²", "US: 703 * Weight (lb) / Height (in)²", "Identifies potential health risks"]
    },
    {
      title: "Underweight Challenges",
      subtitle: "Health Risks",
      description: "Insufficient body weight weakens your immune system, making you more susceptible to infections.",
      longDescription: [
        "Being underweight may indicate insufficient nutrition and can lead to several complications.",
        "Delayed Development: In younger individuals, being underweight can slow physical growth and development milestones.",
        "Compromised Immunity: Insufficient weight weakens your immune system, increasing susceptibility to illnesses.",
        "Other issues include persistent fatigue, brittle nails, hair loss, and poor skin quality."
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.42 4.58a5 5 0 0 0-7.07 0l-1.35 1.35-1.35-1.35a5 5 0 0 0-7.07 7.07l1.35 1.35 7.07 7.07 7.07-7.07 1.35-1.35a5 5 0 0 0 0-7.07z"/></svg>,
      color: "bg-amber-500",
      bullets: ["Compromised Immunity", "Persistent Fatigue", "Hair and Skin Issues", "Delayed Development in Youth"]
    },
    {
      title: "Obesity Complications",
      subtitle: "Critical Focus",
      description: "Excess weight strains the heart, leading to high blood pressure and elevated cholesterol.",
      longDescription: [
        "Obesity (BMI 30+) is associated with significant health concerns that require proactive management.",
        "Increased Diabetes Risk: Significantly raises chances of developing Type 2 diabetes due to insulin resistance.",
        "Cardiovascular Complications: Excess weight strains the heart, increasing the likelihood of heart attacks and strokes.",
        "Respiratory Difficulties: Impairs lung function, contributing to sleep apnea and asthma."
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      color: "bg-rose-500",
      bullets: ["Joint Stress & Pain", "Metabolic Disorders", "Sleep Apnea & Disruption", "Mental Health Impact"]
    }
  ];

  const libraryFiles = [
    {
      title: "Complete BMI Guide v1.0",
      subtitle: "13 Pages • PDF",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
      color: "bg-emerald-500",
      sections: [
        { heading: "Introduction", body: "Your complete guide to understanding body health and achieving a balanced weight through informed choices." },
        { heading: "Foundations", body: "BMI helps categorize individuals into underweight, normal weight, overweight, or obese ranges, providing a foundation for personalized health strategies." },
        { heading: "Nutrition Strategy", body: "Eat more frequently: Consume 5-6 smaller meals rather than 3 large ones. Focus on nutrient-dense foods like full-fat milk, nuts, and protein smoothies." },
        { heading: "Lifestyle Modifications", body: "Engage in strength training and prioritize 7-8 hours of quality sleep nightly to support muscle recovery and hormonal balance." }
      ]
    },
    {
      title: "Weight Gain Protocols",
      subtitle: "4 Pages • PDF",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
      color: "bg-blue-500",
      sections: [
        { heading: "Calorie Increase", body: "Add 300-500 extra calories daily. Sudden changes can cause digestive discomfort, so proceed gradually." },
        { heading: "Protein Emphasis", body: "Include lean meats, eggs, legumes, and dairy to support muscle development." },
        { heading: "Consistency", body: "Results require patience. Track progress weekly and adjust your approach as needed." }
      ]
    },
    {
      title: "Obesity Management",
      subtitle: "6 Pages • PDF",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>,
      color: "bg-rose-500",
      sections: [
        { heading: "Metabolic Health", body: "Overweight individuals are at higher risk for Type 2 diabetes due to impaired glucose regulation." },
        { heading: "Joint Health", body: "Excess weight places significant pressure on knees and hips, leading to chronic pain." },
        { heading: "Action Plan", body: "Incorporate daily walking or yoga to support gradual, sustainable weight loss. Focus on whole foods like fruits and vegetables." }
      ]
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div>
          <h2 className="text-5xl font-black tracking-tighter">Health <span className="text-emerald-600 italic">Vault</span></h2>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.6em] mt-2">Clinical Reference Materials & Guides</p>
        </div>
        <button 
          onClick={() => onTabChange('calculator')}
          className="group px-8 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black text-sm transition-all shadow-2xl shadow-emerald-500/30 flex items-center"
        >
          <svg className="mr-3 w-4 h-4 group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="4"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          BACK TO SCANNER
        </button>
      </header>

      {/* Main Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {mainModules.map((m, idx) => (
          <InsightCard key={idx} {...m} onClick={() => setSelectedInsight(m)} />
        ))}
      </div>

      {/* Files Section as requested */}
      <section className="bg-slate-50 dark:bg-slate-950 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black flex items-center">
            <svg className="mr-3 text-emerald-600" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            Library Documents
          </h3>
          <span className="px-4 py-1 bg-white dark:bg-slate-800 rounded-full text-[10px] font-black uppercase text-slate-400">3 Total Files</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {libraryFiles.map((file, idx) => (
            <InsightCard 
              key={idx} 
              {...file} 
              type="file" 
              description="" // Required by prop type but not used in file view
              onClick={() => setSelectedInsight(file)} 
            />
          ))}
        </div>
      </section>

      {/* Interactive Footer Banner */}
      <div className="bg-slate-900 text-white p-16 rounded-[4rem] relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
        <div className="relative z-10 max-w-3xl">
          <h3 className="text-4xl font-black mb-6 tracking-tighter leading-tight">
            "Your complete guide to understanding body health and achieving a balanced weight."
          </h3>
          <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
            Our intuitive platform makes health assessment effortless and informative. BMI understanding empowers better health decisions. With proper guidance, both underweight and obesity concerns can be effectively addressed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Instant Calculation', sub: 'No waiting, no complexity' },
              { label: 'Personalised Tips', sub: 'Tailored recommendations' },
              { label: 'User-Friendly', sub: 'Responsive & accessible' }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <p className="font-black text-sm mb-1">{feature.label}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">{feature.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedInsight && (
        <DetailOverlay 
          content={selectedInsight} 
          onClose={() => setSelectedInsight(null)} 
        />
      )}
    </div>
  );
};

export default HealthDashboard;
