// src/utils/generatePDF.ts
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { FormData } from '../types' // dostosuj ścieżkę

export function generatePDF(formData: FormData) {
	const doc = new jsPDF({
		unit: 'pt',
		format: 'a4',
	})

	// początkowe ustawienia
	doc.setFontSize(18)
	const marginLeft = 40
	let cursorY = 40 // początkowy Y

	doc.text('Raport inwentaryzacji budynku', marginLeft, cursorY)
	cursorY += 24

	// helper: wyrenderuj prostą tabelę key/value
	const renderKeyValueTable = (title: string, rows: [string, string | number][]) => {
		if (!rows || rows.length === 0) return
		doc.setFontSize(13)
		doc.text(title, marginLeft, cursorY)
		cursorY += 10

		// autoTable zwraca nothing, ale ustawia doc.lastAutoTable
		autoTable(doc as any, {
			startY: cursorY,
			head: [['Pole', 'Wartość']],
			body: rows.map(r => [String(r[0]), String(r[1] ?? '-')]),
			styles: { fontSize: 10 },
			headStyles: { fillColor: [240, 240, 240] },
			margin: { left: marginLeft, right: 40 },
		})

		// zaktualizuj cursorY — bezpiecznie
		// (doc as any).lastAutoTable może być undefined więc używamy ?? cursorY
		cursorY = (doc as any).lastAutoTable?.finalY ?? cursorY + 20
		cursorY += 10
	}

	// Przyklad danych podstawowych (dostosuj pola do Twojego FormData)
	renderKeyValueTable('Dane podstawowe', [
		['Miejscowość', formData.addressCity ?? '-'],
		['Ulica', formData.addressStreet ?? '-'],
		['Imię i nazwisko uczestnika', formData.participantName ?? '-'],
		['E-mail właściciela', formData.ownerEmail ?? '-'],
	])

	// przykładowo inwentaryzacja (building) — filtrujemy puste pola
	if (formData.building) {
		const buildingRows: [string, string | number][] = Object.entries(formData.building)
			.filter(([_, v]) => v !== '' && v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
			.map(([k, v]) => [k, String(v)])
		renderKeyValueTable('Inwentaryzacja budynku', buildingRows)
	}

	// przewody kominowe
	if (formData.chimney) {
		renderKeyValueTable('Przewody kominowe', [
			['Dymowe', formData.chimney.dymowe ?? 0],
			['Spalinowe', formData.chimney.spalinowe ?? 0],
			['Wentylacyjne', formData.chimney.wentylacyjne ?? 0],
			['Awaryjne', formData.chimney.awaryjne ?? 0],
            ['Suma', formData.chimney.dymowe + formData.chimney.spalinowe + formData.chimney.wentylacyjne + formData.chimney.awaryjne]
		])
	}

	// źródła ciepła — renderujemy każdą po kolei (tylko wypełnione pola)
	if (Array.isArray(formData.sources) && formData.sources.length > 0) {
		formData.sources.forEach((src, idx) => {
			const rows: [string, string | number][] = []

			rows.push(['Typ', src.type || '-'])
			if (src.power !== '' && src.power !== null) rows.push(['Moc [kW]', src.power])
			if (src.installYear !== '' && src.installYear !== null) rows.push(['Rok montażu', src.installYear])
			if (src.productionYear !== '' && src.productionYear !== null) rows.push(['Rok produkcji', src.productionYear])
			if (src.heatCharacter) rows.push(['Charakterystyka', src.heatCharacter])
			if (src.buffer) rows.push(['Buffer', src.buffer])
			if (src.accumulator) rows.push(['Accumulator', src.accumulator])
			if (src.accumulatorCapacity !== '' && src.accumulatorCapacity !== null)
				rows.push(['Accumulator capacity', src.accumulatorCapacity])

			// fuelInputs — pokaż tylko paliwa z wartością
			// fuelInputs — pokaż tylko paliwa z wartością
			if (src.fuelInputs && Object.keys(src.fuelInputs).length > 0) {
				const fuelRows: [string, string | number][] = Object.entries(src.fuelInputs)
					.filter(([, v]) => v !== '' && v !== null && v !== undefined)
					.map(([k, v]) => [`Paliwo: ${k}`, String(v)])

				rows.push(...fuelRows)
			}

			renderKeyValueTable(`Źródło ciepła #${idx + 1}`, rows)
		})
	}

	// notatki
	if (formData.notes) {
		doc.text('Notatki:', marginLeft, cursorY)
		cursorY += 12
		// manual wrap if long
		const split = doc.splitTextToSize(String(formData.notes), 500)
		doc.text(split, marginLeft, cursorY)
		cursorY += split.length * 12
	}

	// save
	doc.save('raport_inwentaryzacji.pdf')
}
