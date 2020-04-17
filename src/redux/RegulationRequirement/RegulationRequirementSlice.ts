import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {fetchRegulationRequirements} from './RegulationRequirementService';
import {Requirement} from "../Requirement/RequirementSlice";

const regulationAdapter = createEntityAdapter<Requirement>({
    selectId: control => control.id,
    sortComparer: (a, b) => {
        console.log(a)
        return a.name.localeCompare(b.name)
    }
});

const controlInitialState: EntityState<Requirement> = regulationAdapter.getInitialState();
const controlSelectors = regulationAdapter.getSelectors((state: RootState) => state.regulationRequirements.entities)

export const selectAllRegulationRequirements = controlSelectors.selectAll;
export const updateOneRegulation = (control: Requirement, state: EntityState<Requirement>) => regulationAdapter.updateOne(state, {
    id: control.id,
    changes: control
});
export const deleteOneRegulation = (controlId: number, state: EntityState<Requirement>) => regulationAdapter.removeOne(state, controlId);


const RegulationRequirementSlice = createSlice({
    name: 'control',
    initialState: {entities: controlInitialState, loading: false},
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
