import {RootState} from '../reducer';
import {createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit';
import {Control} from '../Control/ControlSlice';
import {fetchAllRequirements, fetchRequirementById} from './RequirementService';
import {Regulation} from '../Regulation/RegulationSlice';

export interface RequirementStatistics {
	controls_total: number;
	controls_failing: number;
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
	statistics: RequirementStatistics
}

const requirementAdapter = createEntityAdapter<Requirement>({
	selectId: requirement => requirement.id,
	sortComparer: (a, b) => {
		return a.title.localeCompare(b.title);
	}
});

const requirementInitialState: EntityState<Requirement> = requirementAdapter.getInitialState();
const requirementSelector = requirementAdapter.getSelectors((state: RootState) => state.requirement.entities);

export const selectAllRequirements = requirementSelector.selectAll;
export const selectRequirementById = requirementSelector.selectById;

const RequirementSlice = createSlice({
	name: 'requirement',
	initialState: {entities: requirementInitialState, loading: false},
	reducers: {
		createTmpRequirement(state, {payload}: PayloadAction<Requirement>) {
			requirementAdapter.addOne(state.entities, payload);
		},
		updateRequirement(state, {payload}: PayloadAction<Requirement>) {
			requirementAdapter.updateOne(state.entities, {
				id: payload.id,
				changes: payload
			});
		},
		deleteRequirement(state, {payload}: PayloadAction<Requirement>) {
			requirementAdapter.removeOne(state.entities, payload.id);
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAllRequirements.fulfilled, (state, action) => {
			state.loading = false;
			requirementAdapter.setAll(state.entities, action.payload);
		});
		builder.addCase(fetchRequirementById.fulfilled, (state, action) => {
			state.loading = false;
			requirementAdapter.upsertOne(state.entities, action.payload);
		});
	}
});

export const {createTmpRequirement, updateRequirement, deleteRequirement} = RequirementSlice.actions;
export default RequirementSlice.reducer;

