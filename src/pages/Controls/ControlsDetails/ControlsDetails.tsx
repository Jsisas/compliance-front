import * as React from 'react';
import {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {selectControlById} from "../../../redux/Control/ControlSlice";
import {fetchAllControls} from "../../../redux/Control/ControlService";
import {Col, Row, Table} from "antd";
import {EditOutlined, EllipsisOutlined, LeftOutlined} from "@ant-design/icons/lib";
import {AlText} from "../../../components/_ui/AlText/AlText";
import {AlTitle} from "../../../components/_ui/AlTitle/AlTitle";
import AlButton from "../../../components/_ui/AlButton/AlButton";
import {AlConnectedItems} from "../../../components/_ui/AlConnectedItems/AlConnectedItems";
import themeStyles from "../../../theme.module.scss";
import {fetchAllTasks} from "../../../redux/Task/TaskService";
import {selectTaskByControlId, Task} from "../../../redux/Task/TaskSlice";
import {ColumnProps} from "antd/lib/table";

export function ControlsDetails() {
    let {id} = useParams<{ id: string }>();
    const control = useSelector((state: RootState) => selectControlById(state, id));
    const tasks: Task[] = useSelector((state: RootState) => selectTaskByControlId(state, id))

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllControls());
        dispatch(fetchAllTasks());
    }, [dispatch]);
    let columns: ColumnProps<any>[] = [];

    columns.push({
        title: "Title",
        dataIndex: "title",
        key: "id",
        render: (text: any, record: Task) => {
            return (
                <AlText>{record.title}</AlText>
            );
        }
    });
    columns.push({
        title: "Assignee",
        dataIndex: "assignee",
        key: "id",
        render: (text: any, record: Task) => {
            return (
                <AlText>{record.assignee ? `@${record.assignee?.fname} ${record.assignee?.lname}` : ""}</AlText>
            );
        }
    });
    columns.push({
        title: "Type",
        dataIndex: "kind",
        key: "id",
        render: (text: any, record: Task) => {
            return (
                <AlText>{record.kind}</AlText>
            );
        }
    });
    columns.push({
        title: "Status",
        dataIndex: "status",
        key: "id",
        render: (text: any, record: Task) => {
            return (
                <AlText>{record.state}</AlText>
            );
        }
    });

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1}>
                    <Link to="/regulations">
                        <LeftOutlined style={{fontSize: "24px", float: "right"}}/>
                    </Link>
                </Col>
                <Col xs={8} xl={8}>
                    <AlTitle style={{marginBottom: 0}}>{control?.title}</AlTitle>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={{span: 16, offset: 1}} sm={{span: 16, offset: 1}} md={{span: 16, offset: 1}}
                     lg={{span: 16, offset: 1}} xl={{span: 16, offset: 1}}>
                    <AlText
                        type={"secondary"}>{control?.description || "When an employee leaves the company, their authorizations are revoked in the company’s access provisioning software on the last day of their employment contract."}</AlText>
                </Col>
                <Col xs={{span: 3}} sm={{span: 3}} md={{span: 2}} lg={{span: 2}} xl={{span: 2, offset: 5}}>
                    <AlButton type={'secondary'} style={{float: 'right'}}><EllipsisOutlined/></AlButton>
                    <AlButton type={'secondary'} style={{marginRight: '8px', float: 'right'}} ><EditOutlined/></AlButton>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 16, offset: 1}} sm={8} md={8} lg={8} xl={{span: 17, offset: 1}}>
                    {console.log(tasks)}
                    <Table
                        dataSource={tasks}
                        columns={columns}
                        rowKey="id"
                        loading={false}
                        style={{width: "100%"}}
                        className={themeStyles.antTableMousePointer}
                    />
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={{span: 5, offset: 1}}>
                    <AlConnectedItems data={control}/>
                </Col>
            </Row>

        </>
    );
};