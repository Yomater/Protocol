import React from 'react';

interface ConditionalNumberFieldProps {
  label: string;
  value: string; // 'tak' lub 'nie'
  onValueChange: (value: string) => void;
  numberValue: number | '';
  onNumberChange: (value: number) => void;
  numberLabel: string;
}

const ConditionalNumberField: React.FC<ConditionalNumberFieldProps> = ({
  label,
  value,
  onValueChange,
  numberValue,
  onNumberChange,
  numberLabel
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <select
        className="border p-2 w-full rounded"
        value={value}
        onChange={e => onValueChange(e.target.value)}
      >
        <option value="">Wybierz…</option>
        <option value="tak">Tak</option>
        <option value="nie">Nie</option>
      </select>

      {value === 'tak' && (
        <div className="mt-2">
          <label className="block mb-1">{numberLabel}</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={numberValue}
            onChange={e => onNumberChange(Number(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default ConditionalNumberField;
