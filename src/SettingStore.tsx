
import { observable, computed, action, reaction } from 'mobx'
import { DEFAULT_GAME_KEYS_1, DEFAULT_GAME_KEYS_2 } from 'Constant';

export class SettingStore {
  @observable gameKeys1 = DEFAULT_GAME_KEYS_1
  @observable gameKeys2 = DEFAULT_GAME_KEYS_2

  keyIndexOf = (key: string) => {
    const i1 = this.gameKeys1.indexOf(key)
    const i2 = this.gameKeys2.indexOf(key)
    return i1 !== -1 ? i1 : i2
  }
}

export default new SettingStore()
