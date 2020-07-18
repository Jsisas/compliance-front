import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserSearch } from '../../components/AssigneeSearch/AssigneeSearch';
import { Col, Input, Row, Table, Tag, Typography } from 'antd';
import { RootState } from '../../redux/reducer';
import { Control, selectAllControls } from '../../redux/Control/ControlSlice';
import { fetchAllControls } from '../../redux/Control/ControlService';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import AlButton from '../../components/_ui/AlButton/AlButton';
import style from './controlsPage.module.scss';
import { Task } from '../../redux/Task/TaskSlice';
import themeStyles from './../../theme.module.scss';
import { User } from '../../redux/User/UserSlice';
import StringUtil from '../../util/StringUtil';
import * as H from 'history';
import { concatStyles } from '../../util/StyleUtil';

const { Title } = Typography;

interface ControlsPageProps {
	history: H.History;
}

export function ControlsPage(props: ControlsPageProps): JSX.Element {
	const controls = useSelector((state: RootState) => selectAllControls(state));
	const isControlsLoading = useSelector(
		(state: RootState) => state.control.loading
	);

	const [tableSearchText, setTableSearchText] = useState<string>();
	const [selectedUser, setSelectedUser] = useState<User>();
	const filteredControls = getFilteredControls(tableSearchText || '');

	function getFilteredControls(searchTerm: string) {
		const filteredControls = controls.filter((c) =>
			c.title.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (selectedUser) {
			return filteredControls.filter(
				(c) => c.assignee.name === selectedUser?.name
			);
		} else {
			return filteredControls;
		}
	}

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllControls());
	}, [dispatch]);
	const columns: ColumnProps<never>[] = [];

	function addTask(record: Control, text: string) {
		console.log(record);
		console.log(text);
	}

	if (controls.length > 0) {
		columns.push({
			title: 'Title',
			dataIndex: 'name',
			key: 'id',
			render: (text: string, record: Control) => {
				return <span>{record.title}</span>;
			},
		});
		columns.push({
			title: 'Status',
			dataIndex: 'status',
			key: 'id',
			render: (text: string, record: Control) => {
				return <span>{StringUtil.humanizeSnakeCase(record.state)}</span>;
			},
		});
		columns.push({
			title: 'Category',
			dataIndex: 'category',
			key: 'id',
			render: (text: string, record: Control) => {
				return <span>{StringUtil.humanizeSnakeCase(record.kind)}</span>;
			},
		});
		columns.push({
			title: 'Owner',
			dataIndex: 'assignee',
			key: 'id',
			render: (text: string, record: Control) => {
				return <span>{record.assignee?.name}</span>;
			},
		});
		columns.push({
			title: 'Tasks',
			dataIndex: 'tasks',
			key: 'id',
			render: (text: string, record: Control) => {
				return (
					<div className={style.addTaskButton}>
						{record.tasks?.length < 1
							? 'No tasks'
							: record.tasks?.map((task: Task) => {
									return (
										<Tag
											key={task.id}
											className={concatStyles(style.primaryTag, style.taskTag)}
										>
											{task.title}
										</Tag>
									);
							  })}
					</div>
				);
			},
		});
		columns.push({
			title: '',
			dataIndex: 'addTask',
			key: 'id',
			render: (text: string, record: Control) => {
				return (
					<AlButton type='primary' onClick={() => addTask(record, text)}>
						<PlusOutlined />
					</AlButton>
				);
			},
		});
	}

	function filterByUser(users: User[]) {
		if (users.length > 0) {
			setSelectedUser(users[0]);
		}
	}

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={24}>
					<Title>Controls</Title>
				</Col>
			</Row>

			<Row gutter={[16, 32]}>
				<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
					<Input
						placeholder='Search by title'
						onChange={(event) => {
							setTableSearchText(event.target.value);
						}}
						suffix={<SearchOutlined />}
					/>
				</Col>
				<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
					<UserSearch placeholder='Filter by owner' onChange={filterByUser} />
				</Col>
				<Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={2} offset={9}>
					<Link to='/controls/new'>
						<AlButton type={'primary'} style={{ width: '100%' }}>
							Add Control
						</AlButton>
					</Link>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Table
						onRow={(record: Control) => {
							return {
								onClick: () => {
									props.history.push('/controls/' + record.id);
								},
							};
						}}
						dataSource={filteredControls as never[]}
						columns={columns}
						rowKey='id'
						scroll={controls.length < 1 ? { x: undefined } : { x: 340 }}
						loading={isControlsLoading}
						style={{ width: '100%' }}
						pagination={{ hideOnSinglePage: true }}
						className={themeStyles.antTableMousePointer}
					/>
				</Col>
			</Row>
		</>
	);
}
