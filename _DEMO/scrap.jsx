const Clock = (props) => {
  return (
    <div>
      <h1>Clock</h1>
      <div className="clock">
        <p>
          <span>Time:</span>
          <span>
            {props.hours}:{props.minutes}:{props.seconds}
          </span>
        </p>
      </div>
    </div>
  );
};
