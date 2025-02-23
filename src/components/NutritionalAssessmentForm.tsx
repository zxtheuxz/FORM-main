import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import HealthHistorySection from './HealthHistorySection';
import { ProgressBar } from './ProgressBar';
import { CheckIcon, XCircle } from 'lucide-react';

// Tipos para o histórico de saúde
interface HealthHistory {
  has_chronic_diseases: boolean | null;
  chronic_diseases: string;
  has_previous_surgeries: boolean | null;
  previous_surgeries: string;
  has_food_allergies: boolean | null;
  food_allergies: string;
  has_medications: boolean | null;
  medications: string;
  has_family_history: boolean | null;
  family_history: string;
  anxiety_level: number;
  // Campos específicos femininos
  has_gynecological_diseases?: boolean;
  gynecological_diseases?: string;
  menstrual_cycle?: {
    first_period_age?: number;
    is_regular?: boolean;
    cycle_duration?: number;
    symptoms?: string[];
    affects_eating?: boolean;
  };
}

// Tipos para o estilo de vida
interface Lifestyle {
  physical_activity_level: string;
  sleep_hours: number;
  wake_up_time: string;
  alcohol_consumption: {
    drinks: boolean | null;
  };
  smoking: {
    smokes: boolean | null;
  };
  work_hours: number;
  supplements: string[];
  bowel_movements: {
    frequency: number;
    issues: string[];
  };
  stress_level?: number;
  sleep_quality?: string;
  exercise_routine?: {
    type: string;
    frequency: number;
    time: string;
    duration: number;
  };
  water_intake: number;
  urination: {
    normal: boolean | null;
    observations: string;
  };
}

// Tipos para os hábitos alimentares
interface EatingHabits {
  previous_diets: boolean | null;
  diet_difficulties: string[];
  daily_routine: string;
  disliked_foods: string[];
  favorite_foods: string[];
  soda_consumption: {
    drinks: boolean | null;
  };
  weekend_eating: string;
  eats_watching_tv: boolean | null;
  water_intake: number;
  preferred_taste?: 'sweet' | 'salty' | 'sour' | 'bitter';
  hunger_peak_time?: string;
  eating_routine?: {
    eats_out: boolean;
    prepares_meals: boolean;
    eats_alone: boolean;
  };
  chewing?: {
    speed: 'fast' | 'slow';
    observations: string;
  };
}

// Tipo principal do formulário
interface FormData {
  full_name: string;
  birth_date: string;
  weight: number;
  height: number;
  marital_status: string;
  children: string;
  usual_weight: number;
  weight_changes: {
    recent_loss?: {
      amount: number;
      period: string;
      reason: string;
    };
    recent_gain?: {
      amount: number;
      period: string;
      reason: string;
    };
  };
  health_history: HealthHistory;
  lifestyle: Lifestyle;
  eating_habits: EatingHabits;
}

// Tipo para os campos do formulário
interface Field {
  name: string;
  label: string;
  type: string;
  description?: string;
  step?: string;
  min?: number;
  max?: number;
  options?: Array<{
    value: string;
    label: string;
  }>;
}

// Função auxiliar para acessar valores aninhados com segurança
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);
};

const StepCard = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
  <div
    className={`transition-all duration-500 transform
      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10`}
  >
    {children}
  </div>
);

export default function NutritionalAssessmentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneId, formType } = location.state || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    birth_date: '',
    weight: 0,
    height: 0,
    marital_status: '',
    children: '',
    usual_weight: 0,
    weight_changes: {},
    health_history: {
      has_chronic_diseases: null,
      chronic_diseases: '',
      has_previous_surgeries: null,
      previous_surgeries: '',
      has_food_allergies: null,
      food_allergies: '',
      has_medications: null,
      medications: '',
      has_family_history: null,
      family_history: '',
      anxiety_level: 0,
    },
    lifestyle: {
      physical_activity_level: 'sedentary',
      sleep_hours: 0,
      wake_up_time: '',
      alcohol_consumption: {
        drinks: null,
      },
      smoking: {
        smokes: null,
      },
      work_hours: 0,
      supplements: [],
      bowel_movements: {
        frequency: 0,
        issues: [],
      },
      water_intake: 0,
      urination: {
        normal: null,
        observations: '',
      },
    },
    eating_habits: {
      previous_diets: null,
      diet_difficulties: [],
      daily_routine: '',
      disliked_foods: [],
      favorite_foods: [],
      soda_consumption: {
        drinks: null,
      },
      weekend_eating: '',
      eats_watching_tv: null,
      water_intake: 0,
    },
  });

  useEffect(() => {
    if (!phoneId) {
      console.log('Nenhum telefone verificado. Redirecionando para a página inicial...');
      navigate('/');
      return;
    }
  }, [phoneId, navigate]);

  const steps = [
    {
      title: 'Dados Pessoais',
      fields: [
        { 
          name: 'full_name', 
          label: 'Nome Completo',
          description: 'Digite seu nome completo conforme documentos oficiais',
          type: 'text' 
        },
        { 
          name: 'birth_date', 
          label: 'Data de Nascimento',
          description: 'Sua data de nascimento no formato dd/mm/aaaa',
          type: 'date' 
        },
        { 
          name: 'weight', 
          label: 'Peso Atual (kg)', 
          description: 'Informe seu peso de hoje',
          type: 'number',
          step: '0.1',
          min: 20,
          max: 300
        },
        { 
          name: 'usual_weight', 
          label: 'Peso Habitual (kg)', 
          description: 'Informe seu peso médio dos últimos meses',
          type: 'number',
          step: '0.1',
          min: 20,
          max: 300
        },
        { 
          name: 'height', 
          label: 'Altura (m)',
          description: 'Sua altura em metros (exemplo: 1.75)',
          type: 'number',
          step: '0.01',
          min: 0.5,
          max: 2.5
        },
        { 
          name: 'marital_status', 
          label: 'Estado Civil',
          description: 'Selecione sua situação conjugal atual',
          type: 'select', 
          options: [
            { value: 'solteiro', label: 'Solteiro(a)' },
            { value: 'casado', label: 'Casado(a)' },
            { value: 'divorciado', label: 'Divorciado(a)' },
            { value: 'viuvo', label: 'Viúvo(a)' }
          ]
        },
        { 
          name: 'children', 
          label: 'Tem filhos? Quantos?',
          description: 'Informe se tem filhos e a quantidade. Exemplo: "Sim, 2 filhos" ou "Não tenho"',
          type: 'text' 
        }
      ]
    },
    {
      title: 'Histórico de Saúde',
      component: () => (
        <HealthHistorySection
          formData={formData}
          handleInputChange={handleInputChange}
          formType={formType}
        />
      )
    },
    {
      title: 'Estilo de Vida',
      fields: [
        { 
          name: 'lifestyle.physical_activity_level', 
          label: 'Nível de Atividade Física',
          description: 'Selecione a opção que melhor descreve sua rotina de exercícios físicos',
          type: 'select', 
          options: [
            { value: 'sedentary', label: 'Sedentário - Não pratica exercícios' },
            { value: 'moderate', label: 'Moderado - Exercícios 2-3x por semana' },
            { value: 'active', label: 'Ativo - Exercícios 4x ou mais por semana' }
          ]
        },
        { 
          name: 'lifestyle.sleep_hours', 
          label: 'Horas de Sono por Noite',
          description: 'Quantidade média de horas que você dorme por noite',
          type: 'number',
          min: 0,
          max: 24
        },
        { 
          name: 'lifestyle.wake_up_time', 
          label: 'Horário que Acorda',
          description: 'Horário habitual em que você costuma acordar',
          type: 'time'
        },
        { 
          name: 'lifestyle.alcohol_consumption.drinks', 
          label: 'Consome Bebidas Alcoólicas?',
          description: 'Indique se você consome qualquer tipo de bebida alcoólica, mesmo que socialmente',
          type: 'boolean'
        },
        { 
          name: 'lifestyle.smoking.smokes', 
          label: 'Fuma?',
          description: 'Indique se você é fumante (incluindo cigarro eletrônico ou outros tipos de fumo)',
          type: 'boolean'
        },
        { 
          name: 'lifestyle.work_hours', 
          label: 'Horas de Trabalho por Dia',
          description: 'Quantidade média de horas que você trabalha diariamente',
          type: 'number',
          min: 0,
          max: 24
        },
        { 
          name: 'lifestyle.water_intake', 
          label: 'Consumo de Água (litros/dia)',
          description: 'Quantidade aproximada de água que você bebe por dia, excluindo outras bebidas',
          type: 'number',
          step: '0.5',
          min: 0
        }
      ]
    },
    {
      title: 'Hábitos Alimentares',
      fields: [
        { 
          name: 'eating_habits.previous_diets', 
          label: 'Já Fez Dieta?',
          description: 'Informe se você já realizou algum tipo de dieta anteriormente',
          type: 'boolean'
        },
        { 
          name: 'eating_habits.diet_difficulties', 
          label: 'Dificuldades em Dietas Anteriores',
          description: 'Se você já fez dieta anteriormente, explique aqui quais foram suas principais dificuldades (Ex: fome excessiva, compulsão, etc)',
          type: 'textarea'
        },
        { 
          name: 'eating_habits.daily_routine', 
          label: 'Rotina Alimentar Diária',
          description: 'Descreva detalhadamente sua alimentação desde a hora que acorda até a hora de dormir. Inclua TODOS os alimentos e bebidas consumidos durante o dia, com horários aproximados.',
          type: 'textarea'
        },
        { 
          name: 'eating_habits.disliked_foods', 
          label: 'Alimentos que Não Gosta',
          description: 'Liste os alimentos que você não gosta ou evita comer',
          type: 'text'
        },
        { 
          name: 'eating_habits.favorite_foods', 
          label: 'Alimentos Favoritos',
          description: 'Liste os alimentos que você mais gosta de comer',
          type: 'text'
        },
        { 
          name: 'eating_habits.soda_consumption.drinks', 
          label: 'Consome Refrigerante?',
          description: 'Indique se você costuma beber refrigerantes ou outras bebidas gaseificadas',
          type: 'boolean'
        },
        { 
          name: 'eating_habits.weekend_eating', 
          label: 'Alimentação aos Finais de Semana',
          description: 'Descreva como é sua alimentação durante os finais de semana. Inclua as principais diferenças em relação aos dias de semana, eventos sociais, etc.',
          type: 'textarea'
        },
        { 
          name: 'eating_habits.eats_watching_tv', 
          label: 'Come Assistindo TV?',
          description: 'Indique se você tem o hábito de comer enquanto assiste televisão ou usa dispositivos eletrônicos',
          type: 'boolean'
        }
      ]
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    const fields = field.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < fields.length - 1; i++) {
        if (!current[fields[i]]) {
          current[fields[i]] = {};
        }
        current[fields[i]] = { ...current[fields[i]] };
        current = current[fields[i]];
      }
      
      current[fields[fields.length - 1]] = value;
      return newData;
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validar campos obrigatórios
      if (!formData.full_name || !formData.birth_date || !formData.weight || !formData.height) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }

      // Converter os dados do formulário para corresponder ao esquema do banco
      const submissionData = {
        phone_id: phoneId,
        form_type: formType,
        full_name: formData.full_name.trim(),
        birth_date: new Date(formData.birth_date).toISOString().split('T')[0], // Formato YYYY-MM-DD
        weight: Number(formData.weight),
        height: Number(formData.height),
        usual_weight: formData.usual_weight ? Number(formData.usual_weight) : null,
        weight_changes: Object.keys(formData.weight_changes).length > 0 ? formData.weight_changes : null,
        marital_status: formData.marital_status || null,
        children: formData.children || null,
        health_history: formData.health_history || null,
        lifestyle: formData.lifestyle || null,
        eating_habits: formData.eating_habits || null
      };

      console.log('Dados a serem enviados:', submissionData);

      const { error } = await supabase
        .from('nutritional_assessments')
        .insert([submissionData]);

      if (error) {
        console.error('Erro detalhado:', error);
        throw new Error(error.message);
      }

      toast.success('Formulário enviado com sucesso!');
      navigate('/success?phoneId=' + phoneId);
    } catch (error) {
      console.error('Erro:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao enviar formulário. Tente novamente.');
      }
    }
  };

  const currentStepData = steps[currentStep - 1];

  const isFieldComplete = (fieldName: string) => {
    const value = getNestedValue(formData, fieldName);
    return value !== '' && value !== null && value !== undefined;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!phoneId) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <StepCard isActive={true}>
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={steps.length}
            completedSteps={completedSteps}
          />

          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            {currentStepData.title}
          </h1>

          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5733]" />
            </div>
          ) : (
            <div className="space-y-6">
              {currentStepData.component ? (
                <currentStepData.component />
              ) : (
                currentStepData.fields.map((field: Field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      {field.label}
                    </label>
                    {field.description && (
                      <p className="text-sm text-white/70 font-normal">
                        {field.description}
                      </p>
                    )}
                    {field.type === 'select' ? (
                      <select
                        value={getNestedValue(formData, field.name) || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                      >
                        <option value="" className="bg-gray-800">Selecione...</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value} className="bg-gray-800">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        value={getNestedValue(formData, field.name) || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                          focus:border-[#FF5733] focus:ring-2 focus:ring-[#FF5733]/20
                          transition-all duration-300 text-white placeholder-white/30
                          hover:bg-white/20"
                        rows={6}
                        placeholder="Digite aqui..."
                      />
                    ) : field.type === 'boolean' ? (
                      <div className="flex gap-4">
                        {['Sim', 'Não'].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleInputChange(field.name, option === 'Sim')}
                            className={`
                              flex-1 px-6 py-3 rounded-xl transition-all duration-300
                              ${(option === 'Sim' ? getNestedValue(formData, field.name) === true : getNestedValue(formData, field.name) === false)
                                ? 'bg-gradient-to-r from-[#FF5733] to-[#ff6242] text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'}
                              transform hover:scale-105
                            `}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        value={getNestedValue(formData, field.name) || ''}
                        onChange={(e) => handleInputChange(field.name, 
                          field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                        )}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                          focus:border-[#FF5733] focus:ring-2 focus:ring-[#FF5733]/20
                          transition-all duration-300 text-white placeholder-white/30
                          hover:bg-white/20"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
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
              type="button"
              onClick={handleNext}
              className={`
                px-6 py-3 rounded-xl transition-all duration-300 transform
                flex items-center justify-center gap-2 font-medium
                bg-gradient-to-r from-[#FF5733] to-[#ff6242] text-white 
                hover:scale-105 hover:shadow-lg
              `}
            >
              {currentStep === steps.length ? (
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
        </StepCard>
      </div>
    </div>
  );
} 