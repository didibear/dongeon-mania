import Game, { Start } from 'phases/game/Game'
import React from 'react'
import FiniteStateMachine, { MachineState } from 'utils/FiniteStateMachine'

import Settings from './Settings'

export default class Menu implements MachineState {

  render = (context: FiniteStateMachine) => <div style={{paddingTop: "10%"}}>
    <h1>DONGEON MANIA</h1>
    <button onClick={() => context.changeState(new Start(0))}>Play</button>
    <button onClick={() => context.changeState(new Settings())}>Settings</button>
  </div>
  
}
