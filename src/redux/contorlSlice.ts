import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Control {
    id: number,
    title: string
}

const courseInitialState: Control[] = []

const coursesSlice = createSlice({
    name: 'courses',
    initialState: courseInitialState,
    reducers: {
        createControl(state, { payload }: PayloadAction<Control>) {
            state.push(payload)
        },
        editContorl(state, { payload }: PayloadAction<Control>) {
            const course = state.find(course => course.id === payload.id)
            if (course) {
                course.title = payload.title;
            }
        },
        deleteContorl(state, { payload }: PayloadAction<Control>) {
            const courseIndex = state.findIndex(course => course.id === payload.id);
            if (courseIndex !== -1) {
                state.splice(courseIndex, 1);
            }
        }
    }
})

export const { createControl, editContorl, deleteContorl } = coursesSlice.actions
export default coursesSlice.reducer;
