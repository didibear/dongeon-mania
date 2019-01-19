import FiniteStateMachine, { MachineState } from "utils/FiniteStateMachine";
import React from 'react';
import GameView from "phases/game/views/GameView";
import Menu from "phases/menu/Menu";
import { KeyboardState } from "utils/events/KeyboardState";
import { GameUpdater } from "./GameUpdater";
import RhythmTileState from "./RhythmTileState";
import { Provider } from "mobx-react";


export default class Game implements MachineState {
  keyboardState = new KeyboardState()
  rhythmTileState = new RhythmTileState()
  gameUpdater = new GameUpdater(this.rhythmTileState)

  handleKeyDown = (event: KeyboardEvent) => {
    this.keyboardState.downKeys.set(event.key, true)
    this.gameUpdater.update(event.key)
  }

  handleKeyUp = (event: KeyboardEvent) => {
    this.keyboardState.downKeys.delete(event.key)
  }

  init = () => {  
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  cleanup = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  render = (context: FiniteStateMachine) => <>
    <button onClick={() => context.changeState(new Menu())}>Quitter</button>
    
    <Provider keyboardState={this.keyboardState} rhythmTileState={this.rhythmTileState} >
      <GameView />
    </Provider>
  </>
}


