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
  @action decreasePlayerLockTime = (millis: number) => this.playerLockTime = Math.max(this.playerLockTime - millis, 0)
  
  @action startPlayerPreparationFor = (millis: number) => this.playerPreparationTime = millis
  @action decreasePlayerPreparationTime = (millis: number) => this.playerPreparationTime = Math.max(this.playerLockTime - millis, 0)



}