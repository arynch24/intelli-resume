"use client";

import { Upload, Plus, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResumeStarter() {

  const router = useRouter();
  const handleImportClick = () => {
    // Navigate to the import resume page
    router.push("/dashboard/resume-builder/edit");
  };
  const handleCreateClick = () => {
    // Navigate to the create resume page
    router.push("/dashboard/resume-builder/edit");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col justify-center items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How do you want to start?
          </h1>
          <p className="text-lg text-gray-600">
            Choose an option to begin building your resume tailored for the job you want.
          </p>
        </div>

        {/* Options Grid */}
        <div className="max-w-2xl grid md:grid-cols-2 gap-6">
          {/* Import Existing */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"

            onClick={handleImportClick}>
            <div className="flex flex-col items-center text-center">
              <div className="w-13 h-13 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Import existing resume
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Upload your current resume and we'll help you optimise them using AI.
              </p>
            </div>
          </div>

          {/* Use Template
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Use a template
              </h3>
              <p className="text-gray-600  text-sm leading-relaxed">
                Start with one of our professionally designed templates to save time.
              </p>
            </div>
          </div> */}

          {/* Create New */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={handleCreateClick}>
            <div className="flex flex-col items-center text-center">
              <div className="w-13 h-13 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create from scratch
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Build your resume step-by-step with our guided setup process.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Not sure which option to choose? You can always change your approach later.
          </p>
        </div>
      </div>
    </div>
  );
}