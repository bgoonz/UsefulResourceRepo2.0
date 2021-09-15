import React, { useContext, useRef } from "react"
import styled from "@emotion/styled"
import { ModalContext } from "gatsby-plugin-modal"
import ModalA from "../../content/ModalA.mdx"
import ModalB from "../../content/ModalB.mdx"

const BoxA = styled(`div`)`
  width: 50%;
  background: pink;
  padding: 1.75rem 2rem;
  float: right;
  margin: 0.5rem 0 2rem 3rem;
  cursor: pointer;
  transition: all 0.5s;
  position: relative;
  display: block;

  :hover {
    transform: scale(1.01);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.75rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.4;
    margin: 0;
  }
`

const BoxB = styled(BoxA)`
  width: 100%;
  background: orange;
  float: none;
  margin: 0;
`

const boxes = {
  BoxA: { box: BoxA, bg: "pink", modal: ModalA },
  BoxB: { box: BoxB, bg: "orange", modal: ModalB },
}

export default ({ children, variant = "A" }) => {
  const { showModal } = useContext(ModalContext)
  const originRef = useRef(null)
  const Box = boxes[`Box${variant}`].box
  const bg = boxes[`Box${variant}`].bg
  const Modal = boxes[`Box${variant}`].modal

  return (
    <Box
      ref={originRef}
      style={{ background: bg }}
      onClick={() => {
        showModal({
          Component: Modal,
          props: {
            sourceRef: originRef.current,
            background: bg,
          },
        })
      }}
    >
      {children}
    </Box>
  )
}
