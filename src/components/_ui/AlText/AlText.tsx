import * as React from 'react';
import {Typography} from "antd";
import {ReactNode} from "react";
import styles from './alText.module.scss';
import {concatStyles} from "../../../util/StyleUtil";

const {Text} = Typography;

interface AlTextProps {
    bold?: 'normal' | 'semi-bold';
    type?: "secondary" | "danger" | "warning";
    children?: ReactNode;
}
export function AlText(props: AlTextProps) {

    const boldClass = props.bold === 'semi-bold' ? styles.semiBold : '';
    const classStr = concatStyles(styles.textStyle, boldClass)

    return (
        <Text className={classStr} type={props.type}>
            {props.children}
        </Text>
    );
};