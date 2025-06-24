// ProjectsForm.tsx
"use client";

import { Plus, Code, Trash2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Project, LoadingStates, AISuggestions, AIDialogState } from '@/types/resume';
import { generateProjectSuggestions } from '@/services/aiService';
import AISuggestionBox from './AISuggestionBox';
import AIDialog from './AIDialog';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions>({});
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});
  const [dialogState, setDialogState] = useState<AIDialogState>({
    isOpen: false,
    projectId: null,
    suggestions: []
  });

  const addProject = (): void => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      technologies: '',
      date: '',
      description: [''],
      liveUrl: '',
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]): void => {
    onChange(data.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
  };

  const removeProject = (id: string): void => {
    onChange(data.filter(proj => proj.id !== id));
    // Clean up AI suggestions for removed project
    const newSuggestions = { ...aiSuggestions };
    delete newSuggestions[id];
    setAiSuggestions(newSuggestions);
  };

  const addDescriptionPoint = (id: string): void => {
    const project = data.find(p => p.id === id);
    if (project) {
      updateProject(id, 'description', [...project.description, '']);
    }
  };

  const updateDescriptionPoint = (id: string, index: number, value: string): void => {
    const project = data.find(p => p.id === id);
    if (project) {
      const newDescription = [...project.description];
      newDescription[index] = value;
      updateProject(id, 'description', newDescription);
    }
  };

  const removeDescriptionPoint = (id: string, index: number): void => {
    const project = data.find(p => p.id === id);
    if (project && project.description.length > 1) {
      const newDescription = project.description.filter((_, i) => i !== index);
      updateProject(id, 'description', newDescription);
    }
  };

  const generateAISuggestion = async (projectId: string): Promise<void> => {
    const project = data.find(p => p.id === projectId);
    if (!project) return;

    setLoadingStates(prev => ({ ...prev, [projectId]: true }));
    
    try {
      const suggestions = await generateProjectSuggestions(project);
      
      if (project.description.length === 1) {
        // Single description point - show inline suggestion
        setAiSuggestions(prev => ({ ...prev, [projectId]: suggestions }));
      } else {
        // Multiple description points - show dialog
        setDialogState({
          isOpen: true,
          projectId: projectId,
          suggestions: suggestions
        });
      }
    } catch (error) {
      console.error('Failed to generate AI suggestion:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [projectId]: false }));
    }
  };

  const acceptAISuggestion = (projectId: string): void => {
    const suggestions = aiSuggestions[projectId];
    if (suggestions) {
      updateProject(projectId, 'description', suggestions);
      setAiSuggestions(prev => ({ ...prev, [projectId]: null }));
    }
  };

  const declineAISuggestion = (projectId: string): void => {
    setAiSuggestions(prev => ({ ...prev, [projectId]: null }));
  };

  const acceptDialogSuggestions = (): void => {
    if (dialogState.projectId) {
      updateProject(dialogState.projectId, 'description', dialogState.suggestions);
      setDialogState({ isOpen: false, projectId: null, suggestions: [] });
    }
  };

  const declineDialogSuggestions = (): void => {
    setDialogState({ isOpen: false, projectId: null, suggestions: [] });
  };

  const regenerateDialogSuggestions = async () => {
    if (!dialogState.projectId) return;
    
    const project = data.find(p => p.id === dialogState.projectId);
    if (!project) return;

    setLoadingStates(prev => ({ ...prev, [dialogState.projectId!]: true }));
    
    try {
      const suggestions = await generateProjectSuggestions(project);
      setDialogState(prev => ({ ...prev, suggestions }));
    } catch (error) {
      console.error('Failed to regenerate AI suggestions:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [dialogState.projectId!]: false }));
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Projects</h3>
          </div>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

        {data.map((project) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Project Entry</h4>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Technologies Used"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Date (MM YYYY)"
                value={project.date}
                onChange={(e) => updateProject(project.id, 'date', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Description Points</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateAISuggestion(project.id)}
                    disabled={loadingStates[project.id]}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    {loadingStates[project.id] ? 'Generating...' : 'AI Generate Suggestion'}
                  </button>
                  <button
                    onClick={() => addDescriptionPoint(project.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                  >
                    + Add Point
                  </button>
                </div>
              </div>

              {/* Inline AI Suggestion Box (for single description point) */}
              {aiSuggestions[project.id] && project.description.length === 1 && (
                <AISuggestionBox
                  suggestion={aiSuggestions[project.id]![0]}
                  onAccept={() => acceptAISuggestion(project.id)}
                  onDecline={() => declineAISuggestion(project.id)}
                  onRegenerate={() => generateAISuggestion(project.id)}
                />
              )}

              {project.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    placeholder="Description point"
                    value={desc}
                    onChange={(e) => updateDescriptionPoint(project.id, index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors resize-none"
                    rows={desc.length > 100 ? 3 : 2}
                  />
                  {project.description.length > 1 && (
                    <button
                      onClick={() => removeDescriptionPoint(project.id, index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <input
              type="url"
              placeholder="Live Site URL"
              value={project.liveUrl}
              onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
            />
          </div>
        ))}
      </div>

      <AIDialog
        isOpen={dialogState.isOpen}
        suggestions={dialogState.suggestions}
        isLoading={loadingStates[dialogState.projectId || '']}
        onClose={declineDialogSuggestions}
        onAccept={acceptDialogSuggestions}
        onRegenerate={regenerateDialogSuggestions}
      />
    </>
  );
};

export default ProjectsForm;