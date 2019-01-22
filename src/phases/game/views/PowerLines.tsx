import slash from "assets/img/slash.png";
import backslash from "assets/img/backslash.png";
import { NB_LINES } from "Constant";
import _ from "lodash";
import { inject, observer } from 'mobx-react';
import PowerLinesState, { SlashProgression } from "phases/game/PowerLinesState";
import React from "react";
// Constants

const MARGIN = 3
const LINE_HEIGHT = (100 - MARGIN * (NB_LINES + 1)) / NB_LINES


const PowerLines = () => <>
  {_.range(NB_LINES).map(i =>
    <rect key={"line " + i} x={0} y={`${MARGIN + i * (LINE_HEIGHT + MARGIN)}%`}
      width="100%" height={`${LINE_HEIGHT}%`}
      fill="#AAA" />)}
</>

const Slash = (props: { line: number, slash: SlashProgression, enemy: boolean }) => <image href={props.enemy ? backslash : slash}
  x={`${props.slash.progression}%`} y={`${props.line * (LINE_HEIGHT + MARGIN) + 2 * MARGIN}%`}
  height={`${LINE_HEIGHT - MARGIN * 2}%`} width="40px" />

type PowerLinesProps = {
  powerLinesState?: PowerLinesState
}

export default inject("powerLinesState")(observer(({ powerLinesState }: PowerLinesProps) => {

  return <div style={{ width: "100%", height: "80%", display: "inline-block" }}>
    <svg width="100%" height="100%">

      <PowerLines />
      {powerLinesState!.playerSlashs((line, slash) => <Slash key={`enemy slash ${line} ${slash.progression}`} line={line} slash={slash} enemy={false} />)}
      {powerLinesState!.enemySlashs((line, slash) => <Slash key={`enemy slash ${line} ${slash.progression}`} line={line} slash={slash} enemy={true} />)}
    </svg>
  </div>
}))
