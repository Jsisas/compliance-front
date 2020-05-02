import {Switch, Redirect, Route, useHistory} from "react-router-dom";
import React from "react";
import {NewControlPage} from "./NewControl/NewControl";
import RegulationsPage from "./Regulations/RegulationsPage";
import {ControlsPage} from "./Controls/ControlsPage";
import {RequirementsPage} from "./Requirements/RequirementsPage";
import {TasksPage} from "./Tasks/TasksPage";
import {ControlsDetails} from "./ControlsDetails/ControlsDetails";
import {NotFoundPage} from "./NotFound/NotFoundPage";
import {TaskDetail} from "./TaskDetail/TaskDetail";
import {EditControlPage} from "./EditControl/EditControl";
import {LoginPage} from "./Login/LoginPage";
import {PrivateRoute} from "../components/ProtectedComponent/ProtectedComponent";
import {isCurrentUserAuthenticated} from "../util/AuthUtil";

interface RoutesProps {
    isAuthenticated: boolean;
}

export function Routes(props: RoutesProps) {
    const history = useHistory()

    return (
        <Switch>
            {!isCurrentUserAuthenticated() ?
            <Redirect exact path="/" to='/login'/> :
            <Redirect exact path="/" to='/regulations'/>
            }

            <Route exact path="/login" component={LoginPage}/>

            <PrivateRoute isAuthenticated={props.isAuthenticated} path={"/regulations"} component={RegulationsPage}/>
            <PrivateRoute isAuthenticated={props.isAuthenticated} exact path="/regulations/:id/requirements"
                          component={RequirementsPage}/>

            <PrivateRoute isAuthenticated={props.isAuthenticated} exact path="/controls" component={ControlsPage}/>
            <PrivateRoute isAuthenticated={props.isAuthenticated} exact path="/controls/new"
                          component={NewControlPage}/>
            <PrivateRoute isAuthenticated={props.isAuthenticated} exact path="/controls/edit/:id"
                          component={EditControlPage}/>
            <PrivateRoute isAuthenticated={props.isAuthenticated} exact path="/controls/:id"
                          component={ControlsDetails}/>

            <PrivateRoute isAuthenticated={props.isAuthenticated} exact path="/tasks" component={TasksPage}/>
            <PrivateRoute isAuthenticated={props.isAuthenticated} exact path="/tasks/:id" component={TaskDetail}/>

            <Route component={NotFoundPage}/>
        </Switch>
    )
}