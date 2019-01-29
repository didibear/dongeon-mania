import { ANIMATION_TIME, SEQUENCE_LENGTH, TRANSITION_STEPS, NB_LINES, PLAYER_LOCK_TIME_MILLIS } from 'Constant';
import _ from 'lodash';
import { action } from 'mobx';
import { generateTileSequence } from 'phases/game/RhythmSequence/RhythmSequenceState';
import settingStore from "SettingStore";
import eventBus from "utils/events/EventBus";
import { PowerLinesState } from './PowerLines/PowerLinesState';
import { RhythmSequenceState } from './RhythmSequence/RhythmSequenceState';
import { OpponentsState } from './Opponents/OpponentsState';

export class GameUpdater {

  constructor(
    private rhythmTileState: RhythmSequenceState,
    private powerLinesState: PowerLinesState,
    private opponentsState: OpponentsState) { }

  init = () => {
    setInterval(() => !document.hidden && this.powerLinesState.addEnemySlash(_.random(NB_LINES - 1)), 2000)
  }

  handleKeyEvent = (keyPressed: string) => {
    if (this.opponentsState.playerIsLocked) return

    const numTile = this.rhythmTileState.tileSequence[this.rhythmTileState.currentTile]
    const keyTile1 = settingStore.rhythmTileKeys1[numTile]
    const keyTile2 = settingStore.rhythmTileKeys2[numTile]

    if (keyTile1 === keyPressed || keyTile2 === keyPressed) {
      this.rhythmTileState.goToNextTile(this.endRhythmSequence)
    } else {
      this.opponentsState.lockPlayerInputFor(PLAYER_LOCK_TIME_MILLIS)
    }
  }

  @action
  update = () => {
    if (this.opponentsState.playerIsLocked) {
      this.opponentsState.decreasePlayerLockTime(ANIMATION_TIME)
    }

    this.powerLinesState.incrementSlashProgressions()
    this.powerLinesState.doOnArrivedSlashs(this.opponentsState.decrementEnemyHP, this.opponentsState.decrementPlayerHP)
    this.powerLinesState.removeArrivedSlashs()
    this.powerLinesState.removeCollidedSlashs()

    // this.powerLinesState.forceUpdate()
  }


  private endRhythmSequence() {
    if (this.rhythmTileState.sequenceEnded) {
      // new Audio("slash1.mp3").play()
      eventBus.emit("ANIMATE_ATTACK_" + _.random(NB_LINES - 1));
      this.powerLinesState.addPlayerSlash(_.random(NB_LINES - 1));
      this.rhythmTileState.resetSequence();
    }
  }
}
