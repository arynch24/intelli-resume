"use client";

interface ProgressBarProps {
    label: string;
    percentage: number;
    color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    label,
    percentage,
    color = '#10B981'
}) => {
    const getColorClass = () => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        return 'bg-orange-500';
    };

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-bold text-gray-900">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-300 ${getColorClass()}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};