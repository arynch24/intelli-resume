"use client";

interface CircularProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    size = 170,
    strokeWidth = 16,
    color = '#3B82F6',
    label
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center ">
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-in-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
                {label && <span className="text-sm text-gray-600 mt-1">{label}</span>}
            </div>
        </div>
    );
};