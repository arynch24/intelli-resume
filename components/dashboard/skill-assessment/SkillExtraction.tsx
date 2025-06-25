"use client";

import { useState } from 'react';
import { Code, Users, AlertCircle, ChevronRight } from 'lucide-react';
import { Skill } from '@/types/resume';
import SkillTag from './SkillTag';
import AddSkillButton from './AddSkillButton';


// Mock Data
const mockSkills: Skill[] = [
    { id: '1', name: 'JavaScript', type: 'technical' },
    { id: '2', name: 'React', type: 'technical' },
    { id: '3', name: 'Python', type: 'technical' },
    { id: '4', name: 'SQL', type: 'technical' },
    { id: '5', name: 'Node.js', type: 'technical' },
    { id: '6', name: 'Git', type: 'technical' },
    { id: '7', name: 'Teamwork', type: 'soft' },
    { id: '8', name: 'Communication', type: 'soft' },
    { id: '9', name: 'Problem Solving', type: 'soft' },
    { id: '10', name: 'Adaptability', type: 'soft' },
    { id: '11', name: 'Time Management', type: 'soft' },
];

const SkillExtraction: React.FC<{
    skills?: Skill[];
    onSkillsChange?: (skills: Skill[]) => void;
    onNext?: () => void;
}> = ({
    skills = mockSkills,
    onSkillsChange = () => { },
    onNext = () => { }
}) => {
        const [currentSkills, setCurrentSkills] = useState<Skill[]>(skills);

        const addSkill = (name: string, type: 'technical' | 'soft') => {
            const newSkill: Skill = {
                id: Date.now().toString(),
                name,
                type
            };
            const updatedSkills = [...currentSkills, newSkill];
            setCurrentSkills(updatedSkills);
            onSkillsChange(updatedSkills);
        };

        const removeSkill = (skillId: string) => {
            const updatedSkills = currentSkills.filter(skill => skill.id !== skillId);
            setCurrentSkills(updatedSkills);
            onSkillsChange(updatedSkills);
        };

        const technicalSkills = currentSkills.filter(skill => skill.type === 'technical');
        const softSkills = currentSkills.filter(skill => skill.type === 'soft');

        return (
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-6xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Skills Extracted from Resume</h2>
                        <p className="text-gray-500 text-sm">Last updated: 2 hours ago</p>
                    </div>

                    {/* Technical Skills */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Code className="text-blue-500" size={20} />
                            <h3 className="text-lg font-medium text-gray-900">Technical Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3 items-center">
                            {technicalSkills.map(skill => (
                                <SkillTag key={skill.id} skill={skill} onRemove={removeSkill} />
                            ))}
                            <AddSkillButton type="technical" onAdd={addSkill} />
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="text-purple-500" size={20} />
                            <h3 className="text-lg font-medium text-gray-900">Soft Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3 items-center">
                            {softSkills.map(skill => (
                                <SkillTag key={skill.id} skill={skill} onRemove={removeSkill} />
                            ))}
                            <AddSkillButton type="soft" onAdd={addSkill} />
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-lg">
                        <AlertCircle size={20} className="text-blue-600" />
                        <span className="text-blue-800 text-sm">Verify and edit your skills before proceeding to the assessment</span>
                    </div>

                    <button
                        onClick={onNext}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 font-medium"
                    >
                        Start Skill Assessment
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        );
    };

export default SkillExtraction;