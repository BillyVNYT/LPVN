import { useState } from 'react'
import './App.css'

function App() {
  const [p1, setP1] = useState(10)
  const [p2, setP2] = useState(10)
  const [p3, setP3] = useState(10)
  const [p4, setP4] = useState(10)
  return (
    <>
      <input type="number" value={p1}
        onChange={(e) => setP1(Number(e.target.value))}
      />
      <input type="number" value={p2}
        onChange={(e) => setP2(Number(e.target.value))}
      />
      <input type="number" value={p3}
        onChange={(e) => setP3(Number(e.target.value))}/>
      <input type="number" value={p4}
        onChange={(e) => setP4(Number(e.target.value))}
      />
      <div id="container">
        <div id="container1">
            <div class="circle" style={
              {
                width: `${p1*10}px`,
                height: `${p1*10}px`,
                transform: `scale(${p1 / 10})`
              }
            }></div>
            <div class="circle" style={
              {
                width: `${p2*10}px`,
                height: `${p2*10}px`,
                transform: `scale(${p2 / 10})`
              }
            }></div>
        </div>
        <div id="container2">
            <div class="circle" style={
              {
                width: `${p3*10}px`,
                height: `${p3*10}px`,
                transform: `scale(${p3 / 10})`
              }
            }></div>
            <div class="circle" style={
              {
                width: `${p4*10}px`,
                height: `${p4*10}px`,
                transform: `scale(${p1 / 10})`
              }
            }></div>
        </div>
        <div class="string"></div>
      </div>
    </>
  )
}

export default App
