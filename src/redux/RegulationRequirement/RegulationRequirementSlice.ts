import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {fetchRegulationRequirements} from './RegulationRequirementService';
import {Requirement} from "../Requirement/RequirementSlice";

const regulationAdapter = createEntityAdapter<Requirement>({
    selectId: regulationRequirement => regulationRequirement.id,
    sortComparer: (a, b) => {
        console.log(a)
        return a.name.localeCompare(b.name)
    }
});

const regulationRequirementInitialState: EntityState<Requirement> = regulationAdapter.getInitialState();
const regulationRequirementSelectors = regulationAdapter.getSelectors((state: RootState) => state.regulationRequirements.entities)

export const selectAllRegulationRequirements = regulationRequirementSelectors.selectAll;
export const updateOneRegulation = (regulationRequirement: Requirement, state: EntityState<Requirement>) => regulationAdapter.updateOne(state, {
    id: regulationRequirement.id,
    changes: regulationRequirement
});
export const deleteOneRegulation = (regulationRequirementId: number, state: EntityState<Requirement>) => regulationAdapter.removeOne(state, regulationRequirementId);


const RegulationRequirementSlice = createSlice({
    name: 'regulationRequirement',
    initialState: {entities: regulationRequirementInitialState, loading: false},
    reducers: {
        createRegulation(state, {payload}: PayloadAction<Requirement>) {
            regulationAdapter.addOne(state.entities, payload)
        },
        editRegulation(state, {payload}: PayloadAction<Requirement>) {
            updateOneRegulation(payload, state.entities)
        },
        deleteRegulation(state, {payload}: PayloadAction<Requirement>) {
            deleteOneRegulation(payload.id, state.entities)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchRegulationRequirements.fulfilled, (state, action) => {
            state.loading = false;
            regulationAdapter.setAll(state.entities, action.payload);
        })
    }
})

export const {createRegulation, editRegulation, deleteRegulation} = RegulationRequirementSlice.actions
export default RegulationRequirementSlice.reducer;
