import {
  FRAME_DURATION,
  NB_LEVELS,
  NB_LINES,
  PLAYER_LOCK_TIME_MILLIS,
  PLAYER_PREPARATION_TIME_MILLIS,
} from 'Constant'
import _ from 'lodash'
import { action } from 'mobx'
import Menu from 'phases/menu/Menu'
import settingStore from 'SettingStore'
import eventBus from 'utils/events/EventBus'
import FiniteStateMachine from 'utils/FiniteStateMachine'

import { Start, Win } from './Game'
import { OpponentsState } from './Opponents/OpponentsState'
import { PowerLinesState } from './PowerLines/PowerLinesState'
import { RhythmSequenceState } from './RhythmSequence/RhythmSequenceState'

export class GameUpdater {
  intervals: NodeJS.Timeout[] = []

  constructor(
    private level: number,
    private rhythmTileState: RhythmSequenceState,
    private powerLinesState: PowerLinesState,
    private opponentsState: OpponentsState) { 
      
      this.opponentsState.startPlayerPreparationFor(PLAYER_PREPARATION_TIME_MILLIS)
  }

  @action
  update = (context: FiniteStateMachine) => {
    this.opponentsState.updatePlayerTimes(FRAME_DURATION)

    if (this.opponentsState.playerIsPreparing) return

    this.opponentsState.updateEnemyTimes(FRAME_DURATION)
    
    // Update power lines

    if (this.opponentsState.enemyAttack) {
      this.powerLinesState.addEnemySlash(_.random(NB_LINES - 1))
      this.opponentsState.resetEnemyAttack()
    }

    this.powerLinesState.incrementSlashProgressions()
    this.powerLinesState.doOnArrivedSlashs(this.opponentsState.decrementEnemyHP, this.opponentsState.decrementPlayerHP)
    this.powerLinesState.removeArrivedSlashs()
    this.powerLinesState.removeCollidedSlashs()
    // this.powerLinesState.forceUpdate()

    this.verifyWinner(context)
  }

  verifyWinner = (context: FiniteStateMachine) => {
    if (this.opponentsState.playerHealthPoint <= 0) {
      context.changeState(new Menu())
      return
    }

    if (this.opponentsState.enemyHealthPoint <= 0) {
      context.changeState(this.level === NB_LEVELS - 1 ? new Win() : new Start(this.level + 1))
    }
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
    const goodTile = this.rhythmTileState.tileSequence[this.rhythmTileState.currentTile]

    if (pressedTile === -1) return

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
