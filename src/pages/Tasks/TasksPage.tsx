import * as React from 'react';
import { useEffect, useState } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import AlButton from '../../components/_ui/AlButton/AlButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { ColumnProps } from 'antd/lib/table';
import { selectAllTasks, Task } from '../../redux/Task/TaskSlice';
import { fetchAllTasks } from '../../redux/Task/TaskService';
import 'moment/locale/et';
import { date, dateFormat } from '../../util/DateUtil';
import { AddTaskModule } from '../../components/modals/AddTaskModal/AddTaskModal';
import themeStyles from './../../theme.module.scss';
import StringUtil from '../../util/StringUtil';
import { RouteComponentProps } from 'react-router';

const { Title } = Typography;

export function TasksPage(props: RouteComponentProps): JSX.Element {
	const tasks = useSelector((state: RootState) => selectAllTasks(state));
	const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);
	const isTableLoading = useSelector((state: RootState) => state.task.loading);

	function toggleModal() {
		setAddTaskModalVisible(!isAddTaskModalVisible);
	}

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllTasks());
	}, [dispatch]);
	const columns: ColumnProps<never>[] = [];

	if (tasks.length > 0) {
		columns.push({
			title: 'Title',
			dataIndex: 'title',
			key: 'id',
			render: (text: string, record: Task) => {
				return <span>{record.title}</span>;
			},
			sorter: (a: Task, b: Task) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Kind',
			dataIndex: 'kind',
			key: 'id',
			render: (text: string, record: Task) => {
				return <span>{StringUtil.humanizeSnakeCase(record.kind)}</span>;
			},
			sorter: (a: Task, b: Task) => a.kind.length - b.kind.length,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'State',
			dataIndex: 'state',
			key: 'id',
			render: (text: string, record: Task) => {
				return <span>{StringUtil.humanizeSnakeCase(record.state)}</span>;
			},
			sorter: (a: Task, b: Task) => a.state.length - b.state.length,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Due date',
			dataIndex: 'due_at',
			key: 'id',
			render: (text: string, record: Task) => {
				return <span>{date(record.due_at).format(dateFormat)}</span>;
			},
			sorter: (a: Task, b: Task) => new Date(a.due_at).valueOf() - new Date(b.due_at).valueOf(),
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Overdue',
			dataIndex: 'is_overdue',
			key: 'id',
			render: (text: string, record: Task) => {
				return <span>{record.is_overdue ? 'Overdue' : 'Not overdue'}</span>;
			},
			sorter: (a: Task, b: Task) => Number(a.is_overdue) - Number(b.is_overdue),
			sortDirections: ['descend', 'ascend'],
		});
	}

	return (
		<>
			<AddTaskModule isVisible={isAddTaskModalVisible} onClose={toggleModal} />
			<Row gutter={[16, 16]} justify={'space-between'}>
				<Col xs={24} sm={16} md={10} lg={16} xl={16} xxl={16}>
					<Title>Tasks</Title>
				</Col>
				<Col xs={24} sm={7} md={5} lg={4} xl={3} xxl={2}>
					<AlButton type='primary' style={{ width: '100%' }} onClick={() => toggleModal()}>
						Add task
					</AlButton>
				</Col>
			</Row>
			<Row gutter={[16, 16]} justify={'space-between'}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Table
						onRow={(record: Task) => {
							return {
								onClick: () => {
									props.history.push('/tasks/' + record.id);
								},
							};
						}}
						dataSource={tasks as never}
						columns={columns}
						rowKey='id'
						scroll={tasks.length < 1 ? { x: undefined } : { x: 'auto' }}
						loading={isTableLoading}
						style={{ width: '100%' }}
						className={themeStyles.antTableMousePointer}
						pagination={{ hideOnSinglePage: true }}
					/>
				</Col>
			</Row>
		</>
	);
}
