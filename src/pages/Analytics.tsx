import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { ANALYTICS_DATA } from '../data/mockData';
import { BarChart3, Target, Zap, Award, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabaseService } from '../services/supabaseService';

import HolisticReport from '../components/HolisticReport';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPractice: '42h',
    avgAccuracy: '78%',
    challenges: '124',
    globalRank: '#412'
  });
  const [chartData, setChartData] = useState(ANALYTICS_DATA);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      
      try {
        const [codingRes, quizRes] = await Promise.all([
          supabaseService.getCodingResults(user.id),
          supabaseService.getQuizResults(user.id)
        ]);

        if (codingRes.data || quizRes.data) {
          const codingData = codingRes.data || [];
          const quizData = quizRes.data || [];
          
          // Calculate stats
          const totalChallenges = codingData.length + quizData.length;
          
          let totalScore = 0;
          let totalMaxScore = 0;
          
          codingData.forEach(r => {
            totalScore += r.score;
            totalMaxScore += 100;
          });
          
          quizData.forEach(r => {
            totalScore += r.score;
            totalMaxScore += r.total_questions;
          });
          
          const avgAccuracy = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

          setStats(prev => ({
            ...prev,
            challenges: totalChallenges.toString(),
            avgAccuracy: `${avgAccuracy}%`
          }));

          // Transform data for charts
          const categories: Record<string, { total: number, count: number }> = {
            'Coding': { total: 0, count: 0 },
            'Logical': { total: 0, count: 0 },
            'Quantitative': { total: 0, count: 0 },
            'Verbal': { total: 0, count: 0 },
            'Communication': { total: 60, count: 1 },
          };

          codingData.forEach(r => {
            categories['Coding'].total += r.score;
            categories['Coding'].count += 1;
          });

          quizData.forEach(r => {
            const cat = r.category;
            if (categories[cat]) {
              categories[cat].total += (r.score / r.total_questions) * 100;
              categories[cat].count += 1;
            }
          });

          const radarValues = Object.entries(categories).map(([_, data]) => 
            data.count > 0 ? Math.round(data.total / data.count) : 0
          );
          const radarLabels = Object.keys(categories);

          setChartData(prev => ({
            ...prev,
            radarLabels,
            radarValues
          }));
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-blue-600 animate-spin" size={40} />
          <p className="text-slate-500 font-medium">Loading your performance data...</p>
        </div>
      </div>
    );
  }

  // Chart.js Data Objects
  const lineData = {
    labels: chartData.weeklyProgress.map(d => d.day),
    datasets: [
      {
        label: 'Score',
        data: chartData.weeklyProgress.map(d => d.score),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#2563eb',
      },
    ],
  };

  const radarData = {
    labels: chartData.radarLabels || chartData.radarData.map(d => d.subject),
    datasets: [
      {
        label: 'Skills',
        data: chartData.radarValues || chartData.radarData.map(d => d.A),
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
      },
    ],
  };

  const barData = {
    labels: chartData.practiceTime.map(d => d.name),
    datasets: [
      {
        label: 'Hours',
        data: chartData.practiceTime.map(d => d.hours),
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1e293b',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#e2e8f0',
        },
        grid: {
          color: '#e2e8f0',
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: '#64748b',
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Performance Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400">Deep dive into your learning patterns and skill acquisition.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Practice', value: stats.totalPractice, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Avg. Accuracy', value: stats.avgAccuracy, icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Challenges', value: stats.challenges, icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Global Rank', value: stats.globalRank, icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={stat.color} size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Progress Line Chart */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Skill Growth Over Time</h2>
          <div className="h-[300px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        {/* Radar Chart for Strengths */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Skill Distribution</h2>
          <div className="h-[300px]">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Practice Time Bar Chart */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Practice Time (Hours)</h2>
          <div className="h-[300px]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        {/* Holistic AI Summary Card */}
        <HolisticReport />
      </div>
    </div>
  );
};

export default Analytics;
