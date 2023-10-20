import { useState } from 'react'
import './App.css'
import Books from './components/Books'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Gyaan</h1>
      <div className="nav-bar">
        <div className="nav-bar-content">Home</div>
        <div className="nav-bar-content">About Us</div>
        <div className="nav-bar-content">Contact</div>
      </div>
      <Books />
    </>
  )
}

export default App
