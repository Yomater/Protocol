import React from 'react'
import type { ReactNode } from 'react'

interface SectionProps {
	title?: string
	children: ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
	return (
		<div className='space-y-2'>
			{title && <h2 className='text-lg font-semibold'>{title}</h2>}
			<div className='flex gap-4 flex-wrap'>{children}</div>
		</div>
	)
}

export default Section
