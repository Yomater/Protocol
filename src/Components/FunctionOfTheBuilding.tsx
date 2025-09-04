import React, {useState} from 'react'
import data from '../data.json'

const FunctionOfTheBuilding: React.FC = () => {
    const [selectedFunction, setSelectedFunction] = useState('')
  return (
    <div>
      <label>Funkcja Budynku: </label>
      <select
        id='building-function'
        value={selectedFunction}
        onChange={(e) => setSelectedFunction(e.target.value)}
      
      >
        <option value="">-- Wybierz Funkcje --</option>
        {data.buildingFunctions.map((func, index) => (
            <option key={index} value={func}>
                {func}
            </option>
        ))}
      </select>
    </div>
  )
}

export default FunctionOfTheBuilding
