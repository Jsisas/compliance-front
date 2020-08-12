import { deepRender } from '../../util/test/TestUtil';
import React from 'react';
import { PrivateRoute } from './PrivateRoute';
import { screen } from '@testing-library/react';
import { testUsers } from '../../util/test/data/TestUsers';

const initialAuthentication = { token: 'asd', user: testUsers[0] };

function TestComponent() {
	return <div>Test Component</div>;
}

describe('<PrivateRoute />', () => {
	beforeEach(() => {
		localStorage.setItem('auth', JSON.stringify(initialAuthentication));
	});

	it('it matches a snapshot', () => {
		const [history, element] = deepRender(<PrivateRoute component={TestComponent} path={'/'} exact={true} />, {
			auth: [initialAuthentication],
		});
		expect(element).toMatchSnapshot();
	});

	it('it shows component when logged in', () => {
		const [history] = deepRender(<PrivateRoute component={TestComponent} path={'/'} exact={true} />, {
			auth: [initialAuthentication],
		});
		expect(history.location.pathname).toBe('/');
		expect(screen.getByText('Test Component')).toBeInTheDocument();
	});

	it('it shows login screen when not logged in', () => {
		localStorage.clear();
		const [history] = deepRender(<PrivateRoute component={TestComponent} path={'/'} exact={true} />);
		expect(history.location.pathname).toBe('/login');
		expect(screen.queryByText('Test Component')).not.toBeInTheDocument();
	});
});
