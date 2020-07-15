import * as React from 'react';
import {useEffect, useState} from 'react';
import {Col, Dropdown, Input, Menu, Row, Table, Tag, Typography} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer';
import themeStyles from '../../theme.module.scss';
import {ColumnProps} from 'antd/lib/table';
import {Link, RouteComponentProps, useParams} from 'react-router-dom';
import {Requirement, selectAllRequirements, updateRequirement,} from '../../redux/Requirement/RequirementSlice';
import {DownOutlined, SearchOutlined} from '@ant-design/icons/lib';
import {selectAllRegulations, selectRegulationById} from '../../redux/Regulation/RegulationSlice';
import {fetchRegulationById} from '../../redux/Regulation/RegulationService';
import AlButton from '../../components/_ui/AlButton/AlButton';
import {fetchAllRequirements} from '../../redux/Requirement/RequirementService';
import {SearchControlModal} from '../../components/modals/SearchControlModal/SearchControlModal';
import {Control} from '../../redux/Control/ControlSlice';
import {notifyError} from '../../util/NotificationUtil';
import produce, {Draft} from 'immer';
import {setTmpRequirements} from '../../redux/Requirement/TmpRequirementSlice/TmpRequirementSlice';
import {AlBackArrow} from '../../components/_ui/AlBackArrow/AlBackArrow';
import {EntityId} from '@reduxjs/toolkit';

const {Title} = Typography;

export enum RequirementTableFilter {
	ALL = 'All requirements',
	WITHOUT_CONTROl = 'Requirements without control',
	WITH_FAILING_CONTROL = 'Requirements with failing controls'
}

export function RequirementsPage(props: RouteComponentProps): JSX.Element {
	const {id} = useParams<{ id: string }>();

	const [tableSearchText, setTableSearchText] = useState<string>();
	const [requirementFilter, setRequirementFilter] = useState<RequirementTableFilter>(RequirementTableFilter.ALL);
	const [isSearchControlModalVisible, setSearchControlModalVisible] = useState(false);

	const selectedRegulation = useSelector((state: RootState) => selectRegulationById(state, id));
	const regulations = useSelector((state: RootState) => selectAllRegulations(state));
	const requirements = useSelector((state: RootState) => selectAllRequirements(state));

	const [selectedRequirementIds, setSelectedRequirementIds] = useState<string[]>([]);
	const filteredRequirements = getFilteredRequirements(tableSearchText || '');

	const isTableLoading = useSelector(
		(state: RootState) => state.regulation.loading
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchRegulationById(id));
		dispatch(fetchAllRequirements());
	}, [dispatch, id]);
	const columns: ColumnProps<never>[] = [];

	function getFilteredRequirements(searchTerm: string) {
		let filteredRequirements: Requirement[] = requirements.filter((x) => x.regulations.some((y) => y.id === selectedRegulation?.id));
		if (RequirementTableFilter.ALL === requirementFilter) {
			filteredRequirements = requirements.filter((x) => x.regulations.some((y) => y.id === selectedRegulation?.id)) || [];
		} else if (RequirementTableFilter.WITH_FAILING_CONTROL === requirementFilter) {
			filteredRequirements = getRequirementsWithFailingControl(filteredRequirements || []);
		} else if (RequirementTableFilter.WITHOUT_CONTROl === requirementFilter) {
			filteredRequirements = getRequirementsWithoutControl(filteredRequirements || []);
		}

		return filteredRequirements.filter(item => {
			return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.controls.findIndex(x => x.title.toLowerCase().includes(searchTerm.toLowerCase())) > -1;
		});
	}

	if (selectedRegulation !== undefined && selectedRegulation.requirements.length > 0) {
		columns.push({
			title: 'Title',
			dataIndex: 'name',
			key: 'title',
			render: (text: string, record: Requirement) => {
				return <span className={themeStyles.textBold}>{record.title}</span>;
			}
		});
		columns.push({
			title: 'Regulation',
			dataIndex: 'regulation',
			key: 'Regulation',
			render: () => {
				return <span>{selectedRegulation?.title}</span>;
			}
		});
		columns.push({
			title: 'Chapter name',
			dataIndex: 'Chapter name',
			key: 'Chapter name',
			render: (text: string, record: Requirement) => {
				return <span>{record.chapter_name}</span>;
			}
		});
		columns.push({
			title: 'Chapter reference',
			dataIndex: 'Chapter reference',
			key: 'Chapter reference',
			render: (text: string, record: Requirement) => {
				return <span>{record.chapter_number}</span>;
			}
		});
		columns.push({
			title: 'Controls',
			dataIndex: 'Controls',
			key: 'Controls',
			render: (text: string, record: Requirement) => {
				return record.controls?.map(control =>
					<Tag
						key={control.id}
						className={control.tasks?.some(x => x.is_overdue) ? themeStyles.errorTag : themeStyles.primaryTag}>
						{control.title}
					</Tag>);
			}
		});
	}

	const selectRow = (record: Requirement) => {
		const selectedRowKeysTmp = [...selectedRequirementIds];
		if (selectedRowKeysTmp.indexOf(record.id) >= 0) {
			selectedRowKeysTmp.splice(selectedRowKeysTmp.indexOf(record.id), 1);
		} else {
			selectedRowKeysTmp.push(record.id);
		}
		setSelectedRequirementIds(selectedRowKeysTmp);
	};

	function getRequirementsWithoutControl(requirements: Requirement[]) {
		return requirements.filter(x => x.controls?.length < 1);
	}

	function getRequirementsWithFailingControl(requirements: Requirement[]) {
		return requirements.filter(x => x.statistics?.controls_failing > 0);
	}

	const allRegulationsDropDown = (
		<Menu>
			{regulations.map(x => {
				return (
					<Menu.Item key={x.id}>
						<Link to={`/regulations/${x.id}/requirements`}>{x.title}</Link>
					</Menu.Item>
				);
			})}
		</Menu>
	);

	const requirementsFilterDropdown = (
		<Menu>
			<Menu.Item key={RequirementTableFilter.ALL}>
				<span
					onClick={() => setRequirementFilter(RequirementTableFilter.ALL)}>{RequirementTableFilter.ALL}</span>
			</Menu.Item>
			<Menu.Item key={RequirementTableFilter.WITHOUT_CONTROl}>
				<span onClick={() => setRequirementFilter(RequirementTableFilter.WITHOUT_CONTROl)}>
					{RequirementTableFilter.WITHOUT_CONTROl}
					({getRequirementsWithoutControl(selectedRegulation?.requirements || []).length})
				</span>
			</Menu.Item>
			<Menu.Item key={RequirementTableFilter.WITH_FAILING_CONTROL}>
				<span
					onClick={() => setRequirementFilter(RequirementTableFilter.WITH_FAILING_CONTROL)}>
					{RequirementTableFilter.WITH_FAILING_CONTROL}
					({getRequirementsWithFailingControl(selectedRegulation?.requirements || []).length})
				</span>
			</Menu.Item>
		</Menu>
	);

	function onAttachControlClick() {
		if (selectedRequirementIds.length > 0) {
			setSearchControlModalVisible(!isSearchControlModalVisible);
		} else {
			notifyError('Attach control', 'Can not attach a control if no requirement is selected');
		}
	}

	function onNewControlClick() {
		if (selectedRequirementIds.length > 0) {
			dispatch(setTmpRequirements(getAllSelectedRequirements()));
		} else {
			notifyError('Attach control', 'Can not attach a control if no requirement is selected');
		}
	}

	function getAllSelectedRequirements(): Requirement[] {
		return requirements.filter(req => selectedRequirementIds.find(i => req.id === i));
	}

	const connectControlDropdown = (
		<Menu>
			<Menu.Item key="New Control">
				<Link to="/controls/new" onClick={onNewControlClick}>New control</Link>
			</Menu.Item>
			<Menu.Item key="Attach Control" onClick={onAttachControlClick}>
				Attach existing control
			</Menu.Item>
		</Menu>
	);

	function attachExistingControlToSelectedRequirements(control: Control) {
		setTimeout(() => {
			setSearchControlModalVisible(false);
			selectedRequirementIds.forEach(requirementId => {
				const requirement = requirements.find(x => x.id === requirementId);
				const tmpRequirement = produce(requirement, (draft: Draft<Requirement>) => {
					draft.controls.push(control);
				});

				if (tmpRequirement) {
					dispatch(updateRequirement(tmpRequirement));
				}
				setSelectedRequirementIds([]);
			});
		}, 300);
	}

	return (
		<>
			<SearchControlModal
				onSelect={(control: Control) => attachExistingControlToSelectedRequirements(control)}
				isVisible={isSearchControlModalVisible}
				onCancel={() => setSearchControlModalVisible(false)}
			/>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col xs={2} xl={1}>
					<AlBackArrow history={props.history}/>
				</Col>
				<Col xs={8} xl={8}>
					<Title style={{marginBottom: 0}}>Requirements</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col xs={{span: 24, offset: 1}} sm={{span: 8, offset: 1}} md={{span: 5, offset: 1}}
					 xl={{span: 5, offset: 1}}>
					<Input
						placeholder="Search by requirement or control "
						onChange={(event) => {
							setTableSearchText(event.target.value);
						}}
						suffix={
							<SearchOutlined/>
						}
					/>
				</Col>
				<Col xs={{span: 6, offset: 1}} sm={3} md={2} xl={2}>
					<Dropdown overlay={allRegulationsDropDown} trigger={['click']}>
						<span className={themeStyles.cursorPointerOnHover}>{selectedRegulation?.title} <DownOutlined
							style={{fontSize: '14px'}}/></span>
					</Dropdown>
				</Col>
				<Col xs={17} sm={7} md={5} lg={5} xl={4}>
					<Dropdown overlay={requirementsFilterDropdown} trigger={['click']}>
						<span className={themeStyles.cursorPointerOnHover}>{requirementFilter} <DownOutlined
							style={{fontSize: '14px'}}/></span>
					</Dropdown>
				</Col>
				<Col xs={{span: 24, offset: 1}} sm={{span: 4, offset: 0}} md={{span: 3, offset: 0}}
					 lg={{span: 3, offset: 0}} xl={{span: 2, offset: 3}}>
					{selectedRequirementIds.length > 0 &&
					<span>{selectedRequirementIds.length} selected</span>
					}
				</Col>
				<Col xs={{span: 16, offset: 1}} sm={{span: 8, offset: 0}} md={6} lg={5} xl={4}>
					{selectedRequirementIds.length > 0 &&
					<Dropdown overlay={connectControlDropdown} trigger={['click']}>
						<AlButton type="primary" style={{width: '100%'}}>Connect control <DownOutlined
							style={{fontSize: '14px'}}/></AlButton>
					</Dropdown>
					}
				</Col>
				<Col xs={6} sm={3} md={2} xl={2}>
					{selectedRequirementIds.length > 0 &&
					<AlButton type="secondary" style={{float: 'right'}}>...</AlButton>
					}
				</Col>
			</Row>
			<Row gutter={[16, 16]} justify={'space-between'}>
				<Col xs={{span: 23, offset: 1}} sm={{span: 23, offset: 1}} md={{span: 23, offset: 1}}
					 lg={{span: 23, offset: 1}} xl={{span: 23, offset: 1}} xxl={{span: 23, offset: 1}}>
					<Table
						rowSelection={{
							selectedRowKeys: selectedRequirementIds,
							onChange: (selectedRows: EntityId[]) => setSelectedRequirementIds(selectedRows as string[])
						}}
						onRow={(record) => ({
							onClick: () => {
								selectRow(record);
							},
						})}
						scroll={regulations.length < 1 ? {x: undefined} : {x: 'auto'}}
						dataSource={filteredRequirements as never}
						columns={columns}
						rowKey="id"
						loading={isTableLoading}
						style={{width: '100%'}}
						pagination={{hideOnSinglePage: true}}
					/>
				</Col>
			</Row>
		</>
	);
}
