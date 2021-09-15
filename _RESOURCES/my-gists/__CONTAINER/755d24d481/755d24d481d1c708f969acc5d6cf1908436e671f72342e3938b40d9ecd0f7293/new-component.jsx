let NewComponent = React.createClass ({
  render: function () {
    return (
      <div>
        {/* Hello world */}
        <div className="awesome" style={{border: '1px solid red'}}>
          <label htmlFor="name">Enter your name: </label>
          <input type="text" id="name" />
        </div>
        <p>Enter your HTML here</p>
      </div>
    );
  },
});
