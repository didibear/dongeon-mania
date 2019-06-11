import { MAX_HEALTH } from 'Constant'
import { action, computed, observable } from 'mobx'

export class OpponentsState {
  constructor(private enemyAttackPeriod: number) {}

  @observable playerHealthPoint = MAX_HEALTH
  @observable enemyHealthPoint = MAX_HEALTH

  @observable playerLockTime = 0
  @observable playerPreparationTime = 0
  @observable enemyAttackWillAttackTime = this.enemyAttackPeriod
  
  // VIEWS

  @computed get playerIsLocked(): boolean { return this.playerLockTime > 0 }
  @computed get playerIsPreparing(): boolean { return this.playerPreparationTime > 0 }
  @computed get enemyAttack(): boolean { return this.enemyAttackWillAttackTime == 0 }

  // ACTIONS
  
  @action decrementPlayerHP = () => this.playerHealthPoint--;
  @action decrementEnemyHP = () => this.enemyHealthPoint--;
  
  @action lockPlayerInputFor = (millis: number) => this.playerLockTime = millis
  @action startPlayerPreparationFor = (millis: number) => this.playerPreparationTime = millis
  @action stopPlayerPreparation = () => this.playerPreparationTime = 0

  @action resetEnemyAttack = () => this.enemyAttackWillAttackTime = this.enemyAttackPeriod

  @action updatePlayerTimes = (millisElapsed : number) => {
    this.playerLockTime = Math.max(this.playerLockTime - millisElapsed, 0)
    this.playerPreparationTime = Math.max(this.playerPreparationTime - millisElapsed, 0)
  }
  
  @action updateEnemyTimes = (millisElapsed : number) => {
    this.enemyAttackWillAttackTime = Math.max(this.enemyAttackWillAttackTime - millisElapsed, 0)
  }
}