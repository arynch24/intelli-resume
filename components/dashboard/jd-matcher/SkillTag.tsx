"use client";

interface SkillTagProps {
    skill: string;
    type: 'matched' | 'missing';
}

export const SkillTag: React.FC<SkillTagProps> = ({ skill, type }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    const typeClasses = type === 'matched'
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";

    return (
        <span className={`${baseClasses} ${typeClasses}`}>
            {skill}
        </span>
    );
};