import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (characterAllowed) {
      str += "!@#$%^&*()-{}[]"
    }

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      1
    }
    setPassword(pass)
  },
    [length, numberAllowed, characterAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, setPassword])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg my-10 bg-gray-500 rounded-lg' >
        <h1 className='text-4xl text-center text-white mb-3'> Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-8 p-3'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
          />
          <button
            className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 mb-10 p-1'>

          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={20}
              value={length}
              className='cursor-painter'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label className='text-white'>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev)
              }}

            />
            <label className='text-white'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id="charInput"
              onChange={(e) => {
                setCharAllowed((prev) => !prev)
              }}

            />
            <label className='text-white'>Characters</label>
          </div>
        </div>

      </div>
      {/*  */}
    </>
  )
}

export default App
