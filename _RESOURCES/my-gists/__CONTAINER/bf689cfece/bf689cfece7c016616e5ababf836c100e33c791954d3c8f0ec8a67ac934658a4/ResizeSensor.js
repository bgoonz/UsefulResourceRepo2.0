// @flow
import * as React from 'react';

type Dimensions = {width: number, height: number, ref: ?HTMLElement};
type Props = {
  children?: React.Node,
  className?: string,
  onResize: (dimensions: Dimensions) => any,
};

export default class ResizeSensor extends React.Component<Props, {}> {
  lastDimensions: Dimensions = {
    width: 0,
    height: 0,
    ref: null,
  };

  contract: ?HTMLElement;
  expand: ?HTMLElement;
  wrapper: ?HTMLElement;
  rafTimeout: number;

  componentDidMount() {
    this.resetTriggers();
  }

  resetTriggers() {
    const {contract, expand} = this;
    if (!contract || !expand) return;

    contract.scrollLeft      = contract.scrollWidth;
    contract.scrollTop       = contract.scrollHeight;
    // $FlowIgnore we know it has a firstChild
    const firstChildStyle    = expand.firstChild.style;
    firstChildStyle.width    = expand.offsetWidth + 1 + 'px';
    firstChildStyle.height   = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft        = expand.scrollWidth;
    expand.scrollTop         = expand.scrollHeight;
  }

  onScroll = () => {
    if (this.rafTimeout) window.cancelAnimationFrame(this.rafTimeout);
    this.rafTimeout = window.requestAnimationFrame(() => {
      if (!this.wrapper) return; // Unmounted
      const dimensions = this.getDimensions();

      if (dimensions && this.haveDimensionsChanged(dimensions)) {
        this.lastDimensions = dimensions;
        this.props.onResize(dimensions);
        this.resetTriggers();
      }
    });
  };

  getDimensions() {
    const el = this.wrapper;
    if (el && el.lastChild) {
      const ref: HTMLElement = ((el.lastChild: any): HTMLElement);
      const {offsetWidth: width, offsetHeight: height} = ref;
      return {width, height, ref};
    }
    return this.lastDimensions;
  }

  haveDimensionsChanged(dimensions: Dimensions) {
    return dimensions.width !== this.lastDimensions.width || dimensions.height !== this.lastDimensions.height;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {onResize, ...rest} = this.props;
    const className = `${this.props.className || ''} resizesensor-wrapper`;
    return (
      <div {...rest} ref={(el) => (this.wrapper = el)} className={className}>
        {this.props.children}
        <div className="resizesensor-trigger">
          <div ref={(el) => (this.expand = el)} onScroll={this.onScroll}>
            <div />
          </div>
          <div className="resizeSensor-contract" ref={(el) => (this.contract = el)} onScroll={this.onScroll}>
            <div style={{width: '200%', height: '200%'}} />
          </div>
        </div>
      </div>
    );
  }
}
