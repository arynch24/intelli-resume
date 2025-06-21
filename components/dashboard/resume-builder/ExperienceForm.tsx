"use client";

import { Plus, Trash2 } from 'lucide-react';
import { Experience } from '@/types/resume';

const ExperienceForm: React.FC<{
  data: Experience[];
  onChange: (data: Experience[]) => void;
  title: string;
  icon: React.ReactNode;
}> = ({ data, onChange, title, icon }) => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              className="text-red-500 hover:text-red-700"
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
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Role/Position"
              value={experience.role}
              onChange={(e) => updateExperience(experience.id, 'role', e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={experience.location}
              onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Start (MM YYYY)"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="End (MM YYYY)"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Responsibilities</label>
              <button
                onClick={() => addResponsibility(experience.id)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + Add Responsibility
              </button>
            </div>
            {experience.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Responsibility/Achievement"
                  value={resp}
                  onChange={(e) => updateResponsibility(experience.id, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                {experience.responsibilities.length > 1 && (
                  <button
                    onClick={() => removeResponsibility(experience.id, index)}
                    className="text-red-500 hover:text-red-700"
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
  );
};

export default ExperienceForm;