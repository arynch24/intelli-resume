"use client";

import { Plus, Trash2, Code } from 'lucide-react';
import { Project } from '@/types/resume';

const ProjectsForm: React.FC<{
  data: Project[];
  onChange: (data: Project[]) => void;
}> = ({ data, onChange }) => {
  const addProject = () => {
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

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    onChange(data.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
  };

  const addDescriptionPoint = (id: string) => {
    const project = data.find(p => p.id === id);
    if (project) {
      updateProject(id, 'description', [...project.description, '']);
    }
  };

  const updateDescriptionPoint = (id: string, index: number, value: string) => {
    const project = data.find(p => p.id === id);
    if (project) {
      const newDescription = [...project.description];
      newDescription[index] = value;
      updateProject(id, 'description', newDescription);
    }
  };

  const removeDescriptionPoint = (id: string, index: number) => {
    const project = data.find(p => p.id === id);
    if (project && project.description.length > 1) {
      const newDescription = project.description.filter((_, i) => i !== index);
      updateProject(id, 'description', newDescription);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Projects</h3>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              className="text-red-500 hover:text-red-700"
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
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Date (MM YYYY)"
              value={project.date}
              onChange={(e) => updateProject(project.id, 'date', e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Description Points</label>
              <button
                onClick={() => addDescriptionPoint(project.id)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + Add Point
              </button>
            </div>
            {project.description.map((desc, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Description point"
                  value={desc}
                  onChange={(e) => updateDescriptionPoint(project.id, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                {project.description.length > 1 && (
                  <button
                    onClick={() => removeDescriptionPoint(project.id, index)}
                    className="text-red-500 hover:text-red-700"
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;