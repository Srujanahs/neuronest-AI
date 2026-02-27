import React, { useState, useEffect } from 'react';
import { APTITUDE_QUESTIONS } from '../data/mockData';
import { Brain, Timer, ChevronRight, CheckCircle2, XCircle, RefreshCcw, Trophy, Sparkles, Target, AlertCircle } from 'lucide-react';
import { aiService, AIAptitudeFeedback } from '../services/aiService';

const Aptitude: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(APTITUDE_QUESTIONS.length).fill(null));
  const [aiFeedback, setAiFeedback] = useState<AIAptitudeFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinish();
    }
  }, [timeLeft, quizFinished]);

  const handleFinish = async () => {
    setQuizFinished(true);
    setIsAnalyzing(true);
    const feedback = await aiService.analyzeAptitudePerformance(score, APTITUDE_QUESTIONS.length, ['Logical', 'Quantitative', 'Verbal']);
    setAiFeedback(feedback);
    setIsAnalyzing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === APTITUDE_QUESTIONS[currentQuestion].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestion < APTITUDE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      handleFinish();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(300);
    setQuizFinished(false);
    setAnswers(new Array(APTITUDE_QUESTIONS.length).fill(null));
    setAiFeedback(null);
  };

  if (quizFinished) {
    return (
      <div className="max-w-4xl mx-auto py-8 animate-in zoom-in duration-500">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="text-blue-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz Completed!</h1>
          <p className="text-slate-500 dark:text-slate-400">Great effort! Here's how you performed.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Score</span>
              <span className="text-3xl font-bold text-blue-600">{score}/{APTITUDE_QUESTIONS.length}</span>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Accuracy</span>
              <span className="text-3xl font-bold text-emerald-500">{Math.round((score / APTITUDE_QUESTIONS.length) * 100)}%</span>
            </div>
            <button 
              onClick={resetQuiz}
              className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              Try Again
            </button>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles size={24} />
                  <h2 className="text-xl font-bold">NeuroNest AI Analysis</h2>
                </div>
                {isAnalyzing && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              </div>

              {aiFeedback ? (
                <div className="space-y-6 animate-in fade-in duration-700">
                  <p className="text-blue-50 leading-relaxed italic">
                    "{aiFeedback.summary}"
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        <Target size={16} className="text-emerald-400" />
                        Strengths
                      </h3>
                      <ul className="space-y-2">
                        {aiFeedback.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-blue-100 flex gap-2">
                            <span className="text-emerald-400">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        <AlertCircle size={16} className="text-amber-400" />
                        Areas to Improve
                      </h3>
                      <ul className="space-y-2">
                        {aiFeedback.weakAreas.map((w, i) => (
                          <li key={i} className="text-xs text-blue-100 flex gap-2">
                            <span className="text-amber-400">•</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-blue-200 italic">
                  Generating your personalized performance report...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = APTITUDE_QUESTIONS[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
            <Brain size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question {currentQuestion + 1} of {APTITUDE_QUESTIONS.length}</span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">{question.category} Reasoning</h2>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <Timer size={18} className={timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-slate-400'} />
          <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / APTITUDE_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-8 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={`font-medium ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    {option}
                  </span>
                </div>
                {isSelected && <CheckCircle2 size={20} className="text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 group"
        >
          {currentQuestion === APTITUDE_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Aptitude;
