import { RootState } from '../../reducer';
import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Requirement } from '../RequirementSlice';

const tmpRequirementAdapter = createEntityAdapter<Requirement>({
	selectId: (requirement) => requirement.id,
	sortComparer: (a, b) => {
		return a.title.localeCompare(b.title);
	},
});

const tmpRequirementInitialState: EntityState<Requirement> = tmpRequirementAdapter.getInitialState();
const tmpRequirementSelector = tmpRequirementAdapter.getSelectors((state: RootState) => state.tmpRequirement);

export const selectAllTmpRequirements = tmpRequirementSelector.selectAll;

const RequirementTmpSlice = createSlice({
	name: 'requirement',
	initialState: { ...tmpRequirementInitialState, loading: false },
	reducers: {
		setTmpRequirements(state, { payload }: PayloadAction<Requirement[]>) {
			tmpRequirementAdapter.removeAll(state);
			tmpRequirementAdapter.setAll(state, payload);
		},
	},
});

export const { setTmpRequirements } = RequirementTmpSlice.actions;
export default RequirementTmpSlice.reducer;
