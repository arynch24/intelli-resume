"use client";

import React, { useState, useCallback } from 'react';
import { User, GraduationCap, Code, Briefcase, Award, Users} from 'lucide-react';
import PersonalInfoForm from '@/components/dashboard/resume-builder/PersonalInfoForm';
import EducationForm from '@/components/dashboard/resume-builder/EducationForm';
import ProjectsForm from '@/components/dashboard/resume-builder/ProjectsForm';
import ExperienceForm from '@/components/dashboard/resume-builder/ExperienceForm';
import TechnicalSkillsForm from '@/components/dashboard/resume-builder/TechnicalSkillsForm';
import ExtracurricularForm from '@/components/dashboard/resume-builder/ExtracurricularForm';
import CertificationsForm from '@/components/dashboard/resume-builder/CertificationsForm';
import ResumeTemplate from '@/components/dashboard/resume-builder/ResumeTemplate';
import BuilderHeader from '@/components/dashboard/resume-builder/BuilderHeader';
import { ResumeData, PersonalInfo, Education, Project, Experience, Extracurricular } from '@/types/resume';

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    education: [],
    projects: [],
    experience: [],
    technicalSkills: {
      languages: [],
      developerTools: [],
      technologiesFrameworks: []
    },
    extracurricular: [],
    certifications: []
  });

  const [activeSection, setActiveSection] = useState<string>('personal');

  const updatePersonalInfo = useCallback((data: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: data }));
  }, []);

  const updateEducation = useCallback((data: Education[]) => {
    setResumeData(prev => ({ ...prev, education: data }));
  }, []);

  const updateProjects = useCallback((data: Project[]) => {
    setResumeData(prev => ({ ...prev, projects: data }));
  }, []);

  const updateExperience = useCallback((data: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience: data }));
  }, []);

  const updateTechnicalSkills = useCallback((data: { languages: string[]; developerTools: string[]; technologiesFrameworks: string[] }) => {
    setResumeData(prev => ({ ...prev, technicalSkills: data }));
  }, []);

  const updateExtracurricular = useCallback((data: Extracurricular[]) => {
    setResumeData(prev => ({ ...prev, extracurricular: data }));
  }, []);

  const updateCertifications = useCallback((data: string[]) => {
    setResumeData(prev => ({ ...prev, certifications: data }));
  }, []);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'skills', label: 'Technical Skill', icon: <Code className="w-4 h-4" /> },
    { id: 'extracurricular', label: 'Extracurricular', icon: <Users className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />;
      case 'education':
        return <EducationForm data={resumeData.education} onChange={updateEducation} />;
      case 'projects':
        return <ProjectsForm data={resumeData.projects} onChange={updateProjects} />;
      case 'experience':
        return <ExperienceForm data={resumeData.experience} onChange={updateExperience} title="Experience" icon={<Briefcase className="w-5 h-5 text-blue-600" />} />;
      case 'skills':
        return <TechnicalSkillsForm data={resumeData.technicalSkills} onChange={updateTechnicalSkills} />;
      case 'extracurricular':
        return <ExtracurricularForm data={resumeData.extracurricular} onChange={updateExtracurricular} />;
      case 'certifications':
        return <CertificationsForm data={resumeData.certifications} onChange={updateCertifications} />;
      default:
        return <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 ">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm border-b border-gray-100">
        <BuilderHeader
          score={85}
          onPreview={() => console.log('Preview clicked')}
        />
      </div>

      <div className="w-full h-[calc(100vh-102px)] mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-y-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Resume Sections</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {section.icon}
                    <span className="hidden sm:inline">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Form Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderActiveSection()}
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Live Preview</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Auto-updating
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden max-h-[700px] scrollbar-hide overflow-y-scroll">
                <ResumeTemplate  data={resumeData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
