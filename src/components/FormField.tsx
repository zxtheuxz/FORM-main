interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, description, error, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-lg font-medium text-white mb-2">
        {label}
      </label>
      {description && (
        <p className="text-sm text-white/70 font-normal mb-2">
          {description}
        </p>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}; 