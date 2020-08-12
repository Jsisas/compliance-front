import { deepRender } from '../../util/test/TestUtil';
import { screen } from '@testing-library/react';
import React from 'react';
import { testUsers } from '../../util/test/data/TestUsers';
import { PageLayout } from './PageLayout';

const initialAuthentication = { token: 'asd', user: testUsers[0] };

describe('<PageLayout />', () => {
	beforeEach(() => {
		localStorage.setItem('auth', JSON.stringify(initialAuthentication));
	});

	it('it matches a snapshot', () => {
		const [history, element] = deepRender(<PageLayout />, { auth: [initialAuthentication] });
		expect(element).toMatchSnapshot();
	});

	it('it can log out', () => {
		const [history] = deepRender(<PageLayout />, { auth: [initialAuthentication] });

		const profilePicture = screen.getByAltText('Avatar');
		profilePicture.click();

		const logoutButton = screen.getByText('Log out');
		logoutButton.click();
		expect(localStorage.getItem('auth')).toBeNull();
		expect(history.location.pathname).toBe('/login');
	});

	it('it highlights correct menu item on load', () => {
		deepRender(<PageLayout />, { auth: [initialAuthentication] });
		const overviewMenuItem = screen.getByText('Overview');
		expect(overviewMenuItem.parentElement).toHaveClass('ant-menu-item-selected');
	});

	it('it highlights correct menu item on click', () => {
		deepRender(<PageLayout />, { auth: [initialAuthentication] });
		const controlsMenuItem = screen.getByText('Controls');
		expect(controlsMenuItem.parentElement).not.toHaveClass('ant-menu-item-selected');
		controlsMenuItem.click();
		expect(controlsMenuItem.parentElement).toHaveClass('ant-menu-item-selected');
	});

	it('it hides side menu when on login page', () => {
		const [history, wrappedElement] = deepRender(<PageLayout />, undefined, '/login');
		expect(history.location.pathname).toBe('/login');

		expect(wrappedElement.queryByText('Overview')).not.toBeInTheDocument();
		expect(wrappedElement.getByText('Login')).toBeInTheDocument();
	});

	it('it hides side menu when user not logged in', () => {
		localStorage.clear();
		deepRender(<PageLayout />);
		expect(screen.queryByText('Overview')).not.toBeInTheDocument();
		expect(screen.getByText('Login')).toBeInTheDocument();
	});
});
