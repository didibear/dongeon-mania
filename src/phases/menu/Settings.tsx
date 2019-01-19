import { NB_TILE_COLUMNS, MARGIN, DEFAULT_GAME_KEYS_1, DEFAULT_GAME_KEYS_2 } from 'Constant';
import _ from 'lodash';
import { Observer } from 'mobx-react';
import React from 'react';
import settingStore from 'SettingStore';
import FiniteStateMachine, { MachineState } from "utils/FiniteStateMachine";
import Menu from './Menu';

export default class Settings implements MachineState {

  resetKeys = () => {
    settingStore.gameKeys1 = DEFAULT_GAME_KEYS_1
    settingStore.gameKeys2 = DEFAULT_GAME_KEYS_2
  }

  render = (context: FiniteStateMachine) => <div style={{ paddingTop: "10%" }}>

    <Observer>{() =>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Binding 1</th>
            <th>Binding 2</th>
          </tr>
        </thead>
        <tbody>
          {_.range(NB_TILE_COLUMNS).map(i => <tr>
            <th>Tile {i + 1}</th>
            <td><input style={{ textAlign: "center" }} minLength={1} maxLength={1} value={settingStore.gameKeys1[i]} onChange={event => settingStore.gameKeys1[i] = event.target.value} /></td>
            <td><input style={{ textAlign: "center" }} minLength={1} maxLength={1} value={settingStore.gameKeys2[i]} onChange={event => settingStore.gameKeys2[i] = event.target.value} /></td>
          </tr>)}
        </tbody>
      </table>
    }</Observer>
    <button onClick={() => context.changeState(new Menu())}>Back</button>
    <button onClick={this.resetKeys}>Reset</button>
  </div>
}
