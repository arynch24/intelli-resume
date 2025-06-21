"use client";

import { ResumeData } from '@/types/resume';

const ResumeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, education, coursework, projects, internships, technicalSkills, extracurricular, certifications } = data;
  
    return (
      <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto text-sm font-serif">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide mb-2 uppercase">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-gray-600 mb-3">{personalInfo.location || 'city, state'}</p>
          
          <div className="flex justify-center items-center gap-4 text-xs">
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
            {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
            {personalInfo.github && <span>🐙 {personalInfo.github}</span>}
            {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
          </div>
        </div>
  
        {/* Education */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-wide">EDUCATION</h2>
          {education.length > 0 ? education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{edu.institution}</p>
                  <p className="italic text-gray-700">
                    {edu.degree} - {edu.field} - {edu.cgpa && `CGPA - ${edu.cgpa}`}
                  </p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-semibold">{edu.startDate} - {edu.endDate}</p>
                  <p className="italic">{edu.location}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">College Name</p>
                  <p className="italic text-gray-700">Degree Name - CGPA - xx</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-semibold">MM YYYY - MM YYYY</p>
                  <p className="italic">city, country</p>
                </div>
              </div>
            </div>
          )}
        </div>
  
        {/* Coursework/Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-wide">COURSEWORK / SKILLS</h2>
          <div className="grid grid-cols-2 gap-x-8">
            <ul className="list-disc list-inside space-y-1">
              <li>Data Structures & Algorithms</li>
              <li>Operating Systems</li>
              {coursework.slice(0, 3).map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
            <ul className="list-disc list-inside space-y-1">
              <li>Network Security</li>
              <li>Database Management System (DBMS)</li>
              <li>Artificial Intelligence</li>
              <li>OOPS Concept</li>
              <li>Web Development</li>
              <li>Android Development</li>
            </ul>
          </div>
        </div>
  
        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-wide">PROJECTS</h2>
          {projects.length > 0 ? projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <p className="font-bold">
                  {project.name} 🔗 | {project.technologies}
                </p>
                <p className="font-semibold text-gray-600">{project.date}</p>
              </div>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {project.description.filter(desc => desc.trim()).map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              {project.liveUrl && <p className="ml-4 text-blue-600 underline">Live site here</p>}
              {project.downloadUrl && <p className="ml-4 text-blue-600 underline">Download</p>}
            </div>
          )) : (
            <div className="space-y-4">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold">Project Name 🔗 | Technology Stack Used</p>
                  <p className="font-semibold text-gray-600">MM YYYY</p>
                </div>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>About project <span className="font-bold">key points to highlight</span>.</li>
                  <li className="text-blue-600 underline">Live site here</li>
                </ul>
              </div>
            </div>
          )}
        </div>
  
        {/* Internship */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-wide">INTERNSHIP</h2>
          {internships.length > 0 ? internships.map((internship) => (
            <div key={internship.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{internship.company} 🔗</p>
                  <p className="italic font-semibold">{internship.role}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-semibold">{internship.startDate} - {internship.endDate}</p>
                  <p className="italic">{internship.location}</p>
                </div>
              </div>
              <ul className="list-disc list-inside ml-4 mt-2">
                {internship.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          )) : (
            <div className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Company Name 🔗</p>
                  <p className="italic font-semibold">Role Name</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-semibold">MM YYYY - MM YYYY</p>
                  <p className="italic">city, country</p>
                </div>
              </div>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>About the role and responsibilities carried out.</li>
              </ul>
            </div>
          )}
        </div>
  
        {/* Technical Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-wide">TECHNICAL SKILLS</h2>
          <div className="space-y-2">
            <p><span className="font-bold">Languages:</span> {technicalSkills.languages.length > 0 ? technicalSkills.languages.join(', ') : 'Python, Java, C, C++, Dart, JavaScript, SQL, NoSQL, R, XML, Go'}</p>
            <p><span className="font-bold">Developer Tools:</span> {technicalSkills.developerTools.length > 0 ? technicalSkills.developerTools.join(', ') : 'VS Code, Android Studio, DataGrip, Goland, IntelliJ Idea Ultimate'}</p>
            <p><span className="font-bold">Technologies/Frameworks:</span> {technicalSkills.technologiesFrameworks.length > 0 ? technicalSkills.technologiesFrameworks.join(', ') : 'Linux, GitHub, ReactJS, Redux, NextJS, NodeJS, ExpressJS, Git, Mongo, Flutter'}</p>
          </div>
        </div>
  
        {/* Extracurricular */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-wide">EXTRACURRICULAR</h2>
          {extracurricular.length > 0 ? extracurricular.map((activity) => (
            <div key={activity.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{activity.organization} 🔗</p>
                  <p className="italic font-semibold">{activity.role}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-semibold">{activity.startDate} - {activity.endDate}</p>
                  <p className="italic">{activity.location}</p>
                </div>
              </div>
              <ul className="list-disc list-inside ml-4 mt-2">
                {activity.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
                {activity.certificate && <li className="text-blue-600 underline">Participation Certificate. 🔗</li>}
              </ul>
            </div>
          )) : (
            <div className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Organization Name 🔗</p>
                  <p className="italic font-semibold">Role</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-semibold">MM YYYY - MM YYYY</p>
                  <p className="italic">Location</p>
                </div>
              </div>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>About the role and responsibilities carried out.</li>
                <li className="text-blue-600 underline">Participation Certificate. 🔗</li>
              </ul>
            </div>
          )}
        </div>
  
        {/* Certifications */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-wide">CERTIFICATIONS</h2>
          {certifications.length > 0 ? (
            <div className="grid grid-cols-3 gap-x-8 gap-y-2">
              {certifications.map((cert, index) => (
                <p key={index}>• {cert}</p>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-x-8 gap-y-2">
              <p>• ReactJS & Redux - Udemy</p>
              <p>• Java</p>
              <p>• Command Line in Linux - Coursera</p>
              <p>• Python for Data Science - XIE</p>
              <p>• SQL</p>
              <p>• Microsoft AI Classroom - Microsoft</p>
              <p>• 5 Stars in C++ & SQL 🔗</p>
              <p>• MongoDB Basics</p>
              <p>• NodeJS with Express & MongoDB - Udemy</p>
            </div>
          )}
        </div>
      </div>
    );
  };

export default ResumeTemplate;
  