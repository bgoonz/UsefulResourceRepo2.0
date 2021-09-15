import React from "react";
import ReactDOM from "react-dom";

function xhrRequest(scope) {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://fcctop100.herokuapp.com/api/fccusers/top/' + scope.state.column, true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      scope.setState({ [scope.state.column]: JSON.parse(this.response) });
    } else {
      console.error(this.status, this.statusText);
    }
  };

  request.onerror = function () {
    console.error(this.status, this.statusText);
  };

  request.send();
}

class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = {
      recent: [],
      alltime: [],
      column: "recent"
    }
  }
  getData() {
    if (this.state[this.state.column].length === 0) {
      xhrRequest(this);
    }
  }
  componentDidMount() {
    this.getData();
  }
  setColumn(column) {
    if (column !== this.state.column) {
      this.setState({ column: column }, this.getData);
    }
  }

  render() {
    let users = this.state[this.state.column];
    let footerText = "Made by ";
    return <div className='leaderboard'>
      <div className='header'>
        <h1>{this.props.title}</h1>
      </div>
      <CamperTable users={users} column={this.state.column} setColumn={this.setColumn.bind(this)} />
      <div className='made-by'>
        {footerText}
        <a href='https://github.com/Knochenmark'>Knochenmark</a>
      </div>
    </div>
  }
}

class CamperTable extends React.Component {
  render() {
    let camperList = this.props.users.map((user, index) => {
      return (
        <CamperRow rank={index + 1} user={user} key={user.username} />
      );
    });

    let selected = this.props.column;
    let recentClass = 'camper-table-recent sortable ' + (this.props.column === 'recent' ? 'active' : '');
    let alltimeClass = 'camper-table-alltime sortable ' + (this.props.column === 'alltime' ? 'active' : '');

    return <div className='camper-table'>
      <div className='camper-table-header'>
        <div className='camper-table-rank'>
          Rank
      </div>
        <div className='camper-table-camper'>
          Camper
      </div>
        <div className={recentClass} onClick={this.columnSortHandler.bind(this, "recent")}>
          Points of last 30 days
      </div>
        <div className={alltimeClass} onClick={this.columnSortHandler.bind(this, "alltime")}>
          All time points
      </div>
      </div>
      <div className='camper-table-users'>
        {camperList}
      </div>
    </div>;
  }
  columnSortHandler(column, evt) {
    if (!evt.target.classList.contains('active')) {
      this.props.setColumn(column);
    }
  }
}

class CamperRow extends React.Component {
  render() {
    let link = 'https://www.freecodecamp.org/' + this.props.user.username;
    return <div className='camper-row-user'>
      <div className='camper-row-rank'>
        {this.props.rank}
      </div>
      <div className='camper-row-camper'>
        <a href={link}>
          <img src={this.props.user.img} />
          {this.props.user.username}
        </a>
      </div>
      <div className='camper-row-recent'>
        {this.props.user.recent}
      </div>
      <div className='camper-row-alltime'>
        {this.props.user.alltime}
      </div>
    </div>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(< Leaderboard title="FCC Camper Leaderboard" />, mountNode);
