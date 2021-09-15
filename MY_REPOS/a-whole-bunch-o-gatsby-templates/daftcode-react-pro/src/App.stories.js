//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import LANGUAGES from './constants/language';
import Header from './components/header/Header';
import Hero from './view/hero/Hero';
import Contact from './view/contact/Contact';
import Footer from './components/footer/Footer';

const languages = [LANGUAGES.EN, LANGUAGES.PL];

storiesOf('App|Index', module).add('basic', () => (
  <div>
    <Header stage={1}>
      <Header.Logo />
      <Header.Menu />
      <Header.LanguageChooser languages={languages} />
    </Header>
    <Hero />
    <Contact />
    <Footer />
  </div>
));
