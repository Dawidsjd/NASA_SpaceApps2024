import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SpaceGameMain from './SubPages/SpaceGame/spaceGameMain'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
       <SpaceGameMain />
      </div>
  )
}

export default App
