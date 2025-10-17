import { useState } from 'react'
import Section from './Components/Section'
import StepButton from './Components/StepButton'
import Modal from './Components/Modal'
import ModalSources from './Components/ModalSources'
import ModalTermo from './Components/ModalTermo'
import type { FormData } from './types'
import { generatePDF } from './utils/generatePDF'

type Step = 'adres' | 'termo' | 'zrodla' | 'dane' | 'kominy' | 'wysylka' | null

function App() {
	const [activeStep, setActiveStep] = useState<Step>(null)

	const [formData, setFormData] = useState<FormData>({
		avgTemp: '',
		localType: 'mieszkalny',
		otherType: '',
		area: '',
		addressCity: '',
		addressStreet: '',

		participantName: '',
		ownerLastName: '',
		ownerFirstName: '',
		ownerEmail: '',
		notes: '',

		chimney: {
			dymowe: 0,
			spalinowe: 0,
			wentylacyjne: 0,
			awaryjne: 0,
		},

		building: {
			funkcjaBudynku: '',
			typBudynku: '',
			kondygnacje: 1,
			ksztaltBudynku: '',
			obwodBudynku: '',
			rokBudowy: '',
			wysokoscKondygnacji: '',
			ociepleniePodlogi: '',
			ocieplenieDachu: '',
			ocieplenieStropodachu: '',
			stropNadPiwnica: '',
			stanCO: '',
			stopienOciepleniaScian: '',
			gruboscOciepleniaScian: '',
			ocieplenieStropow: '',
			stanCWU: '',
			wentylacja: '',
			wymienionoOkna: 'nie',
			rokWymianyOkien: 0,
			rodzajOkien: '',
			wymienionoDrzwi: 'nie',
			rokWymianyDrzwi: 0,
			planowanaTermo: 'nie',
			planowanaTermoOpcje: [],
			planowanaTermoInne: '',
		},

		sources: [],
	})

	return (
		<div className='w-full px-4 py-6 bg-gray-50'>
			<div className='mx-auto max-w-screen-md space-y-6 text-center'>
				<h1 className='text-2xl font-bold'>Protokół inwentaryzacji budynku</h1>

				{(activeStep === null || activeStep === 'adres') && (
					<Section classes='grid grid-cols-1 gap-4'>
						<StepButton
							label='Adres i funkcja lokalu'
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
					title='Adres i funkcja lokalu'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='blue'>
					<input
						type='text'
						placeholder='Miejscowość'
						className='border p-2 w-full mb-2 text-center'
						value={formData.addressCity}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								addressCity: e.target.value as any,
							}))
						}
					/>
					<input
						type='text'
						placeholder='Ulica'
						className='border p-2 w-full text-center'
						value={formData.addressStreet}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								addressStreet: e.target.value as any,
							}))
						}
					/>
					{/* 1. Średnia temp. */}
					<div className='flex items-center p-4 gap-2'>
						<label className='w-1/2 text-sm font-medium'>Średnia temp.</label>
						<input
							type='number'
							min={0}
							value={formData.avgTemp}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									avgTemp: e.target.value === '' ? '' : Number(e.target.value),
								}))
							}
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
								value={formData.localType}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										localType: e.target.value as any,
									}))
								}
								className='border p-2 flex-1 text-center'>
								<option value='mieszkalny'>Mieszkalny</option>
								<option value='niemieszkalny'>Niemieszkalny / Użytkowy</option>
								<option value='inny'>Inny</option>
							</select>
						</div>

						{formData.localType === 'inny' && (
							<div className='flex items-center gap-2'>
								<label className='w-1/3 text-sm font-medium'>Rodzaj (opis)</label>
								<input
									type='text'
									value={formData.otherType}
									onChange={e =>
										setFormData(prev => ({
											...prev,
											otherType: e.target.value as any,
										}))
									}
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
							value={formData.area}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									area: e.target.value === '' ? '' : Number(e.target.value),
								}))
							}
							className='border p-2 flex-1 text-center'
							placeholder='np. 80'
						/>
						<span className='text-sm font-medium'>m²</span>
					</div>
				</Modal>

				<ModalTermo open={activeStep === 'termo'} onClose={() => setActiveStep(null)} setFormData={setFormData} />

				<ModalSources
					open={activeStep === 'zrodla'}
					onClose={() => setActiveStep(null)}
					setFormData={setFormData}
					formData={formData}
				/>

				<Modal
					open={activeStep === 'dane'}
					title='Dane uczestnika inwentaryzacji i właściciela'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md space-y-4'
					color='yellow'>
					{/* 1. Imię i nazwisko uczestnika */}
					<div>
						<label className='block mb-1 text-sm font-medium'>
							Imię i nazwisko osoby uczestniczącej w inwentaryzacji
						</label>
						<input
							type='text'
							value={formData.participantName}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									participantName: e.target.value as any,
								}))
							}
							className='border p-2 w-full'
							placeholder='np. Jan Kowalski'
						/>
					</div>

					{/* 2 i 3 + przycisk „Jak wyżej” */}
					<div className='flex items-center justify-between'>
						<h2 className='text-sm font-medium'>Dane właściciela / zarządcy</h2>
						<button
							type='button'
							onClick={() => {
								const trimmed = formData.participantName.trim()
								const lastSpaceIndex = trimmed.lastIndexOf(' ')

								let first = trimmed
								let last = ''

								if (lastSpaceIndex !== -1) {
									first = trimmed.slice(0, lastSpaceIndex) // wszystko przed ostatnią spacją
									last = trimmed.slice(lastSpaceIndex + 1) // wszystko po ostatniej spacji
								}

								setFormData(prev => ({
									...prev,
									ownerFirstName: first as any,
								}))
								setFormData(prev => ({
									...prev,
									ownerLastName: last as any,
								}))
							}}
							className='text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md border'>
							Jak wyżej
						</button>
					</div>

					<div>
						<label className='block mb-1 text-sm font-medium'>Nazwisko właściciela/zarządcy lub nazwa firmy</label>
						<input
							type='text'
							value={formData.ownerLastName}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									ownerLastName: e.target.value as any,
								}))
							}
							className='border p-2 w-full'
							placeholder='np. Kowalski / Firma XYZ'
						/>
					</div>

					<div>
						<label className='block mb-1 text-sm font-medium'>Imię właściciela/zarządcy lub nazwa firmy</label>
						<input
							type='text'
							value={formData.ownerFirstName}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									ownerFirstName: e.target.value as any,
								}))
							}
							className='border p-2 w-full'
							placeholder='np. Jan / Firma XYZ'
						/>
					</div>

					{/* 4. E-mail */}
					<div>
						<label className='block mb-1 text-sm font-medium'>Adres e-mail właściciela</label>
						<input
							type='email'
							value={formData.ownerEmail}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									ownerEmail: e.target.value as any,
								}))
							}
							className='border p-2 w-full'
							placeholder='np. jan@kowalski.pl'
						/>
					</div>

					{/* 5. Uwagi */}
					<div>
						<label className='block mb-1 text-sm font-medium'>Inne uwagi</label>
						<textarea
							value={formData.notes}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									notes: e.target.value as any,
								}))
							}
							className='border p-2 w-full'
							rows={3}
							placeholder='Dodatkowe informacje…'
						/>
					</div>
				</Modal>

				<Modal
					open={activeStep === 'kominy'}
					title='Przewody kominowe'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='yellow'>
					{(() => {
						const suma =
							formData.chimney.dymowe +
							formData.chimney.spalinowe +
							formData.chimney.wentylacyjne +
							formData.chimney.awaryjne

						return (
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody dymowe</label>
									<input
										type='number'
										min={0}
										value={formData.chimney.dymowe}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												chimney: { ...prev.chimney, dymowe: Number(e.target.value) },
											}))
										}
										className='border p-2 w-full text-center rounded'
									/>
								</div>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody spalinowe</label>
									<input
										type='number'
										min={0}
										value={formData.chimney.spalinowe}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												chimney: { ...prev.chimney, spalinowe: Number(e.target.value) },
											}))
										}
										className='border p-2 w-full text-center rounded'
									/>
								</div>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody wentylacyjne</label>
									<input
										type='number'
										min={0}
										value={formData.chimney.wentylacyjne}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												chimney: { ...prev.chimney, wentylacyjne: Number(e.target.value) },
											}))
										}
										className='border p-2 w-full text-center rounded'
									/>
								</div>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody awaryjne</label>
									<input
										type='number'
										min={0}
										value={formData.chimney.awaryjne}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												chimney: { ...prev.chimney, awaryjne: Number(e.target.value) },
											}))
										}
										className='border p-2 w-full text-center rounded'
									/>
								</div>

								{/* Suma */}
								<div className='col-span-1 sm:col-span-2 p-4 bg-blue-100 rounded-lg shadow text-center'>
									<span className='block mb-1 font-semibold'>Łączna liczba przewodów</span>
									<span className='text-3xl font-bold'>{suma}</span>
								</div>
							</div>
						)
					})()}
				</Modal>

				<Modal
					open={activeStep === 'wysylka'}
					title='Adres i funkcja'
					onClose={() => {
						setActiveStep(null)
						console.log(formData)
						generatePDF(formData)
					}}
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
