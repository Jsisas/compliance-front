import { Switch, Redirect, Route } from "react-router-dom";
import React from "react";
import { NewControlPage } from "./Controls/NewControl/NewContorl";
import RegulationsPage from "./Regulations/RegulationsPage";
import { ControlsPage } from "./Controls/ControlsPage";

export function Routes() {
    return (
        <Switch>
            <Redirect exact path="/" to='/insights' />
            <Route exact path="/insights" component={RegulationsPage} />

            <Route exact path="/controls" component={ControlsPage} />
            <Route exact path="/controls/new" component={NewControlPage} />

        </Switch>
    )
}