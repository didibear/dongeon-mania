import React, { ReactNode } from "react";

export type MachineState = {
  init?(context: FiniteStateMachine): void
  cleanup?(context: FiniteStateMachine): void

  render(context: FiniteStateMachine): ReactNode
}

type FiniteStateMachineProps = {
  startState: MachineState
}

export default class FiniteStateMachine extends React.Component<FiniteStateMachineProps, MachineState>{

  state: MachineState = this.props.startState

  render = (): ReactNode => this.state.render(this)

  changeState = (nextState: MachineState) => {
    this.state.cleanup && this.state.cleanup(this)
    this.setState(nextState)
    nextState.init && nextState.init(this)
  }

  componentDidMount = () => this.state.init && this.state.init(this)
  componentWillUnmount = () => this.state.cleanup && this.state.cleanup(this)

}

