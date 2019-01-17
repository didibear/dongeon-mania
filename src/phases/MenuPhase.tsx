import _ from 'lodash'
import { action } from 'mobx'
import { ANIMATION_TIME, HANDLED_KEYS, TRANSITION_STEPS } from 'Constant'
import gameState, { generateTileSequence } from 'states/GameState'
import Phase from "phases/Phase"
import eventBus from "events/EventBus"

export class MenuPhase implements Phase {

    update = (keyPressed: string) => {
        const numTile = gameState.tileSequence[gameState.currentTile]
        const keyTile = HANDLED_KEYS.get(numTile)

        if (keyTile === keyPressed) {
            // this.goToNextTileDebounce()
        }
    }
}
