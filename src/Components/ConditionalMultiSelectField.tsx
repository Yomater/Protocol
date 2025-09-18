interface ConditionalMultiSelectFieldProps {
	label: string
	value: string // tak/nie
	onValueChange: (value: string) => void
	options: string[] // np. z data.json
	selectedOptions: string[]
	onOptionsChange: (value: string[]) => void
	otherValue: string
	onOtherChange: (value: string) => void
}

const ConditionalMultiSelectField: React.FC<ConditionalMultiSelectFieldProps> = ({
	label,
	value,
	onValueChange,
	options,
	selectedOptions,
	onOptionsChange,
	otherValue,
	onOtherChange,
}) => {
	const handleCheckboxChange = (option: string) => {
		if (selectedOptions.includes(option)) {
			onOptionsChange(selectedOptions.filter(o => o !== option))
		} else {
			onOptionsChange([...selectedOptions, option])
		}
	}

	return (
		<div className='mb-4'>
			<label className='block mb-1 font-semibold'>{label}</label>
			<select className='border p-2 w-full rounded' value={value} onChange={e => onValueChange(e.target.value)}>
				<option value=''>Wybierz…</option>
				<option value='tak'>Tak</option>
				<option value='nie'>Nie</option>
			</select>

			{value === 'tak' && (
				<div className='mt-2 space-y-2'>
					{options.map(opt => (
						<label key={opt} className='flex items-center space-x-2'>
							<input
								type='checkbox'
								checked={selectedOptions.includes(opt)}
								onChange={() => handleCheckboxChange(opt)}
							/>
							<span>{opt}</span>
						</label>
					))}

					{selectedOptions.includes('inne') && (
						<input
							type='text'
							placeholder='Podaj inne'
							className='border p-2 w-full rounded mt-2'
							value={otherValue}
							onChange={e => onOtherChange(e.target.value)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default ConditionalMultiSelectField
