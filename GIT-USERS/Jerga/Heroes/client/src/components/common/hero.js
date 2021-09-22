import React from "react";
import Scroll from "react-scroll";

var scroll = Scroll.animateScroll;

class Hero extends React.Component {
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollToBottom() {
    scroll.scrollToBottom();
  }
  scrollTo() {
    scroll.scrollTo(400);
  }

  render() {
    return (
      <header className="hero__main__base">
        <div className="hero__main__base__lead-text">
          <h1>
            {" "}
            Super Heroes Awesome Page. <br /> Create Your Super Hero Aliances
            Now!
          </h1>
          <a onClick={this.scrollToBottom} className="btn btn-full" href="#">
            View Heroes
          </a>
          <a onClick={this.scrollTo} className="btn btn-ghost" href="#">
            {" "}
            Create Hero{" "}
          </a>
        </div>
      </header>
    );
  }
}

export default Hero;
