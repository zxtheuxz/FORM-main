import { useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, Apple, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { FormLayout } from './FormLayout';

export default function FormSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneId, hasGymAssessment, hasNutritionalAssessment } = location.state || {};

  useEffect(() => {
    if (!phoneId) {
      console.log('Nenhum telefone verificado. Redirecionando para a página inicial...');
      navigate('/');
      return;
    }
  }, [phoneId, navigate]);

  const handleFormSelect = (type: string) => {
    if (!phoneId) {
      toast.error('Por favor, verifique seu número de telefone primeiro.');
      navigate('/');
      return;
    }

    if (type === 'gym') {
      if (hasGymAssessment) {
        toast.error('Você já preencheu a avaliação física.');
        return;
      }
      navigate('/assessment', { state: { phoneId } });
    } else if (type === 'nutrition') {
      if (hasNutritionalAssessment) {
        toast.error('Você já preencheu a avaliação nutricional.');
        return;
      }
      navigate('/nutrition-gender-select', { state: { phoneId } });
    }
  };

  if (!phoneId) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <FormLayout
      title="Escolha o tipo de avaliação"
      currentStep={1}
      totalSteps={1}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <button
          onClick={() => handleFormSelect('gym')}
          disabled={hasGymAssessment}
          className={`
            p-6 sm:p-8 rounded-xl transition-all duration-300 group
            border border-white/10 backdrop-blur-lg
            ${hasGymAssessment 
              ? 'bg-white/5 cursor-not-allowed opacity-60' 
              : 'bg-white/10 hover:bg-white/20 hover:scale-105 transform'}
          `}
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#FF5733]/10 
              flex items-center justify-center mb-3 sm:mb-4">
              <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF5733]" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Avaliação Física
            </h2>
            {hasGymAssessment && (
              <div className="flex items-center gap-2 text-yellow-300 mt-2">
                <AlertCircle size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  Formulário já preenchido
                </span>
              </div>
            )}
          </div>
        </button>

        <button
          onClick={() => handleFormSelect('nutrition')}
          disabled={hasNutritionalAssessment}
          className={`
            p-6 sm:p-8 rounded-xl transition-all duration-300 group
            border border-white/10 backdrop-blur-lg
            ${hasNutritionalAssessment 
              ? 'bg-white/5 cursor-not-allowed opacity-60' 
              : 'bg-white/10 hover:bg-white/20 hover:scale-105 transform'}
          `}
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#FF5733]/10 
              flex items-center justify-center mb-3 sm:mb-4">
              <Apple className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF5733]" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Avaliação Nutricional
            </h2>
            {hasNutritionalAssessment && (
              <div className="flex items-center gap-2 text-yellow-300 mt-2">
                <AlertCircle size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  Formulário já preenchido
                </span>
              </div>
            )}
          </div>
        </button>
      </div>
    </FormLayout>
  );
} 