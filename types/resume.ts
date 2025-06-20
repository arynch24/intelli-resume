export interface ResumeAnalysis {
    fileName: string;
    lastUpdated: string;
    atsScore: number;
    jobMatchRate: number;
    formatCompliance: number;
    keywordOptimization: number;
    readability: number;
    matchedSkills: string[];
    missingSkills: string[];
    jobTitle: string;
    summary: string;
    sections: {
      contactInfo: SectionAnalysis;
      professionalSummary: SectionAnalysis;
      workExperience: SectionAnalysis;
      skills: SectionAnalysis;
      education: SectionAnalysis;
    };
  }
  
  export interface SectionAnalysis {
    rating: 'Excellent' | 'Good' | 'Needs Improvement';
    description: string;
    positives: string[];
    warnings: string[];
    suggestions: string[];
  }