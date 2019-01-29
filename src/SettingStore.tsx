
import { observable, computed, action, reaction } from 'mobx'
import { DEFAULT_RHYTHM_TILE_KEYS_1, DEFAULT_RHYTHM_TILE_KEYS_2, DEFAULT_POWER_LINE_KEYS_1, DEFAULT_POWER_LINE_KEYS_2 } from 'Constant';

export class SettingStore {
  @observable rhythmTileKeys1 = DEFAULT_RHYTHM_TILE_KEYS_1
  @observable rhythmTileKeys2 = DEFAULT_RHYTHM_TILE_KEYS_2
  @observable powerLineKeys1 = DEFAULT_POWER_LINE_KEYS_1
  @observable powerLineKeys2 = DEFAULT_POWER_LINE_KEYS_2

  @action
  resetKeys = () => {
    this.rhythmTileKeys1 = DEFAULT_RHYTHM_TILE_KEYS_1
    this.rhythmTileKeys2 = DEFAULT_RHYTHM_TILE_KEYS_2

    this.powerLineKeys1 = DEFAULT_POWER_LINE_KEYS_1
    this.powerLineKeys2 = DEFAULT_POWER_LINE_KEYS_2
  }

  indexOfRhythmTileKey = (key: string) => {
    const i1 = this.rhythmTileKeys1.indexOf(key)
    const i2 = this.rhythmTileKeys2.indexOf(key)
    return i1 !== -1 ? i1 : i2
  }
  
  indexOfPowerLineKey = (key: string) => {
    const i1 = this.powerLineKeys1.indexOf(key)
    const i2 = this.powerLineKeys2.indexOf(key)
    return i1 !== -1 ? i1 : i2
  }
}

export default new SettingStore()
