import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {Control} from "../Control/ControlSlice";
import {fetchAllRequirements} from "./RequirementService";
import {Regulation} from "../Regulation/RegulationSlice";

export interface RequirementChapter {
    id: string,
    chapterRef: string,
    name: string
}

export interface Requirement {
    id: number,
    name: string,
    chapter: RequirementChapter,
    controls: Control[],
    regulation: Regulation,
}

const requirementAdapter = createEntityAdapter<Requirement>({
    selectId: control => control.id,
    sortComparer: (a, b) => {
        return a.name.localeCompare(b.name)
    }
});

const controlInitialState: EntityState<Requirement> = requirementAdapter.getInitialState();
const requirementSelector = requirementAdapter.getSelectors((state: RootState) => state.requirement.entities)

export const selectAllRequirements = requirementSelector.selectAll;
export const selectRequirementById = requirementSelector.selectById;
export const setRequirements = (requirement: Requirement[], state: EntityState<Requirement>) => requirementAdapter.setAll(state, requirement);
export const createOneRequirement = (control: Requirement, state: EntityState<Requirement>) => requirementAdapter.addOne(state, control);
export const updateOneRequirement = (control: Requirement, state: EntityState<Requirement>) => requirementAdapter.updateOne(state, {
    id: control.id,
    changes: control
});
export const deleteOneRequirement = (controlId: number, state: EntityState<Requirement>) => requirementAdapter.removeOne(state, controlId);


const RequirementSlice = createSlice({
    name: 'control',
    initialState: {entities: controlInitialState, loading: false},
    reducers: {
        createRequirement(state, {payload}: PayloadAction<Requirement>) {
            requirementAdapter.addOne(state.entities, payload)
        },
        editRequirement(state, {payload}: PayloadAction<Requirement>) {
            updateOneRequirement(payload, state.entities)
        },
        deleteRequirement(state, {payload}: PayloadAction<Requirement>) {
            deleteOneRequirement(payload.id, state.entities)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllRequirements.fulfilled, (state, action) => {
            state.loading = false;
            requirementAdapter.setAll(state.entities, action.payload);
        })
    }
})

export const {createRequirement, editRequirement, deleteRequirement} = RequirementSlice.actions
export default RequirementSlice.reducer;

