import React from 'react'

interface ModalProps {
	open: boolean
	title: string
	onClose: () => void
	children: React.ReactNode
	classes: string
}

const Modal: React.FC<ModalProps> = ({ open, title, onClose, children, classes }) => {
	if (!open) return null

	return (
		<div className={classes}>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='text-lg font-bold'>{title}</h3>
				<button onClick={onClose} className='text-gray-500'>
					✕
				</button>
			</div>
			{children}
		</div>
	)
}

export default Modal
