import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ApiWrapper } from '../store';
import {
	AnnualTaskFrequency,
	MonthlyTaskFrequency,
	QuarterlyTaskFrequency,
	Task,
	TaskStatus,
	TaskType,
	WeeklyTaskFrequency,
} from './TaskSlice';
import { API_URL } from '../../environment';

export interface UpsertTask {
	id: string;
	due_at: string;
	is_overdue: boolean;
	kind: TaskType;
	state: TaskStatus;
	title: string;
	control_id: string;
	description: string;
	frequency: WeeklyTaskFrequency | MonthlyTaskFrequency | QuarterlyTaskFrequency | AnnualTaskFrequency;
	assignee_id: string;
}

export const fetchAllTasks = createAsyncThunk('tasks/fetchAll', async () => {
	const response: AxiosResponse<ApiWrapper<Task[]>> = await axios.get(`${API_URL}/tasks`);
	return response.data.data;
});

export const createTask = createAsyncThunk('tasks/create', async (task: Task) => {
	console.log(task);
	const upsertData: UpsertTask = {
		id: task.id,
		due_at: task.due_at,
		is_overdue: task.is_overdue,
		kind: task.kind,
		state: task.state,
		title: task.title,
		control_id: task.control.id,
		description: task.description,
		frequency: task.frequency,
		assignee_id: task.assignee.id,
	};

	const response: AxiosResponse<ApiWrapper<Task>> = await axios.post(`${API_URL}/tasks`, {
		task: upsertData,
	});
	return response.data.data;
});

export const updateTask = createAsyncThunk('tasks/update', async (task: Task) => {
	const response: AxiosResponse<ApiWrapper<Task>> = await axios.patch(`${API_URL}/tasks/` + task.id, {
		task,
	});
	return response.data.data;
});
