import * as React from 'react';
import {Col, Row} from "antd";
import {AlText} from "../AlText/AlText";
import {Link} from "react-router-dom";
import {Regulation} from "../../../redux/Regulation/RegulationSlice";
import {Task} from "../../../redux/Task/TaskSlice";
import {Requirement} from "../../../redux/Requirement/RequirementSlice";
import {Control} from "../../../redux/Control/ControlSlice";
import {lowerCameltoUpperCamel, shortenStringLength} from "../../../util/StringUtil";
import styles from './alConnectedItems.module.scss';

interface AlConnectedItemsProps {
    data?: Regulation | Requirement | Control | Task;
}

interface Data {
    [key: string]: any[]
}

export function AlConnectedItems(props: AlConnectedItemsProps) {

    const values: Data = {};

    if (props.data !== undefined) {
        Object.entries(props.data).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0 && (typeof value[0] === 'object')) {
                values[key] = value;
            }
        });
    }


    return (
        <>
            <Col xs={24} className={styles.connectedItem}>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <AlText bold={'semi-bold'}>Connected items</AlText>
                    </Col>
                </Row>

                {
                    Object.entries(values).map(([key, value]) => {
                        return (
                            <div key={key}>
                                <Row gutter={[16, 0]}>
                                    <Col xs={24}>
                                        <AlText type={'secondary'}>{lowerCameltoUpperCamel(key)}</AlText>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        {value.map((x) => {
                                            return (
                                                <Link key={x.id}
                                                    to={`/${key}/${x.id}`}>{shortenStringLength(lowerCameltoUpperCamel(x.title), 50)}z</Link>
                                            )
                                        })
                                        }
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }


            </Col>
        </>
    );
};