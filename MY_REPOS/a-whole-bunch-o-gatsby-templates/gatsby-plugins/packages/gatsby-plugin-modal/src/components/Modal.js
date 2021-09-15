import React, { useState, createContext } from 'react';

import Overlay from './Overlay';
import Content from './Content';

export const ModalContext = createContext();
export const ModalConsumer = ModalContext.Consumer;

const DEFAULT_MODAL_STATE = {
  modalIsOpen: false,
  isClosing: false,
  Component: () => null,
  modalProps: {}
};

export const ModalProvider = ({ children, wrapper }) => {
  const [modalState, setModalState] = useState(DEFAULT_MODAL_STATE);
  const [isClosing, setIsClosing] = useState(false);

  const showModal = ({ Component, props }) => {
    setModalState({
      modalIsOpen: true,
      Component,
      modalProps: {
        ...props,
        isOpen: true
      }
    });
  };

  const closeModal = () => {
    setIsClosing(true);

    setTimeout(() => {
      setModalState({
        Component: null,
        modalIsOpen: false,
        modalProps: {}
      });
      setIsClosing(false);
    }, 300);
  };

  return (
    <ModalContext.Provider
      value={{
        ...modalState,
        showModal,
        closeModal
      }}
    >
      {children}
      <ModalContext.Consumer>
        {({ modalIsOpen, Component, closeModal, modalProps }) => {
          const { sourceRef, background } = modalProps;

          return (
            <Overlay
              isOpen={modalIsOpen}
              isClosing={isClosing}
              onDismiss={closeModal}
            >
              <Content
                isOpen={modalIsOpen}
                closeModal={closeModal}
                isClosing={isClosing}
                sourceRef={sourceRef}
                background={background}
              >
                {Component && (
                  <Component closeModal={closeModal} {...modalProps} />
                )}
              </Content>
            </Overlay>
          );
        }}
      </ModalContext.Consumer>
    </ModalContext.Provider>
  );
};
