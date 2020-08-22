import * as React from 'react';
import { useEffect } from 'react';
import { Col, Dropdown, Menu, Row, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons/lib';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';
import { Requirement, selectRequirementById } from '../../redux/Requirement/RequirementSlice';
import AlButton from '../../components/_ui/AlButton/AlButton';
import { fetchRequirementById } from '../../redux/Requirement/RequirementService';
import { AlBackArrow } from '../../components/_ui/AlBackArrow/AlBackArrow';
import { ColumnProps } from 'antd/lib/table';
import { Control } from '../../redux/Control/ControlSlice';
import { ApiException } from '../../components/Exceptions/ApiException';

const { Title, Text } = Typography;

export function RequirementDetailsPage(props: RouteComponentProps): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const requirement = useSelector((state: RootState) => selectRequirementById(state, id));

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchRequirementById(id));
	}, [dispatch, id]);

	const columns: ColumnProps<never>[] = [];

	columns.push({
		title: 'Title',
		dataIndex: 'title',
		key: 'id',
		render: (text: string, record: Control) => {
			return <Text>{record.title}</Text>;
		},
		sorter: (a: Requirement, b: Requirement) => a.title.length - b.title.length,
		sortDirections: ['descend', 'ascend']
	});

	const connectControlDropdown = (
		<Menu>
			<Menu.Item key='New Control'>
				<Link to='/controls/new' onClick={onNewControlClick}>
					New control
				</Link>
			</Menu.Item>
			<Menu.Item key='Attach Control' onClick={onAttachControlClick}>
				Attach existing control
			</Menu.Item>
		</Menu>
	);

	function onAttachControlClick() {
		console.log('Attach Control click');
	}

	function onNewControlClick() {
		console.log('New Control click');
	}

	if (!requirement) {
		throw new ApiException(404);
	}

	return (
		<>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col xs={1} xl={1}>
					<AlBackArrow/>
				</Col>
				<Col xs={22} xl={23}>
					<Title style={{ marginBottom: 0 }}>
						{requirement.paragraph_number} {requirement.title}
					</Title>
					<Text type={'secondary'}>{requirement.chapter_name}</Text>
				</Col>
			</Row>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col
					xs={{ span: 23, offset: 1 }}
					sm={{ span: 16, offset: 1 }}
					md={{ span: 16, offset: 1 }}
					lg={{ span: 16, offset: 1 }}
					xl={{ span: 15, offset: 1 }}
				>
					<Text type={'secondary'}>{requirement.description}</Text>
				</Col>

				<Col
					xs={{ span: 24 }}
					sm={{ span: 6, offset: 1 }}
					md={{ span: 4, offset: 3 }}
					lg={{ span: 4, offset: 3 }}
					xl={{ span: 3, offset: 5 }}
				>
					<AlButton type={'secondary'} style={{ float: 'right' }}>
						<EllipsisOutlined/>
					</AlButton>
					<Link to={`/requirements/edit/${requirement.id}`}>
						<AlButton type={'secondary'} style={{ marginRight: '8px', float: 'right' }}>
							<EditOutlined/>
						</AlButton>
					</Link>
				</Col>
				<Text>
					Tips about how to satisfy this requirement: : Create a document where you define who in your organisation
					contributes to information security operations. In case you are doing business with EU customers, You will
					definitely need a DPO (Data Protection Officer). DPO is …
				</Text>
			</Row>

			<Row gutter={[16, 16]}>
				<Col xs={{ span: 24, offset: 1 }} sm={24} md={24} lg={{ span: 17, offset: 1 }} xl={{ span: 17, offset: 1 }}>
					<Title level={3} style={{ paddingBottom: 0, marginBottom: 0 }}>
						Connected controls
					</Title>
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				<Col xs={{ span: 24, offset: 1 }} sm={24} md={24} lg={{ span: 17, offset: 1 }} xl={{ span: 17, offset: 1 }}>
					<Table
						dataSource={requirement.controls as never}
						columns={columns}
						rowKey='id'
						style={{ width: '100%' }}
						pagination={false}
						onRow={(record: Requirement) => {
							return {
								onClick: () => {
									props.history.push('/controls/' + record.id);
								}
							};
						}}
					/>
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				<Col xs={{ span: 24, offset: 1 }} sm={24} md={24} lg={{ span: 17, offset: 1 }} xl={{ span: 17, offset: 1 }}>
					<Row gutter={[16, 16]} align={'middle'}>
						<Dropdown overlay={connectControlDropdown} trigger={['click']}>
							<AlButton type='primary'>Connect control </AlButton>
						</Dropdown>
					</Row>
				</Col>
			</Row>
		</>
	);
}
