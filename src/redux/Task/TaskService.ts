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
	control_id: string | null;
	description: string;
	frequency: WeeklyTaskFrequency | MonthlyTaskFrequency | QuarterlyTaskFrequency | AnnualTaskFrequency;
	assignee_id: string;
}

export const fetchAllTasks = createAsyncThunk('tasks/fetchAll', async () => {
	const response: AxiosResponse<ApiWrapper<Task[]>> = await axios.get(`${API_URL}/tasks`);
	return response.data.data;
});

export const fetchTaskById = createAsyncThunk('requirements/fetchTaskById', async (taskId: string, thunkApi) => {
	const response = await axios.get(`${API_URL}/tasks/` + taskId);
	return response.data.data;
});

export const upsertTask = createAsyncThunk('tasks/upsert', async (task: Task, thunkApi) => {
	const upsertData: UpsertTask = {
		id: task.id,
		due_at: task.due_at,
		is_overdue: task.is_overdue,
		kind: task.kind,
		state: task.state,
		title: task.title,
		control_id: task.control.id || null,
		description: task.description,
		frequency: task.frequency,
		assignee_id: task.assignee.id,
	};

	if (upsertData.id) {
		const response: AxiosResponse<ApiWrapper<Task>> = await axios.patch(`${API_URL}/tasks/` + upsertData.id, { task });
		return response.data.data;
	} else {
		const response: AxiosResponse<ApiWrapper<Task>> = await axios.post(`${API_URL}/tasks`, {
			task: upsertData,
		});
		return response.data.data;
	}
});
