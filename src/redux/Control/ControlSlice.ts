import { RootState } from '../reducer';
import { createSlice, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit";

export interface Control {
    id: number,
    title: string,
}

const controlsAdapter = createEntityAdapter<Control>({
    selectId: control => control.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const controlInitialState: EntityState<Control> = controlsAdapter.getInitialState();
const controlSelectors = controlsAdapter.getSelectors((state: RootState) => state.control)

export const selectAllControls = controlSelectors.selectAll;
export const selectControlById = controlSelectors.selectById;
export const createOneControl = (control: Control, state: EntityState<Control>) => controlsAdapter.addOne(state, control);
export const updateOneControl = (control: Control, state: EntityState<Control>) => controlsAdapter.updateOne(state, { id: control.id, changes: control });
export const deleteOneControl = (controlId: number, state: EntityState<Control>) => controlsAdapter.removeOne(state, controlId);


const ControlSlice = createSlice({
    name: 'control',
    initialState: controlInitialState,
    reducers: {
        createControl(state, { payload }: PayloadAction<Control>) {
            createOneControl(payload, state);
        },
        editControl(state, { payload }: PayloadAction<Control>) {
            updateOneControl(payload, state)
        },
        deleteControl(state, { payload }: PayloadAction<Control>) {
            deleteOneControl(payload.id, state)
        }
    }
})

export const { createControl, editControl, deleteControl } = ControlSlice.actions
export default ControlSlice.reducer;
