// @flow
import * as React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import styled from 'styled-components';
import HeroBanner from './HeroBanner';
import { media } from '@theme/index';
import Button from '../../components/button/Button';
import Heading from '../../components/heading/Heading';

const Intro = styled.div`
  margin: auto 0;
  cursor: pointer;
  text-align: center;
  
  & > h1 {
    position: relative;
    font-size: 4.2rem;
    color: ${({ theme }) => theme.colors.text};
    display: inline-block;
    margin: 1.6rem auto 2.3rem;
    font-weight: 600;
    opacity: 1;
    transform: scale(1);
    transition: transform 0.5s ease, opacity 1s ease;
`;

const ButtonIntro = styled(Button)`
  width: auto;
  min-width: 15rem;
  ${media.phone`min-width: 358px;`};
  font-weight: 500;
`;

const ScrollDown = styled.div`
  width: 3.8rem;
  text-align: center;
  margin-bottom: 10rem;
  box-shadow: 0 0 2px 0 white;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 0 4px 0 white;
  }
`;

class Hero extends React.PureComponent<{}> {
  render() {
    return (
      <ParallaxProvider>
        <HeroBanner min={'-30%'} max={'30%'}>
          <Intro id="intro">
            <Heading as="h1">Welcome traveler</Heading>
            <div>
              <ButtonIntro primary>TRY FOR FREE</ButtonIntro>
            </div>
          </Intro>
        </HeroBanner>
      </ParallaxProvider>
    );
  }
}

export default Hero;
