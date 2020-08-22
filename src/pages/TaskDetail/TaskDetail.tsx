import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { Col, Row, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons/lib';
import AlButton from '../../components/_ui/AlButton/AlButton';
import { fetchAllTasks } from '../../redux/Task/TaskService';
import { selectTaskById } from '../../redux/Task/TaskSlice';
import styles from './taskDetails.module.scss';
import { date, dateFormat } from '../../util/DateUtil';
import { AlComment } from '../../components/_ui/AlComment/AlComment';
import TextArea from 'antd/lib/input/TextArea';
import { TaskConnectedItems } from '../../components/TaskConnectedItems/TaskConnectedItems';
import { notifyError } from '../../util/NotificationUtil';
import { AlBackArrow } from '../../components/_ui/AlBackArrow/AlBackArrow';
import StringUtil from '../../util/StringUtil';
import { AlFile, AlUpload } from '../../components/_ui/AlUpload/AlUpload';
import { ApiException } from '../../components/Exceptions/ApiException';

const { Title, Text } = Typography;

export function TaskDetail(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const task = useSelector((state: RootState) => selectTaskById(state, id));

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllTasks());
	}, [dispatch]);

	if (!task) {
		throw new ApiException(404);
	}

	return (
		<>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col xs={1} xl={1}>
					<AlBackArrow/>
				</Col>
				<Col xs={{ span: 10 }} sm={10} md={10} lg={{ span: 10 }} xl={{ span: 10 }}>
					<Title style={{ marginBottom: 0 }}>{task.title}</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]} align={'bottom'}>
				<Col xs={{ span: 10, offset: 1 }} sm={10} md={10} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }}>
					<Text type={'secondary'}>{task.description}</Text>
				</Col>
				<Col
					xs={{ span: 24 }}
					sm={{ span: 6, offset: 6 }}
					md={{ span: 4, offset: 8 }}
					lg={{ span: 4, offset: 8 }}
					xl={{ span: 3, offset: 10 }}
				>
					<AlButton type={'secondary'} style={{ float: 'right' }}>
						<EllipsisOutlined/>
					</AlButton>
					<AlButton type={'secondary'} style={{ marginRight: '8px', float: 'right' }}>
						<EditOutlined/>
					</AlButton>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col
					xs={{ span: 24, offset: 1 }}
					sm={{ span: 24, offset: 1 }}
					md={{ span: 24, offset: 1 }}
					lg={{ span: 17, offset: 1 }}
					xl={{ span: 17, offset: 1 }}
				>
					<Row gutter={[16, 16]}>
						<Col xs={24} sm={24} md={24} lg={24} xl={2}>
							<Text type={'secondary'}>Status</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={2}>
							<Text type={'secondary'}>Assignee</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={3}>
							<Text type={'secondary'}>Type</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={7}>
							<Text type={'secondary'}>Due date</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={7}>
							<Text type={'secondary'}>Overdue</Text>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 17 }} xl={{ span: 2 }}>
							<Text>{StringUtil.humanizeSnakeCase(task.state || '')}</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={2}>
							<Text>
								{task.assignee.name != null ? '@' : ''}
								{task.assignee.name}
							</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={17} xl={3}>
							<Text>{StringUtil.humanizeSnakeCase(task.kind || '')}</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={6}>
							<Text>{date(task.due_at).format(dateFormat)}</Text>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={6}>
							<Text>{task.is_overdue ? 'Overdue' : 'Not overdue'}</Text>
						</Col>
					</Row>
				</Col>
				<Col
					xs={{ span: 24, offset: 1 }}
					sm={{ span: 24, offset: 1 }}
					md={{ span: 24, offset: 1 }}
					lg={{ span: 5, offset: 1 }}
					xl={{ span: 5, offset: 1 }}
				>
					<TaskConnectedItems task={task}/>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={{ span: 24, offset: 1 }} sm={24} md={24} lg={{ span: 17, offset: 1 }} xl={{ span: 17, offset: 1 }}>
					<Text className={styles.subHeader}>Description</Text>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={{ span: 24, offset: 1 }} sm={24} md={24} lg={{ span: 17, offset: 1 }} xl={{ span: 17, offset: 1 }}>
					<Text>{task.description}</Text>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={{ span: 24, offset: 1 }} sm={24} md={24} lg={{ span: 17, offset: 1 }} xl={{ span: 10, offset: 1 }}
						 style={{ height: '100%' }}>
					<AlUpload onChange={(file: AlFile[]) => console.log(file)}/>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={{ span: 10, offset: 1 }} sm={10} md={10} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }}>
					<Text>Comment</Text>
					<TextArea placeholder='Add comment'/>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={{ span: 24, offset: 1 }} sm={24} md={24} lg={{ span: 17, offset: 1 }} xl={{ span: 17, offset: 1 }}>
					<AlButton type='primary' onClick={() => notifyError('Not implemented', 'This feature is not implemented')}>
						Add comment
					</AlButton>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={{ span: 10, offset: 1 }} sm={10} md={10} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }}>
					<AlComment>
						<AlComment/>
					</AlComment>
				</Col>
			</Row>
		</>
	);
}
