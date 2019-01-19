import { ANIMATION_TIME, TRANSITION_STEPS } from 'Constant';
import _ from 'lodash';
import { action } from 'mobx';
import { generateTileSequence } from 'phases/game/RhythmTileState';
import eventBus from "utils/events/EventBus";
import RhythmTileState from './RhythmTileState';
import settingStore from "SettingStore"


export class GameUpdater {
    constructor(private rhythmTileState: RhythmTileState) { }

    goToNextTileDebounce = _.debounce(() => this.goToNextTile(), ANIMATION_TIME, { leading: true })

    update = (keyPressed: string) => {
        const numTile = this.rhythmTileState.tileSequence[this.rhythmTileState.currentTile]
        const keyTile1 = settingStore.gameKeys1[numTile]
        const keyTile2 = settingStore.gameKeys2[numTile]

        if (keyTile1 === keyPressed || keyTile2 === keyPressed) {
            this.goToNextTileDebounce()

        }
    }

    @action
    private goToNextTile = () => {
        this.rhythmTileState.currentTile++;
        this.playTransition();
        eventBus.emit("ANIMATE_ATTACK_" + (Math.floor(Math.random() * 3 + 1)));

        if (this.rhythmTileState.currentTile >= this.rhythmTileState.tileSequence.length) {
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
        this.rhythmTileState.tileSequence = generateTileSequence(10);
        this.rhythmTileState.currentTile = 0;
    }
}
