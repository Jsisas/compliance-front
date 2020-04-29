import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {Control} from "../Control/ControlSlice";
import {fetchAllRequirements} from "./RequirementService";
import {Regulation} from "../Regulation/RegulationSlice";

export interface RequirementChapter {
    id: string,
    chapterNumber: string,
    name: string
}

export interface Requirement {
    id: string,
    title: string,
    description: string,
    chapter_name: string,
    chapter_number: string,
    paragraph_number: string,
    regulations: Regulation[],
    controls: Control[],
}

const requirementAdapter = createEntityAdapter<Requirement>({
    selectId: requirement => requirement.id,
    sortComparer: (a, b) => {
        return a.title.localeCompare(b.title)
    }
});

const requirementInitialState: EntityState<Requirement> = requirementAdapter.getInitialState();
const requirementSelector = requirementAdapter.getSelectors((state: RootState) => state.requirement.entities)

export const selectAllRequirements = requirementSelector.selectAll;
export const selectRequirementById = requirementSelector.selectById;
export const setRequirements = (requirement: Requirement[], state: EntityState<Requirement>) => requirementAdapter.setAll(state, requirement);
export const createOneRequirement = (requirement: Requirement, state: EntityState<Requirement>) => requirementAdapter.addOne(state, requirement);
export const updateOneRequirement = (requirement: Requirement, state: EntityState<Requirement>) => requirementAdapter.updateOne(state, {
    id: requirement.id,
    changes: requirement
});
export const deleteOneRequirement = (requirementId: string, state: EntityState<Requirement>) => requirementAdapter.removeOne(state, requirementId);


const RequirementSlice = createSlice({
    name: 'requirement',
    initialState: {entities: requirementInitialState, loading: false},
    reducers: {
        createTmpRequirement(state, {payload}: PayloadAction<Requirement>) {
            requirementAdapter.addOne(state.entities, payload)
        },
        updateRequirement(state, {payload}: PayloadAction<Requirement>) {
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

export const {createTmpRequirement, updateRequirement, deleteRequirement} = RequirementSlice.actions
export default RequirementSlice.reducer;

