import React from 'react';
import { AnxietyLevelSelector } from './AnxietyLevelSelector';
import { FormField } from './FormField';

type HealthHistorySectionProps = {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  formType: 'masculino' | 'feminino';
};

const HealthHistorySection: React.FC<HealthHistorySectionProps> = ({ 
  formData, 
  handleInputChange, 
  formType 
}) => {
  // Componente para renderizar campos booleanos com input condicional
  const renderBooleanWithConditional = (
    baseFieldName: string,
    label: string,
    description: string,
    detailFieldName: string,
    detailDescription?: string
  ) => (
    <div className="space-y-3">
      <div className="flex gap-4">
        <button
          onClick={() => handleInputChange(`health_history.has_${baseFieldName}`, true)}
          className={`
            flex-1 p-3 rounded-xl transition-all duration-300
            ${formData.health_history[`has_${baseFieldName}`] === true
              ? 'bg-gradient-to-r from-[#FF5733] to-[#ff6242] text-white'
              : 'bg-white/10 text-white hover:bg-white/20'}
          `}
        >
          Sim
        </button>
        <button
          onClick={() => handleInputChange(`health_history.has_${baseFieldName}`, false)}
          className={`
            flex-1 p-3 rounded-xl transition-all duration-300
            ${formData.health_history[`has_${baseFieldName}`] === false
              ? 'bg-gradient-to-r from-[#FF5733] to-[#ff6242] text-white'
              : 'bg-white/10 text-white hover:bg-white/20'}
          `}
        >
          Não
        </button>
      </div>

      {formData.health_history[`has_${baseFieldName}`] && (
        <div className="mt-4">
          <label className="block text-lg font-medium text-white">
            Detalhes
          </label>
          {detailDescription && (
            <p className="mt-1 text-sm text-white/70 font-normal">
              {detailDescription}
            </p>
          )}
          <textarea
            value={formData.health_history[detailFieldName] || ''}
            onChange={(e) => handleInputChange(`health_history.${detailFieldName}`, e.target.value)}
            className="mt-2 w-full rounded-md bg-white/10 px-3 py-2 text-white"
            rows={6}
            placeholder="Digite aqui..."
          />
        </div>
      )}
    </div>
  );

  const standardFields = (
    <div className="space-y-6">
      <FormField
        label="Doenças Crônicas"
        description="Você possui alguma doença crônica? (Ex: diabetes, hipertensão, etc)"
      >
        <div className="space-y-3">
          {renderBooleanWithConditional(
            'chronic_diseases',
            'Doenças Crônicas',
            'Ex: diabetes, hipertensão, problemas cardíacos, etc.',
            'chronic_diseases_details',
            'Descreva quais doenças, há quanto tempo e se faz tratamento'
          )}
        </div>
      </FormField>

      <FormField
        label="Cirurgias Anteriores"
        description="Você já realizou alguma cirurgia?"
      >
        <div className="space-y-3">
          {renderBooleanWithConditional(
            'previous_surgeries',
            'Cirurgias Anteriores',
            'Ex: cirurgias cardíacas, de apêndice, etc.',
            'previous_surgeries_details',
            'Descreva quais cirurgias foram realizadas, quando e por que foram feitas'
          )}
        </div>
      </FormField>

      <FormField
        label="Alergias Alimentares"
        description="Você possui alguma alergia alimentar?"
      >
        <div className="space-y-3">
          {renderBooleanWithConditional(
            'food_allergies',
            'Alergias Alimentares',
            'Reações adversas a qualquer tipo de alimento',
            'food_allergies_details',
            'Liste todos os alimentos que causam alergia ou intolerância e os sintomas'
          )}
        </div>
      </FormField>

      <FormField
        label="Medicamentos"
        description="Você faz uso regular de algum medicamento?"
      >
        <div className="space-y-3">
          {renderBooleanWithConditional(
            'medications',
            'Medicamentos',
            'Ex: medicamentos para pressão alta, diabetes, etc.',
            'medications_details',
            'Descreva quais medicamentos são usados, para que e com que frequência'
          )}
        </div>
      </FormField>

      <FormField
        label="Histórico Familiar"
        description="Existe histórico de doenças na família?"
      >
        <div className="space-y-3">
          {renderBooleanWithConditional(
            'family_history',
            'Histórico Familiar',
            'Ex: diabetes, hipertensão, problemas cardíacos, etc.',
            'family_history_details',
            'Descreva quais doenças existem na família e como elas são tratadas'
          )}
        </div>
      </FormField>

      <FormField
        label="Nível de Ansiedade"
        description="Como você classificaria seu nível de ansiedade?"
      >
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="10"
            value={formData.health_history.anxiety_level || 0}
            onChange={(e) => handleInputChange('health_history.anxiety_level', parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-[#FF5733]"
          />
          <div className="flex justify-between text-xs text-white/50">
            <span>Baixo</span>
            <span>Médio</span>
            <span>Alto</span>
          </div>
        </div>
      </FormField>
    </div>
  );

  const femaleFields = formType === 'feminino' ? (
    <div className="space-y-6 mt-8">
      <FormField
        label="Doenças Ginecológicas"
        description="Você possui alguma doença ginecológica?"
      >
        <div className="space-y-3">
          {renderBooleanWithConditional(
            'gynecological_diseases',
            'Doenças Ginecológicas',
            'Ex: endometriose, infertilidade, etc.',
            'gynecological_diseases_details',
            'Descreva quais doenças existem e como elas são tratadas'
          )}
        </div>
      </FormField>

      <FormField
        label="Ciclo Menstrual"
        description="Informações sobre seu ciclo menstrual"
      >
        {/* Similar structure with specific fields */}
      </FormField>
    </div>
  ) : null;

  return (
    <div className="space-y-6">
      {standardFields}
      {femaleFields}
    </div>
  );
};

export default HealthHistorySection; 