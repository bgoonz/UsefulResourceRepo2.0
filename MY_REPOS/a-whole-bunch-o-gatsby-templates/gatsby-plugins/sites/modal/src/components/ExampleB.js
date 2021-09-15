import React, { useContext, useRef, Fragment } from "react"
import styled from "@emotion/styled"
import { ModalContext } from "gatsby-plugin-modal"

const Note = styled(`div`)`
  width: 12rem;
  float: right;
  background: purple;
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 2.5rem;
  margin: 1rem 0 1rem 2rem;
`
const ContentRoot = styled(`div`)`
  width: 100%;
  height: 100%;
  padding: 2rem;
  color: white;

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

export const Content = props => {
  return (
    <ContentRoot>
      <h1>{props.title}</h1>
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

const ExampleB = () => {
  const { showModal } = useContext(ModalContext)
  const noteRefs = useRef(null)

  return (
    <Fragment>
      <h1>5 Incredibly Useful MODAL Tips For Small Businesses</h1>
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
      <Note
        ref={noteRefs}
        onClick={() => {
          showModal({
            Component: Content,
            props: {
              sourceRef: noteRefs.current,
              background: "purple",
              title: "There’s Big Money In MODAL",
            },
          })
        }}
      >
        There’s Big Money In MODAL
      </Note>
      <p>
        Curabitur vitae dictum lorem. Nam dolor libero, hendrerit at euismod
        sed, maximus viverra odio. Proin non vulputate ante. Mauris arcu metus,
        congue sit amet placerat id, rutrum at ante. Maecenas ac metus gravida,
        rutrum urna vel, rutrum mauris. Nunc tincidunt blandit eros, sit amet
        euismod tellus. Duis aliquam nulla non erat mattis, ut tincidunt diam
        luctus. Proin fringilla tempor lacus, vel blandit neque venenatis at.
        Sed eget tincidunt nisi, a gravida odio. Aliquam ac magna dapibus nunc
        faucibus lacinia. Donec tincidunt efficitur viverra.
      </p>

      <p>
        Fusce et tempus elit, consectetur tristique dui. Cras cursus venenatis
        consectetur. Curabitur sit amet felis vel justo facilisis interdum non
        vitae diam. Nullam semper maximus massa, sit amet mattis nulla rhoncus
        nec.
      </p>
      <p>
        Curabitur vitae dictum lorem. Nam dolor libero, hendrerit at euismod
        sed, maximus viverra odio. Proin non vulputate ante. Mauris arcu metus,
        congue sit amet placerat id, rutrum at ante. Maecenas ac metus gravida,
        rutrum urna vel, rutrum mauris. Nunc tincidunt blandit eros, sit amet
        euismod tellus. Duis aliquam nulla non erat mattis, ut tincidunt diam
        luctus. Proin fringilla tempor lacus, vel blandit neque venenatis at.
        Sed eget tincidunt nisi, a gravida odio. Aliquam ac magna dapibus nunc
        faucibus lacinia. Donec tincidunt efficitur viverra.
      </p>
    </Fragment>
  )
}

export default ExampleB
