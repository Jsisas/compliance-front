import React, {ReactNode} from "react";
import {Button as AntdButton} from "antd";
import styles from "./alButton.module.scss";
import {CSSProperties} from "styled-components";
import {concatStyles} from "../../../util/StyleUtil";

export interface ButtonProp {
  type: "primary" | "secondary" | "link";
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: any;
  htmlType?: "button" | "submit" | "reset";
  className?: string | "";
  disabled?: boolean;
}

export default function AlButton(props: ButtonProp) {
  function onButtonClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    if (props.onClick) {
      props.onClick(e);
    }
  }

  function getButtonClassName(type: string): string {
    if(props.type === "link"){
      return '';
    }else {
      return styles[props.type]
    }
  }

  function getButtonType(type: string): 'link' | 'primary' | undefined {
    if(type === 'link' || type === 'primary'){
      return type;
    }else if(type === 'secondary'){
      return undefined
    }else {
      return 'primary'
    }
  }

  return (
    <AntdButton
      className={concatStyles(getButtonClassName(props.type), (props.className || ""))}
      type={getButtonType(props.type)}
      style={props.style}
      onClick={onButtonClick}
      htmlType={props.htmlType}
      disabled={props.disabled || false}
    >
      {props.children}
    </AntdButton>
  );
}
