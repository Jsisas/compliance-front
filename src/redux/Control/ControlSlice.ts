import { RootState } from '../reducer';
import {
	createEntityAdapter,
	createSlice,
	EntityState,
	PayloadAction,
} from '@reduxjs/toolkit';
import {
	fetchAllControls,
	fetchControlById,
	createControl,
} from './ControlService';
import { Task } from '../Task/TaskSlice';
import { User } from '../User/UserSlice';
import { Requirement } from '../Requirement/RequirementSlice';
import { updateControl } from './ControlService';

export enum ControlStatus {
	NOT_IMPLEMENTED = 'not_implemented',
	IMPLEMENTED = 'implemented',
	FAILING = 'failing',
	OK = 'ok',
}

export enum ControlType {
	POLICY = 'policy',
	PROCESS = 'process',
}

export interface Control {
	id: string;
	assignee: User;
	begins_at: string;
	description: string;
	kind: ControlType;
	requirements: Requirement[];
	state: ControlStatus;
	tasks: Task[];
	title: string;
}

const controlsAdapter = createEntityAdapter<Control>({
	selectId: (control) => control.id,
	sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const controlInitialState: EntityState<Control> = controlsAdapter.getInitialState();
const controlSelectors = controlsAdapter.getSelectors(
	(state: RootState) => state.control.entities
);

export const selectAllControls = controlSelectors.selectAll;
export const selectControlById = controlSelectors.selectById;

const ControlSlice = createSlice({
	name: 'control',
	initialState: { entities: controlInitialState, loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createControl.fulfilled, (state, action) => {
			controlsAdapter.upsertOne(state.entities, action);
			state.loading = false;
		});
		builder.addCase(updateControl.fulfilled, (state, action) => {
			controlsAdapter.upsertOne(state.entities, action);
			state.loading = false;
		});
		builder.addCase(fetchAllControls.fulfilled, (state, action) => {
			controlsAdapter.setAll(state.entities, action);
			state.loading = false;
		});
		builder.addCase(fetchControlById.fulfilled, (state, action) => {
			controlsAdapter.upsertOne(state.entities, action);
			state.loading = false;
		});
	},
});
export default ControlSlice.reducer;
