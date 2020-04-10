import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Control {
    id: number,
    title: string
}

const controlInitialState: Control[] = []

const controlSlice = createSlice({
    name: 'control',
    initialState: controlInitialState,
    reducers: {
        createControl(state, { payload }: PayloadAction<Control>) {
            state.push(payload)
        },
        editContorl(state, { payload }: PayloadAction<Control>) {
            const control = state.find(control => control.id === payload.id)
            if (control) {
                control.title = payload.title;
            }
        },
        deleteContorl(state, { payload }: PayloadAction<Control>) {
            const controlIndex = state.findIndex(control => control.id === payload.id);
            if (controlIndex !== -1) {
                state.splice(controlIndex, 1);
            }
        }
    }
})

export const { createControl, editContorl, deleteContorl } = controlSlice.actions
export default controlSlice.reducer;
