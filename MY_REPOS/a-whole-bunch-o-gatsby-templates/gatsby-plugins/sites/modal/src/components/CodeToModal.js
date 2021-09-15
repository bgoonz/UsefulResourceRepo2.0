import React, { useContext, useRef } from "react"
import styled from "@emotion/styled"
import { ModalContext } from "gatsby-plugin-modal"
import { FiMaximize2 } from "react-icons/fi"

const Wrapper = styled(`div`)`
  position: relative;
`

const ModalWrapper = styled(`div`)`
  padding: 1rem 2rem;
`

const Button = styled(`button`)`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0.2rem;
  border: 0;
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  opacity: 0.5;
  transition: opacity 0.5s;
  cursor: pointer;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  :hover {
    opacity: 1;

    svg {
      color: #ffffff;
    }
  }
`

export default ({ children }) => {
  const { showModal } = useContext(ModalContext)
  const originRef = useRef(null)

  return (
    <Wrapper ref={originRef}>
      <Button
        onClick={() => {
          showModal({
            Component: () => <ModalWrapper>{children}</ModalWrapper>,
            props: {
              sourceRef: originRef.current,
              background: "#2d2d2d",
            },
          })
        }}
      >
        <FiMaximize2 />
      </Button>
      {children}
    </Wrapper>
  )
}
