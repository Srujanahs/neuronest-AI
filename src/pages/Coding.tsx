import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ChevronRight, Star, Clock } from 'lucide-react';
import { CODING_CHALLENGES } from '../data/mockData';

const Coding: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Coding Challenges</h1>
        <p className="text-slate-500 dark:text-slate-400">Master algorithms and data structures with our curated list.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {CODING_CHALLENGES.map((challenge) => (
          <Link
            key={challenge.id}
            to={`/coding/${challenge.id}`}
            className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                  <Code size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      challenge.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      challenge.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      4.8
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      15-20 mins
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                Solve Challenge
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Coding;
