import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../reducer';
import { fetchAllUsers } from './UserService';

export interface User {
	id: string;
	email: string;
	name: string;
	picture: string;
}

const usersAdapter = createEntityAdapter<User>({
	selectId: (user) => user.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const userInitialState: EntityState<User> = usersAdapter.getInitialState();
const userSelectors = usersAdapter.getSelectors((state: RootState) => state.user.entities);

export const selectAllUsers = userSelectors.selectAll;

const UserSlice = createSlice({
	name: 'user',
	initialState: { entities: userInitialState, loading: false },
	reducers: {
		createUser(state, { payload }: PayloadAction<User>) {
			usersAdapter.addOne(state.entities, payload);
		},
		editUser(state, { payload }: PayloadAction<User>) {
			usersAdapter.updateOne(state.entities, { id: payload.id, changes: payload });
		},
		deleteUser(state, { payload }: PayloadAction<User>) {
			usersAdapter.removeOne(state.entities, payload.id);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
			state.loading = false;
			usersAdapter.setAll(state.entities, action.payload);
		});
	},
});

export const { createUser, editUser, deleteUser } = UserSlice.actions;
export default UserSlice.reducer;
