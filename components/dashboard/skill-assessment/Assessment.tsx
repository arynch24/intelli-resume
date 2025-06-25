"use client";

import { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { AssessmentQuestion } from '@/types/resume';

const Assessment: React.FC<{
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  onAnswer: (answer: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}> = ({ question, questionNumber, totalQuestions, timeRemaining, onAnswer, onNext, onPrevious, onSkip }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    onAnswer(selectedAnswer);
    onNext();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-6xl mx-auto ">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold mb-4">AI-Generated Skill Assessment</h2>
        <div className="flex items-center justify-end text-sm gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-700" />
            <span className="text-lg font-mono">{formatTime(timeRemaining)}</span>
          </div>
          <span className="bg-blue-500/20 px-2 py-1 rounded-full">Question {questionNumber} of {totalQuestions}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{question.skill}</span>
          <span className="text-gray-500">Technical • Multiple Choice</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{question.question}</h3>

        {question.code && (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 font-mono text-sm">
            <pre>{question.code}</pre>
          </div>
        )}

        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => setSelectedAnswer(index)}
                className="w-4 h-4 text-blue-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Skip Question
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;