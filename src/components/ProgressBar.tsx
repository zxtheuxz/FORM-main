import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
}

export const ProgressBar = ({ currentStep, totalSteps, completedSteps = [] }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div 
              key={index}
              className={`
                relative flex items-center justify-center
                w-7 h-7 rounded-full text-xs font-medium
                ${isCompleted 
                  ? 'bg-[#FF5733] text-white' 
                  : isCurrent
                    ? 'bg-white/20 text-white border-2 border-[#FF5733]'
                    : 'bg-white/10 text-white/50'}
              `}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                stepNumber
              )}
            </div>
          );
        })}
      </div>
      
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF5733] to-[#ff6242] transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}; 