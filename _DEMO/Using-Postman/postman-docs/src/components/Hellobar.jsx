/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

const bardata = {
  title: 'What do you see for the future of APIs? Take the 15-minute ',
  cta: {
    text: 'State of the API survey',
    url: 'https://www.surveymonkey.com/r/2020-API-Survey',
  },
};

class HelloBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBar: true,
    };
    this.closeBar = () => {
      localStorage.setItem('hellobar', bardata.title);
      localStorage.setItem('hellobarcount', '0');
      this.setState({ showBar: false });
    };
  }

  componentDidMount() {
    const barValue = localStorage.getItem('hellobar');
    let barCount = JSON.parse(localStorage.getItem('hellobarcount')) || 0;

    if (barValue !== bardata.title) {
      barCount += 1;
      if (barCount > 5) {
        this.setState({ showBar: false });
        localStorage.setItem('hellobar', bardata.title);
        localStorage.setItem('hellobarcount', '0');
      } else {
        localStorage.setItem('hellobarcount', JSON.stringify(barCount));
        this.setState({ showBar: true });
      }
    } else {
      this.setState({ showBar: false });
    }
  }


  render() {
    // const { showBar } = this.state;

    // if (showBar === true) {
    //   return (
    //     <div className="hellobar__container">
    //       <div className="align-middle hellobar__text">
    //         {bardata.title}
    //         <a href={bardata.cta.url} className="hellobar__postman-link" target="_blank" rel="noopener noreferrer">{bardata.cta.text}</a>
    //       </div>
    //       <div aria-label="HelloBar" type="button" className="hellobar__close-button" onClick={this.closeBar}>X</div>
    //     </div>
    //   );
    // }
    return (<></>);
  }
}

export default HelloBar;
