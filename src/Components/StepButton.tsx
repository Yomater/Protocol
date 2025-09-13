import React from 'react'

interface StepButtonProps {
	label: string
	onClick: () => void
	active?: boolean
}

const StepButton: React.FC<StepButtonProps> = ({ label, onClick, active }) => {
	return (
		<button
			onClick={onClick}
			className=''>
			{label}
		</button>
	)
}

export default StepButton
