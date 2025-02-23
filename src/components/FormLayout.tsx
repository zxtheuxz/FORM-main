import React from 'react';
import { ProgressBar } from './ProgressBar';

interface FormLayoutProps {
  children: React.ReactNode;
  title?: string;
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
}

export const FormLayout = ({ children, title, currentStep, totalSteps, completedSteps = [] }: FormLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col p-3 sm:p-4 md:p-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl 
            p-3 sm:p-4 md:p-8 shadow-2xl border border-white/10
            flex-1 flex flex-col"
          >
            {title && (
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 text-center">
                {title}
              </h1>
            )}
            
            <div className="mb-4">
              <ProgressBar 
                currentStep={currentStep} 
                totalSteps={totalSteps}
                completedSteps={completedSteps}
              />
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto pb-24 sm:pb-16">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 