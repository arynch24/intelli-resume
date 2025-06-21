"use client";

import { Plus, Trash2, Users } from 'lucide-react';
import { Extracurricular } from '@/types/resume';

const ExtracurricularForm: React.FC<{
  data: Extracurricular[];
  onChange: (data: Extracurricular[]) => void;
}> = ({ data, onChange }) => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Extracurricular Activities</h3>
        </div>
        <button
          onClick={addActivity}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              className="text-red-500 hover:text-red-700"
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
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Role/Position"
              value={activity.role}
              onChange={(e) => updateActivity(activity.id, 'role', e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={activity.location}
              onChange={(e) => updateActivity(activity.id, 'location', e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Start (MM YYYY)"
                value={activity.startDate}
                onChange={(e) => updateActivity(activity.id, 'startDate', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="End (MM YYYY)"
                value={activity.endDate}
                onChange={(e) => updateActivity(activity.id, 'endDate', e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="Certificate URL (optional)"
            value={activity.certificate}
            onChange={(e) => updateActivity(activity.id, 'certificate', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Responsibilities</label>
              <button
                onClick={() => addResponsibility(activity.id)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + Add Responsibility
              </button>
            </div>
            {activity.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Responsibility/Achievement"
                  value={resp}
                  onChange={(e) => updateResponsibility(activity.id, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                {activity.responsibilities.length > 1 && (
                  <button
                    onClick={() => removeResponsibility(activity.id, index)}
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

export default ExtracurricularForm;