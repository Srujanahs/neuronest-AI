import React, { useState } from 'react';
import { MessageSquare, Sparkles, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { aiService, AICommunicationFeedback } from '../services/aiService';

const Communication: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<AICommunicationFeedback | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await aiService.analyzeCommunication(text);
      setFeedback(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Communication Lab</h1>
        <p className="text-slate-500 dark:text-slate-400">Practice your writing and get instant AI-powered feedback on your style and clarity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="text-blue-600" size={18} />
                Writing Practice
              </h2>
              <span className="text-xs text-slate-400 font-medium">{text.length} characters</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here or write something to analyze..."
              className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-slate-700 dark:text-slate-300 leading-relaxed"
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim()}
              className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AI is Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze with NeuroNest AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="lg:col-span-2 space-y-6">
          {feedback ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              {/* Scores */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="text-emerald-500" size={18} />
                  Performance Metrics
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Fluency', value: feedback.fluency, color: 'bg-blue-500' },
                    { label: 'Vocabulary', value: feedback.vocabulary, color: 'bg-purple-500' },
                    { label: 'Clarity', value: feedback.clarity, color: 'bg-emerald-500' },
                    { label: 'Confidence', value: feedback.confidence, color: 'bg-amber-500' },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-slate-600 dark:text-slate-400">{metric.label}</span>
                        <span className="text-slate-900 dark:text-white">{metric.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${metric.color} transition-all duration-1000`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary & Suggestions */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-blue-600" size={18} />
                  AI Summary
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {feedback.summary}
                </p>
                <div className="space-y-3">
                  {feedback.suggestions.map((s: string, i: number) => (
                    <div key={i} className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="text-slate-300" size={32} />
              </div>
              <h3 className="font-bold text-slate-400">Ready for Analysis</h3>
              <p className="text-sm text-slate-400 mt-2">Submit your text to see detailed AI feedback and suggestions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communication;
