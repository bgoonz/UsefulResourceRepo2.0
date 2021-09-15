import React from "react"

type Props = {
  children: React.ReactNode
}

const Hello = ({ children }: Props) => <div style={{ color: `red`, fontWeight: `bold` }}>SAY: {children}</div>

export default Hello
