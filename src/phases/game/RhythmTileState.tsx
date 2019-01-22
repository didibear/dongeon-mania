
import { NB_TILE_COLUMNS, SEQUENCE_LENGTH } from 'Constant';
import { observable } from 'mobx';

const randInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

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

export default class RhythmTileState {
  @observable tileSequence: number[] = generateTileSequence(SEQUENCE_LENGTH)
  @observable currentTile: number = 0
  @observable transition: number = 0
}
