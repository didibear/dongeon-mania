import attack1 from 'assets/img/attack1.png';
import attack2 from 'assets/img/attack2.png';
import attack3 from 'assets/img/attack3.png';
import character from 'assets/img/character.png';
import eventBus from "utils/events/EventBus";
import React from "react";
import SpriteAnimations from "../../../utils/views/SpriteAnimations";
import { observable } from 'mobx';
import { MAX_HEALTH } from 'Constant';
import _ from 'lodash';

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

