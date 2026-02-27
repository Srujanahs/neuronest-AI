import { CodingChallenge, AptitudeQuestion, AnalyticsData } from '../types';

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
    testCases: [
      { input: '[2,7,11,15], 9', expected: '[0,1]' }
    ]
  },
  {
    id: '2',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
    starterCode: 'function isPalindrome(x) {\n  // Your code here\n}',
    testCases: [
      { input: '121', expected: 'true' }
    ]
  },
  {
    id: '3',
    title: 'Reverse Linked List',
    difficulty: 'Medium',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    starterCode: 'function reverseList(head) {\n  // Your code here\n}',
    testCases: [
      { input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' }
    ]
  }
];

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: '1',
    category: 'Logical',
    question: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.',
    options: ['True', 'False', 'Cannot be determined', 'None of the above'],
    correctAnswer: 0,
    explanation: 'This is a classic syllogism. If A=B and B=C, then A=C.'
  },
  {
    id: '2',
    category: 'Quantitative',
    question: 'What is 15% of 200?',
    options: ['20', '25', '30', '35'],
    correctAnswer: 2,
    explanation: '15/100 * 200 = 15 * 2 = 30.'
  },
  {
    id: '3',
    category: 'Verbal',
    question: 'Choose the synonym for "Abundant".',
    options: ['Scarce', 'Plentiful', 'Rare', 'Limited'],
    correctAnswer: 1,
    explanation: 'Abundant means existing or available in large quantities; plentiful.'
  },
  {
    id: '4',
    category: 'Logical',
    question: 'Which number comes next in the series: 2, 4, 8, 16, ...?',
    options: ['24', '30', '32', '64'],
    correctAnswer: 2,
    explanation: 'The series follows a pattern of multiplying by 2.'
  },
  {
    id: '5',
    category: 'Quantitative',
    question: 'A train 150m long is running at 54 km/hr. How much time will it take to pass a standing pole?',
    options: ['10 seconds', '12 seconds', '15 seconds', '8 seconds'],
    correctAnswer: 0,
    explanation: 'Speed = 54 * 5/18 = 15 m/s. Time = Distance/Speed = 150/15 = 10 seconds.'
  }
];

export const ANALYTICS_DATA: AnalyticsData = {
  weeklyProgress: [
    { day: 'Mon', score: 45 },
    { day: 'Tue', score: 52 },
    { day: 'Wed', score: 48 },
    { day: 'Thu', score: 61 },
    { day: 'Fri', score: 55 },
    { day: 'Sat', score: 67 },
    { day: 'Sun', score: 72 },
  ],
  radarData: [
    { subject: 'Coding', A: 72, fullMark: 100 },
    { subject: 'Logic', A: 85, fullMark: 100 },
    { subject: 'Quant', A: 65, fullMark: 100 },
    { subject: 'Verbal', A: 58, fullMark: 100 },
    { subject: 'Comm', A: 60, fullMark: 100 },
  ],
  practiceTime: [
    { name: 'Coding', hours: 12 },
    { name: 'Aptitude', hours: 8 },
    { name: 'Comm', hours: 5 },
  ]
};
