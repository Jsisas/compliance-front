import * as React from 'react';
import {useEffect, useState} from 'react';
import {Col, Row, Table, Typography} from "antd";
import AlButton from "../../components/_ui/AlButton/AlButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducer";
import {ColumnProps} from "antd/lib/table";
import {selectAllTasks, Task} from "../../redux/Task/TaskSlice";
import {fetchAllTasks} from "../../redux/Task/TaskService";
import 'moment/locale/et';
import {date, dateFormat} from "../../util/DateUtil";
import {AddTaskModule} from "../../components/modals/AddTaskModal/AddTaskModal";

const {Title} = Typography;

export function TasksPage() {
    const tasks = useSelector((state: RootState) => selectAllTasks(state));
    const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false)
    const isTableLoading = useSelector(
        (state: RootState) => state.task.loading
    );

    function toggleModal() {
        setAddTaskModalVisible(!isAddTaskModalVisible);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllTasks());
    }, [dispatch]);
    let columns: ColumnProps<any>[] = [];

    if (tasks.length > 0) {
        columns.push({
            title: "Title",
            dataIndex: "title",
            key: "id",
            render: (text: any, record: Task) => {
                return <span>{record.title}</span>
            }
        });
        columns.push({
            title: "Kind",
            dataIndex: "kind",
            key: "id",
            render: (text: any, record: Task) => {
                return <span>{record.kind}</span>
            }
        });
        columns.push({
            title: "State",
            dataIndex: "state",
            key: "id",
            render: (text: any, record: Task) => {
                return <span>{record.state}</span>
            }
        });
        columns.push({
            title: "Due date",
            dataIndex: "due_at",
            key: "id",
            render: (text: any, record: Task) => {
                return <span>{date(record.due_at).format(dateFormat)}</span>
            }
        });
    }

    return (
        <>
            <AddTaskModule isVisible={isAddTaskModalVisible} onCancel={toggleModal}/>
            <Row gutter={[16, 16]} justify={"space-between"}>
                <Col xs={24} sm={16} md={10} lg={16} xl={16} xxl={16}>
                    <Title>Tasks Page</Title>
                </Col>
                <Col xs={24} sm={7} md={5} lg={4} xl={3} xxl={2}>
                    <AlButton type='primary' style={{width: '100%'}} onClick={() => toggleModal()}>Add task</AlButton>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify={"space-between"}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        dataSource={tasks}
                        columns={columns}
                        rowKey="id"
                        scroll={tasks.length < 1 ? {x: undefined} : {x: 'auto'}}
                        loading={isTableLoading}
                        style={{width: "100%"}}
                    />
                </Col>
            </Row>
        </>
    );
};