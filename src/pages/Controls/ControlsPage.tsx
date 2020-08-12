import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Table, Tag, Typography } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import * as H from 'history';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AlButton from '../../components/_ui/AlButton/AlButton';
import { UserSearch } from '../../components/_ui/SearchSelect/UserSearch/UserSearch';
import { fetchAllControls } from '../../redux/Control/ControlService';
import { Control, ControlStatus, ControlType, selectAllControls } from '../../redux/Control/ControlSlice';
import { RootState } from '../../redux/reducer';
import { Task } from '../../redux/Task/TaskSlice';
import { User } from '../../redux/User/UserSlice';
import StringUtil from '../../util/StringUtil';
import { concatStyles } from '../../util/StyleUtil';
import themeStyles from './../../theme.module.scss';
import style from './controlsPage.module.scss';

const { Title } = Typography;
const { Option } = Select;

interface ControlsPageProps {
	history: H.History;
}

export function ControlsPage(props: ControlsPageProps): JSX.Element {
	const controls = useSelector((state: RootState) => selectAllControls(state));
	const isControlsLoading = useSelector((state: RootState) => state.control.loading);

	const [tableSearchText, setTableSearchText] = useState<string>();
	const [selectedUser, setSelectedUser] = useState<User>();
	const [selectedCategory, setSelectedCategory] = useState<ControlType>();
	const [selectedStatus, setSelectedStatus] = useState<ControlStatus>();
	const filteredControls = getFilteredControls();

	function getFilteredControls() {
		return controls.filter(titleFilter).filter(userFilter).filter(categoryFilter).filter(statusFilter);
	}

	function titleFilter(control: Control) {
		if (tableSearchText) {
			return control.title.toLowerCase().includes(tableSearchText.toLowerCase());
		} else {
			return true;
		}
	}

	function userFilter(control: Control) {
		if (selectedUser) {
			return control.assignee.name === selectedUser?.name;
		} else {
			return true;
		}
	}

	function categoryFilter(control: Control) {
		if (selectedCategory) {
			return control.kind === selectedCategory;
		} else {
			return true;
		}
	}

	function statusFilter(control: Control) {
		if (selectedStatus) {
			return control.state === selectedStatus;
		} else {
			return true;
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
			sorter: (a: Control, b: Control) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Status',
			dataIndex: 'status',
			key: 'id',
			render: (text: string, record: Control) => {
				return <span>{StringUtil.humanizeSnakeCase(record.state)}</span>;
			},
			sorter: (a: Control, b: Control) => a.state.length - b.state.length,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Category',
			dataIndex: 'category',
			key: 'id',
			render: (text: string, record: Control) => {
				return <span>{StringUtil.humanizeSnakeCase(record.kind)}</span>;
			},
			sorter: (a: Control, b: Control) => a.kind.length - b.kind.length,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Owner',
			dataIndex: 'assignee',
			key: 'id',
			render: (text: string, record: Control) => {
				return <span>{record.assignee?.name}</span>;
			},
			sorter: (a: Control, b: Control) => (a.assignee.name?.length || 0) - (b.assignee.name?.length || 0),
			sortDirections: ['descend', 'ascend'],
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
											onClick={(event: React.MouseEvent) => {
												event.stopPropagation();
												props.history.push('/tasks/' + task.id);
											}}
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

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={24}>
					<Title>Controls</Title>
				</Col>
			</Row>

			<Row gutter={[16, 32]}>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
					<Input
						placeholder='Search by title'
						onChange={(event) => {
							setTableSearchText(event.target.value);
						}}
						suffix={<SearchOutlined />}
					/>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
					<UserSearch
						placeholder='Filter by owner'
						onChange={(user) => setSelectedUser(user || undefined)}
						allowClear={true}
					/>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
					<Select
						style={{ width: '100%' }}
						placeholder='Filter by category'
						allowClear
						onChange={(value: ControlType) => setSelectedCategory(value)}
					>
						{Object.values(ControlType).map((type) => {
							return (
								<Option value={type} key={type}>
									{StringUtil.humanizeSnakeCase(type)}
								</Option>
							);
						})}
					</Select>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
					<Select
						style={{ width: '100%' }}
						placeholder='Filter by status'
						allowClear
						onChange={(value: ControlStatus) => setSelectedStatus(value)}
					>
						{Object.values(ControlStatus).map((status) => {
							return (
								<Option value={status} key={status}>
									{StringUtil.humanizeSnakeCase(status)}
								</Option>
							);
						})}
					</Select>
				</Col>
				<Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={2} offset={6}>
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
								onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
									event.stopPropagation();
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
