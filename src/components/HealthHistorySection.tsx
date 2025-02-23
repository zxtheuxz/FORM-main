import React from 'react';
import { AnxietyLevelSelector } from './AnxietyLevelSelector';

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
    <div className="mb-6">
      <div className="flex items-start">
        <div className="flex-grow">
          <label className="block text-lg font-medium text-white">
            {label}
          </label>
          {description && (
            <p className="mt-1 text-sm text-white/70 font-normal">
              {description}
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleInputChange(`health_history.has_${baseFieldName}`, true)}
            className={`px-6 py-3 rounded-xl transition-all text-lg ${
              formData.health_history[`has_${baseFieldName}`] === true
                ? 'bg-[#FF5733] text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Sim
          </button>
          <button
            type="button"
            onClick={() => handleInputChange(`health_history.has_${baseFieldName}`, false)}
            className={`px-6 py-3 rounded-xl transition-all text-lg ${
              formData.health_history[`has_${baseFieldName}`] === false
                ? 'bg-[#FF5733] text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Não
          </button>
        </div>
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
    <div className="space-y-8">
      {renderBooleanWithConditional(
        'chronic_diseases',
        'Possui doenças crônicas?',
        'Ex: diabetes, hipertensão, problemas cardíacos, etc.',
        'chronic_diseases_details',
        'Descreva quais doenças, há quanto tempo e se faz tratamento'
      )}
      
      {renderBooleanWithConditional(
        'previous_surgeries',
        'Já realizou cirurgias?',
        'Ex: cirurgias cardíacas, de apêndice, etc.',
        'previous_surgeries_details',
        'Descreva quais cirurgias foram realizadas, quando e por que foram feitas'
      )}
      
      {renderBooleanWithConditional(
        'food_allergies',
        'Possui alergias ou intolerâncias alimentares?',
        'Reações adversas a qualquer tipo de alimento',
        'food_allergies_details',
        'Liste todos os alimentos que causam alergia ou intolerância e os sintomas'
      )}
      
      {renderBooleanWithConditional(
        'medications',
        'Faz uso de medicamentos?',
        'Ex: medicamentos para pressão alta, diabetes, etc.',
        'medications_details',
        'Descreva quais medicamentos são usados, para que e com que frequência'
      )}
      
      {renderBooleanWithConditional(
        'family_history',
        'Possui histórico familiar de doenças?',
        'Ex: diabetes, hipertensão, problemas cardíacos, etc.',
        'family_history_details',
        'Descreva quais doenças existem na família e como elas são tratadas'
      )}
      
      <AnxietyLevelSelector
        value={formData.health_history.anxiety_level}
        onChange={(value) => handleInputChange('health_history.anxiety_level', value)}
        label="Nível de Ansiedade"
        description="Selecione seu nível de ansiedade, onde 1 significa nenhuma ansiedade e 10 significa ansiedade extrema que interfere em suas atividades diárias"
      />
    </div>
  );

  const femaleFields = formType === 'feminino' ? (
    <div className="space-y-8 mt-8">
      {renderBooleanWithConditional(
        'gynecological_diseases',
        'Possui doenças ginecológicas?',
        'Ex: endometriose, infertilidade, etc.',
        'gynecological_diseases_details',
        'Descreva quais doenças existem e como elas são tratadas'
      )}
    </div>
  ) : null;

  return (
    <div>
      {standardFields}
      {femaleFields}
    </div>
  );
};

export default HealthHistorySection; 