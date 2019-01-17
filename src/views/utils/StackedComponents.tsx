
import React, { ReactNode } from "react"

type Props = {
  children: ReactNode[]
}

function surroundAbsoluteDiv(component: ReactNode, key: string | number) {
  return <div key={key} style={{
    position: "absolute",
    width: "100%",
    height: "100%"
  }}>{component}</div>;
}

export default (props: Props) => (
  <div style={{ position: "relative" }}>
    {props.children.map((component, i) => Array.isArray(component)
      ? component.map((subComponent, j) => surroundAbsoluteDiv(subComponent, `${i}-${j}`))
      : surroundAbsoluteDiv(component, i))}
  </div>
)
