import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import HeatSource from './HeatSource'
import type { HeatSourceData } from '../types'
import type { FormData } from '../types'

interface ModalSourcesProps {
	open: boolean
	onClose: () => void
	formData: FormData
	setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const ModalSources: React.FC<ModalSourcesProps> = ({ open, onClose, formData, setFormData }) => {
	const [sources, setSources] = useState<HeatSourceData[]>(formData.sources || [])

	useEffect(() => {
		if (open) setSources(formData.sources || [])
	}, [formData.sources, open])

	const updateSource = (index: number, newData: Partial<HeatSourceData>) => {
		setSources(prev => prev.map((s, i) => (i === index ? { ...s, ...newData } : s)))
	}

	const addSource = () =>
		setSources(prev => [
			...prev,
			{
				type: '',
				fuelInputs: {},
				power: '',
				installYear: '',
				productionYear: '',
				heatCharacter: '',
				class: '',
				ecoProject: '',
				fuelFeed: '',
				efficiency: '',
				plannedExchange: '',
				dustDevice: '',
				dustDeviceEfficiency: '',
				buffer: '',
				accumulator: '',
				accumulatorCapacity: '',
				dataSource: '',
				dataSourceOther: '',
				pumpType: '',
				collectorsNumber: '',
				photovoltaicsNumber: '',
			},
		])

	const duplicateSource = (index: number) => setSources(prev => [...prev, { ...prev[index] }])

	const removeSource = (index: number) => setSources(prev => prev.filter((_, i) => i !== index))

	const handleClose = () => {
		setFormData(prev => ({ ...prev, sources }))
		onClose()
	}

	return (
		<Modal
			color='yellow'
			open={open}
			title='Źródła ciepła'
			onClose={handleClose}
			classes='bg-white p-6 rounded-xl shadow-md'>
			{sources.map((source, idx) => (
				<HeatSource
					key={idx}
					source={source}
					onChange={newData => updateSource(idx, newData)}
					onDuplicate={() => duplicateSource(idx)}
					onRemove={() => removeSource(idx)}
				/>
			))}

			<div className='mt-4 flex gap-2'>
				<button className='px-4 py-2 bg-blue-600 text-white rounded' onClick={addSource}>
					Dodaj źródło ciepła
				</button>
			</div>
		</Modal>
	)
}

export default ModalSources
