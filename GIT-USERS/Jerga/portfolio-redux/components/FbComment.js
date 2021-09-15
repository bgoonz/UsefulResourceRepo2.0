import React from "react";

class FbComment extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (window.FB) {
      FB.XFBML.parse();
    }

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  render() {
    const { url } = this.props;

    return (
      <React.Fragment>
        <div className="fb-comments" data-href={url} data-numposts="10"></div>
      </React.Fragment>
    );
  }
}

export default FbComment;
