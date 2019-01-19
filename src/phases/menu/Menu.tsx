import React from 'react'
import FiniteStateMachine, { MachineState } from "utils/FiniteStateMachine";
import Game from "phases/game/Game";
import Settings from './Settings';

export default class Menu implements MachineState {

  render = (context: FiniteStateMachine) => <div style={{paddingTop: "10%"}}>
    
    <button onClick={() => context.changeState(new Game())}>Play</button>
    <button onClick={() => context.changeState(new Settings())}>Settings</button>
  </div>
  
}
