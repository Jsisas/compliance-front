import * as React from 'react';
import { Result } from 'antd';
import AlButton from '../../components/_ui/AlButton/AlButton';
import { RouteComponentProps } from 'react-router-dom';

export function NotFoundPage(props: RouteComponentProps): JSX.Element {
	return (
		<>
			<Result
				status='404'
				title='404'
				subTitle='Sorry, the page you visited does not exist.'
				extra={
					<AlButton type='primary' onClick={() => props.history.goBack()}>
						Go Back
					</AlButton>
				}
			/>
		</>
	);
}
