import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    function tick() {
      setTime(new Date());
    }
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  
  return (
    <div>
      <h1>Clock</h1>
      <div className='clock'>
        <p>
          <span>
            Time:
          </span>
          <span>
            {hours}:{minutes}:{seconds} PDT
          </span>
        </p>
        <p>Date: {time.toDateString()}</p>
      </div>
    </div>
  );
}

export default Clock;