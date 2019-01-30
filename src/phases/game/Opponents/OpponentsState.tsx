import { observable, action, computed } from "mobx";
import { MAX_HEALTH } from "Constant";

export class OpponentsState {
  @observable playerHealthPoint = MAX_HEALTH
  @observable enemyHealthPoint = MAX_HEALTH

  @observable playerLockTime = 0
  @observable playerPreparationTime = 0
  
  // VIEWS

  @computed get playerIsLocked(): boolean { return this.playerLockTime > 0 }
  @computed get playerIsPreparing(): boolean { return this.playerPreparationTime > 0 }

  // ACTIONS
  
  @action decrementPlayerHP = () => this.playerHealthPoint--;
  @action decrementEnemyHP = () => this.enemyHealthPoint--;
  
  @action lockPlayerInputFor = (millis: number) => this.playerLockTime = millis
  @action startPlayerPreparationFor = (millis: number) => this.playerPreparationTime = millis
  @action stopPlayerPreparation = () => this.playerPreparationTime = 0

  @action updateTimes = (millisElapsed : number) => {
    this.playerLockTime = Math.max(this.playerLockTime - millisElapsed, 0)
    this.playerPreparationTime = Math.max(this.playerPreparationTime - millisElapsed, 0)
  }
}