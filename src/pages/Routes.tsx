import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

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
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';

export function Routes(): JSX.Element {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	return (
		<Switch>
			{!isAuthenticated ? <Redirect exact path='/' to='/login' /> : <Redirect exact path='/' to='/regulations' />}

			<Route exact path='/login' component={LoginPage} />

			<PrivateRoute exact path={'/regulations'} component={RegulationsPage} />
			<PrivateRoute exact path='/regulations/:id/requirements' component={RequirementsPage} />

			<PrivateRoute exact path='/requirements/:id' component={RequirementDetailsPage} />

			<PrivateRoute exact path='/controls' component={ControlsPage} />
			<PrivateRoute exact path='/controls/new' component={UpsertControlPage} />
			<PrivateRoute exact path='/controls/edit/:id' component={UpsertControlPage} />
			<PrivateRoute exact path='/controls/:id' component={ControlsDetails} />

			<PrivateRoute exact path='/tasks' component={TasksPage} />
			<PrivateRoute exact path='/tasks/:id' component={TaskDetail} />

			<Route component={NotFoundPage} />
		</Switch>
	);
}
