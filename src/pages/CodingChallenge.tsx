import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { ArrowLeft, Play, Send, CheckCircle2, XCircle, Info, Sparkles, Zap, Lightbulb } from 'lucide-react';
import { CODING_CHALLENGES } from '../data/mockData';
import { aiService, AICodingFeedback } from '../services/aiService';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../context/AuthContext';

const CodingChallenge: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const challenge = CODING_CHALLENGES.find(c => c.id === id);
  
  const [code, setCode] = useState(challenge?.starterCode || '');
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'fail'>('idle');
  const [aiFeedback, setAiFeedback] = useState<AICodingFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!challenge) return <div>Challenge not found</div>;

  const handleRun = () => {
    setStatus('running');
    setTimeout(() => {
      setOutput('Running test cases...\nTest Case 1: Passed\nTest Case 2: Passed\n\nAll tests passed locally!');
      setStatus('idle');
    }, 1000);
  };

  const handleSubmit = async () => {
    setStatus('running');
    setIsAnalyzing(true);
    
    // Simulate submission
    setTimeout(async () => {
      setStatus('success');
      setOutput('Submission Successful!\nAll 15/15 test cases passed.\nRuntime: 64ms (Beats 82%)\nMemory: 42MB (Beats 71%)');
      
      // Insert result into Supabase
      if (user && challenge) {
        const { error } = await supabaseService.logActivity(user.id, 'Coding', {
          challenge_id: challenge.id,
          score: 100
        });
        
        // Also save to coding_results specifically for analytics
        const { error: resultError } = await supabaseService.supabase
          .from('coding_results')
          .insert([
            { 
              user_id: user.id, 
              challenge_id: challenge.id, 
              score: 100, 
              completed_at: new Date().toISOString() 
            }
          ]);
        
        if (error || resultError) {
          console.error('Error inserting coding result:', error || resultError);
        } else {
          console.log('Coding result inserted successfully');
        }
      }

      // Get AI feedback
      const feedback = await aiService.analyzeCodingSubmission(challenge!, code);
      setAiFeedback(feedback);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/coding')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{challenge.title}</h1>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
              {challenge.difficulty}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRun}
            disabled={status === 'running'}
            className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all flex items-center gap-2"
          >
            <Play size={16} />
            Run
          </button>
          <button 
            onClick={handleSubmit}
            disabled={status === 'running'}
            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left: Description & AI Feedback */}
        <div className="flex flex-col gap-4 min-h-0 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
            <div className="flex items-center gap-2 mb-4 text-blue-600">
              <Info size={18} />
              <h2 className="font-bold">Problem Description</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {challenge.description}
              </p>
              
              <h3 className="text-sm font-bold mt-6 mb-2">Example 1:</h3>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl font-mono text-sm">
                <p><span className="text-slate-400">Input:</span> nums = [2,7,11,15], target = 9</p>
                <p><span className="text-slate-400">Output:</span> [0,1]</p>
                <p><span className="text-slate-400">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
              </div>
            </div>
          </div>

          {/* AI Feedback Panel */}
          {(isAnalyzing || aiFeedback) && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 p-6 animate-in slide-in-from-left-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Sparkles size={20} className="animate-pulse" />
                  <h2 className="font-bold">NeuroNest AI Insights</h2>
                </div>
                {isAnalyzing && (
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Analyzing Code...
                  </div>
                )}
              </div>

              {aiFeedback && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-white dark:border-slate-700">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Time Complexity</span>
                      <span className="text-sm font-mono font-bold text-blue-600">{aiFeedback.complexityAnalysis.time}</span>
                    </div>
                    <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-white dark:border-slate-700">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Space Complexity</span>
                      <span className="text-sm font-mono font-bold text-blue-600">{aiFeedback.complexityAnalysis.space}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Zap size={14} className="text-amber-500" />
                      Optimization Tips
                    </h3>
                    <ul className="space-y-1">
                      {aiFeedback.optimizationTips.map((tip, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex gap-2">
                          <span className="text-blue-500">•</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Lightbulb size={14} className="text-blue-500" />
                      Improvement Suggestions
                    </h3>
                    <ul className="space-y-1">
                      {aiFeedback.improvementSuggestions.map((s, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex gap-2">
                          <span className="text-blue-500">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Editor & Output */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 20 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          
          <div className="h-48 bg-slate-900 rounded-2xl border border-slate-800 p-4 font-mono text-sm overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">Console Output</span>
              {status === 'success' && <CheckCircle2 size={14} className="text-emerald-500" />}
              {status === 'fail' && <XCircle size={14} className="text-red-500" />}
            </div>
            {output ? (
              <pre className={status === 'success' ? 'text-emerald-400' : 'text-slate-300'}>
                {output}
              </pre>
            ) : (
              <span className="text-slate-600 italic">Run your code to see output...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;
