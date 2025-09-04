import './App.css'
import Form from './Form'
import FunctionOfTheBuilding from './Components/FunctionOfTheBuilding'

function App() {
	return (
		<div className='p-4'>
			<h1 className='text-xl mb-4'>Formularz kontaktowy</h1>
			<Form />
			<FunctionOfTheBuilding />
		</div>
	)
}

export default App
