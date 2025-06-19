"use client";

import React, { useState } from 'react';
import { AlertTriangle, X, Check, Edit, Upload, FileText } from 'lucide-react';

// Type definitions
interface CategoryData {
  name: string;
  issues: number;
  color: string;
}

interface SearchabilitySubItem {
  status: 'success' | 'error' | 'warning';
  text: string;
}

interface SearchabilityItem {
  category: string;
  status?: 'success' | 'error' | 'warning';
  title?: string;
  text?: string;
  action?: string;
  items?: SearchabilitySubItem[];
}

interface MatchData {
  overallMatch: string;
  matchPercentage: number;
  categories: CategoryData[];
  searchabilityItems: SearchabilityItem[];
  jobDescription?: {
    company: string;
    position: string;
    requirements: string[];
    responsibilities: string[];
    skills: string[];
    experience: string;
    location: string;
    salary?: string;
  };
}

interface StatusIconProps {
  status: 'success' | 'error' | 'warning';
}

interface CircularProgressProps {
  percentage: number;
  label: string;
}

const ResumeMatchReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'job'>('resume');

  // Sample data - you can replace this with your API data
  const matchData: MatchData = {
    overallMatch: 'Low',
    matchPercentage: 25,
    categories: [
      { name: 'Searchability', issues: 8, color: 'bg-red-500' },
      { name: 'Hard Skills', issues: 16, color: 'bg-red-500' },
      { name: 'Soft Skills', issues: 3, color: 'bg-blue-200' },
      { name: 'Recruiter Tips', issues: 2, color: 'bg-blue-400' },
      { name: 'Formatting', issues: 1, color: 'bg-blue-400' }
    ],
    searchabilityItems: [
      {
        category: 'ATS Tip',
        status: 'error',
        title: "Adding this job's company name and web address can help us provide you ATS-specific tips.",
        action: 'Update scan information'
      },
      {
        category: 'Contact Information',
        items: [
          { status: 'error', text: 'We did not find an address in your resume. Recruiters use your address to validate your location for job matches.' },
          { status: 'success', text: 'You provided your email. Recruiters use your email to contact you for job matches.' },
          { status: 'success', text: 'You provided your phone number.' }
        ]
      },
      {
        category: 'Summary',
        status: 'warning',
        text: 'We did not find a summary section on your resume. The summary provides a quick overview of the candidate\'s qualifications, helping recruiters and hiring managers promptly grasp the value the candidate can offer in the position.'
      }
    ],
    jobDescription: {
      company: 'TechCorp Inc.',
      position: 'Frontend Developer',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years of experience in frontend development',
        'Proficiency in React, TypeScript, and modern JavaScript',
        'Experience with responsive design and CSS frameworks',
        'Knowledge of version control systems (Git)',
        'Understanding of RESTful APIs and GraphQL'
      ],
      responsibilities: [
        'Develop and maintain user-facing web applications',
        'Collaborate with designers to implement pixel-perfect UI/UX',
        'Optimize applications for maximum speed and scalability',
        'Write clean, maintainable, and well-documented code',
        'Participate in code reviews and mentor junior developers',
        'Stay up-to-date with emerging technologies and best practices'
      ],
      skills: [
        'React',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Git',
        'REST APIs',
        'GraphQL',
        'Webpack',
        'Jest',
        'Cypress'
      ],
      experience: '3-5 years',
      location: 'San Francisco, CA (Remote friendly)',
      salary: '$90,000 - $130,000'
    }
  };

  const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
    switch (status) {
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'error':
        return <X className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, label }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#10b981"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">Match rate</span>
        </div>
      </div>
    );
  };

  const handleTabChange = (tab: 'resume' | 'job'): void => {
    setActiveTab(tab);
  };

  const handleUploadRescan = (): void => {
    // Handle upload and rescan functionality
    console.log('Upload & rescan clicked');
  };

  const handlePowerEdit = (): void => {
    // Handle power edit functionality
    console.log('Power edit clicked');
  };

  const handleTrack = (): void => {
    // Handle track functionality
    console.log('Track clicked');
  };

  const handlePrint = (): void => {
    // Handle print functionality
    console.log('Print clicked');
  };

  const handleUpdateScanInfo = (): void => {
    // Handle update scan information
    console.log('Update scan information clicked');
  };

  return (
    <div className="h-screen bg-white">
      {/* Header - Fixed at top */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Resume scan results</p>
              <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
                Company - frontend developer
                <Edit className="w-4 h-4 ml-2 text-gray-400" />
              </h1>
            </div>
            <div className="flex gap-2">
              <button 
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleTrack}
              >
                <FileText className="w-4 h-4 mr-2" />
                Track
              </button>
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={handlePrint}
              >
                <FileText className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 h-full flex">
        {/* Left Sidebar - Fixed */}
        <div className="w-80 pr-8">
          <div className="fixed top-28">
            {/* Match Rate */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Match Rate</h2>
              <div className="flex justify-center mb-4">
                <CircularProgress percentage={matchData.matchPercentage} label={matchData.overallMatch} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button 
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleUploadRescan}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload & rescan
              </button>
              <button 
                className="w-full flex items-center justify-center px-4 py-3 border border-yellow-300 text-yellow-700 bg-yellow-50 rounded-md hover:bg-yellow-100"
                onClick={handlePowerEdit}
              >
                <Edit className="w-4 h-4 mr-2" />
                Power Edit
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              {matchData.categories.map((category: CategoryData, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-600 mr-3">{category.issues} issues to fix</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className={`h-2 rounded-full ${category.color}`} style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 h-full overflow-y-scroll">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 bg-white z-10 pb-4">
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'resume'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('resume')}
            >
              Resume
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'job'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('job')}
            >
              Job Description
            </button>
          </div>

          {/* Content */}
          <div className="pb-8 overflow-y-auto">
            {activeTab === 'resume' ? (
              // Resume Content
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mr-3">Searchability</h2>
                    <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">IMPORTANT</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    An ATS (Applicant Tracking System) is a software used by 90% of companies and recruiters to search for resumes and manage the hiring process. Below is how well your resume appears in an ATS and a recruiter search.
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    <strong>Tip:</strong> Fix the red Xs to ensure your resume is easily searchable by recruiters and parsed correctly by the ATS.
                  </p>
                </div>

                {/* Searchability Items */}
                <div className="space-y-6">
                  {matchData.searchabilityItems.map((item: SearchabilityItem, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                          <span className="text-xs font-medium text-blue-600">?</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-3">{item.category}</h3>
                          
                          {item.items ? (
                            <div className="space-y-3">
                              {item.items.map((subItem: SearchabilitySubItem, subIndex: number) => (
                                <div key={subIndex} className="flex items-start">
                                  <StatusIcon status={subItem.status} />
                                  <p className="ml-3 text-sm text-gray-600">{subItem.text}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-start">
                              {item.status && <StatusIcon status={item.status} />}
                              <div className="ml-3 flex-1">
                                <p className="text-sm text-gray-600 mb-2">{item.title || item.text}</p>
                                {item.action && (
                                  <button 
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                    onClick={handleUpdateScanInfo}
                                  >
                                    {item.action}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Job Description Content
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
                  <p className="text-gray-600 mb-6">
                    Review the job requirements and responsibilities to understand what the employer is looking for.
                  </p>
                </div>

                {matchData.jobDescription && (
                  <div className="space-y-6">
                    {/* Company & Position */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{matchData.jobDescription.position}</h3>
                          <p className="text-gray-600">{matchData.jobDescription.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{matchData.jobDescription.location}</p>
                          {matchData.jobDescription.salary && (
                            <p className="text-sm font-medium text-green-600">{matchData.jobDescription.salary}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {matchData.jobDescription.experience}
                        </span>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Requirements</h4>
                      <ul className="space-y-2">
                        {matchData.jobDescription.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsibilities */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {matchData.jobDescription.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Skills */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {matchData.jobDescription.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMatchReport;