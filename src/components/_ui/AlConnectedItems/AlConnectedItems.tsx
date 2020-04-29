import * as React from 'react';
import {Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import {Regulation} from "../../../redux/Regulation/RegulationSlice";
import {Task} from "../../../redux/Task/TaskSlice";
import {Requirement} from "../../../redux/Requirement/RequirementSlice";
import {Control} from "../../../redux/Control/ControlSlice";
import {lowerCameltoUpperCamel, shortenStringLength} from "../../../util/StringUtil";
import styles from './alConnectedItems.module.scss';

const {Text} = Typography;

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
            if (Array.isArray(value) && value.length > 0 && (typeof value[0] === 'object') || (typeof value === "object")) {
                values[key] = value;
            }
        });
    }

    function getLink(value: any, key: string){
        if(Array.isArray(value)){
            return value.map((x) => {
                return (
                    <Link key={x.id}
                          to={`/${key}/${x.id}`}>{shortenStringLength(lowerCameltoUpperCamel(x.title), 50)}z</Link>
                )
            })
        }else if(typeof value === "object") {
            return (
                <Link key={value.id}
                      to={`/${key}/${value.id}`}>{shortenStringLength(lowerCameltoUpperCamel(value.title), 50)}z</Link>
            )
        }
    }

    return (
        <>
            <Col xs={24} className={styles.connectedItem}>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Text style={{fontWeight: 600}}>Connected items</Text>
                    </Col>
                </Row>

                {
                    Object.entries(values).map(([key, value]) => {
                        return (
                            <div key={key}>
                                <Row gutter={[16, 0]}>
                                    <Col xs={24}>
                                        <Text type={'secondary'}>{lowerCameltoUpperCamel(key)}</Text>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        {getLink(value, key)}
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