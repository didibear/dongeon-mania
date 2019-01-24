import attack1 from 'assets/img/attack1.png';
import attack2 from 'assets/img/attack2.png';
import attack3 from 'assets/img/attack3.png';
import character from 'assets/img/character.png';
import emptyHeart from "assets/img/empty_heart.png";
import enemy from 'assets/img/enemy.png';
import filledHeart from "assets/img/filled_heart.png";
import { MAX_HEALTH } from 'Constant';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';
import React from "react";
import eventBus from "utils/events/EventBus";
import SpriteAnimations from "../../../utils/views/SpriteAnimations";
import { OpponentsState } from './OpponentsState';


export const PlayerSprite = () => <SpriteAnimations eventBus={eventBus} widthFrame={50} heightFrame={36}>
  {{
    mainAnimation: { image: character, steps: 4, fps: 4 },
    instantAnimations: [
      { when: "ANIMATE_ATTACK_1", image: attack1, steps: 7, fps: 30, },
      { when: "ANIMATE_ATTACK_2", image: attack2, steps: 4, fps: 30, },
      { when: "ANIMATE_ATTACK_3", image: attack3, steps: 6, fps: 30, }
    ]
  }}
</SpriteAnimations>

export class EnemySprite extends React.Component {
  state = { hide: false }

  componentDidMount = () => {
    _.range(1, 4).forEach(i => eventBus.subscribe("ANIMATE_ATTACK_" + i, this.wink));
  }

  wink = () => {
    this.setState({ hide: true })
    setTimeout(() => this.setState({ hide: false }), 100)
    setTimeout(() => this.setState({ hide: true }), 200)
    setTimeout(() => this.setState({ hide: false }), 300)
  }

  render = () => !this.state.hide && <img style={{ display: "inline-block" }} src={enemy} width="80%" />
}


const HealthPoints = (props: { hp: number }) => <div>
  {_.range(MAX_HEALTH).map(i => <img src={props.hp > i ? filledHeart : emptyHeart} width={`${100 / MAX_HEALTH}%`} />)}
</div>


export const PlayerLife = inject("opponentsState")(observer((props: { opponentsState?: OpponentsState }) =>
  <HealthPoints hp={props.opponentsState!.playerHealthPoint} />
))

export const EnemyLife = inject("opponentsState")(observer((props: { opponentsState?: OpponentsState }) =>
  <HealthPoints hp={props.opponentsState!.enemyHealthPoint} />
))



