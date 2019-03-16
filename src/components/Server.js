import React from "react";
import { Card, CardHeader, CardContent, CardActions, Typography, FormGroup, FormControlLabel, Switch, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, Grid, } from "@material-ui/core"

const AliveToggleSwitch = ({ isActive, toggleActive }) =>
    <FormGroup>
        <FormControlLabel
            control={<Switch color="primary" checked={isActive} onChange={toggleActive} />}
            label={`${isActive ? 'Alive' : 'Dead'}`}
        />
    </FormGroup>

const Service = ({ name, isActive, created, updated }) => <ListItem dense>
    <Grid container >
        <Grid item xs={12}>
            <Typography gutterBottom color="textPrimary">{name}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography gutterBottom color="textSecondary">Created: {created}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography gutterBottom color="textSecondary">Last activity: {updated}</Typography>
        </Grid>
        <Grid item xs={12}>
            <AliveToggleSwitch isActive={isActive} toggleActive={() => { }} />
        </Grid>
    </Grid>
</ListItem>

export default function ServerCard({ name, host, ip_address, isActive, services, created, updated, toggleActive = () => { } }) {
    return (
        <React.Fragment>
            <Card>
                <CardHeader><Typography component="h4" variant="h4">Server {host.toUpperCase()}</Typography></CardHeader>
                <CardContent>
                    <Typography component="h5" variant="h5">{name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{host}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{ip_address}</Typography>
                    {/* <Typography variant="subtitle2" color="textSecondary">{created}</Typography> */}
                    <Typography variant="subtitle2" color="textSecondary">{updated}</Typography>

                    <ExpansionPanel>
                        <ExpansionPanelSummary>Services</ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List style={{ height: "115px", overflow: "auto" }}>
                                {services.map((service, idx) => <Service key={`service-${idx}`} {...service} />)}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>

                <CardActions>
                    <AliveToggleSwitch isActive={isActive} toggleActive={toggleActive} />
                </CardActions>
            </Card>
        </React.Fragment>
    );
}