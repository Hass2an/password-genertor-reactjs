import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
function App() {

  const [length, setlength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowd, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  // use ref

  const passwordRef = useRef(null)

  const passwordGenertor = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNLOPQSTUVWXYZabcdefghijklmnopsqtuvwxyz"
    if (numAllowed) str += "1234567890"
    if(charAllowd) str+= "`!@#$%^&*()_-+=][{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1) 
      pass += str.charAt(char) 
    }
    setPassword(pass)

  },[length,numAllowed,charAllowd,setPassword])

  const copyToClipboard = useCallback (()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenertor()
  },[length,numAllowed,charAllowd,passwordGenertor])

  return (
  <>
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-red-400'>
    <h1 className='text-white text-center my-3'>Password
    Genertor</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input
      type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      ref={passwordRef}
      />
      <button onClick={copyToClipboard}
       className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy </button>
      
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={100}
        value={length}
        className= "cursor"
        onChange={(e)=>{setlength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type='checkbox'
          defaultChecked ={numAllowed}
          id='numberinput'
          onChange={()=>{
            setNumAllowed((prev)=>!prev)
          }}
        />
        <label>Number Allowed</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type='checkbox'
          defaultChecked ={charAllowd}
          id='character'
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
        />
        <label>Charctor Allowed</label>
      </div>
    </div>
    </div>

  </>
  )
}

export default App
