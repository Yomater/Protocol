import React from 'react'

interface StepButtonProps {
	label: string
	onClick: () => void
	active?: boolean
	classes?: string
}

const StepButton: React.FC<StepButtonProps> = ({ classes, label, onClick, active }) => {
	return (
		<button onClick={onClick} className={`
        w-full
        rounded-xl
        px-6 py-4
        text-lg font-semibold
        transition-colors duration-200
        border
        shadow-sm
        ${active
          ? 'bg-blue-600 text-white border-blue-700'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-blue-300'}
      `}>
			{label}
		</button>
	)
}

export default StepButton
