import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit';
import {fetchAllRegulations, fetchRegulationById} from './RegulationService';
import {Requirement} from '../Requirement/RequirementSlice';

export interface RegulationStatistics {
	requirements_total: number;
	requirements_without_control: number;
	controls_total: number;
	controls_failing: number;
}

export interface Regulation {
	id: string,
	title: string,
	description: string;
	requirements: Requirement[];
	statistics: RegulationStatistics;
}

const regulationAdapter = createEntityAdapter<Regulation>({
	selectId: regulation => regulation.id,
	sortComparer: (a, b) => {
		return a.title.localeCompare(b.title);
	}
});

const regulationInitialState: EntityState<Regulation> = regulationAdapter.getInitialState();
const regulationSelectors = regulationAdapter.getSelectors((state: RootState) => state.regulation.entities);

export const selectAllRegulations = regulationSelectors.selectAll;
export const selectRegulationById = regulationSelectors.selectById;

const RegulationSlice = createSlice({
	name: 'regulation',
	initialState: {entities: regulationInitialState, loading: false},
	reducers: {
		createRegulation(state, {payload}: PayloadAction<Regulation>) {
			regulationAdapter.addOne(state.entities, payload);
		},
		editRegulation(state, {payload}: PayloadAction<Regulation>) {
			regulationAdapter.updateOne(state.entities, {
				id: payload.id,
				changes: payload
			});
		},
		deleteRegulation(state, {payload}: PayloadAction<Regulation>) {
			regulationAdapter.removeOne(state.entities, payload.id);
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAllRegulations.fulfilled, (state, action) => {
			state.loading = false;
			regulationAdapter.setAll(state.entities, action.payload);
		});
		builder.addCase(fetchRegulationById.fulfilled, (state, action) => {
			state.loading = false;
			regulationAdapter.upsertOne(state.entities, action.payload);
		});
	}
});

export const {createRegulation, editRegulation, deleteRegulation} = RegulationSlice.actions;
export default RegulationSlice.reducer;
