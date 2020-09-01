import * as React from 'react';
import { Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './controlConnectedItems.module.scss';
import { Requirement } from '../../redux/Requirement/RequirementSlice';

const { Text } = Typography;

interface TaskConnectedItemsProps {
	requirements?: Requirement[];
}

export function ControlConnectedItems(props: TaskConnectedItemsProps): JSX.Element {
	return (
		<>
			<Col xs={24} className={styles.connectedItem}>
				<Row gutter={[16, 16]}>
					<Col xs={24}>
						<Text style={{ fontWeight: 600 }}>Connected items</Text>
					</Col>
				</Row>
				<Row gutter={[16, 0]}>
					<Col xs={24}>
						<Text type={'secondary'}>Requirements ({props.requirements?.length})</Text>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={24} data-testid={'list'}>
						{(props.requirements || []).length > 0 ? (
							props.requirements?.map((requirement) => {
								return (
									<Link key={requirement.id} to={`/requirements/${requirement.id}`} style={{ display: 'block' }}>
										{requirement.title}
									</Link>
								);
							})
						) : (
							<span>No connected requirements</span>
						)}
					</Col>
				</Row>
			</Col>
		</>
	);
}
