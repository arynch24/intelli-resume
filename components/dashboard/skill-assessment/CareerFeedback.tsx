"use client";

import { useState } from 'react';
import { CheckCircle, AlertCircle, Download, Share2, RefreshCw } from 'lucide-react';
import { SkillScore, CareerSuggestion, LearningRecommendation, StrengthsAndImprovements } from '@/types/resume';

const CareerFeedback: React.FC<{
  skillScores: SkillScore[];
  careerSuggestions: CareerSuggestion[];
  learningRecommendations: LearningRecommendation[];
  strengthsAndImprovements: StrengthsAndImprovements;
  onRetakeAssessment: () => void;
}> = ({ skillScores, careerSuggestions, learningRecommendations, strengthsAndImprovements, onRetakeAssessment }) => {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft' | 'industry'>('technical');

  // TODO: Replace with actual API calls
  const downloadReport = async () => {
    console.log('Downloading PDF report...');
    // API call to generate and download PDF
  };

  const shareReport = async () => {
    console.log('Sharing report...');
    // API call to share report
  };

  const maxScore = Math.max(...skillScores.map(s => Math.max(s.score, s.industryAverage)));

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Proficiency Map */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Skill Proficiency Map</h2>
              <p className="text-gray-600">Based on your assessment results</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
              <CheckCircle size={16} />
              <span className="text-sm">Assessment Completed</span>
            </div>
          </div>

          {/* Radar Chart Placeholder */}
          <div className="relative" style={{ height: '400px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
                  {/* Grid circles */}
                  <circle cx="150" cy="150" r="120" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  <circle cx="150" cy="150" r="90" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  <circle cx="150" cy="150" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  <circle cx="150" cy="150" r="30" fill="none" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Grid lines */}
                  {Array.from({ length: 8 }, (_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const x2 = 150 + Math.cos(angle - Math.PI / 2) * 120;
                    const y2 = 150 + Math.sin(angle - Math.PI / 2) * 120;
                    return (
                      <line
                        key={i}
                        x1="150"
                        y1="150"
                        x2={x2}
                        y2={y2}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Data points and labels */}
                  {skillScores.slice(0, 8).map((skill, index) => {
                    const angle = (index * 45) * (Math.PI / 180);
                    const userRadius = (skill.score / 100) * 120;
                    const industryRadius = (skill.industryAverage / 100) * 120;

                    const userX = 150 + Math.cos(angle - Math.PI / 2) * userRadius;
                    const userY = 150 + Math.sin(angle - Math.PI / 2) * userRadius;
                    const industryX = 150 + Math.cos(angle - Math.PI / 2) * industryRadius;
                    const industryY = 150 + Math.sin(angle - Math.PI / 2) * industryRadius;

                    const labelX = 150 + Math.cos(angle - Math.PI / 2) * 140;
                    const labelY = 150 + Math.sin(angle - Math.PI / 2) * 140;

                    return (
                      <g key={skill.skill}>
                        {/* Industry average point */}
                        <circle cx={industryX} cy={industryY} r="3" fill="#9ca3af" />
                        {/* User score point */}
                        <circle cx={userX} cy={userY} r="4" fill="#3b82f6" />
                        {/* Label */}
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-medium fill-gray-700"
                        >
                          {skill.skill}
                        </text>
                      </g>
                    );
                  })}

                  {/* Connecting lines for user scores */}
                  <polygon
                    points={skillScores.slice(0, 8).map((skill, index) => {
                      const angle = (index * 45) * (Math.PI / 180);
                      const radius = (skill.score / 100) * 120;
                      const x = 150 + Math.cos(angle - Math.PI / 2) * radius;
                      const y = 150 + Math.sin(angle - Math.PI / 2) * radius;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                </svg>

                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 bg-blue-500 rounded"></div>
                    <span className="text-sm">Your Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 bg-gray-400 rounded"></div>
                    <span className="text-sm">Industry Average</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: 'technical', label: 'Technical Skills', color: 'blue' },
              { key: 'soft', label: 'Soft Skills', color: 'purple' },
              { key: 'industry', label: 'Industry Average', color: 'gray' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab.key
                  ? `bg-${tab.color}-100 text-${tab.color}-800`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Career Suggestions */}
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className="text-xl font-semibold mb-2">Career Suggestions</h3>
          <p className="text-gray-600 mb-4">SUITABLE ROLES</p>

          <div className="space-y-3 mb-8">
            {careerSuggestions.map((suggestion, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${suggestion.match >= 90 ? 'bg-green-50 ' :
                suggestion.match >= 80 ? 'bg-blue-50 ' :
                  'bg-orange-50 '
                }`}>
                <div className="flex items-center gap-3">
                  {suggestion.icon}
                  <span className="font-medium">{suggestion.role}</span>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${suggestion.match >= 90 ? 'bg-green-200 text-green-800' :
                  suggestion.match >= 80 ? 'bg-blue-200 text-blue-800' :
                    'bg-orange-200 text-orange-800'
                  }`}>
                  {suggestion.match}% Match
                </span>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-gray-600 mb-4">RECOMMENDED LEARNING</h4>
          <div className="space-y-3">
            {learningRecommendations.map((rec, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {rec.icon}
                  <span className="font-medium">{rec.title}</span>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className='bg-white rounded-lg p-6 shadow-sm'>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-500" size={24} />
            <h3 className="text-xl font-bold">Strengths</h3>
          </div>
          <div className="space-y-4">
            {strengthsAndImprovements.strengths.map((strength, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">{strength.skill}</h4>
                <p className="text-green-700 text-sm">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-lg p-6 shadow-sm'>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-orange-400" size={24} />
            <h3 className="text-xl font-bold">Improvement Areas</h3>
          </div>
          <div className="space-y-4">
            {strengthsAndImprovements.improvements.map((improvement, index) => (
              <div key={index} className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">{improvement.skill}</h4>
                <p className="text-orange-700 text-sm">{improvement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Tips */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold mb-3">AI TIPS</h3>
        <p className="text-gray-700 mb-3">Based on your profile, consider:</p>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Contributing to open-source JavaScript projects</li>
          <li>• Taking on more SQL-intensive tasks in your current role</li>
          <li>• Joining a Python community or study group</li>
          <li>• Using time-blocking techniques for better time management</li>
        </ul>
      </div>

      {/* Report Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={downloadReport}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Download size={20} />
          Download PDF Report
        </button>
        <button
          onClick={shareReport}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Share2 size={20} />
          Share Report
        </button>
        <button
          onClick={onRetakeAssessment}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <RefreshCw size={20} />
          Take Assessment Again
        </button>
      </div>
    </div>
  );
};

export default CareerFeedback;