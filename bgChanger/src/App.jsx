
import { useState } from 'react'

function App() {
  const [color, setColor] = useState("olive")
  return (
    <div className='w-full h-screen duration-200'
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12">
        <button onClick={() => setColor('red')}>
          Red
        </button>
        <button style={{ backgroundColor: 'Green' }}
          onClick={() => setColor('green')}>
          Green
        </button>
      </div>


    </div>
  )
}

export default App
