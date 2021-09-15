import React, { useState, useEffect } from 'react';
import { DialogContent } from '@reach/dialog';

import CloseButton from './CloseButton';

export default ({
  children,
  isOpen,
  closeModal,
  isClosing,
  sourceRef,
  background,
  className
}) => {
  let translateX = 0;
  let translateY = 0;
  let scaleX = 0;
  let scaleY = 0;

  if (typeof window !== `undefined`) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const originBounding = sourceRef.getBoundingClientRect();
    const originWidth = originBounding.width;
    const originHeight = originBounding.height;

    const originX = originBounding.x;
    const originY = originBounding.y;
    scaleX = originWidth / windowWidth;
    scaleY = originHeight / windowHeight;

    translateX = `${originX}px`;
    translateY = `${originY}px`;
  }

  const [content, setContent] = useState({
    translateX,
    translateY,
    scaleX,
    scaleY,
    transition: 250
  });

  const [innerContent, setInnerContent] = useState({
    opacity: 0,
    transition: 50
  });

  useEffect(() => {
    if (isOpen && !isClosing) {
      setTimeout(() => {
        setContent({
          translateX: 0,
          translateY: 0,
          scaleX: 1,
          scaleY: 1,
          transition: 500
        });
      }, 0);

      setTimeout(() => {
        setInnerContent({
          opacity: 1,
          transition: 500
        });
      }, 200);
    }

    if (isClosing) {
      setInnerContent({
        opacity: 0,
        transition: 50
      });

      setContent({
        translateX,
        translateY,
        scaleX,
        scaleY,
        transition: 250
      });
    }
  }, [isOpen, isClosing]);

  return (
    <DialogContent
      style={{
        background: background ? background : '#666',
        height: '100vh',
        left: 0,
        margin: 0,
        outline: 'none',
        padding: 0,
        position: 'absolute',
        top: 0,
        transform: `translate3D(${content.translateX}, ${
          content.translateY
        }, 0) scale(${content.scaleX}, ${content.scaleY})`,
        transition: `transform ${content.transition}ms`,
        transformOrigin: 'top left',
        width: '100%'
      }}
      gatsby-modal-content="true"
      className={className}
    >
      <div
        style={{
          height: '100%',
          opacity: innerContent.opacity,
          overflowY: `auto`,
          position: 'relative',
          transition: `opacity ${innerContent.transition}ms`,
          width: '100%'
        }}
        gatsby-modal-inner-content="true"
      >
        <CloseButton onClick={closeModal} />
        {children}
      </div>
    </DialogContent>
  );
};
