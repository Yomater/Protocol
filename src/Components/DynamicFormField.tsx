import React from 'react';

interface DynamicFormFieldProps {
  label: string;
  numberLabel: string; // opis pola liczbowego
  selectLabel: string; // opis selecta
  value: number; // wartość liczbowa
  onNumberChange: (value: number) => void; // zmiana inputu number
  onSelectChange: (value: string) => void; // zmiana selecta
  optionsMap: {
    [key: string]: string[]; // np. { "1": [...], "2": [...], "default": [...] }
  };
  selectValue: string;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  label,
  numberLabel,
  selectLabel,
  value,
  onNumberChange,
  onSelectChange,
  optionsMap,
  selectValue,
}) => {
  // wybór opcji zależny od wartości value
  const getOptions = () => {
    if (optionsMap[value]) return optionsMap[value];
    return optionsMap['default'] || [];
  };

  return (
    <div className='space-y-2 border p-3 rounded'>
      <h3 className='font-semibold'>{label}</h3>

      <div>
        <label className='block text-sm font-medium mb-1'>{numberLabel}</label>
        <input
          type='number'
          min={0}
          className='border p-2 w-full rounded'
          value={value}
          onChange={(e) => onNumberChange(Number(e.target.value))}
        />
      </div>

      {value > 0 && (
        <div>
          <label className='block text-sm font-medium mb-1'>{selectLabel}</label>
          <select
            className='border p-2 w-full rounded'
            value={selectValue}
            onChange={(e) => onSelectChange(e.target.value)}
          >
            <option value=''>Wybierz...</option>
            {getOptions().map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DynamicFormField;
