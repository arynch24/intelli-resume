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

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    cgpa: string;
    startDate: string;
    endDate: string;
    location: string;
}

export interface Project {
    id: string;
    name: string;
    technologies: string;
    date: string;
    description: string[];
    liveUrl: string;
    downloadUrl: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
}

export interface Extracurricular {
    id: string;
    organization: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
    certificate: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    education: Education[];
    projects: Project[];
    experience: Experience[];
    technicalSkills: {
        languages: string[];
        developerTools: string[];
        technologiesFrameworks: string[];
    };
    extracurricular: Extracurricular[];
    certifications: string[];
}