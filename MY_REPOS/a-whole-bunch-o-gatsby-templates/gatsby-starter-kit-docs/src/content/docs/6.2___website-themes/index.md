---
title: React Website Themes library
shortTitle: Website Themes
categories: ['guides']
---

All **Kit**'s starters, except **Minimal** and **Equipped**, no-style ones, use styles and React components delivered by the outer libraries [@react-website-themes](https://www.npmjs.com/search?q=%40react-website-themes).

**Themed**, **Website** and **Blog** use [@react-website-themes/default](https://www.npmjs.com/package/@react-website-themes/default), **Classy Docs** uses [@react-website-themes/classy-docs](https://www.npmjs.com/package/@react-website-themes/classy-docs).

## Usage

Take a look at `src/pages/index.js` of the [Blog](./blog-starter) starter.

```javascript
/* ... */

import '@react-website-themes/default/styles/variables';
import '@react-website-themes/default/styles/global';

import Branding from '@react-website-themes/default/components/Branding';
import Footer from '@react-website-themes/default/components/Footer';
import Header from '@react-website-themes/default/components/Header';
import Hero from '@react-website-themes/default/components/Hero';
import Layout from '@react-website-themes/default/components/Layout';
import Menu from '@react-website-themes/default/components/Menu';
import Seo from '@react-website-themes/default/components/Seo';

/* ... */

const IndexPage = props => {
  /* ... */

  return (
    <Layout>
      <Header>
        <Branding title={headerTitle} subTitle={headerSubTitle} />
        <Menu items={menuItems} />
      </Header>
      <Hero html={heroHTML} />
      <Footer links={footerLinksHTML} copyright={copyrightHTML} />
    </Layout>
  );
};

/* ... */
```

All React components are imported not from the local folders but from `node_modules/@react-website-themes/default/`.

Besides the **component** imports there are also two **style** imports.

```javascript
import '@react-website-themes/default/styles/variables';
import '@react-website-themes/default/styles/global';
```

Both of them are necessary, every time you import any of the components you need to import them too. Firstly, the **style** imports were located inside the `Layout` component, so there were no need to import them manually, but I decided to change that, for customization flexibility.

Under development process you can import components like below.

```javascript
import {
  Branding,
  Footer,
  Header,
  Hero,
  Layout,
  Menu,
  Seo,
} from '@react-website-themes/default';
```

But do not do that in production code. This way you import all components of **default** theme, not only the listed ones.

## Styles

All **themes** at `@react-website-themes` use the great **css-in-js** library [emotion](https://github.com/emotion-js/emotion) to manage CSS styles.

Every component has it's own style contained in an outer `*.js` file. Take a look at the code of the **Layout** component's file.

```javascript
import PropTypes from 'prop-types';
import React from 'react';
import { cx } from 'emotion';

import style from '../styles/layout';

const Layout = props => {
  const { children, themeStyle = style, customStyle = '' } = props;

  return (
    <div className={cx(themeStyle, customStyle)}>
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  themeStyle: PropTypes.string,
  customStyle: PropTypes.string,
};

export default Layout;
```

Pay attention to the three fragments.

```javascript
/* ... */

import style from '../styles/layout';

/* ... */

const { children, themeStyle = style, customStyle = '' } = props;

/* ... */

Layout.propTypes = {
  /* ... */
  themeStyle: PropTypes.string,
  /* ... */
};
```

Every component imports a corresponding style file and assign the returned value to the `themeStyle` prop, if the prop's value is `undefined`. Notice also that everything the style imports return are `string` values, names of generated CSS classes.

How does it happen? It's the `emotion`'s `css` method job. Below is the code of the `styles/layout.js` file.

```javascript
import { css } from 'emotion';

const layout = css`
  padding: 15px 25px;
`;

export default layout;
```

Now, you are ready to [customize the theme to your needs](/custom-style).
