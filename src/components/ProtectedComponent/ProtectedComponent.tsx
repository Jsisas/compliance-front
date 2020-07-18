import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

interface PrivateRouteProps {
	isAuthenticated: boolean;
	component: (props: RouteComponentProps) => JSX.Element;
	path: string;
	exact?: boolean;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
	if (props.isAuthenticated) {
		return <Route exact={props.exact || false} path={props.path} component={props.component} />;
	} else {
		return <Redirect to='/login' />;
	}
}
