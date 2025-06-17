"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    TrendingUp,
    HelpCircle,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    User
} from 'lucide-react';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activeItem, setActiveItem] = useState('/dashboard'); // Track active item by path

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Dashboard',
            navigate: '/dashboard'
        },
        {
            icon: FileText,
            label: 'Resume Review',
            navigate: '/dashboard/resume-review'
        },
        {
            icon: TrendingUp,
            label: 'Skill Insights',
            navigate: '/dashboard/skill-insights'
        },
        {
            icon: HelpCircle,
            label: 'Quiz',
            navigate: '/dashboard/quiz'
        },
        {
            icon: BarChart3,
            label: 'Reports',
            navigate: '/dashboard/reports'
        },
        {
            icon: Settings,
            label: 'Settings',
            navigate: '/dashboard/settings'
        }
    ];

    const handleItemClick = (path: any) => {
        setActiveItem(path);
    };

    return (
        <div className={`relative bg-slate-900 text-white transition-all duration-300 ease-in-out ${isExpanded ? 'w-80' : 'w-16'
            } min-h-screen`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-3 top-8 bg-slate-900 border border-slate-700 rounded-full p-1.5 hover:bg-slate-800 transition-colors z-10"
            >
                {isExpanded ? (
                    <ChevronLeft className="w-4 h-4" />
                ) : (
                    <ChevronRight className="w-4 h-4" />
                )}
            </button>

            {/* Logo Section */}
            <div className="p-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    {isExpanded && (
                        <div>
                            <h1 className="text-lg font-bold text-white">ResumeAI</h1>
                            <p className="text-xs text-slate-400">Smart Resume Analysis</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-2 mt-4">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => {
                        const IconComponent = item.icon;
                        const isActive = activeItem === item.navigate;

                        return (
                            <li key={index} className="relative group">
                                <Link
                                    href={item.navigate}
                                    onClick={() => handleItemClick(item.navigate)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-slate-800 ${isActive ? 'bg-blue-600 hover:bg-blue-700' : ''
                                        }`}
                                >
                                    <IconComponent className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                                        }`} />

                                    {isExpanded && (
                                        <div className="flex-1 text-left overflow-hidden">
                                            <div className={`font-medium ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                                                }`}>
                                                {item.label}
                                            </div>
                                        </div>
                                    )}
                                </Link>

                                {/* Tooltip for collapsed state */}
                                {!isExpanded && (
                                    <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-20 whitespace-nowrap">
                                        <div className="font-medium">{item.label}</div>
                                        <div className="absolute left-0 top-3 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile Section (Bottom) */}
            {isExpanded && (
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">John Doe</div>
                            <div className="text-xs text-slate-400">Premium User</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;