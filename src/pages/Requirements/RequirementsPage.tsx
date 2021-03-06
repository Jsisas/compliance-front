import { DownOutlined, SearchOutlined } from '@ant-design/icons/lib';
import { EntityId } from '@reduxjs/toolkit';
import { Col, Dropdown, Input, Menu, Row, Select, Table, Tag, Typography } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import produce, { Draft } from 'immer';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';

import { AlBackArrow } from '../../components/_ui/AlBackArrow/AlBackArrow';
import AlButton from '../../components/_ui/AlButton/AlButton';
import { SearchControlModal } from '../../components/modals/SearchControlModal/SearchControlModal';
import { Control } from '../../redux/Control/ControlSlice';
import { RootState } from '../../redux/reducer';
import { fetchAllRegulations, fetchRegulationById } from '../../redux/Regulation/RegulationService';
import { selectAllRegulations, selectRegulationById } from '../../redux/Regulation/RegulationSlice';
import { fetchAllRequirements, upsertRequirement } from '../../redux/Requirement/RequirementService';
import { Requirement, selectAllRequirements } from '../../redux/Requirement/RequirementSlice';
import { setTmpRequirements } from '../../redux/Requirement/TmpRequirementSlice/TmpRequirementSlice';
import themeStyles from '../../theme.module.scss';
import { notifyError } from '../../util/NotificationUtil';
import StringUtil from '../../util/StringUtil';

const { Title } = Typography;
const { Option } = Select;

export enum RequirementFilter {
	ALL = 'All requirements',
	WITHOUT_CONTROl = 'Requirements without control',
	WITH_FAILING_CONTROL = 'Requirements with failing controls',
}

export interface RequirementsPageLocation {
	filter?: RequirementFilter;
}

export function RequirementsPage(props: RouteComponentProps<any, any, RequirementsPageLocation | any>): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const [tableSearchText, setTableSearchText] = useState<string>();
	const [requirementFilter, setRequirementFilter] = useState<RequirementFilter>(
		props.location.state && props.location.state.filter ? props.location.state.filter : RequirementFilter.ALL
	);

	const [isSearchControlModalVisible, setSearchControlModalVisible] = useState(false);

	const [selectedRegulationId, setSelectedRegulationId] = useState<string>(id);
	const selectedRegulation = useSelector((state: RootState) => selectRegulationById(state, selectedRegulationId));

	const regulations = useSelector((state: RootState) => selectAllRegulations(state));
	const requirements = useSelector((state: RootState) => selectAllRequirements(state));

	const [selectedRequirementIds, setSelectedRequirementIds] = useState<string[]>([]);
	const [filteredRequirements, setFilteredRequirements] = useState<Requirement[]>([]);

	const isTableLoading = useSelector((state: RootState) => state.regulation.loading);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchRegulationById(id));
		dispatch(fetchAllRegulations());
		dispatch(fetchAllRequirements());
	}, [dispatch, id]);
	const columns: ColumnProps<never>[] = [];

	const filterByRequirementSelection = useCallback(
		(requirement: Requirement) => {
			if (requirementFilter) {
				if (requirementFilter === RequirementFilter.ALL) {
					return true;
				} else if (requirementFilter === RequirementFilter.WITH_FAILING_CONTROL) {
					return isRequirementWithFailingControl(requirement);
				} else if (requirementFilter === RequirementFilter.WITHOUT_CONTROl) {
					return isRequirementWithoutControl(requirement);
				}
			} else {
				return true;
			}
		},
		[requirementFilter]
	);

	const filterBySearchTerm = useCallback(
		(requirement: Requirement) => {
			if (tableSearchText) {
				return requirement.title.toLowerCase().includes(tableSearchText.toLowerCase());
			} else {
				return true;
			}
		},
		[tableSearchText]
	);

	const filterByRegulation = useCallback(
		(requirement: Requirement) => {
			if (selectedRegulation) {
				return requirement.regulations.some((regulation) => selectedRegulation.id === regulation.id);
			} else {
				return true;
			}
		},
		[selectedRegulation]
	);

	const getFilteredRequirements = useCallback(() => {
		return requirements.filter(filterByRegulation).filter(filterBySearchTerm).filter(filterByRequirementSelection);
	}, [requirements, filterByRegulation, filterBySearchTerm, filterByRequirementSelection]);

	useEffect(() => {
		setFilteredRequirements(getFilteredRequirements());
	}, [getFilteredRequirements]);

	if (selectedRegulation !== undefined && selectedRegulation.requirements.length > 0) {
		columns.push({
			title: 'Title',
			dataIndex: 'name',
			key: 'title',
			render: (text: string, record: Requirement) => {
				return <span className={themeStyles.textBold}>{record.title}</span>;
			},
		});
		columns.push({
			title: 'Regulation',
			dataIndex: 'regulation',
			key: 'Regulation',
			render: () => {
				return <span>{selectedRegulation.title}</span>;
			},
		});
		columns.push({
			title: 'chapter_name',
			dataIndex: 'chapter_name',
			key: 'chapter_name',
			render: (text: string, record: Requirement) => {
				return <span>{record.chapter_name}</span>;
			},
		});
		columns.push({
			title: 'Chapter reference',
			dataIndex: 'Chapter reference',
			key: 'Chapter reference',
			render: (text: string, record: Requirement) => {
				return <span>{record.chapter_number}</span>;
			},
		});
		columns.push({
			title: 'Controls',
			dataIndex: 'Controls',
			key: 'Controls',
			render: (text: string, record: Requirement) => {
				return record.controls.map((control) => (
					<Tag
						key={control.id}
						className={control.tasks?.some((x) => x.is_overdue) ? themeStyles.errorTag : themeStyles.primaryTag}
						onClick={(event: React.MouseEvent) => {
							event.stopPropagation();
							props.history.push('/controls/' + control.id);
						}}
					>
						{control.title}
					</Tag>
				));
			},
		});
	}

	function selectRegulation(regulationId: string) {
		dispatch(fetchRegulationById(regulationId));
		setSelectedRegulationId(regulationId);
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

	function getStatisticsCountByRequirementFilter(filter: RequirementFilter) {
		if (filter === RequirementFilter.ALL) {
			return requirements.length;
		} else if (filter === RequirementFilter.WITHOUT_CONTROl) {
			return requirements.filter(isRequirementWithoutControl).length;
		} else if (filter === RequirementFilter.WITH_FAILING_CONTROL) {
			return requirements.filter(isRequirementWithFailingControl).length;
		} else {
			return 0;
		}
	}

	function isRequirementWithoutControl(requirement: Requirement) {
		return requirement.statistics.controls_total < 1;
	}

	function isRequirementWithFailingControl(requirement: Requirement) {
		return requirement.statistics.controls_failing > 0;
	}

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
		return requirements.filter((req) => selectedRequirementIds.find((i) => req.id === i));
	}

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

	function attachExistingControlToSelectedRequirements(controls: Control[]) {
		setTimeout(() => {
			setSearchControlModalVisible(false);
			selectedRequirementIds.forEach((requirementId) => {
				const requirement = requirements.find((x) => x.id === requirementId);
				const tmpRequirement = produce(requirement, (draft: Draft<Requirement>) => {
					draft.controls = draft.controls.concat(controls);
				});

				if (tmpRequirement) {
					dispatch(upsertRequirement(tmpRequirement));
				}
				setSelectedRequirementIds([]);
			});
		}, 300);
	}

	return (
		<>
			<SearchControlModal
				onAttach={(controls: Control[]) => attachExistingControlToSelectedRequirements(controls)}
				isVisible={isSearchControlModalVisible}
				onCancel={() => setSearchControlModalVisible(false)}
			/>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col xs={2} xl={1}>
					<AlBackArrow />
				</Col>
				<Col xs={8} xl={8}>
					<Title style={{ marginBottom: 0 }}>Requirements</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col
					xs={{ span: 24, offset: 1 }}
					sm={{ span: 8, offset: 1 }}
					md={{ span: 5, offset: 1 }}
					xl={{ span: 5, offset: 1 }}
				>
					<Input
						placeholder='Search by requirement or control '
						onChange={(event) => {
							setTableSearchText(event.target.value);
						}}
						suffix={<SearchOutlined />}
					/>
				</Col>
				<Col xs={{ span: 6, offset: 1 }} sm={3} md={2} xl={2}>
					<Select
						value={selectedRegulation?.id}
						style={{ width: '100%' }}
						onChange={(value: string) => selectRegulation(value)}
					>
						{regulations.map((regulation) => {
							return (
								<Option value={regulation.id} key={regulation.id}>
									{regulation.title}
								</Option>
							);
						})}
					</Select>
				</Col>
				<Col xs={17} sm={7} md={5} lg={5} xl={4}>
					<Select
						defaultValue={requirementFilter}
						style={{ width: '100%' }}
						onChange={(value: RequirementFilter) => setRequirementFilter(value)}
					>
						{Object.values(RequirementFilter).map((filter) => {
							return (
								<Option value={filter} key={filter}>
									{StringUtil.humanizeSnakeCase(filter)}({getStatisticsCountByRequirementFilter(filter)})
								</Option>
							);
						})}
					</Select>
				</Col>
				<Col
					xs={{ span: 24, offset: 1 }}
					sm={{ span: 4, offset: 0 }}
					md={{ span: 3, offset: 0 }}
					lg={{ span: 3, offset: 0 }}
					xl={{ span: 2, offset: 3 }}
				>
					{selectedRequirementIds.length > 0 && <span>{selectedRequirementIds.length} selected</span>}
				</Col>
				<Col xs={{ span: 16, offset: 1 }} sm={{ span: 8, offset: 0 }} md={6} lg={5} xl={4}>
					{selectedRequirementIds.length > 0 && (
						<Dropdown overlay={connectControlDropdown} trigger={['click']}>
							<AlButton type='primary' style={{ width: '100%' }}>
								Connect control <DownOutlined style={{ fontSize: '14px' }} />
							</AlButton>
						</Dropdown>
					)}
				</Col>
				<Col xs={6} sm={3} md={2} xl={2}>
					{selectedRequirementIds.length > 0 && (
						<AlButton type='secondary' style={{ float: 'right' }}>
							...
						</AlButton>
					)}
				</Col>
			</Row>
			<Row gutter={[16, 16]} justify={'space-between'}>
				<Col
					xs={{ span: 23, offset: 1 }}
					sm={{ span: 23, offset: 1 }}
					md={{ span: 23, offset: 1 }}
					lg={{ span: 23, offset: 1 }}
					xl={{ span: 23, offset: 1 }}
					xxl={{ span: 23, offset: 1 }}
				>
					<Table
						rowSelection={{
							selectedRowKeys: selectedRequirementIds,
							onChange: (selectedRows: EntityId[]) => setSelectedRequirementIds(selectedRows as string[]),
						}}
						onRow={(record) => ({
							onClick: () => {
								selectRow(record);
							},
						})}
						scroll={regulations.length < 1 ? { x: undefined } : { x: 'auto' }}
						dataSource={filteredRequirements as never}
						columns={columns}
						rowKey='id'
						loading={isTableLoading}
						style={{ width: '100%' }}
						pagination={{ hideOnSinglePage: true }}
					/>
				</Col>
			</Row>
		</>
	);
}
