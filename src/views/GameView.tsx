import background from 'assets/img/background.png';
import enemy from 'assets/img/enemy.png';
import React from "react";
import Grid from 'react-css-grid';
import RhythmTilesView from "views/RhythmTilesView";
import Character from './Character';

const backgroundStyle = {
  height: "100%",
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat'
}

export default () => <div className={"pixelize"} style={backgroundStyle}>
  <Grid width="33%" gap={0} style={{ paddingTop: "200px" }}>
    <Character />
    <RhythmTilesView />
    <img className="pixelize" style={{ display: "inline-block" }} src={enemy} width="80%" />

  </Grid>
</div>

