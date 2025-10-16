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
