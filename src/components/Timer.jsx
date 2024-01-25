import React, { useState, useEffect } from "react";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          alert("Время истекло");
          setIsRunning(false);
        } else {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else {
            if (minutes > 0) {
              setMinutes(minutes - 1);
              setSeconds(59);
            } else {
              if (hours > 0) {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
              }
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, hours, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleHoursChange = (value) => {
    setHours(Math.min(value, 9999));
  };

  const handleMinutesChange = (value) => {
    setMinutes(Math.min(value, 60));
  };

  const handleSecondsChange = (value) => {
    setSeconds(Math.min(value, 60));
  };

  return (
    <div className="timer__wrapper">
      <div className="timer">
        Таймер: {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div>
        <div className="timer__param">
          <label>
            Часы:{" "}
            <input
              type="number"
              value={hours}
              onChange={(e) => handleHoursChange(e.target.value)}
              disabled={isRunning}
            />
          </label>
          <label>
            Минуты:{" "}
            <input
              type="number"
              value={minutes}
              onChange={(e) => handleMinutesChange(e.target.value)}
              disabled={isRunning}
            />
          </label>
          <label>
            Секунды:{" "}
            <input
              type="number"
              value={seconds}
              onChange={(e) => handleSecondsChange(e.target.value)}
              disabled={isRunning}
            />
          </label>
        </div>
      </div>
      <div>
        {isRunning ? (
          <button className="MyBtn" onClick={stopTimer}>
            Отменить
          </button>
        ) : (
          <button className="MyBtn" onClick={startTimer}>
            Запустить
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
