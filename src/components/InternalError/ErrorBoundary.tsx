import { Result } from 'antd';
import React, { ErrorInfo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import AlButton from '../_ui/AlButton/AlButton';
import { ApiException } from '../Exceptions/ApiException';

type state = { code: number };

type HasError = { code: number };

class ErrorBoundary extends React.Component<any, state> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.goHome = this.goHome.bind(this);
		this.state = { code: 200 };
	}

	goHome(): void {
		window.location.assign('/');
	}

	goBack(): void {
		this.props.history.goBack();
	}

	static getDerivedStateFromError(error: ApiException): HasError {
		return { code: Number(error.message) };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): HasError {
		console.log(error);

		return { code: Number(error.message) };
	}

	render(): React.ReactNode {
		if (this.state.code !== 200) {
			if (this.state.code === 404) {
				return (
					<Result
						status='404'
						title='404'
						subTitle='Sorry, the item you are looking for cant be found.'
						extra={
							<AlButton type='primary' onClick={() => this.goBack()}>
								Go Back
							</AlButton>
						}
					/>
				);
			} else {
				return (
					<Result
						status='500'
						title='500'
						subTitle='Sorry, something went wrong.'
						extra={
							<AlButton type='primary' onClick={() => this.goHome()}>
								Back Home
							</AlButton>
						}
					/>
				);
			}
		} else {
			return this.props.children;
		}
	}
}

export default withRouter(ErrorBoundary as any);
