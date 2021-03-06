import React from 'react';
import cx from 'classnames';

const CSS_FRAMEWORK_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 50 50">
    <path d="M 0 0 L 0 13.4375 L 7.46875 7 L 12.15625 12.625 L 15.71875 10.875 L 22 16.53125 L 22 0 L 0 0 z M 16 4 C 17.104 4 18 4.896 18 6 C 18 7.104 17.104 8 16 8 C 14.896 8 14 7.104 14 6 C 14 4.896 14.896 4 16 4 z M 27 6 C 26.447 6 26 6.448 26 7 C 26 7.552 26.447 8 27 8 L 49 8 C 49.553 8 50 7.552 50 7 C 50 6.448 49.553 6 49 6 L 27 6 z M 7.25 9.84375 L 0 16.0625 L 0 22 L 22 22 L 22 19.21875 L 15.375 13.25 L 11.65625 15.125 L 7.25 9.84375 z M 27 13 C 26.447 13 26 13.448 26 14 C 26 14.552 26.447 15 27 15 L 45 15 C 45.553 15 46 14.552 46 14 C 46 13.448 45.553 13 45 13 L 27 13 z M 0 28 L 0 50 L 22 50 L 22 28 L 0 28 z M 12.4375 34.0625 C 12.776078 34.012156 13.12375 34.0705 13.4375 34.25 C 14.6925 34.969 14.1875 37.28125 14.1875 37.28125 C 14.1875 37.28125 14.203 37.2855 14.25 37.3125 C 14.625 37.5275 16.29775 38.5375 15.96875 39.8125 C 15.59775 41.2495 13.3125 41.46875 13.3125 41.46875 C 13.3125 41.46875 12.79425 43.8585 11.40625 43.9375 C 11.09825 43.9545 10.8245 43.86975 10.5625 43.71875 C 9.6445 43.19275 9.03125 41.9375 9.03125 41.9375 C 9.03125 41.9375 7.653 42.17325 6.75 41.65625 C 6.463 41.49325 6.22475 41.25725 6.09375 40.90625 C 5.55375 39.44925 7.28125 38.03125 7.28125 38.03125 C 7.28125 38.03125 6.17275 36.04425 7.34375 34.90625 C 8.24875 34.02525 9.6165 34.64075 10.1875 34.96875 C 10.3545 35.06475 10.46875 35.125 10.46875 35.125 C 10.46875 35.125 11.421766 34.213531 12.4375 34.0625 z M 27 35 C 26.447 35 26 35.447 26 36 C 26 36.553 26.447 37 27 37 L 49 37 C 49.553 37 50 36.553 50 36 C 50 35.447 49.553 35 49 35 L 27 35 z M 11.8125 36.59375 C 11.248234 36.740559 10.875 38.40625 10.875 38.40625 C 10.875 38.40625 9.97975 36.4105 9.34375 36.9375 C 8.70875 37.4645 10.6875 38.59375 10.6875 38.59375 C 10.6875 38.59375 8.5545 38.86475 8.8125 39.59375 C 9.0705 40.32475 10.8125 38.84375 10.8125 38.84375 C 10.8125 38.84375 10.33825 41.09875 11.15625 40.96875 C 11.97425 40.83775 11.0625 38.8125 11.0625 38.8125 C 11.0625 38.8125 13.0665 39.946 13.1875 39.125 C 13.3095 38.307 11.125 38.5625 11.125 38.5625 C 11.125 38.5625 12.7705 37.031 12.0625 36.625 C 11.974 36.57425 11.893109 36.572777 11.8125 36.59375 z M 27 42 C 26.447 42 26 42.447 26 43 C 26 43.553 26.447 44 27 44 L 45 44 C 45.553 44 46 43.553 46 43 C 46 42.447 45.553 42 45 42 L 27 42 z"></path>
  </svg>
);

class CssFramework extends React.Component {
  render() {
    const props = this.props;
    const NO_CSS_FRAMEWORK = props.cssFramework === 'none';
    const BOOTSTRAP = props.cssFramework === 'bootstrap';
    const FOUNDATION = props.cssFramework === 'foundation';
    const BOURBON_NEAT = props.cssFramework === 'bourbonNeat';

    let description;

    switch (props.cssFramework) {
      case 'bootstrap':
        description = (
          <div>
            <strong><a href="http://getbootstrap.com/" target="_blank">Bootstrap</a></strong> ??? The most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.
          </div>
        );
        break;
      case 'foundation':
        description = (
          <div>
            <strong><a href="http://foundation.zurb.com/" target="_blank">Foundation</a></strong> ??? The most advanced responsive front-end framework in the world.
          </div>
        );
        break;
      case 'bourbonNeat':
        description = (
          <div>
            <strong><a href="http://neat.bourbon.io/" target="_blank">Bourbon Neat</a></strong> ??? A lightweight semantic grid framework for Sass and Bourbon.
          </div>
        );
        break;
      default:
        description = <div className="placeholder"> </div>;
    }

    const recommended = props.beginner ? (
      <span className="hint--top hint--rounded" data-hint="Recommended">
        <img src="/img/svg/recommended.svg" alt="Recommended" />
      </span>
    ) : null;

    let note = props.cssFramework === 'none' ? (
      <div>
        <strong>Note: </strong>
        <span>You still get <a href="https://necolas.github.io/normalize.css/">normalize.css</a> and <a href="http://flexboxgrid.com/">Flexbox Grid</a>, but all pages will be unstyled.</span>
      </div>
    ) : null;

    const validationError = props.cssFrameworkValidationError ? (
      <div className="text-danger"><i className="fa fa-warning"></i> {props.cssFrameworkValidationError}</div>
    ) : null;

    if (props.cssFrameworkValidationError) {
      if (props.disableAutoScroll) {
        $(this.refs.cssFramework).velocity('scroll', { duration: 0 });
      } else {
        $(this.refs.cssFramework).velocity('scroll');
      }
    }

    return (
      <div ref="cssFramework" className={cx('zoomInBackwards panel', props.cssFramework)}>
        <div className="panel-heading">
          <h6>{CSS_FRAMEWORK_SVG}{!props.cssFramework || props.cssFramework === 'none' ? 'CSS Framework' : props.cssFramework}</h6>
        </div>
        <div className="panel-body">
          {description}
          <div className="radio-group">
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/none.png" alt="None"/>
              <input type="radio" name="cssFrameworkRadios" value="none" onChange={props.handleChange} checked={NO_CSS_FRAMEWORK}/>
              <span>None</span>
            </label>
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/bootstrap-logo.svg" alt="Bootstrap"/>
              <input type="radio" name="cssFrameworkRadios" value="bootstrap" onChange={props.handleChange} checked={BOOTSTRAP}/>
              <span>Bootstrap</span>
              {recommended}
            </label>
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/foundation-logo.png" alt="Foundation"/>
              <input type="radio" name="cssFrameworkRadios" value="foundation" onChange={props.handleChange} checked={FOUNDATION}/>
              <span>Foundation</span>
            </label>
          </div>
          {note}
          {validationError}
        </div>
      </div>
    );
  }
};

export default CssFramework;
