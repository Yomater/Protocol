import React, { useState } from 'react'
import Modal from './Modal'
import HeatSource from './HeatSource'
import type { HeatSourceData } from '../types'

interface ModalSourcesProps {
	open: boolean
	onClose: () => void
}

const ModalSources: React.FC<ModalSourcesProps> = ({ open, onClose }) => {
	const [sources, setSources] = useState<HeatSourceData[]>([])

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
				photovoltaicsNumber: ''
			},
		])

	const duplicateSource = (index: number) => setSources(prev => [...prev, { ...prev[index] }])

	const removeSource = (index: number) => setSources(prev => prev.filter((_, i) => i !== index))

	return (
		<Modal
			color='yellow'
			open={open}
			title='Źródła ciepła'
			onClose={onClose}
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
