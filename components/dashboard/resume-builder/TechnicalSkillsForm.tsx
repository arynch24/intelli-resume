"use client";

import React, { useState } from 'react';
import { Code } from 'lucide-react';

const TechnicalSkillsForm: React.FC<{
    data: { languages: string[]; developerTools: string[]; technologiesFrameworks: string[] };
    onChange: (data: { languages: string[]; developerTools: string[]; technologiesFrameworks: string[] }) => void;
}> = ({ data, onChange }) => {
    // Local state to track input values for real-time typing
    const [inputValues, setInputValues] = useState({
        languages: data.languages.join(', '),
        developerTools: data.developerTools.join(', '),
        technologiesFrameworks: data.technologiesFrameworks.join(', ')
    });

    const updateSkills = (category: keyof typeof data, value: string) => {
        // Update local input state immediately for real-time display
        setInputValues(prev => ({ ...prev, [category]: value }));
        
        // Parse and update parent component data
        const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
        onChange({ ...data, [category]: skills });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Technical Skills</h3>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                    <input
                        type="text"
                        placeholder="Python, Java, JavaScript, etc. (comma-separated)"
                        value={inputValues.languages}
                        onChange={(e) => updateSkills('languages', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Developer Tools</label>
                    <input
                        type="text"
                        placeholder="VS Code, Git, Docker, etc. (comma-separated)"
                        value={inputValues.developerTools}
                        onChange={(e) => updateSkills('developerTools', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technologies/Frameworks</label>
                    <input
                        type="text"
                        placeholder="React, Node.js, MongoDB, etc. (comma-separated)"
                        value={inputValues.technologiesFrameworks}
                        onChange={(e) => updateSkills('technologiesFrameworks', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};

export default TechnicalSkillsForm;