import './App.scss';
import {useEffect, useState} from "react";
import { Observable } from "rxjs";

function App() {
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)

  let wasClicked = false;
  let timeout;
    const handleClick = () => {
        wasClicked = true;
        timeout = setTimeout(() => {
            wasClicked = false;
            setTimerOn(false);
        }, 300);
    }

    useEffect(() => {
        let interval = null;
        if(timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [timerOn])

  return (
    <div className="App">
      <div className="time">
          <span className="time__value">{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
          <span className="time__value">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span className="time__value">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
      <div className="buttons">
          <button onClick={() => setTimerOn(true)} className="buttons__start">Start</button>
          <button onClick={() => setTimerOn(false)} className="buttons__stop">Stop</button>
          <button onClick={handleClick} className="buttons__wait">Wait</button>
          <button onClick={() => setTime(0)} className="buttons__reset">Reset</button>
      </div>
    </div>
  );
}

export default App;
