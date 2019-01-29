
import { NB_TILE_COLUMNS, SEQUENCE_LENGTH, ANIMATION_TIME, TRANSITION_STEPS, NB_LINES } from 'Constant';
import { observable, action, computed } from 'mobx';
import _ from 'lodash';
import { componentByNodeRegistry } from 'mobx-react';

const randInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

export function generateTileSequence(n: number): number[] {
  const array: number[] = []
  let next
  for (let i = 0; i < n; i++) {
    let current = randInt(NB_TILE_COLUMNS)
    if (current === next) {
      i--
    } else {
      array.push(current)
      next = current
    }
  }
  return array
}

function onlyOnceEvery(millis: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    target[propertyKey] = _.debounce(() => target[propertyKey](), millis, { leading: true })
    return target
  }
}

export class RhythmSequenceState {

  @observable tileSequence: number[] = generateTileSequence(SEQUENCE_LENGTH)
  @observable currentTile: number = 0
  @observable transition: number = 0

  goToNextTile: (callback: () => void) => void = _.debounce((callback) => this._goToNextTile(callback), ANIMATION_TIME, { leading: true })

  @computed get sequenceEnded() { return this.currentTile >= this.tileSequence.length }

  // @onlyOnceEvery(ANIMATION_TIME)
  @action _goToNextTile = (callback: () => void): void => {
    this.currentTile++;
    this.playTransition();
    callback()
  }

  @action private playTransition = () => {
    this.transition = 1
    _.rangeRight(0, 1, 1 / TRANSITION_STEPS).forEach(step => setTimeout(() => this.transition = step, (1 - step) * ANIMATION_TIME))
  }


  @action resetSequence() {
    this.tileSequence = generateTileSequence(SEQUENCE_LENGTH);
    this.currentTile = 0;
  }
}
