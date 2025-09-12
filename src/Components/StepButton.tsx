import React from "react";

interface StepButtonProps {
  label: string;
  onClick: () => void;
  active?: boolean;
}

const StepButton: React.FC<StepButtonProps> = ({ label, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded border 
        ${active ? "bg-blue-500 text-white" : "bg-white text-black"}`}
    >
      {label}
    </button>
  );
};

export default StepButton;