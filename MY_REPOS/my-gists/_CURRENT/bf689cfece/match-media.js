import Helper from '@ember/component/helper';

export default class MatchMedia extends Helper {
  _mediaQueryList = null;
  _mediaQueryListener = null;

  compute([mediaQueryString]) {
    return this._attachMatchMedia(mediaQueryString);
  }

  willDestroy() {
    this._detachMatchMedia();
  }

  _attachMatchMedia(mediaQueryString) {
    this._detachMatchMedia();

    this._mediaQueryListener = (event) => {
      this.recompute(event.matches);
    };

    this._mediaQueryList = window.matchMedia(mediaQueryString);

    this._mediaQueryList.addListener(this._mediaQueryListener);

    return this._mediaQueryList.matches;
  }

  _detachMatchMedia() {
    if (this._mediaQueryListener) {
      this._mediaQueryList.removeListener(this._mediaQueryListener);
      this._mediaQueryList = null;
      this._mediaQueryListener = null;
    }
  }
}
