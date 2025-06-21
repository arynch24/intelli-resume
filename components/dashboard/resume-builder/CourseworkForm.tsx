"use client";

import { FileText } from 'lucide-react';

const CourseworkForm: React.FC<{
  data: string[];
  onChange: (data: string[]) => void;
}> = ({ data, onChange }) => {
  const updateCoursework = (value: string) => {
    const courses = value.split(',').map(course => course.trim()).filter(course => course);
    onChange(courses);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Additional Coursework</h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Courses</label>
        <input
          type="text"
          placeholder="Machine Learning, Cloud Computing, etc. (comma-separated)"
          value={data.join(', ')}
          onChange={(e) => updateCoursework(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default CourseworkForm;