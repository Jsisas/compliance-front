import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducer";
import {Col, Row, Typography, Upload} from "antd";
import {EditOutlined, EllipsisOutlined, InboxOutlined, LeftOutlined} from "@ant-design/icons/lib";
import AlButton from "../../components/_ui/AlButton/AlButton";
import {fetchAllTasks} from "../../redux/Task/TaskService";
import {selectTaskById} from "../../redux/Task/TaskSlice";
import styles from './taskDetails.module.scss'
import {date, dateFormat} from "../../util/DateUtil";
import {AddLink, AddLinkModal} from "../../components/modals/AddLinkModal/AddLinkModal";
import {AlComment} from "../../components/_ui/AlComment/AlComment";
import TextArea from "antd/lib/input/TextArea";
import {TaskConnectedItems} from "../../components/TaskConnectedItems/TaskConnectedItems";

const {Title, Text} = Typography;
const { Dragger } = Upload;

interface TaskDetailsProps {
    history: any;
}

export function TaskDetail(props: TaskDetailsProps) {
    let {id} = useParams<{ id: string }>();
    const task = useSelector((state: RootState) => selectTaskById(state, id));
    const [isAddLinkModalVisible, setAddLinkModalVisible] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllTasks());
    }, [dispatch]);

    function addTask() {
        console.log("Task added")
    }

    function toggleModal() {
        setAddLinkModalVisible(!isAddLinkModalVisible);
    }

    function onLinkAdd(link: AddLink) {
        toggleModal();
        console.log(link.href)
    }

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={1} xl={1}>
                    <AlButton type="link" onClick={() => props.history.goBack()}>
                        <LeftOutlined style={{fontSize: "24px", float: "right"}}/>
                    </AlButton>
                </Col>
                <Col xs={{span: 10}} sm={10} md={10} lg={{span: 10}}
                     xl={{span: 10}}>
                    <Title style={{marginBottom: 0}}>{task?.title}</Title>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align={"bottom"}>
                <Col xs={{span: 10, offset: 1}} sm={10} md={10} lg={{span: 10, offset: 1}}
                     xl={{span: 10, offset: 1}}>
                    <Text
                        type={"secondary"}>{task?.description || "When an employee leaves the company, their authorizations are revoked in the company’s access provisioning software on the last day of their employment contract."}</Text>
                </Col>
                <Col xs={{span: 24}} sm={{span: 6, offset: 6}} md={{span: 4, offset: 8}} lg={{span: 4, offset: 8}}
                     xl={{span: 3, offset: 10}}>
                    <AlButton type={'secondary'} style={{float: 'right'}}><EllipsisOutlined/></AlButton>
                    <AlButton type={'secondary'}
                              style={{marginRight: '8px', float: 'right'}}><EditOutlined/></AlButton>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={{span: 24, offset: 1}} md={{span: 24, offset: 1}}
                     lg={{span: 17, offset: 1}} xl={{span: 17, offset: 1}}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text type={'secondary'}>Status</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text type={'secondary'}>Assignee</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={3}>
                            <Text type={'secondary'}>Type</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                            <Text type={'secondary'}>Due date</Text>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}}
                             lg={{span: 17}} xl={{span: 2}}>
                            <Text>{task?.state}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={2}>
                            <Text>{task?.assignee?.fname != null ? '@' : ''}{task?.assignee?.fname} {task?.assignee?.lname}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={17} xl={3}>
                            <Text>{task?.kind}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                            <Text>{date(task?.due_at).format(dateFormat)}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{span: 24, offset: 1}} sm={{span: 24, offset: 1}} md={{span: 24, offset: 1}}
                     lg={{span: 5, offset: 1}} xl={{span: 5, offset: 1}}>
                    {task != null &&
                        <TaskConnectedItems task={task}/>
                    }
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={24} md={24} lg={{span: 17, offset: 1}}
                     xl={{span: 17, offset: 1}}>
                    <Text className={styles.subHeader}>Description</Text>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={24} md={24} lg={{span: 17, offset: 1}}
                     xl={{span: 17, offset: 1}}>
                    <Text>{task?.description}</Text>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={24} md={24} lg={{span: 17, offset: 1}}
                     xl={{span: 10, offset: 1}}>
                    <Dragger {...props} openFileDialogOnClick={false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Drag and drop evidence</p>
                        <p className="ant-upload-hint">CSV, PDF, XLSX</p>
                        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                            <Upload {...props}>
                                <AlButton type="link" className={styles.buttonPadding}>Open from computer</AlButton>
                            </Upload>
                            <Text>or</Text>
                            <AddLinkModal onAdd={(link: AddLink) => onLinkAdd(link)} isVisible={isAddLinkModalVisible} onCancel={toggleModal}/>
                            <AlButton type="link" className={styles.buttonPadding} onClick={() => setAddLinkModalVisible(!isAddLinkModalVisible)}>add link</AlButton>
                        </div>
                    </Dragger>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 10, offset: 1}} sm={10} md={10} lg={{span: 10, offset: 1}}
                     xl={{span: 10, offset: 1}}>
                    <Text>Comment</Text>
                    <TextArea placeholder="Add comment"/>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 10, offset: 1}} sm={10} md={10} lg={{span: 10, offset: 1}}
                     xl={{span: 10, offset: 1}}>
                    <AlComment>
                        <AlComment />
                    </AlComment>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={{span: 24, offset: 1}} sm={24} md={24} lg={{span: 17, offset: 1}}
                     xl={{span: 17, offset: 1}}>
                    <AlButton type="primary" onClick={addTask}>Add task</AlButton>
                </Col>
            </Row>
        </>
    );
};