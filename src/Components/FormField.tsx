import React from 'react'
import data from '../data.json'

interface FormFieldProps {
	label: string
	value: string | number
	onChange: (value: string) => void
	type?: 'text' | 'number' | 'select' | 'textarea'
	children?: React.ReactNode // np. <option>...</option>
	optionsKey?: string
}

const FormField: React.FC<FormFieldProps> = ({ optionsKey, label, value, onChange, type = 'text', children }) => {
	const optionsArray = optionsKey ? (data as any)[optionsKey] : null

	return (
		<div className='flex flex-col space-y-1'>
			<label className='block mb-1 font-semibold'>{label}</label>

			{type === 'select' && (
				<select className='border p-2 w-full rounded' value={value} onChange={e => onChange(e.target.value)}>
					<option value=''>Wybierz...</option>
					{optionsArray
						? optionsArray.map((opt: string, index: number) => (
								<option key={index} value={opt}>
									{opt}
								</option>
						  ))
						: children}
				</select>
			)}

			{type === 'textarea' && (
				<textarea className='border p-2 w-full rounded' value={value} onChange={e => onChange(e.target.value)} />
			)}

			{type === 'text' || type === 'number' ? (
				<input
					type={type}
					className='border p-2 w-full rounded'
					value={value}
					onChange={e => onChange(e.target.value)}
				/>
			) : null}
		</div>
	)
}
// 		<div>
// 			<label className='block mb-1 font-semibold'>Funkcja budynku: </label>
// 			<select
// 				className='border p-2 w-full rounded'
// 				id='buildingFunction'
// 				value={selectedFunction}
// 				onChange={e => setSelectedFunction(e.target.value)}>
// 				<option value=''>-- Wybierz Funkcje --</option>
// 			</select>
// 		</div>
// 	)
// }

export default FormField
