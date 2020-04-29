import {RootState} from '../../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {Requirement} from "../RequirementSlice";

const tmpRequirementAdapter = createEntityAdapter<Requirement>({
    selectId: requirement => requirement.id,
    sortComparer: (a, b) => {
        return a.title.localeCompare(b.title)
    }
});

const tmpRequirementInitialState: EntityState<Requirement> = tmpRequirementAdapter.getInitialState();
const tmpRequirementSelector = tmpRequirementAdapter.getSelectors((state: RootState) => state.tmpRequirement.entities)

export const selectAllTmpRequirements = tmpRequirementSelector.selectAll;
export const selectTmpRequirementById = tmpRequirementSelector.selectById;
export const setTmpRequirementState = (requirement: Requirement[], state: EntityState<Requirement>) => tmpRequirementAdapter.setAll(state, requirement);

const RequirementTmpSlice = createSlice({
    name: 'requirement',
    initialState: {entities: tmpRequirementInitialState, loading: false},
    reducers: {
        setTmpRequirements(state, {payload}: PayloadAction<Requirement[]>) {
            setTmpRequirementState(payload, state.entities)
        },
    }
})

export const {setTmpRequirements} = RequirementTmpSlice.actions
export default RequirementTmpSlice.reducer;

