import keyboardState from 'states/KeyboardState'
import { GamePhase } from "phases/GamePhase"
import Phase from "phases/Phase"


class KeyEventHandler {

    phase: Phase = new GamePhase({})

    changePhase = (phase : Phase) => this.phase = phase

    handleKeyDown = (event: KeyboardEvent) => {
        keyboardState.downKeys.set(event.key, true)
        this.phase.update(event.key)
    }
    
    handleKeyUp = (event: KeyboardEvent) => keyboardState.downKeys.delete(event.key)
}

export default new KeyEventHandler()

