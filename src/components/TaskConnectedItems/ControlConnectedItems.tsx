import * as React from 'react';
import {Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import {Regulation} from "../../redux/Regulation/RegulationSlice";
import {Task} from "../../redux/Task/TaskSlice";
import {Requirement} from "../../redux/Requirement/RequirementSlice";
import {Control} from "../../redux/Control/ControlSlice";
import {lowerCameltoUpperCamel, shortenStringLength} from "../../util/StringUtil";
import styles from './contorlConnectedItems.module.scss';

const {Text} = Typography;

interface TaskConnectedItemsProps {
    task: Task;
}

export function TaskConnectedItems(props: TaskConnectedItemsProps) {

    return (
        <>
            <Col xs={24} className={styles.connectedItem}>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Text style={{fontWeight: 600}}>Connected items</Text>
                    </Col>
                </Row>
                <Row gutter={[16, 0]}>
                    <Col xs={24}>
                        <Text type={'secondary'}>Control</Text>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Link key={props.task.control.id} to={`/controls/${props.task.control.id}`}>
                            {shortenStringLength(props.task.control.title, 50)}
                        </Link>
                    </Col>
                </Row>
            </Col>
        </>
    );
};