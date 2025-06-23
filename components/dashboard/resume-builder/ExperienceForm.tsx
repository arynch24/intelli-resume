"use client";

import { Plus, Trash2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Experience, LoadingStates, AISuggestions, AIDialogState } from '@/types/resume';
import { generateExperienceResponsibilities } from '@/services/aiService';
import AISuggestionBox from './AISuggestionBox';
import AIDialog from './AIDialog';

const ExperienceForm: React.FC<{
  data: Experience[];
  onChange: (data: Experience[]) => void;
  title: string;
  icon: React.ReactNode;
}> = ({ data, onChange, title, icon }) => {
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions>({});
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});
  const [dialogState, setDialogState] = useState<AIDialogState>({
    isOpen: false,
    projectId: null,
    suggestions: []
  });

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: ['']
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    onChange(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
    // Clean up AI suggestions for removed experience
    const newSuggestions = { ...aiSuggestions };
    delete newSuggestions[id];
    setAiSuggestions(newSuggestions);
  };

  const addResponsibility = (id: string) => {
    const experience = data.find(e => e.id === id);
    if (experience) {
      updateExperience(id, 'responsibilities', [...experience.responsibilities, '']);
    }
  };

  const updateResponsibility = (id: string, index: number, value: string) => {
    const experience = data.find(e => e.id === id);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(id, 'responsibilities', newResponsibilities);
    }
  };

  const removeResponsibility = (id: string, index: number) => {
    const experience = data.find(e => e.id === id);
    if (experience && experience.responsibilities.length > 1) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(id, 'responsibilities', newResponsibilities);
    }
  };

  const generateAISuggestion = async (experienceId: string): Promise<void> => {
    const experience = data.find(e => e.id === experienceId);
    if (!experience) return;

    setLoadingStates(prev => ({ ...prev, [experienceId]: true }));
    
    try {
      const suggestions = await generateExperienceResponsibilities(experience);
      
      if (experience.responsibilities.length === 1) {
        // Single responsibility - show inline suggestion
        setAiSuggestions(prev => ({ ...prev, [experienceId]: suggestions }));
      } else {
        // Multiple responsibilities - show dialog
        setDialogState({
          isOpen: true,
          projectId: experienceId,
          suggestions: suggestions
        });
      }
    } catch (error) {
      console.error('Failed to generate AI suggestion:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [experienceId]: false }));
    }
  };

  const acceptAISuggestion = (experienceId: string): void => {
    const suggestions = aiSuggestions[experienceId];
    if (suggestions) {
      updateExperience(experienceId, 'responsibilities', suggestions);
      setAiSuggestions(prev => ({ ...prev, [experienceId]: null }));
    }
  };

  const declineAISuggestion = (experienceId: string): void => {
    setAiSuggestions(prev => ({ ...prev, [experienceId]: null }));
  };

  const acceptDialogSuggestions = (): void => {
    if (dialogState.projectId) {
      updateExperience(dialogState.projectId, 'responsibilities', dialogState.suggestions);
      setDialogState({ isOpen: false, projectId: null, suggestions: [] });
    }
  };

  const declineDialogSuggestions = (): void => {
    setDialogState({ isOpen: false, projectId: null, suggestions: [] });
  };

  const regenerateDialogSuggestions = async () => {
    if (!dialogState.projectId) return;
    
    const experience = data.find(e => e.id === dialogState.projectId);
    if (!experience) return;

    setLoadingStates(prev => ({ ...prev, [dialogState.projectId!]: true }));
    
    try {
      const suggestions = await generateExperienceResponsibilities(experience);
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
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add {title}
          </button>
        </div>

        {data.map((experience) => (
          <div key={experience.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">{title} Entry</h4>
              <button
                onClick={() => removeExperience(experience.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Company/Organization"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Role/Position"
                value={experience.role}
                onChange={(e) => updateExperience(experience.id, 'role', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Location"
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Start (MM YYYY)"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="End (MM YYYY)"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Responsibilities</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateAISuggestion(experience.id)}
                    disabled={loadingStates[experience.id]}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    {loadingStates[experience.id] ? 'Generating...' : 'AI Generate Suggestion'}
                  </button>
                  <button
                    onClick={() => addResponsibility(experience.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </div>

              {/* Inline AI Suggestion Box (for single responsibility) */}
              {aiSuggestions[experience.id] && experience.responsibilities.length === 1 && (
                <AISuggestionBox
                  suggestion={aiSuggestions[experience.id]![0]}
                  onAccept={() => acceptAISuggestion(experience.id)}
                  onDecline={() => declineAISuggestion(experience.id)}
                  onRegenerate={() => generateAISuggestion(experience.id)}
                />
              )}

              {experience.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    placeholder="Responsibility/Achievement"
                    value={resp}
                    onChange={(e) => updateResponsibility(experience.id, index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    rows={resp.length > 100 ? 3 : 2}
                  />
                  {experience.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeResponsibility(experience.id, index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
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

export default ExperienceForm;