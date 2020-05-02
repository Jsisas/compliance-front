import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../reducer';
import { fetchAllUsers } from './UserService';

export enum UserStatus {
    NOT_IMPLEMENTED,
    IMPLEMENTED
}

export enum UserCategory {
    POLICY,
    PROCEDURE
}

export interface User {
    id: string,
    fname: string,
    lname: string,
    authenticated: false;
}

const usersAdapter = createEntityAdapter<User>({
    selectId: user => user.id,
    sortComparer: (a, b) => a.fname.localeCompare(b.fname)
});

const userInitialState: EntityState<User> = usersAdapter.getInitialState();
const userSelectors = usersAdapter.getSelectors((state: RootState) => state.user.entities)

export const selectAllUsers = userSelectors.selectAll;
export const selectUserById = userSelectors.selectById;
export const setUsers = (users: User[], state: EntityState<User>) => usersAdapter.setAll(state, users);
export const createOneUser = (user: User, state: EntityState<User>) => usersAdapter.addOne(state, user);
export const updateOneUser = (user: User, state: EntityState<User>) => usersAdapter.updateOne(state, { id: user.id, changes: user });
export const deleteOneUser = (userId: string, state: EntityState<User>) => usersAdapter.removeOne(state, userId);


const UserSlice = createSlice({
    name: 'user',
    initialState: { entities: userInitialState, loading: false },
    reducers: {
        createUser(state, { payload }: PayloadAction<User>) {
            usersAdapter.addOne(state.entities, payload)
        },
        editUser(state, { payload }: PayloadAction<User>) {
            updateOneUser(payload, state.entities)
        },
        deleteUser(state, { payload }: PayloadAction<User>) {
            deleteOneUser(payload.id, state.entities)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            usersAdapter.setAll(state.entities, action.payload);
        })
    }
})

export const { createUser, editUser, deleteUser } = UserSlice.actions
export default UserSlice.reducer;
