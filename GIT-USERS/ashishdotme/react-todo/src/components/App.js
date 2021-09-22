import React, { Component } from 'react';
import Header from '../containers/Header';
import Main from './Main';
import { Hero, Section, Container } from 'react-bulma-components/full';
import Navbar from 'react-bulma-components/lib/components/navbar';
import { Columns } from 'react-bulma-components';
class App extends Component {
  render() {
    return (
      <div>
        <Hero color="primary">
          <Hero.Head>
            <Navbar>
              <Navbar.Brand>
                <Navbar.Item renderAs="a" href="https://ashish.me">
                  <h1>ashish.me</h1>
                </Navbar.Item>
              </Navbar.Brand>
            </Navbar>
          </Hero.Head>
        </Hero>
        <Section>
          <Container>
            <Columns>
              <Columns.Column />
              <Columns.Column>
                <Header />
                <br />
                <Main />
              </Columns.Column>
              <Columns.Column />
            </Columns>
          </Container>
        </Section>
      </div>
    );
  }
}

export default App;
