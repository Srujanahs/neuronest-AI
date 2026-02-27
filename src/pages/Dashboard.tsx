import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Code, Brain, MessageSquare, TrendingUp, Clock, CheckCircle2, Play } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ANALYTICS_DATA } from '../data/mockData';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const skillCards = [
    { title: 'Coding', progress: 72, icon: Code, color: 'bg-blue-500', path: '/coding' },
    { title: 'Aptitude', progress: 65, icon: Brain, color: 'bg-emerald-500', path: '/aptitude' },
    { title: 'Communication', progress: 58, icon: MessageSquare, color: 'bg-purple-500', path: '/communication' },
  ];

  const recommendations = [
    { title: 'Two Sum Challenge', category: 'Coding', time: '15 mins', icon: Code },
    { title: 'Logical Reasoning Quiz', category: 'Aptitude', time: '10 mins', icon: Brain },
    { title: 'Fluency Practice', category: 'Communication', time: '5 mins', icon: MessageSquare },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back, {user?.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          You've completed <span className="text-blue-600 font-semibold">85%</span> of your weekly goal. Keep it up!
        </p>
      </div>

      {/* Skill Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCards.map((skill) => (
          <Link
            key={skill.title}
            to={skill.path}
            className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${skill.color} text-white`}>
                <skill.icon size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{skill.progress}%</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{skill.title}</h3>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${skill.color} transition-all duration-1000`}
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} />
              Weekly Performance
            </h2>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-medium px-3 py-1.5 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA.weeklyProgress}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Practice */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Recommended for You
          </h2>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div 
                key={i}
                className="group p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <rec.icon size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {rec.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {rec.time}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                        {rec.category}
                      </span>
                    </div>
                  </div>
                  <Play size={16} className="text-slate-400 group-hover:text-blue-600 self-center" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
