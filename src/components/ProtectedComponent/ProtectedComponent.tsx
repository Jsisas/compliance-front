import React from 'react';
import {Redirect, Route} from "react-router-dom";

interface PrivateRouteProps {
    isAuthenticated: boolean;
    component: any;
    path: string;
    exact?: boolean;
}
export function PrivateRoute(props: PrivateRouteProps) {
    if(props.isAuthenticated){
        return <Route exact={props.exact || false} path={props.path} component={props.component} />
    }else{
        return <Redirect to='/login' />
    }

}