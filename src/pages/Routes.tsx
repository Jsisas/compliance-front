import { Switch, Redirect, Route } from "react-router-dom";
import React from "react";
import { NewControlPage } from "./Controls/NewControl/NewControl";
import RegulationsPage from "./Regulations/RegulationsPage";
import { ControlsPage } from "./Controls/ControlsPage";
import {RequirementsPage} from "./Regulations/Requirements/RequirementsPage";
import {TasksPage} from "./Tasks/TasksPage";
import {ControlsDetails} from "./Controls/ControlsDetails/ControlsDetails";
import {NotFoundPage} from "./NotFound/NotFoundPage";
import {TaskDetail} from "./Tasks/TaskDetail/TaskDetail";

export function Routes() {
    return (
        <Switch>
            <Redirect exact path="/" to='/regulations' />
            <Route exact path="/regulations" component={RegulationsPage} />
            <Route exact path="/regulations/:id/requirements" component={RequirementsPage} />

            <Route exact path="/controls" component={ControlsPage} />
            <Route exact path="/controls/:id" component={ControlsDetails} />
            <Route exact path="/controls/new" component={NewControlPage} />

            <Route exact path="/tasks" component={TasksPage} />
            <Route exact path="/tasks/:id" component={TaskDetail} />
            <Route component={NotFoundPage} />
        </Switch>
    )
}