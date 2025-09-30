// src/components/HeatSource.tsx
import data from '../data.json'
import type { HeatSourceData, HeatSourceType } from '../types'

interface HeatSourceProps {
	source: HeatSourceData
	onChange: (data: Partial<HeatSourceData>) => void
	onDuplicate: () => void
	onRemove: () => void
}

export default function HeatSource({ source, onChange, onDuplicate, onRemove }: HeatSourceProps): React.ReactElement {
	// Pobranie mapy paliw — próbujemy najpierw data.fuelTypes, potem data.heatingSources (obsługa obu struktur)
	const fuelTypesMap: Record<string, string[]> | undefined =
		(data as any).fuelTypes ?? (data as any).heatingSources ?? undefined

	// Bezpiecznie wyciągamy opcje — jeśli source.type nie pasuje, dostajemy pustą tablicę
	const fuelOptions: string[] =
		source.type && fuelTypesMap ? fuelTypesMap[source.type as keyof typeof fuelTypesMap] ?? [] : []

	return (
		<div className='border rounded p-4 mb-4'>
			<div className='flex justify-between items-center mb-2'>
				<select
					className='border p-2 rounded'
					value={source.type}
					onChange={e => onChange({ type: e.target.value as HeatSourceType })}>
					<option value=''>Wybierz źródło ciepła</option>
					<option value='solidFuelBoiler'>Kocioł na paliwo stałe</option>
					<option value='gasBoiler'>Kocioł gazowy</option>
					<option value='oilBoiler'>Kocioł olejowy</option>
					<option value='electricHeating'>Ogrzewanie elektryczne</option>
					<option value='districtHeating'>Sieć ciepłownicza</option>
					<option value='heatPump'>Pompa ciepła</option>
					<option value='solarCollectors'>Kolektory słoneczne</option>
					<option value='photovoltaics'>Fotowoltaika</option>
					<option value='fireplace'>Kominek</option>
					<option value='kitchenCore'>Trzon kuchenny</option>
					<option value='tiledStove'>Piec kaflowy</option>
				</select>

				<div className='space-x-2'>
					<button className='px-2 py-1 bg-gray-200 rounded' onClick={onDuplicate}>
						Powiel
					</button>
					<button className='px-2 py-1 bg-red-200 rounded' onClick={onRemove}>
						Usuń
					</button>
				</div>
			</div>

			<input
				type='number'
				className='border p-2 w-full rounded mt-2'
				placeholder='Moc [kW]'
				value={source.power}
				onChange={e => onChange({ power: e.target.value === '' ? '' : Number(e.target.value) })}
			/>
			<input
				type='number'
				className='border p-2 w-full rounded mt-2'
				placeholder='Rok montażu'
				value={source.installYear}
				onChange={e => onChange({ installYear: e.target.value === '' ? '' : Number(e.target.value) })}
			/>
			<input
				type='number'
				className='border p-2 w-full rounded mt-2'
				placeholder='Rok produkcji'
				value={source.productionYear}
				onChange={e => onChange({ productionYear: e.target.value === '' ? '' : Number(e.target.value) })}
			/>
			<select
				className='border p-2 w-full rounded overflow-clip'
				value={source.heatCharacter}
				onChange={e => onChange({ heatCharacter: e.target.value === '' ? '' : e.target.value })}>
				{source.type === 'gasBoiler'
					? data.heatCharacterGas.map(c => (
							<option key={c} value={c}>
								{c}
							</option>
					  ))
					: source.type === 'fireplace'
					? data.heatCharacterFireplace.map(c => (
							<option key={c} value={c}>
								{c}
							</option>
					  ))
					: data.heatCharacter.map(c => (
							<option key={c} value={c}>
								{c}
							</option>
					  ))}
			</select>
			<select
				className='border p-2 w-full rounded overflow-clip'
				value={source.class}
				onChange={e => onChange({ class: e.target.value === '' ? '' : e.target.value })}>
				{data.class.map(c => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</select>
			<select
				className='border p-2 w-full rounded overflow-clip'
				value={source.ecoProject}
				onChange={e => onChange({ ecoProject: e.target.value === '' ? '' : e.target.value })}>
				{data.yesNo.map(c => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</select>
			<select
				className='border p-2 w-full rounded overflow-clip'
				value={source.fuelFeed}
				onChange={e => onChange({ fuelFeed: e.target.value === '' ? '' : e.target.value })}>
				{data.fuelFeed.map(c => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</select>
			<input
				type='number'
				className='border p-2 w-full rounded mt-2'
				placeholder='Sprawność cieplna (%)'
				value={source.efficiency}
				onChange={e => onChange({ efficiency: e.target.value === '' ? '' : Number(e.target.value) })}
			/>
			<select
				className='border p-2 w-full rounded overflow-clip'
				value={source.plannedExchange}
				onChange={e => onChange({ plannedExchange: e.target.value === '' ? '' : e.target.value })}>
				{data.yesNo.map(c => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</select>

			<select
				className='border p-2 w-full rounded'
				value={source.dustDevice}
				onChange={e => onChange({ dustDevice: e.target.value })}>
				<option value=''>Wybierz...</option>
				<option value='tak'>Tak</option>
				<option value='nie'>Nie</option>
			</select>

			{source.dustDevice === 'tak' && (
				<input
					type='number'
					className='border p-2 w-full rounded mt-2'
					placeholder='Sprawność (%)'
					value={source.dustDeviceEfficiency ?? ''}
					onChange={e =>
						onChange({
							dustDeviceEfficiency: e.target.value === '' ? '' : Number(e.target.value),
						})
					}
				/>
			)}

			<select
				className='border p-2 w-full rounded overflow-clip'
				value={source.buffer}
				onChange={e => onChange({ buffer: e.target.value === '' ? '' : e.target.value })}>
				{data.yesNoUnknown.map(c => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</select>

			<select
				className='border p-2 w-full rounded'
				value={source.accumulator}
				onChange={e => onChange({ accumulator: e.target.value })}>
				<option value=''>Wybierz...</option>
				<option value='tak'>Tak</option>
				<option value='nie'>Nie</option>
				<option value='brak danych'>Brak danych</option>
			</select>

			{source.accumulator === 'tak' && (
				<input
					type='number'
					className='border p-2 w-full rounded mt-2'
					placeholder='Pojemność (m3)'
					value={source.accumulatorCapacity ?? ''}
					onChange={e =>
						onChange({
							accumulatorCapacity: e.target.value === '' ? '' : Number(e.target.value),
						})
					}
				/>
			)}

			<select
				className='border p-2 w-full rounded'
				value={source.dataSource}
				onChange={e => onChange({ dataSource: e.target.value })}>
				<option value=''>Wybierz...</option>
				<option value='tabliczka znamionowa'>Tabliczka znamionowa</option>
				<option value='dokumentacja techniczno-ruchowa'>Dokumentacja techniczno-ruchowa</option>
				<option value='inne'>Inne</option>
			</select>

			{source.dataSource === 'inne' && (
				<input
					type='string'
					className='border p-2 w-full rounded mt-2'
					placeholder='Wpisz źródło'
					value={source.dataSourceOther ?? ''}
					onChange={e =>
						onChange({
							dataSourceOther: e.target.value === '' ? '' : e.target.value,
						})
					}
				/>
			)}

			<label className='block mb-1 font-semibold'>Paliwa</label>
			<select
				multiple
				size={fuelOptions.length}
				className='border p-2 w-full rounded overflow-clip'
				value={source.fuels}
				onChange={e =>
					onChange({
						fuels: Array.from(e.target.selectedOptions).map(o => o.value),
					})
				}>
				{fuelOptions.map(f => (
					<option key={f} value={f} disabled={source.fuels.includes(f)}>
						{f}
					</option>
				))}
			</select>

			<select
				className='border p-2 w-full rounded overflow-clip'
				value={source.pumpType}
				onChange={e => onChange({ pumpType: e.target.value === '' ? '' : e.target.value })}>
				{data.pumpType.map(c => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</select>

			<input
				type='number'
				className='border p-2 w-full rounded mt-2'
				placeholder='Liczba kolektorów'
				value={source.collectorsNumber}
				onChange={e => onChange({ collectorsNumber: e.target.value === '' ? '' : Number(e.target.value) })}
			/>
			<input
				type='number'
				className='border p-2 w-full rounded mt-2'
				placeholder='Liczba paneli'
				value={source.photovoltaicsNumber}
				onChange={e => onChange({ photovoltaicsNumber: e.target.value === '' ? '' : Number(e.target.value) })}
			/>
		</div>
	)
}
