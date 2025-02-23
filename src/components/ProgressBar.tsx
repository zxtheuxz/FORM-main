import { CheckIcon } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  completedSteps 
}) => (
  <div className="mb-8">
    <div className="flex justify-between mb-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`flex flex-col items-center ${i < currentStep ? 'text-[#FF5733]' : 'text-white/50'}`}
        >
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300
              ${i + 1 === currentStep ? 'bg-[#FF5733] text-white scale-110' : 
                i < currentStep ? 'bg-[#FF5733]/20 text-[#FF5733]' : 'bg-white/20 text-white/50'}`}
          >
            {i < currentStep ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          <span className="text-xs">{`Etapa ${i + 1}`}</span>
        </div>
      ))}
    </div>
    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#FF5733] transition-all duration-500 ease-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  </div>
); 