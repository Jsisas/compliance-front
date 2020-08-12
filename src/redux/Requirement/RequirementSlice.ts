import { RootState } from '../reducer';
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { Control } from '../Control/ControlSlice';
import { fetchAllRequirements, fetchRequirementById, upsertRequirement } from './RequirementService';
import { Regulation } from '../Regulation/RegulationSlice';

export interface RequirementStatistics {
	controls_total: number;
	controls_failing: number;
}

export interface Requirement {
	id: string;
	title: string;
	description: string;
	chapter_name: string;
	chapter_number: string;
	paragraph_number: string;
	regulations: Regulation[];
	controls: Control[];
	statistics: RequirementStatistics;
}

const requirementAdapter = createEntityAdapter<Requirement>({
	selectId: (requirement) => requirement.id,
	sortComparer: (a, b) => {
		return a.title.localeCompare(b.title);
	},
});

const requirementInitialState: EntityState<Requirement> = requirementAdapter.getInitialState();
const requirementSelector = requirementAdapter.getSelectors((state: RootState) => state.requirement);

export const selectAllRequirements = requirementSelector.selectAll;
export const selectRequirementById = requirementSelector.selectById;

const RequirementSlice = createSlice({
	name: 'requirement',
	initialState: { ...requirementInitialState, loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(upsertRequirement.fulfilled, (state, action) => {
			requirementAdapter.upsertOne(state, action);
			state.loading = false;
		});
		builder.addCase(fetchAllRequirements.fulfilled, (state, action) => {
			state.loading = false;
			requirementAdapter.upsertMany(state, action.payload);
		});
		builder.addCase(fetchRequirementById.fulfilled, (state, action) => {
			state.loading = false;
			requirementAdapter.upsertOne(state, action.payload);
		});
	},
});

export default RequirementSlice.reducer;
