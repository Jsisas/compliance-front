import { Switch, Redirect, Route } from "react-router-dom";
import React from "react";
import InsightsPage from "../../pages/Insights/InsightsPage";
import { ControlsPage } from "../../pages/Controls/ControlsPage";

export function Routes() {
    return (
        <Switch>
            <Redirect exact path="/" to='/insights' />
            <Route exact path="/insights" component={InsightsPage} />
            <Route exact path="/controls" component={ControlsPage} />
        </Switch>
    )
}