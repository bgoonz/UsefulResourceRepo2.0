import React, { useContext, useRef } from "react"

import styled from "@emotion/styled"
import { ModalContext } from "gatsby-plugin-modal"
import randomcolor from "randomcolor"

let cards = [
  "There’s Big Money In MODAL",
  "5 Problems Everyone Has With MODAL – How To Solved Them",
  "Avoid The Top 10 MODAL Mistakes",
  "Why MODAL Is The Only Skill You Really Need",
  "The Secrets To MODAL",
  "11 Methods Of MODAL Domination",
  "Learn To (Do) MODAL Like A Professional",
  "5 Incredibly Useful MODAL Tips For Small Businesses",
  "5 Brilliant Ways To Use MODAL",
  "OMG! The Best MODAL Ever!",
  "The MODAL Mystery Revealed",
  "Even more about...",
]

cards = cards.map((card, idx) => ({
  title: card,
  background:
    idx === cards.length - 1
      ? "#999"
      : randomcolor({ luminosity: "light", hue: "purple" }),
}))

const Title = styled(`h3`)`
  font-size: 1.5rem;
  margin: 0;
  padding-bottom: 3.5rem;
  letter-spacing: -0.02em;

  @media only screen and (min-width: 800px) {
    font-size: 1.8rem;
    padding-bottom: 2.5rem;
  }
`

const Card = styled(`div`)`
  background: ${props => (props.background ? props.background : "#666")};
  padding: 1.5rem 2rem;
  position: relative;
  flex: 1 1 100%;
  min-height: 33%;

  @media only screen and (min-width: 800px) {
    flex-basis: 30%;
  }

  button {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    background: transparent;
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    margin: 0;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0.2rem;
    cursor: pointer;
    transition: background 0.5s;
    background: rgba(255, 255, 255, 0.25);

    :hover {
      background: rgba(255, 255, 255, 0.5);
    }

    @media only screen and (min-width: 800px) {
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
    }
  }

  &:last-of-type {
    background: #444;
    color: white;
    cursor: pointer;
    transition: background 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;

    ${Title} {
      padding: 0;
    }

    :hover {
      background: #333;
    }
  }
`

const Wall = styled(`div`)`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
`

const ContentRoot = styled(`div`)`
  width: 100%;
  height: 100%;
  padding: 2rem;
  overflow-y: auto;

  h1 {
    font-size: 2rem;
    padding-right: 6rem;
    margin: 0 0 2rem 0;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
  }

  @media only screen and (min-width: 800px) {
    padding: 3rem;
    padding-right: 20%;

    h1 {
      font-size: 3rem;
      margin: 0 0 2rem 0;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }
`

export const Content = ({ title, background }) => {
  return (
    <ContentRoot bg={background}>
      <h1>{title}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        luctus interdum libero vehicula eleifend. Aliquam quis justo quam. Donec
        hendrerit est dolor, eget interdum leo sodales nec. Pellentesque
        volutpat at quam vel condimentum. Donec quis iaculis enim. Sed viverra
        egestas tortor ac lobortis. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Pellentesque habitant morbi tristique senectus et netus
        et malesuada fames ac turpis egestas. Praesent id mauris nec ante rutrum
        efficitur. In purus quam, accumsan eget est non, rutrum viverra nisi.
        Duis at ipsum id felis pretium lacinia sed sit amet eros. Morbi eget
        auctor libero, eget semper magna.
      </p>
      <p>
        Curabitur vitae dictum lorem. Nam dolor libero, hendrerit at euismod
        sed, maximus viverra odio. Proin non vulputate ante. Mauris arcu metus,
        congue sit amet placerat id, rutrum at ante. Maecenas ac metus gravida,
        rutrum urna vel, rutrum mauris. Nunc tincidunt blandit eros, sit amet
        euismod tellus. Duis aliquam nulla non erat mattis, ut tincidunt diam
        luctus.
      </p>
      <p>
        Proin fringilla tempor lacus, vel blandit neque venenatis at. Sed eget
        tincidunt nisi, a gravida odio. Aliquam ac magna dapibus nunc faucibus
        lacinia. Donec tincidunt efficitur viverra. Fusce et tempus elit,
        consectetur tristique dui. Cras cursus venenatis consectetur. Curabitur
        sit amet felis vel justo facilisis interdum non vitae diam. Nullam
        semper maximus massa, sit amet mattis nulla rhoncus nec.
      </p>
      <p>
        Curabitur vitae dictum lorem. Nam dolor libero, hendrerit at euismod
        sed, maximus viverra odio. Proin non vulputate ante. Mauris arcu metus,
        congue sit amet placerat id, rutrum at ante. Maecenas ac metus gravida,
        rutrum urna vel, rutrum mauris. Nunc tincidunt blandit eros, sit amet
        euismod tellus. Duis aliquam nulla non erat mattis, ut tincidunt diam
        luctus.
      </p>
      <p>
        Proin fringilla tempor lacus, vel blandit neque venenatis at. Sed eget
        tincidunt nisi, a gravida odio. Aliquam ac magna dapibus nunc faucibus
        lacinia. Donec tincidunt efficitur viverra.
      </p>
    </ContentRoot>
  )
}

const ExampleA = () => {
  const { showModal } = useContext(ModalContext)
  const btnRefs = []

  cards.map((card, idx) => (btnRefs[idx] = useRef(null)))

  return (
    <Wall>
      {cards.map((card, idx) =>
        idx !== cards.length - 1 ? (
          <Card
            ref={btnRefs[idx]}
            key={idx}
            background={card.background}
            styles={card.style}
          >
            <Title>{card.title}</Title>
            <button
              onClick={() => {
                showModal({
                  Component: () => <Content title={card.title} />,
                  props: {
                    sourceRef: btnRefs[idx].current,
                    background: card.background,
                    title: card.title,
                  },
                })
              }}
            >
              Read more
            </button>
          </Card>
        ) : (
          <Card
            ref={btnRefs[idx]}
            key={idx}
            background={card.background}
            role={`button`}
            onClick={() => {
              showModal({
                Component: Content,
                props: {
                  sourceRef: btnRefs[idx].current,
                  background: card.background,
                  title: card.title,
                },
              })
            }}
          >
            <Title>{card.title}</Title>
          </Card>
        )
      )}
    </Wall>
  )
}

export default ExampleA
