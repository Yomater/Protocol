import React from 'react'

interface StepButtonProps {
	label: string
	onClick: () => void
	active?: boolean
	classes?: string
	color: 'blue' | 'yellow' | 'green'
}

const StepButton: React.FC<StepButtonProps> = ({ label, onClick, active, color }) => {
	const activeClasses: Record<string, string> = {
		blue: 'bg-blue-600 text-white border-blue-700',
		yellow: 'bg-yellow-400 text-gray-900 border-yellow-500',
		green: 'bg-green-600 text-white border-green-700',
	}

	// Klasy Tailwind dla nieaktywnego stanu (hover + focus)
	const inactiveClasses: Record<string, string> = {
		blue: 'bg-gray-100 text-gray-900 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300',
		yellow: 'bg-gray-100 text-gray-900 hover:bg-yellow-50 focus:ring-2 focus:ring-yellow-300',
		green: 'bg-gray-100 text-gray-900 hover:bg-green-50 focus:ring-2 focus:ring-green-300',
	}

	return (
		<button
			onClick={onClick}
			className={`
        w-full rounded-xl px-6 py-4 text-lg font-semibold
        transition-colors duration-200 border shadow-sm
        ${active ? activeClasses[color] : inactiveClasses[color]}
      `}>
			{label}
		</button>
	)
}

export default StepButton
