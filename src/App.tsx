import ErrorBoundary from './components/InternalError/ErrorBoundary';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import React from 'react';
import { ErrorHandler } from './components/ErrorHandler/ErrorHandler';

export function App(): JSX.Element {
	return (
		<Router>
			<ErrorBoundary>
				<ReduxProvider store={configureStore}>
					<ErrorHandler>
						<PageLayout />
					</ErrorHandler>
				</ReduxProvider>
			</ErrorBoundary>
		</Router>
	);
}
