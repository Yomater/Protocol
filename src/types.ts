export type HeatSourceType =
	| ''
	| 'solidFuelBoiler'
	| 'gasBoiler'
	| 'oilBoiler'
	| 'electricHeating'
	| 'districtHeating'
	| 'heatPump'
	| 'solarCollectors'
	| 'photovoltaics'
	| 'fireplace'
	| 'stoveKitchen'
	| 'kitchenCore'
	| 'tiledStove'

export interface HeatSourceData {
	type: HeatSourceType
	fuelInputs: Record<string, number | ''>
	power: number | '' // trzymamy number | '' (można też string)
	installYear: number | '' // trzymamy number | '' (można też string)
	productionYear: number | '' // trzymamy number | '' (można też string)
	heatCharacter: string
	class: string
	ecoProject: string
	fuelFeed: string
	efficiency: number | ''
	plannedExchange: string
	dustDevice: string
	dustDeviceEfficiency: number | ''
	buffer: string
	accumulator: string
	accumulatorCapacity: number | ''
	dataSource: string
	dataSourceOther: string
	pumpType: string
	collectorsNumber: number | ''
	photovoltaicsNumber: number | ''
}

export interface FormData {
	// Etap 1: lokal
	avgTemp: number | ''
	localType: 'mieszkalny' | 'niemieszkalny' | 'inny'
	otherType: string
	area: number | ''
	addressCity: string
	addressStreet: string

	// Etap 2: dane uczestnika / właściciela
	participantName: string
	ownerLastName: string
	ownerFirstName: string
	ownerEmail: string
	notes: string

	// Etap 3: przewody kominowe
	chimney: {
		dymowe: number
		spalinowe: number
		wentylacyjne: number
		awaryjne: number
	}

	// Etap 4: inwentaryzacja budynku
	building: {
		funkcjaBudynku: string
		typBudynku: string
		kondygnacje: number
		ksztaltBudynku: string
		obwodBudynku: string
		rokBudowy: string
		wysokoscKondygnacji: string
		ociepleniePodlogi: string
		ocieplenieDachu: string
		ocieplenieStropodachu: string
		stropNadPiwnica: string
		stanCO: string
		stopienOciepleniaScian: string
		gruboscOciepleniaScian: string
		ocieplenieStropow: string
		stanCWU: string
		wentylacja: string
		wymienionoOkna: 'tak' | 'nie'
		rokWymianyOkien: number
		rodzajOkien: string
		wymienionoDrzwi: 'tak' | 'nie'
		rokWymianyDrzwi: number
		planowanaTermo: 'tak' | 'nie'
		planowanaTermoOpcje: string[]
		planowanaTermoInne: string
	}

	// Etap 5: źródła ciepła
	sources: HeatSourceData[]
}
