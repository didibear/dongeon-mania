import emptyHeart from "assets/img/empty_heart.png";
import enemy from 'assets/img/enemy.png';
import filledHeart from "assets/img/filled_heart.png";
import { ANIMATION_TIME, MAX_HEALTH } from 'Constant';
import _ from 'lodash';
import { observable } from 'mobx';
import { Observer, Provider } from "mobx-react";
import React from 'react';
import eventBus from 'utils/events/EventBus';
import { KeyboardState } from "utils/events/KeyboardState";
import { MachineState } from "utils/FiniteStateMachine";
import { GameUpdater } from "./GameUpdater";
import "./Layout.css";
import { PlayersState } from './PlayersState';
import PowerLinesState from "./PowerLinesState";
import RhythmTileState from "./RhythmTileState";
import { PlayerSprite } from './views/Player';
import PowerLines from './views/PowerLines';
import RhythmTilesView from "./views/RhythmTilesView";

// import sound from 'assets/sound/yey.mp3'


const PlayerLife = (props: { healthPoint: number }) => <div>
  {_.range(MAX_HEALTH).map(i => <img src={props.healthPoint > i ? filledHeart : emptyHeart} width={`${100 / MAX_HEALTH}%`} />)}
</div>

export default class Game implements MachineState {
  stores = {
    keyboardState: new KeyboardState(),
    rhythmTileState: new RhythmTileState(),
    powerLinesState: new PowerLinesState(),
    playersState: new PlayersState()
  }
  gameUpdater = new GameUpdater(this.stores.rhythmTileState, this.stores.powerLinesState, this.stores.playersState)

  @observable hideEnemy = false

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
    setInterval(() => !document.hidden && this.gameUpdater.update(), ANIMATION_TIME)

    _.range(1, 4).forEach(i => eventBus.subscribe("ANIMATE_ATTACK_" + i, this.quickklyHideEnemy));

  }

  quickklyHideEnemy = () => {
    this.hideEnemy = true
    setTimeout(() => this.hideEnemy = false, 100)
    setTimeout(() => this.hideEnemy = true, 200)
    setTimeout(() => this.hideEnemy = false, 300)
  }


  cleanup = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  render = () =>
    <Provider {...this.stores} >
      <div id="game-layout">
        <div className="rhythm-tiles">
          <RhythmTilesView />
        </div>
        <div className="lines">
          <PowerLines />
        </div>
        
        <div className="player-sprite">
          <PlayerSprite />
        </div>
        <div className="enemy">
          <Observer>{() => !this.hideEnemy && <img style={{ display: "inline-block" }} src={enemy} width="80%" />}</Observer>
        </div>

        <div className="player-life">
          <Observer>{() => <PlayerLife healthPoint={this.stores.playersState.playerHealthPoint} />}</Observer>
        </div>
        <div className="enemy-life">
          <Observer>{() => <PlayerLife healthPoint={this.stores.playersState.enemyHealthPoint} />}</Observer>
        </div>

      </div>
    </Provider>

}