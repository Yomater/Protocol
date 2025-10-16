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
					<option value='stoveKitchen'>Piecokuchnia / koza</option>
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

			{source.type !== '' && (
				<>
					{source.type !== 'districtHeating' && source.type !== 'solarCollectors' && (
						<>
							<label className='block mb-1 font-semibold'>Nominalna moc cieplna lub energetyczna (w kW)</label>
							<input
								type='number'
								className='border p-2 w-full rounded mb-2'
								placeholder='Moc [kW]'
								value={source.power}
								onChange={e => onChange({ power: e.target.value === '' ? '' : Number(e.target.value) })}
							/>
						</>
					)}

					{source.type === 'solarCollectors' && (
						<>
							<label className='block mb-1 font-semibold'>Liczba kolektorów</label>
							<input
								type='number'
								className='border p-2 w-full rounded mb-2'
								placeholder='Liczba kolektorów'
								value={source.collectorsNumber}
								onChange={e => onChange({ collectorsNumber: e.target.value === '' ? '' : Number(e.target.value) })}
							/>
						</>
					)}

					{source.type === 'photovoltaics' && (
						<>
							<label className='block mb-1 font-semibold'>Liczba paneli fotowoltaicznych</label>
							<input
								type='number'
								className='border p-2 w-full rounded mb-2'
								placeholder='Liczba paneli'
								value={source.photovoltaicsNumber}
								onChange={e => onChange({ photovoltaicsNumber: e.target.value === '' ? '' : Number(e.target.value) })}
							/>
						</>
					)}

					{source.type !== 'districtHeating' && source.type !== 'heatPump' && source.type !== 'solarCollectors' && (
						<>
							<label className='block mb-1 font-semibold'>Rok montażu</label>
							<input
								type='number'
								className='border p-2 w-full rounded mb-2'
								placeholder='Rok montażu'
								value={source.installYear}
								onChange={e => onChange({ installYear: e.target.value === '' ? '' : Number(e.target.value) })}
							/>
							<label className='block mb-1 font-semibold'>Rok produkcji</label>
							<input
								type='number'
								className='border p-2 w-full rounded mb-2'
								placeholder='Rok produkcji'
								value={source.productionYear}
								onChange={e => onChange({ productionYear: e.target.value === '' ? '' : Number(e.target.value) })}
							/>
						</>
					)}

					{source.type !== 'photovoltaics' &&
						source.type !== 'kitchenCore' &&
						source.type !== 'tiledStove' &&
						source.type !== 'stoveKitchen' && (
							<>
								<label className='block mb-1 font-semibold'>Charakter produkowanego ciepła</label>
								<select
									className='border p-2 w-full rounded overflow-clip mb-2'
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
							</>
						)}

					{source.type === 'solidFuelBoiler' && (
						<>
							<label className='block mb-1 font-semibold'>Klasa kotła</label>
							<select
								className='border p-2 w-full rounded overflow-clip mb-2'
								value={source.class}
								onChange={e => onChange({ class: e.target.value === '' ? '' : e.target.value })}>
								{data.class.map(c => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
							<label className='block mb-1 font-semibold'>Sposób podawania paliwa</label>
							<select
								className='border p-2 w-full rounded overflow-clip mb-2'
								value={source.fuelFeed}
								onChange={e => onChange({ fuelFeed: e.target.value === '' ? '' : e.target.value })}>
								{data.fuelFeed.map(c => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
						</>
					)}

					{(source.type === 'solidFuelBoiler' ||
						source.type === 'stoveKitchen' ||
						source.type === 'tiledStove' ||
						source.type === 'kitchenCore' ||
						source.type === 'fireplace') && (
						<>
							<label className='block mb-1 font-semibold'>Ekoprojekt - standardy niskoemisyjne</label>
							<select
								className='border p-2 w-full rounded overflow-clip mb-2'
								value={source.ecoProject}
								onChange={e => onChange({ ecoProject: e.target.value === '' ? '' : e.target.value })}>
								{data.yesNo.map(c => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
							<label className='block mb-1 font-semibold'>Sprawność cieplna (w %)</label>
							<input
								type='number'
								className='border p-2 w-full rounded mb-2'
								placeholder='Sprawność cieplna (%)'
								value={source.efficiency}
								onChange={e => onChange({ efficiency: e.target.value === '' ? '' : Number(e.target.value) })}
							/>
							<label className='block mb-1 font-semibold'>Urządzenie odpylające</label>
							<select
								className='border p-2 w-full rounded mb-2'
								value={source.dustDevice}
								onChange={e => onChange({ dustDevice: e.target.value })}>
								<option value=''>Wybierz...</option>
								<option value='tak'>Tak</option>
								<option value='nie'>Nie</option>
							</select>

							{source.dustDevice === 'tak' && (
								<>
									<label className='block mb-1 font-semibold'>Sprawność urządzenia odpylającego</label>
									<input
										type='number'
										className='border p-2 w-full rounded mb-2'
										placeholder='Sprawność (%)'
										value={source.dustDeviceEfficiency ?? ''}
										onChange={e =>
											onChange({
												dustDeviceEfficiency: e.target.value === '' ? '' : Number(e.target.value),
											})
										}
									/>
								</>
							)}
						</>
					)}

					{(source.type === 'solidFuelBoiler' ||
						source.type === 'gasBoiler' ||
						source.type === 'oilBoiler' ||
						source.type === 'stoveKitchen' ||
						source.type === 'tiledStove' ||
						source.type === 'kitchenCore' ||
						source.type === 'fireplace') && (
						<>
							<label className='block mb-1 font-semibold'>Planowana wymiana</label>
							<select
								className='border p-2 w-full rounded overflow-clip mb-2'
								value={source.plannedExchange}
								onChange={e => onChange({ plannedExchange: e.target.value === '' ? '' : e.target.value })}>
								{data.yesNo.map(c => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
						</>
					)}

					{source.type !== 'districtHeating' &&
						source.type !== 'photovoltaics' &&
						source.type !== 'kitchenCore' &&
						source.type !== 'stoveKitchen' &&
						source.type !== 'tiledStove' && (
							<>
								<label className='block mb-1 font-semibold'>Bufor ciepła lub ciepłej wody użytkowej</label>
								<select
									className='border p-2 w-full rounded overflow-clip mb-2'
									value={source.buffer}
									onChange={e => onChange({ buffer: e.target.value === '' ? '' : e.target.value })}>
									{data.yesNoUnknown.map(c => (
										<option key={c} value={c}>
											{c}
										</option>
									))}
								</select>
								<label className='block mb-1 font-semibold'>Zbiornik akumulacyjny</label>
								<select
									className='border p-2 w-full rounded mb-2'
									value={source.accumulator}
									onChange={e => onChange({ accumulator: e.target.value })}>
									<option value=''>Wybierz...</option>
									<option value='tak'>Tak</option>
									<option value='nie'>Nie</option>
									<option value='brak danych'>Brak danych</option>
								</select>

								{source.accumulator === 'tak' && (
									<>
										<label className='block mb-1 font-semibold'>Pojemność zbiornika akumulacyjnego (w m3)</label>
										<input
											type='number'
											className='border p-2 w-full rounded mb-2'
											placeholder='Pojemność (m3)'
											value={source.accumulatorCapacity ?? ''}
											onChange={e =>
												onChange({
													accumulatorCapacity: e.target.value === '' ? '' : Number(e.target.value),
												})
											}
										/>
									</>
								)}
							</>
						)}

					{(source.type === 'solidFuelBoiler' ||
						source.type === 'stoveKitchen' ||
						source.type === 'tiledStove' ||
						source.type === 'kitchenCore' ||
						source.type === 'fireplace') && (
						<>
							<label className='block mb-1 font-semibold'>Źródło danych</label>
							<select
								className='border p-2 w-full rounded mb-2'
								value={source.dataSource}
								onChange={e => onChange({ dataSource: e.target.value })}>
								<option value=''>Wybierz...</option>
								<option value='tabliczka znamionowa'>Tabliczka znamionowa</option>
								<option value='dokumentacja techniczno-ruchowa'>Dokumentacja techniczno-ruchowa</option>
								<option value='inne'>Inne</option>
							</select>
							{source.dataSource === 'inne' && (
								<>
									<input
										type='string'
										className='border p-2 w-full rounded mb-2'
										placeholder='Wpisz źródło'
										value={source.dataSourceOther ?? ''}
										onChange={e =>
											onChange({
												dataSourceOther: e.target.value === '' ? '' : e.target.value,
											})
										}
									/>
								</>
							)}
						</>
					)}

					{(source.type === 'solidFuelBoiler' ||
						source.type === 'gasBoiler' ||
						source.type === 'oilBoiler' ||
						source.type === 'stoveKitchen' ||
						source.type === 'tiledStove' ||
						source.type === 'kitchenCore' ||
						source.type === 'fireplace') && (
						<>
							<label className='block mb-1 font-semibold'>Paliwa</label>
							<div className='space-y-2 mt-4'>
								{fuelOptions.map(fuel => (
									<div key={fuel} className='flex items-center space-x-2'>
										<label className='w-40'>{fuel}</label>
										<input
											type='number'
											className='border p-2 rounded w-full'
											placeholder='Podaj wartość'
											value={source.fuelInputs?.[fuel] ?? ''}
											onChange={e =>
												onChange({
													fuelInputs: {
														...source.fuelInputs,
														[fuel]: e.target.value === '' ? '' : Number(e.target.value),
													},
												})
											}
										/>
									</div>
								))}
							</div>
						</>
					)}

					{source.type === 'heatPump' && (
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
					)}
				</>
			)}
		</div>
	)
}
