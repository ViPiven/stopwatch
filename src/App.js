import './App.scss';
import {useEffect, useState} from "react";
import { interval } from 'rxjs';

const source = interval(1000);
let subscribe;
let working = false;

function App() {
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
    const timerStart = () => {
      if(!working) {
          subscribe = source.subscribe(val => {
              setTime(currentTime => currentTime + 1);
          })
          working = true;
      }
    }

    let wasClicked = false;
    let timeout;
    const handleClick = () => {
        if (wasClicked) {
            subscribe.unsubscribe();
            working = false;
        }
        wasClicked = true;
        timeout = setTimeout(() => {
            wasClicked = false;
        }, 300);

    }

  useEffect(() => {
       subscribe = source.subscribe(val => {
          setTime(currentTime => currentTime + 1);
      });

      if (!timerOn) {
          subscribe.unsubscribe();
          working = false;
      }
  }, [timerOn])

  return (
    <div className="App">
      <div className="time">
          <span className="time__value">{("0" + Math.floor(((time / 3600)) % 60)).slice(-2)}:</span>
          <span className="time__value">{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
          <span className="time__value">{("0" + Math.floor((time) % 60)).slice(-2)}</span>
      </div>
        <div className="buttons">
            <button onClick={timerStart} className="buttons__start">Start</button>
            <button onClick={() => {subscribe.unsubscribe(); working = false}} className="buttons__stop">Stop</button>
            <button onClick={handleClick} className="buttons__wait">Wait</button>
            <button onClick={() => setTime(0)} className="buttons__reset">Reset</button>
        </div>
    </div>
  );
}

export default App;
