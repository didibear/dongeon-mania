import enemy from 'assets/img/enemy.png';
import React from "react";
import Grid from 'react-css-grid';
import RhythmTilesView from "./RhythmTilesView";
import Character from './Character';

export default () => <>
  <Grid width="33%" gap={0} style={{ paddingTop: "200px" }}>
    <Character />
    <RhythmTilesView />
    <img style={{ display: "inline-block" }} src={enemy} width="80%" />

  </Grid>
</>

