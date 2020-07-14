import * as React from 'react';
import {useEffect, useState} from 'react';
import {AutoComplete, Col, Modal, Row, Select, Typography} from 'antd';
import styles from './searchControl.module.scss';
import {Control, selectAllControls} from '../../../redux/Control/ControlSlice';
import {CloseOutlined} from "@ant-design/icons/lib";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {fetchAllControls} from "../../../redux/Control/ControlService";
import modalStyles from "../modal.module.scss";
import StringUtil from "../../../util/StringUtil";

const {Title} = Typography
const {Option} = Select;

interface SearchControlModal {
    isVisible?: boolean;
    onCancel?: any;
    onSelect: any;
}

interface ControlOption {
    key: string;
    value: string;
    children: string;
}

export function SearchControlModal(props: SearchControlModal) {
    const allControls = useSelector((state: RootState) => selectAllControls(state))
    const [filteredControls, setFilteredControls] = useState<Control[]>([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllControls());
    }, [dispatch]);

    function onSelect(controlOption: ControlOption) {
        const control = allControls.find(control => control.id === controlOption.key);
        props.onSelect(control);
    }

    const handleSearch = (value: string) => {
        setFilteredControls(allControls.filter(control =>
            StringUtil.stringIncludes(control.title, value) || StringUtil.stringIncludes(control.description, value)))
    };

    const children = filteredControls.map((control: Control) => (
        <Option key={control.id} value={control.title}>
            {control.title}
        </Option>
    ));

    return (
        <>
            <Modal
                className={modalStyles.modalTop}
                width={540}
                visible={props.isVisible}
                maskClosable={true}
                onCancel={props.onCancel}
                footer={null}
                closeIcon={<CloseOutlined className={styles.modalCloseButton}/>}
                bodyStyle={{padding: 0}}
            >
                <div style={{padding: "12px 14px"}}>
                    <Title style={{margin: 0}}>Search control</Title>
                </div>
                <div className={styles.addTaskModalContent}>
                    <Row gutter={[16, 16]} align={"middle"}>
                        <Col xs={{span: 24}}>
                            <AutoComplete style={{width: "100%"}}
                                          onSearch={handleSearch}
                                          placeholder="Search for control"
                                          onSelect={(title: string, controlOption: any) => onSelect(controlOption as ControlOption)}>
                                {children}
                            </AutoComplete>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
}
