import { Select, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer";
import { User, selectAllUsers } from "../../redux/User/UserSlice";
import { fetchAllUsers } from "../../redux/User/UserService";

const { Option } = Select;

export function AssigneeSearch() {
    const allUsers = useSelector((state: RootState) => selectAllUsers(state))
    const dispatch = useDispatch();
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    useEffect(() => { dispatch(fetchAllUsers()) }, [dispatch])

    function onSelect(value: number, option?: any) {
        const user = allUsers.find(user => user.id === value);
        console.log(value)
        console.log(allUsers)
        console.log(user)
        if (user) {
            setSelectedUsers([...selectedUsers, user])
        }
    }

    function onDeselect(value: any, option?: any) {
        setSelectedUsers(selectedUsers.filter((user) => user.id !== value))
    }
    return (
        <>
            <Select
                mode="multiple"
                placeholder="Select users"
                notFoundContent={false ? <Spin size="small" /> : null}
                filterOption={false}
                style={{ width: '100%' }}
                onSelect={(value, option) => {
                    onSelect(value, option)
                }
                }
                value={selectedUsers.map(user => { return user.id })}
                onDeselect={(value, option) => onDeselect(value, option)}
            >
                {
                    allUsers.map((d: User) => (
                        <Option key={d.id} value={d.id}>{d.fname} {d.lname}</Option>
                    ))
                }
            </Select>
        </>
    )
}