import React from 'react'

interface ModalProps {
	open: boolean
	title: string
	onClose: () => void
	children: React.ReactNode
	classes: string
	color: 'blue' | 'yellow' | 'green'
}

const Modal: React.FC<ModalProps> = ({ open, title, onClose, children, classes, color }) => {
	if (!open) return null

	const activeClasses: Record<string, string> = {
		blue: 'bg-blue-600 text-white border-blue-700',
		yellow: 'bg-yellow-400 text-gray-900 border-yellow-500',
		green: 'bg-green-600 text-white border-green-700',
	}

	return (
		<div className={classes}>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='text-lg font-bold'>{title}</h3>
			</div>
			{children}
			<button
				onClick={onClose}
				className={`
        w-full rounded-xl px-6 mt-10 py-2 text-lg font-semibold
        transition-colors duration-200 border shadow-sm
        ${activeClasses[color]}
      `}>
				Zapisz i zamknij
			</button>
		</div>
	)
}

export default Modal
