import { createEntityAdapter, createSelector, createSlice, EntityState } from '@reduxjs/toolkit';

import { Control } from '../Control/ControlSlice';
import { RootState } from '../reducer';
import { User } from '../User/UserSlice';
import { fetchAllTasks, fetchTaskById, upsertTask } from './TaskService';

export enum Weekday {
	MONDAY,
	TUESDAY,
	WEDNESDAY,
	THURSDAY,
	FRIDAY,
	SATURDAY,
	SUNDAY,
}

export enum Quarter {
	FIRST,
	SECOND,
	THIRD,
	FOURTH,
}

export enum Month {
	JANUARY,
	FEBRUARY,
	MARCH,
	APRIL,
	MAY,
	JUNE,
	JULY,
	AUGUST,
	SEPTEMBER,
	OCTOBER,
	NOVEMBER,
	DECEMBER,
}

export enum TaskType {
	MAINTENANCE = 'maintenance',
	AUDIT = 'audit',
	REVIEW = 'review',
}

export enum TaskStatus {
	NEW = 'new',
	FAILING = 'failing',
	WARNING = 'warning',
	OK = 'ok',
}

export interface TaskFile {
	id: number;
	name: string;
	downloadUrl: string;
}

export enum TaskFrequencyType {
	ONE_TIME = 'One-time task',
	RECURRING = 'Recurring task',
}

export enum TaskFrequencyTypeRecurrence {
	WEEKLY = 'Weekly',
	MONTHLY = 'Monthly',
	QUARTERLY = 'Quarterly',
	ANNUAL = 'Annual',
}

export interface WeeklyTaskFrequency {
	type: TaskFrequencyType;
	recurrence: TaskFrequencyTypeRecurrence;
	weekDay: Weekday;
}

export interface MonthlyTaskFrequency {
	type: TaskFrequencyType;
	recurrence: TaskFrequencyTypeRecurrence;
	weekDay: number;
	week: Quarter;
}

export interface QuarterlyTaskFrequency {
	type: TaskFrequencyType;
	recurrence: TaskFrequencyTypeRecurrence;
	quarter: Quarter;
}

export interface AnnualTaskFrequency {
	type: TaskFrequencyType;
	recurrence: TaskFrequencyTypeRecurrence;
	month: Month;
}

export interface Comment {
	id: number;
	author: Task;
	content: string;
	date: Date;
	subComments?: Comment;
}

export interface Task {
	id: string;
	due_at: string;
	is_overdue: boolean;
	kind: TaskType;
	state: TaskStatus;
	title: string;
	control: Control;
	description: string;
	frequency: WeeklyTaskFrequency | MonthlyTaskFrequency | QuarterlyTaskFrequency | AnnualTaskFrequency;
	assignee: User;
	files: TaskFile[];
	comments: Comment[];
}

const tasksAdapter = createEntityAdapter<Task>({
	selectId: (task) => task.id,
	sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const taskInitialState: EntityState<Task> = tasksAdapter.getInitialState();
const taskSelectors = tasksAdapter.getSelectors((state: RootState) => state.task);

export const selectAllTasks = taskSelectors.selectAll;
export const selectTaskById = taskSelectors.selectById;

export function selectTaskByControlId(state: RootState, controlId: string): Task[] {
	return createSelector([selectAllTasks], (items: Task[]) =>
		items.filter((task) => (task.control.id || null) === controlId)
	)(state);
}

const TaskSlice = createSlice({
	name: 'task',
	initialState: { ...taskInitialState, loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(upsertTask.fulfilled, (state, action) => {
			tasksAdapter.upsertOne(state, action);
			state.loading = false;
		});
		builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
			state.loading = false;
			tasksAdapter.setAll(state, action.payload);
		});
		builder.addCase(fetchTaskById.fulfilled, (state, action) => {
			tasksAdapter.upsertOne(state, action);
			state.loading = false;
		});
	},
});
export default TaskSlice.reducer;
