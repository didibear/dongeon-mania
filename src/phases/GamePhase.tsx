import _ from 'lodash'
import { action } from 'mobx'
import { ANIMATION_TIME, HANDLED_KEYS, TRANSITION_STEPS } from 'Constant'
import gameState, { generateTileSequence } from 'states/GameState'
import Phase from "phases/Phase"
import eventBus from "events/EventBus"
import { render } from 'react-dom';
import { Component } from 'react';
import GameView from 'views/GameView';

export class GamePhase extends Component implements Phase {

    goToNextTileDebounce = _.debounce(() => this.goToNextTile(), ANIMATION_TIME, { leading: true })

    render = () => <GameView />


    update = (keyPressed: string) => {
        const numTile = gameState.tileSequence[gameState.currentTile]
        const keyTile = HANDLED_KEYS.get(numTile)

        if (keyTile === keyPressed) {
            this.goToNextTileDebounce()

        }
    }

    @action
    private goToNextTile = () => {
        gameState.currentTile++;
        this.playTransition();
        eventBus.emit("ANIMATE_ATTACK_" + (Math.floor(Math.random() * 3 + 1)));

        if (gameState.currentTile >= gameState.tileSequence.length) {
            this.endTileSequence();
        }
    }

    @action
    private playTransition = () => {
        gameState.transition = 1
        _.rangeRight(0, 1, 1 / TRANSITION_STEPS).forEach(step => setTimeout(() => gameState.transition = step, (1 - step) * ANIMATION_TIME))
    }

    @action
    private endTileSequence() {
        eventBus.emit("ANIMATE_ATTACK_" + (Math.floor(Math.random() * 3 + 1)));
        gameState.tileSequence = generateTileSequence(10);
        gameState.currentTile = 0;
    }
}
