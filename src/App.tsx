import { useState } from 'react'
import Section from './Components/Section'
import StepButton from './Components/StepButton'
import Modal from './Components/Modal'

type Step = 'adres' | 'termo' | 'zrodla' | 'dane' | 'kominy' | 'wysylka' | null

function App() {
	const [activeStep, setActiveStep] = useState<Step>(null)

	return (
		<div className='w-full px-4 py-6 bg-gray-50'>
			<div className='mx-auto max-w-screen-md space-y-6 text-center'>
				<h1 className='text-2xl font-bold'>Protokół inwentaryzacji budynku</h1>

				<Section classes='grid grid-cols-1 gap-4'>
					<StepButton label='Adres i funkcja' onClick={() => setActiveStep('adres')} active={activeStep === 'adres'} />
				</Section>

				<Section classes='grid grid-cols-2 gap-4'>
					<div className='flex flex-col space-y-2'>
						<StepButton
							classes=''
							label='Termoizolacja'
							onClick={() => setActiveStep('termo')}
							active={activeStep === 'termo'}
						/>
						<StepButton
							label='Źródła ciepła'
							onClick={() => setActiveStep('zrodla')}
							active={activeStep === 'zrodla'}
						/>
					</div>
					<div className='flex flex-col space-y-2'>
						<StepButton
							label='Dane uczestnika i właściciela'
							onClick={() => setActiveStep('dane')}
							active={activeStep === 'dane'}
						/>
						<StepButton
							label='Przewody kominowe'
							onClick={() => setActiveStep('kominy')}
							active={activeStep === 'kominy'}
						/>
					</div>
				</Section>

				<Section classes='grid grid-cols-1 gap-4'>
					<StepButton
						label='Wysyłanie danych'
						onClick={() => setActiveStep('wysylka')}
						active={activeStep === 'wysylka'}
					/>
				</Section>

				<Modal
					open={activeStep === 'adres'}
					title='Adres i funkcja'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'>
					<input type='text' placeholder='Miejscowość' className='border p-2 w-full mb-2' />
					<input type='text' placeholder='Ulica' className='border p-2 w-full' />
				</Modal>

				<Modal
					open={activeStep === 'zrodla'}
					title='Źródła ciepła'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'>
					<select className='border p-2 w-full'>
						<option>Kocioł na paliwo stałe</option>
						<option>Kocioł gazowy</option>
						<option>Pompa ciepła</option>
					</select>
				</Modal>
			</div>
		</div>
	)
}

export default App
