import React, { useState } from 'react'
import Modal from './Modal'
import FormField from './FormField'
import DynamicFormField from './DynamicFormField'
import ConditionalNumberField from './ConditionalNumberField'
import ConditionalMultiSelectField from './ConditionalMultiSelectField'
import data from '../data.json'
import type { FormData } from '../types'

interface TermoModalProps {
	open: boolean
	onClose: () => void
	setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const ModalTermo: React.FC<TermoModalProps> = ({ open, onClose, setFormData }) => {
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

	const handleSave = () => {
		setFormData(prev => ({ ...prev, termo: form }))
		onClose()
	}

	return (
		<Modal
			open={open}
			title='Inwentaryzacja budynku'
			onClose={handleSave}
			classes='bg-white p-6 rounded-xl shadow-md'
			color='yellow'>
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
		</Modal>
	)
}

export default ModalTermo
