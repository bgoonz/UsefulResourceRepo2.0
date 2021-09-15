import React from "react"
import { randomInteger } from "../helpers"

function randomHeadingLineWidth() {
  return `${randomInteger(50, 100)}%`
}

function randomBodyLineWidth() {
  return `${randomInteger(70, 100)}%`
}

const rootCss = ({ theme, asBox, isHorizontal }) => [
  {
    display: `grid`,
    border: `1px dotted grey`,
    gap: theme.space[6],
  },
  asBox && {
    padding: theme.space[10],
    background: theme.colors.grey,
  },
  isHorizontal && {
    gridTemplateColumns: `1fr 1fr`,
  },
]

const textCss = theme => ({
  display: `grid`,
  gap: theme.space[7],
  alignItems: `start`,
  // alignContent: `center`,
})

const headingCss = theme => ({
  display: `grid`,
  gap: theme.space[3],
})

const headingLineCss = ({ theme, isInverted }) => ({
  background: isInverted ? theme.colors.superLightGrey : theme.colors.lightGrey,
  width: randomHeadingLineWidth(),
  height: theme.space[7],
})

const bodyCss = theme => ({
  display: `grid`,
  gap: theme.space[3],
})

const bodyLineCss = ({ theme, isInverted }) => ({
  background: isInverted ? theme.colors.superLightGrey : theme.colors.lightGrey,
  height: theme.space[4],
  width: randomBodyLineWidth(),
})

const pictureCss = theme => ({
  background: `rgba(0,0,0,0.25)`,
  width: `100%`,
  minHeight: `10rem`,
})

export function ContentPlaceholder({
  numberOfHeadingLines = 0,
  numberOfBodyLines = 0,
  isInverted = false,
  asBox = false,
  picture = false,
  isHorizontal = false,
  ...rest
}) {
  const headingLines = [...Array(numberOfHeadingLines).keys()]
  const bodyLines = [...Array(numberOfBodyLines).keys()]

  return (
    <div css={theme => rootCss({ theme, asBox, isHorizontal })} {...rest}>
      {picture && <div css={pictureCss} />}
      <div css={textCss}>
        {!!numberOfHeadingLines && (
          <div css={headingCss}>
            {headingLines.map((_, idx) => (
              <div
                key={idx}
                css={theme => headingLineCss({ theme, isInverted })}
              />
            ))}
          </div>
        )}
        {!!numberOfBodyLines && (
          <div css={bodyCss}>
            {bodyLines.map((_, idx) => (
              <div
                key={idx}
                css={theme => bodyLineCss({ theme, isInverted })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
