// @flow
import React from 'react';
import styled from 'styled-components';
import LanguageChooser from '../languageChooser';
import Button from '../button/Button';
import { media } from '@theme';
import _throttle from 'lodash/throttle';
import Hamburger from '../hamburger/Hamburger';

const HeaderContainer = styled.header`
  height: ${({ isScrolled }) => (isScrolled ? '3.5rem' : '4.5rem')};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 1rem;
  background-color: ${({ theme, isScrolled }) =>
    isScrolled ? theme.components.header.scrolledBackground : theme.components.header.background};
  width: 100%;
  overflow: hidden;
  z-index: 1;
  transition-duration: 0.5s;
  transition-property: transform, height, background-color;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
`;

const DesktopNavigation = styled.nav`
 ${media.tablet`display:none;`};
 margin: 0 2.5rem 0 auto;
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

  & > :not(:last-child){
      margin-right: 1.5rem;
    }
`;

const MobileNavigation = styled(Hamburger)`
  display: none;
  ${media.tablet`display:block;`};
  margin-right: 2.5rem;
  z-index: 1;
`;

const InnerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin: 0 auto;
`;

type HeaderProps = {
  children: any,
};

type HeaderState = {
  isScrolled: boolean,
};

class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  static LanguageChooser = LanguageChooser;
  static Menu = () => <div>2</div>;
  static Logo = () => <div>2</div>;

  rootNode = React.createRef();
  scrollY: number;
  height: number;
  scrollListener: any;

  state = {
    isScrolled: false,
  };

  componentDidMount() {
    this.initializeScroll();
  }

  componentWillUnmount() {
    this.endScroll();
  }

  initializeScroll = () => {
    if (!this.scrollListener) {
      this.scrollListener = _throttle(this.handleScroll, 50);
      window.addEventListener('scroll', this.scrollListener);
      const { height } = this.rootNode.current.getBoundingClientRect();
      this.scrollY = window.scrollY;
      this.height = height + 200; //y offset
    }
  };
  endScroll() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  handleScroll = () => {
    this.scrollY = window.scrollY;
    const isScrolled = this.scrollY !== undefined && this.scrollY > 0;
    this.setState({ isScrolled });
  };

  renderDesktopNavigation = () => (
    <DesktopNavigation>
      <ul>
        <li>
          <Button>Sign In</Button>
        </li>
        <li>
          <Button primary>Register</Button>
        </li>
      </ul>
    </DesktopNavigation>
  );

  renderMobileNavigation = () => (
    <MobileNavigation
      href="#menu"
      onClick={() => {
        alert('click');
      }}
    >
      <span>Menu</span>
    </MobileNavigation>
  );

  render() {
    const { isScrolled } = this.state;
    // const { children } = this.props;
    // return <HeaderContainer>{children}</HeaderContainer>;

    return (
      <HeaderContainer isScrolled={isScrolled} innerRef={this.rootNode}>
        <InnerWrapper>
          {this.renderDesktopNavigation()}
          {this.renderMobileNavigation()}
        </InnerWrapper>
      </HeaderContainer>
    );

    // const children = React.Children.map(this.props.children, child => {
    //   return React.cloneElement(child, {stage, handleClick: this.handleClick})
    // })
  }
}

export default HeaderComponent;
