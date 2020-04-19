import * as React from 'react';
import {useEffect, useState} from 'react';
import {Col, Dropdown, Input, Menu, Row, Table, Tag, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import themeStyles from "../../../theme.module.scss";
import {ColumnProps} from "antd/lib/table";
import {Link, useParams} from "react-router-dom";
import {Requirement} from "../../../redux/Requirement/RequirementSlice";
import {concatStyles} from "../../../util/StyleUtil";
import {DownOutlined, LeftOutlined, SearchOutlined} from "@ant-design/icons/lib";
import {selectAllRegulations, selectRegulationById} from "../../../redux/Regulation/RegulationSlice";
import {fetchAllRegulations} from "../../../redux/Regulation/RegulationService";

const {Title} = Typography;

export function RequirementsPage() {
    let {id} = useParams<{ id: string }>();
    const selectedRegulation = useSelector((state: RootState) => selectRegulationById(state, id));
    const regulations = useSelector((state: RootState) => selectAllRegulations(state));
    const [tableSearchText, setTableSearchText] = useState<string>()
    const [selectedRequirements, setSelectedRequirements] = useState<Requirement[]>([])
    let filteredRequirements = getFilteredRequirements(tableSearchText || "");
    const isTableLoading = useSelector(
        (state: RootState) => state.regulation.loading
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllRegulations());
    }, [dispatch]);
    let columns: ColumnProps<any>[] = [];

    function getFilteredRequirements(searchTerm: string) {
        return selectedRegulation?.requirements.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.controls.findIndex(x => x.title.toLowerCase().includes(searchTerm.toLowerCase())) > -1
        })
    }

    if (selectedRegulation !== undefined && selectedRegulation.requirements.length > 0) {
        columns.push({
            title: "Title",
            dataIndex: "name",
            key: "title",
            render: (text: any, record: Requirement) => {
                return <span className={themeStyles.textBold}>{record.name}</span>
            }
        });
        columns.push({
            title: "Regulation",
            dataIndex: "regulation",
            key: "Regulation",
            render: (text: any, record: Requirement) => {
                return <span>{selectedRegulation?.name}</span>
            }
        });
        columns.push({
            title: "Chapter name",
            dataIndex: "Chapter name",
            key: "Chapter name",
            render: (text: any, record: Requirement) => {
                return <span>{record.chapter.name}</span>
            }
        });
        columns.push({
            title: "Chapter reference",
            dataIndex: "Chapter reference",
            key: "Chapter reference",
            render: (text: any, record: Requirement) => {
                return <span>{record.chapter.chapterRef}</span>
            }
        });
        columns.push({
            title: "Controls",
            dataIndex: "Controls",
            key: "Controls",
            render: (text: any, record: Requirement) => {
                return record.controls.map(control =>
                    <Tag
                        key={control.id}
                        className={concatStyles(themeStyles.primaryLightBackgroundColor, themeStyles.primaryTextColor)}>
                        {control.title}
                    </Tag>)
            }
        });
    }

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: Requirement[]) => setSelectedRequirements(selectedRows),
    };

    const allRegulationsDropDown = (
        <Menu>
            {regulations.map(x => {
                return (
                    <Menu.Item key={x.id}>
                        <Link to={`/regulations/${x.id}/requirements`}>{x.name}</Link>
                    </Menu.Item>
                )
            })}
        </Menu>
    );

    const requirementsFilterDropdown = (
        <Menu>
            <Menu.Item key={0}>
                <span>All requirements</span>
            </Menu.Item>
            <Menu.Item key={1}>
                <span>Requirements without control ({selectedRegulation?.requirements.filter(x => x.controls.length < 1).length})</span>
            </Menu.Item>
            <Menu.Item key={1}>
                <span>Requirements with failing controls ({selectedRegulation?.requirements.filter(x => x.controls.some(y => y.tasks.some(u => new Date(u.dueDate) < new Date()))).length})</span>
            </Menu.Item>
        </Menu>
    );

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
                <Col xs={{span: 5, offset: 1}}>
                    <Input
                        placeholder="Search by requirement or control "
                        onChange={(event) => {
                            setTableSearchText(event.target.value)
                        }}
                        suffix={
                            <SearchOutlined />
                        }
                    />
                </Col>
                <Col xs={{span: 2}}>
                    <Dropdown overlay={allRegulationsDropDown}>
                        <span className={themeStyles.cursorPointerOnHover}>{selectedRegulation?.name} <DownOutlined
                            style={{fontSize: '14px'}}/></span>
                    </Dropdown>
                </Col>
                <Col xs={{span: 3}}>
                    <Dropdown overlay={requirementsFilterDropdown}>
                        <span className={themeStyles.cursorPointerOnHover}>All requirements <DownOutlined
                            style={{fontSize: '14px'}}/></span>
                    </Dropdown>
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