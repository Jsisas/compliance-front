import {RootState} from '../reducer';
import {createSlice, PayloadAction, createEntityAdapter, EntityState} from "@reduxjs/toolkit";
import {fetchAllControls} from './ControlService';
import {Task} from '../Task/TaskSlice';
import {User} from '../User/UserSlice';

export enum ControlStatus {
    NOT_IMPLEMENTED = "Not implemented",
    IMPLEMENTED = "Implemented"
}

export enum ControlCategory {
    POLICY = "Policy",
    PROCEDURE = "Procedure"
}

export interface Control {
    id: number,
    name: string,
    category: ControlCategory,
    startDate: string,
    status: ControlStatus,
    assignees: User[];
    tasks: Task[];
}

const controlsAdapter = createEntityAdapter<Control>({
    selectId: control => control.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const controlInitialState: EntityState<Control> = controlsAdapter.getInitialState();
const controlSelectors = controlsAdapter.getSelectors((state: RootState) => state.control.entities)

export const selectAllControls = controlSelectors.selectAll;
export const selectControlById = controlSelectors.selectById;
export const setControls = (controls: Control[], state: EntityState<Control>) => controlsAdapter.setAll(state, controls);
export const createOneControl = (control: Control, state: EntityState<Control>) => controlsAdapter.addOne(state, control);
export const updateOneControl = (control: Control, state: EntityState<Control>) => controlsAdapter.updateOne(state, {
    id: control.id,
    changes: control
});
export const deleteOneControl = (controlId: number, state: EntityState<Control>) => controlsAdapter.removeOne(state, controlId);


const ControlSlice = createSlice({
    name: 'control',
    initialState: {entities: controlInitialState, loading: false},
    reducers: {
        createControl(state, {payload}: PayloadAction<Control>) {
            controlsAdapter.addOne(state.entities, payload)
        },
        editControl(state, {payload}: PayloadAction<Control>) {
            updateOneControl(payload, state.entities)
        },
        deleteControl(state, {payload}: PayloadAction<Control>) {
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

export const {createControl, editControl, deleteControl} = ControlSlice.actions
export default ControlSlice.reducer;
