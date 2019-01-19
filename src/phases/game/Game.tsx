import enemy from 'assets/img/enemy.png';
import { Provider } from "mobx-react";
import Menu from "phases/menu/Menu";
import React from 'react';
import Grid from 'react-css-grid';
import { KeyboardState } from "utils/events/KeyboardState";
import FiniteStateMachine, { MachineState } from "utils/FiniteStateMachine";
import Character from './views/Character';
import { GameUpdater } from "./GameUpdater";
import RhythmTileState from "./RhythmTileState";
import RhythmTilesView from "./views/RhythmTilesView";



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
      <Grid width="33%" gap={0} style={{ paddingTop: "10%" }}>
        <Character />
        <RhythmTilesView />
        <img style={{ display: "inline-block" }} src={enemy} width="80%" />

      </Grid>
    </Provider>
  </>
}


