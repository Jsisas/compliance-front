import * as React from 'react';
import {useEffect} from 'react';
import {Col, Row, Table, Tag, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import themeStyles from "../../../theme.module.scss";
import {ColumnProps} from "antd/lib/table";
import {fetchRegulationRequirements} from "../../../redux/RegulationRequirement/RegulationRequirementService";
import {Link, useParams} from "react-router-dom";
import {selectAllRegulationRequirements} from './../../../redux/RegulationRequirement/RegulationRequirementSlice'
import {Requirement} from "../../../redux/Requirement/RequirementSlice";
import {concatStyles} from "../../../util/StyleUtil";
import {LeftOutlined} from "@ant-design/icons/lib";

const {Title} = Typography;

export function RequirementsPage() {
    let {id} = useParams();
    const requirements = useSelector((state: RootState) => selectAllRegulationRequirements(state));
    const isTableLoading = useSelector(
        (state: RootState) => state.regulationRequirements.loading
    );

    console.log(requirements)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRegulationRequirements(Number(id)));
    }, [dispatch, id]);
    let columns: ColumnProps<any>[] = [];

    if (requirements.length > 0) {
        columns.push({
            title: "Name",
            dataIndex: "name",
            key: "Name",
            render: (text: any, record: Requirement) => {
                return <span className={themeStyles.textBold}>{record.name}</span>
            }
        });
        columns.push({
            title: "Regulation",
            dataIndex: "regulation",
            key: "Regulation",
            render: (text: any, record: Requirement) => {
                return <span>{record.regulation.name}</span>
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
                        className={concatStyles(themeStyles.primaryLightBackgroundColor, themeStyles.primaryTextColor)}>
                        {control.title}
                    </Tag>)
            }
        });
    }

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1}>
                    <Link to="/regulations">
                        <LeftOutlined style={{ fontSize: "24px", float: "right" }} />
                    </Link>
                </Col>
                <Col xs={20} xl={20}>
                    <Title style={{ marginBottom: 0 }}>Requirements</Title>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify={"space-between"}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        dataSource={requirements}
                        columns={columns}
                        rowKey="id"
                        scroll={requirements.length < 1 ? {x: undefined} : {x: 340}}
                        loading={isTableLoading}
                        style={{width: "100%"}}
                    />
                </Col>
            </Row>
        </>
    );
};