import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { RootState } from '../reducer';
import { Requirement } from '../Requirement/RequirementSlice';
import { Task } from '../Task/TaskSlice';
import { User } from '../User/UserSlice';
import { fetchAllControls, fetchControlById, upsertControl } from './ControlService';
import { upsertTask } from '../Task/TaskService';

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
const controlSelectors = controlsAdapter.getSelectors((state: RootState) => state.control);

export const selectAllControls = controlSelectors.selectAll;
export const selectControlById = controlSelectors.selectById;

const ControlSlice = createSlice({
	name: 'control',
	initialState: { ...controlInitialState, loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(upsertControl.fulfilled, (state, action) => {
			controlsAdapter.upsertOne(state, action);
			state.loading = false;
		});
		builder.addCase(fetchAllControls.fulfilled, (state, action) => {
			controlsAdapter.setAll(state, action);
			state.loading = false;
		});
		builder.addCase(fetchControlById.fulfilled, (state, action) => {
			controlsAdapter.upsertOne(state, action);
			state.loading = false;
		});
		builder.addCase(upsertTask.fulfilled, (state, action) => {
			if (action.payload.control.id) {
				const control: Control | undefined = controlsAdapter
					.getSelectors()
					.selectById(state, action.payload.control.id);
				const task: Task = action.payload;

				if (control) {
					delete task.control;
					control.tasks.push(action.payload);
					controlsAdapter.upsertOne(state, control);
				}
			}
			state.loading = false;
		});
	},
});
export default ControlSlice.reducer;
