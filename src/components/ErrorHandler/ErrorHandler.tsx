import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { selectAllErrors } from '../../redux/Error/ErrorSlice';
import AlButton from '../_ui/AlButton/AlButton';
import { Result } from 'antd';
import { useHistory } from 'react-router';

export interface ErrorProps {
	children: JSX.Element;
}

export function ErrorHandler(props: ErrorProps): JSX.Element {
	const errors = useSelector((state: RootState) => selectAllErrors(state));
	const history = useHistory();

	function goHome(): void {
		window.location.assign('/');
	}

	function goBack(): void {
		history.goBack();
	}

	if (errors.length > 0) {
		const error = errors[0];

		if (error.code === 404) {
			return (
				<Result
					status='404'
					title='404'
					subTitle='Sorry, the item you are looking for cant be found.'
					extra={
						<AlButton type='primary' onClick={() => goBack()}>
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
						<AlButton type='primary' onClick={() => goHome()}>
							Back Home
						</AlButton>
					}
				/>
			);
		}
	}
	return props.children;
}
