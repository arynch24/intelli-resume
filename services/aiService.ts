import { Project, Experience, Extracurricular } from '@/types/resume';

// Mock AI suggestion function - replace with your actual AI API call
export const generateProjectSuggestions = async (projectData: Project): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock response based on number of existing description points
  const numPoints = projectData.description.length;
  const suggestions: string[] = [];

  for (let i = 0; i < numPoints; i++) {
    const templates = [
      `Developed ${projectData.name || 'innovative solution'} using ${projectData.technologies || 'modern technologies'} that increased user engagement by ${40 + i * 10}% and improved performance metrics by ${25 + i * 5}%.`,
      `Implemented ${projectData.name || 'scalable system'} with ${projectData.technologies || 'cutting-edge tools'} resulting in ${30 + i * 15}% reduction in load times and ${20 + i * 10}% improvement in user satisfaction.`,
      `Led development of ${projectData.name || 'enterprise application'} utilizing ${projectData.technologies || 'industry-standard frameworks'} that streamlined processes by ${35 + i * 12}% and reduced operational costs by ${15 + i * 8}%.`,
      `Architected ${projectData.name || 'responsive platform'} with ${projectData.technologies || 'advanced technologies'} achieving ${50 + i * 8}% faster rendering and ${30 + i * 6}% better accessibility scores.`,
      `Collaborated on ${projectData.name || 'cross-platform solution'} using ${projectData.technologies || 'versatile tech stack'} that enhanced workflow efficiency by ${45 + i * 7}% and improved team productivity by ${25 + i * 9}%.`
    ];

    suggestions.push(templates[i % templates.length]);
  }

  return suggestions;
};

// Mock AI suggestion function for experience responsibilities - replace with your actual AI API call
export const generateExperienceResponsibilities = async (experienceData: Experience): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock response based on number of existing responsibilities
  const numPoints = experienceData.responsibilities.length;
  const suggestions: string[] = [];

  for (let i = 0; i < numPoints; i++) {
    const templates = [
      `Led ${experienceData.role || 'team initiatives'} at ${experienceData.company || 'the organization'} resulting in ${25 + i * 8}% improvement in operational efficiency and ${30 + i * 5}% increase in team productivity.`,
      `Developed and implemented ${experienceData.role || 'strategic solutions'} that reduced processing time by ${35 + i * 10}% and improved customer satisfaction scores by ${20 + i * 7}%.`,
      `Managed cross-functional teams of ${5 + i * 3}+ members while maintaining ${95 + i * 2}% project completion rate and delivering initiatives ${15 + i * 5}% ahead of schedule.`,
      `Collaborated with stakeholders to streamline ${experienceData.role || 'business processes'} achieving ${40 + i * 6}% cost reduction and ${25 + i * 8}% improvement in quality metrics.`,
      `Spearheaded ${experienceData.role || 'innovation projects'} that generated ${50 + i * 15}K+ in annual savings and enhanced workflow efficiency by ${30 + i * 10}%.`,
      `Analyzed and optimized ${experienceData.role || 'operational workflows'} resulting in ${20 + i * 12}% reduction in errors and ${35 + i * 4}% improvement in processing speed.`,
      `Trained and mentored ${3 + i * 2}+ team members while achieving ${90 + i * 3}% employee retention rate and ${40 + i * 5}% improvement in performance metrics.`
    ];

    suggestions.push(templates[i % templates.length]);
  }

  return suggestions;
};

// Mock AI suggestion function for extracurricular responsibilities - replace with your actual AI API call
export const generateExtracurricularResponsibilities = async (activityData: Extracurricular): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock response based on number of existing responsibilities
  const numPoints = activityData.responsibilities.length;
  const suggestions: string[] = [];

  for (let i = 0; i < numPoints; i++) {
    const templates = [
      `Served as ${activityData.role || 'active member'} in ${activityData.organization || 'the organization'} leading initiatives that increased member engagement by ${35 + i * 8}% and improved event attendance by ${25 + i * 6}%.`,
      `Organized and coordinated ${activityData.role || 'community events'} attracting ${50 + i * 20}+ participants and raising ${2000 + i * 500}+ for charitable causes while building strong community partnerships.`,
      `Led ${activityData.role || 'leadership responsibilities'} managing a team of ${8 + i * 4}+ volunteers and successfully executing ${5 + i * 2}+ major projects with ${95 + i * 2}% completion rate.`,
      `Developed and implemented ${activityData.role || 'innovative programs'} that enhanced organizational visibility by ${40 + i * 10}% and attracted ${30 + i * 15}+ new members annually.`,
      `Collaborated with diverse stakeholders to plan ${activityData.role || 'impactful activities'} resulting in ${60 + i * 12}% improvement in program effectiveness and ${45 + i * 8}% increase in community outreach.`,
      `Mentored and guided ${10 + i * 5}+ junior members while maintaining ${90 + i * 3}% retention rate and fostering leadership development in ${20 + i * 10}+ individuals.`,
      `Managed budget of ${5000 + i * 2000}+ for ${activityData.organization || 'organizational activities'} achieving ${15 + i * 5}% cost savings and ${25 + i * 7}% improvement in resource allocation efficiency.`,
      `Represented ${activityData.organization || 'the organization'} at ${3 + i * 2}+ external events and conferences, securing ${2 + i}+ strategic partnerships and enhancing institutional reputation.`,
      `Initiated and executed ${activityData.role || 'community service projects'} impacting ${100 + i * 50}+ beneficiaries and contributing ${200 + i * 100}+ volunteer hours to local causes.`,
      `Facilitated workshops and training sessions for ${25 + i * 15}+ participants, achieving ${85 + i * 5}% satisfaction ratings and ${70 + i * 8}% skill improvement metrics.`
    ];

    suggestions.push(templates[i % templates.length]);
  }

  return suggestions;
};