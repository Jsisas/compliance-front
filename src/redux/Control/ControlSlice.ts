import { RootState } from '../reducer';
import { createSlice, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { fetchAllControls } from './ControlService';
import { Task } from '../Task/TaskSlice';

export enum ControlStatus {
    NOT_IMPLEMENTED,
    IMPLEMENTED
}

export enum ControlCategory {
    POLICY,
    PROCEDURE
}

export interface Control {
    id: number,
    title: string,
    category: ControlCategory,
    status: ControlStatus,
    tasks: Task[];
}

const controlsAdapter = createEntityAdapter<Control>({
    selectId: control => control.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const controlInitialState: EntityState<Control> = controlsAdapter.getInitialState();
const controlSelectors = controlsAdapter.getSelectors((state: RootState) => state.control.entities)

export const selectAllControls = controlSelectors.selectAll;
export const selectControlById = controlSelectors.selectById;
export const setControls = (controls: Control[], state: EntityState<Control>) => controlsAdapter.setAll(state, controls);
export const createOneControl = (control: Control, state: EntityState<Control>) => controlsAdapter.addOne(state, control);
export const updateOneControl = (control: Control, state: EntityState<Control>) => controlsAdapter.updateOne(state, { id: control.id, changes: control });
export const deleteOneControl = (controlId: number, state: EntityState<Control>) => controlsAdapter.removeOne(state, controlId);


const ControlSlice = createSlice({
    name: 'control',
    initialState: { entities: controlInitialState, loading: true },
    reducers: {
        createControl(state, { payload }: PayloadAction<Control>) {
            createOneControl(payload, state.entities);
        },
        editControl(state, { payload }: PayloadAction<Control>) {
            updateOneControl(payload, state.entities)
        },
        deleteControl(state, { payload }: PayloadAction<Control>) {
            deleteOneControl(payload.id, state.entities)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllControls.fulfilled, (state, action) => {
            state.loading = false;
            controlsAdapter.setAll(state.entities, action.payload);
        })
    }
})

export const { createControl, editControl, deleteControl } = ControlSlice.actions
export default ControlSlice.reducer;
