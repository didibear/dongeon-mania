import { observable } from "mobx";
import { MAX_HEALTH } from "Constant";

export class OpponentsState {
  @observable playerHealthPoint = MAX_HEALTH
  @observable enemyHealthPoint = MAX_HEALTH

}