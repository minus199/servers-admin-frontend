import React from 'react';
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from '@material-ui/core';

const SpaceFiller = () => <div style={{ flexGrow: 1 }} />

function MainBar(props) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Servers Admin
                </Typography>

                <SpaceFiller />

                <FormControlLabel
                    value="filterIsAlive"
                    checked={props.filterBy === "filterIsAlive"}
                    onChange={() => props.handleChangeFilter('filterIsAlive')}
                    control={<Checkbox />}
                    label="Filter by is alive"
                    labelPlacement="start"
                />

                <SpaceFiller />

                <FormControlLabel
                    value="sortDateCreated"
                    checked={props.sortBy === "sortDateCreated"}
                    onChange={() => props.handleChangeSorted('sortDateCreated')}
                    control={<Checkbox />}
                    label="Sort by date created"
                    labelPlacement="start"
                />

                <SpaceFiller />

                <div>
                    <h5>Last update: {props.lastUpdate}</h5>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default MainBar;