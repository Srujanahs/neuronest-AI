import React, { useState, useEffect } from 'react';
import { Sparkles, Target, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { aiService, HolisticReport as HolisticReportType } from '../services/aiService';

const HolisticReport: React.FC = () => {
  const [report, setReport] = useState<HolisticReportType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      const data = await aiService.generateHolisticReport({ coding: 72, aptitude: 65, communication: 58 });
      setReport(data);
      setIsLoading(false);
    };
    fetchReport();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-blue-100 animate-pulse">Synthesizing holistic performance data...</p>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden animate-in fade-in duration-700">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
              <Sparkles size={24} />
            </div>
            <h2 className="text-xl font-bold">Holistic AI Skill Report</h2>
          </div>
          <div className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">AI Verified</span>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">Overall Profile</h3>
            <p className="text-lg font-medium leading-relaxed">
              {report.overallProfile}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 flex items-center gap-2">
                <Target size={14} className="text-emerald-400" />
                Core Strengths
              </h3>
              <ul className="space-y-2">
                {report.strengths.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-blue-50">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-400" />
                Growth Areas
              </h3>
              <ul className="space-y-2">
                {report.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-blue-50">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
              <div>
                <h4 className="text-xs font-bold mb-1 flex items-center gap-2">
                  <Zap size={14} className="text-amber-400" />
                  Recommended Next Focus
                </h4>
                <p className="text-sm text-blue-100">
                  {report.nextFocus}
                </p>
              </div>
              <ArrowRight size={20} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
    </div>
  );
};

import { Zap } from 'lucide-react';
export default HolisticReport;
