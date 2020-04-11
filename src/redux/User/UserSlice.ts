import { RootState } from '../reducer';
import { createSlice, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { fetchAllUsers } from './UserService';

export interface User {
    id: number,
    fname: string,
    lname: string,
}

const usersAdapter = createEntityAdapter<User>({
    selectId: user => user.id,
    sortComparer: (a, b) => a.fname.localeCompare(b.fname)
});

const userInitialState: EntityState<User> = usersAdapter.getInitialState();
const userSelectors = usersAdapter.getSelectors((state: RootState) => state.user)

export const selectAllUsers = userSelectors.selectAll;
export const selectUserById = userSelectors.selectById;
export const setUsers = (users: User[], state: EntityState<User>) => usersAdapter.setAll(state, users);
export const createOneUser = (user: User, state: EntityState<User>) => usersAdapter.addOne(state, user);
export const updateOneUser = (user: User, state: EntityState<User>) => usersAdapter.updateOne(state, { id: user.id, changes: user });
export const deleteOneUser = (userId: number, state: EntityState<User>) => usersAdapter.removeOne(state, userId);


const UserSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        createUser(state, { payload }: PayloadAction<User>) {
            createOneUser(payload, state);
        },
        editUser(state, { payload }: PayloadAction<User>) {
            updateOneUser(payload, state)
        },
        deleteUser(state, { payload }: PayloadAction<User>) {
            deleteOneUser(payload.id, state)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            usersAdapter.setAll(state, action.payload);
        })
    }
})

export const { createUser, editUser, deleteUser } = UserSlice.actions
export default UserSlice.reducer;
