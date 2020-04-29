import * as React from 'react';
import {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducer";
import {selectControlById} from "../../redux/Control/ControlSlice";
import {fetchAllControls} from "../../redux/Control/ControlService";
import {Col, Row, Table, Typography, Divider} from "antd";
import {EditOutlined, EllipsisOutlined, LeftOutlined} from "@ant-design/icons/lib";
import AlButton from "../../components/_ui/AlButton/AlButton";
import {AlConnectedItems} from "../../components/_ui/AlConnectedItems/AlConnectedItems";
import {fetchAllTasks} from "../../redux/Task/TaskService";
import {selectTaskByControlId, Task} from "../../redux/Task/TaskSlice";
import {ColumnProps} from "antd/lib/table";
import {User} from "../../redux/User/UserSlice";
import styles from './controlDetails.module.scss'
import themeStyle from '../../theme.module.scss';

import {AddTaskModule} from '../../components/modals/AddTaskModal/AddTaskModal';
import {concatStyles} from "../../util/StyleUtil";

const {Title, Text} = Typography;

interface ControlsDetailsProps {
    history: any[];
}
export function ControlsDetails(props: ControlsDetailsProps) {
    let {id} = useParams<{ id: string }>();
    const control = useSelector((state: RootState) => selectControlById(state, id));
    const tasks: Task[] = useSelector((state: RootState) => selectTaskByControlId(state, id))
    const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false)
    const isTableLoading = useSelector(
        (state: RootState) => state.task.loading
    );

    function toggleModal() {
        setAddTaskModalVisible(!isAddTaskModalVisible);
    }

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
                <Text>{record.title}</Text>
            );
        }
    });
    columns.push({
        title: "Assignee",
        dataIndex: "assignee",
        key: "id",
        render: (text: any, record: Task) => {
            return (
                <Text>{record.assignee ? `@${record.assignee?.fname} ${record.assignee?.lname}` : ""}</Text>
            );
        }
    });
    columns.push({
        title: "Type",
        dataIndex: "kind",
        key: "id",
        render: (text: any, record: Task) => {
            return (
                <Text>{record.kind}</Text>
            );
        }
    });
    columns.push({
        title: "Status",
        dataIndex: "status",
        key: "id",
        render: (text: any, record: Task) => {
            return (
                <Text>{record.state}</Text>
            );
        }
    });
    return (
        <>
            <AddTaskModule control={control!} isVisible={isAddTaskModalVisible} onCancel={toggleModal}/>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={1} xl={1}>
                    <Link to="/controls">
                        <LeftOutlined style={{fontSize: "24px", float: "right"}}/>
                    </Link>
                </Col>
                <Col xs={22} xl={23}>
                    <Title style={{marginBottom: 0}}>{control?.title}</Title>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align={"bottom"}>
                <Col xs={{span: 23, offset: 1}} sm={{span: 16, offset: 1}} md={{span: 16, offset: 1}}
                     lg={{span: 16, offset: 1}} xl={{span: 15, offset: 1}}>
                    <Text
                        type={"secondary"}>{control?.description || "When an employee leaves the company, their authorizations are revoked in the company’s access provisioning software on the last day of their employment contract."}</Text>
                </Col>
                <Col xs={{span: 24}} sm={{span: 6, offset: 1}} md={{span: 4, offset: 3}} lg={{span: 4, offset: 3}}
                     xl={{span: 3, offset: 5}}>
                    <AlButton type={'secondary'} style={{float: 'right'}}><EllipsisOutlined/></AlButton>
                    <AlButton type={'secondary'}
                              style={{marginRight: '8px', float: 'right'}}><EditOutlined/></AlButton>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{height: '75px'}}>
                <Col xs={{span: 24, offset: 1}} sm={{span: 24, offset: 1}} md={{span: 24, offset: 1}}
                     lg={{span: 17, offset: 1}} xl={{span: 17, offset: 1}}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text type={'secondary'}>Status</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text type={'secondary'}>Start date</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text type={'secondary'}>Assignee</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text type={'secondary'}>Category</Text>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={{span: 24, offset: 1}} sm={{span: 24, offset: 1}} md={{span: 24, offset: 1}}
                             lg={{span: 17, offset: 1}} xl={{span: 2, offset: 1}}>
                            <Text>{control?.status}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text>{control?.startDate}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text>{control?.assignees?.map((user: User) => <span>{user.fname || ""}</span>)}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={17} xl={2}>
                            <Text>{control?.category}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{span: 24, offset: 1}} sm={{span: 24, offset: 1}} md={{span: 24, offset: 1}}
                     lg={{span: 5, offset: 1}} xl={{span: 5, offset: 1}}>
                    <AlConnectedItems data={control}/>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={24} md={24} lg={{span: 17, offset: 1}}
                     xl={{span: 17, offset: 1}}>
                    <Divider className={styles.divider}/>
                    <Title level={3} style={{paddingBottom: 0, marginBottom: 0}}>Tasks</Title>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={24} md={24} lg={{span: 17, offset: 1}}
                     xl={{span: 17, offset: 1}}>
                    <Table
                        dataSource={tasks}
                        columns={columns}
                        rowKey="id"
                        scroll={tasks.length < 1 ? {x: undefined} : {x: 340}}
                        loading={isTableLoading}
                        style={{width: "100%"}}
                        className={concatStyles(styles.tableHeader, themeStyle.antTableMousePointer)}
                        pagination={false}
                        onRow={(record) => {
                            return {
                                onClick: () => {props.history.push("/tasks/" + record.id)},
                            };
                        }}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={24} md={24} lg={{span: 17, offset: 1}}
                     xl={{span: 17, offset: 1}}>
                    <AlButton type="primary" onClick={toggleModal}>Add task</AlButton>
                </Col>
            </Row>
        </>
    );
}
