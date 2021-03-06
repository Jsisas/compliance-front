import * as React from 'react';
import { Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Task } from '../../redux/Task/TaskSlice';
import styles from './taskConnectedItems.module.scss';
import StringUtil from '../../util/StringUtil';
import { Control } from '../../redux/Control/ControlSlice';

const { Text } = Typography;

interface TaskConnectedItemsProps {
	task?: Task;
}

export function TaskConnectedItems(props: TaskConnectedItemsProps): JSX.Element {
	function renderTaskControl(control: Control | undefined): JSX.Element {
		if (control && control.id) {
			return (
				<>
					<Row gutter={[16, 0]}>
						<Col xs={24}>
							<Text type={'secondary'}>Control</Text>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col xs={24}>
							{props.task?.control?.id && (
								<Link key={props.task?.control.id} to={`/controls/${props.task?.control.id}`}>
									{StringUtil.shortenStringLength(props.task?.control.title || '', 50)}
								</Link>
							)}
						</Col>
					</Row>
				</>
			);
		} else {
			return <></>;
		}
	}

	return (
		<>
			<Col xs={24} className={styles.connectedItem}>
				<Row gutter={[16, 16]}>
					<Col xs={24}>
						<Text style={{ fontWeight: 600 }}>Connected items</Text>
					</Col>
				</Row>
				{renderTaskControl(props.task?.control)}
			</Col>
		</>
	);
}
