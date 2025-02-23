import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface FormButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canProceed: boolean;
  isLastStep?: boolean;
}

export const FormButtons = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  canProceed,
  isLastStep 
}: FormButtonsProps) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevious}
        className={`
          px-6 py-3 rounded-xl transition-all duration-300
          flex items-center justify-center gap-2
          ${currentStep === 1
            ? 'opacity-50 cursor-not-allowed'
            : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105'}
        `}
      >
        <ChevronLeft className="w-5 h-5" />
        Anterior
      </button>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`
          px-6 py-3 rounded-xl transition-all duration-300 transform
          flex items-center justify-center gap-2 font-medium
          ${canProceed
            ? 'bg-gradient-to-r from-[#FF5733] to-[#ff6242] text-white hover:scale-105'
            : 'bg-white/10 text-white/50 cursor-not-allowed'}
        `}
      >
        {isLastStep ? (
          <>
            Finalizar
            <CheckCircle className="w-5 h-5" />
          </>
        ) : (
          <>
            Próximo
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}; 