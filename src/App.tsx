import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Service} from "./service/Service";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Service/>
    </div>
  )
}

export default App
