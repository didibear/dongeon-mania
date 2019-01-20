import _ from "lodash";
import { inject, observer } from 'mobx-react';
import RhythmTileState from "phases/game/RhythmTileState";
import React from "react";
import { KeyboardState } from "utils/events/KeyboardState";

// Constants

const NB_LINES = 3

const MARGIN = 3
const LINE_HEIGHT = (100 - MARGIN * (NB_LINES + 1)) / NB_LINES


const PowerLines = (props: any) => <>
  {_.range(NB_LINES).map(i =>
    <rect x={0} y={`${MARGIN + i * (LINE_HEIGHT + MARGIN)}%`}
      width="100%" height={`${LINE_HEIGHT}%`}
      fill="#AAA" />)}
</>

// Exported Component

type RhythmTilesProps = {
  keyboardState?: KeyboardState
  rhythmTileState?: RhythmTileState
}

export default inject("keyboardState", "rhythmTileState")(observer((props: RhythmTilesProps) => {
  const { keyboardState, rhythmTileState } = props

  return <div style={{ width: "100%", height: "80%", display: "inline-block" }}>
    <svg width="100%" height="100%">

      <PowerLines />

    </svg>
  </div>
}))
