import {RootState} from '../reducer';
import {createSlice, PayloadAction, createEntityAdapter, EntityState} from "@reduxjs/toolkit";
import {fetchAllControls, fetchControlById} from './ControlService';
import {Task} from '../Task/TaskSlice';
import {User} from '../User/UserSlice';
import {Requirement} from "../Requirement/RequirementSlice";

export enum ControlStatus {
    IN_DESIGN = "In design",
    IMPLEMENTED = "Implemented",
    FAILING = "Failing",
    OK = "Ok",
}

export enum ControlCategory {
    POLICY = "Policy",
    PROCEDURE = "Procedure"
}

export interface Control {
    id: string,
    title: string,
    kind: ControlCategory,
    startDate: Date,
    state: ControlStatus,
    assignees: User[];
    tasks: Task[];
    requirements: Requirement[];
    description: string;
}

const controlsAdapter = createEntityAdapter<Control>({
    selectId: control => control.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const controlInitialState: EntityState<Control> = controlsAdapter.getInitialState();
const controlSelectors = controlsAdapter.getSelectors((state: RootState) => state.control.entities)

export const selectAllControls = controlSelectors.selectAll;
export const selectControlById = controlSelectors.selectById;
const updateOneControl = (control: Control, state: EntityState<Control>) => controlsAdapter.updateOne(state, {
    id: control.id,
    changes: control
});

const ControlSlice = createSlice({
    name: 'control',
    initialState: {entities: controlInitialState, loading: false},
    reducers: {
        createControl(state, {payload}: PayloadAction<Control>) {
            controlsAdapter.addOne(state.entities, payload)
        },
        updateControl(state, {payload}: PayloadAction<Control>) {
            updateOneControl(payload, state.entities)
        },
        updateAllControls(state, action: PayloadAction<Control[]>) {
            controlsAdapter.setAll(state.entities, action);
        },
        deleteControl(state, {payload}: PayloadAction<Control>) {
            controlsAdapter.removeOne(state.entities, payload.id)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllControls.fulfilled, (state, action) => {
            controlsAdapter.setAll(state.entities, action);
            state.loading = false;
        })
        builder.addCase(fetchControlById.fulfilled, (state, action) => {
            updateOneControl(action.payload, state.entities)
            state.loading = false;
        })
    }
})

export const {createControl, updateControl, deleteControl, updateAllControls} = ControlSlice.actions
export default ControlSlice.reducer;
