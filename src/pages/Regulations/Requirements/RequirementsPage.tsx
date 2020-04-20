import * as React from 'react';
import {useEffect, useState} from 'react';
import {Col, Dropdown, Input, Menu, Row, Table, Tag, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import themeStyles from "../../../theme.module.scss";
import {ColumnProps} from "antd/lib/table";
import {Link, useParams} from "react-router-dom";
import {Requirement, selectAllRequirements} from "../../../redux/Requirement/RequirementSlice";
import {DownOutlined, LeftOutlined, SearchOutlined} from "@ant-design/icons/lib";
import {selectAllRegulations, selectRegulationById} from "../../../redux/Regulation/RegulationSlice";
import {fetchAllRegulations} from "../../../redux/Regulation/RegulationService";
import AlButton from "../../../components/_ui/AlButton/AlButton";
import {fetchAllRequirements} from "../../../redux/Requirement/RequirementService";

const {Title} = Typography;

export enum RequirementTableFilter {
    ALL = "All requirements",
    WITHOUT_CONTROl = "Requirements without control",
    WITH_FAILING_CONTROL = "Requirements with failing controls"
}

export function RequirementsPage() {
    let {id} = useParams<{ id: string }>();
    const selectedRegulation = useSelector((state: RootState) => selectRegulationById(state, id));
    const regulations = useSelector((state: RootState) => selectAllRegulations(state));
    const requirements = useSelector((state: RootState) => selectAllRequirements(state));

    const [tableSearchText, setTableSearchText] = useState<string>()
    const [requirementFilter, setRequirementFilter] = useState<RequirementTableFilter>(RequirementTableFilter.ALL)

    const [selectedRequirements, setSelectedRequirements] = useState<Requirement[]>([])
    let filteredRequirements = getFilteredRequirements(tableSearchText || "");
    const isTableLoading = useSelector(
        (state: RootState) => state.regulation.loading
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllRegulations());
        dispatch(fetchAllRequirements())
    }, [dispatch]);
    let columns: ColumnProps<any>[] = [];

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
                item.controls.findIndex(x => x.title.toLowerCase().includes(searchTerm.toLowerCase())) > -1
        })
    }

    if (selectedRegulation !== undefined && selectedRegulation.requirements.length > 0) {
        columns.push({
            title: "Title",
            dataIndex: "name",
            key: "title",
            render: (text: any, record: Requirement) => {
                return <span className={themeStyles.textBold}>{record.title}</span>
            }
        });
        columns.push({
            title: "Regulation",
            dataIndex: "regulation",
            key: "Regulation",
            render: (text: any, record: Requirement) => {
                return <span>{selectedRegulation?.title}</span>
            }
        });
        columns.push({
            title: "Chapter name",
            dataIndex: "Chapter name",
            key: "Chapter name",
            render: (text: any, record: Requirement) => {
                return <span>{record.chapter_name}</span>
            }
        });
        columns.push({
            title: "Chapter reference",
            dataIndex: "Chapter reference",
            key: "Chapter reference",
            render: (text: any, record: Requirement) => {
                return <span>{record.chapter_number}</span>
            }
        });
        columns.push({
            title: "Controls",
            dataIndex: "Controls",
            key: "Controls",
            render: (text: any, record: Requirement) => {
                return record.controls?.map(control =>
                    <Tag
                        key={control.id}
                        className={control.tasks?.some(x => new Date(x.due_at) < new Date()) ? themeStyles.errorTag : themeStyles.primaryTag}>
                        {control.title}
                    </Tag>)
            }
        });
    }

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: Requirement[]) => setSelectedRequirements(selectedRows),
    };


    function getRequirementsWithoutControl(requirements: Requirement[]) {
        return requirements.filter(x => x.controls?.length < 1)
    }

    function getRequirementsWithFailingControl(requirements: Requirement[]) {
        return requirements.filter(x => x.controls?.some(y => y.tasks.some(u => new Date(u.due_at) < new Date())))
    }

    const allRegulationsDropDown = (
        <Menu>
            {regulations.map(x => {
                return (
                    <Menu.Item key={x.id}>
                        <Link to={`/regulations/${x.id}/requirements`}>{x.title}</Link>
                    </Menu.Item>
                )
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

    const connectControlDropdown = (
        <Menu>
            <Menu.Item key="New Control">
                New Control
            </Menu.Item>
            <Menu.Item key="Attach Control">
                Attach existing control
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1}>
                    <Link to="/regulations">
                        <LeftOutlined style={{fontSize: "24px", float: "right"}}/>
                    </Link>
                </Col>
                <Col xs={8} xl={8}>
                    <Title style={{marginBottom: 0}}>Requirements</Title>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={{span: 24, offset: 1}} sm={{span: 8, offset: 1}} md={{span: 5, offset: 1}} xl={{span: 5, offset: 1}}>
                    <Input
                        placeholder="Search by requirement or control "
                        onChange={(event) => {
                            setTableSearchText(event.target.value)
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
                <Col xs={{span: 24, offset: 1}} sm={{span: 4, offset: 0}} md={{span: 3, offset: 0}} lg={{span: 3, offset: 0}} xl={{span: 2, offset: 3}}>
                    <span>{selectedRequirements.length} selected</span>
                </Col>
                <Col xs={{span: 16, offset: 1}} sm={{span: 8, offset: 0}} md={6} lg={5} xl={4}>
                    <Dropdown overlay={connectControlDropdown} trigger={['click']}>
                        <AlButton type="primary" style={{width: '100%'}}>Connect control <DownOutlined style={{fontSize: '14px'}}/></AlButton>
                    </Dropdown>
                </Col>
                <Col xs={6} sm={3} md={2} xl={2}>
                    <AlButton type="secondary" style={{float: 'right'}}>...</AlButton>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify={"space-between"}>
                <Col xs={{span: 23, offset: 1}} sm={{span: 23, offset: 1}} md={{span: 23, offset: 1}}
                     lg={{span: 23, offset: 1}} xl={{span: 23, offset: 1}} xxl={{span: 23, offset: 1}}>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        scroll={regulations.length < 1 ? {x: undefined} : {x: 'auto'}}
                        dataSource={filteredRequirements}
                        columns={columns}
                        rowKey="id"
                        loading={isTableLoading}
                        style={{width: "100%"}}
                    />
                </Col>
            </Row>
        </>
    );
};