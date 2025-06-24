"use client";

import { Plus, Trash2, Users, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Extracurricular, LoadingStates, AISuggestions, AIDialogState } from '@/types/resume';
import { generateExtracurricularResponsibilities } from '@/services/aiService';
import AISuggestionBox from './AISuggestionBox';
import AIDialog from './AIDialog';

const ExtracurricularForm: React.FC<{
  data: Extracurricular[];
  onChange: (data: Extracurricular[]) => void;
}> = ({ data, onChange }) => {
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions>({});
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});
  const [dialogState, setDialogState] = useState<AIDialogState>({
    isOpen: false,
    projectId: null,
    suggestions: []
  });

  const addActivity = () => {
    const newActivity: Extracurricular = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: [''],
      certificate: ''
    };
    onChange([...data, newActivity]);
  };

  const updateActivity = (id: string, field: keyof Extracurricular, value: string | string[]) => {
    onChange(data.map(act => act.id === id ? { ...act, [field]: value } : act));
  };

  const removeActivity = (id: string) => {
    onChange(data.filter(act => act.id !== id));
    // Clean up AI suggestions for removed activity
    const newSuggestions = { ...aiSuggestions };
    delete newSuggestions[id];
    setAiSuggestions(newSuggestions);
  };

  const addResponsibility = (id: string) => {
    const activity = data.find(a => a.id === id);
    if (activity) {
      updateActivity(id, 'responsibilities', [...activity.responsibilities, '']);
    }
  };

  const updateResponsibility = (id: string, index: number, value: string) => {
    const activity = data.find(a => a.id === id);
    if (activity) {
      const newResponsibilities = [...activity.responsibilities];
      newResponsibilities[index] = value;
      updateActivity(id, 'responsibilities', newResponsibilities);
    }
  };

  const removeResponsibility = (id: string, index: number) => {
    const activity = data.find(a => a.id === id);
    if (activity && activity.responsibilities.length > 1) {
      const newResponsibilities = activity.responsibilities.filter((_, i) => i !== index);
      updateActivity(id, 'responsibilities', newResponsibilities);
    }
  };

  const generateAISuggestion = async (activityId: string): Promise<void> => {
    const activity = data.find(a => a.id === activityId);
    if (!activity) return;

    setLoadingStates(prev => ({ ...prev, [activityId]: true }));
    
    try {
      const suggestions = await generateExtracurricularResponsibilities(activity);
      
      if (activity.responsibilities.length === 1) {
        // Single responsibility - show inline suggestion
        setAiSuggestions(prev => ({ ...prev, [activityId]: suggestions }));
      } else {
        // Multiple responsibilities - show dialog
        setDialogState({
          isOpen: true,
          projectId: activityId,
          suggestions: suggestions
        });
      }
    } catch (error) {
      console.error('Failed to generate AI suggestion:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [activityId]: false }));
    }
  };

  const acceptAISuggestion = (activityId: string): void => {
    const suggestions = aiSuggestions[activityId];
    if (suggestions) {
      updateActivity(activityId, 'responsibilities', suggestions);
      setAiSuggestions(prev => ({ ...prev, [activityId]: null }));
    }
  };

  const declineAISuggestion = (activityId: string): void => {
    setAiSuggestions(prev => ({ ...prev, [activityId]: null }));
  };

  const acceptDialogSuggestions = (): void => {
    if (dialogState.projectId) {
      updateActivity(dialogState.projectId, 'responsibilities', dialogState.suggestions);
      setDialogState({ isOpen: false, projectId: null, suggestions: [] });
    }
  };

  const declineDialogSuggestions = (): void => {
    setDialogState({ isOpen: false, projectId: null, suggestions: [] });
  };

  const regenerateDialogSuggestions = async () => {
    if (!dialogState.projectId) return;
    
    const activity = data.find(a => a.id === dialogState.projectId);
    if (!activity) return;

    setLoadingStates(prev => ({ ...prev, [dialogState.projectId!]: true }));
    
    try {
      const suggestions = await generateExtracurricularResponsibilities(activity);
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
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Extracurricular Activities</h3>
          </div>
          <button
            onClick={addActivity}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
        </div>

        {data.map((activity) => (
          <div key={activity.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Activity Entry</h4>
              <button
                onClick={() => removeActivity(activity.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Organization Name"
                value={activity.organization}
                onChange={(e) => updateActivity(activity.id, 'organization', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Role/Position"
                value={activity.role}
                onChange={(e) => updateActivity(activity.id, 'role', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Location"
                value={activity.location}
                onChange={(e) => updateActivity(activity.id, 'location', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Start (MM YYYY)"
                  value={activity.startDate}
                  onChange={(e) => updateActivity(activity.id, 'startDate', e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="End (MM YYYY)"
                  value={activity.endDate}
                  onChange={(e) => updateActivity(activity.id, 'endDate', e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Certificate URL (optional)"
              value={activity.certificate}
              onChange={(e) => updateActivity(activity.id, 'certificate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors"
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Responsibilities</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateAISuggestion(activity.id)}
                    disabled={loadingStates[activity.id]}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    {loadingStates[activity.id] ? 'Generating...' : 'AI Generate Suggestion'}
                  </button>
                  <button
                    onClick={() => addResponsibility(activity.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </div>

              {/* Inline AI Suggestion Box (for single responsibility) */}
              {aiSuggestions[activity.id] && activity.responsibilities.length === 1 && (
                <AISuggestionBox
                  suggestion={aiSuggestions[activity.id]![0]}
                  onAccept={() => acceptAISuggestion(activity.id)}
                  onDecline={() => declineAISuggestion(activity.id)}
                  onRegenerate={() => generateAISuggestion(activity.id)}
                />
              )}

              {activity.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    placeholder="Responsibility/Achievement"
                    value={resp}
                    onChange={(e) => updateResponsibility(activity.id, index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-1 focus:outline-none transition-colors resize-none"
                    rows={resp.length > 100 ? 3 : 2}
                  />
                  {activity.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeResponsibility(activity.id, index)}
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

export default ExtracurricularForm;