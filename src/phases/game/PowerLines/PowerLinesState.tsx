
import { NB_LINES, SLASH_SPEED } from 'Constant';
import _ from 'lodash';
import { action, observable } from 'mobx';



export type SlashProgression = {
  progression: number // in 0..100
}

export class PowerLinesState {
  @observable chosenLine = 0 

  @observable playerLines: Array<SlashProgression[]> = Array.from(Array(NB_LINES)).map(() => [])
  @observable enemyLines: Array<SlashProgression[]> = Array.from(Array(NB_LINES)).map(() => [])

  // VIEWS

  mapPlayerSlashs<T>(callback: (line: number, slash: SlashProgression) => T): T[] {
    return this.playerLines.flatMap((slashs, line) => slashs.map(slash => callback(line, slash)))
  }
  mapEnemySlashs<T>(callback: (line: number, slash: SlashProgression) => T): T[] {
    return this.enemyLines.flatMap((slashs, line) => slashs.map(slash => callback(line, slash)))
  }

  // ACTIONS

  @action addPlayerSlash = (line: number) => this.playerLines[line].push({ progression: 0 })
  @action addEnemySlash = (line: number) => this.enemyLines[line].push({ progression: 100 })

  @action incrementSlashProgressions = () => {
    this.playerLines.forEach(slashs => slashs.forEach(slash => slash.progression += SLASH_SPEED))
    this.enemyLines.forEach(slashs => slashs.forEach(slash => slash.progression -= SLASH_SPEED))
  }

  @action removeArrivedSlashs = () => {
    this.playerLines.forEach(slashs => _.remove(slashs, slash => slash.progression >= 100))
    this.enemyLines.forEach(slashs => _.remove(slashs, slash => slash.progression <= 0))
  }

  @action doOnArrivedSlashs = (playerArrived: () => void, enemyArrived: () => void) => {
    this.playerLines.forEach(slashs => slashs.filter(slash => slash.progression >= 100).forEach(playerArrived))
    this.enemyLines.forEach(slashs => slashs.filter(slash => slash.progression <= 0).forEach(enemyArrived))
  }

  @action removeCollidedSlashs = () => {
    _.range(NB_LINES).forEach(line => {
      const playerSlashs = this.playerLines[line]
      const enemySlashs = this.enemyLines[line]
      if (playerSlashs.length === 0 || enemySlashs.length === 0) return

      const playerProgression = Math.max(...playerSlashs.map(s => s.progression))
      const enemyProgression = Math.min(...enemySlashs.map(s => s.progression))

      if (playerProgression > enemyProgression) {
        _.remove(playerSlashs, slash => slash.progression === playerProgression);
        _.remove(enemySlashs, slash => slash.progression === enemyProgression);
      }
    })
  }

  @action forceUpdate = () => {
    this.playerLines = this.playerLines.slice()
    this.enemyLines = this.enemyLines.slice()
  }

  @action changeLine = (lineNumber: number) => this.chosenLine = lineNumber
  
}
