import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number,
    fname: string
}

const userInitialState: User[] = []

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        createUser(state, { payload }: PayloadAction<User>) {
            state.push(payload)
        },
        editUser(state, { payload }: PayloadAction<User>) {
            const user = state.find(user => user.id === payload.id)
            if (user) {
                user.fname = payload.fname;
            }
        },
        deleteUser(state, { payload }: PayloadAction<User>) {
            const userIndex = state.findIndex(user => user.id === payload.id);
            if (userIndex !== -1) {
                state.splice(userIndex, 1);
            }
        }
    }
})

export const { createUser, editUser, deleteUser } = userSlice.actions
export default userSlice.reducer;
