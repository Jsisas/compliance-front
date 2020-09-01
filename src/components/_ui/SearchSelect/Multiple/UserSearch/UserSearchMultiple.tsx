import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducer';
import { selectAllUsers, User } from '../../../../../redux/User/UserSlice';
import { fetchAllUsers } from '../../../../../redux/User/UserService';
import { SearchSelectMultiple } from '../SearchSelectMultiple';

export interface UserSearchMultipleProps {
	onChange(selectedUsers: User[]): void;
	allowClear?: boolean;
	placeholder?: string;
	selectedUsers?: User[];
}

export function UserSearchMultiple(props: UserSearchMultipleProps): JSX.Element {
	const allUsers = useSelector((state: RootState) => selectAllUsers(state));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch]);

	return (
		<>
			{}
			<SearchSelectMultiple
				data={allUsers}
				displayKey={'name'}
				valueKey={'id'}
				allowClear={props.allowClear}
				placeholder={props.placeholder}
				selectedData={props.selectedUsers}
				onChange={(user: User[]) => (props.onChange ? props.onChange(user) : undefined)}
				data-testid={'userSearch'}
			/>
		</>
	);
}
