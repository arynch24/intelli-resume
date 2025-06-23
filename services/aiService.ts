import { Project } from '@/types/resume';

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