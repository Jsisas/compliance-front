import React, {ReactNode} from "react";
import {Button as AntdButton} from "antd";
import styles from "./button.module.scss";
import {CSSProperties} from "styled-components";

export interface ButtonProp {
  type: "primary" | "secondary";
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  htmlType?: "button" | "submit" | "reset" | undefined;
}

export default function Button(props: ButtonProp) {
  function onButtonClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    if (props.onClick) {
      props.onClick(e);
    }
  }

  return (
    <AntdButton
      className={`${styles[props.type]}`}
      type={"primary"}
      style={props.style}
      onClick={onButtonClick}
      htmlType={props.htmlType}
    >
      {props.children}
    </AntdButton>
  );
}
