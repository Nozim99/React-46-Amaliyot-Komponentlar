import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function setDefaultValues(){
  const userCount = localStorage.getItem("count")
  return userCount ? +userCount : 0;
}

function App() {
  const [count, setCount] = useState(setDefaultValues())
  const [isCounting, setIsCounting] = useState(false)
  const [style, setStyle] = useState('btn btn-primary')
  // setInterval quyidagi intervalga tenglashtiriladi.
  // stopni bosganda clearIntervalni ishlatish uchun
  const timerIdRef = useRef(null) // initial state

  const [text, setText] = useState('Start')
  const [toggle, setToggle] = useState(false)


  function start() {
    setIsCounting(!isCounting)    
  }

  useEffect(() => {
    if (isCounting) {
      timerIdRef.current = setInterval(() => {
        setCount((prev) => prev + 1)
      }, 1000)
      
      setText('Stop')
      setStyle('btn btn-danger')
    } else {
      setText('Start')
      setStyle('btn btn-primary')
      clearInterval(timerIdRef.current)
    }

    // useEffect funksiyasidagi return willUnMountni bildiradi
    return ()=>{
      // timerIdRef bo'lsa && dan keyingi amalni bajaradi
      timerIdRef.current && clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, [isCounting])

  useEffect(()=>{
    localStorage.setItem('count', count)
  }, [count])


  function reset() {
    setIsCounting(false)
    setCount(0)
  }
  // const interval = setInterval(() => {
  //   setCount((prev) => prev + 1)
  // }, 1000)

  // function infDecr() {
  //   if(!toggle){
  //     clearInterval(interval)
  //   }
  // }

  return (
    <div>
      <h1 className='h1s'>React App</h1>
      <div className="box">
        <h1>React timer: {count}</h1>
        <button onClick={start} className={style} >{text}</button>
        <button onClick={reset} className='btn btn-primary'>Reset</button>
      </div>
    </div>
  )
}

export default App
