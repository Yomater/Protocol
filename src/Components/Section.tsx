import React from 'react'
import type { ReactNode } from 'react'

interface SectionProps {
	title?: string
	children: ReactNode
	classes?: string
}

const Section: React.FC<SectionProps> = ({ classes, title, children }) => {
	return (
		<div className={'space-y-2 ' + classes}>
			{title && <h2 className='text-lg font-semibold'>{title}</h2>}
			<div >{children}</div>
		</div>
	)
}

export default Section
