import * as React from 'react';
import {useEffect, useState} from 'react';
import {AutoComplete, Col, Modal, Row, Select, Typography} from 'antd';
import styles from './searchControl.module.scss';
import {Control, selectAllControls} from '../../../redux/Control/ControlSlice';
import {CloseOutlined} from "@ant-design/icons/lib";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {fetchAllControls} from "../../../redux/Control/ControlService";
import {stringIncludes} from "../../../util/StringUtil";

const {Title} = Typography
const {Option} = Select;

interface SearchControlModal {
    isVisible?: boolean;
    onCancel?: any;
    onSelect: any;
}

export function SearchControlModal(props: SearchControlModal) {
    const allControls = useSelector((state: RootState) => selectAllControls(state))
    const [filteredControls, setFilteredControls] = useState<Control[]>([]);
    const [selectedControl, setSelectedControl] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllControls());
    }, [dispatch]);

    function onSelect(controlId: string){
        const control = allControls.find(control => control.id === controlId);
        setSelectedControl(control);
        props.onSelect(control);
    }

    const handleSearch = (value: string) => {
        setFilteredControls(allControls.filter(control => stringIncludes(control.title, value) || stringIncludes(control.description, value)))
    };


    const children = filteredControls.map((control: Control) => (
        <Option key={control.id} value={control.id}>
            {control.title}
        </Option>
    ));

    return (
        <>
            <Modal
                width={540}
                visible={props.isVisible}
                maskClosable={true}
                onCancel={props.onCancel}
                footer={null}
                wrapClassName={styles.modalBody}
                closeIcon={<CloseOutlined className={styles.modalCloseButton}/>}
                bodyStyle={{padding: 0}}
            >
                <div style={{padding: "12px 14px"}}>
                    <Title style={{margin: 0}}>Search control</Title>
                </div>
                <div className={styles.addTaskModalContent}>
                    <Row gutter={[16, 16]} align={"middle"}>
                        <Col xs={{span: 24}}>
                            <AutoComplete style={{ width: "100%" }}
                                          onSearch={handleSearch}
                                          placeholder="Search for control"
                                          onSelect={(controlId: string) => onSelect(controlId)}
                                          value={selectedControl?.title}>
                                {children}
                            </AutoComplete>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
};