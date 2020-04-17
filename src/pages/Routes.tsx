import { Switch, Redirect, Route } from "react-router-dom";
import React from "react";
import { NewControlPage } from "./Controls/NewControl/NewContorl";
import RegulationsPage from "./Regulations/RegulationsPage";
import { ControlsPage } from "./Controls/ControlsPage";
import {RequirementsPage} from "./Regulations/Requirements/RequirementsPage";

export function Routes() {
    return (
        <Switch>
            <Redirect exact path="/" to='/regulations' />
            <Route exact path="/regulations" component={RegulationsPage} />
            <Route exact path="/regulations/:id/requirements" component={RequirementsPage} />

            <Route exact path="/controls" component={ControlsPage} />
            <Route exact path="/controls/new" component={NewControlPage} />

        </Switch>
    )
}