import {Select} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer';
import {selectAllUsers, User} from '../../redux/User/UserSlice';
import {fetchAllUsers} from '../../redux/User/UserService';

const {Option} = Select;


export interface UserSearchProps {
	onChange?(selectedUsers: User[]): void;

	placeholder?: string;
	selectedUser?: User
}

export function UserSearch(props: UserSearchProps): JSX.Element {
	const allUsers = useSelector((state: RootState) => selectAllUsers(state));
	const dispatch = useDispatch();
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch]);

	const triggerOnChange = useCallback(() => {
		if (props.onChange) {
			props.onChange(selectedUsers);
		}
	}, [selectedUsers, props]);

	useEffect(() => {
		triggerOnChange();
	}, [selectedUsers, triggerOnChange]);

	function onSelect(value: string) {
		const user = allUsers.find(user => user.id === value);
		if (user) {
			setSelectedUsers([...selectedUsers, user]);
			triggerOnChange();
		}
	}

	function onDeselect(value: string) {
		setSelectedUsers(selectedUsers.filter((user) => user.id !== value));
		triggerOnChange();
	}

	return (
		<>
			<Select
				placeholder={props.placeholder || 'Search users'}
				filterOption={false}
				style={{width: '100%'}}
				onSelect={(value) => {
					onSelect(value);
				}
				}
				value={selectedUsers.map(user => {
					return user.id;
				})}
				onDeselect={(value) => onDeselect(value)}
			>
				{
					allUsers.map((d: User) => (
						<Option key={d.id} value={d.id}>{d.name}</Option>
					))
				}
			</Select>
		</>
	);
}
