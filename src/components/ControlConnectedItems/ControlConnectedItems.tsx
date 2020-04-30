import * as React from 'react';
import {Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import {Control} from "../../redux/Control/ControlSlice";
import {shortenStringLength} from "../../util/StringUtil";
import styles from './contorlConnectedItems.module.scss';

const {Text} = Typography;

interface TaskConnectedItemsProps {
    control: Control;
}

export function ControlConnectedItems(props: TaskConnectedItemsProps) {

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
                            <Text type={'secondary'}>Requirements</Text>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            {
                                props.control.requirements.map(requirement => {
                                    return (
                                        <Link key={requirement.id} to={`/requirements/${requirement.id}`}>
                                            {shortenStringLength(requirement.title, 50)}
                                        </Link>
                                    )
                                })
                            }
                        </Col>
                    </Row>
            </Col>
        </>
    );
};