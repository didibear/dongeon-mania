import { FRAME_DURATION, NB_LINES, PLAYER_LOCK_TIME_MILLIS, PLAYER_PREPARATION_TIME_MILLIS } from 'Constant';
import _ from 'lodash';
import { action } from 'mobx';
import settingStore from "SettingStore";
import eventBus from "utils/events/EventBus";
import { OpponentsState } from './Opponents/OpponentsState';
import { PowerLinesState } from './PowerLines/PowerLinesState';
import { RhythmSequenceState } from './RhythmSequence/RhythmSequenceState';

export class GameUpdater {

  constructor(
    private rhythmTileState: RhythmSequenceState,
    private powerLinesState: PowerLinesState,
    private opponentsState: OpponentsState) { }

  init = () => {
    setInterval(() => !document.hidden && this.powerLinesState.addEnemySlash(_.random(NB_LINES - 1)), 4000)
  }

  @action
  update = () => {
    this.opponentsState.updateTimes(FRAME_DURATION)

    if (this.opponentsState.playerIsPreparing) return

    // Update power lines

    this.powerLinesState.incrementSlashProgressions()
    this.powerLinesState.doOnArrivedSlashs(this.opponentsState.decrementEnemyHP, this.opponentsState.decrementPlayerHP)
    this.powerLinesState.removeArrivedSlashs()
    this.powerLinesState.removeCollidedSlashs()
    // this.powerLinesState.forceUpdate()
  }

  handleKeyEvent = (keyPressed: string) => {
    this.handleRhythmSequenceKeys(keyPressed)
    this.handlePowerLineKeys(keyPressed)
  }

  private handleRhythmSequenceKeys = (keyPressed: string) => {
    if (this.opponentsState.playerIsPreparing && keyPressed === " ") {
      this.opponentsState.stopPlayerPreparation()
    }
    if (this.opponentsState.playerIsLocked || this.opponentsState.playerIsPreparing) return


    const pressedTile = settingStore.indexOfRhythmTileKey(keyPressed)
    if (pressedTile === -1) return

    const goodTile = this.rhythmTileState.tileSequence[this.rhythmTileState.currentTile]

    if (goodTile === pressedTile) {
      this.rhythmTileState.goToNextTile(this.endRhythmSequence)
    } else {
      this.opponentsState.lockPlayerInputFor(PLAYER_LOCK_TIME_MILLIS)
    }
  }

  handlePowerLineKeys = (keyPressed: string) => {

    const numLine = settingStore.indexOfPowerLineKey(keyPressed)
    if (numLine === -1) return

    this.powerLinesState.changeLine(numLine)
  }


  private endRhythmSequence = () => {
    if (this.rhythmTileState.sequenceEnded) {
      new Audio("slash1.mp3").play()
      eventBus.emit("ANIMATE_ATTACK_" + _.random(NB_LINES - 1))
      this.powerLinesState.addPlayerSlash(this.powerLinesState.chosenLine)
      this.rhythmTileState.resetSequence()

      this.opponentsState.startPlayerPreparationFor(PLAYER_PREPARATION_TIME_MILLIS)
    }
  }

}
