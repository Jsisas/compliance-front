import { Result } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import AlButton from '../_ui/AlButton/AlButton';

type state = { hasError: boolean };

type HasError = { hasError: boolean };

class ErrorBoundary extends React.Component<any, state> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.state = { hasError: false };
	}

	goBack(): void {
		this.props.history.goBack();
	}

	static getDerivedStateFromError(): HasError {
		return { hasError: true };
	}

	componentDidCatch(): HasError {
		return { hasError: true };
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return (
				<Result
					status='500'
					title='500'
					subTitle='Sorry, something went wrong.'
					extra={
						<AlButton type='primary' onClick={() => window.location.assign('/')}>
							Back Home
						</AlButton>
					}
				/>
			);
		} else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;
