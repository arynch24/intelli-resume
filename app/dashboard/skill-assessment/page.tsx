"use client";

import React, { useState, useEffect } from 'react';
import { Code, BookOpen, Monitor, Database } from 'lucide-react';
import ProgressSteppe from '@/components/dashboard/skill-assessment/ProgressSteppe';
import SkillExtraction from '@/components/dashboard/skill-assessment/SkillExtraction';
import Assessment from '@/components/dashboard/skill-assessment/Assessment';
import CareerFeedback from '@/components/dashboard/skill-assessment/CareerFeedback';
import { Skill, SkillScore, CareerSuggestion, LearningRecommendation, StrengthsAndImprovements, AssessmentQuestion } from '@/types/resume';

// Mock Data (Replace with actual API calls)
const mockSkills: Skill[] = [
  { id: '1', name: 'JavaScript', type: 'technical' },
  { id: '2', name: 'React', type: 'technical' },
  { id: '3', name: 'Python', type: 'technical' },
  { id: '4', name: 'SQL', type: 'technical' },
  { id: '5', name: 'Node.js', type: 'technical' },
  { id: '6', name: 'Git', type: 'technical' },
  { id: '7', name: 'Teamwork', type: 'soft' },
  { id: '8', name: 'Communication', type: 'soft' },
  { id: '9', name: 'Problem Solving', type: 'soft' },
  { id: '10', name: 'Adaptability', type: 'soft' },
  { id: '11', name: 'Time Management', type: 'soft' },
];

const mockQuestion: AssessmentQuestion = {
  id: '1',
  skill: 'JavaScript',
  type: 'multiple-choice',
  question: 'What is the output of the following code?',
  code: `console.log(typeof null);
console.log(typeof undefined);
console.log(null === undefined);`,
  options: [
    '"object", "undefined", false',
    '"null", "undefined", true',
    '"object", "undefined", true',
    '"null", "object", false'
  ],
  correctAnswer: 0,
  timeLimit: 900 // 15 minutes in seconds
};

const SkillAssessmentDashboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [answers, setAnswers] = useState<any[]>([]);

  // Mock data for results
  const mockSkillScores: SkillScore[] = [
    { skill: 'JavaScript', score: 85, industryAverage: 70 },
    { skill: 'React', score: 78, industryAverage: 65 },
    { skill: 'Python', score: 60, industryAverage: 75 },
    { skill: 'SQL', score: 55, industryAverage: 70 },
    { skill: 'Node.js', score: 70, industryAverage: 60 },
    { skill: 'Git', score: 90, industryAverage: 80 },
    { skill: 'Time Management', score: 45, industryAverage: 70 },
    { skill: 'Teamwork', score: 80, industryAverage: 75 },
  ];

  const mockCareerSuggestions: CareerSuggestion[] = [
    { role: 'Frontend Developer', match: 95, icon: <Monitor className="text-green-600" size={20} /> },
    { role: 'Full Stack Developer', match: 82, icon: <Code className="text-blue-600" size={20} /> },
    { role: 'Backend Developer', match: 68, icon: <Database className="text-gray-600" size={20} /> },
  ];

  const mockLearningRecommendations: LearningRecommendation[] = [
    {
      title: 'Advanced SQL for Developers',
      description: 'Improve your database query skills',
      icon: <BookOpen className="text-blue-500" size={20} />
    },
    {
      title: 'Python Django',
      description: 'Learn web development with Python',
      icon: <Code className="text-green-500" size={20} />
    }
  ];

  const mockStrengthsAndImprovements: StrengthsAndImprovements = {
    strengths: [
      { skill: 'JavaScript', description: 'Strong understanding of core concepts and advanced features' },
      { skill: 'Problem Solving', description: 'Excellent analytical thinking and solution development' },
      { skill: 'Git', description: 'Proficient with version control workflows' },
    ],
    improvements: [
      { skill: 'SQL', description: 'Consider improving query optimization and complex joins' },
      { skill: 'Time Management', description: 'Work on prioritization and deadline management' },
      { skill: 'Python', description: 'Strengthen knowledge of libraries and frameworks' },
    ],
  };

  // Timer effect
  useEffect(() => {
    if (currentStep === 2 && assessmentStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, assessmentStarted, timeRemaining]);

  // TODO: Replace with actual API calls
  const handleStartAssessment = async () => {
    setCurrentStep(2);
    setAssessmentStarted(true);
    // API call to start assessment and fetch questions
  };

  const handleAnswer = (answer: any) => {
    setAnswers(prev => [...prev, { questionId: mockQuestion.id, answer }]);
    // TODO: API call to save answer
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 9) { // Assuming 10 questions total
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete assessment
      setCurrentStep(3);
      // TODO: API call to complete assessment and get results
    }
  };

  const handleRetakeAssessment = () => {
    setCurrentStep(1);
    setCurrentQuestion(0);
    setTimeRemaining(900);
    setAnswers([]);
    setAssessmentStarted(false);
  };

  return (
    <div className="h-screen w-full bg-gray-50 overflow-y-scroll">
      <div className="w-full px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">Skill Assessment Dashboard</h1>
          <p className="text-gray-600">Evaluate your skills with AI-generated questions and get personalized career feedback</p>
        </div>

        <ProgressSteppe currentStep={currentStep} totalSteps={3} />

        {currentStep === 1 && (
          <SkillExtraction
            skills={skills}
            onSkillsChange={setSkills}
            onNext={handleStartAssessment}
          />
        )}

        {currentStep === 2 && (
          <Assessment
            question={mockQuestion}
            questionNumber={currentQuestion + 1}
            totalQuestions={10}
            timeRemaining={timeRemaining}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrevious={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            onSkip={handleNextQuestion}
          />
        )}

        {currentStep === 3 && (
          <CareerFeedback
            skillScores={mockSkillScores}
            careerSuggestions={mockCareerSuggestions}
            learningRecommendations={mockLearningRecommendations}
            strengthsAndImprovements={mockStrengthsAndImprovements}
            onRetakeAssessment={handleRetakeAssessment}
          />
        )}
      </div>
    </div>
  );
};

export default SkillAssessmentDashboard;