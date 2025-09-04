import React, { useState } from 'react'

type FormData = {
	name: string
	email: string
}

const ContactForm: React.FC =() => {
	const [form, setForm] = useState<FormData>({ name: '', email: '' })
	const [message, setMessage] = useState<string>('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.name.trim() || !form.email.trim()) {
			setMessage('Wypełnij wszystkie pola!')
			return
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			setMessage('Podaj poprawny adres e-mail!')
			return
		}

		setMessage(`Dziękujemy za kontakt, ${form.name}!`)
		setForm({ name: '', email: '' })
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto'>
			<div>
				<label className='block mb-1'>Imię:</label>
				<input type='text' name='name' value={form.name} onChange={handleChange} className='border p-2 w-full' />
			</div>

			<div>
				<label className='block mb-1'>E-mail:</label>
				<input type='email' name='email' value={form.email} onChange={handleChange} className='border p-2 w-full' />
			</div>

			<button type='submit' className='bg-blue-500 text-white px-4 py-2'>
				Wyślij
			</button>

			{message && <p className='mt-2'>{message}</p>}
		</form>
	)
}

export default ContactForm