import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {fetchAllRegulations} from './RegulationService';

export interface Regulation {
    id: number,
    name: string,
    covered_requirement_count: number,
    requirement_count: number,
    without_control_requirement_count: number,
    failing_control_count: number
}

const regulationAdapter = createEntityAdapter<Regulation>({
    selectId: control => control.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const controlInitialState: EntityState<Regulation> = regulationAdapter.getInitialState();
const controlSelectors = regulationAdapter.getSelectors((state: RootState) => state.regulation.entities)

export const selectAllRegulations = controlSelectors.selectAll;
export const selectRegulationById = controlSelectors.selectById;
export const setRegulations = (regulation: Regulation[], state: EntityState<Regulation>) => regulationAdapter.setAll(state, regulation);
export const createOneRegulation = (control: Regulation, state: EntityState<Regulation>) => regulationAdapter.addOne(state, control);
export const updateOneRegulation = (control: Regulation, state: EntityState<Regulation>) => regulationAdapter.updateOne(state, {
    id: control.id,
    changes: control
});
export const deleteOneRegulation = (controlId: number, state: EntityState<Regulation>) => regulationAdapter.removeOne(state, controlId);


const RegulationSlice = createSlice({
    name: 'control',
    initialState: {entities: controlInitialState, loading: false},
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
