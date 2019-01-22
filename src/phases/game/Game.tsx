import enemy from 'assets/img/enemy.png';
import { ANIMATION_TIME } from 'Constant';
import { Provider } from "mobx-react";
import React from 'react';
import { KeyboardState } from "utils/events/KeyboardState";
import FiniteStateMachine, { MachineState } from "utils/FiniteStateMachine";
import { GameUpdater } from "./GameUpdater";
import "./Layout.css";
import PowerLinesState from "./PowerLinesState";
import RhythmTileState from "./RhythmTileState";
import Character from './views/Character';
import PowerLines from './views/PowerLines';
import RhythmTilesView from "./views/RhythmTilesView";


export default class Game implements MachineState {
  keyboardState = new KeyboardState()
  rhythmTileState = new RhythmTileState()
  powerLinesState = new PowerLinesState()

  gameUpdater = new GameUpdater(this.rhythmTileState, this.powerLinesState)

  handleKeyDown = (event: KeyboardEvent) => {
    this.keyboardState.downKeys.set(event.key, true)
    this.gameUpdater.handleKeyEvent(event.key)
  }

  handleKeyUp = (event: KeyboardEvent) => {
    this.keyboardState.downKeys.delete(event.key)
  }

  init = () => {
    this.gameUpdater.init()
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
    setInterval(this.gameUpdater.update, ANIMATION_TIME)
  }

  cleanup = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  render = (context: FiniteStateMachine) => <>
    {/* <button onClick={() => context.changeState(new Menu())}>Quitter</button> */}

    <div id="game-layout">
      <span className="character"><Character /></span>
      <div className="enemy"><img style={{ display: "inline-block" }} src={enemy} width="80%" /></div>

      <div className="rhythm-tiles">
        <Provider keyboardState={this.keyboardState} rhythmTileState={this.rhythmTileState} >
          <RhythmTilesView />
        </Provider>
      </div>
      <div className="lines">
        <Provider powerLinesState={this.powerLinesState}>
          <PowerLines />
        </Provider>
      </div>

    </div>

  </>
}


