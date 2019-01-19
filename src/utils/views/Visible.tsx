
import React, { ReactNode } from "react"

type Props = {
  when: boolean
  children: ReactNode
}

export default (props: Props) => (
  <div style={{ visibility: props.when ? "visible" : "hidden" }}>
    {props.children}
  </div>
)