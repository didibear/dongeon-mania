import { ANIMATION_TIME, SEQUENCE_LENGTH, TRANSITION_STEPS } from 'Constant';
import _ from 'lodash';
import { action } from 'mobx';
import { generateTileSequence } from 'phases/game/RhythmTileState';
import settingStore from "SettingStore";
import eventBus from "utils/events/EventBus";
import PowerLinesState from './PowerLinesState';
import RhythmTileState from './RhythmTileState';
import { PlayersState } from './PlayersState';



export class GameUpdater {

  constructor(private rhythmTileState: RhythmTileState, private powerLinesState: PowerLinesState, private playersState: PlayersState) { }

  goToNextTileDebounce = _.debounce(() => this.goToNextTile(), ANIMATION_TIME, { leading: true })

  init = () => {
    setInterval(() => !document.hidden && this.powerLinesState.addEnemySlash(_.random(2)), 2000)
  }

  handleKeyEvent = (keyPressed: string) => {
    const numTile = this.rhythmTileState.tileSequence[this.rhythmTileState.currentTile]
    const keyTile1 = settingStore.rhythmTileKeys1[numTile]
    const keyTile2 = settingStore.rhythmTileKeys2[numTile]

    if (keyTile1 === keyPressed || keyTile2 === keyPressed) {
      this.goToNextTileDebounce()
    }
  }

  @action
  update = () => {
    this.powerLinesState.incrementSlashProgressions()
    this.powerLinesState.doOnArrivedSlashs(
      () => this.playersState.enemyHealthPoint -= 1, 
      () => this.playersState.playerHealthPoint -= 1
    )
    this.powerLinesState.removeArrivedSlashs()
    this.powerLinesState.removeCollidedSlashs()

    // this.powerLinesState.forceUpdate()
  }

  @action
  private goToNextTile = () => {

    this.rhythmTileState.currentTile++;
    this.playTransition();
    
    if (this.rhythmTileState.currentTile >= this.rhythmTileState.tileSequence.length) {
      new Audio("slash1.mp3").play()
      eventBus.emit("ANIMATE_ATTACK_" + (_.random(1, 3)));
      this.powerLinesState.addPlayerSlash(_.random(2))
      this.endTileSequence();
    }
  }

  @action
  private playTransition = () => {
    this.rhythmTileState.transition = 1
    _.rangeRight(0, 1, 1 / TRANSITION_STEPS).forEach(step => setTimeout(() => this.rhythmTileState.transition = step, (1 - step) * ANIMATION_TIME))
  }

  @action
  private endTileSequence() {
    eventBus.emit("ANIMATE_ATTACK_" + (Math.floor(Math.random() * 3 + 1)));
    this.rhythmTileState.tileSequence = generateTileSequence(SEQUENCE_LENGTH);
    this.rhythmTileState.currentTile = 0;
  }
}
