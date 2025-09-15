import { useState } from 'react'
import Section from './Components/Section'
import StepButton from './Components/StepButton'
import Modal from './Components/Modal'

type Step = 'adres' | 'termo' | 'zrodla' | 'dane' | 'kominy' | 'wysylka' | null

function App() {
	const [activeStep, setActiveStep] = useState<Step>(null)
	const [avgTemp, setAvgTemp] = useState<number | ''>('')
	const [localType, setLocalType] = useState<'mieszkalny' | 'niemieszkalny' | 'inny'>('mieszkalny')
	const [otherType, setOtherType] = useState('')
	const [area, setArea] = useState<number | ''>('')

	return (
		<div className='w-full px-4 py-6 bg-gray-50'>
			<div className='mx-auto max-w-screen-md space-y-6 text-center'>
				<h1 className='text-2xl font-bold'>Protokół inwentaryzacji budynku</h1>

				{(activeStep === null || activeStep === 'adres') && (
					<Section classes='grid grid-cols-1 gap-4'>
						<StepButton
							label='Adres i funkcja'
							onClick={() => setActiveStep('adres')}
							active={activeStep === 'adres'}
							color='blue'
						/>
					</Section>
				)}

				{(activeStep === null ||
					activeStep === 'termo' ||
					activeStep === 'zrodla' ||
					activeStep === 'dane' ||
					activeStep === 'kominy') && (
					<Section classes={activeStep === null ? 'grid grid-cols-2 gap-4' : 'flex justify-center'}>
						<div className='flex flex-col space-y-2'>
							{(activeStep === null || activeStep === 'termo') && (
								<StepButton
									label='Termoizolacja'
									onClick={() => setActiveStep('termo')}
									active={activeStep === 'termo'}
									color='yellow'
								/>
							)}
							{(activeStep === null || activeStep === 'zrodla') && (
								<StepButton
									label='Źródła ciepła'
									onClick={() => setActiveStep('zrodla')}
									active={activeStep === 'zrodla'}
									color='yellow'
								/>
							)}
						</div>
						<div className='flex flex-col space-y-2'>
							{(activeStep === null || activeStep === 'dane') && (
								<StepButton
									label='Dane uczestnika i właściciela'
									onClick={() => setActiveStep('dane')}
									active={activeStep === 'dane'}
									color='yellow'
								/>
							)}
							{(activeStep === null || activeStep === 'kominy') && (
								<StepButton
									label='Przewody kominowe'
									onClick={() => setActiveStep('kominy')}
									active={activeStep === 'kominy'}
									color='yellow'
								/>
							)}
						</div>
					</Section>
				)}

				{(activeStep === null || activeStep === 'wysylka') && (
					<Section classes='grid grid-cols-1 gap-4'>
						<StepButton
							label='Wysyłanie danych'
							onClick={() => setActiveStep('wysylka')}
							active={activeStep === 'wysylka'}
							color='green'
						/>
					</Section>
				)}

				<Modal
					open={activeStep === 'adres'}
					title='Adres i funkcja'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='blue'>
					<input type='text' placeholder='Miejscowość' className='border p-2 w-full mb-2 text-center' />
					<input type='text' placeholder='Ulica' className='border p-2 w-full text-center' />
					{/* 1. Średnia temp. */}
					<div className='flex items-center p-4 gap-2'>
						<label className='w-1/2 text-sm font-medium'>Średnia temp.</label>
						<input
							type='number'
							min={0}
							value={avgTemp}
							onChange={e => setAvgTemp(e.target.value === '' ? '' : Number(e.target.value))}
							className='border p-2 flex-1 text-center'
							placeholder='np. 20'
						/>
						<span className='text-sm font-medium'>°C</span>
					</div>

					{/* 2. Rodzaj lokalu */}
					<div className='space-y-2'>
						<div className='flex items-center gap-2'>
							<label className='w-1/3 text-sm font-medium'>Rodzaj lokalu</label>
							<select
								value={localType}
								onChange={e => setLocalType(e.target.value as any)}
								className='border p-2 flex-1 text-center'>
								<option value='mieszkalny'>Mieszkalny</option>
								<option value='niemieszkalny'>Niemieszkalny / Użytkowy</option>
								<option value='inny'>Inny</option>
							</select>
						</div>

						{localType === 'inny' && (
							<div className='flex items-center gap-2'>
								<label className='w-1/3 text-sm font-medium'>Rodzaj (opis)</label>
								<input
									type='text'
									value={otherType}
									onChange={e => setOtherType(e.target.value)}
									className='border p-2 flex-1 text-center'
									placeholder='Wpisz rodzaj lokalu'
								/>
							</div>
						)}
					</div>

					{/* 3. Powierzchnia ogrzewana */}
					<div className='flex items-center p-2 gap-2'>
						<label className='w-1/2 text-sm font-medium'>Ogrzewana powierzchnia</label>
						<input
							type='number'
							min={0}
							value={area}
							onChange={e => setArea(e.target.value === '' ? '' : Number(e.target.value))}
							className='border p-2 flex-1 text-center'
							placeholder='np. 80'
						/>
						<span className='text-sm font-medium'>m²</span>
					</div>
				</Modal>

				<Modal
					open={activeStep === 'termo'}
					title='Źródła ciepła'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='yellow'>
					<select className='border p-2 w-full'>
						<option>Kocioł na paliwo stałe</option>
						<option>Kocioł gazowy</option>
						<option>Pompa ciepła</option>
					</select>
				</Modal>

				<Modal
					open={activeStep === 'zrodla'}
					title='Źródła ciepła'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='yellow'>
					<select className='border p-2 w-full'>
						<option>Kocioł na paliwo stałe</option>
						<option>Kocioł gazowy</option>
						<option>Pompa ciepła</option>
					</select>
				</Modal>

				<Modal
					open={activeStep === 'dane'}
					title='Źródła ciepła'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='yellow'>
					<select className='border p-2 w-full'>
						<option>Kocioł na paliwo stałe</option>
						<option>Kocioł gazowy</option>
						<option>Pompa ciepła</option>
					</select>
				</Modal>

				<Modal
					open={activeStep === 'kominy'}
					title='Źródła ciepła'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='yellow'>
					<select className='border p-2 w-full'>
						<option>Kocioł na paliwo stałe</option>
						<option>Kocioł gazowy</option>
						<option>Pompa ciepła</option>
					</select>
				</Modal>

				<Modal
					open={activeStep === 'wysylka'}
					title='Adres i funkcja'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='green'>
					<input type='text' placeholder='Miejscowość' className='border p-2 w-full mb-2 text-center' />
					<input type='text' placeholder='Ulica' className='border p-2 w-full text-center' />
				</Modal>
			</div>
		</div>
	)
}

export default App
