
import React from "react";
import StackedComponents from "./StackedComponents";
import Visible from "./Visible";
import { EventBus } from 'utils/events/EventBus'
import Spritesheet from 'react-responsive-spritesheet';

/////////////////////
// PROPS

type Animation = {
  image: string
  steps: number
  fps: number
}

type InstantAnimationProps = Animation & {
  when: string
}

type Props = {
  eventBus: EventBus
  widthFrame: number
  heightFrame: number

  children: {
    mainAnimation: Animation,
    instantAnimations: InstantAnimationProps[],
  }

  style?: React.CSSProperties
}


/////////////////////
// STATE

type Spritesheet = {
  play(): void
  pause(): void
  goToAndPlay(frame: number): void
}

type State = {
  mainAnimation?: Spritesheet
  instantAnimations: Map<InstantAnimationProps, Spritesheet>
  currentAnimation?: Spritesheet
}

export default class SpriteAnimations extends React.Component<Props, State> {
  state: State = { instantAnimations: new Map() }
  eventHandlers: { topic: string, callback: (() => void) }[] = []

  componentDidMount = () => {
    this.props.children.instantAnimations.forEach(animationProps => {
      const startInstantAnimation = () => this.startInstantAnimation(animationProps);
      this.props.eventBus.subscribe(animationProps.when, startInstantAnimation)
      this.eventHandlers.push({ topic: animationProps.when, callback: startInstantAnimation })
    })
  }

  componentWillUnmount = () => {
    this.eventHandlers.forEach(handler => this.props.eventBus.unsubscribe(handler.topic, handler.callback))
  }

  private startInstantAnimation = (animationProps: InstantAnimationProps): void => {
    if (this.state.currentAnimation != this.state.mainAnimation) return

    const animation = this.state.instantAnimations.get(animationProps)

    this.state.mainAnimation!.pause()
    animation!.goToAndPlay(0)

    this.setState(() => ({ currentAnimation: animation }))
  }

  private stopInstantAnimation = (animationProps: InstantAnimationProps): void => {
    const animation = this.state.instantAnimations.get(animationProps)

    animation!.pause()
    this.state.mainAnimation!.play();

    this.setState(() => ({ currentAnimation: this.state.mainAnimation }))
  }

  render = () => {
    const mainAnim = this.props.children.mainAnimation;

    return (
      <StackedComponents>
        <Visible when={this.state.currentAnimation == this.state.mainAnimation}>
          <Spritesheet widthFrame={this.props.widthFrame} heightFrame={this.props.heightFrame}
            image={mainAnim.image} steps={mainAnim.steps} fps={mainAnim.fps}
            loop={true} autoplay={true}
            getInstance={(spritesheet: Spritesheet) => this.setState(() => ({ mainAnimation: spritesheet, currentAnimation: spritesheet }))} />
        </Visible>

        {this.props.children.instantAnimations.map((anim, i) => (

          <Visible key={i} when={this.state.currentAnimation == this.state.instantAnimations.get(anim)}>
            <Spritesheet widthFrame={this.props.widthFrame} heightFrame={this.props.heightFrame}
              image={anim.image} steps={anim.steps} fps={anim.fps}
              loop={true} getInstance={(spritesheet: Spritesheet) => this.state.instantAnimations.set(anim, spritesheet)}
              onLoopComplete={() => this.stopInstantAnimation(anim)} />
          </Visible>
        ))}

      </StackedComponents>
    )
  }
}

