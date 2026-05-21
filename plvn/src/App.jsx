import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [p1, setP1] = useState(10)
  const [p2, setP2] = useState(10)
  const [p3, setP3] = useState(10)
  const [p4, setP4] = useState(10)

  const [win, setWin] = useState("");

  var sumTeam1 = p1+p2;
  var sumTeam2 = p3+p4;
  useEffect(() => {
    if(sumTeam1 < sumTeam2){
      setWin("team2better");
      console.log("team2");
    } else if(sumTeam1 > sumTeam2){
      setWin("team1better");
      console.log("team1");
    } else {
      setWin("");
      console.log("none");
    }
  }), [sumTeam1, sumTeam2];

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
      <div id='line'></div>
      <div id="container" className={win}>
        <div id="container1" style={{
          transform: `translateY(-${Math.max(p1, p2) * 2.25}px)`
        }}>
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
        <div id="container2" style={{
          transform: `translateY(-${Math.max(p1, p2) * 2.25}px)`
        }}>
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
