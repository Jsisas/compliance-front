import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { RootState } from '../reducer';
import { fetchAllRequirements } from '../Requirement/RequirementService';
import { Requirement } from '../Requirement/RequirementSlice';
import { fetchAllRegulations, fetchRegulationById } from './RegulationService';

export interface RegulationStatistics {
	requirements_total: number;
	requirements_without_control: number;
	controls_total: number;
	controls_failing: number;
}

export interface Regulation {
	id: string;
	title: string;
	description: string;
	requirements: Requirement[];
	statistics: RegulationStatistics;
}

const regulationAdapter = createEntityAdapter<Regulation>({
	selectId: (regulation) => regulation.id,
	sortComparer: (a, b) => {
		return a.title.localeCompare(b.title);
	},
});

const regulationInitialState: EntityState<Regulation> = regulationAdapter.getInitialState();
const regulationSelectors = regulationAdapter.getSelectors((state: RootState) => state.regulation.entities);

export const selectAllRegulations = regulationSelectors.selectAll;
export const selectRegulationById = regulationSelectors.selectById;

const RegulationSlice = createSlice({
	name: 'regulation',
	initialState: { entities: regulationInitialState, loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllRegulations.fulfilled, (state, action) => {
			state.loading = false;
			regulationAdapter.upsertMany(state.entities, action.payload);

			fetchAllRequirements();
		});
		builder.addCase(fetchRegulationById.fulfilled, (state, action) => {
			state.loading = false;
			regulationAdapter.upsertOne(state.entities, action.payload);
		});
	},
});
export default RegulationSlice.reducer;
