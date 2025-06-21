"use client";

import { Phone, Mail, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ResumeData } from '@/types/resume';
import { useDashboard } from '@/context/DashboardContext';

interface ResumeTemplateProps {
    data?: ResumeData;
}

// Simple SVG icons that work better in PDF
const LinkedInIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const GitHubIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

// Mock data for demonstration
const mockData: ResumeData = {
    personalInfo: {
        fullName: 'John Doe',
        location: 'New York, NY',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@email.com',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        website: 'johndoe.dev'
    },
    education: [
        {
            id: "1",
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            cgpa: '3.8',
            startDate: 'Aug 2020',
            endDate: 'May 2024',
            location: 'New York, NY'
        }
    ],
    projects: [
        {
            id: "1",
            name: 'E-Commerce Platform',
            technologies: 'React, Node.js, MongoDB',
            date: 'Jan 2024',
            description: [
                'Built a full-stack e-commerce platform with user authentication and payment integration',
                'Implemented responsive design with modern UI/UX principles',
                'Optimized database queries resulting in 40% faster load times'
            ],
            liveUrl: 'https://project.com',
            downloadUrl: 'null'
        }
    ],
    experience: [
        {
            id: "1",
            company: 'Tech Solutions Inc',
            role: 'Software Development Intern',
            startDate: 'Jun 2023',
            endDate: 'Aug 2023',
            location: 'San Francisco, CA',
            responsibilities: [
                'Developed and maintained web applications using React and Node.js',
                'Collaborated with cross-functional teams to deliver high-quality software solutions',
                'Participated in code reviews and followed agile development practices'
            ]
        }
    ],
    technicalSkills: {
        languages: ['Python', 'JavaScript', 'Java', 'C++', 'SQL'],
        developerTools: ['VS Code', 'Git', 'Docker', 'AWS', 'Postman'],
        technologiesFrameworks: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL']
    },
    extracurricular: [
        {
            id: "1",
            organization: 'Computer Science Club',
            role: 'President',
            startDate: 'Sep 2022',
            endDate: 'May 2024',
            location: 'University Campus',
            responsibilities: [
                'Led a team of 50+ members in organizing technical workshops and coding competitions',
                'Coordinated with industry professionals for guest lectures and mentorship programs'
            ],
            certificate: 'true'
        }
    ],
    certifications: [
        'AWS Cloud Practitioner',
        'React Developer Certification',
        'Google Analytics Certified',
        'MongoDB Developer',
        'Scrum Master Certified',
        'Docker Fundamentals'
    ]
};

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data = mockData }) => {
    const { personalInfo, education, projects, experience, technicalSkills, extracurricular, certifications } = data;
    const [zoom, setZoom] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const { resumeRef } = useDashboard();

    useEffect(() => {
        const handleWheel = (e: WheelEvent): void => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setZoom(prevZoom => Math.max(0.5, Math.min(3, prevZoom + delta)));
            }
        };

        const handleKeyDown = (e: KeyboardEvent): void => {
            if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
                e.preventDefault();
                setZoom(prevZoom => Math.min(3, prevZoom + 0.1));
            } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
                e.preventDefault();
                setZoom(prevZoom => Math.max(0.5, prevZoom - 0.1));
            } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
                e.preventDefault();
                setZoom(1);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full min-h-screen bg-gray-100 py-4 px-2 overflow-auto"
            style={{ cursor: 'grab' }}
        >
            {/* Zoom Info */}
            {/* <div className="fixed top-4 right-4 bg-white px-3 py-2 rounded shadow-md z-10 text-sm">
                Zoom: {Math.round(zoom * 100)}%
                <div className="text-xs text-gray-500 mt-1">
                    Ctrl + Scroll or Ctrl + +/-
                </div>
            </div> */}

            {/* Resume Container */}
            <div
                className="flex justify-center"
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.1s ease-out'
                }}
               
            >
                <div
                    className="bg-white text-black font-serif shadow-2xl print:shadow-none"
                    style={{
                        minWidth: "210mm",
                        minHeight: "297mm",
                        padding: "10mm",
                        fontSize: "11px",
                        lineHeight: "1.4",
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        boxSizing: "border-box"
                    }}
                    ref={resumeRef}
                >
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1
                            className="text-2xl font-bold tracking-wide mb-2 uppercase break-words"
                            style={{ color: "#000000", fontSize: "24px" }}
                        >
                            {personalInfo.fullName || 'YOUR NAME'}
                        </h1>
                        <p
                            className="mb-3"
                            style={{ color: "#666666", fontSize: "12px" }}
                        >
                            {personalInfo.location || 'city, state'}
                        </p>

                        <div className="flex justify-center items-center flex-wrap gap-3" style={{ fontSize: "10px" }}>
                            {personalInfo.phone && (
                                <span className="flex gap-1 items-center whitespace-nowrap">
                                    <Phone size={10} style={{ color: "#000000" }} />
                                    <span className="break-all">{personalInfo.phone}</span>
                                </span>
                            )}
                            {personalInfo.email && (
                                <span className="flex gap-1 items-center whitespace-nowrap">
                                    <Mail size={10} style={{ color: "#000000" }} />
                                    <span className="break-all">{personalInfo.email}</span>
                                </span>
                            )}
                            {personalInfo.linkedin && (
                                <span className="flex gap-1 items-center whitespace-nowrap">
                                    <div>
                                        <LinkedInIcon />
                                    </div>
                                    <span className="break-all">{personalInfo.linkedin}</span>
                                </span>
                            )}
                            {personalInfo.github && (
                                <span className="flex gap-1 items-center whitespace-nowrap">
                                    <div>
                                        <GitHubIcon />
                                    </div>
                                    <span className="break-all">{personalInfo.github}</span>
                                </span>
                            )}
                            {personalInfo.website && (
                                <span className="flex gap-1 items-center whitespace-nowrap">
                                    <Globe size={10} style={{ color: "#000000" }} />
                                    <span className="break-all">{personalInfo.website}</span>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="mb-5">
                        <h2
                            className="font-bold mb-3 uppercase tracking-wide"
                            style={{
                                color: "#000000",
                                borderBottom: "1.5px solid #000000",
                                paddingBottom: "2px",
                                fontSize: "14px"
                            }}
                        >
                            EDUCATION
                        </h2>
                        {education.length > 0 ? education.map((edu) => (
                            <div key={edu.id} className="mb-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold break-words" style={{ color: "#000000" }}>{edu.institution}</p>
                                        <p className="italic break-words" style={{ color: "#555555" }}>
                                            {edu.degree} - {edu.field} {edu.cgpa && `- CGPA ${edu.cgpa}`}
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0" style={{ color: "#666666" }}>
                                        <p className="font-semibold whitespace-nowrap">{edu.startDate} - {edu.endDate}</p>
                                        <p className="italic break-words">{edu.location}</p>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="mb-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold" style={{ color: "#000000" }}>College Name</p>
                                        <p className="italic" style={{ color: "#555555" }}>Degree Name - CGPA - xx</p>
                                    </div>
                                    <div className="text-right flex-shrink-0" style={{ color: "#666666" }}>
                                        <p className="font-semibold">MM YYYY - MM YYYY</p>
                                        <p className="italic">city, country</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Projects */}
                    <div className="mb-5">
                        <h2
                            className="font-bold mb-3 uppercase tracking-wide"
                            style={{
                                color: "#000000",
                                borderBottom: "1.5px solid #000000",
                                paddingBottom: "2px",
                                fontSize: "14px"
                            }}
                        >
                            PROJECTS
                        </h2>
                        {projects.length > 0 ? projects.map((project) => (
                            <div key={project.id} className="mb-4">
                                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                                    <p className="font-bold flex-1 min-w-0 break-words" style={{ color: "#000000" }}>
                                        {project.name} 🔗 | {project.technologies}
                                    </p>
                                    <p className="font-semibold flex-shrink-0 whitespace-nowrap" style={{ color: "#666666" }}>{project.date}</p>
                                </div>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    {project.description.filter(desc => desc.trim()).map((desc, index) => (
                                        <li key={index} className="break-words" style={{ color: "#000000" }}>{desc}</li>
                                    ))}
                                </ul>
                                {project.liveUrl && <p className="ml-4 break-all" style={{ color: "#2563eb", textDecoration: "underline" }}>Live site here</p>}
                                {project.downloadUrl && <p className="ml-4" style={{ color: "#2563eb", textDecoration: "underline" }}>Download</p>}
                            </div>
                        )) : (
                            <div className="mb-4">
                                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                                    <p className="font-bold flex-1 min-w-0" style={{ color: "#000000" }}>Project Name 🔗 | Technology Stack Used</p>
                                    <p className="font-semibold flex-shrink-0" style={{ color: "#666666" }}>MM YYYY</p>
                                </div>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li style={{ color: "#000000" }}>About project <span className="font-bold">key points to highlight</span>.</li>
                                    <li style={{ color: "#2563eb", textDecoration: "underline" }}>Live site here</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Experience */}
                    <div className="mb-5">
                        <h2
                            className="font-bold mb-3 uppercase tracking-wide"
                            style={{
                                color: "#000000",
                                borderBottom: "1.5px solid #000000",
                                paddingBottom: "2px",
                                fontSize: "14px"
                            }}
                        >
                            EXPERIENCE
                        </h2>
                        {experience.length > 0 ? experience.map((internship) => (
                            <div key={internship.id} className="mb-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold break-words" style={{ color: "#000000" }}>{internship.company} 🔗</p>
                                        <p className="italic font-semibold break-words" style={{ color: "#000000" }}>{internship.role}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0" style={{ color: "#666666" }}>
                                        <p className="font-semibold whitespace-nowrap">{internship.startDate} - {internship.endDate}</p>
                                        <p className="italic break-words">{internship.location}</p>
                                    </div>
                                </div>
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    {internship.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                                        <li key={index} className="break-words" style={{ color: "#000000" }}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        )) : (
                            <div className="mb-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold" style={{ color: "#000000" }}>Company Name 🔗</p>
                                        <p className="italic font-semibold" style={{ color: "#000000" }}>Role Name</p>
                                    </div>
                                    <div className="text-right flex-shrink-0" style={{ color: "#666666" }}>
                                        <p className="font-semibold">MM YYYY - MM YYYY</p>
                                        <p className="italic">city, country</p>
                                    </div>
                                </div>
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    <li style={{ color: "#000000" }}>About the role and responsibilities carried out.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Technical Skills */}
                    <div className="mb-5">
                        <h2
                            className="font-bold mb-3 uppercase tracking-wide"
                            style={{
                                color: "#000000",
                                borderBottom: "1.5px solid #000000",
                                paddingBottom: "2px",
                                fontSize: "14px"
                            }}
                        >
                            TECHNICAL SKILLS
                        </h2>
                        <div className="space-y-2">
                            <p className="break-words" style={{ color: "#000000" }}>
                                <span className="font-bold">Languages:</span> {technicalSkills.languages.length > 0 ? technicalSkills.languages.join(', ') : 'Python, Java, C, C++, Dart, JavaScript, SQL, NoSQL, R, XML, Go'}
                            </p>
                            <p className="break-words" style={{ color: "#000000" }}>
                                <span className="font-bold">Developer Tools:</span> {technicalSkills.developerTools.length > 0 ? technicalSkills.developerTools.join(', ') : 'VS Code, Android Studio, DataGrip, Goland, IntelliJ Idea Ultimate'}
                            </p>
                            <p className="break-words" style={{ color: "#000000" }}>
                                <span className="font-bold">Technologies/Frameworks:</span> {technicalSkills.technologiesFrameworks.length > 0 ? technicalSkills.technologiesFrameworks.join(', ') : 'Linux, GitHub, ReactJS, Redux, NextJS, NodeJS, ExpressJS, Git, Mongo, Flutter'}
                            </p>
                        </div>
                    </div>

                    {/* Extracurricular */}
                    <div className="mb-5">
                        <h2
                            className="font-bold mb-3 uppercase tracking-wide"
                            style={{
                                color: "#000000",
                                borderBottom: "1.5px solid #000000",
                                paddingBottom: "2px",
                                fontSize: "14px"
                            }}
                        >
                            EXTRACURRICULAR
                        </h2>
                        {extracurricular.length > 0 ? extracurricular.map((activity) => (
                            <div key={activity.id} className="mb-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold break-words" style={{ color: "#000000" }}>{activity.organization} 🔗</p>
                                        <p className="italic font-semibold break-words" style={{ color: "#000000" }}>{activity.role}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0" style={{ color: "#666666" }}>
                                        <p className="font-semibold whitespace-nowrap">{activity.startDate} - {activity.endDate}</p>
                                        <p className="italic break-words">{activity.location}</p>
                                    </div>
                                </div>
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    {activity.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                                        <li key={index} className="break-words" style={{ color: "#000000" }}>{resp}</li>
                                    ))}
                                    {activity.certificate && <li style={{ color: "#2563eb", textDecoration: "underline" }}>Participation Certificate. 🔗</li>}
                                </ul>
                            </div>
                        )) : (
                            <div className="mb-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold" style={{ color: "#000000" }}>Organization Name 🔗</p>
                                        <p className="italic font-semibold" style={{ color: "#000000" }}>Role</p>
                                    </div>
                                    <div className="text-right flex-shrink-0" style={{ color: "#666666" }}>
                                        <p className="font-semibold">MM YYYY - MM YYYY</p>
                                        <p className="italic">Location</p>
                                    </div>
                                </div>
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    <li style={{ color: "#000000" }}>About the role and responsibilities carried out.</li>
                                    <li style={{ color: "#2563eb", textDecoration: "underline" }}>Participation Certificate. 🔗</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Certifications */}
                    <div className="mb-4">
                        <h2
                            className="font-bold mb-3 uppercase tracking-wide"
                            style={{
                                color: "#000000",
                                borderBottom: "1.5px solid #000000",
                                paddingBottom: "2px",
                                fontSize: "14px"
                            }}
                        >
                            CERTIFICATIONS
                        </h2>
                        {certifications.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                                {certifications.map((cert, index) => (
                                    <p key={index} className="break-words" style={{ color: "#000000" }}>• {cert}</p>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                                <p style={{ color: "#000000" }}>• ReactJS & Redux - Udemy</p>
                                <p style={{ color: "#000000" }}>• Java</p>
                                <p style={{ color: "#000000" }}>• Command Line in Linux - Coursera</p>
                                <p style={{ color: "#000000" }}>• Python for Data Science - XIE</p>
                                <p style={{ color: "#000000" }}>• SQL</p>
                                <p style={{ color: "#000000" }}>• Microsoft AI Classroom - Microsoft</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx>{`
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .bg-gray-100 {
                        background: white !important;
                    }
                    .fixed {
                        display: none !important;
                    }
                    div[style*="transform: scale"] {
                        transform: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResumeTemplate;