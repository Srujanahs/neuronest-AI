import { CodingChallenge, AptitudeQuestion } from '../types';

export interface AICommunicationFeedback {
  fluency: number;
  vocabulary: number;
  clarity: number;
  confidence: number;
  summary: string;
  suggestions: string[];
}

export interface AICodingFeedback {
  optimizationTips: string[];
  improvementSuggestions: string[];
  complexityAnalysis: {
    time: string;
    space: string;
  };
}

export interface AIAptitudeFeedback {
  strengths: string[];
  weakAreas: string[];
  summary: string;
}

export interface HolisticReport {
  overallProfile: string;
  strengths: string[];
  weaknesses: string[];
  nextFocus: string;
}

class AIService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async analyzeCommunication(text: string): Promise<AICommunicationFeedback> {
    await this.delay(2000);
    return {
      fluency: 82 + Math.floor(Math.random() * 10),
      vocabulary: 75 + Math.floor(Math.random() * 15),
      clarity: 88 + Math.floor(Math.random() * 8),
      confidence: 70 + Math.floor(Math.random() * 20),
      summary: "Your writing demonstrates a strong grasp of professional tone. You communicate complex ideas with relative ease, though some sentence structures could be more concise.",
      suggestions: [
        "Use more varied transition words to improve flow between paragraphs.",
        "Consider using stronger verbs to replace 'adverb + weak verb' combinations.",
        "Your opening statement is very impactful; maintain that energy throughout."
      ]
    };
  }

  async analyzeCodingSubmission(challenge: CodingChallenge, code: string): Promise<AICodingFeedback> {
    await this.delay(1500);
    return {
      optimizationTips: [
        "Consider using a Hash Map to reduce time complexity from O(n²) to O(n).",
        "You can optimize memory by modifying the input array in-place if allowed."
      ],
      improvementSuggestions: [
        "Add comments to explain the logic of your edge case handling.",
        "Use more descriptive variable names instead of 'i' and 'j' for better readability."
      ],
      complexityAnalysis: {
        time: "O(n)",
        space: "O(n)"
      }
    };
  }

  async analyzeAptitudePerformance(score: number, total: number, categories: string[]): Promise<AIAptitudeFeedback> {
    await this.delay(1000);
    const percentage = (score / total) * 100;
    
    return {
      strengths: [
        "Logical Reasoning: You identified patterns quickly.",
        "Verbal Ability: Strong vocabulary and contextual understanding."
      ],
      weakAreas: [
        "Quantitative Aptitude: Speed needs improvement in calculation-heavy questions.",
        "Time Management: You spent 40% of your time on just 2 questions."
      ],
      summary: percentage > 70 
        ? "Excellent performance! You have a very analytical mind. Focus on fine-tuning your speed."
        : "Good start. You have the basics down, but need more practice in speed-based quantitative problems."
    };
  }

  async generateHolisticReport(scores: { coding: number; aptitude: number; communication: number }): Promise<HolisticReport> {
    await this.delay(2500);
    return {
      overallProfile: "Strategic Problem Solver with strong technical foundations and emerging leadership communication skills.",
      strengths: [
        "Algorithmic Thinking",
        "Logical Deduction",
        "Professional Written Communication"
      ],
      weaknesses: [
        "Complex Quantitative Calculations",
        "Advanced System Design Patterns",
        "Public Speaking Confidence"
      ],
      nextFocus: "Advanced Data Structures and Quantitative Speed Drills."
    };
  }
}

export const aiService = new AIService();
