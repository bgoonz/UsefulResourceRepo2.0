import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import PictureCredits from "../PictureCredits/";
import SpotArea from "../SpotArea/";
import PictureModeToggle from "./PictureModeToggle";
import SvgEl from "../../shared/SvgEl/";
import LOGOS from "../../../constants/logos";
import pictureLoading from "../../../images/pictureloading.gif";

const styles = () => ({
  root: {
    ".portrait &": {
      position: "relative",
      width: "100%",
      height: props => props.windowWidth
    },
    ".landscape &": {
      position: "absolute",
      left: 0,
      top: 0,
      width: props => props.windowHeight,
      bottom: 0,
      overflow: "hidden"
    }
  },
  picture: {
    maxWidth: "100%",
    maxHeight: "100%",
    ".portrait &": {
      width: "100%"
    },
    ".landscape &": {
      height: "100%"
    }
  },
  nextPicture: {
    display: "none"
  },
  logo: {
    width: "50px",
    position: "absolute",
    top: "15px",
    left: "15px",
    ".picture-mode &": {
      display: "none"
    }
  }
});

class PictureBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsOpened: false,
      pictureMode: false,
      pictureSrc: null,
      nextPictureSrc: ""
    };

    this.toggleCreditsDetails = this.toggleCreditsDetails.bind(this);
    this.togglePictureMode = this.togglePictureMode.bind(this);
  }

  componentDidMount() {
    this.setState({
      pictureSrc: this.getPictureSrc(null)
    });

    this.nextPicture = new Image();
    this.nextPicture.src = this.getPictureSrc(this.props.nextCombo);
  }

  componentDidUpdate(prevProps) {
    if (this.props.combo !== prevProps.combo) {
      if (this.props.combo.picture.id !== prevProps.combo.picture.id) {
        // checks if the picture file preloading is completed
        const nextPictureLoaded = this.nextPicture.complete;

        // depending on the status of image preloading (see bellow)
        // sets 'loading picture' as combo picture to indicate that
        // the comobo picture is loading
        this.setState((prevState, props) => ({
          pictureSrc: this.getPictureSrc(nextPictureLoaded ? props.combo : null)
        }));

        // preloads image file for the next combo
        if (this.props.combo.picture.id !== this.props.nextCombo.picture.id) {
          this.nextPicture = new Image();
          this.nextPicture.src = this.getPictureSrc(this.props.nextCombo);
        }
      }
    }

    // if 'loading picture' was set as a combo picture (see above)
    // now it's time to set back to the proper image src
    // timeout delay force React to render 'loading picture'
    if (this.state.pictureSrc.substr(0, 5) === "data:") {
      setTimeout(() => {
        this.setState(() => ({
          pictureSrc: this.getPictureSrc(this.props.combo)
        }));
      }, 50);
    }
  }

  getPictureSrc(combo, size) {
    const { windowWidth, windowHeight } = this.props;

    if (!combo) {
      return pictureLoading;
    }
    if (size) {
      return `https://d3nstmfkiycslv.cloudfront.net/${combo.picture.arangoKey}_${
        combo.picture.hash
      }_${size}.jpeg`;
    } else {
      return `https://d3nstmfkiycslv.cloudfront.net/${combo.picture.arangoKey}_${
        combo.picture.hash
      }_${this.getPictureSize(windowWidth, windowHeight)}.jpeg`;
    }
  }

  getPictureSize = (width, heigh) => {
    const minDimension = width > heigh ? heigh : width;

    if (minDimension <= 400) {
      return "400";
    } else if (minDimension <= 600) {
      return "600";
    } else if (minDimension <= 800) {
      return "800";
    } else {
      return "1000";
    }
  };

  preloadNextActiveComboImage(combo) {
    const img = new Image();
    img.src = this.getPictureSrc(combo);
  }

  toggleCreditsDetails() {
    this.setState(prevState => ({
      detailsOpened: !prevState.detailsOpened
    }));
  }

  togglePictureMode() {
    this.setState(prevState => ({
      pictureMode: !prevState.pictureMode
    }));
  }

  render() {
    const { classes, combo } = this.props;
    const pictureMode = this.state.pictureMode;

    return (
      <div className={`${classes.root} ${pictureMode ? "picture-mode" : "vocab-mode"}`}>
        {combo && (
          <React.Fragment>
            <img src={this.state.pictureSrc} className={classes.picture} alt="" />
            <SpotArea spot={combo.spot} />
            <PictureModeToggle onClick={this.togglePictureMode} pictureMode={pictureMode} />
            <div className={classes.logo}>
              <SvgEl svg={LOGOS.MAIN} />
            </div>
            <PictureCredits
              picture={combo.picture}
              detailsOpened={this.state.detailsOpened}
              onClick={this.toggleCreditsDetails}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

PictureBox.propTypes = {
  classes: PropTypes.object.isRequired,
  combo: PropTypes.object.isRequired,
  nextCombo: PropTypes.object.isRequired,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number
};

export default injectSheet(styles)(PictureBox);
