import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (value: string | number) => void;
  value: string | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <SelectTrigger disabled={disabled}>
        <SelectValue placeholder={placeholder} value={value} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </div>
  );
};

// Placeholder components for the custom Select parts
export const SelectTrigger: React.FC<{ disabled?: boolean; children: React.ReactNode }> = ({ disabled, children }) => (
  <button disabled={disabled} className="w-full border px-4 py-2 rounded focus:outline-none">
    {children}
  </button>
);

export const SelectValue: React.FC<{ placeholder?: string; value?: string | number }> = ({ placeholder, value }) => (
  <span className="text-gray-600">
    {value || placeholder}
  </span>
);

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute mt-1 w-full border rounded bg-white shadow">
    {children}
  </div>
);

export const SelectItem: React.FC<{ value: string | number; onClick: () => void; children: React.ReactNode }> = ({
  value,
  onClick,
  children,
}) => (
  <div
    onClick={onClick}
    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
    role="button"
    data-value={value}
  >
    {children}
  </div>
);