import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {fetchAllRegulations} from './RegulationService';
import {Requirement} from "../Requirement/RequirementSlice";

export interface Regulation {
    id: number,
    name: string,
    requirements: Requirement[]
}

const regulationAdapter = createEntityAdapter<Regulation>({
    selectId: regulation => regulation.id,
    sortComparer: (a, b) => {
        return a.name.localeCompare(b.name)
    }
});

const regulationInitialState: EntityState<Regulation> = regulationAdapter.getInitialState();
const regulationSelectors = regulationAdapter.getSelectors((state: RootState) => state.regulation.entities)

export const selectAllRegulations = regulationSelectors.selectAll;
export const selectRegulationById = regulationSelectors.selectById;
export const setRegulations = (regulation: Regulation[], state: EntityState<Regulation>) => regulationAdapter.setAll(state, regulation);
export const createOneRegulation = (regulation: Regulation, state: EntityState<Regulation>) => regulationAdapter.addOne(state, regulation);
export const updateOneRegulation = (regulation: Regulation, state: EntityState<Regulation>) => regulationAdapter.updateOne(state, {
    id: regulation.id,
    changes: regulation
});
export const deleteOneRegulation = (regulationId: number, state: EntityState<Regulation>) => regulationAdapter.removeOne(state, regulationId);


const RegulationSlice = createSlice({
    name: 'regulation',
    initialState: {entities: regulationInitialState, loading: false},
    reducers: {
        createRegulation(state, {payload}: PayloadAction<Regulation>) {
            regulationAdapter.addOne(state.entities, payload)
        },
        editRegulation(state, {payload}: PayloadAction<Regulation>) {
            updateOneRegulation(payload, state.entities)
        },
        deleteRegulation(state, {payload}: PayloadAction<Regulation>) {
            deleteOneRegulation(payload.id, state.entities)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllRegulations.fulfilled, (state, action) => {
            state.loading = false;
            regulationAdapter.setAll(state.entities, action.payload);
        })
    }
})

export const {createRegulation, editRegulation, deleteRegulation} = RegulationSlice.actions
export default RegulationSlice.reducer;
