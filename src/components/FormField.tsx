interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
}

// Classes base para inputs
const inputClasses = `
  w-full
  px-3 sm:px-4
  py-2.5 sm:py-3
  text-sm sm:text-base
  rounded-xl
  bg-white/10 
  border border-white/20
  focus:border-[#FF5733] 
  focus:ring-2 
  focus:ring-[#FF5733]/20
  transition-all 
  duration-300 
  text-white 
  placeholder-white/30
`;

// Classes base para botões de opção
const optionButtonClasses = `
  w-full 
  text-left 
  p-3 sm:p-4
  rounded-xl 
  transition-all 
  duration-200
  text-sm sm:text-base
  flex items-center
  gap-2
  active:scale-95
`;

export const FormField = ({ label, description, error, children }: FormFieldProps) => {
  return (
    <div className="mb-6 last:mb-0">
      <label className="block text-sm sm:text-base md:text-lg font-medium text-white mb-2">
        {label}
      </label>
      {description && (
        <p className="text-xs sm:text-sm text-white/70 font-normal mb-3">
          {description}
        </p>
      )}
      <div className="mt-2">
        {children}
      </div>
      {error && (
        <p className="text-xs sm:text-sm text-red-400 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}; 