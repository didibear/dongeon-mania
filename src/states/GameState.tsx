
import { observable, computed, action, reaction } from 'mobx'
import { array } from 'prop-types'
import { NB_TILE_COLUMNS, ANIMATION_TIME, TRANSITION_STEPS } from 'Constant'
import _ from 'lodash'

function randInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}
export function generateTileSequence(n: number): number[] {
  const array: number[] = []
  let next
  for (let i = 0; i < n; i++) {
    let current = randInt(NB_TILE_COLUMNS)
    if (current === next){
      i--
    } else {
      array.push(current)
      next = current
    }    
  }
  return array
}

export class GameState {
  @observable tileSequence: number[] = generateTileSequence(10)
  @observable currentTile: number = 0
  @observable transition: number = 0
}

export default new GameState()
