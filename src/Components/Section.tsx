import React from 'react'
import type { ReactNode } from 'react'

interface SectionProps {
	title?: string
	children: ReactNode
	classes?: string
}

const Section: React.FC<SectionProps> = ({ classes, title, children }) => {
	return (
		<div className={classes}>
			{title && <h2 className='text-lg font-semibold'>{title}</h2>}
			{children}
		</div>
	)
}

export default Section
