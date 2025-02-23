import React from 'react';

interface AnxietyLevelSelectorProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  description: string;
}

export const AnxietyLevelSelector: React.FC<AnxietyLevelSelectorProps> = ({
  value,
  onChange,
  label,
  description
}) => {
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  const getBackgroundColor = (level: number) => {
    if (level <= 3) return 'bg-green-500';
    if (level <= 6) return 'bg-yellow-500';
    if (level <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-lg font-medium text-white mb-2">
          {label}
        </label>
        <p className="text-sm text-white/70 font-normal">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-10 gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`
              h-12 rounded-lg transition-all duration-300
              flex items-center justify-center font-medium
              hover:scale-110 hover:shadow-lg
              ${value === level ? 'ring-2 ring-white scale-110' : 'opacity-70'}
              ${getBackgroundColor(level)}
            `}
          >
            {level}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between text-sm text-white/70">
        <span>Nenhuma ansiedade</span>
        <span>Ansiedade extrema</span>
      </div>
    </div>
  );
}; 