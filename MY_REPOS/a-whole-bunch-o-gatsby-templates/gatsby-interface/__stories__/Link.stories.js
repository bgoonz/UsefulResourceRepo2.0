import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { text, boolean } from "@storybook/addon-knobs"
import { MdArrowForward } from "react-icons/md"

import { Link } from "../src/components/Link"

const getLinkType = () => {
  if (boolean(`Internal link`, true)) return { to: text(`Url`, `/`) }
  else return { href: text(`Url`, `#`) }
}

const linkProps = () => {
  return {
    ...getLinkType(),
    onClick: action(`Link was clicked`),
    target: `_blank`,
  }
}

storiesOf(`Link`, module)
  .add(`Default`, () => <Link {...linkProps()}>Default Link</Link>)
  .add(
    `Simple`,
    () => (
      <Link {...linkProps()} variant="SIMPLE">
        Simple Link
      </Link>
    ),
    {
      info: {
        text: `
      Links are used as a form of navigation within the application or to an external source.
    `,
      },
    }
  )

storiesOf(`Link/in use`, module)
  .add(`Default Link with icon`, () => (
    <Link {...linkProps()}>
      LinkWithIcon <MdArrowForward />
    </Link>
  ))
  .add(`Simple Link with icon`, () => (
    <Link {...linkProps()} variant="SIMPLE">
      LinkWithIcon <MdArrowForward />
    </Link>
  ))
