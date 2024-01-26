import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const addValue = () => {
    if (count < 20) {
      setCount(prevValue => prevValue + 1)
      setCount(prevValue => prevValue + 1)
      setCount(prevValue => prevValue + 1)
    }

  }

  const removeValue = () => {
    if (count > 0) {
      setCount(count - 1)
    }

  }
  return (
    <>
      <h1>Vite + React</h1>
      <h2> Counter value :{count}</h2>
      <button onClick={addValue}> Add value</button>
      <br />
      <button onClick={removeValue}> Remove value</button>
    </>
  )


}

export default App
