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
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-gray-900/80 backdrop-blur-lg sm:relative sm:bg-transparent sm:p-0 sm:mt-4">
      <div className="flex justify-between gap-2 max-w-4xl mx-auto">
        <button
          onClick={onPrevious}
          className={`
            flex-1
            px-3 sm:px-4 
            py-2.5 sm:py-3 
            rounded-xl transition-all duration-300
            flex items-center justify-center gap-1.5
            text-sm
            ${currentStep === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-white/10 hover:bg-white/20 text-white active:scale-95'}
          `}
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            flex-1
            px-3 sm:px-4
            py-2.5 sm:py-3
            rounded-xl transition-all duration-300
            flex items-center justify-center gap-1.5
            text-sm font-medium
            ${canProceed
              ? 'bg-gradient-to-r from-[#FF5733] to-[#ff6242] text-white active:scale-95'
              : 'bg-white/10 text-white/50 cursor-not-allowed'}
          `}
        >
          {isLastStep ? (
            <>
              Finalizar
              <CheckCircle className="w-4 h-4" />
            </>
          ) : (
            <>
              Próximo
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}; 