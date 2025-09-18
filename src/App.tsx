import { useState } from 'react'
import Section from './Components/Section'
import StepButton from './Components/StepButton'
import Modal from './Components/Modal'
import FormField from './Components/FormField'
import DynamicFormField from './Components/DynamicFormField'
import ConditionalNumberField from './Components/ConditionalNumberField'
import ConditionalMultiSelectField from './Components/ConditionalMultiSelectField'
import data from './data.json'

type Step = 'adres' | 'termo' | 'zrodla' | 'dane' | 'kominy' | 'wysylka' | null

function App() {
	const [activeStep, setActiveStep] = useState<Step>(null)
	const [avgTemp, setAvgTemp] = useState<number | ''>('')
	const [localType, setLocalType] = useState<'mieszkalny' | 'niemieszkalny' | 'inny'>('mieszkalny')
	const [otherType, setOtherType] = useState('')
	const [area, setArea] = useState<number | ''>('')
	const [participantName, setParticipantName] = useState('')
	const [ownerLastName, setOwnerLastName] = useState('')
	const [ownerFirstName, setOwnerFirstName] = useState('')
	const [ownerEmail, setOwnerEmail] = useState('')
	const [notes, setNotes] = useState('')

	const [dymowe, setDymowe] = useState(0)
	const [spalinowe, setSpalinowe] = useState(0)
	const [wentylacyjne, setWentylacyjne] = useState(0)
	const [awaryjne, setAwaryjne] = useState(0)

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
					title='Inwentaryzacja budynku'
					onClose={() => setActiveStep(null)}
					classes='bg-white p-6 rounded-xl shadow-md'
					color='yellow'>
					{(() => {
						const [form, setForm] = useState({
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
						})

						const handleChange = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }))

						return (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{/* w razie podziału na dwie kolumny można użyć klas grid grid-cols-1 md:grid-cols-2 gap-4, bez podziału space-y-4 */}
								{/* 1. Funkcja Budynku */}
								<FormField
									label='Funkcja budynku'
									optionsKey='buildingFunctions'
									type='select'
									value={form.funkcjaBudynku}
									onChange={val => handleChange('funkcjaBudynku', val)}
								/>
								{/* 2. Typ budynku */}
								<FormField
									label='Typ budynku'
									optionsKey='buildingType'
									type='select'
									value={form.typBudynku}
									onChange={val => handleChange('typBudynku', val)}
								/>
								{/* 3. Liczba kondygnacji i kształt budynku */}
								<DynamicFormField
									label='Liczba kondygnacji i kształt budynku'
									numberLabel='Podaj liczbę kondygnacji'
									selectLabel='Wybierz kształt budynku'
									value={form.kondygnacje}
									onNumberChange={val => handleChange('kondygnacje', val)}
									selectValue={form.ksztaltBudynku}
									onSelectChange={val => handleChange('ksztaltBudynku', val)}
									optionsMap={{
										'1': data.buildingShape.oneFloor,
										'2': data.buildingShape.twoFloors,
										default: data.buildingShape.threeFloors,
									}}
								/>
								<FormField
									label='Obwód budynku (m)'
									type='number'
									value={form.obwodBudynku}
									onChange={val => handleChange('obwodBudynku', val)}
								/>
								{/* 4. Rok budowy */}
								<FormField
									label='Rok budowy'
									optionsKey='buildingYear'
									type='select'
									value={form.rokBudowy}
									onChange={val => handleChange('rokBudowy', val)}
								/>

								{/* 5. Średnia wysokość kondygnacji */}
								<FormField
									label='Średnia wysokość kondygnacji (m)'
									type='number'
									value={form.wysokoscKondygnacji}
									onChange={val => handleChange('wysokoscKondygnacji', val)}
								/>

								{/* 6. Grubość ocieplenia podłogi */}
								<FormField
									label='Grubość ocieplenia podłogi na gruncie lub stropu nad piwnicą/garażem'
									optionsKey='insulationThickness'
									type='select'
									value={form.ociepleniePodlogi}
									onChange={val => handleChange('ociepleniePodlogi', val)}
								/>

								{/* 7. Grubość ocieplenia Dachu */}
								<FormField
									label='Grubość ocieplenia dachu'
									optionsKey='insulationThickness'
									type='select'
									value={form.ocieplenieDachu}
									onChange={val => handleChange('ocieplenieDachu', val)}
								/>
								{/* 8. Grubość ocieplenia Stropodachu */}
								<FormField
									label='Grubość ocieplenia stropodachu'
									optionsKey='insulationThickness'
									type='select'
									value={form.ocieplenieStropodachu}
									onChange={val => handleChange('ocieplenieStropodachu', val)}
								/>
								{/* 9. Strop nad piwnicą */}
								<FormField
									label='Strop nad piwnicą'
									optionsKey='basementCeiling'
									type='select'
									value={form.stropNadPiwnica}
									onChange={val => handleChange('stropNadPiwnica', val)}
								/>
								{/* 10. Stan instalacji CO */}
								<FormField
									label='Stan instalacji Centralnego Ogrzewania (CO)'
									optionsKey='heatingSystemState'
									type='select'
									value={form.stanCO}
									onChange={val => handleChange('stanCO', val)}
								/>
								{/* 11. Stopień ocieplenia ścian */}
								<FormField
									label='Stopień ocieplenia ścian'
									optionsKey='wallsInsulation'
									type='select'
									value={form.stopienOciepleniaScian}
									onChange={val => handleChange('stopienOciepleniaScian', val)}
								/>
								{/* 12. Grubość ocieplenia ścian */}
								<FormField
									label='Grubość ocieplenia ścian'
									optionsKey='insulationThickness'
									type='select'
									value={form.gruboscOciepleniaScian}
									onChange={val => handleChange('gruboscOciepleniaScian', val)}
								/>
								{/* 13. Ocieplenie stropów */}
								<FormField
									label='Ocieplenie stropów'
									optionsKey='heatingSystemState'
									type='select'
									value={form.ocieplenieStropow}
									onChange={val => handleChange('ocieplenieStropow', val)}
								/>
								{/* 14. Stan instalacji CWU */}
								<FormField
									label='Stan instalacji Ciepłej Wody Użytkowej (CWU)'
									optionsKey='heatingSystemState'
									type='select'
									value={form.stanCWU}
									onChange={val => handleChange('stanCWU', val)}
								/>
								{/* 15. Rodzaj wentylacji */}
								<FormField
									label='Rodzaj wentylacji:'
									optionsKey='ventilationType'
									type='select'
									value={form.wentylacja}
									onChange={val => handleChange('wentylacja', val)}
								/>
								{/* …analogicznie kolejne selecty dla ocieplenieDachu, ocieplenieStropodachu itd. */}

								{/* 16. Wymieniono stolarkę okienną */}
								<ConditionalNumberField
									label='Czy wymieniono stolarkę okienną?'
									value={form.wymienionoOkna}
									onValueChange={val => handleChange('wymienionoOkna', val)}
									numberLabel='Rok wymiany'
									numberValue={form.rokWymianyOkien}
									onNumberChange={val => handleChange('rokWymianyOkien', val)}
								/>

								{/* 17. Rodzaj okien */}
								<FormField
									label='Rodzaj okien:'
									optionsKey='windowsType'
									type='select'
									value={form.rodzajOkien}
									onChange={val => handleChange('rodzajOkien', val)}
								/>

								{/* 18. Wymieniono stolarkę drzwiową */}
								<ConditionalNumberField
									label='Czy wymieniono drzwi zewnętrzne?'
									value={form.wymienionoDrzwi}
									onValueChange={val => handleChange('wymienionoDrzwi', val)}
									numberLabel='Rok wymiany'
									numberValue={form.rokWymianyDrzwi}
									onNumberChange={val => handleChange('rokWymianyDrzwi', val)}
								/>

								{/* 16. Planowana termomodernizacja */}
								<ConditionalMultiSelectField
									label='Planowana termomodernizacja?'
									value={form.planowanaTermo}
									onValueChange={val => handleChange('planowanaTermo', val)}
									options={data.plannedThermomodernization} // tablica z JSON-a
									selectedOptions={form.planowanaTermoOpcje}
									onOptionsChange={val => handleChange('planowanaTermoOpcje', val)}
									otherValue={form.planowanaTermoInne}
									onOtherChange={val => handleChange('planowanaTermoInne', val)}
								/>
							</div>
						)
					})()}
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
							value={participantName}
							onChange={e => setParticipantName(e.target.value)}
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
								const trimmed = participantName.trim()
								const lastSpaceIndex = trimmed.lastIndexOf(' ')

								let first = trimmed
								let last = ''

								if (lastSpaceIndex !== -1) {
									first = trimmed.slice(0, lastSpaceIndex) // wszystko przed ostatnią spacją
									last = trimmed.slice(lastSpaceIndex + 1) // wszystko po ostatniej spacji
								}

								setOwnerFirstName(first)
								setOwnerLastName(last)
							}}
							className='text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md border'>
							Jak wyżej
						</button>
					</div>

					<div>
						<label className='block mb-1 text-sm font-medium'>Nazwisko właściciela/zarządcy lub nazwa firmy</label>
						<input
							type='text'
							value={ownerLastName}
							onChange={e => setOwnerLastName(e.target.value)}
							className='border p-2 w-full'
							placeholder='np. Kowalski / Firma XYZ'
						/>
					</div>

					<div>
						<label className='block mb-1 text-sm font-medium'>Imię właściciela/zarządcy lub nazwa firmy</label>
						<input
							type='text'
							value={ownerFirstName}
							onChange={e => setOwnerFirstName(e.target.value)}
							className='border p-2 w-full'
							placeholder='np. Jan / Firma XYZ'
						/>
					</div>

					{/* 4. E-mail */}
					<div>
						<label className='block mb-1 text-sm font-medium'>Adres e-mail właściciela</label>
						<input
							type='email'
							value={ownerEmail}
							onChange={e => setOwnerEmail(e.target.value)}
							className='border p-2 w-full'
							placeholder='np. jan@kowalski.pl'
						/>
					</div>

					{/* 5. Uwagi */}
					<div>
						<label className='block mb-1 text-sm font-medium'>Inne uwagi</label>
						<textarea
							value={notes}
							onChange={e => setNotes(e.target.value)}
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
						const suma = dymowe + spalinowe + wentylacyjne + awaryjne

						return (
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody dymowe</label>
									<input
										type='number'
										min={0}
										value={dymowe}
										onChange={e => setDymowe(Number(e.target.value))}
										className='border p-2 w-full text-center rounded'
									/>
								</div>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody spalinowe</label>
									<input
										type='number'
										min={0}
										value={spalinowe}
										onChange={e => setSpalinowe(Number(e.target.value))}
										className='border p-2 w-full text-center rounded'
									/>
								</div>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody wentylacyjne</label>
									<input
										type='number'
										min={0}
										value={wentylacyjne}
										onChange={e => setWentylacyjne(Number(e.target.value))}
										className='border p-2 w-full text-center rounded'
									/>
								</div>
								<div className='p-4 bg-gray-100 rounded-lg shadow'>
									<label className='block mb-2 font-semibold'>Przewody awaryjne</label>
									<input
										type='number'
										min={0}
										value={awaryjne}
										onChange={e => setAwaryjne(Number(e.target.value))}
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
