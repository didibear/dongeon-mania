import keyEventHandler from 'events/KeyEventHandler';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import React, { ReactNode } from 'react';
import gameState from 'states/GameState';
import keyboardState from 'states/KeyboardState';
import GameView from 'views/GameView';



export default class App extends React.Component {

  componentWillMount() {
    document.addEventListener('keydown', keyEventHandler.handleKeyDown)
    document.addEventListener('keyup', keyEventHandler.handleKeyUp)
  }

  render(): ReactNode {
    const stores = { keyboardState, gameState }

    return (
      <div tabIndex={0} style={{ "height": "100vh", "textAlign": "center" }}>
        <Provider {...stores} >
          <GameView />
        </Provider>
        <DevTools />
      </div>
    )
  }
}