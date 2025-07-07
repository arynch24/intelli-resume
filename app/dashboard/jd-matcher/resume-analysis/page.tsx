"use client";

import { ResumeHeader } from '@/components/dashboard/jd-matcher/ResumeHeader';
import { CircularProgress } from '@/components/dashboard/jd-matcher/CircularProgress';
import { ProgressBar } from '@/components/dashboard/jd-matcher/ProgressBar';
import { SkillTag } from '@/components/dashboard/jd-matcher/SkillTag';
import { SectionCard } from '@/components/dashboard/jd-matcher/SectionCard';
import { ResumeJDUpload } from '@/components/dashboard/ResumeJdUpload';
import { ResumeAnalysis } from '@/types/resume';
import { SquarePen, Info, Copy } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

// Mock data - in a real app, this would come from an API
const mockData: ResumeAnalysis = {
  fileName: "Product_Manager_Resume_2023.pdf",
  lastUpdated: "2 hours ago",
  atsScore: 78,
  jobMatchRate: 68,
  formatCompliance: 90,
  keywordOptimization: 75,
  readability: 65,
  matchedSkills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
  missingSkills: ["Data Analytics", "SQL", "B2B Experience"],
  jobTitle: "Senior Product Manager - Tech",
  summary: "Experienced Product Manager with 5+ years of expertise in developing user-centric digital products. Demonstrated success in leading cross-functional teams to deliver innovative solutions that increased user engagement by 28%. Strong background in Agile methodologies, product stakeholder management with a track record of launching 12+ successful products in SaaS environments.",
  sections: {
    contactInfo: {
      rating: 'Excellent',
      description: 'Your contact information is complete and properly formatted.',
      positives: [
        'All essential contact details are present',
        'Professional email address format',
        'LinkedIn profile included'
      ],
      warnings: [],
      suggestions: []
    },
    professionalSummary: {
      rating: 'Good',
      description: 'Your summary is good but could be improved with more specific achievements.',
      positives: [
        'Good length (51 words)',
        'Includes relevant skills'
      ],
      warnings: [
        'Could use more quantifiable achievements'
      ],
      suggestions: [
        'Add 1-2 specific metrics to showcase your impact',
        'Include relevant industry keywords: SaaS, B2C, Product Development',
        'Mention your most impressive achievement'
      ]
    },
    workExperience: {
      rating: 'Needs Improvement',
      description: 'Your experience section needs more quantifiable achievements and action verbs.',
      positives: [
        'Clear job titles and dates'
      ],
      warnings: [
        'Only 2 of 8 bullet points contain metrics',
        'Too many generic descriptions'
      ],
      suggestions: [
        'Replace generic verbs (managed, worked on) with powerful action verbs (spearheaded, orchestrated)',
        'Add metrics to at least 60% of your bullet points',
        'Focus on achievements rather than responsibilities',
        'Include relevant keywords from the job description'
      ]
    },
    skills: {
      rating: 'Excellent',
      description: 'Your skills section is well-organized and comprehensive.',
      positives: [
        'Good mix of technical and soft skills',
        'Organized by categories',
        'Includes relevant industry tools'
      ],
      warnings: [],
      suggestions: []
    },
    education: {
      rating: 'Good',
      description: 'Your education section is good but could use minor improvements.',
      positives: [
        'Includes degree, institution, and graduation year',
        'GPA included (3.8/4.0)'
      ],
      warnings: [],
      suggestions: []
    }
  }
};

export default function JdMatcher() {

  const { openDialog, setOpenDialog } = useDashboard();

  const handleRefresh = () => {
    console.log('Refreshing analysis...');
  };

  const handleDownload = () => {
    console.log('Downloading report...');
  };

  const handleUploadNew = () => {
    setOpenDialog(true);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(mockData.summary)
      .then(() => {
        console.log('Summary copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy summary: ', err);
      });
  };

  if (openDialog) {
    return <>
      <ResumeJDUpload />
    </>
  }


  return (
    <div className="h-screen bg-gray-50 overflow-y-scroll">
      <div className='sticky top-0 px-8 py-4 shadow-sm bg-white border-b border-gray-100 z-10'>
        <ResumeHeader
          fileName={mockData.fileName}
          lastUpdated={mockData.lastUpdated}
          onRefresh={handleRefresh}
          onDownload={handleDownload}
          onUploadNew={handleUploadNew}
        />
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ATS Compatibility Score */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-semibold text-gray-900">ATS Compatibility Score</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              How well your resume passes automated screening
            </p>

            <div className="flex items-center mt-12">
              <div className="flex-1">
                <CircularProgress
                  percentage={mockData.atsScore}
                  color="#3B82F6"
                  label="ATS Score"
                />
              </div>

              <div className="flex-1 mr-4">
                <ProgressBar
                  label="Format Compliance"
                  percentage={mockData.formatCompliance}
                />
                <ProgressBar
                  label="Keyword Optimization"
                  percentage={mockData.keywordOptimization}
                />
                <ProgressBar
                  label="Readability"
                  percentage={mockData.readability}
                />
              </div>
            </div>
          </div>

          {/* Job Description Match */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-semibold text-gray-900">Job Description Match</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              For: {mockData.jobTitle}
            </p>

            <div className="flex items-center justify-between mb-6">
              <CircularProgress
                percentage={mockData.jobMatchRate}
                color="#10B981"
                label="Match Rate"
              />

              <div className="flex-1 ml-8">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Key Matched Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockData.matchedSkills.map((skill, index) => (
                      <SkillTag key={index} skill={skill} type="matched" />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Missing Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockData.missingSkills.map((skill, index) => (
                      <SkillTag key={index} skill={skill} type="missing" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI-Generated Resume Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">AI-Generated Resume Summary</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{mockData.summary}</p>
          <div className="flex justify-end mt-4 cursor-pointer">
            <span className="text-sm text-gray-500 px-3 py-2 rounded  w-fit hover:bg-gray-50 hover:text-blue-500"
              onClick={handleCopyToClipboard}>
              <Copy size={16} className="inline mr-1" />
              Copy to clipboard
            </span>
          </div>
        </div>

        {/* Section-by-Section Analysis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Section-by-Section Analysis</h2>

          <SectionCard
            title="Contact Information"
            analysis={mockData.sections.contactInfo}
          />

          <SectionCard
            title="Professional Summary"
            analysis={mockData.sections.professionalSummary}
          />

          <SectionCard
            title="Work Experience"
            analysis={mockData.sections.workExperience}
          />

          <SectionCard
            title="Skills"
            analysis={mockData.sections.skills}
          />

          <SectionCard
            title="Education"
            analysis={mockData.sections.education}
          />
        </div>
      </div>
    </div>
  );
}