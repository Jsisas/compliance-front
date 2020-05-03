import { Select, Spin } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer";
import { User, selectAllUsers } from "../../redux/User/UserSlice";
import { fetchAllUsers } from "../../redux/User/UserService";

const { Option } = Select;


export interface UserSearchProps {
    onChange?(selectedUsers: User[]): void;
    placeholder?: string;
}
export function UserSearch(props: UserSearchProps) {
    const allUsers = useSelector((state: RootState) => selectAllUsers(state))
    const dispatch = useDispatch();
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    useEffect(() => { dispatch(fetchAllUsers()) }, [dispatch])

    const triggerOnChange = useCallback(() => {
        if (props.onChange) {
            props.onChange(selectedUsers);
        }
    }, [selectedUsers, props])

    useEffect(() => {
        triggerOnChange();
    }, [selectedUsers, triggerOnChange])

    function onSelect(value: string) {
        const user = allUsers.find(user => user.id === value);
        if (user) {
            setSelectedUsers([...selectedUsers, user])
            triggerOnChange()
        }
    }

    function onDeselect(value: any, option?: any) {
        setSelectedUsers(selectedUsers.filter((user) => user.id !== value))
        triggerOnChange()
    }

    return (
        <>
            <Select
                mode="multiple"
                placeholder={props.placeholder || "Search users"}
                notFoundContent={false ? <Spin size="small" /> : null}
                filterOption={false}
                style={{ width: '100%' }}
                onSelect={(value) => {
                    onSelect(value)
                }
                }
                value={selectedUsers.map(user => { return user.id })}
                onDeselect={(value, option) => onDeselect(value, option)}
            >
                {
                    allUsers.map((d: User) => (
                        <Option key={d.id} value={d.id}>{d.name}</Option>
                    ))
                }
            </Select>
        </>
    )
}