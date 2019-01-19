import _ from "lodash"
import { inject, observer } from 'mobx-react'
import React, { Fragment } from "react"
import { MARGIN, NB_TILE_COLUMNS, NB_VISIBLE_TILES, TILE_COLORS, TILE_WIDTH } from "Constant"
import RhythmTileState from "phases/game/RhythmTileState"
import { KeyboardState } from "utils/events/KeyboardState"
import settingStore from "SettingStore"

// Constants

const TILE_SPAN = TILE_WIDTH + MARGIN
const BOARD_WIDTH = NB_TILE_COLUMNS * TILE_SPAN + MARGIN * 2
const TRACK_HEIGHT = NB_VISIBLE_TILES * TILE_SPAN

//////////////////////
// Components

const Arrival = () => <rect key="arrival"
  x={0 - MARGIN} y={(NB_VISIBLE_TILES - 1) * TILE_SPAN}
  width={BOARD_WIDTH} height={TILE_SPAN + MARGIN}
  fill="grey" />

// Tracks

const Track = (props: { numTile: number }) => (
  <rect x={props.numTile * TILE_SPAN} y={0}
    width={TILE_WIDTH} height={TRACK_HEIGHT}
    fill="#AAA" />
)

const Tracks = () => <>
  {_.range(NB_TILE_COLUMNS).map((numTile) => (
    <Track key={`track ${numTile}`} numTile={numTile} />
  ))}
</>


// Tiles

const Tile = ({ numTile, position, transitionGap }: { numTile: number, position: number, transitionGap: number }) => (
  <circle cx={numTile * TILE_SPAN + TILE_WIDTH / 2} cy={TRACK_HEIGHT - (position + 1) * TILE_SPAN - transitionGap + MARGIN + TILE_WIDTH / 2}
    r={TILE_WIDTH / 3}
    fill={TILE_COLORS[numTile]} />
)

const Tiles = ({ visibleTileSequence, transitionGap }: { visibleTileSequence: number[], transitionGap: number }) => <>
  {visibleTileSequence.map((numTile: number, position) => (
    <Tile key={`tile ${numTile} ${position}`} numTile={numTile} position={position} transitionGap={transitionGap} />
  ))}
</>


// HighlightTiles

const HighlightTile = ({ numTile }: { numTile: number }) => (
  <circle cx={numTile * TILE_SPAN + TILE_WIDTH / 2} cy={TRACK_HEIGHT - TILE_SPAN + MARGIN + TILE_WIDTH / 2}
    r={TILE_WIDTH / 3.5}
    fill="rgb(256, 256, 256, 0.5)" />
)

const HighlightTiles = observer(({ downKeys }: { downKeys: Map<string, boolean> }) => <>
  {Array.from(downKeys.keys()).map(k => (
    <HighlightTile key={`highlight tile ${k}`} numTile={settingStore.keyIndexOf(k)} />)
  )}
</>)


// Exported Component

type RhythmTilesProps = {
  keyboardState?: KeyboardState
  rhythmTileState?: RhythmTileState
}

export default inject("keyboardState", "rhythmTileState")(observer((props: RhythmTilesProps) => {
  const { keyboardState, rhythmTileState } = props

  const { tileSequence, currentTile, transition } = rhythmTileState!
  const { downKeys } = keyboardState!

  const visibleTileSequence = tileSequence.slice(currentTile, currentTile + NB_VISIBLE_TILES)
  const transitionGap = transition * TILE_SPAN

  return <div style={{textAlign: "left"}}>
    <svg width={BOARD_WIDTH} height={TRACK_HEIGHT + MARGIN}>

      <Arrival />

      <svg x={MARGIN}>
        <Tracks />
        <Tiles visibleTileSequence={visibleTileSequence} transitionGap={transitionGap} />
        <HighlightTiles downKeys={downKeys} />
      </svg>
    </svg>
  </div>
}))
