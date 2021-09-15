import React, { useState, useEffect } from 'react';
import { DialogOverlay } from '@reach/dialog';
import PropTypes from 'prop-types';

const Overlay = ({ isOpen, onDismiss, isClosing, className, children }) => {
  const [overlay, setOverlay] = useState({
    alpha: 0,
    transition: 300
  });

  useEffect(() => {
    if (isOpen && !isClosing) {
      setTimeout(
        () =>
          setOverlay({
            alpha: 0.25,
            transition: 500
          }),
        0
      );
    }

    if (isOpen && isClosing) {
      setOverlay({
        alpha: 0,
        transition: 300
      });
    }
  }, [isOpen, isClosing]);

  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={onDismiss}
      style={{
        alignItems: 'center',
        background: `rgba(0, 0, 0, ${overlay.alpha})`,
        left: 0,
        height: '100vh',
        position: 'fixed',
        top: 0,
        transition: 'background 500ms',
        width: '100%',
        zIndex: 1000
      }}
      className={className}
      gatsby-modal-overlay="true"
    >
      {children}
    </DialogOverlay>
  );
};

Overlay.propTypes = {
  isOpen: PropTypes.bool,
  isClosing: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onDismiss: PropTypes.func
};

export default Overlay;
