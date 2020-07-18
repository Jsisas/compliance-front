import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from '../components/ProtectedComponent/ProtectedComponent';
import { AuthUtil } from '../util/AuthUtil';
import { ControlsPage } from './Controls/ControlsPage';
import { ControlsDetails } from './ControlsDetails/ControlsDetails';
import { LoginPage } from './Login/LoginPage';
import { NotFoundPage } from './NotFound/NotFoundPage';
import RegulationsPage from './Regulations/RegulationsPage';
import { RequirementsPage } from './Requirements/RequirementsPage';
import { RequirementDetailsPage } from './RequirementsDetails/RequirementDetailsPage';
import { TaskDetail } from './TaskDetail/TaskDetail';
import { TasksPage } from './Tasks/TasksPage';
import { UpsertControlPage } from './UpsertControl/UpsertControl';

interface RoutesProps {
	isAuthenticated: boolean;
}

export function Routes(props: RoutesProps): JSX.Element {
	return (
		<Switch>
			{!AuthUtil.isCurrentUserAuthenticated() ? (
				<Redirect exact path='/' to='/login' />
			) : (
				<Redirect exact path='/' to='/regulations' />
			)}

			<Route exact path='/login' component={LoginPage} />

			<PrivateRoute isAuthenticated={props.isAuthenticated} exact path={'/regulations'} component={RegulationsPage} />
			<PrivateRoute
				isAuthenticated={props.isAuthenticated}
				exact
				path='/regulations/:id/requirements'
				component={RequirementsPage}
			/>

			<PrivateRoute
				isAuthenticated={props.isAuthenticated}
				exact
				path='/requirements/:id'
				component={RequirementDetailsPage}
			/>

			<PrivateRoute isAuthenticated={props.isAuthenticated} exact path='/controls' component={ControlsPage} />
			<PrivateRoute isAuthenticated={props.isAuthenticated} exact path='/controls/new' component={UpsertControlPage} />
			<PrivateRoute
				isAuthenticated={props.isAuthenticated}
				exact
				path='/controls/edit/:id'
				component={UpsertControlPage}
			/>
			<PrivateRoute isAuthenticated={props.isAuthenticated} exact path='/controls/:id' component={ControlsDetails} />

			<PrivateRoute isAuthenticated={props.isAuthenticated} exact path='/tasks' component={TasksPage} />
			<PrivateRoute isAuthenticated={props.isAuthenticated} exact path='/tasks/:id' component={TaskDetail} />

			<Route component={NotFoundPage} />
		</Switch>
	);
}
