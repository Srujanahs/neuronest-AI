export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SkillProgress {
  coding: number;
  aptitude: number;
  communication: number;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  testCases: { input: string; expected: string }[];
}

export interface AptitudeQuestion {
  id: string;
  category: 'Logical' | 'Quantitative' | 'Verbal';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface AnalyticsData {
  weeklyProgress: { day: string; score: number }[];
  radarData: { subject: string; A: number; fullMark: number }[];
  practiceTime: { name: string; hours: number }[];
}
