import { FRAME_DURATION } from 'Constant';
import { Provider } from "mobx-react";
import React from 'react';
import { KeyboardState } from "utils/events/KeyboardState";
import { MachineState } from "utils/FiniteStateMachine";
import { GameUpdater } from "./GameUpdater";
import "./Layout.css";
import { OpponentsState } from './Opponents/OpponentsState';
import { EnemyLife, EnemySprite, PlayerLife, PlayerSprite } from './Opponents/OpponentsViews';
import { PowerLinesState } from "./PowerLines/PowerLinesState";
import PowerLines from './PowerLines/PowerLinesView';
import { RhythmSequenceState } from "./RhythmSequence/RhythmSequenceState";
import RhythmSequence from "./RhythmSequence/RhythmSequenceView";

// import sound from 'assets/sound/yey.mp3'


export default class Game implements MachineState {
  stores = {
    keyboardState: new KeyboardState(),
    rhythmTileState: new RhythmSequenceState(),
    powerLinesState: new PowerLinesState(),
    opponentsState: new OpponentsState()
  }
  gameUpdater = new GameUpdater(this.stores.rhythmTileState, this.stores.powerLinesState, this.stores.opponentsState)

  handleKeyDown = (event: KeyboardEvent) => {
    this.stores.keyboardState.downKeys.set(event.key, true)
    this.gameUpdater.handleKeyEvent(event.key)
  }

  handleKeyUp = (event: KeyboardEvent) => {
    this.stores.keyboardState.downKeys.delete(event.key)
  }

  init = () => {
    this.gameUpdater.init()
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
    setInterval(() => !document.hidden && this.gameUpdater.update(), FRAME_DURATION)
  }

  cleanup = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  render = () =>
    <Provider {...this.stores} >
      <div id="game-layout">
        <div className="rhythm-sequence"><RhythmSequence /></div>
        <div className="power-lines"><PowerLines /></div>

        <div className="player-sprite"><PlayerSprite /></div>
        <div className="enemy-sprite"><EnemySprite /></div>

        <div className="player-life"><PlayerLife /></div>
        <div className="enemy-life"><EnemyLife /></div>
      </div>
    </Provider>
}