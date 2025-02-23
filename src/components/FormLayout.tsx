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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
          {title && (
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              {title}
            </h1>
          )}
          
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={totalSteps}
            completedSteps={completedSteps}
          />

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}; 