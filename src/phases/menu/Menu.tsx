import React from 'react'
import FiniteStateMachine, { MachineState } from "utils/FiniteStateMachine";
import Game from "phases/game/Game";

export default class Menu implements MachineState {

  render = (context: FiniteStateMachine) => <>
    <button onClick={() => context.changeState(new Game())}>Play</button>
    <p> Leader Board... </p>
    <FiniteStateMachine startState={new State1()}></FiniteStateMachine>
  </>
}

class State1 implements MachineState {
  render = (context: FiniteStateMachine) => <>
    <p>Coucou 1</p>
    <button onClick={() => context.changeState(new State2())}>Change !</button>
  </>

}

class State2 implements MachineState {
  render = (context: FiniteStateMachine) => <>
    <p>Coucou 2</p>
    <button onClick={() => context.changeState(new State1())}>Change !</button>
  </>

}
