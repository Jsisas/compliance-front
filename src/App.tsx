import ErrorBoundary from './components/InternalError/ErrorBoundary';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import React from 'react';

export function App(): JSX.Element {
	return (
		<ReduxProvider store={configureStore}>
			<Router>
				<ErrorBoundary>
					<PageLayout/>
				</ErrorBoundary>
			</Router>
		</ReduxProvider>
	);
}
