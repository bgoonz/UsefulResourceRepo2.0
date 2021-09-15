import React from 'react';
import { linkTo } from '@storybook/addon-links';

const Wrapper = ({ title, children, link, color = '#eeeeee' }) => (
  <div style={{ margin: 10, background: color }}>
    {title && (
      <div style={{ background: '#aaaaaa', textAlign: 'center', color: 'white', padding: '10px' }}>
        {title}
        {link && (
          <button style={{ marginLeft: 10 }} onClick={linkTo(link[0], link[1])}>
            =&gt;
          </button>
        )}
      </div>
    )}
    <div style={{ background: color, padding: 15 }}>
      <div style={{ border: '1px dashed lime' }}>{children}</div>
    </div>
  </div>
);

export default Wrapper;
