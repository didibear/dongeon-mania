import _ from "lodash"
import { inject, observer, propTypes } from 'mobx-react'
import React, { Fragment } from "react"
import { NB_TILE_COLUMNS, NB_VISIBLE_TILES, TILE_COLORS, PLAYER_LOCK_TIME_MILLIS } from "Constant"
import { RhythmSequenceState } from "./RhythmSequenceState"
import { KeyboardState } from "utils/events/KeyboardState"
import settingStore from "SettingStore"
import { OpponentsState } from "../Opponents/OpponentsState";

// Constants


const BOARD_WIDTH = 100
const BOARD_HEIGHT = 100
const MARGIN = 1
const TILE_WIDTH = (BOARD_WIDTH - MARGIN * (NB_TILE_COLUMNS + 1)) / NB_TILE_COLUMNS

const TILE_SPAN = TILE_WIDTH + MARGIN
// const BOARD_WIDTH = NB_TILE_COLUMNS * TILE_SPAN + MARGIN * 2
const TRACK_HEIGHT = NB_VISIBLE_TILES * TILE_SPAN - MARGIN
const PROGRESS_BAR_HEIGHT = MARGIN

//////////////////////
// Components

const Background = () => <rect key="background"
  x={`${0 - MARGIN}%`} y={`${0 - MARGIN}%`}
  width={`${BOARD_WIDTH}%`} height={`${BOARD_HEIGHT}%`}
  fill="grey" />

// Tracks

const Track = (props: { numTile: number }) => (
  <rect x={`${props.numTile * TILE_SPAN}%`} y={0}
    width={`${TILE_WIDTH}%`} height={`${TRACK_HEIGHT}%`}
    fill="#AAA" />
)

const Tracks = () => <>
  {_.range(NB_TILE_COLUMNS).map((numTile) => (
    <Track key={`track ${numTile}`} numTile={numTile} />
  ))}
</>


// Tiles

const Tile = ({ numTile, position, transitionGap }: { numTile: number, position: number, transitionGap: number }) => (
  <circle cx={`${numTile * TILE_SPAN + TILE_WIDTH / 2}%`} cy={`${TRACK_HEIGHT - (position + 1) * TILE_SPAN - transitionGap + MARGIN + TILE_WIDTH / 2}%`}
    r={`${TILE_WIDTH / 3}%`}
    fill={TILE_COLORS[numTile]} />
)

const Tiles = ({ visibleTileSequence, transitionGap }: { visibleTileSequence: number[], transitionGap: number }) => <>
  {visibleTileSequence.map((numTile: number, position) => (
    <Tile key={`tile ${numTile} ${position}`} numTile={numTile} position={position} transitionGap={transitionGap} />
  ))}
</>


// HighlightTiles

const HighlightTile = ({ numTile }: { numTile: number }) => (
  <circle cx={`${numTile * TILE_SPAN + TILE_WIDTH / 2}%`} cy={`${TRACK_HEIGHT - TILE_SPAN + MARGIN + TILE_WIDTH / 2}%`}
    r={`${TILE_WIDTH / 3.5}%`}
    fill="rgb(256, 256, 256, 0.5)" />
)

const HighlightTiles = observer(({ downKeys }: { downKeys: Map<string, boolean> }) => <>
  {Array.from(downKeys.keys()).map(k => (
    <HighlightTile key={`highlight tile ${k}`} numTile={settingStore.keyIndexOf(k)} />)
  )}
</>)

const ProgressBar = ({ percent, color }: { percent: number, color: string }) => (
  <rect x={0} y={`${TRACK_HEIGHT - PROGRESS_BAR_HEIGHT}%`}
    width={`${percent * BOARD_WIDTH}%`} height={`${PROGRESS_BAR_HEIGHT}%`}
    fill={color} />
)

// Exported Component

type RhythmTilesProps = {
  keyboardState?: KeyboardState
  rhythmTileState?: RhythmSequenceState
  opponentsState?: OpponentsState
}

export default inject("keyboardState", "rhythmTileState", "opponentsState")(observer((props: RhythmTilesProps) => {
  const { keyboardState, rhythmTileState, opponentsState } = props

  const { tileSequence, currentTile, transition } = rhythmTileState!
  const { downKeys } = keyboardState!
  const { playerIsLocked, playerLockTime } = opponentsState!


  const visibleTileSequence = tileSequence.slice(currentTile, currentTile + NB_VISIBLE_TILES)
  const transitionGap = transition * TILE_SPAN

  return <div style={{ width: "40%", height: "100%", display: "inline-block" }}>
    <svg width={`${BOARD_WIDTH}%`} height={`${BOARD_HEIGHT}%`}>

      <Background />

      <svg x={`${MARGIN / 2}%`} y={`${MARGIN / 2}%`}>
        <Tracks />
        <Tiles visibleTileSequence={visibleTileSequence} transitionGap={transitionGap} />
        <HighlightTiles downKeys={downKeys} />

        {playerIsLocked && <ProgressBar percent={playerLockTime / PLAYER_LOCK_TIME_MILLIS} color="red" />}

      </svg>
    </svg>
  </div>
}))
