import React, {ErrorInfo} from 'react';
import {Result} from 'antd';
import AlButton from '../_ui/AlButton/AlButton';
import {RouteComponentProps} from 'react-router';

type state = { hasError: boolean };

type HasError = { hasError: boolean }

class ErrorBoundary extends React.Component<any, state> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.state = {hasError: false};
	}

	goBack(): void {
		this.props.history.goBack();
	}

	static getDerivedStateFromError(error: Error): HasError {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): HasError {
		// You can also log the error to an error reporting service
		//logErrorToMyService(error, errorInfo);
		return {hasError: true};
	}

	render(): React.ReactNode {
		console.log('Error:' + this.state.hasError);

		if (this.state.hasError) {
			return <Result
				status="500"
				title="500"
				subTitle="Sorry, something went wrong."
				extra={<AlButton type="primary" onClick={() => window.location.assign('/')}>Back Home</AlButton>}
			/>;
		} else {
			return this.props.children;
		}
	}

}

export default ErrorBoundary;
