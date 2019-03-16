import React from "react";

import ServerCard from "./Server";
import { Grid } from "@material-ui/core";

const NUM_COLS_PER_CARD = 3;
const SPACING_BETWEEN_CARDS = 40;

function ServerList(props) {
  const serverCards = props.servers.map((server, idx) =>
    <Grid hidden={props.filterBy && props.filterBy === 'filterIsAlive' && !server.isActive} key={`server-${idx}`} item md={NUM_COLS_PER_CARD}>
      <ServerCard {...server} toggleActive={props.handleToggleServerStatus.bind(null, server, idx)} />
    </Grid>
  );

  return (
    <Grid container style={{ position: "relative", top: "75px" }} spacing={SPACING_BETWEEN_CARDS}>{serverCards}</Grid>
  );
}


export default ServerList;