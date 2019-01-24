import { observable } from "mobx";
import { MAX_HEALTH } from "Constant";

export class PlayersState {
  @observable playerHealthPoint = MAX_HEALTH
  @observable enemyHealthPoint = MAX_HEALTH

}