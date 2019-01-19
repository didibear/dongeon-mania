import DevTools from 'mobx-react-devtools';
import Menu from 'phases/menu/Menu';
import React from 'react';
import FiniteStateMachine from 'utils/FiniteStateMachine';

export default class App extends React.Component {

  render = () => <div tabIndex={0} style={{ "height": "100vh", "textAlign": "center" }}>
    <FiniteStateMachine startState={new Menu()} />
    <DevTools />
  </div>
}