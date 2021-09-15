import React from 'react';

export default title =>
  function(storyFn) {
    return (
      <div>
        <div style={{ margin: 10, background: 'gray' }}>
          <div style={{ background: 'gray', textAlign: 'center', color: 'white', padding: '10px' }}>{title}</div>
          <div style={{ background: '#eeeeee', padding: 15 }}>
            <div style={{ border: '1px dashed lime' }}>{storyFn()}</div>
          </div>
        </div>
      </div>
    );
  };
