"use client";

import { Award } from 'lucide-react';

const CertificationsForm: React.FC<{
  data: string[];
  onChange: (data: string[]) => void;
}> = ({ data, onChange }) => {
  const updateCertifications = (value: string) => {
    const certs = value.split(',').map(cert => cert.trim()).filter(cert => cert);
    onChange(certs);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Certifications</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
        <textarea
          placeholder="ReactJS & Redux - Udemy, Python for Data Science - XIE, etc. (comma-separated)"
          value={data.join(', ')}
          onChange={(e) => updateCertifications(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default CertificationsForm;