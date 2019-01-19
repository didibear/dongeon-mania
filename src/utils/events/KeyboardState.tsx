
import { observable, computed, action, reaction } from 'mobx'

export class KeyboardState {
  @observable downKeys: Map<string, boolean> = new Map()
}
