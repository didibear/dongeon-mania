import { NB_TILE_COLUMNS, DEFAULT_RHYTHM_TILE_KEYS_1, DEFAULT_RHYTHM_TILE_KEYS_2, NB_LINES, DEFAULT_POWER_LINE_KEYS_1, DEFAULT_POWER_LINE_KEYS_2 } from 'Constant';
import _ from 'lodash';
import { Observer } from 'mobx-react';
import React from 'react';
import settingStore from 'SettingStore';
import FiniteStateMachine, { MachineState } from "utils/FiniteStateMachine";
import Menu from './Menu';



const Binder = (props: { keys: string[], index: number }) => <Observer>{() =>
  <input style={{ textAlign: "center", width: "50px"}} 
    minLength={1} maxLength={1} 
    value={props.keys[props.index]} onChange={event => props.keys[props.index] = event.target.value} />
}</Observer>


export default class Settings implements MachineState {


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
            <td><Binder keys={settingStore.rhythmTileKeys1} index={i} /></td>
            <td><Binder keys={settingStore.rhythmTileKeys2} index={i} /></td>
          </tr>)}
          {_.range(NB_LINES).map(i => <tr>
            <th>Power line {i + 1}</th>
            <td><Binder keys={settingStore.powerLineKeys1} index={i} /></td>
            <td><Binder keys={settingStore.powerLineKeys2} index={i} /></td>
            <td></td>
          </tr>)}
        </tbody>
      </table>
    }</Observer>
    <button onClick={() => context.changeState(new Menu())}>Back</button>
    <button onClick={settingStore.resetKeys}>Reset</button>
  </div>
}
