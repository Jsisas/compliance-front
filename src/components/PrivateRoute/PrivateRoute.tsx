import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

interface PrivateRouteProps {
	component: (props: RouteComponentProps) => JSX.Element;
	path: string;
	exact?: boolean;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	if (isAuthenticated) {
		return <Route exact={props.exact || false} path={props.path} component={props.component} />;
	} else {
		return <Redirect to='/login' />;
	}
}
